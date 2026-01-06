import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/podcast/:id`,
    categories: [`multimedia`],
    view: r.Audios,
    example: `/xiaoyuzhou/podcast/6021f949a789fca4eff4492c`,
    parameters: { id: `播客 id 或单集 id，可以在小宇宙播客的 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xiaoyuzhoufm.com/podcast/:id`, `xiaoyuzhoufm.com/episode/:id`] }],
    name: `播客`,
    maintainers: [`hondajojo`, `jtsang4`, `pseudoyu`, `cscnk52`],
    handler: o,
    url: `xiaoyuzhoufm.com/`,
};
async function o(r) {
    let a = r.req.param(`id`),
        o,
        s,
        c,
        l;
    try {
        ((o = `https://www.xiaoyuzhoufm.com/podcast/${a}`), (s = await e(o)), (c = i(s)));
        let t = c(`#__NEXT_DATA__`).get(0);
        if (((l = JSON.parse(t.children[0].data)), !l.props.pageProps.podcast?.episodes)) throw Error(`No episodes found in podcast data`);
    } catch {
        ((o = `https://www.xiaoyuzhoufm.com/episode/${a}`), (s = await e(o)), (c = i(s)));
        let t = c(`a[href^="/podcast/"].name`).attr(`href`);
        if (t) {
            ((o = `https://www.xiaoyuzhoufm.com/podcast/${t.split(`/`).pop()}`), (s = await e(o)), (c = i(s)));
            let n = c(`#__NEXT_DATA__`).get(0);
            l = JSON.parse(n.children[0].data);
        }
    }
    let u = l.props.pageProps.podcast.episodes.map((e) => ({
        title: e.title,
        enclosure_url: e.enclosure.url,
        itunes_duration: e.duration,
        enclosure_type: `audio/mpeg`,
        link: `https://www.xiaoyuzhoufm.com/episode/${e.eid}`,
        eid: e.eid,
        pubDate: n(e.pubDate),
        itunes_item_image: (e.image || e.podcast?.image)?.smallPicUrl,
    }));
    return (
        (u = await Promise.all(
            u.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = (await e(`https://www.xiaoyuzhoufm.com/_next/data/${l.buildId}/episode/${n.eid}.json`)).pageProps.episode;
                    return ((n.description = t.shownotes || t.description || t.title || ``), n);
                })
            )
        )),
        {
            title: l.props.pageProps.podcast.title,
            link: `https://www.xiaoyuzhoufm.com/podcast/${l.props.pageProps.podcast.pid}`,
            itunes_author: l.props.pageProps.podcast.author,
            itunes_category: ``,
            image: l.props.pageProps.podcast.image.smallPicUrl,
            item: u,
            description: l.props.pageProps.podcast.description,
        }
    );
}
export { a as route };
