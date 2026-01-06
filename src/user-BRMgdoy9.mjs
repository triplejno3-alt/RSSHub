import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/tieba/user/:uid`,
    categories: [`bbs`],
    example: `/baidu/tieba/user/斗鱼游戏君`,
    parameters: { uid: `用户 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `用户帖子`,
    maintainers: [`igxlin`, `nczitzk`],
    handler: a,
    description: '用户 ID 可以通过打开用户的主页后查看地址栏的 `un` 字段来获取。',
};
async function a(i) {
    let a = i.req.param(`uid`),
        o = (await t(`https://tieba.baidu.com/home/main?un=${a}`)).data,
        s = r(o),
        c = s(`span.userinfo_username`).text(),
        l = s(`div.n_right.clearfix`),
        u;
    return {
        title: `${c} 的贴吧`,
        link: `https://tieba.baidu.com/home/main?un=${a}`,
        item:
            l &&
            l
                .toArray()
                .map(
                    (t) => (
                        (t = s(t).find(`.n_contain`)),
                        (u = t.find(`ul.n_media.clearfix img`).attr(`original`)),
                        {
                            title: t.find(`div.thread_name a`).attr(`title`),
                            pubDate: n(e(t.parent().find(`div .n_post_time`).text(), [`YYYY-MM-DD`, `HH:mm`]), 8),
                            description: `${t.find(`div.n_txt`).text()}<br><img src="${u}">`,
                            link: t.find(`div.thread_name a`).attr(`href`),
                        }
                    )
                ),
    };
}
export { i as route };
