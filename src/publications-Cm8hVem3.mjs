import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { n } from './puppeteer-BbZGb8cd.mjs';
import { load as r } from 'cheerio';
const i = { path: `/publications/:id`, radar: [{ source: [`researchgate.net/profile/:username`], target: `/publications/:username` }], name: `Unknown`, maintainers: [], handler: a };
async function a(i) {
    let a = `https://www.researchgate.net/profile/${i.req.param(`id`)}`,
        o = await n(),
        s = await o.newPage();
    (await s.setRequestInterception(!0),
        s.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await s.goto(a));
    let c = await s.evaluate(() => document.documentElement.innerHTML);
    await s.close();
    let l = r(c),
        u = l(`div[itemprop="headline"] a`)
            .toArray()
            .slice(0, i.req.query(`limit`) ? Number(i.req.query(`limit`)) : 15)
            .map((e) => ((e = l(e)), { title: e.text(), link: e.attr(`href`) })),
        d = await Promise.all(
            u.map((n) =>
                e.tryGet(n.link, async () => {
                    let e = await o.newPage();
                    (await e.setRequestInterception(!0),
                        e.on(`request`, (e) => {
                            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                        }),
                        await e.goto(n.link));
                    let i = await e.evaluate(() => document.documentElement.innerHTML);
                    await e.close();
                    let a = r(i);
                    ((n.doi = a(`meta[property="citation_doi"]`).attr(`content`)), (n.pubDate = t(a(`meta[property="citation_publication_date"]`).attr(`content`))));
                    let s = [];
                    return (
                        a(`meta[property="citation_author"]`).each(function () {
                            s.push(a(this).attr(`content`));
                        }),
                        (n.author = s.join(`, `)),
                        (n.description = a(`div[itemprop="description"]`).html()),
                        n
                    );
                })
            )
        );
    return (await o.close(), { title: `${l(`meta[property="profile:username"]`).attr(`content`)}'s Publications - ResearchGate`, link: a, item: d });
}
export { i as route };
