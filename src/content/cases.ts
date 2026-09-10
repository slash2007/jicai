export type CaseCategory =
  | "彩绘"
  | "壁画"
  | "塑像"
  | "修缮修复"
  | "综合工程";

export type CaseStudy = {
  slug: string;
  title: string;
  location: string;
  category: CaseCategory;
  scale: string;
  duration: string;
  summary: string;
  body: string[];
  craftNotes: string[];
  cover: string;
  images: { src: string; caption: string }[];
  featured?: boolean;
};

export const categories: CaseCategory[] = [
  "彩绘",
  "壁画",
  "塑像",
  "修缮修复",
  "综合工程",
];

export const cases: CaseStudy[] = [
  {
    slug: "temple-hall-painting",
    title: "某寺庙大雄宝殿梁枋彩绘",
    location: "华东 · 某市",
    category: "彩绘",
    scale: "正殿梁枋、斗拱及局部天花",
    duration: "驻场约两个月",
    summary:
      "按传统官式纹样体系完成殿内梁枋彩绘，统一矿物色阶，沥粉贴金点缀关键部位。",
    body: [
      "委托方希望在保留殿宇原有空间气质的前提下，恢复梁枋彩绘的层次与完整度。进场前完成形制测绘与旧迹比对，确定可保留层与需重绘范围。",
      "施工以地仗整理为基础，再分层上色。斗拱与枋心纹样控制在同一色温内，避免新旧并置时的跳色。贴金仅用于额枋重点部位，保持殿内沉稳。",
    ],
    craftNotes: [
      "矿物颜料分层罩染，控制光泽",
      "沥粉线条先小样后上梁",
      "贴金避开潮湿季节高峰",
    ],
    cover: "/images/demo/painting-2.jpg",
    images: [
      { src: "/images/demo/painting-2.jpg", caption: "正殿额枋与斗拱彩绘" },
      { src: "/images/demo/painting-1.jpg", caption: "天花云纹彩绘局部" },
      { src: "/images/demo/painting-2.jpg", caption: "梁枋沥粉贴金细部" },
    ],
    featured: true,
  },
  {
    slug: "temple-wall-mural",
    title: "某寺庙殿壁故事壁画",
    location: "华北 · 某县",
    category: "壁画",
    scale: "正殿两壁大幅画面",
    duration: "驻场约七周",
    summary:
      "按殿壁尺度完成人物故事壁画，远看成章、近看可辨，与梁枋彩绘色温相互呼应而不混作一谈。",
    body: [
      "委托方要求壁画承担殿内叙事，又不能压过主尊。进场后先按壁面分格起稿，确认主次人物与动线后再落墨设色。",
      "大面颜色分层罩染，冠饰法器局部沥粉贴金。完工后在殿内自然光与香火光下多次校对，避免远看发花、近看发平。",
    ],
    craftNotes: [
      "构图分格先定故事格局",
      "整壁色温与梁枋彩绘分开控制",
      "贴金克制，不抢主神",
    ],
    cover: "/images/demo/painting-3.jpg",
    images: [
      { src: "/images/demo/painting-3.jpg", caption: "殿壁人物与云气" },
      { src: "/images/demo/painting-1.jpg", caption: "壁画设色层次局部" },
      { src: "/images/demo/painting-3.jpg", caption: "冠饰沥粉贴金细部" },
    ],
    featured: true,
  },
  {
    slug: "guanyin-sculpture",
    title: "观音殿主尊塑像彩妆",
    location: "华南 · 某县",
    category: "塑像",
    scale: "主尊一尊及两侧侍从",
    duration: "约六周",
    summary:
      "泥塑胎体整形后完成开脸、衣纹着色与局部装金，强调静穆的殿内观感。",
    body: [
      "原塑像衣纹残损较多，面部神态尚可辨识。方案以「保神态、补衣纹、统一色」为原则，避免过度翻新导致的舞台感。",
      "开脸阶段多次与委托方确认眉眼与唇色深浅，装金控制在冠饰与璎珞，使主尊在香火光线下仍保持沉静。",
    ],
    craftNotes: [
      "胎体补强后再做表层",
      "开脸分多次薄染",
      "衣纹褶皱按原塑走向修补",
    ],
    cover: "/images/demo/sculpture-2.jpg",
    images: [
      {
        src: "/images/demo/sculpture-1.jpg",
        caption: "殿内护法塑像与木构",
      },
      { src: "/images/demo/sculpture-2.jpg", caption: "主尊与胁侍整体落成" },
      { src: "/images/demo/sculpture-3.jpg", caption: "列坐造像与殿宇进深" },
    ],
    featured: true,
  },
  {
    slug: "corridor-restoration",
    title: "古建长廊彩绘修缮补绘",
    location: "西南 · 某景区",
    category: "修缮修复",
    scale: "长廊十余间局部补绘",
    duration: "分期施工约三周",
    summary:
      "针对风化剥落与局部洇色，按现状谨慎补绘，使新旧衔接自然，便于开放参观。",
    body: [
      "长廊长期日晒雨淋，枋心与檐下彩绘出现大面积粉化。先清理不稳固层，再按残留色块取样配色，避免整段「一新」破坏历史层次。",
      "游客动线不中断的前提下采用分区围挡，夜间与闭园时段推进关键工序，降低对景区运营的影响。",
    ],
    craftNotes: [
      "残色取样后再调色",
      "补绘边界做柔和过渡",
      "露天部位加强耐候处理",
    ],
    cover: "/images/demo/painting-1.jpg",
    images: [
      { src: "/images/demo/painting-1.jpg", caption: "补绘后枋心云纹层次" },
      { src: "/images/demo/painting-2.jpg", caption: "檐下彩绘接茬" },
      { src: "/images/demo/painting-1.jpg", caption: "长廊补绘后整体观感" },
    ],
    featured: true,
  },
  {
    slug: "compound-project",
    title: "乡村庙宇彩绘壁画与塑像综合工程",
    location: "华北 · 某乡镇",
    category: "综合工程",
    scale: "正殿梁枋彩绘 + 殿壁壁画 + 三尊塑像",
    duration: "驻场约十周",
    summary:
      "同步推进梁枋彩绘、殿壁壁画与塑像，统一工期节点，一次交付可使用的殿宇空间。",
    body: [
      "该项目周期紧、交叉作业多。彩绘、壁画与塑像班组共用进场窗口：先完成塑像胎体与地仗，再分别推进梁枋纹样与壁面故事，最后统一校对色温。",
      "交付时一并提供日常除尘与潮湿季节注意事项，便于村庙后续自行保养。",
    ],
    craftNotes: [
      "梁枋彩绘与壁画色温分开控制再统一",
      "脚手架一次搭设分区复用",
      "交付附简易保养说明",
    ],
    cover: "/images/demo/sculpture-3.jpg",
    images: [
      { src: "/images/demo/sculpture-3.jpg", caption: "正殿综合落成进深" },
      { src: "/images/demo/sculpture-2.jpg", caption: "塑像与梁架呼应" },
      { src: "/images/demo/painting-2.jpg", caption: "梁枋彩绘配套" },
      { src: "/images/demo/painting-3.jpg", caption: "殿壁壁画局部" },
    ],
    featured: true,
  },
];

export function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug);
}

export function getFeaturedCases() {
  return cases.filter((item) => item.featured);
}
