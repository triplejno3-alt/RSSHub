import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = {
    name: `ニュース`,
    categories: [`anime`],
    path: `/news/:category?`,
    example: `/m-78/news`,
    radar: [
        { source: [`m-78.jp/news`], target: `/news` },
        { source: [`m-78.jp/news/category/:category`], target: `/news/:category` },
    ],
    parameters: {
        category: {
            description: `news category`,
            default: `news`,
            options: [
                { value: `news`, label: `ニュース` },
                { value: `streaming`, label: `動画配信` },
                { value: `event`, label: `イベント` },
                { value: `onair`, label: `放送` },
                { value: `broadcast`, label: `放送/配信` },
                { value: `goods`, label: `グッズ` },
                { value: `ultraman-cardgame`, label: `ウルトラマン カードゲーム` },
                { value: `shop`, label: `ショップ` },
                { value: `blu-ray_dvd`, label: `Blu-ray・DVD` },
                { value: `digital`, label: `デジタル` },
            ],
        },
    },
    handler: o,
    maintainers: [`KarasuShin`],
    features: { supportRadar: !0 },
    view: n.Articles,
};
async function o(n) {
    let a = `https://m-78.jp`,
        o = `${a}/wp-json/wp/v2/categories`,
        s = `${a}/wp-json/wp/v2/posts`,
        c = n.req.param(`category`) ?? `news`,
        l = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 20,
        u = await e(`${o}?slug=${c}`);
    if (u.length === 0) throw new r(`Category not found`);
    let { id: d, link: f, name: p } = u[0],
        m = await e(`${s}?categories=${d}&per_page=${l}`);
    return {
        title: `${p} | ニュース`,
        link: f,
        item: m.map((e) => {
            let n = i(e.content.rendered, null, !1);
            return (
                n(`#ez-toc-container`).remove(),
                n(`img`).each((e, t) => {
                    /wp-content\/uploads/.test(t.attribs.src) && (t.attribs.src = t.attribs.src.replace(/(-\d+x\d+)/, ``));
                }),
                { title: e.title.rendered, link: e.link, description: n.html(), pubDate: t(e.date_gmt), updated: t(e.modified_gmt) }
            );
        }),
    };
}
export { a as route };
