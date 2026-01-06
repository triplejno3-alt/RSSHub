import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = `https://www.openrice.com`,
    n = {
        path: `/:lang/hongkong/voting/top/:categoryKey`,
        maintainers: [`after9`],
        handler: r,
        categories: [`shopping`],
        example: `/openrice/zh/hongkong/voting/top/chinese`,
        parameters: { lang: `语言，缺省为 zh`, categoryKey: `类别，缺省为 chinese` },
        name: `OpenRice 開飯熱店 - 年度餐廳投票`,
        description: `
  lang: 语言，见下方列表
| 简体 | 繁體 | EN |
| ----- | ------ | ----- |
| zh-cn | zh | en |

  categoryKey: 部分类别，见下方列表 (更多的类别可以在页面的link中对照获取)
| 中菜館 | 上海菜 | 粵菜 | 川菜 | 港式 | 粥粉麵店 | 廚師發辦 | 韓國菜 | 泰國菜 | 越南菜 |
| -------- | -------- | -------- |  -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| chinese | shanghainese | guangdong | sichuan | hkstyle | congee_noodles | omakase | korean | thai | vietnamese |
  `,
    };
async function r(n) {
    let r = n.req.param(`lang`) ?? `zh`,
        i = n.req.param(`categoryKey`) ?? `chinese`,
        a = `/${r}/hongkong/voting/top`,
        o,
        s;
    switch (r) {
        case `zh-cn`:
            ((o = `OpenRice 开饭热店`), (s = `OpenRice用戶可以在網站或手機應用程式，點擊餐廳頁面中「投票」按鈕，即可完成投票。參加投票的用戶有機會參加大抽獎，贏取豐富獎品。`));
            break;
        case `en`:
            ((o = `OpenRice Best Restaurant`),
                (s = `OpenRice users can vote by clicking the &quot;Vote&quot; button on the restaurant page on the website or mobile app. Voters will have the opportunity to participate in the grand lottery and win grand prizes.`));
            break;
        case `zh`:
        default:
            ((o = `OpenRice 開飯熱店`), (s = `OpenRice用戶可以在網站或手機應用程式，點擊餐廳頁面中「投票」按鈕，即可完成投票。參加投票的用戶有機會參加大抽獎，贏取豐富獎品。`));
    }
    let c = (
        await e(t + `/api/v2/voting/search/poi`, {
            headers: { accept: `application/json` },
            query: { uiLang: r, uiCity: `hongkong`, categoryKey: i, shortlistIndexLt: 20, startAt: 0, regionId: 0, rows: 20, needTag: !0, _isPrivate: !0 },
        })
    ).paginationResult.results.map((e) => {
        let n = e.name ?? ``,
            i = `${t}/${r}/hongkong/r-${e.name}-r${e.poiId}`;
        return { title: n, description: `${e.district.name}-${e.categories.map((e) => e.name).join(`-`)}`, link: i };
    });
    return { title: o, link: t + a, description: s, item: c };
}
export { n as route };
