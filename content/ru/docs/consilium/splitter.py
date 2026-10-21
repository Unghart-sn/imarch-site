import os
import re

def split_lots(master_filepath, output_dir):
    # Создаем целевую папку, если нужно (тут ".")
    os.makedirs(output_dir, exist_ok=True)
    
    if not os.path.exists(master_filepath):
        print(f"❌ Ошибка: файл-источник не найден по пути: {master_filepath}")
        return
        
    with open(master_filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Ищем блоки между === FILENAME: ... === и === END_LOT ===
    pattern = r'===\s*FILENAME:\s*(.*?)\s*===\n(.*?)\n===\s*END_LOT\s*==='
    matches = re.findall(pattern, content, re.DOTALL)
    
    if not matches:
        print("⚠️ Внимание: не найдено ни одного блока по заданному шаблону. Проверь разметку в multy.md!")
        return

    print(f"🔍 Найдено лотов для распаковки: {len(matches)}")
    
    count = 0
    for filename, lot_content in matches:
        filename = filename.strip()
        filepath = os.path.join(output_dir, filename)
        
        clean_content = lot_content.strip() + '\n'
        
        with open(filepath, 'w', encoding='utf-8') as out_f:
            out_f.write(clean_content)
        print(f"✅ Создан файл: {filename}")
        count += 1

    print(f"\n🎉 Успешно распаковано лотов: {count} из {len(matches)}!")

if __name__ == '__main__':
    # Источник и папка назначения — текущая директория
    MASTER_FILE = 'multy.md'
    TARGET_DIR = '.'       
    
    split_lots(MASTER_FILE, TARGET_DIR)