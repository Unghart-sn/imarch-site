# PROJECT_STATE.md — Imarch (сертификация)

> Технический паспорт проекта. Обновляется по ходу работы.
> В новом чате: «прочитай PROJECT_STATE.md» — и работа продолжается с места остановки.

Последнее обновление: 2026-11-02

---

## 1. Стек и окружения

| Компонент | Что это | Где живёт |
|---|---|---|
| Сайт | Hugo (SSG) | локально `hugo server`, прод через `netlify deploy --prod` |
| Serverless | Netlify Functions (Node.js) | `netlify/functions/*.js` |
| БД + Auth + Edge Functions | Supabase (Postgres) | project ref: `nmiyaroisztnxenmoxzs` |
| Файлы | Cloudflare R2 | bucket: `imarch-safe`, endpoint: `https://0eabf5635dd3d1ab79a8de80bc821e18.r2.cloudflarestorage.com` |
| Почта | Resend | из `order-process.js` |
| Прод-домен | `https://imarch.ltd` | Netlify |

### Env-переменные (только имена, значения НЕ хранить здесь)

**Netlify (production):**
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`
- `HMAC_ORDER_SECRET`
- `RESEND_API_KEY`, `RESEND_FROM`
- `GIFT_ADMIN_TOKEN` ← админский токен для `order-process`

**Supabase Edge Function Secrets:**
- `ORDER_PROCESS_URL` = `https://imarch.ltd/.netlify/functions/order-process`
- `GIFT_ADMIN_TOKEN` = тот же, что в Netlify

---

## 2. Карта функций

### Netlify Functions

| Функция | Что делает | Кто вызывает | Статус |
|---|---|---|---|
| `order-create` | Создаёт заказ в БД, считает HMAC, возвращает `upload_url` + `hmac_token` | фронт (`certify_form.js`) | ⚠️ **проблемное место**: возвращает `upload_url` на **Supabase Storage**, не пишет `file_key_r2` |
| `order-confirm` | Проверяет HMAC + `HeadObject` в R2, переводит `pending_upload → payment_pending`. Идемпотентен | фронт | ⚠️ ищет файл в **R2** по `file_key_r2`, но его нет |
| `order-process` | **Настоящий финал**: `HeadObject` в R2 → sha-check → TSA → PDF (`makePassportPDF`) → PutObject в R2 → `pdf_url` в БД → Resend → статус `ready` | сейчас: вручную (curl) + fire-and-forget из `process-payment` | ✅ рабочий, но требует `x-admin-token` |
| `order-process-v2/v3/v4` | легаси-версии | никто | 📦 легаси, не трогать |
| `order-status` | Отдаёт публичный статус заказа по `order_id` + токену | страница `/en/certify/status/` | ✅ починен 2026-11-01 |
| `cert-download` | Скачивание готового PDF по `order_id` + токену | кнопка на странице статуса | — |
| `gift-create`, `gift-list` | подарочные сертификаты | — | — |
| `safe`, `safe-whoami` | Digital Safe | — | — |

### Supabase Edge Functions

| Функция | Что делает | Статус |
|---|---|---|
| `process-payment` | Проверяет юзера и баланс токенов, списывает токен (`deduct_one_token`), ставит `status = completed`. **+ fire-and-forget вызов `order-process`** (добавлено 2026-11-01) | ✅ задеплоено |
| `redeem-promo`, `apply-pilot` | промо / пилот | — |

---

## 3. Поток заказа (as is, после правок 2026-11-01)

1. Пользователь выбирает файл → считается SHA-256 в браузере (`certify_form.js`).
2. `POST /.netlify/functions/order-create` → создаёт заказ, возвращает `order_id`, `hmac_token`, `upload_url`, `upload_headers`.
3. Фронт делает **PUT по `upload_url`** → файл летит в **Supabase Storage** (путь `orders/<orderId>_<fileName>`).
   - ❗ `file_key_r2` в БД **не пишется**.
4. `POST .../functions/v1/process-payment` → списывает токен, ставит `completed`, дёргает `order-process` (fire-and-forget).
5. `order-process` пытается `HeadObject` в R2 по `file_key_r2` → **`file_key_r2 = null`** → `r2_head_failed` → обрыв.
6. Фронт параллельно зовёт `order-confirm` → HMAC проверяется, но статус уже `completed`, а не `pending_upload` → возвращает `idempotent: true`, ничего не делает.
7. Страница статуса показывает `completed`, но `pdf_url = null`, кнопки скачивания нет, письма нет, `tsa/anchor/vt = pending`.

### Итог: где именно ломается
**Рассинхрон хранилищ.** `order-create` кладёт файл в **Supabase Storage**, а `order-process`/`order-confirm` ищут в **R2** по `file_key_r2`, который никогда не заполняется.

---

## 4. Известные проблемы (открытые)

| # | Проблема | Дата | Статус |
|---|---|---|---|
| 1 | `file_key_r2 = null` — `order-create` не пишет ключ R2; файл лежит в Supabase Storage | 2026-11-01 | 🔴 открыто |
| 2 | `order-process` падает на `r2_head_failed`, до PDF/письма не доходит | 2026-11-01 | 🔴 открыто |
| 3 | Мобильный браузер: **«Error: upload network error»** при PUT файла (напр. 4.77 МБ) | 2026-11-02 | 🔴 открыто |
| 4 | `order-process-v2/v3/v4` — легаси, путают при чтении кода | — | 🟡 почистить позже |

---

## 5. Журнал изменений

### 2026-11-01
- ✅ `order-status.js`: убрали задвоенный хвост в `PUBLIC_STATUSES` (`..., 'error']);, 'error']);` → `..., 'error']);`). Статус снова отображается.
- ✅ `order-process.js`, строка 351: разрешили статус `completed` в проверке (`['payment_pending','processing','ready','completed'].includes(order.status)`).
- ✅ `process-payment/index.ts`: добавили fire-and-forget `fetch` на `ORDER_PROCESS_URL` с `x-admin-token` после списания токена.
- ✅ Добавили Supabase Edge Secrets: `ORDER_PROCESS_URL`, `GIFT_ADMIN_TOKEN`.
- ✅ Задеплоили: Netlify `--prod`, Supabase `functions deploy process-payment --project-ref nmiyaroisztnxenmoxzs`.
- 🔎 Диагностика заказа `b21b21be-...`: `status=completed`, `file_key_r2=null`, `pdf_url=null`. Через `curl` к `order-process` получили `{"debug":"r2_head_failed","key":"MISSING",...}` → корень найден.

### 2026-11-02
- 📝 Создан `PROJECT_STATE.md`.
- 📱 Зафиксирован мобильный баг: `upload network error` при PUT в Supabase Storage.

---

## 6. Next steps (план следующей сессии)

1. `git log --oneline -20 -- netlify/functions/order-create.js` — найти старую рабочую версию с записью в R2 (presigned PUT) и `file_key_r2`.
2. Решить: **Вариант A** (вернуть R2 как основное хранилище) или **Вариант B** (переучить `order-process`/`order-confirm` на Supabase Storage).
3. Разобраться с мобильным `upload network error`: проверить CORS на Supabase Storage bucket, таймауты, размер файла.
4. После починки — прогнать полный цикл на новом заказе (не на `b21b21be`, чтобы не списать лишний токен).
5. Дописать этот файл по итогам сессии.

---

## 7. Правила работы (для чата)

- Пользователь — **не программист**. Команды — по одной, с объяснением зачем.
- **Не** `git reset --hard`. Правки — только с подтверждения пользователя.
- После каждой правки JS — `node --check <файл>`.
- Секреты (токены, ключи) **не** вставлять в чат и **не** писать в этот файл.
- PowerShell: для curl использовать `curl.exe`, для JSON-тела — файл без BOM (`[System.IO.File]::WriteAllText(...UTF8Encoding($false))`).
### 2026-11-02 (продолжение)
-  Найдена регрессия: коммит `8fbcf05` (bulletproof order-create) заменил рабочий R2-код на заглушку с Supabase Storage и потерял `file_key_r2`.
-  Восстановлен `netlify/functions/order-create.js` из `ecb27d2` (родитель `8fbcf05`): presigned PUT в R2 + `file_key_r2` + `hmac_token` + `status_url`.
-  Проверено: `package.json` содержит `@aws-sdk/client-s3` и `@aws-sdk/s3-request-presigner`.
-  `order-confirm.js` уже в R2-режиме (`HeadObject` по `file_key_r2`)  правок не потребовал.
-  Задеплоено на прод (`netlify deploy --prod`). Правки `order-process.js`/`order-status.js`/`process-payment`/`verify.html`/`certify_form.js` из сессии 2026-11-01 тоже ушли на прод.
-  E2E-проверка через curl: `order-create` вернул R2 `upload_url`; PUT в R2  `HTTP 200`; `order-confirm`  `{"ok":true,"status":"payment_pending"}`. R2-цепочка жива.
-  Коммит `e1ea82a` (ветка `backup-before-removing-check`): восстановленный `order-create.js` + `verify.html` (My Account redesign).
-  Баг №3 (мобильный `upload network error`)  НЕ воспроизводится на десктопе (curl PUT 200). Остаётся только на мобильном. Гипотеза: мобильный браузер шлёт PUT иначе (Content-Length / preflight / таймаут).

Обновлённые статусы проблем:
- #1 `file_key_r2 = null`   ЗАКРЫТО (order-create пишет ключ).
- #2 `order-process` падает на `r2_head_failed`   ЗАКРЫТО (ключ есть, HeadObject проходит).
- #3 мобильный `upload network error`   открыто, только mobile, десктоп OK.

Next steps (обновлено):
1. Воспроизвести/починить мобильный upload: проверить CORS бакета R2 (AllowedOrigins/AllowedMethods/AllowedHeaders), поведение iOS Safari при PUT больших файлов (>4 МБ).
2. Реальный полный прогон: настоящий файл через браузер на десктопе  `process-payment`  `order-process`  PDF + Resend.
3. Почистить legacy `order-process-v2/v3/v4`.

### 2026-11-02 (вечер, критический разбор)
-  ГЛАВНАЯ ПРИЧИНА: Supabase Edge Function process-payment **физически не может достучаться** до https://imarch.ltd/.netlify/functions/order-process. Даже после синхронизации GIFT_ADMIN_TOKEN и снятия проверки токена в order-process запрос не доходит (в логах Netlify нет вызовов, в логах Supabase нет console.log).
-  ire-and-forget и wait fetch из Supabase в Netlify  **тупиковый путь** (сеть/фаервол Supabase).
-  order-create (R2 presigned PUT)  работает.
-  order-confirm (HeadObject в R2)  работает.
-  order-process (Netlify)  жив, отвечает на curl (403 без токена, 200 с токеном).
-  issuer_user_id теперь проходит цепочку (фронт  order-create  БД).
-  CORS бакета R2 расширен (Content-Length, Host, x-amz-*).
-  process-payment в Supabase списывает токен, ставит completed, но **не запускает** order-process.

### Новый план (архитектурный обход)
1. Откатить правки в supabase/functions/process-payment/index.ts (убрать вызов etch на order-process, оставить только списание токена).
2. Вернуть проверку x-admin-token в 
etlify/functions/order-process.js.
3. Создать новую Netlify-функцию order-trigger:
   - Принимает order_id + hmac_token (публичные).
   - Проверяет hmac_token (как order-confirm).
   - Вызывает order-process **внутри Netlify** (server-to-server, без внешних сетей).
   - Возвращает результат.
4. В certify_form.js (и на странице статуса) после успешного order-confirm вызывать order-trigger **напрямую**.
5. Убедиться, что цепочка: форма  order-create  PUT в R2  process-payment  order-confirm  **order-trigger**  order-process  PDF + Resend  eady.

### Известные проблемы (обновлено)
- #3 (мобильный upload network error)  CORS обновлён, но не проверен на реальном мобильном (десктоп работает).
- #4 (legacy order-process-v2/v3/v4)  не трогали.
-  #5  Supabase Edge не может достучаться до Netlify (сеть)  обход через order-trigger.
