import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    name: `Blogs`,
    maintainers: [`CookiePieWw`],
    categories: [`programming`],
    path: `/blog/:category?`,
    example: `/cockroachlabs/blog/engineering`,
    parameters: { category: `Blog category, e.g., engineering. Subscribe all recent articles if empty.` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cockroachlabs.com/blog/:category`, `cockroachlabs.com/blog`], target: `/blog` }],
    handler: a,
};
async function a(i) {
    let a = i.req.param(`category`),
        o = `https://www.cockroachlabs.com`,
        s = `${o}/blog${a ? `/${a}/` : `/`}`,
        c = r(await e(s)),
        l = c(`[class="mb-3 truncate text-display-md font-semibold tracking-tight md:max-w-full md:text-white"]`),
        u = c(`a > p[class="mb-2 line-clamp-2 text-lg font-semibold leading-5"]`),
        d = l.add(u).map((e, t) => ({ title: c(t).text(), link: `${o}${c(t).parent(`a`).attr(`href`)}` })),
        f = await Promise.all(
            d.toArray().map((i) =>
                t.tryGet(i.link, async () => {
                    let t = r(await e(i.link)),
                        a = t(`article.blog-content`).html() || ``,
                        o = t(String.raw`div.mt-4.flex.flex-col.items-center.justify-center.gap-1.sm\:flex-row.sm\:gap-4`)
                            .find(`p`)
                            .first()
                            .text()
                            .match(/Last edited on (.+)/)?.[1],
                        s;
                    if (o)
                        try {
                            let e = new Date(o);
                            Number.isNaN(e.getTime()) || (s = n(e.toISOString().split(`T`)[0]));
                        } catch {}
                    return { title: i.title, link: i.link, description: a, pubDate: s };
                })
            )
        );
    return { title: `Cockroach Labs Blog${a ? ` - ${a}` : ``}`, link: s, item: f, description: `Cockroach Labs Blog` };
}
export { i as route };
