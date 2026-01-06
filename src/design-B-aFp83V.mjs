import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './md5-DQN6cWFb.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = { categories: [`design`], example: `/apple/design`, handler: a, maintainers: [`jean-jacket`], name: `Design updates`, path: `/design`, url: `developer.apple.com/design/whats-new/` };
async function a() {
    let i = `https://developer.apple.com/design/whats-new/`,
        a = r(await e(i));
    return {
        item: a(`table`)
            .toArray()
            .flatMap((e) => {
                let r = a(e),
                    i = r.find(`.date`).first().text();
                return r
                    .find(`.topic-item`)
                    .toArray()
                    .map((e) => {
                        let r = a(e),
                            o = r.find(`span.topic-title a`),
                            s = o.text(),
                            c = `https://developer.apple.com${o.attr(`href`)}`,
                            l = r.find(`span.description`).text();
                        return { description: l, guid: t(`${s}${l}${i}`), link: c, pubDate: n(i), title: s };
                    });
            }),
        link: i,
        title: `Apple design updates`,
    };
}
export { i as route };
