import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
        path: `/workshopsearch/:appid?/:routeParams?`,
        categories: [`game`],
        example: `/steam/workshopsearch/730`,
        parameters: {
            appid: `Steam appid, can be found on the community hub page or store page URL, 730 by default.`,
            routeParams: `Route parameters, can be found on the search result page URL. Route parameters located after the appid.`,
        },
        radar: [{ title: `Workshop Search Results`, source: [`steamcommunity.com/app/:appid/workshop/`], target: `/workshopsearch/:appid` }],
        description: `Steam Community Workshop Search Results.
The parameter 'l=language' changes the language of search results(if possible).
For example, route \`/workshopsearch/730/l=schinese\` will display the simplified Chinese descriptions of the entry.

Language Parameter:

| English | 简体中文 | 繁體中文 | 日本語   | 한국어  | ภาษาไทย | български | čeština | dansk  | Deutsch | español | latam | ελληνικά | français | italiano | Bahasa Indonesia | magyar    | Nederlands | norsk     | polski | português  | brasileiro | română   | русский | suomi   | svenska | Türkçe  | Tiếng Việt | українська |
| ------- | -------- | -------- | -------- | ------- | ------- | --------- | ------- | ------ | ------- | ------- | ----- | -------- | -------- | -------- | ---------------- | --------- | ---------- | --------- | ------ | ---------- | ---------- | -------- | ------- | ------- | ------- | ------- | ---------- | ---------- |
| english | schinese | tchinese | japanese | koreana | thai    | bulgarian | czech   | danish | german  | spanish | latam | greek    | french   | italian  | indonesian       | hungarian | dutch      | norwegian | polish | portuguese | brazilian  | romanian | russian | finnish | swedish | turkish | vietnamese | ukrainian  |

`,
        name: `Community Workshop Search`,
        maintainers: [`NyaaaDoge`],
        handler: async (t) => {
            let { appid: r = 730, routeParams: o } = t.req.param(),
                c = i(await e(`https://steamcommunity.com/workshop/browse/?appid=${r}${o ? `&${o}` : ``}`)),
                l = c(`div.apphub_AppName`).first().text(),
                u = c(`div.customBrowseText`).first().text(),
                d = c(`div.apphub_AppIcon`).children(`img`).attr(`src`),
                f = c(`div.workshopBrowseItems .workshopItem`)
                    .toArray()
                    .map((e) => {
                        e = c(e);
                        let t = e.find(`a`).first().attr(`data-publishedfileid`),
                            r = e.find(`.workshopItemTitle`).first().text(),
                            i = e.find(`.workshop_author_link`).first().text(),
                            o = e.find(`.workshopItemPreviewImage`).first().attr(`src`),
                            l = e.find(`.fileRating`).first().attr(`src`),
                            u = [];
                        c(e)
                            .find(`.workshop_checkmark`)
                            .each((e, t) => {
                                let n = c(t),
                                    r = n.attr(`style`);
                                (!r || !r.includes(`display: none;`)) && u.push(n.attr(`src`) || ``);
                            });
                        let d = e
                                .next(`script`)
                                .text()
                                .match(/SharedFileBindMouseHover\(\s*"sharedfile_\d+",\s*(?:true|false),\s*({.*?})\s*\);/),
                            f = ``;
                        if (d) {
                            let e = d[1],
                                n = JSON.parse(e);
                            n.id === t && (f = n.description);
                        }
                        return { title: r, link: `https://steamcommunity.com/sharedfiles/filedetails/?id=${t}`, description: a(n(s, { image: o, rating: l, checkmark: u, description: f })), author: i };
                    });
            return { title: `${l} Steam Workshop Content`, link: `https://steamcommunity.com/workshop/browse/?appid=${r}${o ? `&${o}` : ``}`, item: f, icon: d, description: u };
        },
    },
    s = ({ image: e, rating: i, checkmark: a, description: o }) =>
        r(t, { children: [e ? r(t, { children: [n(`img`, { src: e }), n(`br`, {})] }) : null, i ? n(`img`, { src: i }) : null, a?.map((e) => n(`img`, { src: e })), n(`p`, { children: o })] });
export { o as route };
