import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.miit.gov.cn`,
    o = `${a}/zwgk/wjgs/index.html`,
    s = {
        path: `/miit/wjgs`,
        categories: [`government`],
        example: `/gov/miit/wjgs`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `文件公示`,
        maintainers: [`Yoge-Code`],
        handler: c,
    };
async function c() {
    let s = i((await n(o)).data),
        c = s(`script[parseType=buildstatic]`),
        l = c.attr(`url`),
        u = JSON.parse(c.attr(`querydata`).replaceAll(`'`, `"`)),
        { data: d } = await n(`${a}${l}`, { headers: { referer: o }, searchParams: u }),
        f = i(d.data.html, null, !1),
        p = f(`.page-content ul li`)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.find(`a`).attr(`title`), link: new URL(e.find(`a`).attr(`href`), a).href, pubDate: t(e.find(`.fr`).text(), `YYYY-MM-DD`) }));
    return (
        (p = await Promise.all(
            p.map((o) =>
                e.tryGet(o.link, async () => {
                    let { data: e } = await n(o.link),
                        s = i(e);
                    return (
                        s(`iframe`).each((e, t) => {
                            ((t = s(t)), t.attr(`src`).startsWith(`/`) && t.attr(`src`, new URL(t.attr(`src`), a).href));
                        }),
                        (o.author = s(`.cinfo`)
                            .text()
                            .match(/来源：(.*)/)[1]),
                        (o.pubDate = r(t(s(`#con_time`).text(), `YYYY-MM-DD HH:mm`), 8)),
                        (o.description = s(`.ccontent`).html()),
                        o
                    );
                })
            )
        )),
        { title: `${s(`head title`).text()} - ${s(`meta[name=SiteName]`).attr(`content`)}`, link: o, item: p }
    );
}
export { s as route };
