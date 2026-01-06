import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { r as t } from './common-utils-uYpL50sT.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './description-BRmasTBj.mjs';
import { load as i } from 'cheerio';
const a = { path: `*`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let o = `https://itch.io${t(a)}`,
        s = i((await n({ method: `get`, url: o })).data),
        c = s(`.title.game_link`)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.text(), link: e.attr(`href`) }));
    return (
        (c = await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n({ method: `get`, url: t.link })).data);
                    return (
                        (t.author = e(`title`).text().split(`by `).pop()),
                        (t.description = r({
                            images: e(`.screenshot`)
                                .toArray()
                                .map((t) => e(t).attr(`src`)),
                            description: e(`.formatted_description`).html(),
                        })),
                        t
                    );
                })
            )
        )),
        { title: s(`title`).text(), link: o, item: c }
    );
}
export { a as route };
