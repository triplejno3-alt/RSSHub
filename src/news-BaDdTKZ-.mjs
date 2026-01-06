import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r } from './puppeteer-BbZGb8cd.mjs';
import { load as i } from 'cheerio';
const a = `https://www.ccac.org.mo`,
    o = { en: `en-us`, sc: `zh-cn`, tc: `zh-hk`, pt: `pt` },
    s = { all: `全部`, case: `案件發佈`, Persuasion: `調查報告或勸喻`, AnnualReport: `年度報告`, PCANews: `公署消息` };
function c(e) {
    return `${a}/${e}/news.html`;
}
function l(e, t) {
    return t === `全部` ? e : e.filter((e) => e.tags.some((e) => e.name === t));
}
var u = { TYPE: s, BASE_URL: a, LANG_TYPE: o, langBase: c, typeFilter: l };
const d = {
    path: `/news/:type/:lang?`,
    categories: [`government`],
    example: `/ccac/news/all`,
    parameters: { type: `Category`, lang: 'Language, default to `sc`. Supprot `en`(English), `sc`(Simplified Chinese), `tc`(Traditional Chinese) and `pt`(Portuguese)' },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Latest News`,
    maintainers: [`linbuxiao`],
    handler: f,
    description: `Category

| All | Detected Cases | Investigation Reports or Recommendations | Annual Reports | CCAC's Updates |
| --- | -------------- | ---------------------------------------- | -------------- | -------------- |
| all | case           | Persuasion                               | AnnualReport   | PCANews        |`,
};
async function f(a) {
    let o = await r(),
        s = a.req.param(`lang`) ?? `sc`,
        c = u.TYPE[a.req.param(`type`)],
        l = u.langBase(s),
        d = await o.newPage();
    (await d.setRequestInterception(!0),
        d.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await d.goto(l, { waitUntil: `domcontentloaded` }));
    let f = await d.evaluate(() => window.articles);
    await o.close();
    let p = u
            .typeFilter(f, c)
            .slice(0, a.req.query(`limit`) ? Number(a.req.query(`limit`)) : 30)
            .map((e) => ({ title: e.name, category: e.tags.map((e) => e.name), link: u.BASE_URL + e.url, pubDate: t(e.time, `YYYY-MM-DD`) })),
        m = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n({ method: `get`, url: t.link })).data);
                    return (e(`.article_details_body > *`).removeAttr(`style`), (t.description = e(`.article_details_body`).html()), t);
                })
            )
        );
    return { title: `CCAC ${c}`, link: l, description: `CCAC ${c}`, language: a.req.param(`lang`) ? u.LANG_TYPE[a.req.param(`lang`)] : u.LANG_TYPE.sc, item: m };
}
export { d as route };
