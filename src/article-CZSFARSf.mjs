import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { t as a } from './config-not-found-DGyG6Tbz.mjs';
import { t as o } from './utils-Br3UwJrQ.mjs';
import { load as s } from 'cheerio';
const c = {
    path: `/article/:uid`,
    categories: [`shopping`],
    example: `/smzdm/article/6902738986`,
    parameters: { uid: `用户 id，网址上直接可以看到` },
    features: { requireConfig: [{ name: `SMZDM_COOKIE`, description: `什么值得买登录后的 Cookie 值` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zhiyou.smzdm.com/member/:uid/article`] }],
    name: `用户文章`,
    maintainers: [`xfangbao`],
    handler: l,
};
async function l(c) {
    if (!e.smzdm.cookie) throw new a(`什么值得买排行榜 is disabled due to the lack of SMZDM_COOKIE`);
    let l = `https://zhiyou.smzdm.com/member/${c.req.param(`uid`)}/article/`,
        u = s((await r(l, { headers: o() })).data),
        d = u(`.info-stuff-nickname a`).text(),
        f = u(`.pandect-content-stuff`)
            .toArray()
            .map(
                (e) => ((e = u(e)), { title: e.find(`.pandect-content-title a`).text(), link: e.find(`.pandect-content-title a`).attr(`href`), pubDate: i(n(e.find(`.pandect-content-time`).text(), [`YYYY-MM-DD`, `MM-DD HH:mm`]), 8) })
            ),
        p = await Promise.all(
            f.map((e) =>
                t.tryGet(e.link, async () => {
                    let t = s((await r(e.link, { headers: o() })).data);
                    return (
                        (e.description = t(`.m-contant article`).html()),
                        (e.pubDate = i(n(t(`meta[property="og:release_date"]`).attr(`content`), `YYYY-MM-DD HH:mm:ss`), 8)),
                        (e.author = t(`meta[property="og:author"]`).attr(`content`)),
                        e
                    );
                })
            )
        );
    return { title: `${d}-什么值得买`, link: l, item: p };
}
export { c as route };
