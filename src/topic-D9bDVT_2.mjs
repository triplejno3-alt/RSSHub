import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.peopo.org`,
    o = {
        path: `/topic/:topicId?`,
        categories: [`new-media`],
        example: `/peopo/topic/159`,
        parameters: { topicId: `分類 ID，見下表，默認為社會關懷` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`peopo.org/topic/:topicId`], target: `/topic/:topicId` }],
        name: `新聞分類`,
        maintainers: [],
        handler: s,
        description: `| 分類     | ID  |
| -------- | --- |
| 社會關懷 | 159 |
| 生態環保 | 113 |
| 文化古蹟 | 143 |
| 社區改造 | 160 |
| 教育學習 | 161 |
| 農業     | 163 |
| 生活休閒 | 162 |
| 媒體觀察 | 164 |
| 運動科技 | 165 |
| 政治經濟 | 166 |
| 北台灣   | 223 |
| 中台灣   | 224 |
| 南台灣   | 225 |
| 東台灣   | 226 |
| 校園中心 | 167 |
| 原住民族 | 227 |
| 天然災害 | 168 |`,
    };
async function s(o) {
    let { topicId: s = `159` } = o.req.param(),
        c = `${a}/topic/${s}`,
        l = i((await n(c)).data),
        u = l(`.view-list-title`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`a`).text(), link: new URL(e.find(`a`).attr(`href`), a).href })),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n(a.link)).data);
                    return (
                        (a.author = e(`#user-info h3`).text()),
                        (a.category = e(`#node-terms .inline li`)
                            .toArray()
                            .map((t) => e(t).find(`a`).text())),
                        (a.pubDate = r(t(e(`.submitted span`).text()), 8)),
                        (a.description = (e(`.field-name-field-video-id .field-items`).text() ? e(`.field-name-field-video-id input`).attr(`value`) : ``) + e(`.post_text_s .field-items`).html()),
                        a
                    );
                })
            )
        );
    return { title: l(`head title`).text(), link: c, language: `zh-TW`, item: d };
}
export { o as route };
