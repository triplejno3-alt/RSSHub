import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/scripts/:script/feedback`,
    categories: [`program-update`],
    example: `/greasyfork/scripts/431691-bypass-all-shortlinks/feedback`,
    parameters: { script: `Script id, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`greasyfork.org/:language/scripts/:script/feedback`] }],
    name: `Script Feedback`,
    maintainers: [`miles170`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`script`),
        a = `https://greasyfork.org`,
        o = `${a}/scripts/${i}/feedback`,
        s = n((await t(o)).data);
    return {
        title: s(`title`).text(),
        link: o,
        description: s(`meta[name=description]`).attr(`content`),
        item: s(`.script-discussion-list .discussion-list-container .discussion-list-item`)
            .toArray()
            .map((t) => {
                t = s(t);
                let n = t.find(`.discussion-meta .discussion-meta-item`).eq(0),
                    r = t.find(`.discussion-title`);
                return { title: r.text().trim(), author: n.find(`a`).text(), pubDate: e(n.find(`gf-relative-time`).attr(`datetime`)), link: a + r.attr(`href`) };
            }),
    };
}
export { r as route };
