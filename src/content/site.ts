export const site = {
  name: "吉彩古建",
  tagline: "彩绘 · 壁画 · 塑像",
  support:
    "从现场勘察到落成，按传统工艺承接寺庙殿宇彩绘、壁画、古建修缮与塑像工程。",
  phone: "138-0000-0000",
  wechat: "jicaigujian",
  region: "中国 · 山西",
  email: "hello@jicaigujian.com",
  seoTitle: "吉彩古建｜寺庙古建彩绘 · 壁画 · 塑像",
  seoDescription:
    "吉彩古建工作室承接寺庙、古建筑梁枋彩绘、殿壁壁画、塑像与修缮补绘工程，展示作品案例，欢迎工程方与私人客户咨询合作。",
} as const;

/** 主理人 / 迎客位 — 文案与肖像可随时替换 */
export const host = {
  /** 左侧竖匾大字 */
  plaqueName: "究祥",
  /** 竖匾下方小字 */
  title: "主理人",
  /** 照片下方署名 */
  name: "吉先生",
  honorific: "迎客",
  roleLine: "吉彩古建",
  greeting: "过山门，见人，看活。",
  lead: "数十年来，我经手近百座庙宇的彩绘、壁画、塑像与修缮。这座「殿」里没有销售话术——我领您走侧廊看手艺，进正殿看工程，到结缘处再说能否承接。",
  bio: [
    "过得了山门，才谈得上共事；共事得好，才算一段缘。",
    "殿宇有缘相见，活计还是要一笔一笔落到梁上、壁上、泥胎上。",
  ],
  invite: "随我入廊",
  portrait: "/images/demo/host-portrait.jpg",
  portraitNote: "",
} as const;

export const navItems = [
  { href: "#zhuchi", label: "主理人" },
  { href: "#celang", label: "手艺" },
  { href: "#zhengdian", label: "作品" },
  { href: "#xiangan", label: "结缘" },
] as const;

/** 侧廊 · 工序龛（文案从简：一句说明 + 旁白 + 工序名） */
export const services = [
  {
    id: "painting",
    title: "彩绘",
    summary: "梁枋、斗拱、天花与檐下纹饰。",
    image: "/images/demo/craft-painting.jpg",
    imageWidth: 1024,
    imageHeight: 687,
    layout: "split" as const,
    voice: "地仗不稳，金碧再满也是虚的。",
    steps: ["地仗", "分中起谱", "沥粉", "贴金", "涂色渲染"],
  },
  {
    id: "mural",
    title: "壁画",
    summary: "殿壁、廊壁上的人物故事与大幅画面。",
    image: "/images/demo/craft-mural.jpg",
    imageWidth: 1024,
    imageHeight: 572,
    layout: "stack" as const,
    voice: "远看要成章，近看要经得起端详。",
    steps: ["起稿分格", "落墨", "设色", "沥粉贴金"],
  },
  {
    id: "sculpture",
    title: "塑像",
    summary: "泥塑、木胎与妆銮，开脸装金。",
    image: "/images/demo/craft-sculpture.jpg",
    imageWidth: 1024,
    imageHeight: 572,
    layout: "stack" as const,
    voice: "眉眼定了，整殿的气就定了。",
    steps: ["扎骨架", "上粗泥", "上细泥", "妆銮开脸"],
  },
  {
    id: "restoration",
    title: "修缮补绘",
    summary: "能留则留，必补才补。",
    image: "/images/demo/craft-restoration.jpg",
    imageWidth: 1024,
    imageHeight: 572,
    layout: "stack" as const,
    voice: "哪里动、哪里不动，要比新做更谨慎。",
    steps: ["勘察", "定去留", "清理加固", "补绘", "防护"],
  },
] as const;
