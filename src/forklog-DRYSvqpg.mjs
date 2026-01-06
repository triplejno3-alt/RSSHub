import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = { path: `/news`, categories: [`finance`], example: `/forklog/news`, radar: [{ source: [`forklog.com/news`], target: `/news` }], name: `Новости`, maintainers: [`raven428`], handler: i, url: `forklog.com/news` };
async function i() {
    let r = await t(`https://forklog.com/wp-content/themes/forklogv2/ajax/getPosts.php`, { method: `POST`, headers: { 'x-requested-with': `XMLHttpRequest` }, form: { action: `getPostsByCategory`, postperpage: `333` } });
    return {
        title: `Forklog – Новости`,
        link: `https://forklog.com/news`,
        description: `Последние новости из мира блокчейна и криптовалют`,
        item: JSON.parse(r.body).map((t) => {
            let r = t.link,
                i = (t.title || t.text?.post_title)?.trim(),
                a = t.text?.post_content.trim(),
                o = t.author_name.trim(),
                s;
            t.text?.post_date_gmt ? (s = n(e(t.text.post_date_gmt), 1)) : t.text?.post_date ? (s = n(e(t.text.post_date), 4)) : t.date && (s = n(e(t.date, `DD.MM.YYYY HH:mm`), 4));
            let c = t.image || t.image_mobile,
                l = t.views;
            return { link: r, title: i, author: o, pubDate: s, description: a, category: [`news`, `crypto`, `finance`], ...(c ? { media: { thumbnail: { url: c, width: 250, height: 250 } } } : {}), extra: { views: l } };
        }),
    };
}
export { r as route };
