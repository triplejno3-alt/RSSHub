import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/materials/:id?`,
    categories: [`finance`],
    view: r.Articles,
    example: `/youzhiyouxing/materials`,
    parameters: {
        id: {
            description: `分类`,
            options: [
                { value: `0`, label: `全部` },
                { value: `4`, label: `知行小酒馆` },
                { value: `2`, label: `知行黑板报` },
                { value: `10`, label: `无人知晓` },
                { value: `1`, label: `孟岩专栏` },
                { value: `3`, label: `知行读书会` },
                { value: `11`, label: `你好，同路人` },
            ],
            default: `0`,
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`youzhiyouxing.cn/materials`], target: `/materials` }],
    name: `有知文章`,
    maintainers: [`broven`, `Fatpandac`, `nczitzk`],
    handler: o,
    url: `youzhiyouxing.cn/materials`,
    description: `| 全部 | 知行小酒馆 | 知行黑板报 | 无人知晓 | 孟岩专栏 | 知行读书会 | 你好，同路人 |
| :--: | :--------: | :--------: | :------: | :------: | :--------: | :----------: |
|   0  |      4     |      2     |    10    |     1    |      3     |      11      |`,
};
async function o(r) {
    let a = r.req.param(`id`) ?? ``,
        o = `https://youzhiyouxing.cn`,
        s = `${o}/materials?column_id=${a}`,
        c = i((await n({ method: `get`, url: s })).data),
        l = c(`li[id*="material"]`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.text(), link: `${o}${e.find(`a`).attr(`href`)}`, pubDate: t(e.find(`.tw-text-t-muted`).text(), [`YYYY年M月D日`, `M月D日`]) }));
    return (
        (l = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n({ method: `get`, url: t.link })).data);
                    return (
                        (t.author = e(`.tw-inline`).text().replace(`·`, ``)),
                        (t.description = e(`#zx-material-marker-root`)
                            .html()
                            .replaceAll(/(<img.*?) src(=.*?>)/g, `$1 data$2`)
                            .replaceAll(/(<img.*?) data-src(=.*?>)/g, `$1 src$2`)),
                        t
                    );
                })
            )
        )),
        { title: `有知有行 - ${c(`a[phx-value-column_id="${a === `` ? 0 : a}"]`).text()}`, link: s, item: l }
    );
}
export { a as route };
