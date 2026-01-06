import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = {
    name: `PAIR - AI Exploreables`,
    url: `pair.withgoogle.com/explorables`,
    path: `/explorables`,
    maintainers: [`cesaryuan`],
    example: `/withgoogle/explorables`,
    categories: [`blog`],
    radar: [{ source: [`pair.withgoogle.com/explorables`], target: `` }],
    handler: async () => {
        let r = `https://pair.withgoogle.com`,
            i = n(await e(r + `/explorables`, { method: `GET` }));
        return {
            title: `PAIR - AI Exploreables`,
            link: `https://pair.withgoogle.com/explorables`,
            item: await Promise.all(
                i(`div.explorable-card`)
                    .toArray()
                    .map(async (a) => {
                        let o = i(a).find(`h3`).text(),
                            s = i(a).find(`img`).attr(`src`),
                            c = r + i(a).find(`a`).attr(`href`);
                        return await t.tryGet(c, async () => {
                            let t = n(await e(c))(`body`).html();
                            return ((!t || t.trim() === ``) && (t = i(`p`).text()), { title: o, link: c, description: t, image: s });
                        });
                    })
            ),
        };
    },
};
export { r as route };
