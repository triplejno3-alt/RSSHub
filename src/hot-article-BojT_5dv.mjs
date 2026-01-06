import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './utils-AQwzBfkP.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/hot-article/:type?`,
    categories: [`finance`],
    view: n.Articles,
    example: `/gelonghui/hot-article`,
    parameters: {
        type: {
            description: '`day` 为日排行，`week` 为周排行，默认为 `day`',
            options: [
                { value: `day`, label: `日排行` },
                { value: `week`, label: `周排行` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gelonghui.com/`], target: `/hot-article` }],
    name: `最热文章`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `gelonghui.com/`,
};
async function o(n) {
    let a = n.req.param(`type`) === `week` ? 1 : 0,
        o = `https://www.gelonghui.com`,
        { data: s } = await t(o),
        c = i(s),
        l = c(`#hot-article ul`)
            .eq(a)
            .find(`li`)
            .toArray()
            .map((e) => {
                e = c(e);
                let t = e.find(`a`);
                return { title: t.text(), link: `${o}${t.attr(`href`)}` };
            }),
        u = await Promise.all(l.map((t) => r(t, e.tryGet)));
    return {
        title: `最热文章 - ${a === 0 ? `日排行` : `周排行`} - 格隆汇`,
        description: `格隆汇为中国投资者出海投资及中国公司出海融资,提供海外投资,港股开户行情,科创板股票发行数据、资讯、研究、交易等一站式服务,目前业务范围主要涉及港股与美股两大市场,未来将陆续开通台湾、日本、印度、欧洲等市场.`,
        image: `https://cdn.gelonghui.com/static/web/www.ico.la.ico`,
        link: o,
        item: u,
    };
}
export { a as route };
