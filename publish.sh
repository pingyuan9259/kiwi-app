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

# 发布Npm，发布带有@命名空间的包默认为私有包（收费），需要添加--access public参数进行公有化
npm version patch
npm publish --access public

# 将代码推送至仓库
git push
