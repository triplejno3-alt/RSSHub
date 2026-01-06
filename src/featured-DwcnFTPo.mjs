import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
        path: `/featured/:category?`,
        categories: [`finance`],
        view: r.Articles,
        example: `/techflowpost/featured`,
        parameters: { category: `分类，见下表，默认为全部` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`techflowpost.com/article/index.html`] }],
        name: `精选`,
        maintainers: [`zhenlohuang`],
        handler: o,
        url: `techflowpost.com/article/index.html`,
        description: `| 全部 | 行业 & 项目观察 | 项目简介 | 项目动态 | 赛道解读 | 播客笔记 | 交易观察 | VC洞察 | 实用教程 | 人物故事 & 访谈 | 法律 & 监管动态 | 活动动态 | 交易所动态 |
  | ---- | --------------- | -------- | -------- | -------- | -------- | -------- | ------ | -------- | --------------- | --------------- | -------- | ---------- |
  |      | 2040            | 2046     | 2047     | 2045     | 2044     | 2043     | 2042   | 2041     | 2039            | 2033            | 2032     | 2031       |`,
    },
    a = {
        2040: `行业 & 项目观察`,
        2046: `项目简介`,
        2047: `项目动态`,
        2045: `赛道解读`,
        2044: `播客笔记`,
        2043: `交易观察`,
        2042: `VC洞察`,
        2041: `实用教程`,
        2039: `人物故事 & 访谈`,
        2033: `法律 & 监管动态`,
        2032: `活动动态`,
        2031: `交易所动态`,
    };
async function o(r) {
    let i = r.req.param(`category`) ?? ``,
        o = r.req.query(`limit`) ?? 50,
        s = `https://www.techflowpost.com`,
        c = `${s}/article/index.html`,
        l = { pageindex: 1, pagesize: o, is_specialnews: `N` };
    i && (l.ncata_id = i);
    let { data: u } = await t.post(`https://www.techflowpost.com/ashx/index.ashx`, { form: l }),
        d = u.content.map((t) => ({
            title: t.stitle,
            author: t.sauthor_name,
            link: `${s}/article/detail_${t.narticle_id}.html`,
            category: [t.new_scata_name],
            pubDate: n(e(t.dcreate_time), 8),
            updated: n(e(t.dmodi_time), 8),
            description: t.scontent,
        }));
    return { title: `深潮TechFlow - 精选文章${i && a[i] ? `（${a[i]}）` : ``}`, link: c, item: d };
}
export { i as route };
