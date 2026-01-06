import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
const n = async (n, r) => {
        let i = `https://www.landiannews.com/wp-json/wp/v2/${r}?slug=${n}`;
        return await t.tryGet(i, async () => {
            let t = await e(i);
            if (!t[0] || !t[0].id || !t[0].name) throw Error(`${r} ${n} not found`);
            return { id: t[0].id, name: t[0].name };
        });
    },
    r = async (e) => await n(e, `categories`),
    i = async (e) => await n(e, `tags`);
async function a(t) {
    return (await e(t)).map((e) => ({
        title: e.title.rendered,
        description: e.content.rendered,
        link: e.link,
        pubDate: new Date(e.date).toUTCString(),
        author: e._embedded.author[0].name,
        category: e._embedded[`wp:term`].flat().map((e) => e.name),
    }));
}
export { a as n, i as r, r as t };
