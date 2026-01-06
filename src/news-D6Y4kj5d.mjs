import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:category?`,
    categories: [`traditional-media`],
    example: `/tass/politics`,
    parameters: { category: 'Category, can be found in URL, `politics` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`tass.com/:category`], target: `/:category` }],
    name: `News`,
    maintainers: [`TonyRL`],
    handler: a,
    description: `| Russian Politics & Diplomacy | World | Business & Economy | Military & Defense | Science & Space | Emergencies | Society & Culture | Press Review | Sports |
| ---------------------------- | ----- | ------------------ | ------------------ | --------------- | ----------- | ----------------- | ------------ | ------ |
| politics                     | world | economy            | defense            | science         | emergencies | society           | pressreview  | sports |`,
};
async function a(i) {
    let { category: a = `politics` } = i.req.param(),
        { data: o, url: s } = await n(`https://tass.com/${a}`),
        c = r(o),
        l = c(`.container .section-page`)
            .attr(`ng-init`)
            .match(/sectionId\s*=\s*(\d+?);/),
        { data: u } = await n.post(`https://tass.com/userApi/categoryNewsList`, { json: { sectionId: l[1], limit: 20, type: `all` } }),
        d = u.newsList.map((e) => ({ title: e.title, description: e.lead, link: `https://tass.com${e.link}`, pubDate: t(e.date, `X`) })),
        f = await Promise.all(
            d.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        i = r(e);
                    return (
                        i(`.news-media img`).each((e, t) => {
                            t.attribs.src && (t.attribs.src = t.attribs.src.replaceAll(`/width/1020_b9261fa1`, ``));
                        }),
                        (t.description = i(`.news-header__lead`).prop(`outerHTML`) + (i(`.news-media`).prop(`outerHTML`) ?? ``) + i(`.text-block`).html()),
                        t
                    );
                })
            )
        );
    return {
        title: c(`head title`).text(),
        link: s,
        language: `en`,
        image: c(`head meta[property="og:image"]`).attr(`content`),
        icon: c(`head link[rel="apple-touch-icon"]`).attr(`href`),
        logo: c(`head link[rel="apple-touch-icon"]`).attr(`href`),
        item: f,
    };
}
export { i as route };
