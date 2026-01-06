import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r } from './wechat-mp-HNgcLN2K.mjs';
import { load as i } from 'cheerio';
const a = `https://nsd.pku.edu.cn/sylm/gd/`,
    o = (e) => {
        if (!e.startsWith(`http`)) return `in-site`;
        let t = new URL(e);
        return t.hostname === `mp.weixin.qq.com` ? `wechat-mp` : t.hostname === `news.pku.edu.cn` ? `pku-news` : `unknown`;
    },
    s = {
        path: `/nsd/gd`,
        categories: [`university`],
        example: `/pku/nsd/gd`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`nsd.pku.edu.cn/`] }],
        name: `观点 - 国家发展研究院`,
        maintainers: [`MisLink`],
        handler: c,
        url: `nsd.pku.edu.cn/`,
    };
async function c() {
    let s = i((await n({ url: a, https: { rejectUnauthorized: !1 } })).data),
        c = s(`div.maincontent > ul > li`)
            .toArray()
            .map((e) => {
                let n = s(e).find(`a`).attr(`href`),
                    r = o(n);
                return { title: s(e).find(`a`).text().trim(), link: r === `in-site` ? a + n : n, pubDate: t(s(e).find(`span`).first().text(), `YYYY-MM-DD`), type: r };
            });
    return {
        title: `观点 - 北京大学国家发展研究院`,
        link: a,
        item: await Promise.all(
            c.map((t) => {
                switch (t.type) {
                    case `wechat-mp`:
                        return r(t);
                    case `pku-news`:
                        return e.tryGet(t.link, async () => ((t.description = i((await n({ url: t.link, https: { rejectUnauthorized: !1 } })).data)(`div.pageArticle > div.col.lf`).html()), t));
                    case `in-site`:
                        return e.tryGet(t.link, async () => ((t.description = i((await n({ url: t.link, https: { rejectUnauthorized: !1 } })).data)(`div.article`).html()), t));
                    default:
                        return t;
                }
            })
        ),
    };
}
export { s as route };
