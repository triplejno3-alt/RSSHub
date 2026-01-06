import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://www.alicesoft.com`,
    i = {
        url: `www.alicesoft.com/information`,
        path: `/information/:category?/:game?`,
        categories: [`game`],
        example: `/alicesoft/information/game/cat377`,
        parameters: {
            category: `Category in the URL, which can be accessed under カテゴリ一覧 on the website.`,
            game: 'Game-specific subcategory in the URL, which can be accessed under カテゴリ一覧 on the website. In this case, the category value should be `game`.',
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.alicesoft.com/information`, `www.alicesoft.com/information/:category`, `www.alicesoft.com/information/:category/:game`], target: `/information/:category/:game` }],
        name: `ニュース`,
        maintainers: [`keocheung`],
        handler: a,
    };
async function a(i) {
    let { category: a, game: o } = i.req.param(),
        s = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10,
        c = `${r}/information`;
    a && ((c += `/${a}`), o && (c += `/${o}`));
    let l = n((await t(c)).data),
        u = l(`div.cont-main li`)
            .slice(0, s)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`p.txt`).text(), link: e.find(`a`).attr(`href`), pubDate: new Date(e.find(`time`).attr(`datetime`)) }));
    return (
        (u = await Promise.all(
            u.map((i) =>
                i.link.startsWith(`${r}/information/`)
                    ? e.tryGet(i.link, async () => {
                          let e = n((await t(i.link)).data);
                          return (
                              e(`iframe[src^="https://www.youtube.com/"]`).removeAttr(`height`).removeAttr(`width`),
                              (i.description = `<div lang="ja-JP">${e(`div.article-detail`)
                                  .html()
                                  ?.replaceAll(/<p class="hl1">(.+?)<\/p>/g, `<h3>$1</h3>`)
                                  ?.replaceAll(/<p class="hl2">(.+?)<\/p>/g, `<h4>$1</h4>`)}</div>`),
                              i
                          );
                      })
                    : i
            )
        )),
        { title: `ALICESOFT ` + l(`article h2`).clone().children().remove().end().text(), link: c, item: u, language: `ja` }
    );
}
export { i as route };
