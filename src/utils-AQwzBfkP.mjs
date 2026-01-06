import { n as e, t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = (a, o) =>
    o(a.link, async () => {
        let { data: o } = await n(a.link),
            s = i(o);
        return (
            a.link.startsWith(`https://www.gelonghui.com/live/`)
                ? ((a.title = s(`.type-name`).next().text().trim()), (a.description = s(`.dtb-content`).html()))
                : ((a.title = s(`.article-title`).text().trim()),
                  (a.description = s(`.article-summary`).html() + s(`article.article-with-html`).html()),
                  (a.pubDate ||= s(`time.date`).text().includes(`前`) || s(`time.date`).text().includes(`天`) ? e(s(`time.date`).text()) : r(t(s(`time.date`).text(), `MM-DD HH:mm`), 8))),
            a
        );
    });
export { a as t };
