import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = {
    path: `/recent-show`,
    categories: [`shopping`],
    example: `/shoac/recent-show`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`shoac.com.cn/`] }],
    name: `演出月历`,
    maintainers: [`TonyRL`],
    handler: l,
    url: `shoac.com.cn/`,
};
async function l() {
    let c = `https://www.shoac.com.cn`,
        l = { Channel: `theatre_pc`, Location: `121.458563,31.250315`, Theater: 1323, 'Flagship-Store': !0 },
        { data: u } = await n.post(`${c}/platform-backend/good/theater/dongyi-products`, { headers: l, json: { page: 1, size: 12, calendar: !1, timeSort: !0, venueId: `` } }),
        d = u.data.records.map((e) => ({
            title: e.productNameShort,
            category: [e.categoryName, e.subCategoryName],
            link: `${c}/#/detail?projectId=${e.projectId}`,
            projectId: e.projectId,
            minPrice: e.minPrice,
            maxPrice: e.maxPrice,
            placeCname: e.placeCname,
        }));
    return {
        title: `演出月历 - 上海东方艺术中心管理有限公司`,
        link: c,
        item: await Promise.all(
            d.map((u) =>
                e.tryGet(u.link, async () => {
                    let { data: e } = await n(`${c}/platform-backend/good/project/detail/old/${u.projectId}`, { headers: l, searchParams: { distributionSeriesId: ``, distributionChannelId: `` } }),
                        { data: d } = await n(`${c}/platform-backend/good/shows/old/${u.projectId}`, { headers: l, searchParams: { distributionSeriesId: ``, distributionChannelId: `` } });
                    return (
                        (u.description = o(
                            a(r, {
                                children: [
                                    e.data.img ? a(r, { children: [i(`img`, { src: e.data.img }), i(`br`, {})] }) : null,
                                    a(`table`, {
                                        children: [
                                            a(`tr`, { children: [i(`td`, { children: `类型：` }), i(`td`, { children: e.data.productSubtypeName })] }),
                                            a(`tr`, { children: [i(`td`, { children: `时间：` }), i(`td`, { children: e.data.showStartToEndTime })] }),
                                            a(`tr`, { children: [i(`td`, { children: `地点：` }), a(`td`, { children: [e.data.showPlaceName, `-`, u.placeCname] })] }),
                                            a(`tr`, { children: [i(`td`, { children: `￥` }), a(`td`, { children: [u.minPrice, `-`, u.maxPrice] })] }),
                                        ],
                                    }),
                                    i(`br`, {}),
                                    e.data.projectDesp ? s(e.data.projectDesp) : null,
                                ],
                            })
                        )),
                        (u.pubDate = d.data.showInfoDetailList ? t(d.data.showInfoDetailList[0].saleBeginTime, `x`) : null),
                        u
                    );
                })
            )
        ),
    };
}
export { c as route };
