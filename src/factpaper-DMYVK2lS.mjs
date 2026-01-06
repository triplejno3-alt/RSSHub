import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/factpaper/:status?`,
    categories: [`new-media`],
    example: `/thepaper/factpaper`,
    parameters: { status: '状态 id，可选 `1` 即 有定论 或 `0` 即 核查中，默认为 `1`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`factpaper.cn/`], target: `/factpaper/:status` }],
    name: `明查`,
    maintainers: [`nczitzk`],
    handler: u,
    url: `factpaper.cn/`,
};
async function u(i) {
    let o = Number.parseInt(i.req.param(`status`) ?? `1`),
        c = `https://www.factpaper.cn`,
        l = `https://api.factpaper.cn`,
        u = (await n({ method: `post`, url: `${l}/fact-check/front/proveList`, json: { pageNum: 1, pageSize: 20, status: o } })).data.data.list.map((e) => ({
            title: e.title,
            guid: e.proveId,
            link: `${c}/detail?id=${e.proveId}`,
            pubDate: r(t(e.publishTime), 8),
        }));
    return (
        (u = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = (await n({ method: `post`, url: `${l}/fact-check/front/proveInfo`, json: { proveId: t.guid } })).data.data;
                    return ((t.author = e.userName), (t.description = s(a(d, { content: e.content, checkinfo: e.checkInfoList, finalCheckInfo: e.finalCheckInfo }))), t);
                })
            )
        )),
        { title: `澎湃明查 - ${o === 1 ? `有定论` : `核查中`}`, link: c, item: u }
    );
}
const d = ({ content: e, checkinfo: t, finalCheckInfo: n }) =>
    o(i, {
        children: [
            a(`h1`, { children: `发起求证` }),
            c(e),
            t?.length ? o(i, { children: [a(`h1`, { children: `一起核查` }), t.map((e) => c(e.content))] }) : null,
            n ? o(i, { children: [a(`h1`, { children: `有定论了` }), c(n.content)] }) : null,
        ],
    });
export { l as route };
