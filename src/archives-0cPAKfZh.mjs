import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/archives`,
    categories: [`blog`],
    example: `/aiblog-2xv/archives`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`aiblog-2xv.pages.dev/archives`], target: `/archives` }],
    name: `归档-全部文章`,
    maintainers: [`Liao-Ke`],
    handler: a,
};
async function a() {
    let i = `https://aiblog-2xv.pages.dev`,
        a = r(await e(`${i}/archives`)),
        o = a(`#top > main > div > div.archive-month`)
            .toArray()
            .flatMap((e) =>
                a(e)
                    .find(`.archive-posts .archive-entry`)
                    .toArray()
                    .map((e) => {
                        let t = a(e),
                            r = t.find(`a`).first(),
                            i = t.find(`h3`).first(),
                            o = t.find(`.archive-meta span`);
                        return { title: i.text().trim(), link: r.attr(`href`) || ``, pubDate: n(o.eq(0).attr(`title`) || ``), author: t.find(`.archive-meta span`).last().text().trim() || ``, description: `` };
                    })
            ),
        s = await Promise.all(
            o.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link))(`main`).first();
                    return (
                        (n.description = `<article>
                    <header>
                        <div class="post-description">
                        ${t.find(`header .post-description`).first().html()}
                        </div>
                    </header>

                    <figure class="entry-cover">
                        ${t.find(`figure`).first().html()}
                    </figure>
                    
                    <div class="post-content">
                        ${t.find(`.post-content`).first().html()}
                    </div>
                    </article>`),
                        n
                    );
                })
            )
        );
    return { title: `归档-全部文章 | AI Blog`, link: `${i}/archives`, item: s.filter((e) => e.title && e.link) };
}
export { i as route };
