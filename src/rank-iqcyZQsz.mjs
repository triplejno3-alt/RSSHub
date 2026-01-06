import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = async (i) => {
        let { id: o = `yw` } = i.req.param(),
            s = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            c = `https://www.stcn.com`,
            l = new URL(`article/list/${o}.html`, c).href,
            u = new URL(`article/category-news-rank.html`, c).href,
            d = await e(u, { headers: { 'x-requested-with': `XMLHttpRequest` }, query: { type: o } }),
            f = a(await e(l)),
            p = f(`html`).attr(`lang`) ?? `zh-CN`,
            m = [];
        return (
            (m = d.data.slice(0, s).map((e) => {
                let t = e.title,
                    n = e.url;
                return { title: t, link: n ? new URL(n, c).href : void 0, language: p };
            })),
            (m = (
                await Promise.all(
                    m.map((i) =>
                        i.link
                            ? t.tryGet(i.link, async () => {
                                  let t = a(await e(i.link)),
                                      o = t(`div.detail-title`).text(),
                                      s = t(`div.detail-content`).html() ?? ``,
                                      c = t(`div.detail-info span`).last().text().trim(),
                                      l = t(`meta[name="keywords"]`).attr(`content`)?.split(/,/) ?? [],
                                      u = t(`div.detail-info span`).first().text().split(/：/).pop(),
                                      d = c,
                                      f = { title: o, description: s, pubDate: c ? r(n(c), 8) : i.pubDate, category: l, author: u, content: { html: s, text: s }, updated: d ? r(n(d), 8) : i.updated, language: p };
                                  return { ...i, ...f };
                              })
                            : i
                    )
                )
            ).filter((e) => !0)),
            {
                title: f(`title`).text(),
                description: f(`meta[name="description"]`).attr(`content`),
                link: l,
                item: m,
                allowEmpty: !0,
                image: f(`img.stcn-logo`).attr(`src`),
                author: f(`meta[name="keywords"]`).attr(`content`)?.split(/,/)[0],
                language: p,
                id: l,
            }
        );
    },
    s = {
        path: `/article/rank/:id?`,
        name: `热榜`,
        url: `www.stcn.com`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/stcn/article/rank/yw`,
        parameters: {
            category: {
                description: '分类，默认为 `yw`，即要闻，可在对应分类页 URL 中找到',
                options: [
                    { label: `要闻`, value: `yw` },
                    { label: `股市`, value: `gs` },
                    { label: `公司`, value: `company` },
                    { label: `基金`, value: `fund` },
                    { label: `金融`, value: `finance` },
                    { label: `评论`, value: `comment` },
                    { label: `产经`, value: `cj` },
                    { label: `科创板`, value: `kcb` },
                    { label: `新三板`, value: `xsb` },
                    { label: `ESG`, value: `zk` },
                    { label: `滚动`, value: `gd` },
                ],
            },
        },
        description:
            '::: tip\n若订阅 [要闻](https://www.stcn.com/article/list/yw.html)，网址为 `https://www.stcn.com/article/list/yw.html`，请截取 `https://www.stcn.com/article/list/` 到末尾 `.html` 的部分 `yw` 作为 `id` 参数填入，此时目标路由为 [`/stcn/article/rank/yw`](https://rsshub.app/stcn/article/rank/yw)。\n:::\n\n| 要闻 | 股市 | 公司    | 基金 | 金融    | 评论    |\n| ---- | ---- | ------- | ---- | ------- | ------- |\n| yw   | gs   | company | fund | finance | comment |\n\n| 产经 | 科创板 | 新三板 | ESG | 滚动 |\n| ---- | ------ | ------ | --- | ---- |\n| cj   | kcb    | xsb    | zk  | gd   |\n',
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/:id`],
                target: (e, t) => {
                    let n = new URL(t).searchParams.get(`type`) ?? e.id;
                    return `/stcn/article/rank${n ? `/${n}` : ``}`;
                },
            },
            { title: `要闻`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/yw.html`], target: `/article/rank/yw` },
            { title: `股市`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/gs.html`], target: `/article/rank/gs` },
            { title: `公司`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/company.html`], target: `/article/rank/company` },
            { title: `基金`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/fund.html`], target: `/article/rank/fund` },
            { title: `金融`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/finance.html`], target: `/article/rank/finance` },
            { title: `评论`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/comment.html`], target: `/article/rank/comment` },
            { title: `产经`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/cj.html`], target: `/article/rank/cj` },
            { title: `科创板`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/kcb.html`], target: `/article/rank/kcb` },
            { title: `新三板`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/xsb.html`], target: `/article/rank/xsb` },
            { title: `ESG`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/zk.html`], target: `/article/rank/zk` },
            { title: `滚动`, source: [`www.stcn.com/article/list.html`, `www.stcn.com/article/list/gd.html`], target: `/article/rank/gd` },
        ],
        view: i.Articles,
    };
export { o as handler, s as route };
