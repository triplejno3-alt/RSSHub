import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/news/:category?`,
    categories: [`anime`],
    example: `/toranoana/news/toragen`,
    parameters: { category: `category` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Category`,
    maintainers: [`Tsuyumi25`],
    handler: i,
    radar: [
        { title: `総合新着記事`, source: [`news.toranoana.jp`], target: `/news` },
        { title: `女性向け`, source: [`news.toranoana.jp/joshi`], target: `/news/joshi` },
        { title: `イラスト展`, source: [`news.toranoana.jp/exhibitions`], target: `/news/exhibition` },
        { source: [`news.toranoana.jp/category/:category`], target: `/news/:category` },
    ],
    description:
        '\n::: warning TIP\n[総合新着記事](https://news.toranoana.jp)→`/toranoana/news`  \n[女性向け](https://news.toranoana.jp/joshi)→`/toranoana/news/joshi`  \n[イラスト展](https://news.toranoana.jp/exhibitions)→`/toranoana/news/exhibition`  \n[`https://news.toranoana.jp/category/media`](https://news.toranoana.jp/category/media)→`/toranoana/news/media`\n:::',
};
async function i(r) {
    let { category: i = `` } = r.req.param(),
        a = `https://news.toranoana.jp/wp-json/wp/v2/posts`;
    if (i) {
        let t = await e(`https://news.toranoana.jp/wp-json/wp/v2/categories?slug=${i}`);
        t && t.length > 0 && (a += `?categories=${t[0].id}`);
    } else a += `?categories_exclude=1598`;
    let o = await e(a, { query: { per_page: 20, _embed: `wp:featuredmedia` } });
    if (!o || !o.length) throw Error(`No posts found`);
    let s = o.map((e) => {
        let r = n(e.content.rendered);
        (r(`h1`).first().remove(), r(`h2`).first().remove());
        let i = ``;
        return (
            e._embedded && e._embedded[`wp:featuredmedia`][0].source_url && (i = e._embedded[`wp:featuredmedia`][0].source_url),
            i && r(`body`).prepend(`<img src="${i}" alt="${e.title.rendered}" />`),
            { title: e.title.rendered, link: e.link, description: r.html(), pubDate: t(e.date_gmt), guid: e.link, author: `とらのあな` }
        );
    });
    return {
        title: i ? `とらのあな総合インフォメーション - ${i}` : `とらのあな総合インフォメーション`,
        link: i ? `https://news.toranoana.jp/category/${i}` : `https://news.toranoana.jp/`,
        description: `とらのあなの最新情報をお届け！同人誌、書籍、コミック、店舗フェア、イラスト展、とらのあな限定版、キャンペーンなど…スペシャルでお得な情報をいち早くチェック！`,
        item: s.filter(Boolean),
        language: `ja`,
    };
}
export { r as route };
