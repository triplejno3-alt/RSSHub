import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './utils-K7A_pWlU.mjs';
const n = {
    path: `/notes`,
    categories: [`social-media`],
    example: `/crossbell/notes`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`crossbell.io/*`] }],
    name: `Notes`,
    maintainers: [`DIYgod`],
    handler: r,
    url: `crossbell.io/*`,
};
async function r() {
    return { title: `Crossbell Notes`, link: `https://crossbell.io/`, item: (await e(`https://indexer.crossbell.io/v1/notes`, { searchParams: { includeCharacter: !0 } })).data?.list?.map((e) => t(e)) };
}
export { n as route };
