# 吉彩古建官网

寺庙与古建彩绘、壁画、塑像工作室官网。技术栈：Next.js App Router + TypeScript + Tailwind CSS。

## 本地运行

需要 Node.js ≥ 20（推荐 24 LTS）。

```bash
nvm use 24.20.0
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 内容与素材

- 站点文案 / 联系方式：`src/content/site.ts`
- 案例数据：`src/content/cases.ts`
- 案例录入模板：`content/case-template.md`
- 素材替换说明：`content/ASSETS.md`

## 页面

| 路径 | 说明 |
|------|------|
| `/` | 首页 |
| `/works` | 作品列表（可筛选） |
| `/works/[slug]` | 案例详情 |
| `/craft` | 工艺与服务 |
| `/about` | 关于工作室 |
| `/contact` | 联系合作 |

## 移动端

布局为移动优先：汉堡导航、全宽案例、横滑筛选、安全区底部咨询按钮、大触控表单。自检清单见 `content/ASSETS.md`。
