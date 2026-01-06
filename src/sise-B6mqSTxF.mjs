import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { n } from './puppeteer-BbZGb8cd.mjs';
import { load as r } from 'cheerio';
import i from 'dayjs';
const a = `https://sise.uestc.edu.cn/`,
    o = { 1: `notice-1`, 2: `notice-2`, 3: `notice-3`, 4: `notice-4`, 5: `notice-5`, 6: `notice-6`, 7: `notice-7`, 8: `notice-8`, 9: `notice-9` },
    s = { 1: `最新`, 2: `院办`, 3: `学生科`, 4: `教务科`, 5: `研管科`, 6: `组织`, 7: `人事`, 8: `实践教育中心`, 9: `Int'I` },
    c = {
        path: `/sise/:type?`,
        categories: [`university`],
        example: `/uestc/sise/1`,
        parameters: { type: '默认为 `1`' },
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`sise.uestc.edu.cn/`], target: `/sise` }],
        name: `信息与软件工程学院`,
        maintainers: [`Yadomin`, `mobyw`],
        handler: l,
        url: `sise.uestc.edu.cn/`,
        description: `| 最新 | 院办 | 学生科 | 教务科 | 研管科 | 组织 | 人事 | 实践教育中心 | Int'I |
| ---- | ---- | ------ | ------ | ------ | ---- | ---- | ------------ | ----- |
| 1    | 2    | 3      | 4      | 5      | 6    | 7    | 8            | 9     |`,
    };
async function l(c) {
    let l = c.req.param(`type`) || 1,
        u = o[l];
    if (!u) throw new t(`type not supported`);
    let d = await n(),
        f = await d.newPage();
    (await f.setRequestInterception(!0),
        f.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await f.goto(a, { waitUntil: `networkidle2` }));
    let p = await f.content();
    await d.close();
    let m = r(p),
        h = m(m(`div[id="${u}"] p.news-item`))
            .toArray()
            .map((t) => {
                t = m(t);
                let n = i(),
                    r = i(n.year() + `-` + t.find(`span`).text().replace(`/`, `-`));
                return (n < r && (r = i(n.year() - 1 + `-` + t.find(`span`).text().replace(`/`, `-`))), { title: t.find(`a`).text().replace(`&amp;`, ``).trim(), link: a + t.find(`a`).attr(`href`), pubDate: e(r) });
            });
    return { title: `信软学院通知-${s[l]}`, link: a, description: `电子科技大学信息与软件工程学院通知`, item: h };
}
export { c as route };
