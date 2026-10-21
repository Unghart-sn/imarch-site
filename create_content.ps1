# create_i18n.ps1
$i18nPath = Join-Path -Path $PSScriptRoot -ChildPath "i18n"

# Создаем папку i18n, если нет
if (-Not (Test-Path $i18nPath)) {
    New-Item -Path $i18nPath -ItemType Directory | Out-Null
}

# Определяем языки и их содержимое
$languages = @{
    "la" = @"
[postedOnDate]
other = \"Posted on {{ .Date }}\"

[byAuthor]
other = \"by {{ .Author }}\"

[readMore]
other = \"Read more\"
"@

    "ar" = @"
[postedOnDate]
other = \"Posted on {{ .Date }}\"

[byAuthor]
other = \"by {{ .Author }}\"

[readMore]
other = \"Read more\"
"@
}

# Создаем файлы для каждого языка
foreach ($lang in $languages.Keys) {
    $filePath = Join-Path -Path $i18nPath -ChildPath "$lang.toml"
    Set-Content -Path $filePath -Value $languages[$lang] -Encoding UTF8
}

Write-Host "Minimal i18n files created successfully for: $($languages.Keys -join ', ')"
