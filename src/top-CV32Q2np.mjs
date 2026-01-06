import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/top/:period`,
    categories: [`programming`],
    example: `/dev.to/top/week`,
    parameters: { period: `Period (week, month, year, infinity)` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`dev.to/top/:period`] }],
    name: `Top Posts`,
    maintainers: [`dwemerx`, `Rjnishant530`],
    handler: a,
    url: `dev.to/top`,
};
async function a(i) {
    let a = i.req.param(`period`),
        o = `https://dev.to`,
        s = `${o}/top/${a}`,
        c = new Date();
    switch (a) {
        case `week`:
            c.setDate(c.getDate() - 7);
            break;
        case `month`:
            c.setMonth(c.getMonth() - 1);
            break;
        case `year`:
            c.setFullYear(c.getFullYear() - 1);
            break;
        case `infinity`:
        default:
            c.setFullYear(c.getFullYear() - 5);
            break;
    }
    let l = c.toISOString(),
        u = (await n({ method: `get`, url: `https://dev.to/search/feed_content?per_page=15&sort_by=public_reactions_count&sort_direction=desc&approved=&class_name=Article&published_at%5Bgte%5D=${encodeURIComponent(l)}` })).data,
        d = await Promise.all(
            u.result.map((i) => {
                let a = `${o}${i.path}`;
                return e.tryGet(a, async () => {
                    let e = r((await n(a)).data),
                        s = e(`.crayons-article__cover img`).attr(`src`),
                        c = e(`.crayons-article__body`).html() || ``;
                    return {
                        title: i.title,
                        author: [{ name: i.user.name, url: `${o}/${i.user.username}`, avatar: i.user.profile_image_90 }],
                        link: a,
                        pubDate: t(i.published_at_int * 1e3),
                        description: c,
                        category: i.tag_list,
                        image: s,
                    };
                });
            })
        );
    return {
        title: `dev.to top (${a})`,
        link: s,
        description: `Top dev.to posts`,
        language: `en-us`,
        item: d,
        icon: `https://media2.dev.to/dynamic/image/width=32,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png`,
    };
}
export { i as route };
