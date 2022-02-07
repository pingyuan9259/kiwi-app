#!/bin/bash 

commitText=$1 

# 美化代码
npx prettier index.ts core/**/* components/**/* styled/**/* types/**/* --write

# # 编译代码
# npm run build || exit 1;

# 提交代码
git pull
git add -A
git commit -m \"$commitText\"

# 发布Npm
npm version patch
npm publish

# 将代码推送至仓库
git push
