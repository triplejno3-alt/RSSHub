import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.kimlaw.or.kr`,
    o = {
        path: `/thesis`,
        categories: [`study`],
        example: `/kimlaw/thesis`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`kimlaw.or.kr/67`, `kimlaw.or.kr/`] }],
        name: `Thesis`,
        maintainers: [`TonyRL`],
        handler: s,
        url: `kimlaw.or.kr/67`,
    };
async function s() {
    let o = `${a}/67`,
        { data: s } = await n(o),
        c = i(s),
        l = c(`.li_body`)
            .toArray()
            .map((e) => {
                e = c(e);
                let n = e.find(`a.list_text_title`);
                return { title: n.text(), link: `${a}${n.attr(`href`)}`, author: e.find(`.name`).text(), pubDate: r(t(e.find(`.time`).attr(`title`)), 9) };
            }),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = i(e)(`.board_txt_area`).html()), t);
                })
            )
        );
    return { title: `${c(`.widget_menu_title`).text()} - ${c(`head title`).text()}`, link: o, image: `https://cdn.imweb.me/upload/S20210819f9dd86d20e7d7/9aec17c4e98a5.ico`, item: u };
}
export { o as route };
