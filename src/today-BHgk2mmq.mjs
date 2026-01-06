import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/today`,
    categories: [`multimedia`],
    view: t.Notifications,
    example: `/yyets/today`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yysub.net/tv/schedule`, `yysub.net/`] }],
    name: `今日播出`,
    maintainers: [`bao1991213`],
    handler: i,
    url: `yysub.net/tv/schedule`,
};
async function i() {
    let t = (await e({ method: `get`, url: `https://yysub.net` })).data,
        r = n(t);
    return {
        title: `人人影视-今日播出`,
        link: `https://yysub.net`,
        item: r(`.today-list-wrap`)
            .find(`ul`)
            .find(`li`)
            .toArray()
            .map((e) => ((e = r(e)), { title: e.find(`a`).first().text(), link: e.find(`a`).attr(`href`), guid: e.find(`a`).first().text() })),
    };
}
export { r as route };
