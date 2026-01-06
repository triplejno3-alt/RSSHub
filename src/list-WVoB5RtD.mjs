import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/list/:category?`,
    categories: [`new-media`],
    example: `/dedao/list/年度日更`,
    parameters: { category: `分类名，默认为年度日更` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`igetget.com/`] }],
    name: `首页`,
    maintainers: [`nczitzk`],
    handler: i,
    url: `igetget.com/`,
};
async function i(r) {
    let i = r.req.param(`category`) ?? `年度日更`,
        a = `https://www.igetget.com`,
        o = `${a}${(await t({ method: `get`, url: `${a}${(await t({ method: `get`, url: a })).data.match(/<a href="(.*)">年度日更<\/a>/)[1]}` })).data.match(RegExp(`<span>` + i + String.raw`<\/span><a href="(.*)" rel="tag"><\/a>`))[1].split(`"`)[0]}`,
        s = n((await t({ method: `get`, url: o })).data),
        c = s(`.pro-info p a`)
            .toArray()
            .slice(0, r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 10)
            .map((e) => ((e = s(e)), { title: e.text(), link: `${a}${e.attr(`href`)}` }));
    return (
        (c = await Promise.all(
            c.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = n((await t({ method: `get`, url: r.link })).data);
                    return (e(`.more-bt`).remove(), (r.description = e(`.main-content-wrapper`).html()), r);
                })
            )
        )),
        { title: `得到 - ${i}`, link: o, item: c }
    );
}
export { r as route };
