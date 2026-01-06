#!/bin/bash

# Node.js 原生模块编译错误修复脚本
# 用于解决 utf-8-validate 和 bufferutil 在 Node.js v24.12.0 上的编译问题

echo "🔧 开始修复 Node.js 原生模块编译错误..."

# 检查当前 Node.js 版本
echo "📍 当前 Node.js 版本: $(node --version)"

# 方案 1: 检查是否有 nvm 可用
if command -v nvm &> /dev/null; then
    echo "✅ 检测到 nvm，准备切换到 Node.js 22.x..."
    
    # 安装 Node.js 22 (如果还没有安装)
    if ! nvm list | grep -q "v22"; then
        echo "📦 安装 Node.js 22..."
        nvm install 22
    fi
    
    # 切换到 Node.js 22
    echo "🔄 切换到 Node.js 22..."
    nvm use 22
    
    echo "✅ 已切换到 Node.js: $(node --version)"
else
    echo "⚠️  未检测到 nvm，尝试其他解决方案..."
fi

# 清理旧的安装
echo "🧹 清理 node_modules 和锁文件..."
rm -rf node_modules
rm -f pnpm-lock.yaml
rm -rf ~/.pnpm-store

# 方案 2: 跳过原生模块编译
echo "📦 使用忽略脚本模式安装依赖..."
export npm_config_ignore_scripts=true
export npm_config_build_from_source=false

# 尝试使用 pnpm 安装（跳过脚本）
echo "🔧 使用 pnpm 安装，跳过原生模块编译..."
pnpm install --ignore-scripts

# 如果失败，尝试 npm
if [ $? -ne 0 ]; then
    echo "⚠️  pnpm 安装失败，尝试 npm..."
    npm install --ignore-scripts
fi

# 验证安装
echo "🔍 验证关键包是否可用..."
if [ -d "node_modules/.pnpm/ws" ] || [ -d "node_modules/ws" ]; then
    echo "✅ ws 库安装成功"
else
    echo "❌ ws 库安装失败"
fi

echo "🎉 修复脚本执行完成！"
echo ""
echo "💡 建议:"
echo "1. 如果还有问题，考虑使用 Node.js 22.x LTS 版本"
echo "2. 或者在 package.json 中将 engines 设置为 'node': '^22.0.0'"
echo "3. 检查项目文档是否有推荐的 Node.js 版本"
