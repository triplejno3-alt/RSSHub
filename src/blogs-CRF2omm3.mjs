import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { n as r } from './puppeteer-BbZGb8cd.mjs';
import { t as i } from './utils-BYK5ZCkV.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/blogs/:name?`,
    categories: [`journal`],
    example: `/science/blogs/pipeline`,
    parameters: { name: `Short name for the blog, get this from the url. Defaults to pipeline` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`science.org/blogs/:name`], target: `/blogs/:name` }],
    name: `Blogs`,
    maintainers: [`TomHodson`],
    handler: s,
    description: "To subscribe to [IN THE PIPELINE by Derek Lowe’s](https://science.org/blogs/pipeline) or the [science editor's blog](https://science.org/blogs/editors-blog), use the name parameter `pipeline` or `editors-blog`.",
};
async function s(o) {
    let { name: s = `pipeline` } = o.req.param(),
        c = `${i}/blogs/${s}/feed`,
        l = a(
            await t.tryGet(
                c,
                async () => {
                    let e = await r(),
                        t = await e.newPage();
                    (await t.setRequestInterception(!0),
                        t.on(`request`, (e) => {
                            e.resourceType() === `document` ? e.continue() : e.abort();
                        }),
                        await t.goto(c, { waitUntil: `domcontentloaded` }));
                    let n = await t.content();
                    return (await t.close(), await e.close(), n);
                },
                e.cache.routeExpire,
                !1
            ),
            { xmlMode: !0 }
        ),
        u = l(`item`)
            .toArray()
            .map(
                (e) => (
                    (e = l(e)),
                    {
                        title: e.find(`title`).text().trim(),
                        link: e.find(`link`).text().trim(),
                        author: e
                            .find(String.raw`dc\:creator`)
                            .text()
                            .trim(),
                        pubDate: n(e.find(`pubDate`).text().trim()),
                        description: e
                            .find(String.raw`content\:encoded`)
                            .text()
                            .trim(),
                    }
                )
            ),
        { blog_name: d = `Unknown Title` } = l(`channel > description`)
            .text()
            .match(/Keyword search result for Blog Series: (?<blog_name>[^-]+) --/).groups;
    return { title: `Science Blogs: ${d}`, description: `A Science.org blog called ${d}`, image: `${i}/apple-touch-icon.png`, link: `${i}/blogs/${s}`, language: `en-US`, item: u };
}
export { o as route };
