import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
        path: `/blogs/:language?`,
        categories: [`blog`],
        example: `/geocaching/blogs/en`,
        parameters: {
            language: {
                description: `language`,
                default: `en`,
                options: [
                    { value: `en`, label: `English` },
                    { value: `de`, label: `Deutsch` },
                    { value: `fr`, label: `Français` },
                    { value: `es`, label: `Español` },
                    { value: `nl`, label: `Nederlands` },
                    { value: `cs`, label: `Čeština` },
                    { value: `all`, label: `Not Specified` },
                ],
            },
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`geocaching.com/blog/`, `geocaching.com/`] }],
        name: `Official Blogs`,
        maintainers: [`HankChow`, `Konano`],
        handler: a,
        url: `geocaching.com/blog/`,
    },
    r = { de: 140, fr: 138, es: 702, nl: 737, cs: 1404 },
    i = { de: `Deutsch`, fr: `Français`, es: `Español`, nl: `Nederlands`, cs: `Čeština` };
async function a(n) {
    let a = `https://www.geocaching.com`,
        o = n.req.param(`language`) ?? `en`,
        s = { per_page: n.req.query(`limit`) ?? 20, _embed: 1, _fields: [`id`, `title`, `link`, `guid`, `content`, `date_gmt`, `modified_gmt`, `_embedded`, `_links`].join(`,`) };
    if (o === `en`) s.categories_exclude = Object.values(r).join(`,`);
    else if (o in r) s.categories = r[o];
    else if (o !== `all`) throw Error(`Unsupported language: ${o}`);
    let { data: c } = await t(`${a}/blog/wp-json/wp/v2/posts`, { searchParams: s }),
        l = c.map((t) => {
            let n = t._embedded[`wp:featuredmedia`][0],
                r = n?.media_details,
                i = r?.sizes.large || r?.sizes.full;
            return {
                title: t.title.rendered.trim(),
                link: t.link,
                guid: t.guid.rendered,
                description: t.content.rendered,
                pubDate: e(t.date_gmt),
                updated: e(t.modified_gmt),
                author: t._embedded.author[0].name,
                category: t._embedded[`wp:term`][0].map((e) => e.name.trim()),
                media: i ? { content: { url: n.source_url, type: n.mime_type, height: r.height, width: r.width, fileSize: r.filesize }, thumbnail: { url: i.source_url, height: i.height, width: i.width } } : void 0,
            };
        });
    return {
        title: o in i ? `Geocaching Blog - ${i[o]}` : `Geocaching Blog`,
        link: `${a}/blog/`,
        language: o in r ? o : `en`,
        image: `https://i.ytimg.com/vi_webp/G28VxvBoSLQ/maxresdefault.webp`,
        icon: `${a}/blog/favicon.ico`,
        logo: `${a}/blog/favicon.ico`,
        description: `Geocaching Official Blog`,
        item: l,
        allowEmpty: !0,
    };
}
export { n as route };
