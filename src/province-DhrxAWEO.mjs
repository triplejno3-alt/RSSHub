import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { n as r } from './puppeteer-BbZGb8cd.mjs';
import { jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = (e, t) =>
        s(a(`table`, { children: [a(`tr`, { children: [i(`th`, { children: `学位授予单位名称` }), i(`th`, { children: `最新上网批次` })] }), a(`tr`, { children: [i(`td`, { children: e }), i(`td`, { children: t })] })] })),
    l = {
        path: `/:province?`,
        categories: [`study`],
        example: `/chinadegrees/11`,
        parameters: { province: '省市代号，见下表，亦可在 [这里](http://www.chinadegrees.com.cn/help/provinceSwqk.html) 找到，默认为 `11`' },
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `各学位授予单位学位证书上网进度`,
        description: `| 省市             | 代号 |
| ---------------- | ---- |
| 北京市           | 11   |
| 天津市           | 12   |
| 河北省           | 13   |
| 山西省           | 14   |
| 内蒙古自治区     | 15   |
| 辽宁省           | 21   |
| 吉林省           | 22   |
| 黑龙江省         | 23   |
| 上海市           | 31   |
| 江苏省           | 32   |
| 浙江省           | 33   |
| 安徽省           | 34   |
| 福建省           | 35   |
| 江西省           | 36   |
| 山东省           | 37   |
| 河南省           | 41   |
| 湖北省           | 42   |
| 湖南省           | 43   |
| 广东省           | 44   |
| 广西壮族自治区   | 45   |
| 海南省           | 46   |
| 重庆市           | 50   |
| 四川省           | 51   |
| 贵州省           | 52   |
| 云南省           | 53   |
| 西藏自治区       | 54   |
| 陕西省           | 61   |
| 甘肃省           | 62   |
| 青海省           | 63   |
| 宁夏回族自治区   | 64   |
| 新疆维吾尔自治区 | 65   |
| 台湾             | 71   |`,
        maintainers: [`TonyRL`],
        handler: u,
    };
async function u(i) {
    let { province: a = `11` } = i.req.param(),
        s = `http://www.chinadegrees.com.cn/help/unitSwqk${a}.html`,
        l = await t.tryGet(
            s,
            async () => {
                let e = await r(),
                    t = await e.newPage();
                (await t.setRequestInterception(!0),
                    t.on(`request`, (e) => {
                        e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                    }),
                    await t.goto(s, { waitUntil: `domcontentloaded` }),
                    await t.waitForSelector(`.datalist`));
                let n = await t.evaluate(() => document.documentElement.innerHTML);
                await e.close();
                let i = o(n);
                return {
                    title: i(`caption`).text().trim(),
                    items: i(`.datalist tr`)
                        .toArray()
                        .slice(1)
                        .map((e) => {
                            e = i(e);
                            let t = e.find(`td`).eq(1).text(),
                                n = e.find(`td`).eq(2).text();
                            return { title: t, pubDate: n, guid: `${t}:${n}` };
                        })
                        .filter((e) => e.title !== `null`),
                };
            },
            e.cache.routeExpire,
            !1
        ),
        u = l.items.map((e) => ((e.description = c(e.title, e.pubDate)), (e.pubDate = n(e.pubDate, `YYYY-MM-DD`)), e));
    return { title: l.title, link: s, item: u };
}
export { l as route };
