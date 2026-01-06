import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/:channel?`, radar: [{ source: [`www.biodiscover.com/:channel`], target: `/:channel` }], name: `Unknown`, maintainers: [`aidistan`], handler: a };
async function a(i) {
    let a = `http://www.biodiscover.com/` + i.req.param(`channel`),
        o = r((await n({ url: a })).data),
        s = o(`.new_list .newList_box`)
            .toArray()
            .map((e) => ({ pubDate: t(o(e).find(`.news_flow_tag .times`).text().trim()), link: `http://www.biodiscover.com` + o(e).find(`h2 a`).attr(`href`) }));
    return {
        title: `生物探索 - ` + o(`.header li.sel a`).text(),
        link: a,
        description: o(`meta[name=description]`).attr(`content`),
        item: await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ url: t.link })).data),
                        i = e(`.main_info`).children().last();
                    return (i.css(`display`) === `none` && i.remove(), { title: e(`h1`).text().trim(), description: e(`.main_info`).html(), pubDate: t.pubDate, link: t.link });
                })
            )
        ),
    };
}
export { i as route };
