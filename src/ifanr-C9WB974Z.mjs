import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
    path: `/index`,
    categories: [`new-media`],
    view: r.Articles,
    example: `/ifanr/index`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.ifanr.com/index`] }],
    name: `首页`,
    maintainers: [`donghongfei`],
    handler: a,
    url: `www.ifanr.com/index`,
};
async function a() {
    let r = await n({ method: `get`, url: `https://sso.ifanr.com/api/v5/wp/web-feed/?limit=20&offset=0` });
    return {
        title: `爱范儿`,
        link: `https://www.ifanr.com`,
        description: `爱范儿首页`,
        item: await Promise.all(
            r.data.objects.map((r) => {
                let i = `https://sso.ifanr.com/api/v5/wp/article/?post_id=${r.post_id}`,
                    a = ``,
                    o = `ifanr:${r.id}`;
                return e.tryGet(o, async () => {
                    let e = (await n({ method: `get`, url: i })).data.objects[0],
                        o = e.post_cover_image;
                    return (
                        o && (a = `<img src="${o}" alt="Article Cover Image" style="display: block; margin: 0 auto;"><br>`),
                        (a += e.post_content),
                        { title: r.post_title.trim(), description: a, link: r.post_url, pubDate: t(r.created_at * 1e3), author: r.created_by.name }
                    );
                });
            })
        ),
    };
}
export { i as route };
