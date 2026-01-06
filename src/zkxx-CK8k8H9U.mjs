import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './wechat-mp-HNgcLN2K.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/yzb/zkxx/:type`,
    categories: [`university`],
    example: `/sjtu/yzb/zkxx/sszs`,
    parameters: { type: `无默认选项` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `研究生招生网招考信息`,
    maintainers: [`stdrc`],
    handler: o,
    description: `| 博士招生 | 硕士招生 | 港澳台招生 | 考点信息 | 院系动态 |
| -------- | -------- | ---------- | -------- | -------- |
| bszs     | sszs     | gatzs      | kdxx     | yxdt     |`,
};
async function o(a) {
    let o = `https://yzb.sjtu.edu.cn/index/zkxx/${a.req.param(`type`)}.htm`,
        s = i(await e(o)),
        c = s(`li[id^="line"] a`)
            .toArray()
            .map((e) => ({ link: new URL(e.attribs.href, o).href, title: s(e).text(), pubDate: n(s(e.next?.next).text().trim()) })),
        l = await Promise.all(
            c.map((n) =>
                t.tryGet(n.link, async () =>
                    new URL(n.link).hostname === `mp.weixin.qq.com`
                        ? await r(n.link)
                        : new URL(n.link).hostname === `www.shmeea.edu.cn`
                          ? ((n.description = i(await e(n.link.replace(`http://`, `https://`)))(`.Article_content`).html()), n)
                          : (new URL(n.link).hostname === `yzb.sjtu.edu.cn` && (n.description = i(await e(n.link))(`[id^=vsb_content]`).html()), n)
                )
            )
        );
    return { link: o, title: `上海交通大学研究生招生网招考信息 -- ${s(`title`).text().split(`-`)[0]}`, item: l };
}
export { a as route };
