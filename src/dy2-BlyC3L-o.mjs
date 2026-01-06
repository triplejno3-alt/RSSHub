import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './utils-3_CTTXEb.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/dy2/:id`,
    categories: [`new-media`],
    example: `/163/dy2/T1555591616739`,
    parameters: { id: `id，该网易号主页网址最后一项 html 的文件名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `网易号（通用）`,
    maintainers: [`mjysci`, `lyqluis`],
    handler: s,
    description: '优先使用方法一，若是网易号搜索页面搜不到的小众网易号（文章页面不含`data-wemediaid`）则可使用此法。\n触发反爬会只抓取到标题，建议自建。',
};
async function s(o) {
    let s = o.req.param(`id`),
        c = o.req.query(`limit`) ?? 30,
        l = `https://www.163.com/dy/media/${s}.html`,
        u = a((await n(l)).data),
        d = u(`.tab_content ul li`)
            .slice(0, c)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.find(`a.img img`);
                return { title: e.find(`h4 a`).text(), link: e.find(`a`).first().attr(`href`), pubDate: r(t(e.find(`.time`).text()), 8), imgsrc: n.attr(`src`) ?? n.attr(`_src`) };
            }),
        f = await Promise.all(d.map((t) => i(t, e.tryGet)));
    return { title: `${u(`head title`).text()} - 网易号`, link: l, description: u(`.icon_line.desc`).text(), image: u(`.head_img`).attr(`src`), item: f, author: u(`h2`).text() };
}
export { o as route };
