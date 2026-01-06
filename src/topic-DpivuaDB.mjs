import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/topic/:id/:sort?`,
    categories: [`social-media`],
    example: `/douban/topic/48823`,
    parameters: { id: `话题id`, sort: `排序方式，hot或new，默认为new` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `话题`,
    maintainers: [`LogicJake`, `pseudoyu`, `haowenwu`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`id`),
        i = n.req.param(`sort`) || `new`,
        a = `https://www.douban.com/gallery/topic/${r}/?sort=${i}`,
        o = (await t({ method: `GET`, url: `https://m.douban.com/rexxar/api/v2/gallery/topic/${r}/items?sort=${i}&start=0&count=10&status_full_text=1`, headers: { Referer: a } })).data.items,
        s = r,
        c = ``;
    o[0].topic !== null && ((s = o[0].topic.name), (c = o[0].topic.introduction));
    let l = await Promise.all(
        o.map(async (n) => {
            let r = n.target.type,
                i,
                a,
                o,
                s,
                c;
            if (r === `status`) {
                ((s = n.target.status.sharing_url.split(`&`)[0]), (i = n.target.status.author.name), (c = i + `的广播`), (a = n.target.status.create_time), (o = n.target.status.text));
                let e = n.target.status.images;
                if (e) {
                    let t;
                    for (t in e) o += `<br><img src="${e[t].normal.url}" />`;
                }
            } else if (r === `topic`) {
                ((s = n.target.sharing_url), (i = n.target.author.name), (c = n.target.title), (a = n.target.create_time), (o = n.target.abstract));
                let e = n.target.photos;
                if (e) {
                    let t;
                    for (t in e) o += `<br><img src="${e[t].src}" />`;
                }
            } else {
                ((s = n.target.sharing_url), (i = n.target.author.name), (c = i + `的日记`), (a = n.target.create_time));
                let r = `https://www.douban.com/j/note/${n.target.id}/full`,
                    l = await e.get(s);
                if (l) return JSON.parse(l);
                o = (await t.get(r)).data.html;
            }
            let l = { title: c, link: s, author: i, pubDate: new Date(a).toUTCString(), description: o };
            return (r !== `status` && e.set(s, JSON.stringify(l)), l);
        })
    );
    return { title: `${s}-豆瓣话题`, description: c, link: a, item: l };
}
export { n as route };
