import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
    path: `/random`,
    categories: [`other`],
    example: `/urbandictionary/random`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`urbandictionary.com/random.php`, `urbandictionary.com/`] }],
    name: `Random words`,
    maintainers: [`TonyRL`],
    handler: s,
    url: `urbandictionary.com/random.php`,
};
async function s() {
    let o = `https://www.urbandictionary.com`,
        { data: s } = await t(`https://api.urbandictionary.com/v0/random`),
        c = s.list.map((t) => ({
            title: t.word,
            description: a(
                i(n, {
                    children: [
                        t.definition ? i(n, { children: [t.definition, r(`br`, {})] }) : null,
                        t.example ? i(n, { children: [r(`i`, { children: t.example }), r(`br`, {})] }) : null,
                        t.author ? i(n, { children: [`by `, r(`a`, { href: `https://www.urbandictionary.com/author.php?author=${t.author}`, children: t.author })] }) : null,
                    ],
                })
            ),
            link: `${o}/define.php?term=${t.word}`,
            guid: t.permalink,
            pubDate: e(t.written_on),
            author: t.author,
        }));
    return { title: `Urban Dictionary: Random words`, link: `${o}/random.php`, item: c };
}
export { o as route };
