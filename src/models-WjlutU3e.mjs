import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/models`,
    categories: [`program-update`],
    example: `/civitai/models`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`civitai.com/`] }],
    name: `Latest models`,
    maintainers: [`DIYgod`],
    handler: r,
    url: `civitai.com/`,
};
async function r() {
    let { data: n } = await t(`https://civitai.com/api/v1/models`, { searchParams: { limit: 20, sort: `Newest` } });
    return {
        title: `Civitai latest models`,
        link: `https://civitai.com/`,
        item: n.items.map((t) => ({
            title: t.name,
            link: `https://civitai.com/models/${t.id}`,
            description: `${t.modelVersions?.[0]?.images?.map((e) => `<image src="${e.url.replace(/width=\d+\//, `width=${e.width}/`)}">`).join(`
`)}${t.description}`,
            pubDate: e(t.lastVersionAt),
            author: t.creator?.username,
            category: t.tags,
        })),
    };
}
export { n as route };
