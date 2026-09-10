# 案例录入模板

把社交平台散图整理进官网时，按下面字段补全，再写入 `src/content/cases.ts`，图片放到 `public/images/cases/`。

## 必填字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `slug` | URL 用英文短横线 | `temple-hall-painting` |
| `title` | 案例标题 | 某寺庙大雄宝殿梁枋彩绘 |
| `location` | 可模糊到市/县 | 华东 · 某市 |
| `category` | 彩绘 / 壁画 / 塑像 / 修缮修复 / 综合工程 | 彩绘 |
| `scale` | 规模一句话 | 正殿梁枋、斗拱及局部天花 |
| `duration` | 工期一句话 | 驻场约两个月 |
| `summary` | 列表摘要，建议 40–60 字 | … |
| `body` | 2–3 段正文 | 背景、做法、结果 |
| `craftNotes` | 3 条工艺要点 | 矿物颜料分层罩染… |
| `cover` | 封面图路径 | `/images/cases/xxx-cover.jpg` |
| `images` | 过程/成片 2–4 张 | `{ src, caption }` |
| `featured` | 是否上首页精选 | `true` / `false` |

## 建议配图（每个案例）

1. **封面 / 远景环境** 1 张（横图 16:10 或 3:2）
2. **工艺特写** 2–3 张（手、颜料、沥粉、泥塑胎体、局部纹样）
3. **完成全貌** 1 张

优先裁切清晰局部，远景糊片可先不用。避免强滤镜与过曝金光。

## 手机浏览注意

- 封面与成片统一横图，手机上全宽显示更稳
- 竖图短视频可后续嵌在案例页，首版可不强求
- 文件命名：`{slug}-cover.jpg`、`{slug}-1.jpg`…

## 拍摄补强最低清单

- [ ] 每个代表项目：1 远景 + 3 特写 + 1 全貌
- [ ] 统一横图比例一套，便于网页排版
- [ ] 导出原图备份，官网用压缩版（建议长边 ≤ 2400px）

## 粘贴用骨架

```ts
{
  slug: "your-slug",
  title: "",
  location: "",
  category: "彩绘",
  scale: "",
  duration: "",
  summary: "",
  body: ["", ""],
  craftNotes: ["", "", ""],
  cover: "/images/cases/your-slug-cover.jpg",
  images: [
    { src: "/images/cases/your-slug-1.jpg", caption: "" },
    { src: "/images/cases/your-slug-2.jpg", caption: "" },
    { src: "/images/cases/your-slug-3.jpg", caption: "" },
  ],
  featured: false,
}
```
