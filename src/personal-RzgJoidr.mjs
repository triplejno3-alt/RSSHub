import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = `https://www.laohu8.com`,
    o = {
        path: `/personal/:id`,
        categories: [`finance`],
        view: r.Articles,
        example: `/laohu8/personal/3527667596890271`,
        parameters: { id: `用户 ID，见网址链接` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`laohu8.com/personal/:id`] }],
        name: `个人主页`,
        maintainers: [`Fatpandac`],
        handler: s,
    };
async function s(r) {
    let o = `${a}/personal/${r.req.param(`id`)}`,
        s = i((await n(o)).data),
        c = s(`h2.personal-name`).text(),
        l = JSON.parse(s(`#__APP_DATA__`).text()).tweetList,
        u = await Promise.all(
            l.map((n) =>
                e.tryGet(n.link, () => ({
                    title: n.title,
                    description: String(n.htmlText).replaceAll(
                        `
`,
                        `<br><br>`
                    ),
                    link: `${a}/post/${n.id}`,
                    pubDate: t(n.gmtCreate),
                }))
            )
        );
    return { title: `老虎社区 - ${c} 个人社区`, link: o, item: u };
}
export { o as route };
