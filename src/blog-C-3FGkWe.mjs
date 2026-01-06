import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = [
        `isabelle-dev.sketis.net/phame/`,
        `isabelle-dev.sketis.net/phame/blog/`,
        `isabelle-dev.sketis.net/phame/blog/view/:blog/`,
        `isabelle-dev.sketis.net/phame/post/`,
        `isabelle-dev.sketis.net/phame/post/view/:post_id/:post_title/`,
    ],
    i = {
        path: `/isabelle-dev/blog/:blog`,
        categories: [`programming`],
        example: `/sketis/isabelle-dev/blog/1`,
        parameters: { blog: `name of blog (1 for NEWS; 2 for Release)` },
        description: '\n- Isabelle News: `https://isabelle-dev.sketis.net/phame/blog/view/1/`\n- Isabelle Release: `https://isabelle-dev.sketis.net/phame/blog/view/2/`\n',
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: r, target: `/isabelle-dev/blog/1` },
            { source: r, target: `/isabelle-dev/blog/2` },
        ],
        name: `Isabelle Development Blogs`,
        url: `isabelle-dev.sketis.net`,
        maintainers: [`Ritsuka314`],
        handler: async (r) => {
            let i = `https://isabelle-dev.sketis.net`,
                { blog: a } = r.req.param(),
                o = a === `1` ? `News` : a === `2` ? `Release` : `UNKNOWN`,
                s = `${i}/phame/blog/view/${a}/`,
                c = n(await e(s)),
                l = c(`.phui-document-summary-view`)
                    .toArray()
                    .map((e) => {
                        let n = c(e),
                            r = n.find(`.remarkup-header`).first(),
                            a = n.find(`.phui-document-summary-subtitle`).first(),
                            o = a.find(`strong`).first()[0].nextSibling.data.slice(4);
                        return { title: r.text(), link: `${i}${r.find(`a`).attr(`href`)}`, description: n.find(`.phui-document-summary-body`).html(), pubDate: t(o), author: a.find(`strong`).text() };
                    });
            return { title: `Isabelle ${o}`, link: s, item: l };
        },
    };
export { i as route };
