import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/changelog/:id`,
    categories: [`program-update`],
    example: `/oo-software/changelog/shutup10`,
    parameters: { id: `Software id, see below, shutup10 by default, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Changelog`,
    maintainers: [`nczitzk`],
    handler: i,
    description: `| Software        | Id          |
| --------------- | ----------- |
| O&O ShutUp10++ | shutup10    |
| O&O AppBuster  | ooappbuster |
| O&O Lanytix    | oolanytix   |
| O&O DeskInfo   | oodeskinfo  |`,
};
async function i(r) {
    let i = `https://www.oo-software.com/en/${r.req.param(`id`) ?? `shutup10`}/changelog`,
        a = n((await t({ method: `get`, url: i })).data),
        o = a(`.content h4`)
            .toArray()
            .map((t) => {
                t = a(t);
                let n = t.text();
                return { title: n, link: `${i}#${n.split(` – `)[0]}`, description: t.next().html(), pubDate: e(n.match(/released (on )?(.*)$/)[2], `MMMM DD, YYYY`) };
            });
    return ((o[0].enclosure_url = a(`.banner-inlay`).find(`a`).attr(`href`)), { title: a(`title`).text(), link: i, item: o });
}
export { r as route };
