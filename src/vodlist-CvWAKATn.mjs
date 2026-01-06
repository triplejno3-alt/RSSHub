import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = { path: `/vodlist`, categories: [`multimedia`], example: `/olevod/vodlist`, radar: [{ source: [`www.olevod.one`], target: `/vodlist` }], name: `最新视频`, maintainers: [`fang63625`], handler: r, features: { nsfw: !0 } };
async function r() {
    let n = `https://www.olevod.one`,
        r = t(await e(n));
    return {
        title: `欧乐影院 最新视频`,
        link: n,
        item: r(`.cbox1 .vodlist_thumb.lazyload`)
            .toArray()
            .map((e) => {
                let t = r(e),
                    i = n + t.attr(`href`),
                    a = t.attr(`title`),
                    o = n + t.attr(`data-original`);
                return { title: `${a} ${t.find(`.pic_text.text_right`).text()}`, link: i, image: o, description: `豆瓣评分 ${t.find(`.text_right.text_dy`).text()}` };
            }),
    };
}
export { n as route };
