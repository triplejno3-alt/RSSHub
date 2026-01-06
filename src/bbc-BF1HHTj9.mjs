import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './rss-parser-CKuAfhVS.mjs';
import { load as r } from 'cheerio';
var i = {
    ProcessFeed: (e) => {
        let t = e(`#main-content article`);
        return (
            t.length === 0 && (t = e(`div.story-body`)),
            t.length === 0 && (t = e(`main[role="main"]`)),
            t.find(`header, section, [data-testid="bbc-logo-wrapper"]`).remove(),
            t.find(`noscript`).each((t, n) => {
                e(n).parent().html(e(n).html());
            }),
            t.find(`img`).each((t, n) => {
                if (!e(n).attr(`src`) && e(n).attr(`srcSet`)) {
                    let t = e(n).attr(`srcSet`).split(`, `).at(-1);
                    e(n).attr(`src`, t.split(` `)[0]);
                }
            }),
            t.find(`[data-component="media-block"] figcaption`).prepend(`<span>View video in browser: </span>`),
            t.html()
        );
    },
};
const a = {
    path: `/:site?/:channel?`,
    name: `News`,
    maintainers: [`HenryQW`, `DIYgod`, `pseudoyu`],
    handler: o,
    example: `/bbc/world-asia`,
    parameters: { site: `语言，简体或繁体中文`, channel: 'channel, default to `top stories`' },
    categories: [`traditional-media`],
    description:
        'Provides a better reading experience (full text articles) over the official ones.\n\n    Support major channels, refer to [BBC RSS feeds](https://www.bbc.co.uk/news/10628494). Eg, `business` for `https://feeds.bbci.co.uk/news/business/rss.xml`.\n\n    -   Channel contains sub-directories, such as `https://feeds.bbci.co.uk/news/world/asia/rss.xml`, replace `/` with `-`, `/bbc/world-asia`.',
};
async function o(a) {
    let o,
        s,
        c,
        { site: l, channel: u } = a.req.param();
    if (l)
        switch (l.toLowerCase()) {
            case `chinese`:
                ((s = `BBC News 中文网`), (o = await (u ? n.parseURL(`https://www.bbc.co.uk/zhongwen/simp/${u}/index.xml`) : n.parseURL(`https://www.bbc.co.uk/zhongwen/simp/index.xml`))));
                break;
            case `traditionalchinese`:
                ((s = `BBC News 中文網`), (o = await (u ? n.parseURL(`https://www.bbc.co.uk/zhongwen/trad/${u}/index.xml`) : n.parseURL(`https://www.bbc.co.uk/zhongwen/trad/index.xml`))), (c = `https://www.bbc.com/zhongwen/trad`));
                break;
            default:
                ((o = await n.parseURL(`https://feeds.bbci.co.uk/news/${l.split(`-`).join(`/`)}/rss.xml`)), (s = `BBC News ${l}`), (c = `https://www.bbc.co.uk/news/${l.split(`-`).join(`/`)}`));
                break;
        }
    else ((o = await n.parseURL(`https://feeds.bbci.co.uk/news/rss.xml`)), (s = `BBC News Top Stories`), (c = `https://www.bbc.co.uk/news`));
    let d = await Promise.all(
        o.items
            .filter((e) => e && e.link)
            .map((n) =>
                t.tryGet(n.link, async () => {
                    try {
                        let t = new URL(n.link);
                        t.hostname === `www.bbc.com` && (t.hostname = `www.bbc.co.uk`);
                        let a = r(await e(t.href, { retryStatusCodes: [403] })),
                            o = t.pathname,
                            s;
                        switch (!0) {
                            case o.startsWith(`/sport`):
                                s = n.content;
                                break;
                            case o.startsWith(`/sounds/play`):
                                s = n.content;
                                break;
                            case o.startsWith(`/news/live`):
                                s = n.content;
                                break;
                            default:
                                s = i.ProcessFeed(a);
                        }
                        return { title: n.title || ``, description: s || ``, pubDate: n.pubDate || new Date().toUTCString(), link: n.link };
                    } catch {
                        return {};
                    }
                })
            )
    );
    return { title: s, link: c, image: `https://www.bbc.com/favicon.ico`, description: s, item: d.filter((e) => Object.keys(e).length > 0) };
}
export { a as route };
