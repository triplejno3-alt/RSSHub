import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
        path: `/artistBrandlist/:grpNo/:grpNo2?`,
        categories: [`shopping`],
        example: `/ktown4u/artistBrandlist/234590/1723449`,
        parameters: { grpNo: `artist id (Get in url)`, grpNo2: `product category id (Get in url), empty for all categories` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [], target: `/artistBrandlist/:grpNo/:grpNo2` }],
        name: `Get the products on sale`,
        maintainers: [`JamesWDGu`],
        handler: async (n) => {
            let { grpNo: a, grpNo2: o = `` } = n.req.param(),
                s = await e(`https://cn.ktown4u.com/selectArtistBrandList?cateGrpNo=${o}&currentPage=1&goodsSearch=newgoods&grpNo=${a}&searchType=ARTIST`, {
                    method: `POST`,
                    headers: { accept: `application/json, text/plain, */*`, 'accept-language': `en,zh-CN;q=0.9,zh;q=0.8` },
                    parseResponse: JSON.parse,
                }),
                c = s.map((e) => ({ title: e.GOODS_NM, url: e.IMG_PATH, link: `https://cn.ktown4u.com/iteminfo?goods_no=${e.GOODS_NO}`, description: i(e), pubDate: t(e.RELEASE_DT) }));
            return { title: r(s), link: `https://cn.ktown4u.com/artistBrandlist?grp_no=${a}&grp_no2=${o}`, item: c };
        },
    },
    r = (e) => `ktown4u ${e[0].GRP_NM}`,
    i = (e) => {
        let t = e.SALE_YN === `N` ? `【售罄】` : ``,
            n = `${e.CURR_F_CD}${e.DISP_PRICE}`;
        return (e.DISP_PRICE !== e.DISP_DC_PRICE && (n = `${e.CURR_F_CD}${e.DISP_DC_PRICE} / 原价：${n}`), `${t} ${n} <br> <img src=${e.IMG_PATH}> <br> ${e.GOODS_NM}`);
    };
export { n as route };
