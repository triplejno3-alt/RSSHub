import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { jsx as n } from 'hono/jsx/jsx-runtime';
import { load as r } from 'cheerio';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = `https://www.ssm.gov.mo`,
    o = `${a}/apps1/content/ch/973/itemlist.aspx?defaultcss=false&dlimit=20&showdate=true&dorder=cridate%20desc,displaydate%20desc&withattach=true`,
    s = {
        path: `/news`,
        categories: [`government`],
        example: `/ssm/news`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.ssm.gov.mo/`, `www.ssm.gov.mo/portal`] }],
        name: `最新消息`,
        maintainers: [`Fatpandac`],
        handler: c,
        url: `www.ssm.gov.mo/`,
    };
async function c() {
    let s = r((await t.get(o)).data);
    return {
        title: `澳门卫生局-最新消息`,
        link: a,
        item: s(`body > div > div > ul > li`)
            .toArray()
            .map((t) => {
                let r = s(t).find(`a`).text(),
                    a = s(t).find(`a`).attr(`href`),
                    o = e(s(t).find(`small`).text().split(`:`)[1].trim(), `DD/MM/YYYY`);
                return { title: r, link: a, description: i(n(l, { link: a })), pubDate: o };
            }),
    };
}
const l = ({ link: e }) => n(`iframe`, { width: `900`, height: `1000`, src: e });
export { s as route };
