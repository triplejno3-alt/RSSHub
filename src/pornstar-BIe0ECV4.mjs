import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { t as r } from './valid-host-Bsy2BS2p.mjs';
import { i, n as a, r as o } from './utils-cMJuIYwm.mjs';
import { load as s } from 'cheerio';
const c = {
    path: `/pornstar/:username/:language?/:sort?`,
    categories: [`multimedia`],
    view: t.Videos,
    example: `/pornhub/pornstar/june-liu/www/mr`,
    parameters: {
        username: { description: 'username, part of the url e.g. `pornhub.com/pornstar/june-liu`' },
        language: {
            description: `language`,
            options: [
                { value: `www`, label: `English` },
                { value: `de`, label: `Deutsch` },
                { value: `es`, label: `Español` },
                { value: `fr`, label: `Français` },
                { value: `it`, label: `Italiano` },
                { value: `ja`, label: `日本語` },
                { value: `pt`, label: `Português` },
                { value: `pl`, label: `Polski` },
                { value: `rt`, label: `Русский` },
                { value: `nl`, label: `Dutch` },
                { value: `cs`, label: `Czech` },
                { value: `cn`, label: `中文（简体）` },
            ],
            default: `www`,
        },
        sort: {
            description: 'sorting method, leave empty for `Best`',
            options: [
                { label: `Most Recent`, value: `mr` },
                { label: `Most Viewed`, value: `mv` },
                { label: `Top Rated`, value: `tr` },
                { label: `Longest`, value: `lg` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: a(`/pornstar/:username`),
    name: `Pornstar`,
    maintainers: [`I2IMk`, `queensferryme`],
    handler: l,
};
async function l(t) {
    let { language: a = `www`, username: c, sort: l = `mr` } = t.req.param(),
        u = `https://${a}.pornhub.com/pornstar/${c}?o=${l}`;
    if (!r(a)) throw new n(`Invalid language`);
    let { data: d } = await e(u, { headers: o }),
        f = s(d),
        p;
    if (f(`.withBio`).length === 0) {
        u = `https://${a}.pornhub.com/pornstar/${c}/videos?o=${l}`;
        let { data: t } = await e(u, { headers: o });
        ((f = s(t)),
            (p = f(`#mostRecentVideosSection .videoBox`)
                .toArray()
                .map((e) => i(f(e)))));
    } else
        p = f(`#pornstarsVideoSection .videoBox`)
            .toArray()
            .map((e) => i(f(e)));
    return { title: f(`h1`).first().text(), description: f(`section.aboutMeSection`).text().trim(), link: u, image: f(`#getAvatar`).attr(`src`), language: f(`html`).attr(`lang`), item: p };
}
export { c as route };
