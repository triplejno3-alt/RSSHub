import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = {
        'zh-cn': {
            'news-all': { id: `273`, title: `最新` },
            news: { id: `278`, title: `新闻` },
            notice: { id: `279`, title: `公告` },
            activity: { id: `280`, title: `活动` },
            title: `绝区零`,
            link: `https://zzz.mihoyo.com/news`,
            apiRootUrl: `https://api-takumi-static.mihoyo.com/content_v2_user/app/706fd13a87294881/getContentList`,
        },
        'zh-tw': {
            'news-all': { id: `288`, title: `最新` },
            news: { id: `295`, title: `新聞` },
            notice: { id: `296`, title: `公告` },
            activity: { id: `297`, title: `活動` },
            title: `絕區零`,
            link: `https://zenless.hoyoverse.com/zh-tw/news`,
            apiRootUrl: `https://api-os-takumi-static.hoyoverse.com/content_v2_user/app/3e9196a4b9274bd7/getContentList`,
        },
    },
    i = {
        path: `/zzz/:location?/:category?`,
        categories: [`game`],
        example: `/mihoyo/zzz`,
        parameters: { location: '区域，可选 `zh-cn`（国服，简中）或 `zh-tw`（国际服，繁中）', category: `分类，见下表，默认为最新` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`zzz.mihoyo.com/news`], target: `/zzz` }],
        name: `绝区零`,
        maintainers: [`Yeye-0426`],
        handler: a,
        url: `zzz.mihoyo.com/news`,
        description: `#### 新闻 {#mi-ha-you-jue-qu-ling-xin-wen}

| 最新     | 新闻 | 公告   | 活动     |
| -------- | ---- | ------ | -------- |
| news-all | news | notice | activity |`,
    };
async function a(i) {
    let { location: a = `zh-cn`, category: o = `news-all` } = i.req.param(),
        s = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 50,
        c = { 'zh-cn': `iPageSize=${s}&iPage=1&sLangKey=zh-cn&isPreview=0&iChanId=${r[a][o].id}`, 'zh-tw': `iPageSize=${s}&iPage=1&sLangKey=zh-tw&isPreview=0&iChanId=${r[a][o].id}` },
        l = (await t(`${r[a].apiRootUrl}?${c[a]}`)).data.data.list.map((t) => ({ title: t.sTitle, description: t.sContent, link: `${r[a].link}/${t.iInfoId}`, pubDate: n(e(t.dtStartTime), 8), category: t.sCategoryName }));
    return { title: `${r[a][o].title}-${r[a].title}`, link: `${r[a].link}?category=${r[a][o].id}`, item: l };
}
export { i as route };
