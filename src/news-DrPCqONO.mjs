import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = (e) => s(i(l, { description: e.description, imglink: e.imglink })),
    l = ({ description: e, imglink: t }) => a(r, { children: [e, i(`br`, {}), i(`img`, { src: `https:${t ?? ``}` })] }),
    u = {
        path: `/news`,
        categories: [`game`],
        example: `/warthunder/news`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`warthunder.com/en/news`, `warthunder.com/`] }],
        name: `News`,
        maintainers: [`axojhf`],
        handler: d,
        url: `warthunder.com/en/news`,
        description: 'News data from [https://warthunder.com/en/news/](https://warthunder.com/en/news/)\n  The `pubDate` provided under UTC time zone, so please ignore the specific time!!!',
    };
async function d() {
    let r = o(await e(`https://warthunder.com/en/news/`));
    return {
        title: `War Thunder News`,
        link: `https://warthunder.com/en/news/`,
        item: r(`div.showcase__item.widget`)
            .toArray()
            .map((e) => {
                e = r(e);
                let i = t(e.find(`div.widget__content > ul > li.widget-meta__item.widget-meta__item--right`).text(), `D MMMM YYYY`, `en`);
                i = n(i, 0);
                let a = [];
                return (
                    e.find(`div.widget__pin`).length !== 0 && a.push(`pinned`),
                    e.find(`a.widget__decal`).length !== 0 && a.push(`decal`),
                    e.find(`div.widget__badge`).length !== 0 && a.push(e.find(`div.widget__badge`).text()),
                    {
                        link: `https://warthunder.com${e.find(`a.widget__link`).attr(`href`)}`,
                        title: e.find(`div.widget__content > div.widget__title`).text(),
                        pubDate: i,
                        description: c({ description: e.find(`div.widget__content > div.widget__comment`).text(), imglink: e.find(`div.widget__poster > img.widget__poster-media`).attr(`data-src`) }),
                        category: a,
                    }
                );
            }),
    };
}
export { u as route };
