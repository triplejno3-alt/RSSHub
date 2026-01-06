import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
import { NarouNovelFetch as a, NovelType as o, SearchBuilder as s, SearchBuilderR18 as c } from 'narou';
async function l(e) {
    let t = new a(),
        [n, i] = await Promise.all([new s({ gzip: 5, of: `t-s-k-ga-nt-nu` }, t).ncode(e).execute(), new c({ gzip: 5, of: `t-s-k-ga-nt-nu` }, t).ncode(e).execute()]),
        o = n.allcount !== 0,
        l = o ? n : i,
        u = o ? `https://ncode.syosetu.com` : `https://novel18.syosetu.com`;
    if (l.allcount === 0) throw new r(`Novel not found in both APIs`);
    return { baseUrl: u, novel: l.values[0] };
}
async function u(r, a) {
    return await n.tryGet(r, async () => {
        let n = i(await e(r, { headers: { Cookie: `over18=yes`, 'User-Agent': t.ua } }));
        return { title: `${a ? `#${a} ` : ``}${n(`.p-novel__title`).html() || ``}`, description: n(`.p-novel__body`).html() || ``, link: r, pubDate: n(`meta[name=WWWC]`).attr(`content`), language: `ja` };
    });
}
const d = {
    path: `/:ncode`,
    categories: [`reading`],
    example: `/syosetu/n9292ii`,
    parameters: { ncode: `Novel code, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Novel Updates`,
    maintainers: [`eternasuno`, `SnowAgar25`],
    handler: f,
    radar: [
        { title: `Novel Updates`, source: [`ncode.syosetu.com/:ncode`, `ncode.syosetu.com/:ncode/:chapter`], target: `/:ncode` },
        { title: `Novel Updates`, source: [`novel18.syosetu.com/:ncode`, `novel18.syosetu.com/:ncode/:chapter`], target: `/:ncode` },
    ],
};
async function f(e) {
    let { ncode: t } = e.req.param(),
        n = Math.min(Number(e.req.query(`limit`) ?? 5), 20),
        { baseUrl: r, novel: i } = await l(t);
    if (
        ((i.story =
            i.story.replaceAll(
                `
`,
                `<br>`
            ) || ``),
        i.noveltype === o.Tanpen)
    ) {
        let e = `${r}/${t}`,
            n = await u(e);
        return ((n.pubDate = i.novelupdated_at), { title: i.title, description: i.story, link: e, item: [n], language: `ja` });
    }
    let a = i.general_all_no ?? 1,
        s = Math.max(a - n + 1, 1),
        c = await Promise.all(
            Array.from({ length: Math.min(n, a) }, async (e, n) => {
                let i = s + n;
                return await u(`${r}/${t}/${i}`, i);
            }).toReversed()
        );
    return { title: i.title, description: i.story, link: `${r}/${t}`, item: c, language: `ja` };
}
export { d as route };
