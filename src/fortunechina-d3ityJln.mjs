import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t } from './header-generator-BdIWHTob.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { n as r, t as i } from './parse-date-DjdQS_Nt.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/:category?`,
    categories: [`new-media`],
    example: `/fortunechina`,
    parameters: { category: `分类，见下表，默认为首页` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`fortunechina.com/:category`, `fortunechina.com/`] }],
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: s,
    description: `| 商业    | 领导力    | 科技 | 研究   |
| ------- | --------- | ---- | ------ |
| shangye | lindgaoli | keji | report |`,
};
async function s(o) {
    let s = o.req.param(`category`) ?? ``,
        c = `https://www.fortunechina.com${s ? `/${s}` : ``}`,
        l = a(await e(c)),
        u = l(`.main`)
            .find(s === `` ? `a:has(h2)` : `h2 a`)
            .slice(0, o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 15)
            .toArray()
            .map((e) => {
                e = l(e);
                let t = e.attr(`href`);
                return { title: e.text(), link: t.indexOf(`http`) === 0 ? t : `${c}/${e.attr(`href`)}` };
            });
    return (
        (u = await Promise.all(
            u.map((o) =>
                n.tryGet(o.link, async () => {
                    let n = a(await e(o.link, { headerGeneratorOptions: t.MODERN_IOS })),
                        s = n(`.date`).text(),
                        c = s.match(/(\d{4}-\d{2}-\d{2})/);
                    return (
                        c ? (o.pubDate = i(c[1])) : ((c = s.match(/(\d+小时前)/)), c && (o.pubDate = r(c[1]))),
                        (o.author = n(`.author`).text()),
                        n(`.mod-info, .title, .eval-zan, .eval-pic, .sae-more, .ugo-kol, .word-text .word-box .word-cn`).remove(),
                        (o.description = n(o.link.includes(`content`) ? `.contain .text` : `.contain .top`).html()),
                        o.link.includes(`jingxuan`)
                            ? (o.description += n(`.eval-mod_ugo`).html())
                            : o.link.includes(`events`)
                              ? (o.description = a(await e(`https://www.bagevent.com/event/${o.link.match(/\d+/)[0]}`))(`.page_con`).html())
                              : o.link.includes(`zhuanlan`) && (o.description += n(`.mod-word`).html()),
                        o
                    );
                })
            )
        )),
        { title: s ? l(`title`).text() : `财富中文网`, link: c, item: u }
    );
}
export { o as route };
