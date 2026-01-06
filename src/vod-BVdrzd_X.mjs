import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/vod/:id`,
    categories: [`multimedia`],
    example: `/olevod/vod/202449091`,
    parameters: { id: `视频id号` },
    radar: [{ source: [`www.olevod.one/vod/:id`], target: `/vod/:id` }],
    name: `视频`,
    maintainers: [`fang63625`],
    handler: r,
    features: { nsfw: !0 },
};
async function r(n) {
    let r = `https://www.olevod.one`,
        i = `${r}/vod/${n.req.param(`id`)}`,
        a = t(await e(i)),
        o = a(`.title.scookie`).text().trim(),
        s = a(`.vodlist_thumb.lazyload`).attr(`data-original`);
    return {
        title: o,
        link: i,
        item: a(`.content_playlist.clearfix a`)
            .toArray()
            .map((e) => {
                let t = a(e),
                    n = r + t.attr(`href`);
                return { title: `${o}  ${t.text()}`, link: n };
            }),
        image: r + s,
    };
}
export { n as route };
