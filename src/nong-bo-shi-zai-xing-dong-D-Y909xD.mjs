import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = `https://web.cmc.hebtv.com/cms/rmt0336/19/19js/st/ds/nmpd/nbszxd/index.shtml`,
    u = (e, t) =>
        c(
            o(i, {
                children: [
                    e?.src ? a(`figure`, { children: a(`img`, { src: e.src, alt: e.alt }) }) : null,
                    t?.src ? o(`video`, { poster: t.poster, controls: !0, children: [a(`source`, { src: t.src, type: t.type }), a(`object`, { data: t.src, children: a(`embed`, { src: t.src }) })] }) : null,
                ],
            })
        ),
    d = {
        path: `/nbszxd`,
        categories: [`traditional-media`],
        example: `/hebtv/nbszxd`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !0, supportScihub: !1 },
        radar: [{ source: [`web.cmc.hebtv.com/cms/rmt0336/19/19js/st/ds/nmpd/nbszxd/index.shtml`] }],
        name: `农博士在行动`,
        maintainers: [`iamqiz`, `nczitzk`],
        handler: f,
        url: `web.cmc.hebtv.com/cms/rmt0336/19/19js/st/ds/nmpd/nbszxd/index.shtml`,
    };
async function f(i) {
    let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 40,
        o = new URL(`cmsback/api/article/getMyArticleDetail`, `http://api.cmc.hebtv.com`).href,
        c = s((await n(l)).data),
        d = c(`.video_box .tv_items`)
            .first()
            .children()
            .toArray()
            .map((e) => {
                e = c(e);
                let n = e.find(`a`).first(),
                    i = n.text().match(/\d+/),
                    a = i ? i[0] : ``;
                return { title: n.text(), link: `${l}/../${n.attr(`href`)}`, pubDate: a ? r(t(a, `YYYYMMDD`), 8) : null, author: `时间|` + a };
            }),
        f = await Promise.all(
            d.slice(0, a).map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = e.match(/tenantid = '(\w+)';/)[1],
                        s = i.link.match(/\/nbszxd\/(\d+)/)[1],
                        { data: c } = await n(o, { searchParams: { tenantId: a, articleId: s } }),
                        l = c.data,
                        d;
                    return (
                        l.articleContentDto?.videoDtoList?.length > 0 && (d = l.articleContentDto?.videoDtoList[0]),
                        (i.title = l.title),
                        (i.author = l.source),
                        (i.guid = `hebtv-nbszxd-${s}`),
                        (i.pubDate = r(t(l.publishDate), 8)),
                        (i.updated = r(t(l.modifyTime), 8)),
                        d &&
                            ((i.itunes_item_image = d.poster),
                            (i.itunes_duration = l.articleContentDto?.videoEditDtoList[0]?.sourceMediaInfo?.duration),
                            (i.enclosure_url = d.formats[0]?.url),
                            (i.enclosure_length = l.articleContentDto?.videoEditDtoList[0].sourceMediaInfo?.fileSize),
                            (i.enclosure_type = i.enclosure_url ? `video/${i.enclosure_url?.split(/\./)?.pop()}` : void 0)),
                        (i.description = u(void 0, d ? { src: i.enclosure_url, type: i.enclosure_type, poster: i.itunes_item_image } : void 0)),
                        i
                    );
                })
            )
        ),
        p = c(`meta[name="description"]`).prop(`content`),
        m = p.split(/,/)[0],
        h = c(`link[rel="shortcut icon"]`).prop(`href`);
    return {
        item: f,
        title: c(`title`).text(),
        link: l,
        description: p,
        language: c(`html`).prop(`lang`),
        image: c(`div.logo a img`).prop(`src`),
        icon: h,
        logo: h,
        subtitle: c(`meta[name="keywords"]`).prop(`content`),
        author: m,
        itunes_author: m,
        itunes_category: `News`,
        allowEmpty: !0,
    };
}
export { d as route };
