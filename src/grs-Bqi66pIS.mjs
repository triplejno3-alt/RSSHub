import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/grs`,
    categories: [`university`],
    example: `/bjfu/grs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`graduate.bjfu.edu.cn/`] }],
    name: `研究生院培养动态`,
    maintainers: [`markmingjie`],
    handler: o,
    url: `graduate.bjfu.edu.cn/`,
};
async function o() {
    let a = `http://graduate.bjfu.edu.cn/pygl/pydt/index.html`,
        o = (await n.get(a)).data,
        s = i(o),
        c = s(`.itemList li`)
            .slice(0, 11)
            .toArray()
            .map((e) => {
                let n = s(e),
                    i = n.find(`li a`).attr(`title`),
                    a = n.find(`li a`).attr(`href`),
                    o = r(
                        t(
                            n
                                .find(`li a`)
                                .text()
                                .match(/\d{4}-\d{2}-\d{2}/)
                        ),
                        8
                    );
                return { title: i, link: `http://graduate.bjfu.edu.cn/pygl/pydt/` + a, author: `北京林业大学研究生院培养动态`, pubDate: o };
            });
    return {
        title: `北林研培养动态`,
        link: a,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = (await n.get(t.link)).data;
                    return ((t.description = i(e)(`.articleTxt`).html()), t);
                })
            )
        ),
    };
}
export { a as route };
