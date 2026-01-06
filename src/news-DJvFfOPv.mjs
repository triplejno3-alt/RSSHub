import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = async (r) => {
        let { category: a = `cardgame` } = r.req.param(),
            o = Number.parseInt(r.req.query(`limit`) ?? `18`, 10),
            s = new URL(`category/${a.endsWith(`/`) ? a : `${a}/`}`, `https://app.mycard520.com.tw`).href,
            c = i(await e(s)),
            l = c(`html`).attr(`lang`) ?? `zh-TW`,
            u = [];
        return (
            c(`div.page_numbers`).remove(),
            (u = c(`div#tab1 ul li`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    let t = c(e),
                        r = t.find(`a`),
                        i = t.find(`div.text_box p`).text(),
                        a = r.html() ?? void 0,
                        o = t.find(`div.date`).text().trim(),
                        s = r.attr(`href`),
                        u = t.find(`div.img_box img`).attr(`src`),
                        d = o;
                    return { title: i, description: a, pubDate: o ? n(o) : void 0, link: s, content: { html: a ?? ``, text: a ?? `` }, image: u, banner: u, updated: d ? n(d) : void 0, language: l };
                })),
            (u = (
                await Promise.all(
                    u.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = i(await e(r.link)),
                                      a = t(`div.page_box`),
                                      o = a.find(`h2`).text(),
                                      s = t(`div.date`).first().text(),
                                      c = s;
                                  a.find(`h2, div.date, .the_champ_sharing_container`).remove();
                                  let u = a.html() ?? r.description,
                                      d = { title: o, description: u, pubDate: s ? n(s) : r.pubDate, content: { html: u ?? ``, text: u ?? `` }, updated: c ? n(c) : r.updated, language: l };
                                  return { ...r, ...d };
                              })
                            : r
                    )
                )
            ).filter((e) => !0)),
            {
                title: c(`title`).text(),
                description: c(`meta[name="keywords"]`).attr(`content`),
                link: s,
                item: u,
                allowEmpty: !0,
                image: c(`div.logo img`).attr(`src`),
                author: c(`title`).text().split(/-/).pop()?.trim(),
                language: l,
                id: s,
            }
        );
    },
    o = {
        path: `/category/:category?`,
        name: `遊戲新聞`,
        url: `app.mycard520.com.tw`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/mycard520/category/cardgame`,
        parameters: {
            category: {
                description: '分类，默认为 `cardgame`，即最新遊戲，可在对应分类页 URL 中找到',
                options: [
                    { label: `最新遊戲`, value: `cardgame` },
                    { label: `手機遊戲`, value: `cardgame-mobile` },
                    { label: `PC 遊戲`, value: `cardgame-pc` },
                    { label: `電競賽事`, value: `cardgame-esports` },
                    { label: `實況直播`, value: `cardgame-live` },
                ],
            },
        },
        description:
            '::: tip\n若订阅 [最新遊戲](https://app.mycard520.com.tw/category/cardgame/)，网址为 `https://app.mycard520.com.tw/category/cardgame/`，请截取 `https://app.mycard520.com.tw/category/` 到末尾 `/` 的部分 `cardgame` 作为 `category` 参数填入，此时目标路由为 [`/mycard520/category/cardgame`](https://rsshub.app/mycard520/category/cardgame)。\n:::\n\n| [最新遊戲](https://app.mycard520.com.tw/category/cardgame/) | [手機遊戲](https://app.mycard520.com.tw/category/cardgame-mobile/)       | [PC 遊戲](https://app.mycard520.com.tw/category/cardgame-pc/)    | [電競賽事](https://app.mycard520.com.tw/category/cardgame-esports/)        | [實況直播](https://app.mycard520.com.tw/category/cardgame-live/)     |\n| ----------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------- |\n| [cardgame](https://rsshub.app/mycard520/category/cardgame)  | [cardgame-mobile](https://rsshub.app/mycard520/category/cardgame-mobile) | [cardgame-pc](https://rsshub.app/mycard520/category/cardgame-pc) | [cardgame-esports](https://rsshub.app/mycard520/category/cardgame-esports) | [cardgame-live](https://rsshub.app/mycard520/category/cardgame-live) |\n',
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`app.mycard520.com.tw/category/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/mycard520${t ? `/${t}` : ``}`;
                },
            },
            { title: `最新遊戲`, source: [`app.mycard520.com.tw/category/cardgame`], target: `/category/cardgame` },
            { title: `手機遊戲`, source: [`app.mycard520.com.tw/category/cardgame-mobile`], target: `/category/cardgame-mobile` },
            { title: `PC 遊戲`, source: [`app.mycard520.com.tw/category/cardgame-pc`], target: `/category/cardgame-pc` },
            { title: `電競賽事`, source: [`app.mycard520.com.tw/category/cardgame-esports`], target: `/category/cardgame-esports` },
            { title: `實況直播`, source: [`app.mycard520.com.tw/category/cardgame-live`], target: `/category/cardgame-live` },
        ],
        view: r.Articles,
        zh: {
            path: `/category/:category?`,
            name: `游戏新闻`,
            url: `app.mycard520.com.tw`,
            maintainers: [`nczitzk`],
            handler: a,
            example: `/mycard520/category/cardgame`,
            parameters: {
                category: {
                    description: '分类，默认为 `cardgame`，即最新游戏，可在对应分类页 URL 中找到',
                    options: [
                        { label: `最新游戏`, value: `cardgame` },
                        { label: `手机游戏`, value: `cardgame-mobile` },
                        { label: `PC 游戏`, value: `cardgame-pc` },
                        { label: `电竞赛事`, value: `cardgame-esports` },
                        { label: `实况直播`, value: `cardgame-live` },
                    ],
                },
            },
            description:
                '::: tip\n若订阅 [最新游戏](https://app.mycard520.com.tw/category/cardgame/)，网址为 `https://app.mycard520.com.tw/category/cardgame/`，请截取 `https://app.mycard520.com.tw/category/` 到末尾 `/` 的部分 `cardgame` 作为 `category` 参数填入，此时目标路由为 [`/mycard520/category/cardgame`](https://rsshub.app/mycard520/category/cardgame)。\n:::\n\n| [最新游戏](https://app.mycard520.com.tw/category/cardgame/) | [手机游戏](https://app.mycard520.com.tw/category/cardgame-mobile/)       | [PC 游戏](https://app.mycard520.com.tw/category/cardgame-pc/)    | [电竞赛事](https://app.mycard520.com.tw/category/cardgame-esports/)        | [实况直播](https://app.mycard520.com.tw/category/cardgame-live/)     |\n| ----------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------- |\n| [cardgame](https://rsshub.app/mycard520/category/cardgame)  | [cardgame-mobile](https://rsshub.app/mycard520/category/cardgame-mobile) | [cardgame-pc](https://rsshub.app/mycard520/category/cardgame-pc) | [cardgame-esports](https://rsshub.app/mycard520/category/cardgame-esports) | [cardgame-live](https://rsshub.app/mycard520/category/cardgame-live) |\n',
        },
    };
export { a as handler, o as route };
