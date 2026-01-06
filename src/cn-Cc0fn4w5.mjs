import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = {
        2: { name: `汽车`, slug: `autos` },
        3: { name: `金融服务`, slug: `banking-insurance` },
        4: { name: `消费者`, slug: `consumers` },
        5: { name: `医药与医疗`, slug: `healthcare-pharmaceuticals` },
        7: { name: `数字化`, slug: `business-technology` },
        8: { name: `制造业`, slug: `manufacturing` },
        10: { name: `技术，媒体与通信`, slug: `technology-media-and-telecom` },
        12: { name: `城市化与可持续发展`, slug: `urbanization-sustainability` },
        13: { name: `创新`, slug: `innovation` },
        16: { name: `人才与领导力`, slug: `talent-leadership` },
        18: { name: `宏观经济`, slug: `macroeconomy` },
        19: { name: `麦肯锡全球研究院`, slug: `mckinsey-global-institute` },
        25: { name: `洞见`, slug: `insights` },
        41: { name: `资本项目和基础设施`, slug: `capital-projects-infrastructure` },
        42: { name: `旅游、运输和物流`, slug: `交通运输与物流` },
        19139: { name: `出海与国际化、转型`, slug: `出海与国际化、转型` },
        45: { name: `全球基础材料`, slug: `全球基础材料` },
    },
    o = {
        path: `/cn/:category?`,
        categories: [`finance`],
        view: r.Articles,
        example: `/mckinsey/cn`,
        parameters: { category: { description: '分类，留空为 `最新洞见`', options: Object.entries(a).map(([, e]) => ({ value: e.slug, label: e.name })), default: `最新洞见` } },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `洞见`,
        maintainers: [`laampui`],
        handler: s,
        description: `| 分类                            | 分类名             |
| ------------------------------- | ------------------ |
|                                 | 全部洞见           |
| autos                           | 汽车               |
| banking-insurance               | 金融服务           |
| consumers                       | 消费者             |
| healthcare-pharmaceuticals      | 医药与医疗         |
| business-technology             | 数字化             |
| manufacturing                   | 制造业             |
| technology-media-and-telecom    | 技术，媒体与通信   |
| urbanization-sustainability     | 城市化与可持续发展 |
| innovation                      | 创新               |
| talent-leadership               | 人才与领导力       |
| macroeconomy                    | 宏观经济           |
| mckinsey-global-institute       | 麦肯锡全球研究院   |
| capital-projects-infrastructure | 资本项目和基础设施 |
| 交通运输与物流                  | 旅游、运输和物流   |
| 出海与国际化、转型              | 出海与国际化、转型 |
| 全球基础材料                    | 全球基础材料       |`,
    };
async function s(r) {
    let { category: o = `25` } = r.req.param(),
        s = ``;
    if (o !== `25`)
        if (a[o]) s = a[o].slug;
        else {
            let e = Object.values(a).find((e) => e.slug === o);
            s = e ? e.slug : ``;
        }
    let c = `https://www.mckinsey.com.cn/insights/${s ? `${s}/` : ``}`,
        l = { 'accept-language': `en-US,en;q=0.9`, 'sec-fetch-dest': `document`, 'sec-fetch-mode': `navigate`, 'sec-fetch-site': `none` },
        u = i(await e(c, { headers: l })),
        d = u(`.fl-post-grid-post`)
            .toArray()
            .map((e) => {
                let t = u(e),
                    r = t.find(`h2 a`);
                return {
                    title: r.attr(`title`),
                    description: t.find(`.fl-post-grid-content`).html()?.trim(),
                    link: r.attr(`href`),
                    pubDate: t.find(`[itemprop="datePublished"]`).length ? n(t.find(`[itemprop="datePublished"]`).attr(`content`)) : void 0,
                };
            }),
        f = await Promise.all(
            d.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = i(await e(n.link, { headers: l }));
                    return ((n.description = t(`.ast-post-format-`).html() || n.description), (n.guid = t(`link[rel="shortlink"]`).attr(`href`)), n);
                })
            )
        );
    return { title: u(`head title`).text(), link: c, image: u(`meta[name="msapplication-TileImage"]`).attr(`content`), item: f };
}
export { o as route };
