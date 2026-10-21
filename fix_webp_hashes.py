#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_webp_hashes.py

Единый скрипт для согласования всех SHA-256 с реальными .webp-файлами.

Что делает:
  1. Считает настоящий SHA-256 каждого .webp в static/images/boutique/
  2. Обновляет file_hash во frontmatter ВСЕХ лотов (.md)
  3. Обновляет SHA-256 в блоках 2.1 ВСЕХ мультипаспортов
     (только строки .webp — блоки 2.2 с .png/.jpg не трогает)
  4. Перед каждым изменением сохраняет бэкап исходного файла

Безопасность:
  - По умолчанию DRY-RUN: ничего не пишет, только показывает, что изменится
  - Флаг --apply включает реальные правки
  - Бэкап кладётся в ./_backup_hashes_<timestamp>/

Использование:
    python fix_webp_hashes.py            # посмотреть, что изменится
    python fix_webp_hashes.py --apply    # применить
"""

import sys
import re
import hashlib
import argparse
from pathlib import Path
from datetime import datetime
from shutil import copy2

# ── Утилиты ─────────────────────────────────────────────────────────

def sha256_of(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()

def backup_file(path, backup_root, content_root):
    rel = path.relative_to(content_root)
    target = backup_root / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    copy2(path, target)

# ── Индекс .webp ────────────────────────────────────────────────────

def build_webp_index(images_root):
    """{stem: real_sha256} для всех .webp в папке."""
    index = {}
    for p in images_root.rglob('*.webp'):
        index[p.stem] = sha256_of(p)
    return index

# ── Лоты ────────────────────────────────────────────────────────────

RE_FM_IMAGE = re.compile(r'^image_webp:\s*"([^"]+)"', re.MULTILINE)
RE_FM_HASH  = re.compile(r'^(file_hash:\s*")([0-9a-f]{64})(")', re.MULTILINE)

def update_lot(path, webp_index, apply, backup_root, content_root, changes):
    text = path.read_text(encoding='utf-8')

    m_img = RE_FM_IMAGE.search(text)
    if not m_img:
        return False
    stem = Path(m_img.group(1)).stem
    if stem not in webp_index:
        return False
    new_hash = webp_index[stem]

    m_hash = RE_FM_HASH.search(text)
    if not m_hash:
        return False
    old_hash = m_hash.group(2)
    if old_hash == new_hash:
        return False

    changes.append(('LOT', path, old_hash, new_hash, ''))
    if apply:
        new_text = RE_FM_HASH.sub(
            lambda mm: mm.group(1) + new_hash + mm.group(3),
            text, count=1
        )
        backup_file(path, backup_root, content_root)
        path.write_text(new_text, encoding='utf-8')
    return True

# ── Паспорта ────────────────────────────────────────────────────────

# Ищем пару «<code>D-annex-N.M.webp</code> ... <code>sha</code>»
# Окно между ними ограничено 500 символами — чтобы не перескочить
# на соседний блок.
RE_PASSPORT_PAIR = re.compile(
    r'<code>(D-annex-(\d+)\.(\d+)\.webp)</code>'
    r'(.{1,500}?)'
    r'<code>([0-9a-f]{64})</code>',
    re.DOTALL
)

def update_passport(path, webp_index, apply, backup_root, content_root, changes):
    text = path.read_text(encoding='utf-8')
    matches = list(RE_PASSPORT_PAIR.finditer(text))
    if not matches:
        return False

    new_text = text
    changed = False
    # Идём с конца, чтобы позиции не съезжали
    for m in reversed(matches):
        file_with_ext = m.group(1)
        stem = Path(file_with_ext).stem
        if stem not in webp_index:
            continue
        new_hash = webp_index[stem]
        old_hash = m.group(5)
        if old_hash == new_hash:
            continue
        changed = True
        changes.append(('PASSPORT', path, old_hash, new_hash,
                        f'file={file_with_ext}'))
        if apply:
            start, end = m.start(5), m.end(5)
            new_text = new_text[:start] + new_hash + new_text[end:]

    if changed and apply:
        backup_file(path, backup_root, content_root)
        path.write_text(new_text, encoding='utf-8')
    return changed

# ── Основная логика ─────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--apply', action='store_true',
                    help='Применить изменения (иначе dry-run)')
    ap.add_argument('--content', default='./content')
    ap.add_argument('--images',  default='./static/images/boutique')
    ap.add_argument('--backup-root', default=None)
    args = ap.parse_args()

    content_root = Path(args.content).resolve()
    images_root  = Path(args.images).resolve()

    if not content_root.exists():
        print(f'❌ Не найден content: {content_root}', file=sys.stderr)
        sys.exit(2)
    if not images_root.exists():
        print(f'❌ Не найдена папка изображений: {images_root}', file=sys.stderr)
        sys.exit(2)

    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_root = (Path(args.backup_root) if args.backup_root
                   else content_root.parent / f'_backup_hashes_{ts}').resolve()

    # 1. Индекс .webp
    print(f'📂 Сканирую {images_root}')
    webp_index = build_webp_index(images_root)
    print(f'   Найдено .webp файлов: {len(webp_index)}')
    print()

    # 2. Обход
    changes = []
    lots_touched = 0
    passports_touched = 0

    for path in sorted(content_root.rglob('*.md')):
        name = path.name.lower()
        if name.startswith('bb-') and name.endswith('.md'):
            if update_lot(path, webp_index, args.apply,
                          backup_root, content_root, changes):
                lots_touched += 1
        elif ('rn-0044-ps-pch-' in name) or ('rn-0044-ps-0000' in name):
            if update_passport(path, webp_index, args.apply,
                               backup_root, content_root, changes):
                passports_touched += 1

    # 3. Отчёт
    print('=' * 72)
    print('ПРИМЕНЕНИЕ ИЗМЕНЕНИЙ' if args.apply else 'DRY-RUN (ничего не пишется)')
    print('=' * 72)
    print(f'Лотов затронуто:      {lots_touched}')
    print(f'Паспортов затронуто:  {passports_touched}')
    print(f'Всего замен SHA:      {len(changes)}')
    print()

    if changes:
        print('─── Что ' + ('изменено' if args.apply else 'будет изменено') + ' ───')
        for kind, path, old, new, extra in changes:
            rel = path.relative_to(content_root)
            tail = f'  ({extra})' if extra else ''
            print(f'  [{kind}] {rel}{tail}')
            print(f'         было:  {old}')
            print(f'         стало: {new}')
        print()

    if args.apply and changes:
        print(f'💾 Бэкапы: {backup_root}')
        print('✅ Готово.')
    elif not args.apply and changes:
        print('ℹ️  Это dry-run. Для применения: python fix_webp_hashes.py --apply')
    else:
        print('✅ Ничего менять не нужно — все SHA уже согласованы.')


if __name__ == '__main__':
    main()