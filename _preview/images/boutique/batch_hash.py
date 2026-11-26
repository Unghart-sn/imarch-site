import hashlib
import os

def calculate_sha256(file_path):
    """Считает SHA-256 хэш файла поблочно для экономии памяти."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def batch_hash_directory(directory_path):
    print(f" Сканирование папки: {directory_path}\n")
    print("| Файл | Корректный SHA-256 Хэш (WebP) |")
    print("|---|---|")
    
    valid_extensions = ('.webp', '.png', '.jpg', '.jpeg')
    
    if not os.path.exists(directory_path):
        print(f"Ошибка: Указанная папка не найдена -> {directory_path}")
        return

    files = sorted(os.listdir(directory_path))
    count = 0
    for filename in files:
        if filename.lower().endswith(valid_extensions):
            file_path = os.path.join(directory_path, filename)
            if os.path.isfile(file_path):
                file_hash = calculate_sha256(file_path)
                print(f"| `{filename}` | `{file_hash}` |")
                count += 1
                
    print(f"\n Обработано файлов: {count}")

if __name__ == "__main__":
    # Указан ваш точный путь к папке с веб-превью
    target_dir = r"C:\Users\user\vis-realitis\static\images\boutique"
    batch_hash_directory(target_dir)