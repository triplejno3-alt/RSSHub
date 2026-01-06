import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
var o = {
    parseFeed: async ({ subjectid: o }) => {
        let s = `https://www.dapenti.com/blog/blog.asp?name=xilei&subjectid=${o}`,
            c = await n({ method: `get`, url: s, headers: { Referer: s }, responseType: `buffer` }),
            l = i(a.decode(c.data, `gb2312`)),
            u = l(`li`, `ul`).slice(0, 3).toArray(),
            d = await Promise.all(
                u.map((s) =>
                    e.tryGet(`https://www.dapenti.com/blog/${l(s).find(`a`).attr(`href`)}`, async () => {
                        let e = l(s),
                            c = `https://www.dapenti.com/blog/${e.find(`a`).attr(`href`)}`,
                            u = await n({ method: `get`, url: c, headers: { Referer: c }, responseType: `buffer` }),
                            d = i(a.decode(u.data, `gbk`), { decodeEntities: !1 })(`body > table > tbody > tr > td.oblog_t_2 > div > table > tbody > tr:nth-child(2) > td`),
                            f = d.find(`span span.oblog_text`).text().split(`发布于`);
                        d.find(`table, .adsbygoogle`).remove();
                        let p = o.toString() === `70` ? 7 : 3;
                        for (let e = 0; e < p; e++) d.children().first().remove();
                        for (let e = 0; e < 8; e++) d.children().last().remove();
                        return { title: e.text(), author: f[0].trim(), description: d.html(), pubDate: r(t(f[1]?.trim()), 8), link: c };
                    })
                )
            );
        return { title: `喷嚏-${o}`, link: s, item: d };
    },
};
export { o as t };
