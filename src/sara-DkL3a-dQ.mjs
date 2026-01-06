import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = { dynamic: `协会动态`, announcement: `通知公告`, industry: `行业动态` },
    i = {
        path: `/:type`,
        categories: [`government`],
        example: `/sara/announcement`,
        parameters: { type: `dynamic | announcement | industry` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        description: `| 协会动态 | 通知公告 |行业动态 |
| -------- | ------------ | -------- |
| dynamic | announcement | industry |`,
        name: `新闻资讯`,
        maintainers: [`HChenZi`],
        handler: async (t) => {
            let i = `http://www.sara.org.cn`,
                o = t.req.param(`type`),
                s = `${i}/news/${o}.htm`,
                c = n(await e(s)),
                l = c(`.newsItem_total > dd`)
                    .toArray()
                    .map((e) => {
                        let t = c(e).find(`a`).first();
                        return { link: `${i}${t.attr(`href`)}`, title: t.attr(`title`) };
                    }),
                u = await Promise.all(l.map((e) => a(e)));
            return { title: r[o], link: s, item: u };
        },
    };
async function a(r) {
    return await t.tryGet(r.link, async () => ({ description: n(await e(r.link))(`.text`).html(), language: `zh-cn`, ...r }));
}
export { i as route };
