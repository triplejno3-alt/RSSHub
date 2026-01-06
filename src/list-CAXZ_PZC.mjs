import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r } from './wechat-mp-HNgcLN2K.mjs';
import { load as i } from 'cheerio';
const a = `http://job.hrbeu.edu.cn`,
    o = {
        tzgg: { name: `通知公告`, url: `http://job.hrbeu.edu.cn/HrbeuJY/Web/Home/NewsList?43kuJdqqW6kyCmomBv0smMlyGfDy8QefMwSyc-jK8Ww=.shtml` },
        rdxw: { name: `热点新闻`, url: `http://job.hrbeu.edu.cn/HrbeuJY/Web/Home/NewsList?43kuJdqqW6kyCmomBv0smLeM5XMyxaJMXP0thrbMBWI=.shtml` },
    },
    s = {
        path: `/job/list/:id`,
        categories: [`university`],
        example: `/hrbeu/job/list/tzgg`,
        parameters: { id: `栏目，如下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `就业服务平台`,
        maintainers: [`Derekmini`],
        description: `| 通知公告 | 热点新闻 |
| :------: | :------: |
|   tzgg   |   rdxw   |`,
        handler: c,
    };
async function c(s) {
    let c = s.req.param(`id`),
        l = i((await n(o[c].url, { headers: { Referer: a } })).data),
        u = l(`li.list_item.i1`)
            .toArray()
            .map((e) => {
                let n = l(e).find(`a`).attr(`href`);
                return (n.includes(`HrbeuJY`) && (n = `${a}${n}`), { title: l(e).find(`a`).attr(`title`), pubDate: t(l(e).find(`.Article_PublishDate`).text()), link: n });
            }),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(
                    t.link,
                    async () => (
                        t.link.includes(`HrbeuJY`) ? (t.description = i((await n(t.link)).data)(`.article`).html()) : new URL(t.link).hostname === `mp.weixin.qq.com` ? await r(t) : (t.description = `本文需跳转，请点击标题后阅读`),
                        t
                    )
                )
            )
        );
    return { title: `就业服务平台-` + o[c].name, link: o[c].url, item: d };
}
export { s as route };
