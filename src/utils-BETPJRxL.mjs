import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = `https://www.woshipm.com`,
    r = (n, r) =>
        r(n.link, async () => {
            let { data: r } = await e(n.link),
                i = t(r);
            return (i(`.support-author`).remove(), (n.description = i(`.article--content`).html()), n);
        });
export { r as n, n as t };
