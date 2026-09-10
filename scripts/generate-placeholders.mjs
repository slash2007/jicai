import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function svg({ title, subtitle, w = 1600, h = 1000, dark = false }) {
  const bg = dark ? "#2C2A26" : "#D8D0C0";
  const fg = dark ? "#E8E2D6" : "#1A1814";
  const accent = "#8B2E2E";
  const gold = "#A68B4B";
  const cyan = "#3D5A5B";
  const g0 = dark ? "#3a3530" : "#E8E2D6";
  const g2 = dark ? "#1a1814" : "#b7ae9d";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${g0}"/>
      <stop offset="55%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${g2}"/>
    </linearGradient>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="${gold}" stroke-opacity="0.12" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="8%" y="18%" width="84%" height="64%" fill="none" stroke="${gold}" stroke-opacity="0.35" stroke-width="2"/>
  <path d="M ${w * 0.12} ${h * 0.72} Q ${w * 0.5} ${h * 0.45} ${w * 0.88} ${h * 0.68}" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="3"/>
  <circle cx="${w * 0.78}" cy="${h * 0.28}" r="36" fill="none" stroke="${cyan}" stroke-opacity="0.5" stroke-width="2"/>
  <text x="8%" y="86%" fill="${fg}" fill-opacity="0.9" font-family="serif" font-size="42">${title}</text>
  <text x="8%" y="92%" fill="${fg}" fill-opacity="0.55" font-family="sans-serif" font-size="24">${subtitle}</text>
</svg>`;
}

const files = [
  ["public/images/hero.svg", { title: "吉彩古建", subtitle: "现场氛围占位 · 请替换为实景大图", w: 1920, h: 1080, dark: true }],
  ["public/images/service-painting.svg", { title: "彩绘", subtitle: "梁枋 · 斗拱 · 纹饰", dark: false }],
  ["public/images/service-sculpture.svg", { title: "塑像", subtitle: "泥塑 · 开脸 · 装金", dark: true }],
  ["public/images/service-restoration.svg", { title: "修缮补绘", subtitle: "现状保护 · 谨慎补色", dark: false }],
  ["public/images/cases/hall-cover.svg", { title: "大雄宝殿彩绘", subtitle: "案例封面占位", dark: true }],
  ["public/images/cases/hall-1.svg", { title: "梁枋局部", subtitle: "过程/成片占位", dark: false }],
  ["public/images/cases/hall-2.svg", { title: "斗拱特写", subtitle: "过程/成片占位", dark: true }],
  ["public/images/cases/hall-3.svg", { title: "现场施工", subtitle: "过程/成片占位", dark: false }],
  ["public/images/cases/sculpture-cover.svg", { title: "观音殿塑像", subtitle: "案例封面占位", dark: true }],
  ["public/images/cases/sculpture-1.svg", { title: "主尊全貌", subtitle: "过程/成片占位", dark: false }],
  ["public/images/cases/sculpture-2.svg", { title: "衣纹装金", subtitle: "过程/成片占位", dark: true }],
  ["public/images/cases/sculpture-3.svg", { title: "泥塑过程", subtitle: "过程/成片占位", dark: false }],
  ["public/images/cases/restore-cover.svg", { title: "长廊修缮", subtitle: "案例封面占位", dark: true }],
  ["public/images/cases/restore-1.svg", { title: "修缮前", subtitle: "过程/成片占位", dark: false }],
  ["public/images/cases/restore-2.svg", { title: "补绘过程", subtitle: "过程/成片占位", dark: true }],
  ["public/images/cases/restore-3.svg", { title: "完成后", subtitle: "过程/成片占位", dark: false }],
  ["public/images/cases/compound-cover.svg", { title: "综合工程", subtitle: "案例封面占位", dark: true }],
  ["public/images/cases/compound-1.svg", { title: "正殿完成", subtitle: "过程/成片占位", dark: false }],
  ["public/images/cases/compound-2.svg", { title: "塑像与梁枋", subtitle: "过程/成片占位", dark: true }],
  ["public/images/cases/compound-3.svg", { title: "驻场节点", subtitle: "过程/成片占位", dark: false }],
];

fs.mkdirSync(path.join(root, "public/images/cases"), { recursive: true });

for (const [file, opts] of files) {
  fs.writeFileSync(path.join(root, file), svg(opts));
}

console.log("wrote", files.length, "svgs");
