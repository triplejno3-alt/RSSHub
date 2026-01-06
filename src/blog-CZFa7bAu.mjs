import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/`,
    categories: [`blog`],
    view: t.Notifications,
    example: `/imhcg`,
    parameters: {},
    radar: [{ source: [`infos.imhcg.cn`] }],
    name: `Engineering blogs`,
    maintainers: [`ZiHao256`, `qzydustin`],
    handler: i,
    url: `infos.imhcg.cn`,
};
async function i() {
    let t = n(await e(`https://infos.imhcg.cn/`));
    return {
        title: `Engineering Blogs`,
        link: `https://infos.imhcg.cn/`,
        item: t(`li`)
            .toArray()
            .map((e) => ({
                title: t(e).find(`a.article-title`).text(),
                link: t(e).find(`a.article-title`).attr(`href`),
                author: t(e).find(`p.article-author`).text(),
                time: t(e).find(`p.article-time`).text(),
                description: t(e).find(`p.article-text`).text(),
            })),
    };
}
export { r as route };
