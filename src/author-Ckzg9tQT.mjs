import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { n as r, t as i } from './common-BnzSEdmO.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/author/:id?`,
    categories: [`bbs`],
    example: `/sis001/author/13131575`,
    parameters: { id: `作者 ID，可以在作者的个人空间地址找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `作者`,
    maintainers: [`keocheung`],
    handler: s,
};
async function s(o) {
    let { id: s = `13131575` } = o.req.param(),
        c = `${e.sis001.baseUrl}/forum/space.php?uid=${s}`,
        l = await i(c),
        u = a((await n(c, { headers: { cookie: l } })).data),
        d = u(`div.bg div.title`).text().replace(`的个人空间`, ``),
        f = u(`div.center_subject ul li a[href^=thread]`)
            .toArray()
            .map((t) => ((t = u(t)), { title: t.text(), link: `${e.sis001.baseUrl}/forum/${t.attr(`href`)}`, author: d }));
    return ((f = await Promise.all(f.map((e) => t.tryGet(e.link, async () => await r(l, e))))), { title: `${d}的主题`, link: c, item: f });
}
export { o as route };
