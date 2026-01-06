import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:keyword?`,
    categories: [`new-media`],
    example: `/topys`,
    parameters: { keyword: `关键字，可在对应结果页的 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`topys.cn/search/:keyword`, `topys.cn/`] }],
    name: `关键字`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 创意 | 设计 | 商业 | 艺术 | 文化 | 科技 |
| ---- | ---- | ---- | ---- | ---- | ---- |`,
};
async function a(i) {
    let a = i.req.param(`keyword`) ?? ``,
        o = `https://www.topys.cn`,
        s = `${o}${a ? `/search/${a}` : `/api/web/article/get_article_list`}`,
        c = a ? await n({ method: `get`, url: s }) : await n({ method: `post`, url: s, json: { istop_time: 0, size: i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 16 } }),
        l = a
            ? c.data.match(/id:(\d+),title:"(.*?)",keyword:"(.*?)",istop_time:(\d+),thumb/g).map((e) => {
                  let n = e.match(/id:(\d+),title:"(.*)",keyword:"(.*)",istop_time:(\d+),thumb/);
                  return { title: n[2], category: n[3].split(`,`), link: `${o}/article/${n[1]}`, pubDate: t(n[4] * 1e3) };
              })
            : c.data.data.map((e) => ({ title: e.title, author: e.editor, category: e.keyword.split(`,`), link: `${o}/article/${e.id}`, pubDate: t(e.istop_time * 1e3) }));
    return (
        (l = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link })).data);
                    return ((t.description = e(`.article-content`).html()), (t.author = t.author ?? e(`.author-name p`).first().text()), t);
                })
            )
        )),
        { title: `${a ? `${a} - ` : ``}TOPYS`, link: a ? s : `${o}/pick`, item: l }
    );
}
export { i as route };
