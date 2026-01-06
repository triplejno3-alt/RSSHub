import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/huizhou/zwgk/:category?`,
    categories: [`government`],
    example: `/gov/huizhou/zwgk/jgdt`,
    parameters: { category: `资讯类别，可以从网址中得到，默认为政务要闻` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `惠州市人民政府`,
    maintainers: [`Fatpandac`],
    handler: o,
    description: `#### 政务公开 {#guang-dong-sheng-ren-min-zheng-fu-hui-zhou-shi-ren-min-zheng-fu-zheng-wu-gong-kai}`,
};
async function o(a) {
    let o = `http://www.huizhou.gov.cn/zwgk/hzsz/${a.req.param(`category`) ?? `zwyw`}`,
        s = i((await n(o)).data),
        c = s(`span#navigation`).children(`a`).last().text(),
        l = s(`ul.ul_art_row`)
            .toArray()
            .map((e) => ({ title: s(e).find(`a`).text().trim(), link: s(e).find(`a`).attr(`href`), pubDate: r(t(s(e).find(`li.li_art_date`).text().trim()), 8) })),
        u = await Promise.all(
            l.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n(a.link)).data);
                    try {
                        ((a.description = e(`div.artContent`).html()),
                            (a.author = e(`div.info_fbt`)
                                .find(`span.ly`)
                                .text()
                                .match(/来源：(.*)/)[1]),
                            (a.pubDate = r(
                                t(
                                    e(`div.info_fbt`)
                                        .find(`span.time`)
                                        .text()
                                        .match(/时间：(.*)/)[1]
                                ),
                                8
                            )));
                    } catch {
                        a.description = ``;
                    }
                    return a;
                })
            )
        );
    return { title: `惠州市人民政府 - ${c}`, link: o, item: u };
}
export { a as route };
