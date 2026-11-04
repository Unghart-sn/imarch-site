# start.ps1  IMARCH dev server (Windows-friendly)
# Убивает всех зомби-hugo, запускает чистый Hugo в фоне на порту 1314.
# Использование: .\start.ps1

Write-Host 'Killing zombie hugo processes...' -ForegroundColor Yellow
Get-Process -Name hugo -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host 'Starting Hugo on port 1314...' -ForegroundColor Yellow
Start-Process -FilePath 'hugo' -ArgumentList 'server', '--port', '1314', '--disableFastRender' -WindowStyle Minimized

Write-Host ''
Write-Host 'Hugo started in background (minimized window).' -ForegroundColor Green
Write-Host 'Wait ~30 seconds for build to complete.' -ForegroundColor Green
Write-Host ''
Write-Host 'Open: http://localhost:1314/app/' -ForegroundColor Cyan
Write-Host ''
Write-Host 'To stop: Get-Process -Name hugo | Stop-Process -Force' -ForegroundColor DarkGray