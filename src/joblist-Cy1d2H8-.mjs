import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import r from 'markdown-it';
const i = r({ html: !0, linkify: !0 }),
    a = {
        path: `/`,
        categories: [`other`],
        view: n.Notifications,
        example: `/easynomad`,
        radar: [{ source: [`easynomad.cn`] }],
        name: `远程工作列表`,
        maintainers: [`jiangsong216`],
        handler: o,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    };
async function o() {
    return {
        title: `轻松游牧-远程工作聚合列表`,
        description: `支持国内远程的招聘列表，远程全职，远程兼职`,
        link: `https://easynomad.cn`,
        item: (await t({ method: `get`, url: `https://easynomad.cn/api/posts/list?limit=15&page=1&jobCategory=&contractType=` })).data.data.map((t) => ({
            title: t.jobTitle,
            description: t.descContent ? i.render(t.descContent) : `No description`,
            pubDate: e(t.jobPublishTime),
            link: t.url,
        })),
    };
}
export { a as route };
