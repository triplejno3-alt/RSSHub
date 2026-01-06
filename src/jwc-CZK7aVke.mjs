import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/jwc`,
    categories: [`university`],
    example: `/buct/jwc`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jiaowuchu.buct.edu.cn/610/list.htm`, `jiaowuchu.buct.edu.cn/611/main.htm`], target: `/jwc` }],
    name: `教务处`,
    maintainers: [`Epic-Creeper`],
    handler: i,
    url: `buct.edu.cn/`,
};
async function i() {
    let r = `https://jiaowuchu.buct.edu.cn`,
        i = `${r}/610/list.htm`,
        a = n((await t.get(i)).data),
        o = a(`div.list02 ul > li`)
            .not(`#wp_paging_w66 li`)
            .toArray()
            .map((e) => ({ pubDate: a(e).find(`span`).text(), title: a(e).find(`a`).attr(`title`), link: `${r}${a(e).find(`a`).attr(`href`)}` })),
        s = await Promise.all(
            o.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = n((await t.get(i.link)).data),
                        a = e(`.wp_pdf_player`).attr(`pdfsrc`);
                    if (a) {
                        let e = `${r}${a}`;
                        return ((i.description = `此页面为PDF文档：<a href="${new URL(e, r)}">点击查看pdf</a>`), i);
                    }
                    return ((i.description = e(`.rt_zhengwen`).html()), i);
                })
            )
        );
    return { title: a(`title`).text(), link: i, item: s };
}
export { r as route };
