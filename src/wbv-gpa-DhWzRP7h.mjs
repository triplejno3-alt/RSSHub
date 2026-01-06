import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = `https://www.wbv-gpa.at`,
    r = `${n}/angebote/`,
    i = {
        name: `Angebote`,
        example: `/wbv-gpa/wohnungen/wien`,
        path: `/:category?/:state?`,
        maintainers: [`sk22`],
        categories: [`other`],
        description: `
Search housing by WBV-GPA, see "Angebote" menu item in https://www.wbv-gpa.at.
Filtering by state is done client-side.
`,
        parameters: { category: 'Anything behind `/angebote/` in the URL. Default: `wohnungen`', state: 'Optionally filter by Austrian state (`wien`, `steiermark`, ...)' },
        radar: [{ source: [`${n}/wohnungen/`, `${r}/:category`], target: `/:category` }],
        async handler(n) {
            let i = n.req.param(`category`) || `wohnungen`,
                a = n.req.param(`state`),
                o = r + i,
                s = t(await e(o));
            return {
                title: s(`title`).text(),
                language: `de`,
                logo: `https://www.wbv-gpa.at/app/uploads/2024/01/cropped-WBV-Favicon-192x192.png`,
                allowEmpty: !0,
                item: s(`.objects__list__rows__item.mix`)
                    .toArray()
                    .map((e) => {
                        let t = s(e),
                            n = t.find(`a`).attr(`href`),
                            r = t
                                .find(`.objects__list__rows__item__info__cell:not(.desktop_only):not(.objects__list__rows__item__info__cell--link)`)
                                .toArray()
                                .map((e) => s(e).text().trim())
                                .join(`, `),
                            i = t
                                .find(`.objects__list__rows__item__info__cell.desktop_only:not(.objects__list__rows__item__info__cell--link)`)
                                .toArray()
                                .map((e) => s(e).text().trim())
                                .join(`, `);
                        return a && !t.hasClass(a) ? !1 : { title: r, description: i, link: n };
                    })
                    .filter((e) => e !== !1),
                link: o,
            };
        },
    };
export { i as route };
