import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import c from 'dayjs';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = ({ images: e, description: t }) => o(i, { children: [e?.map((e, t) => a(`img`, { src: e }, `${e}-${t}`)), t ? a(i, { children: u(t) }) : null] }),
    f = (e) => l(a(d, { ...e })),
    p = { exp: `新聞總覽`, fov: `全日焦點`, industry: `板塊新聞`, int: `國際金融`, recagent: `大行報告`, ntlgroup: `A股新聞`, pro: `地產新聞`, weainvest: `投資理財`, ipo: `新股IPO`, tech: `科技財情` },
    m = {
        path: `/money18/:id?`,
        categories: [`traditional-media`],
        example: `/oncc/money18/exp`,
        parameters: { id: `栏目 id，可在对应栏目页 URL 中找到，默认为 exp，即新聞總覽` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Money18`,
        maintainers: [`nczitzk`],
        handler: h,
        description: `| 新聞總覽 | 全日焦點 | 板塊新聞 | 國際金融 | 大行報告 | A 股新聞 | 地產新聞 | 投資理財  | 新股 IPO | 科技財情 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------- | -------- | -------- |
| exp      | fov      | industry | int      | recagent | ntlgroup | pro      | weainvest | ipo      | tech     |`,
    };
async function h(i) {
    let a = i.req.param(`id`) ?? `exp`,
        o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 30,
        l = `https://money18.on.cc`,
        u = `${l}/finnews/news_${a === `industry` ? `industry.html` : `breaking.html?section=${a}`}`,
        d = `https://dyn.on.cc/api/asrh/v1/events/names/新股/articles?page=1&limit=${o}`,
        m = `${l}/cnt/utf8/content/articleList/sector_list_exp_1.js`,
        h = (e) => `${l}/cnt/utf8/content/${e}/articleList/list_${a}_all.js`,
        g = a === `ipo` ? d : a === `industry` ? m : h(c().format(`YYYYMMDD`)),
        _ = !1,
        v = [],
        y = 0,
        b;
    for (; !_; )
        try {
            ((b = await n({ method: `get`, url: g })), (_ = !0));
        } catch (e) {
            e.code === `ERR_NON_2XX_3XX_RESPONSE` && ((_ = !1), (g = h(c().subtract(++y, `day`).format(`YYYYMMDD`))));
        }
    return (
        (v =
            a === `ipo`
                ? b.data.articles.map((e) => ({
                      title: e.title,
                      author: e.authorname,
                      link: `${l}/finnews/content/${a}/${e.articleId}.html`,
                      description: f({ images: e.hasHdPhoto ? [`https://hk.on.cc/hk/bkn${e.hdEnlargeThumbnail}`] : void 0, description: e.content }),
                      pubDate: r(t(e.pubDate), 8),
                  }))
                : a === `industry`
                  ? b.data.articles.slice(0, o).map((e) => ({ title: e.title, author: e.authorname, link: `${l}/finnews/content/${a}/${e.articleId}.html`, category: e.sector.map((e) => e.name), pubDate: r(t(e.pubDate), 8) }))
                  : b.data.slice(0, o).map((e) => ({ title: e.title, author: e.authorname, link: `${l}/finnews/content/${a}/${e.articleId}.html`, pubDate: r(t(e.pubDate), 8) }))),
        a !== `ipo` &&
            (v = await Promise.all(
                v.map((t) =>
                    e.tryGet(t.link, async () => {
                        let e = s((await n({ method: `get`, url: t.link })).data);
                        return (
                            (t.description = f({
                                images: e(`.photo img`)
                                    .toArray()
                                    .map((t) => e(t).attr(`src`)),
                                description: e(`.content`).html(),
                            })),
                            t
                        );
                    })
                )
            )),
        { title: `東網產經 - ${p[a]}`, link: u, item: v }
    );
}
export { m as route };
