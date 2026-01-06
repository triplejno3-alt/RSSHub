import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './config-not-found-DGyG6Tbz.mjs';
import { t as r } from './utils-CHbLMKpZ.mjs';
const i = {
    path: `/douyin/:dyid`,
    categories: [`social-media`],
    example: `/newrank/douyin/110266463747`,
    parameters: { dyid: `抖音ID，可在新榜账号详情 URL 中找到` },
    features: { requireConfig: [{ name: `NEWRANK_COOKIE`, description: `` }], requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `抖音短视频`,
    maintainers: [`lessmoe`],
    handler: a,
    description: `::: warning
免费版账户抖音每天查询次数 20 次，如需增加次数可购买新榜会员或等待未来多账户支持
:::`,
};
async function a(i) {
    if (!e.newrank || !e.newrank.cookie) throw new n(`newrank RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let a = i.req.param(`dyid`),
        o = r.random_nonce(9),
        s = `https://xd.newrank.cn/xdnphb/nr/cloud/douyin/detail/aweme?xyz=` + r.decrypt_douyin_detail_xyz(o) + `&nonce=` + o,
        c = e.newrank.cookie,
        l = await t({
            method: `post`,
            url: s,
            headers: { Connection: `keep-alive`, Cookie: c, 'Content-Type': `application/json` },
            data: JSON.stringify({ create_time_end: ``, create_time_start: ``, date_type: ``, is_promotion: `0`, is_seed: `0`, keyword: ``, size: 20, sort: `create_time`, start: 1, uid: a }),
        }),
        u = await t({
            method: `post`,
            url: `https://xd.newrank.cn/xdnphb/nr/cloud/douyin/detail/accountInfoAll?nonce=` + o + `&xyz=` + r.decrypt_douyin_account_xyz(o),
            headers: { Connection: `keep-alive`, Cookie: c, 'Content-Type': `application/json` },
            data: JSON.stringify({ uid: a }),
        }),
        d = u.data.data.nickname,
        f = u.data.data.signature,
        p = r.flatten(l.data.data.list).map((e) => ({ title: e.aweme_desc, description: ``, link: e.share_url, pubDate: e.create_time }));
    return { title: d + ` - 抖音`, description: f, link: `https://xd.newrank.cn/data/d/account/workList/` + a, item: p };
}
export { i as route };
