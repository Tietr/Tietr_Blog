# 🎮 DevLog — 个人技术学习博客

[![Deploy Hexo to GitHub Pages](https://github.com/Tietr/Lyra_Learn/actions/workflows/pages.yml/badge.svg)](https://github.com/Tietr/Lyra_Learn/actions/workflows/pages.yml)

> 游戏开发 · 渲染技术 · 引擎架构 · 现代C++ · 工具链

## ✨ 特性

- 🎨 **炫酷动态背景** — Canvas Nest 网络粒子 + Ribbon 流光飘带 + 点击特效 + 打字粒子
- 🌙 **暗黑模式** — 自动跟随时间切换（18:00 → 暗色，6:00 → 亮色）
- 🔍 **全文搜索** — 本地搜索引擎，快速检索
- 📝 **Markdown 写作** — 代码高亮、流程图、数学公式全支持
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
git clone https://github.com/Tietr/Tietr_Blog.git
cd Lyra_Learn

# 安装依赖
npm install

# 启动本地服务器
npm run server
```

浏览器打开 `http://localhost:4000/Tietr_Blog/` 预览。

### 创建新文章

```bash
hexo new post "文章标题"
# → source/_posts/文章标题.md

hexo new draft "草稿标题"
# → source/_drafts/草稿标题.md
```

### 构建 & 部署

Push 到 `main` 分支后，GitHub Actions 自动构建部署到 GitHub Pages。

也可以手动构建：

```bash
hexo generate        # 构建，输出到 public/
hexo clean && hexo generate   # 清理后重新构建
```

## 📖 学习方向

| 方向          | 内容                                   |
| ------------- | -------------------------------------- |
| 🎮 游戏开发   | UE5, Gameplay System, Lyra             |
| 🖼️ 渲染     | Shader, Vulkan/DX, Real-Time Rendering |
| ⚡ 现代C++    | 模板元, C++20/23, 性能优化             |
| 🏗️ 引擎架构 | ECS, 模块化, 插件系统                  |
| 🔧 工具链     | 构建系统, CI/CD, 效率工具              |

## 📄 License

CC BY-NC-SA 4.0
