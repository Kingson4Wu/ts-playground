#!/usr/bin/env bash
# Rewrite the latest git commit message with custom rules

set -e

# 获取最近一次提交的提交信息
msg=$(git log -1 --pretty=%B)

# Step 1: 把 "\n" 转换成真正的换行
msg="${msg//\\n/
}"

# Step 2: 删除包含 Co-authored-by 的整行
msg=$(echo "$msg" | grep -v "Co-authored-by")

# Step 3: 删除多余空行（最多一个连续空行）
msg=$(echo "$msg" | awk 'NF{blank=0} !NF{blank++} blank<2')

# Step 4: 去掉首尾空白行（无 tac 方案）
msg=$(echo "$msg" | sed '/./,$!d' | sed -e :a -e '/^\n*$/{$d;N;};/\n$/ba')

# 使用 --amend 重写最新提交信息
GIT_COMMITTER_DATE="$(git log -1 --pretty=format:%cI)" \
GIT_AUTHOR_DATE="$(git log -1 --pretty=format:%aI)" \
git commit --amend -m "$msg" --no-edit --no-verify
