import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
const r = `https://www.hudsonrivertrading.com`,
    i = { algo: `Algorithm`, engineers: `Engineering`, interns: `Intern Spotlight`, more: `Hardware, Systems & More` },
    a = { algo: 7, engineers: 11, interns: 16 },
    o = {
        path: `/blog/:section?`,
        categories: [`blog`],
        example: `/hudsonrivertrading/blog`,
        parameters: { section: { description: `Optional section filter`, options: Object.entries(i).map(([e, t]) => ({ label: t, value: e })) } },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.hudsonrivertrading.com/hrtbeat/`] }],
        name: `Tech Blog`,
        maintainers: [`johan456789`],
        handler: s,
        description: `HRT (Hudson River Trading) Tech Blog

| Route | Section |
| ----- | ------- |
| /hudsonrivertrading/blog | All Posts |
${Object.entries(i).map(([e, t]) => `| /hudsonrivertrading/blog/${e} | ${t} |`).join(`
`)}`,
    };
async function s(o) {
    let s = (o.req.param(`section`) ?? ``).toLowerCase(),
        c = `${r}/wp-json/wp/v2`,
        l;
    if (s)
        if (Object.hasOwn(a, s)) l = { include: a[s] };
        else if (s === `more`) l = { exclude: Object.values(a) };
        else throw new n(`Invalid section: ${s}. Valid sections are: ${Object.keys(i).join(`, `)}`);
    let u = [`per_page=20`, `_embed=author,wp:term`];
    (l?.include && u.push(`categories=${l.include}`), l?.exclude?.length && u.push(`categories_exclude=${l.exclude.join(`,`)}`));
    let d = (await e(`${c}/posts?${u.join(`&`)}`)).map((e) => ({
        title: e.title?.rendered,
        description: e.content?.rendered ?? e.excerpt?.rendered ?? ``,
        link: e.link,
        pubDate: t(e.date_gmt ?? e.date),
        author: e._embedded?.author?.[0]?.name,
        category: Array.isArray(e._embedded?.[`wp:term`])
            ? e._embedded[`wp:term`]
                  .flat()
                  .map((e) => e?.name)
                  .filter(Boolean)
            : void 0,
    }));
    return { title: `Hudson River Trading${s && i[s] ? ` - ${i[s]}` : ``}`, link: `${r}/hrtbeat/#${s}`, language: `en`, item: d };
}
export { o as route };
