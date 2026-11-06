# ТЗ: Модуль Internal Messenger & Helpdesk (Dashboard App-Shell)

## 1. Архитектура и Стек
* **Frontend:** Hugo (SPA-фрагменты, Web components, Instagram Direct UI style).
* **Backend / Database:** Supabase (PostgreSQL, Realtime WebSockets).
* **Serverless:** Netlify Functions (Node.js)  для вызовов LLM и интеграций (НЕ Supabase Edge Functions, чтобы избежать проблем с сетью).
* **Storage:** Cloudflare R2 (для медиа и heavy-файлов через Signed URLs).
* **LLM Engine:** Server-side API integration (через Netlify Functions, ключ скрыт в env).

## 2. Структура БД (Supabase PostgreSQL)

### conversations (Диалоги)
* id (uuid, primary key)
* 	ype (direct, helpdesk, internode)
* created_at (timestamp)
* status (active, archived, escalated_to_admin)

### conversation_participants (Участники)
* conversation_id (fk)
* user_id (fk)
* ole (client, node_owner, support, ai_assistant)

### messages (Сообщения)
* id (uuid, primary key)
* conversation_id (fk)
* sender_id (uuid)
* sender_type (user, ai_sokol, admin)
* content (text, markdown)
* is_read (boolean)
* ault_ref_id (uuid, optional  ссылка на файл из Цифрового Сейфа)
* created_at (timestamp)

### message_attachments (Вложения)
* id (uuid)
* message_id (fk)
* ile_name (text)
* ile_size (integer, byte)
* 2_url (text)
* mime_type (text)

## 3. Функциональные Траектории

###  Траектория 1: Двухуровневый Support Chat (Сокол  Админ)
1. Пользователь открывает виджет чата в SPA.
2. Первичный диалог обрабатывается ИИ-ассистентом Сокол (Netlify Function подставляет системный промпт базы знаний платформы, ключ скрыт на бэкенде).
3. При запросе Связать с оператором или триггере нетиповой проблемы:
   * Флаг диалога меняется на escalated_to_admin.
   * Trigger в БД выбивает Webhook в Telegram-бот Администратора.
   * Ответ админа из Telegram уходит обратно в диалог пользователя в SPA (через Netlify Function).

###  Траектория 2: Передача файлов и Интеграция с Сейфом
* **Прямая загрузка:** Валидация файла на фронтенде (макс. 15 МБ)  загрузка в Cloudflare R2 по временной Signed URL (через Netlify Function).
* **Связка с Proof-of-Existence:** Кнопка Прикрепить из Сейфа в интерфейсе чата. В сообщение вшивается ID документа и его хэш SHA-256 (без повторной закачки файла).

###  Траектория 3: Сегментированные Рассылки (Broadcast Feed)
* В /app/admin/broadcast/ создается интерфейс рассылок.
* Фильтрация получателей по метаданным юзера: ole == 'node_owner', наличие активных микротокенов.
* Рассылка уходит либо в In-App Feed (системный колокольчик в шапке App-Shell), либо как личное сообщение от Сокола.

## 4. Права доступа и Безопасность (RLS Policies)
* messages_select: Пользователь видит только те сообщения, где его user_id есть в conversation_participants.
* messages_insert: Отправка разрешена только если у пользователя есть активный баланс микротокенов (при нулевом балансе чат переходит в mode read-only с плашкой Top Up).

##  Архитектурные примечания (от текущей реализации)
1. **Сеть Supabase  Netlify:** Ранее мы зафиксировали баг, когда Supabase Edge Functions не могут достучаться до Netlify. Поэтому **все** вызовы LLM и Telegram-вебхуки должны идти через **Netlify Functions**, а не через Edge Functions. Supabase используется только как БД и Realtime.
2. **Микротокены:** В проекте нет subscription_status в чистом виде. Есть 	oken_balance (1 токен = 100 микротокенов). Логику доступа к чату нужно привязать к 	oken_balance > 0.
3. **R2:** Уже настроен бакет imarch-safe и переменные окружения. Для чата можно использовать тот же бакет с префиксом chat/ или создать новый.