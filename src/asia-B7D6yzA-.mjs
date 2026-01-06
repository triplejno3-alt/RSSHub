import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/asia`, categories: [`traditional-media`], example: `/nikkei/asia`, radar: [{ source: [`asia.nikkei.com/`] }], name: `Nikkei Asia Latest News`, maintainers: [`rainrdx`], handler: a, url: `asia.nikkei.com` };
async function a() {
    let i = (
        await n({
            method: `get`,
            url: `https://asia.nikkei.com/api/__service/next_api/v1/graphql`,
            searchParams: { operationName: `GetLatestHeadlinesStream`, variables: `{}`, extensions: `{"persistedQuery":{"version":1,"sha256Hash":"287aed8784a3f55ad444bb6b550ebdafb40b0da60c7800081e7343d889975fe8"}}` },
            headers: { 'content-type': `application/json` },
        })
    ).data.data.getLatestHeadlines.items.map((e) => ({ ...e, link: new URL(e.path, `https://asia.nikkei.com`).href }));
    return {
        title: `Nikkei Asia`,
        link: `https://asia.nikkei.com`,
        image: `https://main-asianreview-nikkei.content.pugpig.com/pugpig_assets/admin/pub120x120.jpg`,
        item: await Promise.all(
            i.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = i.name,
                        a = t(i.displayDate * 1e3),
                        o = i.primaryTag.name,
                        s = r((await n(i.link)).data),
                        c = s(`div[class^="NewsArticle_newsArticleContentContainerWrapper"]`).html() || ``,
                        l = s(`div[class^="NewsArticleDetails_newsArticleDetailsByline"]`).text() || ``;
                    return { title: e, pubDate: a, category: o, description: c, link: i.link, author: l };
                })
            )
        ),
    };
}
export { i as route };
