import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
import i from 'p-map';
const a = {
    path: `/research`,
    categories: [`programming`],
    example: `/anthropic/research`,
    parameters: {},
    radar: [{ source: [`www.anthropic.com/research`, `www.anthropic.com`] }],
    name: `Research`,
    maintainers: [`ttttmr`],
    handler: o,
    url: `www.anthropic.com/research`,
};
async function o() {
    let a = `https://www.anthropic.com/research`,
        o = r(await e(a)),
        s = /self\.__next_f\.push\((.+)\)/,
        c = [];
    for (let e of o(`script`).toArray()) {
        let t = o(e).text(),
            n = s.exec(t);
        if (n) {
            let e;
            try {
                ((e = JSON.parse(n[1])), Array.isArray(e) && e.length === 2 && e[0] === 1 && c.push(e[1]));
            } catch {}
        }
    }
    let l = /^([0-9a-zA-Z]+):([0-9a-zA-Z]+)?(\[.*)$/;
    return {
        title: `Anthropic Research`,
        link: a,
        description: `Latest research from Anthropic`,
        item: await i(
            c
                .join(``)
                .split(
                    `
`
                )
                .map((e) => {
                    let t = l.exec(e);
                    return t ? { id: t[1], tag: t[2], data: JSON.parse(t[3]) } : { id: ``, tag: ``, data: e };
                })
                .flatMap((e) => (Array.isArray(e.data) ? e.data : []))
                .flatMap((e) => e?.page?.sections ?? [])
                .flatMap((e) => e?.tabPages ?? [])
                .filter((e) => e?.label === `Overview`)
                .flatMap((e) => e.sections)
                .filter((e) => e?.title === `Publications`)
                .flatMap((e) => e?.posts ?? [])
                .map((e) => ({ title: e.title, link: `https://www.anthropic.com/research/${e.slug.current}`, pubDate: n(e.publishedOn) })),
            (n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link)),
                        i = t(`div[class*="PostDetail_post-detail__"]`);
                    return (
                        i.find(`img`).each((e, n) => {
                            let r = t(n);
                            r.removeAttr(`style srcset`);
                            let i = r.attr(`src`),
                                a = new URLSearchParams(i).get(`/_next/image?url`);
                            a && r.attr(`src`, a);
                        }),
                        (n.description = i.html()),
                        n
                    );
                }),
            { concurrency: 5 }
        ),
    };
}
export { a as route };
