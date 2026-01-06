import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = `https://www.digitalcameraworld.com`,
    i = {
        path: `/news`,
        categories: [`new-media`],
        example: `/digitalcameraworld/news`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`digitalcameraworld.com/`] }],
        name: `News`,
        maintainers: [`EthanWng97`],
        handler: a,
    };
async function a() {
    let i = n(await e(`${r}/feeds.xml`), { xmlMode: !0 });
    return {
        title: `Digital Camera World`,
        link: r,
        description: `Camera news, reviews and features`,
        item: i(`item`)
            .toArray()
            .map((e) => {
                e = i(e);
                let n = e.find(String.raw`dc\:content`).text();
                return (
                    (n = i(`<div>`).html(n)),
                    n.find(`.vanilla-image-block`).removeAttr(`style`),
                    n.find(`.fancy-box`).remove(),
                    { title: e.find(`title`).text(), pubDate: t(e.find(`pubDate`).text()), link: e.find(`link`).text(), description: n.html() }
                );
            }),
    };
}
export { i as route };
