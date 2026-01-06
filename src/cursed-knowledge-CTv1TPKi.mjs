import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/cursed-knowledge`,
    categories: [`blog`],
    example: `/immich/cursed-knowledge`,
    radar: [{ source: [`immich.app/cursed-knowledge`, `immich.app`], target: `/cursed-knowledge` }],
    name: `Cursed Knowledge`,
    maintainers: [`TonyRL`],
    handler: i,
};
async function i() {
    let r = `https://immich.app`,
        i = `${r}/cursed-knowledge/`,
        a = n(await e(i)),
        o = a(`div.justify-around ul li`)
            .toArray()
            .map((e) => {
                let n = a(e),
                    r = n.find(`a`).attr(`href`),
                    o = n.find(`section p`).first().text();
                return { title: o, description: n.find(`section p`).last().text(), link: r ?? `${i}#${o}`, pubDate: t(n.find(`div.justify-start`).text()) };
            });
    return { title: a(`head title`).text(), description: a(`p.text-center`).text(), image: `${r}${a(`head link[rel="icon"]`).attr(`href`)}`, link: i, item: o };
}
export { r as route };
