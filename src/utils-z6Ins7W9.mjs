import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import * as r from 'cheerio';
const i = (e) =>
        e.map((e) => ({ title: e.title, description: e.summary, pubDate: t(e.date_published), link: `https://www.guokr.com/article/${e.id}/`, author: e.author.nickname, category: e.subject?.name, id: e.id, channels: e.channels })),
    a = (t) =>
        e.tryGet(t.link, async () => {
            let { data: e } = await n(`https://apis.guokr.com/minisite/article/${t.id}.json`),
                i = r.load(e.result.content);
            return (
                i(`#meta_content`).remove(),
                i(`div`).each((e, t) => {
                    let n = i(t);
                    n.attr(`style`, n.attr(`style`)?.replaceAll(/(?:display:\s*none|visibility:\s*hidden|opacity:\s*0);?/g, ``));
                }),
                i(`img`).each((e, t) => {
                    let n = i(t);
                    n.attr(`data-src`) && n.attr(`src`, n.attr(`data-src`));
                }),
                (t.description = i.html()),
                t
            );
        });
export { i as n, a as t };
