import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://cpc.ey.gov.tw`,
    a = { xwg: { name: `新闻稿`, url: `/Page/A3412E2A5A7B398F` }, xfzx: { name: `消费资讯`, url: `/Page/E414CC218269CCE8` } },
    o = {
        path: `/:type?`,
        categories: [`government`],
        example: `/cpcey/xwg`,
        parameters: { type: '默认为 `xwg`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `消费资讯`,
        maintainers: [`Fatpandac`],
        handler: s,
        description: `| 新闻稿 | 消费资讯 |
| :----: | :------: |
|   xwg  |   xfzx   |`,
    };
async function s(o) {
    let s = o.req.param(`type`) ?? `xwg`,
        c = i + a[s].url,
        l = r((await n.get(c)).data),
        u = l(`div.words > ul > li`)
            .toArray()
            .map((e) => {
                let n = l(e).find(`span`).text().split(`-`),
                    r = Number.parseInt(n[0]) + 1911 + `/` + n[1] + `/` + n[2];
                return { link: i + l(e).find(`a`).attr(`href`), title: l(e).find(`a`).attr(`title`), pubDate: t(r, `YYYY/MM/DD`) };
            }),
        d = await Promise.all(
            u.map(async (t) => {
                let i = ``;
                return (t.link.includes(`.html`) || (i = await e.tryGet(t.link, async () => r((await n.get(t.link)).data)(`div.words > div.graybg.ail > div`).html())), (t.description = i), t);
            })
        );
    return { title: `行政院消费者保护会-${a[s].name}`, link: c, item: d };
}
export { o as route };
