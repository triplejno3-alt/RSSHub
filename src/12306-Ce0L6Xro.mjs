import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = `https://kyfw.12306.cn`,
    l = (e) =>
        s(
            o(i, {
                children: [
                    o(`text`, { children: [`车次：`, e.trainNo] }),
                    a(`br`, {}),
                    o(`text`, { children: [`始发站：`, e.fromStation, ` → `, e.toStation] }),
                    a(`br`, {}),
                    o(`text`, { children: [`出发时间：`, e.startTime] }),
                    a(`br`, {}),
                    o(`text`, { children: [`到达时间：`, e.arriveTime] }),
                    a(`br`, {}),
                    o(`text`, { children: [`历时：`, e.duration, ` `, e.today === `N` && `次日达`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`商务座/特等座：`, e.A9 || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`一等座：`, e.M || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`二等座/二等包座：`, e.O || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`高级软卧：`, e.A6 || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`软卧/一等卧：`, e.A4 || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`动卧：`, e.F || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`硬卧/二等卧：`, e.A3 || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`软座: `, e.A2 || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`硬座: `, e.A1 || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`无座: `, e.WZ || `无`] }),
                    a(`br`, {}),
                    o(`text`, { children: [`其他: `, e.QT || `无`] }),
                ],
            })
        );
async function u(t) {
    return (await n({ method: `get`, url: t, headers: { UserAgent: e.ua, Referer: `https://www.12306.cn/index/index.html` } })).headers[`set-cookie`].join(`,`).match(/JSESSIONID=([^;]+);/)[0];
}
function d(r) {
    return t.tryGet(r, async () =>
        (await n({ method: `get`, url: `${c}/otn/resources/js/framework/station_name.js`, headers: { UserAgent: e.ua, Referer: `https://kyfw.12306.cn/otn/leftTicket/init` } })).data
            .split(`@`)
            .map((e) => {
                let t = e.split(`|`);
                return t.includes(r) ? { code: t[2], name: t[1] } : null;
            })
            .find(Boolean)
    );
}
const f = {
    path: `/:date/:from/:to/:type?`,
    categories: [`travel`],
    example: `/12306/2022-02-19/重庆/永川东`,
    parameters: { date: `时间，格式为（YYYY-MM-DD）`, from: `始发站`, to: `终点站`, type: `售票类型，成人和学生可选，默认为成人` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `售票信息`,
    maintainers: [`Fatpandac`],
    handler: p,
};
async function p(t) {
    let i = t.req.param(`date`),
        a = await d(t.req.param(`from`)),
        o = await d(t.req.param(`to`)),
        s = t.req.param(`type`) ?? `ADULT`,
        f = `${c}/otn/leftTicket/queryA?leftTicketDTO.train_date=${i}&leftTicketDTO.from_station=${a.code}&leftTicketDTO.to_station=${o.code}&purpose_codes=${s}`,
        p = `${c}/otn/leftTicket/init?linktypeid=dc&fs=${a.code}&ts=${o.code}&date=${i}&flag=N,N,Y`,
        m = await n.get(f, { headers: { UserAgent: e.ua, Referer: `https://kyfw.12306.cn/otn/leftTicket/init`, Cookie: await u(p) } });
    if (m.data.data === void 0 || m.data.data.length === 0) throw new r(`没有找到相关车次，请检查参数是否正确`);
    let h = m.data.data.result,
        g = m.data.data.map,
        _ = h.map((e) => {
            let t = e.split(`|`),
                n = {
                    trainNo: t[3],
                    fromStation: g[t[6]],
                    toStation: g[t[7]],
                    startTime: t[8],
                    arriveTime: t[9],
                    duration: t[10],
                    today: t[11],
                    A9: t[32],
                    M: t[31],
                    O: t[30],
                    A6: t[29],
                    A4: t[28],
                    F: t[27],
                    A3: t[26],
                    A2: t[25],
                    A1: t[24],
                    WZ: t[23],
                    QT: t[22],
                };
            return { title: `${n.fromStation} → ${n.toStation} ${n.startTime} ${n.arriveTime}`, description: l(n), link: p, guid: Object.values(n).join(`|`) };
        });
    return { title: `${a.name} → ${o.name} ${i}`, link: p, item: _ };
}
export { f as route };
