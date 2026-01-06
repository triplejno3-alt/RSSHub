import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: [`/topics/:topic`],
    categories: [`traditional-media`],
    example: `/sankei/topics/etc_100`,
    parameters: { topic: `Topic name (format included in URL). For example, for "Expo 2025 Osaka, Kansai, Japan Special Feature" https://www.sankei.com/tag/topic/etc_100, the value would be etc_100.` },
    radar: [{ source: [`www.sankei.com/tag/topic/:topic`], target: `/topics/:topic` }],
    name: `Topic`,
    maintainers: [`yuikisaito`],
    handler: a,
};
async function a(i) {
    let a = `https://www.sankei.com`,
        { topic: o } = i.req.param(),
        s = `${a}/tag/topic/${o}/`,
        c = r((await n(s)).body),
        l = c(`li.breadcrumb-list-item:nth-of-type(3) > a`).text(),
        u = c(`div.story-card-feed.grid.hide_on_mobile > div > article`),
        d = await Promise.all(
            u.toArray().map((i) => {
                let o = c(i);
                o.find(`p a`).remove();
                let s = o.find(`div.story-card-flex > h3.headline > a`).text(),
                    l = a + (o.find(`div.story-card-flex > h3.headline > a`).attr(`href`) || ``),
                    u = t(o.find(`div.story-card-flex > div > time`).attr(`datetime`) || ``);
                return e.tryGet(l, async () => {
                    let e = r((await n(l)).body);
                    return (e(`.inline-gptAd, .figure_image_sizer`).remove(), { title: s, link: l, pubDate: u, description: e(`div.article-body`).html() || `` });
                });
            })
        );
    return { title: `産経ニュース - ` + l, description: c(`meta[name="description"]`).attr(`content`), link: s, image: c(`meta[property="og:image"]`).attr(`content`), language: `ja`, item: d };
}
export { i as route };
