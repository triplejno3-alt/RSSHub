import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { load as a } from 'cheerio';
const o = `https://sehuatang.org/`,
    s = {
        path: `/user/:uid`,
        categories: [`multimedia`],
        example: `/sehuatang/user/411096`,
        parameters: { uid: `用户 uid, 可在用户主页 URL 中找到` },
        features: { requireConfig: [{ name: `SEHUATANG_COOKIE`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        name: `作者文章`,
        maintainers: [`JamYiz`],
        handler: c,
    };
async function c(s) {
    if (!e.sehuatang.cookie) throw new i(`Sehuatang RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let c = `${o}home.php?mod=space&uid=${s.req.param(`uid`)}&do=thread&view=me&from=space`,
        l = a((await r(c, { headers: { Cookie: e.sehuatang.cookie, 'Accept-Encoding': `gzip, deflate, br`, 'Accept-Language': `zh-CN,zh;q=0.9,en;q=0.8` } })).data),
        u = l(`#delform tr:not(.th)`)
            .slice(0, s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`)) : 25)
            .toArray()
            .map((e) => {
                e = l(e);
                let t = e.find(`th>a`).first();
                return { title: `[${e.find(`.xg1`).first().text()}] ${t.text()}`, link: o + t.attr(`href`), author: l(`.mt`).first().text() };
            }),
        d = await Promise.all(
            u.map((i) =>
                t.tryGet(i.link, async () => {
                    let t = a((await r(i.link, { headers: { Cookie: e.sehuatang.cookie, 'Accept-Encoding': `gzip, deflate, br`, 'Accept-Language': `zh-CN,zh;q=0.9,en;q=0.8` } })).data),
                        s = t(`[id^='postmessage']`).slice(0, 1),
                        c = t(s).find(`img`);
                    for (let e of c) {
                        let n = t(e).attr(`file`);
                        !n || n === `undefined` ? t(e).replaceWith(``) : t(e).replaceWith(t(`<img src="${n}">`));
                    }
                    let l = t(`.pattl`),
                        u = t(l).find(`img`);
                    for (let e of u) {
                        let n = t(e).attr(`file`);
                        !n || n === `undefined` ? t(e).replaceWith(``) : t(e).replaceWith(t(`<img src="${n}" />`));
                    }
                    (s.append(t(l)), t(`em[onclick]`).remove(), (i.description = (s.html() || `抓取原帖失败`).replaceAll(`ignore_js_op`, `div`)));
                    let d = t(`.authi em`).first().text(),
                        f = `${d.split(` `)[1]} ${d.split(` `)[2]}`,
                        p = new Date(f).getTime();
                    i.pubDate = t(`.authi em span`).length > 0 ? n(t(`.authi em span`).attr(`title`)) : n(p);
                    let m = s.find(`div.blockcode li`).first().text(),
                        h = m.startsWith(`magnet`),
                        g = s.find(`p.attnm a`).attr(`href`);
                    return ((h || g !== void 0) && ((i.enclosure_url = h ? m : new URL(g, o).href), (i.enclosure_type = h ? `application/x-bittorrent` : `application/octet-stream`)), i);
                })
            )
        );
    return { title: `${l(`.mt`).text()}的帖子-色花堂`, link: c, item: d };
}
export { s as route };
