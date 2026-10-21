#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
validate_lots.py — Валидатор лотов RN-0044 во всех языковых редакциях.

Проверяет:
  1. Форматы полей frontmatter (node_id, marker, lot_number, file_hash).
  2. Существование файла image_webp.
  3. Совпадение SHA-256 из frontmatter с реальным SHA файла image_webp.
  4. Расхождения между RU/EN/UK-версиями одного лота по полям,
     которые ОБЯЗАНЫ совпадать (translationKey, node_id, file_hash, marker).

НЕ проверяет (по архитектуре так и должно быть):
  - passport_url: у каждого языка своя языковая версия, это правильно.
  - lot_number vs node_id: bb-NNNN — общий номер каталога, node_id — серия/лот.
"""

import sys
import re
import hashlib
import argparse
from pathlib import Path
from collections import defaultdict

RE_NODE_ID = re.compile(r'^RN-0044-PS-\d{4}-\d+\.\d+$')
RE_MARKER  = re.compile(r'^\(8888\) • HTTPS • IMARCH\.LTD • MKT-\d{6}-\d{6}$')
RE_LOT_NUM = re.compile(r'^\d{3}$')
RE_HASH    = re.compile(r'^[0-9a-f]{64}$')
RE_LANG    = re.compile(r'(?:^|[\\/])(ru|en|uk)(?:[\\/]|$)')
RE_LOT_FILE = re.compile(r'^bb-(\d{4})\.md$')
RE_LOT_DIR  = re.compile(r'^bb-(\d{4})$')


def parse_frontmatter(path: Path) -> dict:
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        return {}
    if not text.startswith('---'):
        return {}
    end = text.find('\n---', 3)
    if end == -1:
        return {}
    fm = {}
    for line in text[3:end].split('\n'):
        line = line.strip()
        if not line or line.startswith('#') or ':' not in line:
            continue
        key, _, value = line.partition(':')
        key = key.strip()
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in '"\'':
            value = value[1:-1]
        fm[key] = value
    return fm


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()


def detect_lang(path: Path):
    m = RE_LANG.search(str(path).replace('\\', '/'))
    return m.group(1) if m else None


def detect_lot(path: Path):
    m = RE_LOT_FILE.match(path.name)
    if m:
        return f'bb-{m.group(1)}'
    if path.name == 'index.md':
        m = RE_LOT_DIR.match(path.parent.name)
        if m:
            return f'bb-{m.group(1)}'
    return None


def find_image(image_webp: str, images_root: Path):
    """По image_webp='/images/boutique/D-annex-1.1.webp' ищет файл в images_root."""
    if not image_webp:
        return None
    stem = Path(image_webp).stem          # D-annex-1.1
    # Прямое совпадение по имени
    direct = images_root / (stem + Path(image_webp).suffix)
    if direct.exists():
        return direct
    # Рекурсивный поиск (на случай, если картинка в подпапке)
    for p in images_root.rglob(Path(image_webp).name):
        if p.is_file():
            return p
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--lots',   default='./content')
    ap.add_argument('--images', default='./static')
    ap.add_argument('--verbose', action='store_true')
    args = ap.parse_args()

    lots_root   = Path(args.lots).resolve()
    images_root = Path(args.images).resolve()

    if not lots_root.exists():
        print(f'❌ Не найден каталог контента: {lots_root}', file=sys.stderr)
        sys.exit(2)
    if not images_root.exists():
        print(f'⚠️  Каталог изображений не найден: {images_root}')
        images_root = None

    all_md = list(lots_root.rglob('*.md'))
    md_files, skipped = [], []
    for p in all_md:
        lang = detect_lang(p)
        lot  = detect_lot(p)
        if lang and lot:
            md_files.append(p)
        else:
            skipped.append(p)

    groups = defaultdict(dict)
    for path in md_files:
        lang = detect_lang(path)
        lot  = detect_lot(path)
        fm   = parse_frontmatter(path)
        groups[lot][lang] = {'path': path, 'fm': fm}

    print()
    print('=' * 72)
    print('ВАЛИДАЦИЯ ЛОТОВ RN-0044')
    print('=' * 72)
    print(f'Контент:  {lots_root}')
    print(f'Картинки: {images_root if images_root else "(не задан)"}')
    print(f'.md всего: {len(all_md)}   лотов: {len(md_files)}   пропущено: {len(skipped)}')
    print(f'Уникальных лотов: {len(groups)}')
    print(f'Языки: {sorted({l for langs in groups.values() for l in langs})}')
    print()

    errors = defaultdict(list)

    # 1. Внутренние проверки формата + SHA
    for lot, langs in sorted(groups.items()):
        for lang, entry in sorted(langs.items()):
            fm   = entry['fm']
            path = entry['path']

            node_id    = str(fm.get('node_id', '') or '')
            marker     = str(fm.get('marker', '') or '')
            lot_number = str(fm.get('lot_number', '') or '')
            file_hash  = str(fm.get('file_hash', '') or '')
            image_webp = str(fm.get('image_webp', '') or '')

            if not RE_NODE_ID.match(node_id):
                errors['node_id format'].append(f'{path}: {node_id!r}')
            if not RE_MARKER.match(marker):
                errors['marker format'].append(f'{path}: {marker!r}')
            if not RE_LOT_NUM.match(lot_number):
                errors['lot_number format'].append(f'{path}: {lot_number!r}')
            if not RE_HASH.match(file_hash):
                errors['file_hash format'].append(f'{path}: {file_hash!r}')

            if images_root and image_webp and file_hash:
                img = find_image(image_webp, images_root)
                if img is None:
                    errors['image not found'].append(
                        f'{path}: не найден файл {image_webp}')
                else:
                    real = sha256_of(img)
                    if real != file_hash:
                        errors['SHA-256 mismatch'].append(
                            f'{path}\n'
                            f'      frontmatter: {file_hash}\n'
                            f'      реальный:    {real}\n'
                            f'      файл:        {img}')

    # 2. Cross-language: только поля, которые ОБЯЗАНЫ совпадать
    must_match = ['node_id', 'lot_number', 'file_hash', 'marker',
                  'image_webp', 'translationKey']

    for lot, langs in sorted(groups.items()):
        if len(langs) < 2:
            continue
        for key in must_match:
            values = {lang: str(entry['fm'].get(key, '') or '')
                      for lang, entry in langs.items()}
            unique = {v for v in values.values() if v}
            if len(unique) > 1:
                detail = '\n'.join(f'      {lang}: {values[lang]!r}'
                                   for lang in sorted(values))
                errors['cross-language mismatch'].append(
                    f'{lot} · {key}:\n{detail}')

    # 3. Отчёт
    total = sum(len(v) for v in errors.values())
    if total == 0:
        print('✅ Ошибок не найдено.')
    else:
        for etype in sorted(errors):
            items = errors[etype]
            print(f'❌ {etype} ({len(items)})')
            for item in items:
                print(f'   {item}')
            print()

    if args.verbose and skipped:
        print(f'─── Пропущено файлов: {len(skipped)} ───')
        for p in skipped[:30]:
            print(f'   {p}')
        if len(skipped) > 30:
            print(f'   ... и ещё {len(skipped) - 30}')
        print()

    if args.verbose:
        print('─── Покрытие по языкам ───')
        for lot, langs in sorted(groups.items()):
            present = sorted(langs.keys())
            missing = sorted({'ru', 'en', 'uk'} - set(present))
            line = f'   {lot}: {", ".join(present)}'
            if missing:
                line += f'   ⚠️ нет: {", ".join(missing)}'
            print(line)
        print()

    print('=' * 72)
    print(f'ИТОГО ошибок: {total}')
    print(f'ИТОГО лотов:  {len(groups)}')
    print('=' * 72)
    print()

    sys.exit(1 if total else 0)


if __name__ == '__main__':
    main()