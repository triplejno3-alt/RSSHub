import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = `https://indienova.com`,
    a = (e) =>
        e(`.article-panel`)
            .toArray()
            .map((t) => {
                t = e(t);
                let n = t.find(`h4 a`);
                return { title: n.text(), link: new URL(n.attr(`href`), i).href, upvotes: t.find(`.number-first`).text(), comments: t.find(`.number-last`).text() };
            }),
    o = async (i) => {
        let { data: a } = await t(i.link),
            o = r(a);
        ((i.description = o(`.single-post`).html()), (i.author = o(`.header-info > a`).text()));
        let s = o(`.header-info`)
            .contents()
            .filter((e, t) => t.nodeType === 3)
            .text()
            .trim()
            .match(/(\d{4}-\d{2}-\d{2})/)?.[0];
        return ((i.pubDate = s ? n(e(s, `YYYY-MM-DD`), 8) : null), i);
    };
export { o as n, a as r, i as t };
