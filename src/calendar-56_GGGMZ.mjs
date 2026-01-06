import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
        path: `/calendar/:section?`,
        categories: [`finance`],
        example: `/wallstreetcn/calendar`,
        parameters: { section: '`macrodatas` 或 `report`，默认为 `macrodatas`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`wallstreetcn.com/calendar`] }],
        name: `财经日历`,
        maintainers: [`TonyRL`],
        handler: o,
        url: `wallstreetcn.com/calendar`,
    },
    r = `https://wallstreetcn.com`,
    i = { CA: `CA10YR.OTC`, CN: `USDCNH.OTC`, DE: `DE30.OTC`, FR: `FR40.OTC`, IT: `EURUSD.OTC`, JP: `USDJPY.OTC`, UK: `UK100.OTC`, US: `DXY.OTC` },
    a = (e, t) => `${r}/data-analyse/${t}/${i[e]}`;
async function o(n) {
    let { section: o = `macrodatas` } = n.req.param(),
        s = `${r}/calendar`,
        c = o === `macrodatas` ? `https://api-one-wscn.awtmt.com` : `https://api-ddc-wscn.awtmt.com`,
        l = await e(o === `macrodatas` ? `${c}/apiv1/finance/macrodatas` : `${c}/finance/report/list`, {
            query: o === `macrodatas` ? { start: new Date().setHours(0, 0, 0, 0) / 1e3, end: Math.trunc(new Date().setHours(23, 59, 59, 999) / 1e3) } : void 0,
        });
    return {
        title: `财经日历 - 华尔街见闻`,
        link: s,
        item:
            o === `macrodatas`
                ? l.data.items.map((e) => ({
                      title: `${e.country}${e.title}`,
                      description: `${e.country}${e.title} 重要性: ${`★`.repeat(e.importance)} 今值: ${e.actual || `-`}${e.actual && e.unit} 预期: ${e.forecast || `-`}${e.forecast && e.unit} 前值: ${e.revised || e.previous || `-`}${(e.revised || e.previous) && e.unit}`,
                      link: e.uri && i[e.country_id] && a(e.country_id, e.wscn_ticker),
                      guid: e.id,
                      pubDate: t(e.public_date, `X`),
                      category: e.country,
                  }))
                : l.data.items
                      .map((e) => Object.fromEntries(l.data.fields.map((t, n) => [t, e[n]])))
                      .map((e) => ({
                          title: `${e.company_name} ${e.observation_date}`,
                          description: `${e.code} ${e.company_name} ${e.observation_date} 预期EPS: ${e.eps_estimate === 0 ? `-` : e.eps_estimate} 实际EPS: ${e.reported_eps === 0 ? `-` : e.reported_eps} 差异度: ${e.surprise === 0 || e.surprise === -1 ? `-` : (e.surprise * 100).toFixed(2) + `%`}`,
                          link: s,
                          guid: e.id,
                          pubDate: t(e.public_date, `X`),
                      })),
        itunes_author: `华尔街见闻`,
        image: `https://static.wscn.net/wscn/_static/favicon.png`,
    };
}
export { n as route };
