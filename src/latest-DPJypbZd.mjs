import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/latest`,
    categories: [`traditional-media`],
    example: `/caixinglobal/latest`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`caixinglobal.com/news`, `caixinglobal.com/`] }],
    name: `Latest News`,
    maintainers: [`TonyRL`],
    handler: a,
    url: `caixinglobal.com/news`,
};
async function a(i) {
    let { data: a } = await n(`https://gateway.caixin.com/api/extapi/homeInterface.jsp`, {
            searchParams: { subject: `100990318;100990314;100990311`, start: 0, count: i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 20, type: `2`, _: Date.now() },
        }),
        o = a.datas.map((e) => ({
            title: e.desc,
            description: e.summ,
            link: e.link,
            pubDate: t(e.time),
            category: e.tags.map((e) => e.name),
            nid: e.nid,
            attr: e.attr,
            enclosure_url: e.audioUrl,
            enclosure_type: e.audioUrl ? `audio/mpeg` : void 0,
            itunes_item_image: e.audioUrl ? e.pict.imgs[0].url : void 0,
        }));
    return {
        title: `The Latest Top Headlines on China - Caixin Global`,
        description: `The latest headlines on China finance, companies, politics, international affairs and other China-related issues from around the world. Caixin Global`,
        language: `en`,
        link: `https://www.caixinglobal.com/news/`,
        item: await Promise.all(
            o.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        i = r(e);
                    i(`.loadingBox, .cons-pay-tip`).remove();
                    let a = i(`#appContent`).prop(`outerHTML`);
                    if (t.attr === 0) {
                        let { data: e } = await n(`https://u.caixinglobal.com/get/reading.do`, { searchParams: { id: t.nid, source: ``, url: t.link, _: Date.now() } });
                        a = e.data.content;
                    }
                    return ((t.description = i(`.cons-photo`).prop(`outerHTML`) + a), t);
                })
            )
        ),
    };
}
export { i as route };
