import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = {
    path: `/:kind?`,
    categories: [`program-update`],
    example: `/gofans`,
    parameters: { kind: 'Platform, either `macos` or `ios`, empty means both (default)' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `最新限免 / 促销应用`,
    maintainers: [`HenryQW`],
    handler: c,
};
async function c(n) {
    let { kind: i = `` } = n.req.param(),
        o = `https://gofans.cn`,
        { data: s } = await t(`https://api.gofans.cn/v1/web/app_records`, { headers: { origin: o }, searchParams: { limit: 20, kind: i && (i === `macos` ? 1 : 2), page: 1 } });
    return {
        title: `最新限免 / 促销应用`,
        link: o,
        description: `GoFans：最新限免 / 促销应用`,
        item: s.data.map((t) => ({
            title: `「${t.price === `0.00` ? `免费` : `降价`}」-「${t.kind === 1 ? `macOS` : `iOS`}」${t.name}`,
            description: a(
                r(l, {
                    icon: t.icon,
                    originalPrice: t.original_price,
                    price: t.price,
                    kind: t.kind,
                    description: t.description.replaceAll(
                        `
`,
                        `<br>`
                    ),
                })
            ),
            pubDate: e(t.updated_at, `X`),
            link: new URL(`/app/${t.uuid}`, o).href,
            category: t.primary_genre_name,
        })),
    };
}
const l = ({ icon: e, originalPrice: t, price: a, kind: s, description: c }) =>
    i(n, { children: [r(`img`, { src: e }), r(`br`, {}), `原价：¥`, t, ` `, `->`, ` 现价：¥`, a, r(`br`, {}), `平台：`, s === 1 ? `macOS` : `iOS`, r(`br`, {}), o(c)] });
export { s as route };
