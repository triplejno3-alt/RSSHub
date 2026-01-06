import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './utils-Dwm7a_-s.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/actress/:id`,
    name: `Actress`,
    maintainers: [`huanfe1`],
    example: `/javtiful/actress/akari-tsumugi`,
    parameters: { id: `Actress name` },
    handler: i,
    categories: [`multimedia`],
    radar: [{ source: [`javtiful.com/actress/:id`, `javtiful.com/actress/:id/*`], target: `/actress/:id` }],
    features: { nsfw: !0 },
};
async function i(r) {
    let { id: i } = r.req.param(),
        a = n(await e(`https://javtiful.com/actress/${i}`)),
        o = a(`section .card:not(:has(.bg-danger))`)
            .toArray()
            .map((e) => t(a(e)));
    return { title: a(`.channel-item__name_details a`).text(), link: `https://javtiful.com/actress/${i}`, allowEmpty: !0, item: o, image: a(`.content-section-title img`).attr(`src`), language: a(`html`).attr(`lang`) };
}
export { r as route };
