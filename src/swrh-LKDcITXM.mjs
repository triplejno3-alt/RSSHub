import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './wechat-mp-HNgcLN2K.mjs';
import { load as r } from 'cheerio';
const i = `https://swrh.whu.edu.cn`,
    a = {
        path: `/swrh/:type`,
        categories: [`university`],
        example: `/whu/swrh/2`,
        radar: [{ source: [`swrh.whu.edu.cn/:type`], target: `/swrh/:type` }],
        parameters: { type: `公告类型，详见表格` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `水利水电学院公告`,
        maintainers: [`FanofZY`],
        handler: o,
        description: `| 公告类型 | 学院新闻 | 学术科研 | 通知公告 |
| -------- | -------- | -------- | -------- |
| 参数     | 0        | 1        | 2        |`,
    };
async function o(a) {
    let o = Number.parseInt(a.req.param(`type`)),
        s;
    switch (o) {
        case 0:
            s = `${i}/index/xyxw.htm`;
            break;
        case 1:
            s = `${i}/index/xsky.htm`;
            break;
        case 2:
            s = `${i}/xxgk/tzgg.htm`;
            break;
        default:
            throw Error(`Unknown type: ${o}`);
    }
    let c = r((await t(s)).data),
        l =
            o === 0
                ? c(`div.my_box_nei`)
                      .toArray()
                      .map((e) => ((e = c(e)), { title: e.find(`a b.am-text-truncate`).text().trim(), pubDate: e.find(`a i`).text().trim(), link: new URL(e.find(`a`).attr(`href`), i).href }))
                : c(`div.list_txt.am-fr ul.am-list li`)
                      .toArray()
                      .map((e) => ((e = c(e)), { title: e.find(`a span`).text().trim(), pubDate: e.find(`a i`).text().trim(), link: new URL(e.find(`a`).attr(`href`), i).href })),
        u = await Promise.all(
            l.map((i) =>
                e.tryGet(
                    i.link,
                    async () => (
                        (i.description = i.link.includes(`weixin`)
                            ? await n(i.link).then((e) => e.description)
                            : await (async () => {
                                  try {
                                      let e = r((await t(i.link)).data);
                                      return e(`.v_news_content`).length ? e(`.v_news_content`).html().trim() : e(`.prompt`).length ? e(`.prompt`).html() : i.title;
                                  } catch {
                                      return i.title;
                                  }
                              })()),
                        i
                    )
                )
            )
        );
    return ((u = u.filter((e) => e !== null)), { title: c(`title`).first().text(), link: s, item: u });
}
export { a as route };
