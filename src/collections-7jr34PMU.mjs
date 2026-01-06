import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import r from 'markdown-it';
const i = r({ html: !0 }),
    a = {
        path: `/collections`,
        categories: [`finance`],
        view: n.Articles,
        example: `/bigquant/collections`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`bigquant.com/`] }],
        name: `专题报告`,
        maintainers: [`nczitzk`],
        handler: o,
        url: `bigquant.com/`,
    };
async function o() {
    let n = `https://bigquant.com`,
        r = (await t({ method: `post`, url: `${n}/wiki/api/documents.list`, json: { collectionId: `c6874e5d-7f45-4e90-8cd9-5e43df3b44ef`, direction: `DESC`, limit: 25, offset: 0, sort: `publishedAt` } })).data.data.map((t) => ({
            title: t.title,
            link: `${n}/wiki${t.url}`,
            description: i.render(t.text),
            pubDate: e(t.publishedAt),
        }));
    return { title: `专题报告 - AI量化知识库 - BigQuant`, link: `${n}/wiki/collections/c6874e5d-7f45-4e90-8cd9-5e43df3b44ef`, item: r };
}
export { a as route };
