import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/xxgk/news`,
    categories: [`university`],
    example: `/dhu/xxgk/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `最新信息公开`,
    maintainers: [`KiraKiseki`],
    handler: a,
};
async function a() {
    let i = `https://xxgk.dhu.edu.cn/1737/list.htm`,
        { data: a } = await n(i),
        o = r(a);
    return {
        title: `东华大学信息公开网-最新公开信息`,
        link: i,
        item: await Promise.all(
            o(`.cols_list > li`)
                .toArray()
                .map(async (i) => {
                    i = o(i);
                    let a = i.find(`.cols_title > a`),
                        s = i.find(`.cols_meta`),
                        c = a.attr(`href`),
                        l = a.text(),
                        u = t(s.text(), `YYYY-MM-DD`, `zh-cn`),
                        d = `https://xxgk.dhu.edu.cn${c}`;
                    return await e.tryGet(d, async () => {
                        let e = ``;
                        try {
                            let { data: t } = await n(d);
                            e = r(t)(`.wp_articlecontent`).first().html() ?? ``;
                        } catch {
                            e = ``;
                        }
                        return { title: l, link: c, pubDate: u, description: e };
                    });
                })
        ),
    };
}
export { i as route };
