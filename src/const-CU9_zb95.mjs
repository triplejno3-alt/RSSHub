import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
async function n(n) {
    let r = t((await e(n)).body);
    return {
        title: r(`h2.entry-title`).text().trim(),
        description: r(`.wp-block-image`)
            .toArray()
            .map((e) => r.html(e))
            .join(``),
        link: n,
    };
}
var r = n;
const i = `EVERIA.CLUB`,
    a = `https://everia.club/`;
export { a as n, r, i as t };
