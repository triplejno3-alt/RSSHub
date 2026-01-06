import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { 0: `9004748`, 1: `9004749`, 2: `9213612`, 3: `8314815`, 4: `9222707` },
    o = {
        path: `/notice/:type?`,
        categories: [`programming`],
        example: `/aliyun/notice`,
        parameters: { type: `N` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `公告`,
        maintainers: [`muzea`],
        handler: s,
        description: `| 类型     | type |
| -------- | ---- |
| 全部     |      |
| 升级公告 | 1    |
| 安全公告 | 2    |
| 备案公告 | 3    |
| 其他     | 4    |`,
    };
async function s(o) {
    let s = `https://help.aliyun.com/noticelist/${a[o.req.param(`type`)] || a[0]}.html`,
        c = i((await n({ method: `get`, url: s })).data),
        l = c(`ul > li.notice-li`)
            .toArray()
            .map((e) => {
                let n = c(e);
                return { title: n.find(`a`).text().trim(), description: ``, link: `https://help.aliyun.com` + n.find(`a`).attr(`href`).trim(), pubDate: r(t(n.find(`.y-right`).text()), 8) };
            }),
        u = await Promise.all(l.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n(t.link)).data)(`#se-knowledge`).html()), t))));
    return { title: c(`title`).text().trim(), link: s, item: u };
}
export { o as route };
