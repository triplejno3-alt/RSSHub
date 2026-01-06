import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = `https://bestofjs.org/rankings/monthly`,
    l = {
        path: `/rankings/monthly`,
        categories: [`programming`],
        example: `/bestofjs/rankings/monthly`,
        view: n.Notifications,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`bestofjs.org/rankings/monthly/:year/:month`], target: `/rankings/monthly` }],
        name: `Monthly Rankings`,
        maintainers: [`ztkuaikuai`],
        url: `bestofjs.org/rankings/monthly`,
        handler: async () => {
            let e = u();
            return {
                title: `Best of JS Monthly Rankings`,
                link: c,
                description: `Monthly rankings of the most popular JavaScript projects on Best of JS`,
                item: (
                    await Promise.all(
                        e.map((e) => {
                            let [t, n] = e.split(`-`);
                            return d(t, n);
                        })
                    )
                ).flatMap((t, n) => {
                    let [o, l] = e[n].split(`-`),
                        u = s(
                            i(`ul`, {
                                children: t.map((e, t) =>
                                    a(r, {
                                        children: [
                                            a(`li`, {
                                                children: [
                                                    i(`p`, { children: i(`strong`, { children: `Rank ${t + 1}` }) }),
                                                    e.logo ? i(`img`, { src: `https://bestofjs.org${e.logo}`, alt: e.projectName, height: `32`, width: `32` }) : null,
                                                    e.projectName ? a(`p`, { children: [i(`strong`, { children: `Project:` }), ` `, e.projectName] }) : null,
                                                    e.description ? i(`p`, { children: e.description }) : null,
                                                    e.starCount ? a(`p`, { children: [i(`strong`, { children: `Stars:` }), ` `, e.starCount] }) : null,
                                                    e.additionalInfo ? a(`p`, { children: [i(`strong`, { children: `Additional Info:` }), ` `, e.additionalInfo] }) : null,
                                                    e.githubLink ? a(`p`, { children: [i(`strong`, { children: `GitHub:` }), ` `, i(`a`, { href: e.githubLink, children: e.githubLink })] }) : null,
                                                    e.homepageLink ? a(`p`, { children: [i(`strong`, { children: `Homepage:` }), ` `, i(`a`, { href: e.homepageLink, children: e.homepageLink })] }) : null,
                                                    e.tags?.length
                                                        ? a(`p`, {
                                                              children: [
                                                                  i(`strong`, { children: `Tags:` }),
                                                                  ` `,
                                                                  e.tags.map((t, n) => a(r, { children: [i(`a`, { href: `/projects?tags=${t.toLowerCase()}`, children: t }), n < e.tags.length - 1 ? `, ` : ``] })),
                                                              ],
                                                          })
                                                        : null,
                                                ],
                                            }),
                                            i(`br`, {}),
                                        ],
                                    })
                                ),
                            })
                        );
                    return { title: `Best of JS Monthly Rankings - ${o}/${l}`, description: u, link: `${c}/${o}/${l}`, guid: `${c}/${o}/${l}`, author: `Best of JS` };
                }),
                language: `en`,
            };
        },
    },
    u = () => {
        let e = new Date(),
            t = e.getFullYear(),
            n = e.getMonth() + 1;
        return Array.from({ length: 6 }, (e, r) => {
            let i = n - (r + 1),
                a = t;
            return (i <= 0 && ((i += 12), --a), `${a}-${i}`);
        });
    },
    d = (n, r) => {
        let i = `${c}/${n}/${r}`;
        return t.tryGet(i, async () => {
            let t = o(await e(i));
            return t(`table.w-full tbody tr[data-testid="project-card"]`)
                .toArray()
                .map((e) => {
                    let n = t(e);
                    return {
                        logo:
                            n
                                .find(`td:first img`)
                                .attr(`src`)
                                ?.replace(/.dark./, `.`) || ``,
                        projectName: n.find(`td:nth-child(2) a[href^="/projects/"]`).first().text().trim(),
                        githubLink: n.find(`td:nth-child(2) a[href*="github.com"]`).attr(`href`) || ``,
                        homepageLink: n.find(`td:nth-child(2) a[href*="http"]:not([href*="github.com"])`).attr(`href`) || ``,
                        description: n.find(`td:nth-child(2) .font-serif`).text().trim(),
                        tags: n
                            .find(`td:nth-child(2) [href*="/projects?tags="]`)
                            .toArray()
                            .map((e) => t(e).text().trim()),
                        starCount: n.find(`td:nth-child(4) span:last`).text().trim() || n.find(`td:nth-child(2) .inline-flex span:last-child`).text().trim(),
                        additionalInfo: n
                            .find(`td:nth-child(3) > div`)
                            .toArray()
                            .slice(1)
                            .map((e) => t(e).text().trim())
                            .join(`; `),
                    };
                });
        });
    };
export { l as route };
