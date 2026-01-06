import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `http://en.shisu.edu.cn`,
    a = `https://en.shisu.edu.cn`,
    o = {
        path: `/en/:section`,
        categories: [`university`],
        example: `/shisu/en/news`,
        parameters: { section: `The name of resources` },
        radar: [{ source: [`en.shisu.edu.cn/resources/:section/`], target: `/en/:section` }],
        name: `SISU TODAY | FEATURED STORIES`,
        maintainers: [`Duuckjing`],
        handler: c,
        description: `- features: Read a series of in-depth stories about SISU faculty, students, alumni and beyond campus.
  - news: SISU TODAY English site.`,
    };
async function s(a, o) {
    let s = r(await e(`${a}/resources/${o}/`)),
        c = s(`.tab-con:nth-child(1) ul li`)
            .toArray()
            .map((e) => {
                let t = s(e),
                    r = t.find(`img`).attr(`src`),
                    i = `${a}${t.find(`h3>a`).attr(`href`)}`;
                return { title: t.find(`h3>a`).text().trim(), link: i, pubDate: n(t.find(`p.time`).text()), itunes_item_image: `${a}${r}` };
            }),
        l = await Promise.all(
            c.map((n) =>
                t.tryGet(
                    n.link,
                    async () => (
                        (n.description = r(await e(n.link))(`.details-con`)
                            .html()
                            .replaceAll(/<o:p>[\S\s]*?<\/o:p>/g, ``)
                            .replaceAll(/(<p[^>]*>&nbsp;<\/p>\s*)+/gm, `<p>&nbsp;</p>`)),
                        n
                    )
                )
            )
        );
    return { title: String(o) === `features` ? `FEATURED STORIES` : `SISU TODAY`, link: `${i}/resources/${o}/`, item: l };
}
async function c(t) {
    let { section: n } = t.req.param(),
        r;
    try {
        (await e(i), (r = s(i, n)));
    } catch {
        (await e(a), (r = s(a, n)));
    }
    return r;
}
export { o as route };
