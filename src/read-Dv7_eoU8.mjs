import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
    path: `/read/:type?`,
    categories: [`other`],
    example: `/nlc/read/电子图书`,
    parameters: { type: `分类，见下表，默认为电子图书` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `读者云平台`,
    maintainers: [`nczitzk`],
    handler: s,
    description: `| [电子图书](http://read.nlc.cn/outRes/outResList?type=电子图书) | [电子期刊](http://read.nlc.cn/outRes/outResList?type=电子期刊) | [电子论文](http://read.nlc.cn/outRes/outResList?type=电子论文) | [电子报纸](http://read.nlc.cn/outRes/outResList?type=电子报纸) | [音视频](http://read.nlc.cn/outRes/outResList?type=音视频) |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |

| [标准专利](http://read.nlc.cn/outRes/outResList?type=标准专利) | [工具书](http://read.nlc.cn/outRes/outResList?type=工具书) | [少儿资源](http://read.nlc.cn/outRes/outResList?type=少儿资源) |
| -------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |`,
};
async function s(o) {
    let { type: s = `电子图书` } = o.req.param(),
        c = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 15,
        l = `中国国家图书馆`,
        u = `http://read.nlc.cn`,
        d = new URL(`/outRes/outResList?type=${s}`, u).href,
        { data: f } = await e(d),
        p = i(f),
        m = p(`ul.YMH2019_New_GRZX_list7 li a.aa`)
            .slice(0, c)
            .toArray()
            .map((e) => {
                e = p(e);
                let i = e.find(`span`).first().text();
                return {
                    title: i,
                    link: e.prop(`onclick`).match(/openOutRes\('1','(.*?)','1',/)[1],
                    description: a(
                        r(t, {
                            children: [
                                e
                                    .find(`div.pic img`)
                                    .toArray()
                                    .map((e) => {
                                        let t = p(e).prop(`src`);
                                        return t ? n(`figure`, { children: n(`img`, { src: t, alt: i }) }) : null;
                                    }),
                                e.find(`div.txt`).prop(`title`) ? n(`p`, { children: e.find(`div.txt`).prop(`title`) }) : null,
                            ],
                        })
                    ),
                    author: l,
                    category: [s],
                    guid: `nlc-read#${
                        e
                            .prev()
                            .prop(`onclick`)
                            .match(/\('(\d+)'\)/)[1]
                    }`,
                };
            }),
        h = new URL(`static/style/css/images/YMH_home_main_logo.png`, u).href,
        g = new URL(p(`link[rel="shortcut icon"]`).prop(`href`), u).href;
    return { item: m, title: `${p(`title`).text()} - ${s}`, link: d, description: s, language: `zh`, image: h, icon: g, logo: g, subtitle: s, author: l, allowEmpty: !0 };
}
export { o as route };
