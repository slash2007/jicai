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
  roleLine: "吉彩古建主理人",
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

/** 侧廊 · 工序龛（正殿放成片，这里放怎么做；步骤数按门类实际，不强行对齐） */
export const services = [
  {
    id: "painting",
    title: "彩绘",
    summary:
      "殿宇梁枋、斗拱、天花与檐下纹饰。官式纹样与矿物色阶，金碧只点在该亮的地方。",
    image: "/images/demo/craft-painting.jpg",
    /** 原图像素，用于布局与防裁切 */
    imageWidth: 1024,
    imageHeight: 687,
    /** split：图文并排；stack：图上全文下（更宽拼图） */
    layout: "split" as const,
    lead: "梁枋彩画不是四步填空。地仗与起谱做不好，后面的金碧都是虚的。",
    voice: "地仗不稳，金碧再满也是虚的。",
    steps: [
      { name: "地仗", note: "清理旧皮、补裂找平，灰皮层次做扎实，才有可画的底。" },
      { name: "分中起谱", note: "按梁枋分位起谱，纹样对仗与枋心格局先定死。" },
      { name: "沥粉", note: "粉线起筋，为贴金与退晕留出起伏。" },
      { name: "贴金", note: "额枋、斗拱等关键部位贴金，宜克制，殿内才沉。" },
      { name: "涂色渲染", note: "刷色、攒色、退晕分层做，统一色温，避免跳色。" },
    ],
  },
  {
    id: "mural",
    title: "壁画",
    summary:
      "殿壁、廊壁上的人物故事与大幅画面。壁面先稳，构图先定，再谈设色与贴金。",
    image: "/images/demo/craft-mural.jpg",
    imageWidth: 1024,
    imageHeight: 572,
    layout: "stack" as const,
    lead: "壁画先是一幅「墙」，再是一幅「画」——构图先定，颜色才跟得上。",
    voice: "壁画怕的是花、是乱。远看要成章，近看要经得起端详。",
    steps: [
      { name: "起稿分格", note: "按壁面尺度分格落稿，先定人物、故事与主次。" },
      { name: "落墨", note: "勾勒形体与衣纹，把动势和结构关系稳住。" },
      { name: "设色", note: "大面铺色后再罩染，整壁色温一起看，不局部炫技。" },
      { name: "沥粉贴金", note: "冠饰、法器等视题材加点；没有需要就不硬做。" },
    ],
  },
  {
    id: "sculpture",
    title: "塑像",
    summary:
      "泥塑、木胎与妆銮塑像。骨架与泥胎分层到位，开脸装金才站得住。",
    image: "/images/demo/craft-sculpture.jpg",
    imageWidth: 1024,
    imageHeight: 572,
    layout: "stack" as const,
    lead: "塑像是「立得住」再「看得见」：骨、泥、脸，一步省不了。",
    voice: "眉眼定了，整殿的气就定了。",
    steps: [
      { name: "扎骨架", note: "立骨定势，身量、坐立与重心先找准。" },
      { name: "上粗泥", note: "粗泥定大形，体积和衣纹走向先出来。" },
      { name: "上细泥", note: "细泥收面压光，细节留给妆銮，不一次堆死。" },
      { name: "妆銮开脸", note: "着色与开脸反复看光；冠饰着金视题材需要。" },
    ],
  },
  {
    id: "restoration",
    title: "修缮补绘",
    summary:
      "风化剥落、局部残损的彩绘与壁画谨慎修复。先问该不该动，再问怎么补。",
    image: "/images/demo/craft-restoration.jpg",
    imageWidth: 1024,
    imageHeight: 572,
    layout: "stack" as const,
    lead: "修缮不是缩短版的新作。步骤跟着病害走，能少动就少动。",
    voice: "修缮不是重画一张新画，重新塑一尊像。哪里动、哪里不动，要比新做更谨慎。",
    steps: [
      { name: "勘察测绘", note: "看形制、病害与残色，先记录再开口。" },
      { name: "定去留", note: "可留层不动，必补处才补。" },
      { name: "清理加固", note: "清除不稳固层，空鼓、粉化处先加固。" },
      { name: "补绘接茬", note: "按残色取样补缺，接茬求隐，不求满堂一新。" },
      { name: "防护统一", note: "必要处做防护；新旧交界压到同一气里。" },
    ],
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "勘察",
    desc: "实地了解建筑形制、现状与工期要求，拍摄影像并沟通目标效果。",
  },
  {
    step: "02",
    title: "方案与小样",
    desc: "出具工艺方案与色彩小样，确认纹样或壁画构图、材料与施工节奏后再进场。",
  },
  {
    step: "03",
    title: "施工",
    desc: "驻场施工，按工序推进底胎、彩绘、壁画或塑像，关键节点可现场确认。",
  },
  {
    step: "04",
    title: "验收",
    desc: "完工对照方案验收，交接维护建议，便于后续保养与局部修补。",
  },
] as const;
