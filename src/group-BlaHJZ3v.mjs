import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './config-not-found-DGyG6Tbz.mjs';
import { n, t as r } from './utils-h91pOgVG.mjs';
const i = {
    name: `星球`,
    categories: [`social-media`],
    path: `/group/:id/:scope?`,
    example: `/zsxq/group/88855458825252`,
    parameters: { id: `星球id，从网页端url中获取`, scope: `栏目分类，默认为"all"，见下表` },
    maintainers: [`KarasuShin`],
    radar: [{ source: [`wx.zsxq.com/dweb2/index/group/:id`] }],
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
    description: `| all  | digests | by_owner | questions | tasks |
| ---- | ------ | --------- | -------- | ------ |
| 最新 | 精华    | 只看星主    | 问答      | 作业   |`,
};
async function a(i) {
    let a = i.req.param(`id`),
        o = i.req.param(`scope`) ?? `all`;
    if (!e.zsxq.accessToken) throw new t(`该 RSS 源由于配置不正确而被禁用：令牌丢失。`);
    let s = Number(i.req.query(`limit`)) || 20;
    s > 30 && (s = 30);
    let { group: c } = await r(`/groups/${a}`),
        { topics: l } = await r(`/groups/${a}/topics?scope=${o}&count=${s}`);
    return { title: `知识星球 - ${c.name}`, description: c.description, image: c.background_url, link: `https://wx.zsxq.com/dweb2/index/group/${a}`, item: n(l) };
}
export { i as route };
