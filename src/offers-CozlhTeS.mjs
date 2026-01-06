import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './description-C3gI6zCs.mjs';
const n = `https://www.openrice.com`,
    r = {
        path: `/:lang/hongkong/offers`,
        maintainers: [`after9`],
        handler: i,
        categories: [`shopping`],
        example: `/openrice/zh/hongkong/offers`,
        parameters: { lang: `语言，缺省为 zh` },
        name: `香港餐廳精選優惠券`,
        description: `
| 简体 | 繁體 | EN |
| ----- | ------ | ----- |
| zh-cn | zh | en |
  `,
    };
async function i(r) {
    let i = r.req.param(`lang`) ?? `zh`,
        a;
    switch (i) {
        case `zh-cn`:
            a = `/zh-cn/hongkong/offers`;
            break;
        case `en`:
            a = `/en/hongkong/offers`;
            break;
        case `zh`:
        default:
            a = `/zh/hongkong/offers`;
            break;
    }
    let o = await e(n + `/api/offers`, { headers: { accept: `application/json` }, query: { uiLang: i, uiCity: `hongkong`, page: 1, sortBy: `PublishTime`, couponTypeId: 1 } }),
        s = o.pageInfo,
        c = o.highlightedOffers,
        l = o.searchResult.paginationResult.results,
        u = [...c, ...l].map((e) => {
            let r = e.title ?? ``,
                i = n + e.urlUI,
                a = e.doorPhotoUI.urls.full ?? ``;
            return { title: r, description: t({ description: e.couponType === 0 ? e.poiNameUI : `${e.desc} (${e.startTimeUI} - ${e.expireTimeUI}) [${e.multiplePoiDistrictName}]`, image: a }), link: i };
        });
    return { title: s.seoInfo.title ?? `OpenRice Hong Kong Offers`, link: n + a, description: s.seoInfo.metadataDictionary.name.find((e) => e.key === `description`)?.value ?? `OpenRice Hong Kong Offers`, item: u };
}
export { r as route };
