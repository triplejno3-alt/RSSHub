import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { t as a } from './valid-host-Bsy2BS2p.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/news/:city`,
    categories: [`new-media`],
    example: `/bendibao/news/bj`,
    parameters: { city: `城市缩写，可在该城市页面的 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bendibao.com/`] }],
    name: `焦点资讯`,
    maintainers: [`nczitzk`],
    handler: c,
    url: `bendibao.com/`,
    description: `| 城市名 | 缩写 |
| ------ | ---- |
| 北京   | bj   |
| 上海   | sh   |
| 广州   | gz   |
| 深圳   | sz   |

  更多城市请参见 [这里](http://www.bendibao.com/city.htm)

  > **香港特别行政区** 和 **澳门特别行政区** 的本地宝城市页面不更新资讯。`,
};
async function c(s) {
    let c = s.req.param(`city`);
    if (!a(c)) throw new i(`Invalid city`);
    let l = `http://${c}.bendibao.com`,
        u = await n({ method: `get`, url: l }),
        d = o(u.data),
        f =
            d(`title`)
                .text()
                .replace(/-爱上本地宝，生活会更好/, ``) + `焦点资讯`,
        p = d(`ul.focus-news li`)
            .toArray()
            .map((e) => {
                e = d(e).find(`a`);
                let t = e.attr(`href`);
                return { title: e.text(), link: t.indexOf(`http`) === 0 ? t : `${l}${t}` };
            });
    return (
        p.length ||
            ((u = await n({ method: `get`, url: `http://${c}.bendibao.com/news` })),
            (d = o(u.data)),
            (p = d(`#listNewsTimeLy div.info`)
                .toArray()
                .map((e) => {
                    e = d(e).find(`a`);
                    let t = e.attr(`href`);
                    return { title: e.text(), link: t.indexOf(`http`) === 0 ? t : `${l}${t}` };
                }))),
        (p = await Promise.all(
            p.map((i) =>
                e.tryGet(i.link, async () => {
                    try {
                        let e = o((await n({ method: `get`, url: i.link })).data);
                        return (
                            (i.description = e(`div.content`).html() ?? e(`div.content-box`).html()),
                            (i.pubDate = r(
                                t(
                                    e(`span.time`)
                                        .text()
                                        .replace(/发布时间：/, ``) ?? e(`span.public_time`).text()
                                ),
                                8
                            )),
                            i
                        );
                    } catch {
                        return ``;
                    }
                })
            )
        )),
        { title: f, link: l, item: p }
    );
}
export { s as route };
