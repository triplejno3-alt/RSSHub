import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { n, t as r } from './utils-HS462HTX.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/section/:section`,
    categories: [`reading`],
    example: `/p-articles/section/critics`,
    parameters: { section: '版块名称, 可在对应版块 URL 中找到, 子版块链接用`-`连接' },
    name: `版块`,
    maintainers: [`Insomnia1437`],
    handler: o,
    radar: [{ source: [`p-articles.com/:section/`] }],
};
async function o(a) {
    let o = a.req.param(`section`);
    ((o = o.replace(`-`, `/`)), (o += `/`));
    let s = new URL(o, n).href,
        c = i(await e(s)),
        l = { title: c(`div.inner_top_title_01 > h1 > a`).text(), link: new URL(c(`div.inner_top_title_01 > h1 > a`).prop(`href`), n).href },
        u = c(`div.contect_box_04 > a`)
            .toArray()
            .map((e) => ({ title: c(e).find(`h1`).text().trim(), link: new URL(c(e).attr(`href`), n).href }));
    return (u.unshift(l), { title: `虚词 p-articles`, link: s, item: await Promise.all(u.map((n) => t.tryGet(n.link, async () => r(n, await e(n.link))))), language: `zh-cn` });
}
export { a as route };
