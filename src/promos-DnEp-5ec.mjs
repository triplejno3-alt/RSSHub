import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './description-C3gI6zCs.mjs';
import { load as n } from 'cheerio';
const r = `https://www.openrice.com`,
    i = {
        path: `/:lang/hongkong/promos`,
        maintainers: [`after9`],
        handler: a,
        categories: [`shopping`],
        example: `/openrice/zh/hongkong/promos`,
        parameters: { lang: `语言，缺省为 zh` },
        name: `香港餐厅滋讯`,
        description: `
| 简体 | 繁體 | EN |
| ----- | ------ | ----- |
| zh-cn | zh | en |
  `,
    };
async function a(i) {
    let a = i.req.param(`lang`) ?? `zh`,
        o;
    switch (a) {
        case `zh-cn`:
            o = `/zh-cn/hongkong/promos`;
            break;
        case `en`:
            o = `/en/hongkong/promos`;
            break;
        case `zh`:
        default:
            o = `/zh/hongkong/promos`;
            break;
    }
    let s = n(await e(r + o, {})),
        c = s(`title`).text() ?? `Openrice - What's Hot`,
        l = s(`meta[name="description"]`).attr(`content`) ?? `What's Hot from Openrice`,
        u = s(`.article-listing-content-cell-wrapper`)
            .toArray()
            .map((e) => {
                let n = s(e),
                    r = n.find(`.title-name`).text() ?? ``,
                    i = n.find(`a.sr1-listing-content-cell`).attr(`href`) ?? ``,
                    a =
                        n
                            .find(`.cover-photo`)
                            .attr(`style`)
                            ?.match(/url\(['"]?(.*?)['"]?\)/)?.[1] ?? null;
                return { title: r, description: t({ description: n.find(`.article-details .desc`).text() ?? ``, image: a }), link: i };
            });
    return { title: c, link: r + o, description: l, item: u };
}
export { i as route };
