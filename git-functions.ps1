# Git 工具函数
# 将此文件内容添加到你的 PowerShell 配置文件中

# 快速提交并推送
function git-quick {
    param([string]$msg = "更新内容")
    git add . ; git commit -m $msg ; git push
}

# 查看状态
function git-s {
    git status
}

# 拉取并推送
function git-sync {
    git pull --rebase
    if ($LASTEXITCODE -eq 0) {
        git push
    }
}

# 撤销最后一次提交（保留更改）
function git-undo {
    git reset --soft HEAD~1
}

# 查看提交历史（美化版）
function git-log {
    git log --oneline --graph --decorate --all -10
}

Write-Host "Git 快捷函数已加载！" -ForegroundColor Green
Write-Host "可用命令: git-quick, git-s, git-sync, git-undo, git-log" -ForegroundColor Cyan
