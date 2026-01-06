import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { t as i } from './util-BS8XgQSj.mjs';
const a = `QWeather`,
    o = {
        path: `/3days/:location`,
        categories: [`forecast`],
        example: `/qweather/3days/广州`,
        parameters: { location: `N` },
        features: {
            requireConfig: [
                { name: `HEFENG_KEY`, description: `QWeather API KEY` },
                { name: `HEFENG_API_HOST`, description: `This is required after 2026/01/01: https://blog.qweather.com/announce/public-api-domain-change-to-api-host/` },
            ],
            requirePuppeteer: !1,
            antiCrawler: !1,
            supportBT: !1,
            supportPodcast: !1,
            supportScihub: !1,
        },
        name: `近三天天气`,
        maintainers: [`Rein-Ou`, `la3rence`],
        handler: s,
        description: `获取订阅近三天天气预报`,
    };
async function s(o) {
    if (!e.hefeng.key || !e.hefeng.apiHost) throw new r(`QWeather RSS is disabled due to the lack of <a href="https://docs.rsshub.app/zh/install/config#%E5%92%8C%E9%A3%8E%E5%A4%A9%E6%B0%94">relevant config</a>`);
    let s = `https://${e.hefeng.apiHost}/v7/weather/3d`,
        c = `https://${e.hefeng.apiHost}/v7/air/5d`,
        l = `https://${e.hefeng.apiHost}/geo/v2/city/lookup`,
        u = await t.tryGet(`qweather:` + o.req.param(`location`) + `:id`, async () => (await n(`${l}?location=${o.req.param(`location`)}&key=${e.hefeng.key}`)).data.location[0].id),
        d = await t.tryGet(`qweather:` + o.req.param(`location`), async () => (await n(`${s}?key=${e.hefeng.key}&location=${u}`)).data, e.cache.contentExpire, !1),
        f = await t.tryGet(`qweather:air:${o.req.param(`location`)}`, async () => (await n(`${c}?location=${u}&key=${e.hefeng.key}`)).data, e.cache.contentExpire, !1),
        p = {
            updateTime: d.updateTime,
            fxLink: d.fxLink,
            daily: d.daily.map((e) => {
                let t = f.daily.find((t) => t.fxDate === e.fxDate);
                return t ? { ...e, aqi: t.aqi, aqiLevel: t.level, aqiCategory: t.category, aqiPrimary: t.primary } : e;
            }),
        },
        m = p.daily.map((e) => ({
            title: `${e.fxDate}: ${e.textDay === e.textNight ? e.textDay : e.textDay + `转` + e.textNight} ${e.tempMin}~${e.tempMax}℃`,
            description: i(e),
            pubDate: p.updateTime,
            guid: `位置：` + o.req.param(`location`) + `--日期：` + e.fxDate,
            link: p.fxLink,
            author: a,
        }));
    return { title: o.req.param(`location`) + `未来三天天气`, description: o.req.param(`location`) + `未来三天天气情况，使用和风彩云 API (包括空气质量)`, item: m, link: p.fxLink, author: a };
}
export { o as route };
