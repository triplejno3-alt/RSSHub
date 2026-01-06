import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
const a = {
    path: `/ttjj/user/:uid`,
    categories: [`finance`],
    view: i.SocialMedia,
    example: `/eastmoney/ttjj/user/6551094298949188`,
    parameters: { uid: `用户id, 可以通过天天基金App分享用户主页到浏览器，在相应的URL中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `天天基金用户动态`,
    maintainers: [`zidekuls`],
    handler: o,
};
async function o(i) {
    let a = i.req.param(`uid`),
        o = `https://jijinbaapi.eastmoney.com/gubaapi/v3/read`,
        s = (await n(`${`${o}/User/UserInfo.ashx?ServerVersion=1.0.0&PhoneType=windows&Location=zh-CN&ctoken=&utoken=&deviceid=000000&ps=8&plat=Wap&product=Fund&version=201&followuid=`}${a}`)).data.user_nickname || `不存在的用户`,
        c = (
            await n({
                method: `post`,
                url: `${o}/Article/Post/UserPostList.ashx`,
                headers: { Accept: `application/json`, 'Content-Type': `application/x-www-form-urlencoded` },
                form: { uid: a, deviceId: 666666, version: 201, p: 1, ps: 20 },
            })
        ).data.re,
        l = `${o}/Article/Post/ArticleContent.ashx`,
        u = await Promise.all(
            c.map((i) =>
                e.tryGet(l + i.post_id, async () => {
                    let e = (
                        await n({
                            method: `post`,
                            url: l,
                            headers: { Accept: `application/json`, 'Content-Type': `application/x-www-form-urlencoded` },
                            body: `postid=${i.post_id}&ServerVersion=1.0.0&PhoneType=windows&Location=zh-CN&ctoken=&utoken=&deviceId=000000&userId=&plat=Wap&product=Fund&version=201`,
                        })
                    ).data.post.post_content;
                    return {
                        title: i.post_title,
                        description: e,
                        pubDate: r(t(i.post_display_time, `YYYY-MM-DD HH:mm:ss`), 8),
                        link: `https://fundbarmob.eastmoney.com/index.html?goPage=articleView&lastPage=personDetailView&aid=${i.post_id}`,
                    };
                })
            )
        );
    return { title: `天天基金-${s}的主页`, link: `https://fundbarmob.eastmoney.com/index.html?goPage=personDetailView&userid=${a}`, description: `${s} 的动态`, item: u };
}
export { a as route };
