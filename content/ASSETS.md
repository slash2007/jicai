# 素材替换说明

## 目录约定

- 首屏大图：`public/images/hero.svg` → 换成 `hero.jpg` / `hero.webp`，并改 `src/app/page.tsx` 中的路径
- 服务配图：`public/images/service-*.svg`
- 案例图：`public/images/cases/`
- 联系页微信二维码：替换 `src/app/contact/page.tsx` 中的占位框为真实图片

## 站点文案与联系方式

编辑 `src/content/site.ts`：

- `phone` / `wechat` / `email` / `region`
- 首页定位句 `tagline`、`support`

## 案例内容

编辑 `src/content/cases.ts`，字段说明见 [case-template.md](./case-template.md)。

## 移动端自检清单

- [ ] 手机竖屏：首屏品牌名仍然最大，去掉导航后仍能认出「吉彩古建」
- [ ] 汉堡菜单可开关，打开时禁止背景滚动
- [ ] 作品筛选条可横滑，案例全宽、不挤成密卡片
- [ ] 表单输入框足够大，键盘弹出后仍可滚动提交
- [ ] 右下角「咨询」按钮不挡住正文关键操作（页面留有 `pb-20`）
- [ ] 刘海屏底部安全区：`safe-area-inset-bottom`
