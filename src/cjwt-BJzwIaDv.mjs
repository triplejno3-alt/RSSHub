import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = {
    path: `/caac/cjwt/:category?`,
    categories: [`government`],
    example: `/gov/caac/cjwt`,
    parameters: { category: `分类，见下表，默认为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`caac.gov.cn/HDJL/`], target: `/caac/cjwt` }],
    name: `公众留言`,
    maintainers: [`nczitzk`],
    handler: c,
    url: `caac.gov.cn/HDJL/`,
    description: `| 机票 | 托运 | 无人机 | 体检 | 行政审批 | 投诉 |
| ---- | ---- | ------ | ---- | -------- | ---- |`,
};
async function c(r) {
    let { category: i = `` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 30,
        o = `https://www.caac.gov.cn`,
        s = new URL(`caacgov/jsonp/messageBoard/visit/get${i ? `CJWT` : ``}List`, o).href,
        c = new URL(`HDJL/`, o).href,
        { data: u } = await t(s, { searchParams: { callbackparam: `jsonp_messageBoard_getList`, infoMess: i, pageIndex: 1 } }),
        d = JSON.parse(u.match(/jsonp_messageBoard_getList\((.*?)\)$/)[1])
            .returnData.root.slice(0, a)
            .map((t) => ({
                title: t.infoMess.replaceAll(/<\/?em>/g, ``),
                link: new URL(`index_180.html?info=${t.id}&type=id`, o).href,
                description: l(t),
                author: `${t.gname}/${t.feedbackName}`,
                category: [t.messageType],
                guid: `caac-cjwt#${t.id}`,
                pubDate: n(e(t.createDate), 8),
                updated: n(e(t.feedbackDate), 8),
            })),
        f = `中国民用航空局`,
        p = new URL(`images/Logo2.png`, o).href,
        m = new URL(`images/weixinLogo.jpg`, o).href,
        h = `公众留言`;
    return { item: d, title: [f, h, i].filter(Boolean).join(` - `), link: c, description: `向公众提供服务和开展互动交流`, language: `zh`, image: p, icon: m, logo: m, subtitle: h, author: f, allowEmpty: !0 };
}
const l = (e) =>
    a(
        r(`div`, {
            children: i(`dl`, {
                children: [
                    i(`dt`, { children: [i(`label`, { children: [`【`, e.messageType, `】`] }), r(`span`, { children: e.workUnit }), r(`span`, { children: e.gname }), r(`span`, { children: e.createDate })] }),
                    r(`dd`, { style: `margin-top:10px; color:#EF7321;`, children: r(`p`, { style: `text-indent:1em;`, children: e.infoMess ? o(e.infoMess) : null }) }),
                    i(`dt`, { width: `140px`, children: [r(`label`, { children: `【回复】` }), r(`span`, { children: e.feedbackName }), r(`span`, { children: e.feedbackDate })] }),
                    r(`dd`, { children: r(`p`, { style: `text-indent:1em;`, children: e.feedback ? o(e.feedback) : null }) }),
                ],
            }),
        })
    );
export { s as route };
