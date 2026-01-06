import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = { xsyg: { title: `学术预告`, tag: `30284` }, jytz: { title: `教研通知`, tag: `30307` }, hwxx: { title: `海外学习`, tag: `hwxx` }, swtz: { title: `事务通知`, tag: `30283` } },
    o = {
        path: `/gzic/notice/:category?`,
        categories: [`university`],
        example: `/scut/gzic/notice/swtz`,
        parameters: { category: '通知分类，默认为 `swtz`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `广州国际校区 - 通知公告`,
        maintainers: [`gdzhht`],
        handler: s,
        description: `| 学术预告 | 教研通知 | 海外学习 | 事务通知 |
| -------- | -------- | -------- | -------- |
| xsyg     | jytz     | hwxx     | swtz     |

::: warning
由于学校网站对非大陆 IP 的访问存在限制，可能需自行部署。
部分通知详情页可能会被删除（返回 404），或在校园网外无法访问。
:::`,
    };
async function s(o) {
    let s = `https://www2.scut.edu.cn`,
        c = a[o.req.param(`category`) || `swtz`],
        l = `${s}/gzic/${c.tag}/list.htm`,
        { data: u } = await r(l),
        d = i(u),
        f = d(`.right-nr .row .col-lg-4`)
            .toArray()
            .map((e) => {
                e = d(e);
                let t = e.find(`.thr-box a`),
                    r = e.find(`.thr-box a span`);
                return { title: e.find(`.thr-box a p`).text(), link: t.attr(`href`)?.startsWith(`http`) ? t.attr(`href`) : `${s}${t.attr(`href`)}`, pubDate: n(r.text()) };
            }),
        p = await Promise.all(
            f.map((n) =>
                t.tryGet(n.link, async () => {
                    try {
                        n.description = i(await e(n.link))(`div.wp_articlecontent`).html();
                    } catch (e) {
                        if (e.response && e.response.status === 404) n.description = ``;
                        else throw e;
                    }
                    return n;
                })
            )
        );
    return { title: `华南理工大学广州国际校区 - ${c.title}`, link: l, item: p };
}
export { o as route };
