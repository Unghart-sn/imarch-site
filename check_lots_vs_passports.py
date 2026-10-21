#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_lots_vs_passports.py (v3)

Сверяет лоты с блоком 2.1 мультипаспортов.
Не зависит от того, как закрыта обёртка .passport-markers —
находит все блоки по открывающему тегу.
"""

import sys
import re
from pathlib import Path
from collections import defaultdict


# ── Парсинг frontmatter лота ────────────────────────────────────────

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


# ── Парсинг блоков 2.1 из мультипаспорта ────────────────────────────

def parse_passport_blocks(path: Path):
    """
    Возвращает список {'node_id','marker','file','sha'} для блоков 2.1.
    Ищет все вхождения <div class="passport-marker"> в секции 2.
    Блоки 2.2 (с классом --master) игнорируются — у них другой тег.
    """
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        return []

    # Секция 2 — между <a id="section-2"> и <a id="section-3">
    s2 = text.find('<a id="section-2"')
    s3 = text.find('<a id="section-3"')
    if s2 == -1:
        s2 = text.find('#### 2.')
    if s3 == -1:
        s3 = text.find('#### 3.', s2 + 1)
        if s3 == -1:
            s3 = text.find('#### 5.', s2 + 1)
    if s2 == -1:
        return []
    if s3 == -1:
        s3 = len(text)
    section = text[s2:s3]

    # Все открывающие теги блоков 2.1 (без --master)
    positions = [m.start() for m in re.finditer(
        r'<div class="passport-marker">', section
    )]

    blocks = []
    for i, pos in enumerate(positions):
        end = positions[i + 1] if i + 1 < len(positions) else len(section)
        chunk = section[pos:end]
        entry = {}
        m = re.search(r'passport-marker__label">node_id:</span>\s*<code>([^<]+)</code>', chunk)
        if m: entry['node_id'] = m.group(1).strip()
        m = re.search(r'passport-marker__label">(?:Marker|Маркер):</span>\s*<code>([^<]+)</code>', chunk)
        if m: entry['marker'] = m.group(1).strip()
        m = re.search(r'passport-marker__label">(?:File|Файл):</span>\s*<code>([^<]+)</code>', chunk)
        if m: entry['file'] = m.group(1).strip()
        m = re.search(r'passport-marker__label">SHA-256:</span>\s*<code>([^<]+)</code>', chunk)
        if m: entry['sha'] = m.group(1).strip()
        if entry:
            blocks.append(entry)
    return blocks


# ── Определение лота и языка ────────────────────────────────────────

RE_LANG     = re.compile(r'(?:^|[\\/])(ru|en|uk)(?:[\\/]|$)')
RE_LOT_FILE = re.compile(r'^bb-(\d{4})\.md$')

def detect_lang(path: Path):
    m = RE_LANG.search(str(path).replace('\\', '/'))
    return m.group(1) if m else None

def detect_lot(path: Path):
    m = RE_LOT_FILE.match(path.name)
    return f'bb-{m.group(1)}' if m else None


# ── Основная логика ─────────────────────────────────────────────────

def main():
    content_root = Path('./content').resolve()
    if not content_root.exists():
        print(f'❌ Нет каталога: {content_root}', file=sys.stderr)
        sys.exit(2)

    cache = {}
    diag = {}

    def get_passport_entry(node_id):
        m = re.match(r'^RN-0044-PS-(\d{4})-', node_id)
        if not m:
            return None
        series = m.group(1)
        if series not in cache:
            candidates = list(content_root.rglob(f'rn-0044-ps-pch-{series}.md'))
            if not candidates:
                candidates = list(content_root.rglob(f'RN-0044-PS-PCH-{series}.md'))
            if not candidates:
                cache[series] = {}
                diag[series] = 'файл не найден'
            else:
                ru_path = next((p for p in candidates
                                if '/ru/' in str(p).replace('\\', '/')), candidates[0])
                blocks = parse_passport_blocks(ru_path)
                cache[series] = {b.get('node_id'): b for b in blocks}
                diag[series] = f'{ru_path.name} → блоков найдено: {len(blocks)}'
        return cache[series].get(node_id)

    errors = defaultdict(list)
    checked = 0

    for path in sorted(content_root.rglob('bb-*.md')):
        lot  = detect_lot(path)
        lang = detect_lang(path)
        if not lot or not lang:
            continue

        fm = parse_frontmatter(path)
        node_id = str(fm.get('node_id', '') or '')
        marker  = str(fm.get('marker', '') or '')
        f_hash  = str(fm.get('file_hash', '') or '')
        image   = str(fm.get('image_webp', '') or '')

        if not node_id:
            errors['lot without node_id'].append(str(path))
            continue

        pp = get_passport_entry(node_id)
        if pp is None:
            errors['passport entry missing'].append(
                f'{path}: node_id {node_id} не найден в мультипаспорте')
            continue

        checked += 1

        if pp.get('node_id') and pp['node_id'] != node_id:
            errors['node_id'].append(f'{path}: лот={node_id} паспорт={pp["node_id"]}')
        if pp.get('marker') and pp['marker'] != marker:
            errors['marker'].append(
                f'{path}\n      лот:      {marker}\n      паспорт:  {pp["marker"]}')
        if pp.get('sha') and pp['sha'] != f_hash:
            errors['file_hash'].append(
                f'{path}\n      лот:      {f_hash}\n      паспорт:  {pp["sha"]}')
        if pp.get('file') and image and Path(pp['file']).stem != Path(image).stem:
            errors['image_webp'].append(
                f'{path}: лот={image} паспорт={pp["file"]}')

    print()
    print('=' * 72)
    print('СВЕРКА: ЛОТЫ ↔ БЛОК 2.1 МУЛЬТИПАСПОРТОВ (v3)')
    print('=' * 72)
    print(f'Проверено пар лот-паспорт: {checked}')
    print()

    if diag:
        print('─── Диагностика парсеров паспортов ───')
        for series, info in sorted(diag.items()):
            print(f'   PS-{series}: {info}')
        print()

    total = sum(len(v) for v in errors.values())
    if total == 0:
        print('✅ Все лоты совпадают с мультипаспортами по 4 полям:')
        print('   node_id, marker, file_hash, image_webp')
    else:
        for etype in sorted(errors):
            items = errors[etype]
            print(f'❌ {etype} ({len(items)})')
            for item in items:
                print(f'   {item}')
            print()

    print('=' * 72)
    print(f'ИТОГО расхождений: {total}')
    print('=' * 72)
    print()

    sys.exit(1 if total else 0)


if __name__ == '__main__':
    main()