# Путь к папке i18n
$i18nPath = Join-Path $PSScriptRoot "i18n"

# Создаем папку, если её нет
if (-not (Test-Path $i18nPath)) {
    New-Item -ItemType Directory -Path $i18nPath | Out-Null
    Write-Host "Created i18n folder: $i18nPath"
}

# Содержимое файлов
$files = @{
    "la.toml" = @"
[postedOnDate]
other = "Posted on: {{ .Date }}"

[readMore]
other = "Read more"

[allPosts]
other = "All posts"
"@

    "ar.toml" = @"
[postedOnDate]
other = "نُشر في: {{ .Date }}"

[readMore]
other = "اقرأ المزيد"

[allPosts]
other = "جميع المنشورات"
"@
}

# Создаем файлы с правильной кодировкой UTF-8 без BOM
foreach ($fileName in $files.Keys) {
    $filePath = Join-Path $i18nPath $fileName
    [System.IO.File]::WriteAllText($filePath, $files[$fileName], [System.Text.Encoding]::UTF8)
    Write-Host "Created i18n file: $filePath"
}

Write-Host "Minimal i18n files for Hugo created with UTF-8 encoding!"
