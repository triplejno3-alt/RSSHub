import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/news/:category?/:language?`,
    categories: [`new-media`],
    example: `/kbs/news`,
    parameters: { category: 'Category, can be found in Url as `id`, all by default', language: `Language, see below, e as English by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`world.kbs.co.kr/`], target: `/news` }],
    name: `News`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `world.kbs.co.kr/`,
    description: `| 한국어 | عربي | 中国语 | English | Français | Deutsch | Bahasa Indonesia | 日本語 | Русский | Español | Tiếng Việt |
| ------ | ---- | ------ | ------- | -------- | ------- | ---------------- | ------ | ------- | ------- | ---------- |
| k      | a    | c      | e       | f        | g       | i                | j      | r       | s       | v          |`,
};
async function o(a) {
    let o = a.req.param(`category`) ?? `all`,
        s = a.req.param(`language`) ?? `e`,
        c = `http://world.kbs.co.kr`,
        l = `${c}/service/news_list.htm?lang=${s}${o === `all` ? `` : `&id=${o}`}`,
        u = i((await n({ method: `get`, url: l })).data);
    u(`.comp_pagination`).remove();
    let d = u(`.comp_contents_1x article`)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.find(`h2 a`);
                return {
                    title: n.text(),
                    category: e.find(`.cate`).text(),
                    link: `${c}/service${n.attr(`href`).replace(`./`, `/`)}`,
                    pubDate: r(
                        t(
                            e
                                .find(`.date`)
                                .text()
                                .match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/)[1]
                        ),
                        9
                    ),
                };
            }),
        f = await Promise.all(d.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n({ method: `get`, url: t.link })).data)(`.body_txt`).html()), t))));
    return { title: `${u(`.active`).text() || d[0].category} - KBS WORLD`, link: l, item: f };
}
export { a as route };
