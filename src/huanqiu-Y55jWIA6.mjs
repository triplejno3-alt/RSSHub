import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { t as i } from './valid-host-Bsy2BS2p.mjs';
import { load as a } from 'cheerio';
function o(e, t, n, r) {
    for (let i of Object.values(e)) i[t] === void 0 ? r.push(i[n]) : o(i[t], t, n, r);
    return r;
}
const s = {
    path: `/news/:category?`,
    categories: [`traditional-media`],
    example: `/huanqiu/news/china`,
    parameters: { category: `类别，可以使用二级域名作为参数，默认为：china` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`huanqiu.com/`] }],
    name: `分类`,
    maintainers: [`yuxinliu-alex`],
    handler: c,
    url: `huanqiu.com/`,
    description: `| 国内新闻 | 国际新闻 | 军事 | 台海   | 评论    |
| -------- | -------- | ---- | ------ | ------- |
| china    | world    | mil  | taiwai | opinion |`,
};
async function c(s) {
    let c = s.req.param(`category`) ?? `china`;
    if (!i(c)) throw new r(`Invalid category`);
    let l = `https://${c}.huanqiu.com`,
        u = await n({ method: `get`, url: `${l}/api/channel_pc` }),
        d = o(u.data.children, `children`, `domain_name`, [])[0],
        f = (
            await n({
                method: `get`,
                url: `${l}/api/list?node=${o(u.data.children, `children`, `node`, [])
                    .map((e) => `"${e}"`)
                    .join(`,`)}&offset=0&limit=${s.req.query(`limit`) ?? 20}`,
            })
        ).data.list
            .filter((e) => e.aid)
            .map((e) => ({ link: `${l}/article/${e.aid}`, title: e.title }));
    return (
        (f = await Promise.all(
            f.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = a((await n({ method: `get`, url: r.link })).data);
                    return (
                        (r.description = e(`textarea.article-content`).text()),
                        (r.author = e(`span`, `.source`).text()),
                        (r.pubDate = t(Number.parseInt(e(`textarea.article-time`).text()))),
                        (r.category = e(`meta[name="keywords"]`).attr(`content`).split(`,`)),
                        r
                    );
                })
            )
        )),
        { title: `${d} - 环球网`, link: l, description: `环球网`, language: `zh-cn`, item: f }
    );
}
export { s as route };
