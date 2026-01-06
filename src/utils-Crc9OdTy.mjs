import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = `https://oss.aisixiang.com`,
    a = `https://www.aisixiang.com`,
    o = (i, a, o) =>
        Promise.all(
            o.slice(0, i).map((i) =>
                a(i.link, async () => {
                    let { data: a } = await t(i.link),
                        o = r(a),
                        s = o(`h3.comment-header`)
                            .text()
                            .match(/评论（\d+）/);
                    return (
                        (i.title = o(`h3`).first().text().split(`：`).pop()),
                        (i.description = o(`div.article-content`).html()),
                        (i.author = o(`div.about strong`).first().text()),
                        (i.category = o(`u`)
                            .first()
                            .parent()
                            .find(`u`)
                            .toArray()
                            .map((e) => o(e).text())),
                        (i.pubDate = n(e(o(`div.info`).text().split(`时间：`).pop()), 8)),
                        (i.upvotes = o(`span.like-num`).text() ? Number.parseInt(o(`span.like-num`).text(), 10) : 0),
                        (i.comments = s ? Number.parseInt(s[1], 10) : 0),
                        i
                    );
                })
            )
        );
export { i as n, a as r, o as t };
