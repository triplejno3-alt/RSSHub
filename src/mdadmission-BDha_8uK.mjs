import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/mdadmission`,
    categories: [`university`],
    example: `/pumc/mdadmission`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`mdadmission.pumc.edu.cn/mdweb/site`, `mdadmission.pumc.edu.cn/`] }],
    name: `“4+4” 试点班招生网通知公告`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `mdadmission.pumc.edu.cn/mdweb/site`,
};
async function a(i) {
    let a = `https://mdadmission.pumc.edu.cn/mdweb/site!noticeList?param.infoTypeId=&rows=${i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 100}&pages=1`,
        o = r((await n({ method: `get`, url: a, https: { rejectUnauthorized: !1 } })).data),
        s = o(`div.media`)
            .toArray()
            .map((e) => {
                e = o(e);
                let n = e.find(`h4.media-heading a`);
                return { title: n.text(), link: new URL(n.attr(`href`), a).href, pubDate: t(e.find(`span`).first().text(), `DDYYYY-MM`) };
            });
    return (
        (s = await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link, https: { rejectUnauthorized: !1 } })).data);
                    return (e(`h3`).remove(), (t.description = e(`div.media-body div`).last().html()), t);
                })
            )
        )),
        { title: `北京协和医学院招生网 - 通知公告`, link: a, item: s }
    );
}
export { i as route };
