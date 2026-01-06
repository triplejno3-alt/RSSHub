import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
async function o(e) {
    let t = await n.get(e, { responseType: `buffer` });
    t.data = a.decode(t.data, `gb2312`);
    let r = i(t.data);
    return {
        title: r(`title`)
            .text()
            .replaceAll(/，免费下载，迅雷下载|，6v电影/g, ``),
        description: r(`meta[name="description"]`).attr(`content`),
        enclosure_urls: r(`table td`)
            .toArray()
            .map((e) => ({ title: r(e).text().replace(`磁力：`, ``), magnet: r(e).find(`a`).attr(`href`) }))
            .filter((e) => e.magnet?.includes(`magnet`)),
    };
}
async function s(s, c, l) {
    let u = await n.get(c, { responseType: `buffer` });
    u.data = a.decode(u.data, `gb2312`);
    let d = i(u.data),
        f = d(`ul.list`)[0].children;
    return (
        await Promise.all(
            f.map((n) => {
                let i = d(n).find(`a`),
                    a = i.attr(`href`),
                    s = r(t(d(n).find(`span`).text().replaceAll(/[[\]]/g, ``), `MM-DD`), 8),
                    c = i.text();
                if (a === void 0 || (l && l.some((e) => e.test(c)))) return;
                let u = `https://www.hao6v.cc` + i.attr(`href`);
                return e.tryGet(u, async () => {
                    let e = await o(u);
                    return e.enclosure_urls.length > 1
                        ? e.enclosure_urls.map((t) => ({
                              enclosure_url: t.magnet,
                              enclosure_type: `application/x-bittorrent`,
                              title: `${i.text()} ( ${t.title} )`,
                              description: e.description,
                              pubDate: s,
                              link: u,
                              guid: `${u}#${t.title}`,
                          }))
                        : { enclosure_url: e.enclosure_urls.length === 0 ? `` : e.enclosure_urls[0].magnet, enclosure_type: `application/x-bittorrent`, title: i.text(), description: e.description, pubDate: s, link: u };
                });
            })
        )
    )
        .filter((e) => e !== void 0)
        .flat();
}
export { s as t };
