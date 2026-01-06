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
    path: `/chapter/:id`,
    categories: [`reading`],
    example: `/hameln/chapter/264928`,
    parameters: { id: `Novel id, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`syosetu.org/novel/:id`] }],
    name: `chapter`,
    maintainers: [`huangliangshusheng`],
    handler: o,
    description: `Eg: [https://syosetu.org/novel/264928](https://syosetu.org/novel/264928)`,
};
async function o(n) {
    let a = n.req.param(`id`),
        o = Number.parseInt(n.req.query(`limit`)) || 5,
        c = `https://syosetu.org/novel/${a}`,
        l = i(await s(c)),
        u = l(`span[itemprop="name"]`).text(),
        d = l(`div.ss:nth-child(2)`).text(),
        f = l(`tr[bgcolor]`)
            .toArray()
            .map((e) => {
                let n = l(e),
                    i = n.find(`a`);
                return { title: i.text(), link: i.attr(`href`), pubDate: r(t(n.find(`nobr`).text(), `YYYYMMDD HH:mm`), 9) };
            })
            .toSorted((e, t) => (e.pubDate <= t.pubDate ? 1 : -1))
            .slice(0, o);
    return { title: u, description: d, link: c, language: `ja`, item: await Promise.all(f.map((t) => ((t.link = `${c}/${t.link}`), e.tryGet(t.link, async () => ((t.description = i(await s(t.link))(`#honbun`).html()), t))))) };
}
const s = async (e) => (await n({ method: `get`, url: e, headers: { cookie: `over18=off` } })).data;
export { a as route };
