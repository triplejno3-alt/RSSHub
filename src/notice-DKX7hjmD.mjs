import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://computer.hdu.edu.cn/6738/list.htm`,
    a = async () => {
        let e = r((await n(i)).data);
        return e(`.posts-list`)
            .find(`li`)
            .toArray()
            .map((n) => {
                n = e(n);
                let r = n.find(`.date`).text().slice(1, -1);
                return { title: n.find(`a`).text(), pubDate: t(r), link: `https://computer.hdu.edu.cn` + n.find(`a`).attr(`href`) };
            });
    },
    o = {
        path: `/cs`,
        categories: [`university`],
        example: `/hdu/cs`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`computer.hdu.edu.cn/6738/list.htm`] }],
        name: `计算机学院 - 通知公告`,
        maintainers: [`legr4ndk`],
        handler: s,
        url: `computer.hdu.edu.cn/6738/list.htm`,
    };
async function s() {
    let t = await a();
    return {
        title: `杭电计算机-通知公告`,
        description: `杭州电子科技大学计算机学院-通知公告`,
        link: i,
        item: await Promise.all(
            t.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return { title: t.title, link: t.link, description: e(`.wp_articlecontent`).html(), pubDate: t.pubDate };
                })
            )
        ),
    };
}
export { o as route };
