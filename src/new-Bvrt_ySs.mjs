import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = {
        home: { type: `home`, name: `「DLsite 同人」`, url: `/home/new` },
        comic: { type: `comic`, name: `「DLsite コミック」`, url: `/comic/new` },
        soft: { type: `soft`, name: `「DLsite PCソフト」`, url: `/soft/new` },
        maniax: { type: `maniax`, name: `「DLsite 同人 - R18」`, url: `/maniax/new` },
        books: { type: `books`, name: `「DLsite 成年コミック - R18」`, url: `/books/new` },
        pro: { type: `pro`, name: `「DLsite 美少女ゲーム」`, url: `/pro/new` },
        girls: { type: `girls`, name: `「DLsite 乙女」`, url: `/girls/new` },
        bl: { type: `bl`, name: `「DLsite BL」`, url: `/bl/new` },
    },
    o = {
        path: `/new/:type`,
        categories: [`anime`],
        view: n.Articles,
        example: `/dlsite/new/home`,
        parameters: { type: { description: `类型`, options: Object.values(a).map((e) => ({ value: e.type, label: e.name })) } },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        name: `Current Release`,
        maintainers: [`cssxsh`],
        handler: s,
        description: `| Doujin | Comics | PC Games | Doujin (R18) | Adult Comics | H Games | Otome | BL |
| ------ | ------ | -------- | ------------ | ------------ | ------- | ----- | -- |
| home   | comic  | soft     | maniax       | books        | pro     | girls | bl |`,
    };
async function s(n) {
    let o = a[n.req.param(`type`)];
    if (o === void 0) throw new r(`不支持指定类型！`);
    let s = o.url.slice(1),
        c = (await t(new URL(s, `https://www.dlsite.com`), { method: `GET` })).data,
        l = i(c),
        u = l(`title`).text(),
        d = l(`meta[name="description"]`).attr(`content`),
        f = l(`.n_worklist_item`),
        p = e(
            l(`.work_update`)
                .text()
                .trim()
                .replaceAll(/（.*）/g, ``),
            `YYYY年M月D日`
        );
    return {
        title: u,
        link: s,
        description: d,
        language: `ja-jp`,
        item: f.toArray().map((e) => {
            let t = l(`.work_name`, e).text(),
                n = l(`.work_name > a`, e).attr(`href`);
            return (
                l(`a`, e).each((e, t) => {
                    l(t).attr(`target`, `_blank`);
                }),
                {
                    title: t,
                    link: n,
                    description: l(e).html(),
                    category: l(`a`, l(`.search_tag`, e))
                        .toArray()
                        .map((e) => l(e).text()),
                    author: l(`.maker_name`, e).text(),
                    pubDate: p,
                }
            );
        }),
    };
}
export { o as route };
