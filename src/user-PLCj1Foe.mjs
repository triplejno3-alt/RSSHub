import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './util-CSW__Tzr.mjs';
const i = {
    path: `/user/:id`,
    categories: [`game`],
    example: `/xiaoheihe/user/30664023`,
    parameters: { id: `用户 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `用户动态`,
    maintainers: [`tssujt`],
    handler: a,
};
async function a(i) {
    let a = i.req.param(`id`),
        o = (await n({ method: `get`, url: `https://api.xiaoheihe.cn/bbs/app/profile/user/profile?lang=zh-cn&version=1.3.303&userid=${a}` })).data.result.account_detail.username,
        s = (await n({ method: `get`, url: `https://api.xiaoheihe.cn/bbs/app/profile/events?lang=zh-cn&version=1.3.303&userid=${a}&list_type=moment` })).data.result.moments
            .filter((e) => e.linkid !== void 0)
            .map((e) => ({ linkId: e.linkid, link: `https://api.xiaoheihe.cn/v3/bbs/app/api/web/share?link_id=${e.linkid}`, title: e.title, pubDate: t(e.modify_at * 1e3), description: e.description }));
    return (
        (s = await Promise.all(
            s.map((t) =>
                e.tryGet(
                    t.link,
                    async () => (
                        (t.description = (
                            await n({
                                method: `get`,
                                url: r(
                                    `https://api.xiaoheihe.cn/bbs/app/api/share/data/?os_type=web&app=heybox&client_type=mobile&version=999.0.3&x_client_type=web&x_os_type=Mac&x_app=heybox&heybox_id=-1&offset=0&limit=3&link_id=${t.linkId}&use_concept_type=`
                                ),
                            })
                        ).data.link.content[0].text),
                        delete t.linkId,
                        t
                    )
                )
            )
        )),
        { title: `${o} 的动态`, link: `https://xiaoheihe.cn`, item: s }
    );
}
export { i as route };
