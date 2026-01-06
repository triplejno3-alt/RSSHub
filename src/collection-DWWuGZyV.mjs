import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
const i = {
    path: `/collection/:collectionID`,
    categories: [`social-media`],
    example: `/lofter/collection/552041`,
    parameters: { collectionID: `Lofter collection ID, can be found in the share URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Collection`,
    maintainers: [`SrakhiuMeow`],
    handler: o,
};
async function a(e, t, n = 0) {
    let i = await r({
        method: `post`,
        url: `https://api.lofter.com/v1.1/postCollection.api?product=lofter-android-7.6.12`,
        body: new URLSearchParams({ collectionid: e, limit: t.toString(), method: `getCollectionDetail`, offset: n.toString(), order: `0` }),
    });
    if (!i.data.response) throw Error(`Collection Not Found`);
    let a = i.data.response;
    return { title: a.collection.name || `Lofter Collection`, link: a.blogInfo.homePageUrl || `https://www.lofter.com/`, description: a.collection.description || `No description provided.`, items: a.items };
}
async function o(r) {
    let i = r.req.param(`collectionID`),
        o = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : `50`,
        { title: s, link: c, description: l, items: u } = await t.tryGet(i, () => a(i, Number(o)), e.cache.routeExpire, !1);
    return {
        title: s,
        link: c,
        item: u.map((e) => ({
            title: e.post.title || e.post.noticeLinkTitle,
            link: e.post.blogPageUrl,
            description:
                JSON.parse(e.post.photoLinks || `[]`)
                    .map((e) => (e.raw?.match(/\/\/nos\.netease\.com\//) && (e.raw = `https://${e.raw.match(/(imglf\d)/)[0]}.lf127.net${e.raw.match(/\/\/nos\.netease\.com\/imglf\d(.*)/)[1]}`), `<img src='${e.raw || e.orign}'>`))
                    .join(``) +
                JSON.parse(e.post.embed ? `[${e.post.embed}]` : `[]`)
                    .map((e) => `<video src='${e.originUrl}' poster='${e.video_img_url}' controls='controls'></video>`)
                    .join(``) +
                e.post.content,
            pubDate: n(e.post.publishTime),
            author: e.post.blogInfo.blogNickName,
            category: e.post.tag.split(`,`),
        })),
        description: l,
    };
}
export { i as route };
