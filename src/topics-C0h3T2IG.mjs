import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/topics/:topic?`,
    categories: [`traditional-media`],
    example: `/cbc/topics`,
    parameters: { topic: 'Channel,`Top Stories` by default. For secondary channel like `canada/toronto`, use `-` to replace `/`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cbc.ca/news`], target: `/topics` }],
    name: `News`,
    maintainers: [`wb14123`],
    handler: i,
    url: `cbc.ca/news`,
};
async function i(r) {
    let i = `https://www.cbc.ca`,
        a = r.req.param(`topic`) || ``,
        o = `${i}/news${a ? `/${a.replace(`-`, `/`)}` : ``}`,
        s = (await t(o)).data,
        c = n(s),
        l = [];
    function u(e, t) {
        let n = t.attribs.href;
        n.startsWith(`/`) && l.push(i + n);
    }
    (c(`a.contentWrapper`).each(u), c(`a.card`).each(u));
    let d = await Promise.all(
        l.map((r) =>
            e.tryGet(r, async () => {
                let e = n((await t(r)).data),
                    i = JSON.parse(e(`script[type="application/ld+json"]`).first().text());
                if (!i) return [];
                let a = i.headline,
                    o = ``;
                i.author && (o = i.author.map((e) => e.name).join(` & `));
                let s = i.datePublished,
                    c = e(`div[data-cy=storyWrapper]`);
                (c.find(`div[class=share]`).remove(), c.find(`div[class^="textToSpeech"]`).remove());
                let l = c.html();
                return { title: a, author: o, pubDate: s, description: l, link: r };
            })
        )
    );
    return { title: c(`title`).text(), link: o, item: d.filter((e) => e.title) };
}
export { r as route };
