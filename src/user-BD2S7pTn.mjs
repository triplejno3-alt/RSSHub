import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './config-not-found-DGyG6Tbz.mjs';
import { n, t as r } from './utils-h91pOgVG.mjs';
const i = {
    name: `用户足迹`,
    categories: [`social-media`],
    path: `/user/:id`,
    example: `/zsxq/user/2414218251`,
    parameters: { id: `用户id，从网页端url中获取` },
    maintainers: [`KarasuShin`],
    radar: [{ source: [`wx.zsxq.com/dweb2/index/footprint/:id`] }],
    features: {
        requireConfig: [
            {
                name: `ZSXQ_ACCESS_TOKEN`,
                description: `知识星球访问令牌,获取方式：
1. 登录知识星球网页版
2. 打开浏览器开发者工具，切换到 Application 面板
3. 点击侧边栏中的Storage -> Cookies -> https://wx.zsxq.com
4. 复制 Cookie 中的 zsxq_access_token 值`,
            },
        ],
    },
    handler: a,
};
async function a(i) {
    let a = i.req.param(`id`);
    if (!e.zsxq.accessToken) throw new t(`该 RSS 源由于配置不正确而被禁用：令牌丢失。`);
    let o = Number(i.req.query(`limit`)) || 20;
    o > 30 && (o = 30);
    let s = await r(`/users/${a}`),
        { topics: c } = await r(`/users/${a}/topics/footprint?count=${o}`);
    return { title: `知识星球 - ${s.user.name}`, description: s.user.introduction, image: s.user.avatar_url, link: `https://wx.zsxq.com/dweb2/index/footprint/${a}`, item: n(c) };
}
export { i as route };
