import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './desc-BSROBqhL.mjs';
import { load as n } from 'cheerio';
const r = async (r) => {
    let i = n((await e(r.link)).data);
    return (
        (r.description = t({
            author: i(`h3.author > span`)
                .toArray()
                .map((e) => i(e).text())
                .join(` `),
            company: i(`a.author`)
                .toArray()
                .map((e) => i(e).text())
                .join(` `),
            content: i(`div.row > span.abstract-text`).parent().text(),
        })),
        r
    );
};
export { r as t };
