import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/rail/:category?/:topic?`,
    categories: [`new-media`],
    example: `/ally/rail/hyzix/chengguijiaotong`,
    parameters: { category: `分类，可在 URL 中找到；略去则抓取首页`, topic: `话题，可在 URL 中找到；并非所有页面均有此字段` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`rail.ally.net.cn/`, `rail.ally.net.cn/html/:category?/:topic?`] }],
    name: `世界轨道交通资讯网`,
    maintainers: [`Rongronggg9`],
    handler: o,
    url: `rail.ally.net.cn/`,
    description: `::: tip
  默认抓取前 20 条，可通过 \`?limit=\` 改变。
:::`,
};
async function o(a) {
    let { category: o, topic: s } = a.req.param(),
        c = `http://rail.ally.net.cn`,
        l = o ? (s ? `${c}/html/${o}/${s}/` : `${c}/html/${o}/`) : c,
        u = i((await n.get(l)).data),
        d = ``,
        f = u(`.container .regsiter a`).toArray().slice(1);
    for (let e of f) {
        let t = u(e).text();
        d = d ? `${d} - ${t}` : t;
    }
    d = d || (o && s ? `${o} - ${s}` : o) || `首页`;
    let p = [
        u(`.left .hynewsO h2 a`).toArray(),
        u(`.left .list_content_c`).find(`.new_hy_focus_con_tit a, .new_hy_list_name a`).toArray(),
        u(`.left`).find(`.nnewslistpic a, .nnewslistinfo dd a`).toArray(),
        u(`.left .list_con .datacountTit a`).toArray(),
        u(`.container_left`).find(`dd a, h1 a, ul.slideshow li a`).toArray(),
    ].flat();
    p.length || (p = u(`.left a, .container_left a`).toArray());
    let m = p
            .map((e) => {
                e = u(e);
                let n = e.attr(`href`),
                    i = n && n.match(/\/html\/(\d{4})\/\w+_(\d{4})\/\d+\.html/);
                return i ? { title: e.text(), link: n.startsWith(`/`) ? `${c}${n}` : n, pubDate: r(t(`${i[1]}${i[2]}`), 8) } : null;
            })
            .filter(Boolean),
        h = [];
    for (let e of m) h.some((t) => t.link === e?.link) || h.push(e);
    return (
        (m = h.toSorted((e, t) => t.pubDate - e.pubDate).slice(0, a.req.query(`limit`) || 20)),
        (m = await Promise.all(
            m.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n(t.link)).data),
                        r = ``,
                        a = e(`div.content_all`);
                    (a.length
                        ? a
                              .eq(a.length - 1)
                              .contents()
                              .each((t, n) => {
                                  let i = e(n),
                                      a;
                                  n.name === `div` ? ((a = i.html()), (a &&= a.trim()), (r += !a || a === `&nbsp;` ? (r ? `<br>` : ``) : a)) : (r += i.toString().trim());
                              })
                        : (r = e(`div.content div`).first().html()),
                        (r = r.replace(/\s*<br ?\/?>\s*$/, ``)));
                    let o = e(`.content > em span`);
                    return {
                        title: e(`.content > h2`).text() || t.title,
                        description: r,
                        pubDate: t.pubDate,
                        author: o
                            .eq(1)
                            .text()
                            .replace(/^来源：/, ``),
                        link: t.link,
                    };
                })
            )
        )),
        { title: `世界轨道交通资讯网 - ${d}`, link: l, item: m, description: u(`head > meta[name="description"]`).attr(`content`) }
    );
}
export { a as route };
