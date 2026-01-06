import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/alerts/:keyword`,
    categories: [`other`],
    example: `/google/alerts/RSSHub`,
    parameters: { keyword: `Keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Alerts`,
    maintainers: [`TonyRL`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`keyword`),
        { data: i, url: a } = await e(`https://www.google.com/alerts/preview`, {
            searchParams: {
                params: `[null,[null,null,null,[null,"${r}","com",[null,"en","US"],null,null,null,0,0],null,3,[[null,1,"user@example.com",[null,null,20],2,"en-US",null,null,null,null,null,"0",null,null,"AB2Xq4hcilCERh73EFWJVHXx-io2lhh1EhC8UD8"]]],0]`,
            },
        }),
        o = t(i, null, !1),
        s = o(`li.result`)
            .toArray()
            .map((e) => {
                e = o(e);
                let t = e.find(`.result_title a`);
                return { title: t.text(), link: new URL(t.attr(`href`)).searchParams.get(`url`), author: e.find(`.result_source`).text(), description: e.find(`.snippet`).html() };
            });
    return { title: `Google Alerts - ${r}`, link: a, item: s };
}
export { n as route };
