import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/transcripts`,
    name: `Transcripts`,
    url: `reactiflux.com/transcripts`,
    maintainers: [`nczitzk`],
    handler: a,
    example: `/reactiflux/transcripts`,
    categories: [`programming`],
    radar: [{ source: [`www.reactiflux.com/transcripts`], target: `/transcripts` }],
};
async function a(i) {
    let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 30,
        o = `https://www.reactiflux.com`,
        s = new URL(`transcripts`, o).href,
        { data: c } = await n(s),
        l = r(c),
        u = `Reactiflux`,
        d = l(`meta[property="og:image"]`).prop(`content`),
        f =
            JSON.parse(c.match(/__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)?.[1] ?? `{}`)
                ?.props.pageProps.all.slice(0, a)
                .map((e) => {
                    let t = e.title,
                        n = `reactiflux-${e.path.replace(/\/transcripts\//, ``)}`;
                    return { title: t, link: new URL(e.path, o).href, author: u, guid: n, id: n, image: d, banner: d, language: `en` };
                }) ?? [];
    return (
        (f = await Promise.all(
            f.map((r) =>
                e.tryGet(r.link, async () => {
                    let { data: e } = await n(r.link),
                        i = JSON.parse(e.match(/__NEXT_DATA__" type="application\/json">(.*)<\/script>/)?.[1] ?? `{}`);
                    if (!i.props) return r;
                    let a = i.props.pageProps,
                        s = a.title,
                        c = a.html,
                        l = `reactiflux-${i.query.slug}`;
                    return (
                        (r.title = s),
                        (r.description = c),
                        (r.pubDate = t(a.date)),
                        (r.link = new URL(`transcripts/${i.query.slug}`, o).href),
                        (r.author = u),
                        (r.guid = l),
                        (r.id = l),
                        (r.content = { html: c, text: a.description }),
                        (r.image = d),
                        (r.banner = d),
                        (r.language = `en`),
                        r
                    );
                })
            )
        )),
        { title: `${u} - ${l(`title`).text()}`, description: l(`meta[property="og:description"]`).prop(`content`), link: s, item: f, allowEmpty: !0, image: d, author: u, language: `en` }
    );
}
export { a as handler, i as route };
