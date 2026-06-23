# 🎮 Lyra Learn — UE5 Lyra 学习博客

[![Deploy Hexo to GitHub Pages](https://github.com/yourusername/Lyra_Learn/actions/workflows/pages.yml/badge.svg)](https://github.com/yourusername/Lyra_Learn/actions/workflows/pages.yml)

> 深入探索 Unreal Engine 5 Lyra Starter Game 的架构、Gameplay、系统设计与最佳实践。

## ✨ 特性

- 🎨 **炫酷动态背景** — Canvas Nest 网络粒子 + Ribbon 流光飘带 + 点击特效
- 🌙 **暗黑模式** — 自动跟随时间切换（18:00 → 暗色，6:00 → 亮色）
- 🔍 **全文搜索** — 本地搜索引擎
- 📝 **Markdown 写作** — 支持代码高亮、Mermaid 流程图、数学公式
- 🚀 **GitHub Pages 部署** — Push 即自动构建发布

## 🗂️ 项目结构

```
Lyra_Learn/
├── temp/                    # 🔧 临时文件存放区域
├── source/                  # 📝 Hexo 源文件
│   ├── _posts/              # 博客文章 (Markdown)
│   ├── _drafts/             # 草稿
│   ├── resources/           # 📦 资源文件
│   │   ├── images/          # 截图、架构图
│   │   ├── code/            # 代码示例
│   │   ├── downloads/       # 下载文件
│   │   └── videos/          # 演示视频
│   └── about/               # 关于页面
├── themes/butterfly/        # 🦋 Butterfly 主题
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # Butterfly 炫酷特效配置
└── .github/workflows/       # GitHub Actions 自动部署
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9
- Git

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/Lyra_Learn.git
cd Lyra_Learn

# 安装依赖
npm install

# 启动本地服务器
hexo server
# 或
npm run server
```

浏览器打开 `http://localhost:4000/Lyra_Learn/` 预览。

### 创建新文章

```bash
hexo new post "My UE5 Lyra Note"
```

Markdown 文件将生成在 `source/_posts/` 目录下。

### 构建 & 部署

Push 到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

也可以手动构建：

```bash
hexo generate
# 输出在 public/ 目录
```

## 📖 学习路线

| Phase | 主题 | 状态 |
|-------|------|------|
| 1 | 项目架构概览 | 🔜 |
| 2 | 核心 Gameplay 系统 | 🔜 |
| 3 | UI 与交互 | 🔜 |
| 4 | 多人游戏与网络 | 🔜 |
| 5 | 进阶主题 | 🔜 |

## 📄 License

CC BY-NC-SA 4.0
