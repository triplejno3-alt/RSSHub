import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
import o from 'p-map';
const s = {
    path: `/gnn/:category?`,
    categories: [`anime`],
    view: i.Articles,
    example: `/gamer/gnn/1`,
    parameters: {
        category: {
            description: `版塊`,
            options: [
                { value: `1`, label: `PC` },
                { value: `3`, label: `TV 掌機` },
                { value: `4`, label: `手機遊戲` },
                { value: `5`, label: `動漫畫` },
                { value: `9`, label: `主題報導` },
                { value: `11`, label: `活動展覽` },
                { value: `13`, label: `電競` },
                { value: `ns`, label: `Switch` },
                { value: `ps5`, label: `PS5` },
                { value: `ps4`, label: `PS4` },
                { value: `xbone`, label: `XboxOne` },
                { value: `xbsx`, label: `XboxSX` },
                { value: `pc`, label: `PC 單機` },
                { value: `olg`, label: `PC 線上` },
                { value: `ios`, label: `iOS` },
                { value: `android`, label: `Android` },
                { value: `web`, label: `Web` },
                { value: `comic`, label: `漫畫` },
                { value: `anime`, label: `動畫` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `GNN 新聞`,
    maintainers: [`Arracc`, `ladeng07`, `pseudoyu`],
    handler: c,
    description: `缺省為首頁`,
};
async function c(i) {
    let s = i.req.param(`category`),
        c = ``,
        l = ``,
        u = {
            1: `PC`,
            3: `TV 掌機`,
            4: `手機遊戲`,
            5: `動漫畫`,
            9: `主題報導`,
            11: `活動展覽`,
            13: `電競`,
            ns: `Switch`,
            ps5: `PS5`,
            ps4: `PS4`,
            xbone: `XboxOne`,
            xbsx: `XboxSX`,
            pc: `PC 單機`,
            olg: `PC 線上`,
            ios: `iOS`,
            android: `Android`,
            web: `Web`,
            comic: `漫畫`,
            anime: `動畫`,
        };
    !s || !Object.keys(u).includes(s)
        ? (c = `https://gnn.gamer.com.tw/`)
        : ((l = `-` + u[s]), (c = [`1`, `3`, `4`, `5`, `9`, `11`, `13`].includes(s) ? `https://gnn.gamer.com.tw/index.php?k=${s}` : `https://acg.gamer.com.tw/news.php?p=${s}`));
    let d = (await n({ method: `get`, url: c })).data,
        f = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 50,
        p = a(d),
        m = await o(
            p(`div.BH-lbox.GN-lbox2`)
                .children()
                .not(`p,a,img,span`)
                .not(`[data-news-id]`)
                .slice(0, f)
                .toArray()
                .map((e) => {
                    e = p(e);
                    let t, n;
                    return (
                        e.find(`h1`).length === 0 ? ((t = e.find(`a`)), (n = e.find(`div.platform-tag_list`).text())) : ((t = e.find(`h1`).find(`a`)), (n = e.find(`div.platform-tag_list`).text())),
                        { title: `[` + n + `]` + t.text(), link: t.attr(`href`).replace(`//`, `https://`) }
                    );
                }),
            async (i) => (
                (i.description = await e.tryGet(i.link, async () => {
                    let e = await n.get(i.link),
                        o = ``,
                        s = /window\.lazySizesConfig/g,
                        c,
                        l;
                    if (e.body.search(s) >= 0) {
                        let t = a(e.data);
                        (t(`span.GN-lbox3C`).length > 0
                            ? ((c = t(`span.GN-lbox3C`).text().split(`）`)), (i.author = c[0].replace(`（`, ``).replace(` 報導`, ``)), (l = c[1].trim()))
                            : ((c = t(`span.GN-lbox3CA`).text().split(`）`)), (i.author = c[0].replace(`（`, ``).replace(` 報導`, ``)), (l = c[1].replace(`原文出處`, ``).trim())),
                            (o = t(`div.GN-lbox3B`).html()));
                    } else {
                        let e = a((await n.get(i.link)).data);
                        e(`div.MSG-list8C`).length > 0
                            ? ((c = e(`span.ST1`).text().split(`│`)), (i.author = c[0].replace(`作者：`, ``)), (l = c[e(`span.ST1`).find(`a`).length > 0 ? 2 : 1]), (o = e(`div.MSG-list8C`).html()))
                            : ((c = e(`div.article-intro`)
                                  .text()
                                  .replaceAll(
                                      `
`,
                                      ``
                                  )
                                  .split(`|`)),
                              (i.author = c[0]),
                              (l = c[1]),
                              (o = e(`div.text-paragraph`).html()));
                    }
                    return ((i.pubDate = r(t(l, `YYYY-MM-DD HH:mm:ss`), 8)), (o = o.replaceAll(/\b(data-src)\b/g, `src`)), o);
                })),
                i
            ),
            { concurrency: 5 }
        );
    return { title: `巴哈姆特-GNN新聞` + l, link: c, item: m };
}
export { s as route };
