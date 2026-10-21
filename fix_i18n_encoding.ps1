$files = Get-ChildItem -Path .\i18n\*.toml

foreach ($file in $files) {
    Write-Host "Fixing encoding for $($file.FullName)"
    $content = Get-Content $file.FullName -Raw
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

Write-Host "All i18n files fixed to UTF-8 without BOM!"
