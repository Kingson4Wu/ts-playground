#!/bin/bash

# 完整的设置和测试脚本
# 该脚本会安装所有依赖、重建原生模块并运行所有测试

echo "🚀 开始项目设置和测试..."

# 1. 清理现有依赖（可选）
echo "🗑️  清理现有依赖..."
rm -rf node_modules package-lock.json */node_modules */*/node_modules */package-lock.json */*/package-lock.json

# 2. 安装根目录依赖
echo "📦 安装根目录依赖..."
npm install

# 3. 为每个阶段安装依赖
echo "📂 为每个阶段安装依赖..."

# Stage 1
echo "🔧 安装 Stage 1 依赖..."
cd stage1-foundations
npm install
cd ..

# Stage 2
echo "🔧 安装 Stage 2 依赖..."
cd stage2-cli
npm install

# 安装 Stage 2 练习依赖
for exercise in exercises/*/; do
  if [ -d "$exercise" ] && [ -f "${exercise}package.json" ]; then
    echo "🔧 安装 $exercise 依赖..."
    (cd "$exercise" && npm install)
  fi
done

cd ..

# Stage 3
echo "🔧 安装 Stage 3 依赖..."
cd stage3-backend
npm install

# 安装 Stage 3 练习依赖
for exercise in exercises/*/; do
  if [ -d "$exercise" ] && [ -f "${exercise}package.json" ]; then
    echo "🔧 安装 $exercise 依赖..."
    (cd "$exercise" && npm install)
  fi
done

# 安装 Stage 3 微服务依赖
for exercise in exercises/microservices/*/; do
  if [ -d "$exercise" ] && [ -f "${exercise}package.json" ]; then
    echo "🔧 安装 $exercise 依赖..."
    (cd "$exercise" && npm install)
  fi
done

cd ..

# Stage 4
echo "🔧 安装 Stage 4 依赖..."
cd stage4-production
npm install
cd ..

# 4. 重建可能有问题的原生模块
echo "🔨 重建原生模块..."
cd stage3-backend/exercises/todo-service
npm rebuild sqlite3
cd ../../..

# 5. 运行测试
echo "🧪 运行所有测试..."
npm test

echo "✅ 所有设置和测试完成！"