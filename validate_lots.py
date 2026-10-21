#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
validate_lots.py — Валидатор лотов RN-0044 во всех языковых редакциях.

Что проверяет:
  1. Форматы полей frontmatter (node_id, marker, lot_number, file_hash).
  2. Соответствие lot_number ↔ node_id ↔ имени файла bb-NNNN.md.
  3. Существование мастер-файла по image_webp.
  4. Совпадение SHA-256 из frontmatter с реальным SHA мастер-файла.
  5. Расхождения между RU/EN/UK-версиями одного лота.

Использование (из корня проекта vis-realitis):
    python validate_lots.py

Или с явными путями:
    python validate_lots.py --lots ./content --masters ./static/images/boutique

Поддерживает структуру:
    content/{ru|en|uk}/docs/consilium/bb-0001.md
    content/{ru|en|uk}/docs/consilium/bb-0001/index.md

Все прочие файлы (.md, не похожие на лот) молча игнорируются.
"""

import os
import re
import sys
import hashlib
import argparse
from pathlib import Path
from collections import defaultdict

# ─────────────────────────────────────────────────────────────────────
# Регулярные выражения для валидации
# ─────────────────────────────────────────────────────────────────────

RE_NODE_ID = re.compile(r'^RN-0044-PS-\d{4}-\d+\.\d+$')
RE_MARKER  = re.compile(r'^\(8888\) • HTTPS • IMARCH\.LTD • MKT-\d{6}-\d{6}$')
RE_LOT_NUM = re.compile(r'^\d{3}$')
RE_HASH    = re.compile(r'^[0-9a-f]{64}$')

# ─────────────────────────────────────────────────────────────────────
# Парсинг frontmatter (простой, без зависимостей)
# ─────────────────────────────────────────────────────────────────────

def parse_frontmatter(path: Path) -> dict:
    """Извлекает YAML-подобный frontmatter из .md-файла."""
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        return {}

    if not text.startswith('---'):
        return {}

    end = text.find('\n---', 3)
    if end == -1:
        return {}

    fm_block = text[3:end]
    fm = {}

    for line in fm_block.split('\n'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        if ':' not in line:
            continue
        key, _, value = line.partition(':')
        key = key.strip()
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in '"\'':
            value = value[1:-1]
        if value.startswith('[') and value.endswith(']'):
            items = [x.strip().strip('"\'') for x in value[1:-1].split(',')]
            value = [x for x in items if x]
        fm[key] = value

    return fm

# ─────────────────────────────────────────────────────────────────────
# SHA-256
# ─────────────────────────────────────────────────────────────────────

def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()

# ─────────────────────────────────────────────────────────────────────
# Определение языка и лота из пути (СТРОГИЙ ФИЛЬТР)
# ─────────────────────────────────────────────────────────────────────

RE_LANG     = re.compile(r'(?:^|[\\/])(ru|en|uk)(?:[\\/]|$)')
RE_LOT_FILE = re.compile(r'^bb-(\d{4})\.md$')
RE_LOT_DIR  = re.compile(r'^bb-(\d{4})$')

def detect_lang(path: Path) -> str:
    m = RE_LANG.search(str(path).replace('\\', '/'))
    return m.group(1) if m else 'unknown'

def detect_lot(path: Path):
    """Возвращает 'bb-0001' или None, если файл не похож на лот."""
    m = RE_LOT_FILE.match(path.name)
    if m:
        return f'bb-{m.group(1)}'
    if path.name == 'index.md':
        m = RE_LOT_DIR.match(path.parent.name)
        if m:
            return f'bb-{m.group(1)}'
    return None

# ─────────────────────────────────────────────────────────────────────
# Поиск мастер-файла
# ─────────────────────────────────────────────────────────────────────

def find_master(image_webp: str, masters_root: Path):
    """Ищет мастер-файл по stem из image_webp. Пробует разные расширения."""
    if not image_webp:
        return None
    stem = Path(image_webp).stem
    for ext in ('.png', '.jpg', '.jpeg', '.webp'):
        candidate = masters_root / (stem + ext)
        if candidate.exists():
            return candidate
    for candidate in masters_root.rglob(stem + '.*'):
        if candidate.is_file():
            return candidate
    return None

# ─────────────────────────────────────────────────────────────────────
# Основная логика
# ─────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(
        description='Валидатор лотов RN-0044 по всем языковым редакциям.'
    )
    ap.add_argument('--lots',    default='./content',
                    help='Корень дерева с .md-файлами лотов (по умолчанию ./content)')
    ap.add_argument('--masters', default='./static/images/boutique',
                    help='Корень дерева с мастер-файлами (по умолчанию ./static/images/boutique)')
    ap.add_argument('--verbose', action='store_true',
                    help='Показать пропущенные файлы и дополнительные сведения')
    args = ap.parse_args()

    lots_root    = Path(args.lots).resolve()
    masters_root = Path(args.masters).resolve()

    if not lots_root.exists():
        print(f'❌ Не найден каталог лотов: {lots_root}', file=sys.stderr)
        print(f'   Укажи путь явно: --lots /путь/к/content', file=sys.stderr)
        sys.exit(2)
    if not masters_root.exists():
        print(f'⚠️  Каталог мастеров не найден: {masters_root}')
        print(f'   Продолжаю без сверки SHA. Проверки форматов и cross-language будут выполнены.')
        masters_root = None

    # ── Сбор файлов ─────────────────────────────────────────────────
    all_md = list(lots_root.rglob('*.md'))
    md_files = []
    skipped = []

    for p in all_md:
        lang = detect_lang(p)
        lot  = detect_lot(p)
        if lang == 'unknown' or lot is None:
            skipped.append(p)
            continue
        md_files.append(p)

    # ── Группировка ─────────────────────────────────────────────────
    groups = defaultdict(dict)  # groups[lot][lang] = {'path':..., 'fm':...}

    for path in md_files:
        lang = detect_lang(path)
        lot  = detect_lot(path)
        fm   = parse_frontmatter(path)
        groups[lot][lang] = {'path': path, 'fm': fm}

    # ── Отчёт о сборе ───────────────────────────────────────────────
    print()
    print('=' * 72)
    print('ВАЛИДАЦИЯ ЛОТОВ RN-0044')
    print('=' * 72)
    print(f'Каталог контента:   {lots_root}')
    print(f'Каталог мастеров:   {masters_root if masters_root else "(не задан)"}')
    print(f'Всего .md найдено:  {len(all_md)}')
    print(f'Из них лотов:       {len(md_files)}')
    print(f'Пропущено:          {len(skipped)}')
    print(f'Уникальных лотов:   {len(groups)}')
    langs_found = sorted({l for langs in groups.values() for l in langs})
    print(f'Языков обнаружено:  {langs_found}')
    print()

    if args.verbose and skipped:
        print(f'─── Пропущены (не похожи на лот): {len(skipped)} ───')
        for p in skipped[:50]:
            print(f'   {p}')
        if len(skipped) > 50:
            print(f'   ... и ещё {len(skipped) - 50}')
        print()

    # ── Сбор ошибок ─────────────────────────────────────────────────
    errors_by_type = defaultdict(list)
    warnings = []

    # ── Проверки внутри файла ───────────────────────────────────────
    for lot, langs in sorted(groups.items()):
        for lang, entry in sorted(langs.items()):
            fm   = entry['fm']
            path = entry['path']

            node_id    = str(fm.get('node_id', '') or '')
            marker     = str(fm.get('marker', '') or '')
            lot_number = str(fm.get('lot_number', '') or '')
            file_hash  = str(fm.get('file_hash', '') or '')
            image_webp = str(fm.get('image_webp', '') or '')
            passport   = str(fm.get('passport_url', '') or '')

            # Формат node_id
            if not RE_NODE_ID.match(node_id):
                errors_by_type['node_id format'].append(
                    f'{path}: node_id = {node_id!r} не соответствует шаблону')

            # Формат marker
            if not RE_MARKER.match(marker):
                errors_by_type['marker format'].append(
                    f'{path}: marker = {marker!r} не соответствует шаблону')

            # Формат lot_number
            if not RE_LOT_NUM.match(lot_number):
                errors_by_type['lot_number format'].append(
                    f'{path}: lot_number = {lot_number!r} (нужно 3 цифры)')

            # Формат SHA-256
            if not RE_HASH.match(file_hash):
                errors_by_type['file_hash format'].append(
                    f'{path}: file_hash = {file_hash!r} не похож на SHA-256')

            # Соответствие lot_number ↔ node_id
            m = re.match(r'^RN-0044-PS-\d{4}-(\d+)\.(\d+)$', node_id)
            if m and lot_number:
                last = m.group(2).zfill(3)
                if last != lot_number:
                    errors_by_type['lot_number vs node_id'].append(
                        f'{path}: node_id = {node_id}, но lot_number = {lot_number}')

            # Соответствие имени файла и node_id
            lot_from_path = detect_lot(path)
            if lot_from_path and m:
                path_num = lot_from_path.split('-')[1]
                node_num = m.group(2).zfill(4)
                if path_num != node_num:
                    errors_by_type['filename vs node_id'].append(
                        f'{path}: файл = {lot_from_path}, node_id = {node_id}')

            # Существование мастер-файла и сверка SHA
            if masters_root and image_webp and file_hash:
                master = find_master(image_webp, masters_root)
                if master is None:
                    errors_by_type['master file missing'].append(
                        f'{path}: мастер для {image_webp} не найден в {masters_root}')
                else:
                    real_hash = sha256_of(master)
                    if real_hash != file_hash:
                        errors_by_type['SHA-256 mismatch'].append(
                            f'{path}\n'
                            f'      заявлено:  {file_hash}\n'
                            f'      реальный:  {real_hash}\n'
                            f'      файл:      {master}')

    # ── Сверка RU/EN/UK одного лота между собой ────────────────────
    must_match = ['node_id', 'lot_number', 'file_hash', 'marker',
                  'image_webp', 'passport_url', 'translationKey']

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
                errors_by_type['cross-language mismatch'].append(
                    f'{lot} · поле «{key}» расходится между языками:\n{detail}')

    # ── Итоговый отчёт ─────────────────────────────────────────────
    total_errors = sum(len(v) for v in errors_by_type.values())

    if total_errors == 0:
        print('✅ Ошибок не найдено.')
    else:
        for etype in sorted(errors_by_type):
            items = errors_by_type[etype]
            print(f'❌ {etype} ({len(items)})')
            for item in items:
                print(f'   {item}')
            print()

    if warnings:
        print('─── Предупреждения ───')
        for w in warnings:
            print(f'   {w}')
        print()

    # ── Итог по лотам: сколько языков у каждого ────────────────────
    if args.verbose:
        print('─── Покрытие лотов по языкам ───')
        for lot, langs in sorted(groups.items()):
            present = sorted(langs.keys())
            missing = sorted(set(['ru', 'en', 'uk']) - set(present))
            line = f'   {lot}: {", ".join(present)}'
            if missing:
                line += f'  ⚠️  отсутствуют: {", ".join(missing)}'
            print(line)
        print()

    print('=' * 72)
    print(f'ИТОГО ошибок: {total_errors}')
    print(f'ИТОГО лотов:  {len(groups)}')
    print('=' * 72)
    print()

    sys.exit(1 if total_errors else 0)


if __name__ == '__main__':
    main()