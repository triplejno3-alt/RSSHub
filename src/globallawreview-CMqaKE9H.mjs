import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/`,
    radar: [{ source: [`globallawreview.org/Magazine/GetIssueContentList`, `globallawreview.org/`], target: `` }],
    name: `Unknown`,
    maintainers: [`nczitzk`],
    handler: r,
    url: `globallawreview.org/Magazine/GetIssueContentList`,
};
async function r(n) {
    let r = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 30,
        i = `http://www.globallawreview.org`,
        { data: a } = await e(i),
        o = t(a),
        s = new URL(o(`p.tabBtn span a`).prop(`href`), i).href,
        { data: c } = await e(s);
    return (
        (o = t(c)),
        {
            item: o(`ul.digest li`)
                .slice(0, r)
                .toArray()
                .map((e) => {
                    e = o(e);
                    let t = e.find(`p.p1 a`),
                        n = new URL(t.prop(`href`), i).href;
                    return {
                        title: t.text(),
                        link: n,
                        description: e.find(`p.p2`).html(),
                        author: e.find(`p.p3 span`).text() || t.text().split(`：`)[0],
                        category: [
                            e
                                .find(`p.p4`)
                                .text()
                                .match(/] (\d+\.\d+);/)[1],
                        ],
                        enclosure_url: n,
                        enclosure_length:
                            e
                                .find(`p.p4`)
                                .text()
                                .match(/(\d+(\.\d+)?)\sKB/)[1] * 1e3,
                    };
                }),
            title: o(`title`).text(),
            link: s,
            language: `zh-cn`,
            author: `中国社会科学院法学研究所`,
        }
    );
}
export { n as route };
