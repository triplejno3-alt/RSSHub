import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = { path: `/air/:area`, radar: [{ source: [`m.air-level.com/air/:area/`], target: `/air/:area` }], parameters: { area: `地区` }, name: `空气质量`, maintainers: [`lifetraveler`], example: `/air-level/air/xian`, handler: r };
async function r(n) {
    let r = `https://m.air-level.com/air/${n.req.param(`area`)}`,
        i = t(await e(r)),
        a = i(`body > div.container > div.row.page > div:nth-child(1) > h2`).text().replaceAll(`[]`, ``),
        o = i(`body > div.container > div.row.page > div:nth-child(1) > div:nth-child(3) > table`),
        s = i(`body > div.container > div.row.page > div:nth-child(1) > div.aqi-dv > div > span.aqi-bg.aqi-level-2`).text(),
        c = i(`body > div.container > div.row.page > div:nth-child(1) > div.aqi-dv > div > span.label.label-info`).text();
    return { title: a, item: [{ title: a + ` ` + s + ` ` + c, link: r, description: `<table border="1 solid black">${o.html()}</table>`, guid: c }], description: `订阅每个城市的天气质量`, link: r };
}
export { n as route };
