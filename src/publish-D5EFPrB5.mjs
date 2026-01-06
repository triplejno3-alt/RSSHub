import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = /([^/]+)\.md$/,
    a = (e) => {
        let t = e.match(i);
        return t ? t[1] : ``;
    },
    o = {
        path: `/publish/:id`,
        categories: [`blog`],
        example: `/obsidian/publish/marshallontheroad`,
        parameters: { id: `网站 id，由Publish持有者自定义` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`publish.obsidian.md/`] }],
        name: `Publish`,
        maintainers: [`Xy2002`],
        handler: s,
        url: `publish.obsidian.md/`,
    };
async function s(e) {
    return { title: `Obsidian Publish`, language: `en-us`, item: await c(e.req.param(`id`)), link: `https://publish.obsidian.md/` };
}
async function c(i) {
    let o = `https://publish.obsidian.md/${i}`,
        s =
            r(await e(o))(`script:contains("preloadCache")`)
                .text()
                .match(/preloadCache\s*=\s*f\("([^"]+)"\);/)?.[1] || ``,
        c;
    try {
        c = await e(s, { headers: { 'User-Agent': t.trueUA, Referer: `https://publish.obsidian.md/`, Origin: `https://publish.obsidian.m/` } });
    } catch {
        c = {};
    }
    return Object.entries(c)
        .map(([e, t]) =>
            t ? { title: t.frontmatter?.title || a(e), link: `${o}/${e.replaceAll(` `, `+`).split(`.md`)[0]}`, pubDate: t.frontmatter?.[`date created`] ? n(t.frontmatter[`date created`]) : void 0, ...t.frontmatter } : null
        )
        .filter(Boolean);
}
export { o as route };
