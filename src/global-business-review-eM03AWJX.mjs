import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = { en: `en_GB`, cn: `zh_CN`, tw: `zh_TW` },
    r = { en: `The Economist Global Business Review`, cn: `经济学人 · 商论`, tw: `經濟學人 · 商論` },
    i = {
        en: `The Economist Global Business Review is a new bilingual digital app from the editors of The Economist Group.`,
        cn: `《经济学人·商论》是《经济学人》2015年5月推出的旗下中英双语APP，萃取《经济学人》在商业、金融、科技等领域的精华文章，为中国读者呈现全球视角的深度分析，并鼓励中国的读者批判性地思考中国和全球重大议题。`,
        tw: `《經濟學人·商論》是經濟學人集團官方中英雙語電子APP，萃取《經濟學人》在商業、金融、科技等領域的精華文章，為中國讀者呈現全球視角的深度分析，並鼓勵中國的讀者批判性地思考中國和全球的重大議題。`,
    },
    a = function (e, t, n) {
        switch (e.type) {
            case `paragraph`:
                return s(e.data, n);
            case `image`:
                return c(e.data, t, n);
            case `subtitle`:
                return s(e.data, n, `h3`);
            default:
                throw Error(`Unknown type: ${e.type}`);
        }
    },
    o = function (e, t) {
        let r = Object.assign({}, ...e.map((e) => ({ [e.lang]: e.text })));
        return t.map((e) => r[n[e]]).join(``);
    },
    s = function (e, t, r = `p`) {
        let i = Object.assign({}, ...e.map((e) => ({ [e.lang]: e.text })));
        return `<div>${t.map((e) => `<${r}>${i[n[e]]}</${r}>`).join(``)}</div>`;
    },
    c = function (e, t, r) {
        let i = Object.assign({}, ...e.map((e) => ({ [e.lang]: e.image_path })));
        return `<div><img src="https://businessreviewglobal-cdn.com/article_images/${t}/${encodeURIComponent(i[n[r[0]]])}"/></div>`;
    },
    l = (n, r) => {
        let i = `https://api.hummingbird.businessreview.global/api/article/index?id=${n}`;
        return e.tryGet(`${i}:${r.join(`-`)}`, async () => {
            let e = (await t({ method: `get`, url: i })).data.body,
                o = ``;
            return ((o += s(e.rubric, r)), (o += e.content.map((e) => a(e, n, r)).join(``)), o);
        });
    },
    u = {
        path: `/global-business-review/:language?`,
        categories: [`traditional-media`],
        example: `/economist/global-business-review/cn-en`,
        parameters: { language: 'Language, `en`, `cn`, `tw` are supported, support multiple options, default to cn-en' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`businessreview.global/`], target: `/global-business-review` }],
        name: `Global Business Review`,
        maintainers: [`prnake`],
        handler: d,
        url: `businessreview.global/`,
    };
async function d(e) {
    let a = (e.req.param(`language`) &&
            e.req
                .param(`language`)
                .split(`-`)
                .filter((e, t, r) => n[e] && r.indexOf(e, 0) === t)) || [`cn`, `en`],
        s = a[0],
        c = await t({ method: `get`, url: `https://api.hummingbird.businessreview.global/api/toc/get_articles` }),
        u = await Promise.all(
            c.data.articles.new
                .slice(0, e.req.query(`limit`) ? Number.parseInt(e.req.query(`limit`)) : 10)
                .map(async (e) => ({
                    title: o(e.body.title, [s]),
                    description: await l(e.article_id, a),
                    category: o(e.body.fly_title, [s]),
                    link: `https://www.businessreview.global/latest/${e.article_id}`,
                    pubDate: e.publication_date,
                }))
        );
    return { title: r[s], link: `https://www.businessreview.global`, description: i[s], item: u };
}
export { u as route };
