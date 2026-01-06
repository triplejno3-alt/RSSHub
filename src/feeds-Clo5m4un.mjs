import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/feeds/:category?`,
    categories: [`programming`],
    example: `/bestblogs/feeds/featured`,
    parameters: { category: 'the category of articles. Can be `programming`, `ai`, `product`, `business` or `featured`. Default is `featured`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `文章列表`,
    maintainers: [`zhenlohuang`],
    handler: i,
};
var r = class {
    keyword;
    qualifiedFilter;
    sourceId;
    category;
    timeFilter;
    language;
    userLanguage;
    sortType;
    currentPage;
    pageSize;
    constructor({
        keyword: e = ``,
        qualifiedFilter: t = `true`,
        sourceId: n = ``,
        category: r = ``,
        timeFilter: i = `1w`,
        language: a = `all`,
        userLanguage: o = `zh`,
        sortType: s = `default`,
        currentPage: c = 1,
        pageSize: l = 10,
    } = {}) {
        ((this.keyword = e),
            (this.qualifiedFilter = t),
            (this.sourceId = n),
            (this.category = r),
            (this.timeFilter = i),
            (this.language = a),
            (this.userLanguage = o),
            (this.sortType = s),
            (this.currentPage = c),
            (this.pageSize = l));
    }
    toJson() {
        let e = {
            keyword: this.keyword,
            qualifiedFilter: this.qualifiedFilter,
            sourceId: this.sourceId,
            category: this.category,
            timeFilter: this.timeFilter,
            language: this.language,
            userLanguage: this.userLanguage,
            sortType: this.sortType,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
        };
        return JSON.stringify(e);
    }
};
async function i(n) {
    let { category: i = `featured` } = n.req.param(),
        a = new r({ category: i, pageSize: 100, qualifiedFilter: i === `featured` ? `true` : `false`, timeFilter: `1w` }),
        o = await e(`https://api.bestblogs.dev/api/resource/list`, { headers: { 'Content-Type': `application/json` }, method: `POST`, body: a.toJson() });
    if (!o || !o.data || !o.data.dataList) throw Error(`Invalid API response: ` + JSON.stringify(o));
    return {
        title: `Bestblogs.dev`,
        link: `https://www.bestblogs.dev/feeds`,
        item: o.data.dataList.map((e) => ({
            title: e.title,
            link: e.url,
            description: e.summary,
            pubDate: t(e.publishDateTimeStr),
            author: Array.isArray(e.authors) ? e.authors.map((e) => ({ name: e })) : [{ name: e.authors }],
            category: e.category,
        })),
    };
}
export { n as route };
