---
title: "КАЛЬКУЛЯТОР SHA-256"
date: 2026-09-17
draft: false
tags: ["verdictum", "hash", "sha256", "tools", "ukrainian"]
id_document: "VR-TOOL-SHA256"
translationKey: "verdictum-hash-tool"
description: "Автономний калькулятор SHA-256. Завантажте файл і отримайте криптографічний відбиток. Обчислення виконуються повністю у браузері, дані не виходять за межі вашого комп’ютера."
---

<div class="hash-tool-container">
  <div class="hash-tool-icon">🔐</div>
  <div class="hash-tool-title">ОБЧИСЛЕННЯ SHA-256</div>
  <div class="hash-tool-subtitle">Завантажте файл — отримайте криптографічний відбиток</div>

  <div class="hash-tool-dropzone" id="hashDropzone">
    <input type="file" id="hashFileInput" class="hash-tool-file-input" />
    <label for="hashFileInput" class="hash-tool-label">
      <span class="hash-tool-label-icon">📎</span>
      <span class="hash-tool-label-text">Натисніть або перетягніть файл</span>
      <span class="hash-tool-label-hint">Будь-який формат · будь-який розмір</span>
    </label>
  </div>

  <div class="hash-tool-result" id="hashResult">
    <div class="hash-tool-result-label">SHA-256:</div>
    <div class="hash-tool-result-value" id="hashValue">—</div>
    <button type="button" class="hash-tool-copy" id="hashCopy" disabled>📋 Копіювати</button>
  </div>

  <div class="hash-tool-status" id="hashStatus"></div>

  <p class="hash-tool-note">
    🔒 Обчислення виконуються повністю у вашому браузері через <strong>Web Crypto API</strong>. Файл не надсилається на сервер і не виходить за межі вашого комп’ютера.
  </p>
</div>

<style>
.hash-tool-container {
  max-width: 640px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfbf7;
  border: 1px solid #e6dfd3;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  text-align: center;
  box-sizing: border-box;
}
.hash-tool-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
.hash-tool-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2c2416;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}
.hash-tool-subtitle {
  font-size: 0.9rem;
  color: #7a6a5a;
  margin-bottom: 1.5rem;
}
.hash-tool-dropzone {
  position: relative;
  border: 2px dashed #d3c9b8;
  border-radius: 16px;
  background: #f9f6ef;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
}
.hash-tool-dropzone.dragover {
  border-color: #b18b56;
  background: #f0ebe0;
}
.hash-tool-file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}
.hash-tool-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 2rem 1rem;
  cursor: pointer;
  border-radius: 16px;
  user-select: none;
}
.hash-tool-label-icon {
  font-size: 1.8rem;
}
.hash-tool-label-text {
  font-size: 1rem;
  font-weight: 700;
  color: #2c2416;
}
.hash-tool-label-hint {
  font-size: 0.8rem;
  color: #7a6a5a;
}
.hash-tool-result {
  display: none;
  background: #ffffff;
  border: 1px solid #e6dfd3;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}
.hash-tool-result.visible {
  display: block;
}
.hash-tool-result-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #7a6a5a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
}
.hash-tool-result-value {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #2c2416;
  word-break: break-all;
  line-height: 1.5;
  background: #fdfaf5;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  margin-bottom: 0.7rem;
}
.hash-tool-copy {
  width: 100%;
  padding: 0.7rem 1rem;
  background: #2c2416;
  color: #f8f3ec;
  border: none;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}
.hash-tool-copy:hover:not(:disabled) {
  background: #4b2e2e;
}
.hash-tool-copy:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.hash-tool-copy.copied {
  background: #4b7a4b;
}
.hash-tool-status {
  font-size: 0.85rem;
  color: #7a6a5a;
  min-height: 1.2rem;
  margin-bottom: 1rem;
}
.hash-tool-note {
  font-size: 0.75rem;
  color: #7a6a5a;
  line-height: 1.5;
  margin: 0;
  padding: 0.8rem 1rem;
  background: #f9f6ef;
  border-radius: 12px;
  border-left: 3px solid #b18b56;
  text-align: left;
}
@media (max-width: 600px) {
  .hash-tool-container {
    padding: 1.2rem;
    border-radius: 16px;
  }
  .hash-tool-title {
    font-size: 1.1rem;
  }
  .hash-tool-icon {
    font-size: 2.2rem;
  }
  .hash-tool-label {
    padding: 1.5rem 0.8rem;
  }
  .hash-tool-result-value {
    font-size: 0.75rem;
  }
}
</style>

<script>
(function() {
  const input = document.getElementById('hashFileInput');
  const dropzone = document.getElementById('hashDropzone');
  const result = document.getElementById('hashResult');
  const valueEl = document.getElementById('hashValue');
  const copyBtn = document.getElementById('hashCopy');
  const status = document.getElementById('hashStatus');
  let currentHash = '';

  async function calculateHash(file) {
    status.innerText = 'Обчислення SHA-256...';
    result.classList.remove('visible');
    copyBtn.disabled = true;
    valueEl.innerText = '—';
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      currentHash = hashHex;
      valueEl.innerText = hashHex;
      result.classList.add('visible');
      copyBtn.disabled = false;
      status.innerText = '✅ ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' КБ)';
    } catch (e) {
      status.innerText = '❌ Помилка обчислення хешу';
      console.error(e);
    }
  }

  input.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      calculateHash(this.files[0]);
    }
  });

  ['dragenter', 'dragover'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });
  dropzone.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      calculateHash(files[0]);
    }
  });

  copyBtn.addEventListener('click', function() {
    if (!currentHash) return;
    navigator.clipboard.writeText(currentHash).then(() => {
      copyBtn.innerText = '✅ Скопійовано';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.innerText = '📋 Копіювати';
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      status.innerText = '❌ Не вдалося скопіювати';
    });
  });
})();
</script>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up"> <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #8b7355, transparent);" /> </div>

&nbsp;

#### Як це працює

1. **Виберіть файл** — натисніть на область завантаження або перетягніть файл у неї.
2. **Отримайте хеш** — відбиток SHA-256 з’явиться автоматично.
3. **Скопіюйте значення** — натисніть «Копіювати» й використовуйте для верифікації.

Інструмент корисний для перевірки цілісності документів, зафіксованих у реєстрі VERDICTUM. Якщо контрольна сума файлу збігається із зазначеною в реквізитах публікації — отже, документ не було змінено після реєстрації.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up"> <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" /> </div>

---

<div class="mobile-card">
{{< document-card
emoji="🔐"
title="VR-TOOL-SHA256 | Калькулятор хешів"
description="Інструмент для обчислення криптографічного відбитка SHA-256. Використовується для верифікації цілісності документів, зафіксованих у реєстрі VERDICTUM. Усі обчислення виконуються локально в браузері користувача — дані не передаються на сервер."
tag="VR-TOOL-SHA256"
>}}
</div>

---

&nbsp;

{{< morebutton target="/verdictum/registry/" text="ДО КАТАЛОГУ РЕЄСТРУ" >}}

&nbsp;

{{< persona-socials >}}

<p style="text-align: center; margin-top: 2rem;"><a href="#top">⬆ Нагору</a></p>