# Node.js 原生模块编译错误解决方案

## 问题分析

- **错误包**: `utf-8-validate` 和 `bufferutil`
- **错误原因**: 这些原生模块与 Node.js v24.12.0 不兼容
- **错误类型**: V8 API 变更导致的编译失败

## 解决方案

### 方案 1: 使用兼容的 Node.js 版本 (推荐)

```bash
# 使用 nvm 安装兼容版本
nvm install 22
nvm use 22

# 或者直接设置
nvm use 22
```

### 方案 2: 跳过原生模块安装

```bash
# 安装时跳过可选依赖
npm install --ignore-scripts

# 或者使用环境变量
npm_config_ignore_scripts=true npm install
```

### 方案 3: 强制安装原生模块

```bash
# 清理 node_modules 和 lock 文件
rm -rf node_modules pnpm-lock.yaml

# 使用不同的注册表或强制安装
npm install --force
```

### 方案 4: 使用替代方案

```bash
# 检查是否有纯 JavaScript 替代方案
npm ls utf-8-validate
npm ls bufferutil
```

## 立即解决步骤

1. **推荐**: 降级到 Node.js 22.x 版本
2. **临时**: 跳过原生模块安装
3. **验证**: 运行项目检查功能是否正常

## 相关依赖追踪

这些包通常是以下库的依赖：

- `ws` (WebSocket)
- `socket.io`
- 其他实时通信库
