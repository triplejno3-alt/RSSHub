import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r, t as i } from './utils-DSad8yzx.mjs';
import * as a from 'cheerio';
function o(e, n) {
    return n(`.tr1:nth-child(1)`)
        .toArray()
        .map((a) => {
            let o = n(a),
                s = r(o.html()),
                c = o.next(),
                l = c.find(`.tipad a[title]`).attr(`id`)?.slice(2);
            return {
                title: s?.split(`<br>`)[0],
                description: s,
                author: o
                    .find(`b`)
                    .contents()
                    .filter((e, t) => t.type === `text`)
                    .text()
                    .trim(),
                pubDate: t(String(c.find(`span[data-timestamp]`).data(`timestamp`)), `X`),
                link: `${i}/read.php?tid=${e}${l ? `&pid=${l}` : ``}`,
            };
        });
}
const s = {
    path: `/post/:tid`,
    categories: [`multimedia`],
    example: `/t66y/post/3286088`,
    parameters: { tid: `帖子 id, 可在帖子 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `帖子跟踪`,
    maintainers: [`cnzgray`],
    handler: c,
    description: `::: tip
  帖子 id 查找办法:

  打开想跟踪的帖子，比如：\`https://t66y.com/htm_data/20/1811/3286088.html\` 其中 \`3286088\` 就是帖子 id。
:::`,
};
async function c(t) {
    let r = t.req.param(`tid`),
        { data: s } = await n(`${i}/read.php?tid=${r}`),
        c = a.load(s),
        l = c(`a:last-child`).attr(`href`);
    if (!l) throw Error(`Cannot get the redirect link`);
    let { data: u, url: d } = await n(new URL(l, i).href);
    c = a.load(u);
    let f = o(r, c),
        p = c(`.w70 input`).eq(0).attr(`value`)?.split(`/`)[1],
        m = [];
    if (p) {
        let e = Number.parseInt(p);
        m = Array.from({ length: e }, (e, t) => `${i}/read.php?tid=${r}&page=${t + 1}`).slice(1);
    }
    let h = p
            ? await Promise.all(
                  m.map((t) =>
                      e.tryGet(t, async () => {
                          let { data: e } = await n(t);
                          return o(r, a.load(e));
                      })
                  )
              )
            : [],
        g = [...f, ...h.flat()];
    return { title: c(`head title`).text(), link: d, item: g };
}
export { s as route };
