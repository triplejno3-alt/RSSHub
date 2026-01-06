import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/posts`,
    categories: [`blog`],
    example: `/thegradient/posts`,
    radar: [{ source: [`thegradient.pub/`] }],
    url: `thegradient.pub/`,
    name: `Posts`,
    maintainers: [`liyaozhong`],
    handler: a,
    description: `The Gradient Blog Posts`,
};
async function a() {
    let i = `https://thegradient.pub`,
        a = r((await n(i)).data),
        o = a(`.c-post-card-wrap`)
            .toArray()
            .map((e) => {
                let n = a(e),
                    r = n.find(`.c-post-card__title-link`).first(),
                    o = n.find(`.c-post-card__meta`),
                    s = r.attr(`href`),
                    c = r.text().trim(),
                    l = o.find(`time`).attr(`datetime`);
                return !s || !c || !l ? null : { title: c, link: new URL(s, i).href, pubDate: t(l) };
            })
            .filter((e) => e !== null);
    return (
        (o = (
            await Promise.all(
                o.map((t) =>
                    e.tryGet(t.link, async () => {
                        try {
                            return ((t.description = r((await n(t.link)).data)(`.c-content`).html() || ``), t);
                        } catch {
                            return t;
                        }
                    })
                )
            )
        ).filter((e) => e !== null)),
        { title: `The Gradient Blog`, link: i, item: o }
    );
}
export { i as route };
