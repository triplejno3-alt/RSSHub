import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/radio/academic`,
    categories: [`university`],
    example: `/seu/radio/academic`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`radio.seu.edu.cn/_s29/15986/list.psp`, `radio.seu.edu.cn/`] }],
    name: `信息科学与工程学院学术活动`,
    maintainers: [`HenryQW`],
    handler: a,
    url: `radio.seu.edu.cn/_s29/15986/list.psp`,
};
async function a() {
    let i = `https://radio.seu.edu.cn`,
        a = new URL(`_s29/15986/list.psp`, i).href,
        o = r((await n(a)).data),
        s = o(`.list_item`)
            .toArray()
            .map((e) => {
                e = o(e);
                let n = e.find(`.Article_Title a`);
                return { title: n.attr(`title`), link: new URL(n.attr(`href`), i).href, pubDate: t(e.find(`.Article_PublishDate`).text()) };
            });
    return {
        title: `东南大学信息科学与工程学院 -- 学术活动`,
        link: a,
        item: await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return ((t.author = e(`.arti_publisher`).text().replace(`发布者：`, ``)), (t.description = e(`.wp_articlecontent`).html()), t);
                })
            )
        ),
    };
}
export { i as route };
