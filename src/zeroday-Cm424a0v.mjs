import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { n } from './puppeteer-BbZGb8cd.mjs';
import { jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
        name: `漏洞`,
        categories: [`programming`],
        path: `/zeroday/vulnerability/:status?`,
        example: `/hitcon/zeroday/vulnerability`,
        parameters: { status: `漏洞状态，见下表` },
        maintainers: [`KarasuShin`],
        radar: [{ source: [`zeroday.hitcon.org/vulnerability/:status?`] }],
        features: { requirePuppeteer: !0 },
        handler: l,
        description: `| 缺省   | all  | closed | disclosed | patching |
| ------ | ---- | ------ | --------- | -------- |
| 活動中 | 全部 | 關閉   | 公開      | 修補中   |`,
    },
    c = { all: `全部`, closed: `關閉`, disclosed: `公開`, patching: `修補中` };
async function l(s) {
    let l = `https://zeroday.hitcon.org/vulnerability`,
        u = s.req.param(`status`);
    u && (l += `/${u}`);
    let d = await n(),
        f = await d.newPage();
    (await f.setRequestInterception(!0),
        f.on(`request`, (e) => {
            e.resourceType() === `document` ? e.continue() : e.abort();
        }),
        e.http(`Requesting ${l}`),
        await f.goto(l, { waitUntil: `domcontentloaded` }));
    let p = await f.evaluate(() => document.documentElement.innerHTML);
    await d.close();
    let m = a(p),
        h = m(`.zdui-strip-list>li`)
            .toArray()
            .map((e) => {
                let n = m(e).find(`.title a`),
                    a = m(e).find(`.vul-data`),
                    s = a
                        .find(`.code`)
                        .contents()
                        .filter(function () {
                            return this.nodeType === 3;
                        })
                        .text(),
                    c = a.find(`.risk span`).eq(1).text(),
                    l = a.find(`.vender`).find(`.v-name-full`).text(),
                    u = a.find(`.status`).text().replace(`Status:`, ``).trim(),
                    d = a.find(`.date`).text().replace(`Date:`, ``).trim(),
                    f = a.find(`.zdui-author-badge`).find(`a>span`).text(),
                    p = o(
                        i(`ul`, {
                            children: [
                                r(`li`, { children: l }),
                                i(`li`, { children: [`ZDID: `, s] }),
                                i(`li`, { children: [`風險: `, c] }),
                                i(`li`, { children: [`處理狀態: `, u] }),
                                i(`li`, { children: [`通報者: `, f] }),
                                i(`li`, { children: [`通報日期: `, d] }),
                            ],
                        })
                    );
                return { title: n.text(), link: n.attr(`href`), description: p, pubDate: t(d) };
            });
    return { title: u ? (c[u] ?? `ZeroDay`) : `活動中`, link: l, item: h, image: `https://zeroday.hitcon.org/images/favicon/favicon.png` };
}
export { s as route };
