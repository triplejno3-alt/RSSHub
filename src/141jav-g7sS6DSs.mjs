import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { r as t } from './common-utils-uYpL50sT.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = {
    path: `/:type/:keyword{.*}?`,
    categories: [`multimedia`],
    name: `通用`,
    maintainers: [`cgkings`, `nczitzk`],
    parameters: { type: `类型，可查看下表的类型说明`, keyword: `关键词，可查看下表的关键词说明` },
    handler: l,
    description:
        '**类型**\n\n| 最新 | 热门    | 随机   | 指定演员 | 指定标签 | 日期 |\n| ---- | ------- | ------ | -------- | -------- | ---- |\n| new  | popular | random | actress  | tag      | date |\n\n**关键词**\n\n| 空 | 日期范围    | 演员名       | 标签名         | 年月日     |\n| -- | ----------- | ------------ | -------------- | ---------- |\n|    | 7 / 30 / 60 | Yua%20Mikami | Adult%20Awards | 2020/07/30 |\n\n**示例说明**\n\n-  `/141jav/new`\n\n      仅当类型为 `new` `popular` 或 `random` 时关键词为 **空**\n\n-  `/141jav/popular/30`\n\n      `popular` `random` 类型的关键词可填写 `7` `30` 或 `60` 三个 **日期范围** 之一，分别对应 **7 天**、**30 天** 或 **60 天内**\n\n-  `/141jav/actress/Yua%20Mikami`\n\n      `actress` 类型的关键词必须填写 **演员名** ，可在 [此处](https://141jav.com/actress/) 演员单页链接中获取\n\n-  `/141jav/tag/Adult%20Awards`\n\n      `tag` 类型的关键词必须填写 **标签名** 且标签中的 `/` 必须替换为 `%2F` ，可在 [此处](https://141jav.com/tag/) 标签单页链接中获取\n\n-  `/141jav/date/2020/07/30`\n\n      `date` 类型的关键词必须填写 **日期(年/月/日)**',
    features: { nsfw: !0 },
};
async function l(r) {
    let a = `https://www.141jav.com`,
        c = r.req.param(`type`),
        l = r.req.param(`keyword`) ?? ``,
        d = `${a}/${c}${l ? `/${l}` : ``}`,
        f = o((await n({ method: `get`, url: d })).data);
    if (t(r) === `/`) {
        r.set(`redirect`, `/141jav${f(`.overview`).first().attr(`href`)}`);
        return;
    }
    let p = f(`.columns`)
        .toArray()
        .map((t) => {
            t = f(t);
            let n = t.find(`.title a`).text(),
                r = t.find(`.title span`).text(),
                o = t.find(`.subtitle a`).attr(`href`).split(`/date/`).pop(),
                c = t.find(`.has-text-grey-dark`).text(),
                l = t
                    .find(`.panel-block`)
                    .toArray()
                    .map((e) => f(e).text().trim()),
                d = t
                    .find(`.tag`)
                    .toArray()
                    .map((e) => f(e).text().trim()),
                p = t.find(`a[title="Magnet torrent"]`).attr(`href`),
                m = t.find(`a[title="Download .torrent"]`).attr(`href`),
                h = t.find(`.image`).attr(`src`);
            return {
                title: `${n} ${r}`,
                pubDate: e(o, `YYYY/MM/DD`),
                link: new URL(t.find(`a`).first().attr(`href`), a).href,
                description: s(i(u, { image: h, id: n, size: r, pubDate: o, description: c, actresses: l, tags: d, magnet: p, link: m })),
                author: l.join(`, `),
                category: [...d, ...l],
                enclosure_type: `application/x-bittorrent`,
                enclosure_url: p,
            };
        });
    return { title: `141JAV - ${f(`title`).text().split(`-`)[0].trim()}`, link: d, item: p };
}
const u = ({ image: e, id: t, size: n, pubDate: o, description: s, actresses: c, tags: l, magnet: u, link: d }) =>
    a(r, {
        children: [
            e ? i(`img`, { src: e }) : null,
            i(`table`, {
                children: a(`tbody`, {
                    children: [
                        a(`tr`, { children: [i(`th`, { children: `ID` }), i(`td`, { children: t })] }),
                        a(`tr`, { children: [i(`th`, { children: `Size` }), i(`td`, { children: n })] }),
                        a(`tr`, { children: [i(`th`, { children: `Date` }), i(`td`, { children: o })] }),
                        a(`tr`, { children: [i(`th`, { children: `Description` }), i(`td`, { children: s })] }),
                        a(`tr`, { children: [i(`th`, { children: `Actress` }), i(`td`, { children: c.map((e) => a(r, { children: [i(`a`, { href: `/actress/${e}`, children: e }), `\xA0`] })) })] }),
                        a(`tr`, { children: [i(`th`, { children: `Tag` }), i(`td`, { children: l.map((e) => a(r, { children: [i(`a`, { href: `/tag/${e}`, children: e }), `\xA0`] })) })] }),
                        a(`tr`, { children: [i(`th`, { children: `Magnet torrent` }), i(`td`, { children: i(`a`, { href: u, children: `Magnet torrent link` }) })] }),
                        a(`tr`, { children: [i(`th`, { children: `Download .torrent` }), i(`td`, { children: i(`a`, { href: d, children: `Download torrent` }) })] }),
                    ],
                }),
            }),
        ],
    });
export { c as route };
