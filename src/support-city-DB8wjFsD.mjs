import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { n as e, r as t, t as n } from './utils-DsnTwqZ5.mjs';
const r = { path: `/support-city`, example: `/wellcee/support-city`, name: `支持的城市`, maintainers: [`TonyRL`], radar: [{ source: [`www.wellcee.com`] }], handler: i, url: `www.wellcee.com` };
async function i(r) {
    let i = await e(),
        a = await Promise.all(i.map(async (e) => ({ ...e, district: await t(e.id) }))),
        o = new URL(r.req.url).host;
    return {
        title: `支持的城市 - Wellcee`,
        description: `上海国际化租房平台｜北京合租&找室友｜香港留学生租房｜深圳无中介租房｜广州外国人租房 ｜杭州高品质租房｜成都房东直租；同志友好&宠物友好；Wellcee 的生活方式：社交｜活动｜交友｜美食｜宠物领养｜音乐&艺术；Wellcee 的二手市集：家居｜电子｜奢侈品｜时尚。`,
        link: n,
        item: a.flatMap((e) => e.district.map((t) => ({ title: `${e.chCityName} - ${t.name}`, description: `${e.chCityName} - ${t.name}`, link: `https://${o}/wellcee/rent/${e.chCityName}/${t.name}` }))),
    };
}
export { r as route };
