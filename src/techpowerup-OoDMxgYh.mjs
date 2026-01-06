import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { i as r, n as i, r as a, t as o } from './utils-Bk7r7RGU.mjs';
import { load as s } from 'cheerio';
const c = { path: `/`, radar: [{ source: [`techpowerup.com/`] }], name: `Latest Content`, maintainers: [`TonyRL`], example: `/techpowerup`, handler: l, url: `www.techpowerup.com/` };
async function l() {
    let c = s(await e(o, { headers: a })),
        l = c(`.newspost`)
            .toArray()
            .map((e) => {
                let t = c(e),
                    r = t.find(`h1 a`),
                    i = t.find(`time`).attr(`datetime`);
                return {
                    title: r.text(),
                    link: o + r.attr(`href`),
                    pubDate: i ? n(i) : null,
                    author: t.find(`.byline address`).text(),
                    category: t
                        .find(`.byline .flags span`)
                        .toArray()
                        .map((e) => c(e).text().trim()),
                };
            });
    return {
        title: `TechPowerUp`,
        link: o,
        language: `en`,
        image: `https://tpucdn.com/apple-touch-icon-v1684568903519.png`,
        item: await Promise.all(
            l.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = s(await e(n.link, { headers: a }));
                    return (
                        i(t),
                        n.link.includes(`/review/`)
                            ? (await r(t, n), n)
                            : ((n.description = t(`.newspost .text`).html()),
                              (n.category = [
                                  ...new Set([
                                      ...n.category,
                                      ...t(`.tags li a`)
                                          .toArray()
                                          .map((e) => t(e).text()),
                                  ]),
                              ]),
                              n)
                    );
                })
            )
        ),
    };
}
export { c as route };
