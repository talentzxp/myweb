# Git 快速操作脚本
# 使用方法: .\git-quick.ps1 "提交信息"

param(
    [Parameter(Mandatory=$false)]
    [string]$message = "更新内容"
)

Write-Host "正在添加文件..." -ForegroundColor Cyan
git add .

Write-Host "正在提交更改..." -ForegroundColor Cyan
git commit -m $message

Write-Host "正在推送到GitHub..." -ForegroundColor Cyan
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 成功推送到GitHub!" -ForegroundColor Green
} else {
    Write-Host "✗ 推送失败，请检查错误信息" -ForegroundColor Red
}
