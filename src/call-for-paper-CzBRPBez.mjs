import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { load as r } from 'cheerio';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
    path: `/call-for-paper/:subject`,
    categories: [`journal`],
    example: `/sciencedirect/call-for-paper/education`,
    parameters: { subject: `学科分类，例如“education”` },
    radar: [{ source: [`sciencedirect.com`] }],
    name: `Call for Papers`,
    maintainers: [`etShaw-zh`],
    handler: o,
    url: `sciencedirect.com/browse/calls-for-papers`,
    description: '`sciencedirect.com/browse/calls-for-papers?subject=education` -> `/sciencedirect/call-for-paper/education`',
};
async function o(a) {
    let { subject: o = `` } = a.req.param(),
        s = `https://www.sciencedirect.com/browse/calls-for-papers?subject=${o}`,
        c = r(
            (
                await e(s, {
                    headers: {
                        accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
                        'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36`,
                    },
                })
            ).body
        )(`script[data-iso-key="_0"]`).text();
    if (!c) throw Error(`Cannot find the script with data-iso-key="_0"`);
    let l;
    try {
        l = JSON.parse(JSON.parse(c));
    } catch (e) {
        throw Error(`Failed to parse embedded script JSON: ${e.message}`);
    }
    let u = l?.callsForPapers?.list || [];
    if (!u.length) throw Error(`No Calls for Papers found`);
    let d = u.map((e) => {
        let r = `https://www.sciencedirect.com/special-issue/${e.contentId}/${e.url}`,
            a = i(
                n(`div`, {
                    children: [
                        n(`p`, { children: [t(`strong`, { children: `Summary:` }), ` `, e.summary] }),
                        n(`p`, { children: [t(`strong`, { children: `Submission Deadline:` }), ` `, e.submissionDeadline] }),
                        n(`p`, { children: [t(`strong`, { children: `Journal:` }), ` `, `${e.journal.displayName} (IF: ${e.journal.impactFactor}, CiteScore: ${e.journal.citeScore})`] }),
                    ],
                })
            );
        return { title: e.title, author: `${e.journal.displayName} (IF: ${e.journal.impactFactor})`, link: r, description: a, pubDate: e.submissionDeadline || `` };
    });
    return { title: `ScienceDirect Calls for Papers - ${o}`, link: s, description: `Calls for Papers on ScienceDirect for subject: ${o}`, item: d };
}
export { a as route };
