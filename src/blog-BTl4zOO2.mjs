import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/user/blog/:id`,
    categories: [`anime`],
    example: `/bangumi.tv/user/blog/sai`,
    parameters: { id: `用户 id, 在用户页面地址栏查看` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bgm.tv/user/:id`] }, { source: [`bangumi.tv/user/:id`] }],
    name: `用户日志`,
    maintainers: [`nczitzk`],
    handler: o,
};
async function o(a) {
    let o = `https://bgm.tv/user/${a.req.param(`id`)}/blog`,
        s = i(await e(o)),
        c = s(`#entry_list div.item`)
            .find(`h2.title`)
            .toArray()
            .map((e) => {
                e = s(e);
                let t = e.find(`a`);
                return { title: t.text(), link: new URL(t.attr(`href`), `https://bgm.tv`).href, pubDate: r(n(e.parent().find(`small.time`).text()), 0) };
            }),
        l = await Promise.all(c.map((n) => t.tryGet(n.link, async () => ((n.description = i(await e(n.link))(`#entry_content`).html()), n))));
    return { title: s(`title`).text(), link: o, item: l };
}
export { a as route };
