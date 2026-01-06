import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { i as r, r as i, t as a } from './content-DXmMltMC.mjs';
const o = { path: `/forum/:id?/:digest?`, radar: [{ source: [`lkong.com/forum/:id`, `lkong.com/`] }], name: `Unknown`, maintainers: [`nczitzk`, `ma6254`], handler: s };
async function s(o) {
    let s = o.req.param(`id`) ?? `8`,
        c = o.req.param(`digest`),
        l = `https://www.lkong.com`,
        u = `https://api.lkong.com/api`,
        d = `${l}/forum/${s}`,
        f = await n({ method: `post`, url: u, json: i(s) }),
        p = f.data.data[c ? `hots` : `threads`].map((e) => ({ guid: e.tid, title: e.title, link: `${l}/thread/${e.tid}` }));
    return (
        (p = await Promise.all(
            p.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = await n({ method: `post`, url: u, json: r(i.guid, 1) });
                    return ((i.author = e.data.data.thread?.author.name), (i.pubDate = t(e.data.data.thread?.dateline)), (i.description = a(JSON.parse(e.data.data.posts[0].content))), delete i.guid, i);
                })
            )
        )),
        { title: `${f.data.data.forum.name} - 龙空`, link: d, item: p, description: f.data.data.forumCount.info }
    );
}
export { o as route };
