import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/personalpage/:uid`,
    categories: [`new-media`],
    example: `/guancha/personalpage/243983`,
    parameters: { uid: `用户id， 可在URL中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `个人主页文章`,
    maintainers: [`Jeason0228`],
    handler: n,
};
async function n(t) {
    let n = `https://app.guancha.cn/user/get-published-list?page_size=20&page_no=1&uid=${t.req.param(`uid`)}`,
        r = (await e({ method: `get`, url: n, headers: { Referer: `https://user.guancha.cn` } })).data.data.items,
        i = r[0].user_nick;
    function a(e) {
        let t = /(\d+)\s*分钟前/,
            n = /(\d+)\s*小时前/,
            r = /昨天\s*(\d+):(\d+)/,
            i = /(\d+)-(\d+)\s*(\d+):(\d+)/,
            a = new Date().getTimezoneOffset() * 60 * 1e3 - -8 * 3600 * 1e3,
            o;
        if (e === `刚刚`) o = new Date();
        else if (t.test(e)) {
            let n = t.exec(e);
            o = new Date(Date.now() - Number.parseInt(n[1]) * 60 * 1e3);
        } else if (n.test(e)) {
            let t = n.exec(e);
            o = new Date(Date.now() - Number.parseInt(t[1]) * 60 * 60 * 1e3);
        } else if (r.test(e)) {
            let t = r.exec(e);
            ((o = new Date(Date.now() - 86400 * 1e3 + a)), o.setHours(Number.parseInt(t[1]), Number.parseInt(t[2]), 0, 0), (o = new Date(o.getTime() - a)));
        } else if (i.test(e)) {
            let t = i.exec(e),
                n = new Date(Date.now() + a).getFullYear();
            ((o = new Date(n, Number.parseInt(t[1]) - 1, Number.parseInt(t[2]), Number.parseInt(t[3]), Number.parseInt(t[4]))), (o = new Date(o.getTime() - a)));
        } else o = new Date(e);
        return o;
    }
    return {
        title: `${i}-观察者-风闻社区`,
        link: n,
        description: `${i} 的个人主页`,
        item: r.map((e) => ({ title: e.title, description: e.summary, pubDate: a(e.pass_at), link: `https://user.guancha.cn/main/content?id=${e.id}`, author: e.user_nick })),
    };
}
export { t as route };
