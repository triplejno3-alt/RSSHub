import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = {
        'zh-cn': { 'news-all': { id: `255`, title: `最新` }, news: { id: `256`, title: `新闻` }, notice: { id: `257`, title: `公告` }, activity: { id: `258`, title: `活动` }, link: `https://sr.mihoyo.com/news` },
        'zh-tw': { 'news-all': { id: `248`, title: `最新` }, news: { id: `249`, title: `資訊` }, notice: { id: `250`, title: `公告` }, activity: { id: `251`, title: `活動` }, link: `https://hsr.hoyoverse.com/zh-tw/news` },
    },
    i = {
        path: `/sr/:location?/:category?`,
        categories: [`game`],
        example: `/mihoyo/sr`,
        parameters: { location: '区域，可选 `zh-cn`（国服，简中）或 `zh-tw`（国际服，繁中）', category: `分类，见下表，默认为最新` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`sr.mihoyo.com/news`], target: `/sr` }],
        name: `崩坏：星穹铁道`,
        maintainers: [`shinanory`],
        handler: a,
        url: `sr.mihoyo.com/news`,
        description: `#### 新闻 {#mi-ha-you-beng-huai-xing-qiong-tie-dao-xin-wen}

| 最新     | 新闻 | 公告   | 活动     |
| -------- | ---- | ------ | -------- |
| news-all | news | notice | activity |`,
    };
async function a(i) {
    let { location: a = `zh-cn`, category: o = `news-all` } = i.req.param(),
        s = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 50,
        c =
            a === `zh-cn`
                ? `https://api-takumi-static.mihoyo.com/content_v2_user/app/1963de8dc19e461c/getContentList?iPage=1&iPageSize=${s}&sLangKey=zh-cn&isPreview=0&iChanId=${r[a][o].id}`
                : `https://api-os-takumi-static.hoyoverse.com/content_v2_user/app/113fe6d3b4514cdd/getContentList?iPage=1&iPageSize=${s}&sLangKey=${a}&isPreview=0&iChanId=${r[a][o].id}`,
        l = (await t(c)).data.data.list.map((t) => ({ title: t.sTitle, description: t.sContent, link: `${r[a].link}/${t.iInfoId}`, pubDate: n(e(t.dtStartTime), 8), category: t.sCategoryName }));
    return { title: `${r[a][o].title}-崩坏：星穹铁道`, link: c, item: l };
}
export { i as route };
