import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { n as t } from './puppeteer-BbZGb8cd.mjs';
import { load as n } from 'cheerio';
import r from 'dayjs';
const i = `https://www.scse.uestc.edu.cn/index.htm`,
    a = { 1012: `【办公室】`, 1013: `【组织人事】`, 1014: `【科研科】`, 1015: `【研管科】`, 1016: `【教务科】`, 1017: `【学生科】`, 1018: `【国际办】`, 1019: `【培训工作】`, 1020: `【创新创业】`, 1022: `【安全工作】` },
    o = {
        path: `/scse`,
        categories: [`university`],
        example: `/uestc/scse`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`scse.uestc.edu.cn/`] }],
        name: `计算机科学与工程学院`,
        maintainers: [`talengu`, `mobyw`],
        handler: s,
        url: `scse.uestc.edu.cn/`,
    };
async function s() {
    let o = await t(),
        s = await o.newPage();
    (await s.setRequestInterception(!0),
        s.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await s.goto(i, { waitUntil: `networkidle2` }));
    let c = await s.content();
    await o.close();
    let l = n(c),
        u = l(`.s2-lswitch .i-list`),
        d = !0,
        f = [];
    return (
        u.each((e, t) => {
            if (d) {
                d = !1;
                return;
            }
            l(t)
                .find(`li`)
                .each((e, t) => {
                    f.push(t);
                });
        }),
        {
            title: `计算机学院通知`,
            link: i,
            description: `电子科技大学计算机科学与工程学院通知`,
            item: l(f)
                .toArray()
                .map((t) => {
                    t = l(t);
                    let n = r(),
                        i = r(n.year() + `-` + t.find(`a span`).text());
                    n < i && (i = r(n.year() - 1 + `-` + t.find(`a span`).text()));
                    let o = t
                            .find(`a[href]`)
                            .contents()
                            .filter((e, t) => t.nodeType === 3)
                            .text()
                            .trim(),
                        s = `https://www.scse.uestc.edu.cn/` + t.find(`a[href]`).attr(`href`),
                        c = e(i),
                        u = `【其他】`;
                    for (let e in a)
                        if (s.search(`info/` + e) !== -1) {
                            u = a[e];
                            break;
                        }
                    return ((o = u + o), { title: o, link: s, pubDate: c });
                }),
        }
    );
}
export { o as route };
