import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = async (i) => {
        let { filter: o } = i.req.param(),
            s = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            c = `https://diariofruticola.cl`,
            l = new URL(`filtro/${o}`, c).href,
            u = a(await e(l)),
            d = u(`html`).attr(`lang`) ?? `es`,
            f = [];
        return (
            (f = u(`div#printableArea a.text-dark`)
                .slice(0, s)
                .toArray()
                .map((e) => {
                    let t = u(e),
                        n = t.text(),
                        r = t.attr(`href`);
                    return { title: n, link: r ? new URL(r, c).href : void 0, language: d };
                })),
            (f = (
                await Promise.all(
                    f.map((i) =>
                        i.link
                            ? t.tryGet(i.link, async () => {
                                  let t = await e(i.link),
                                      o = a(t),
                                      s = o(`h1.my-2`).text(),
                                      c = o(`div.ck-content`).html() ?? ``,
                                      l = t.match(/"datePublished":\s"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})"/)?.[1] ?? void 0,
                                      u = t.match(/"dateModified":\s"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})"/)?.[1] ?? void 0,
                                      f = { title: s, description: c, pubDate: l ? r(n(l), -3) : i.pubDate, content: { html: c, text: c }, updated: u ? r(n(u), -3) : i.updated, language: d };
                                  return { ...i, ...f };
                              })
                            : i
                    )
                )
            ).filter((e) => !0)),
            {
                title: u(`title`).text(),
                description: u(`meta[property="og:description"]`).attr(`content`),
                link: l,
                item: f,
                allowEmpty: !0,
                image: u(`img#logo`).attr(`src`),
                author: u(`meta[name="keywords"]`).attr(`content`),
                language: d,
                id: u(`meta[property="og:url"]`).attr(`content`),
            }
        );
    },
    s = {
        path: `/filtro/:filter{.+}`,
        name: `Filtro`,
        url: `diariofruticola.cl`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/diariofruticola/filtro/cerezas/71`,
        parameters: { filter: { description: `Filter` } },
        description:
            '::: tip\nIf you subscribe to [Cerezas](https://www.diariofruticola.cl/filtro/cerezas/71/)，where the URL is `https://www.diariofruticola.cl/filtro/cerezas/71/`, extract the part `https://diariofruticola.cl/filtro` to the end, which is `/`, and use it as the parameter to fill in. Therefore, the route will be [`/diariofruticola/filtro/cerezas/71`](https://rsshub.app/diariofruticola/filtro/cerezas/71).\n:::\n',
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`diariofruticola.cl/filtro/:filter`],
                target: (e) => {
                    let t = e.filter;
                    return `/diariofruticola/filtro${t ? `/${t}` : ``}`;
                },
            },
        ],
        view: i.Articles,
    };
export { o as handler, s as route };
