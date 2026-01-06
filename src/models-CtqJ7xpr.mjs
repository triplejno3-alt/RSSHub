import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { FetchError as r } from 'ofetch';
import { load as i } from 'cheerio';
import a from 'markdown-it';
const o = a({ html: !0 }),
    s = {
        path: `/models/:group`,
        categories: [`programming`],
        example: `/huggingface/models/deepseek-ai`,
        parameters: { group: `The organization or user group name` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`huggingface.co/:group/models`], target: `/models/:group` }],
        name: `Group Models`,
        maintainers: [`WuNein`],
        handler: c,
        url: `huggingface.co`,
    };
async function c(a) {
    let { group: s, cycle: c = `date` } = a.req.param();
    if (![`date`, `week`, `month`].includes(c)) throw Error(`Invalid cycle: ${c}`);
    let l = `https://huggingface.co/${s}/models?sort=created`,
        { body: u } = await n(l),
        d = i(u),
        f = d(`article`)
            .toArray()
            .map((e) => {
                let n = d(e),
                    r = n.find(`a > div > header > h4`).text().trim(),
                    i = `https://huggingface.co/${r}`,
                    a = n.find(`a > div > div > span.truncate > time`).attr(`datetime`);
                return { title: r, link: i, description: n.text().replaceAll(/\s+/g, ` `).trim(), pubDate: a ? t(a) : void 0 };
            })
            .filter((e) => e.title);
    return (
        (f = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    try {
                        let { body: e } = await n(t.link + `/raw/main/README.md`);
                        t.description += o.render(e);
                        let r = i(t.description);
                        return (
                            r(`img`).each((e, n) => {
                                let i = r(n),
                                    a = i.attr(`src`);
                                if (a)
                                    if (/^https?:\/\//i.test(a)) i.attr(`src`, a);
                                    else if (a.startsWith(`/`)) i.attr(`src`, `${t.link}/resolve/main/` + a);
                                    else {
                                        let e = t.link + `/resolve/main/`;
                                        i.attr(`src`, e + a.replace(/^\.\//, ``));
                                    }
                            }),
                            (t.description = r.html()),
                            t
                        );
                    } catch (e) {
                        if (e instanceof r && (e.statusCode === 403 || e.statusCode === 401))
                            try {
                                let { body: e } = await n(t.link + `/blob/main/README.md?code=true`),
                                    r = i(e)(`body`).find(`div > main > div > section > div > div > div > div > div > table > tbody`).text().trim();
                                return ((t.description += o.render(r)), t);
                            } catch {
                                return t;
                            }
                        else return t;
                    }
                })
            )
        )),
        { title: `Huggingface ${s} Models`, link: l, item: f }
    );
}
export { s as route };
