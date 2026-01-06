import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { a as t, i as n, o as r, r as i, s as a } from './utils-BDg5Lhsa.mjs';
const o = {
    path: `/album/:id`,
    categories: [`anime`],
    example: `/18comic/album/292282`,
    parameters: { id: `专辑 id，可在专辑页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`jmcomic.group/`] }],
    name: `专辑`,
    maintainers: [`nczitzk`],
    handler: s,
    url: `jmcomic.group/`,
    description: `::: tip
  专辑 id 不包括 URL 中标题的部分。
:::`,
};
async function s(o) {
    let s = o.req.param(`id`),
        { domain: c = i } = o.req.query(),
        l = t(c),
        u = `${l}/album/${s}`,
        d = await r(`${n()}/album?id=${s}`),
        f = d.tags,
        p = d.author.join(`, `),
        m = d.description,
        h = d.addtime,
        g = [];
    return (
        d.series.length === 0
            ? g.push({
                  title: d.name,
                  link: `${l}/photo/${s}`,
                  guid: `${l}/photo/${s}`,
                  updated: new Date(h * 1e3),
                  pubDate: new Date(h * 1e3),
                  category: f,
                  author: p,
                  description: a({ introduction: m, images: [`https://cdn-msp3.${c}/media/albums/${s}_3x4.jpg`], cover: `https://cdn-msp3.${c}/media/albums/${s}_3x4.jpg`, category: f }),
              })
            : ((g = await Promise.all(
                  d.series.map((t, i) =>
                      e.tryGet(`18comic:album:${t.id}`, async () => {
                          let e = await r(`${n()}/chapter?id=${t.id}`),
                              o = {},
                              s = i + 1;
                          return (
                              (o.title = `第${String(s)}話 ${t.name === `` ? `${String(s)}` : t.name}`),
                              (o.link = `${l}/photo/${t.id}`),
                              (o.guid = `${l}/photo/${t.id}`),
                              (o.updated = new Date(e.addtime * 1e3)),
                              (o.pubDate = h),
                              (o.category = f),
                              (o.author = p),
                              (o.description = a({ introduction: m, images: [`https://cdn-msp3.${c}/media/albums/${t.id}_3x4.jpg`], cover: `https://cdn-msp3.${c}/media/albums/${t.id}_3x4.jpg`, category: f })),
                              o
                          );
                      })
                  )
              )),
              (g = g.toReversed())),
        { title: `${d.name} - 禁漫天堂`, link: u.replace(/\?$/, ``), item: g, allowEmpty: !0, description: m }
    );
}
export { o as route };
