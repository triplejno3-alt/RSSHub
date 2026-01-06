import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import o from 'dayjs';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = [
        { keywords: `video-motiongraphic`, category: `portfolio.category.trevorbenitez` },
        { keywords: `graphic-design`, category: `portfolio.category.lynnrogers` },
        { keywords: `branding-editorial`, category: `portfolio.category.katiethompson` },
        { keywords: `UI-UX`, category: `portfolio.category.brittneyhall` },
        { keywords: `illustration`, category: `portfolio.category.margaretbullock` },
        { keywords: `digital-art`, category: `portfolio.category.amandahoward` },
        { keywords: `character-design`, category: `portfolio.category.rachelsharp` },
        { keywords: `product-package-design`, category: `portfolio.category.vanessacohen` },
        { keywords: `photography`, category: `portfolio.category.johnmurray` },
        { keywords: `typography`, category: `portfolio.category.timothysmith` },
        { keywords: `crafts`, category: `portfolio.category.jessicaking` },
        { keywords: `fine-art`, category: `portfolio.category.johnmedina` },
    ],
    u = (e) =>
        s(
            i(r, {
                children:
                    e.type === `Image`
                        ? e.files?.map((e) => a(r, { children: [i(`img`, { src: e.url, alt: ``, style: `max-width: 100%; height: auto;` }), i(`br`, {})] }))
                        : e.type === `Text`
                          ? a(r, { children: [c(e.content ?? ``), i(`br`, {})] })
                          : null,
            })
        ),
    d = {
        path: `/search/:category?/:order?/:time?/:query?`,
        categories: [`design`],
        view: n.Pictures,
        example: `/notefolio/search/1/pick/all/life`,
        parameters: {
            category: {
                description: `Category, see below`,
                options: [
                    { value: `all`, label: `All (전체)` },
                    { value: `1`, label: `Video / Motion Graphics (영상/모션그래픽)` },
                    { value: `2`, label: `Graphic Design (그래픽 디자인)` },
                    { value: `3`, label: `Branding / Editing (브랜딩/편집)` },
                    { value: `4`, label: `UI/UX (UI/UX)` },
                    { value: `5`, label: `Illustration (일러스트레이션)` },
                    { value: `6`, label: `Digital Art (디지털 아트)` },
                    { value: `7`, label: `Character Design (캐릭터 디자인)` },
                    { value: `8`, label: `Product Package Design (제품/패키지 디자인)` },
                    { value: `9`, label: `Photography (포토그래피)` },
                    { value: `10`, label: `Typography (타이포그래피)` },
                    { value: `11`, label: `Crafts (공예)` },
                    { value: `12`, label: `Fine Art (파인아트)` },
                ],
                default: `all`,
            },
            order: {
                description: 'Order, `pick` as Notefolio Pick, `published` as Newest, `like` as like, `pick` by default',
                options: [
                    { value: `pick`, label: `Notefolio Pick` },
                    { value: `published`, label: `Newest` },
                    { value: `like`, label: `Like` },
                ],
                default: `pick`,
            },
            time: {
                description: `Time`,
                options: [
                    { value: `all`, label: `All the time` },
                    { value: `one-day`, label: `Latest 24 hours` },
                    { value: `week`, label: `Latest week` },
                    { value: `month`, label: `Latest month` },
                    { value: `three-month`, label: `Latest 3 months` },
                ],
                default: `all`,
            },
            query: `Keyword, empty by default`,
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`notefolio.net/search`] }],
        name: `Works`,
        maintainers: [`BianTan`],
        handler: f,
        url: `notefolio.net/search`,
        description: `| Category | Name in Korean     | Name in English         |
| -------- | ------------------ | ----------------------- |
| all      | 전체               | All                     |
| 1        | 영상/모션그래픽    | Video / Motion Graphics |
| 2        | 그래픽 디자인      | Graphic Design          |
| 3        | 브랜딩/편집        | Branding / Editing      |
| 4        | UI/UX              | UI/UX                   |
| 5        | 일러스트레이션     | Illustration            |
| 6        | 디지털 아트        | Digital Art             |
| 7        | 캐릭터 디자인      | Character Design        |
| 8        | 제품/패키지 디자인 | Product Package Design  |
| 9        | 포토그래피         | Photography             |
| 10       | 타이포그래피       | Typography              |
| 11       | 공예               | Crafts                  |
| 12       | 파인아트           | Fine Art                |`,
    };
async function f(n) {
    let { category: r = `all`, order: i = `pick`, time: a = `all`, query: s = `` } = n.req.param(),
        { limit: c } = n.req.query(),
        d = `https://api.stunning.kr/api/v1/dantats/portfolio?state=Public&limit=${c ? Number.parseInt(c, 10) : 20}&search=${s}&orderBy=${i}`,
        f = (Number(r) || 0) - 1;
    if ((f >= 0 && l[f] && (d += `&category=${l[f].category}`), a !== `all` && [`one-day`, `week`, `month`, `three-month`].includes(a))) {
        let e = ``,
            t = o().endOf(`d`).format(`YYYY-MM-DDTHH:mm:ss.SSS`);
        switch (a) {
            case `one-day`:
                e = o().subtract(1, `d`).format(`YYYY-MM-DDTHH:mm:ss.SSS`);
                break;
            case `week`:
                e = o().subtract(7, `d`).startOf(`d`).format(`YYYY-MM-DDTHH:mm:ss.SSS`);
                break;
            case `month`:
                e = o().subtract(30, `d`).startOf(`d`).format(`YYYY-MM-DDTHH:mm:ss.SSS`);
                break;
            case `three-month`:
                e = o().subtract(90, `d`).startOf(`d`).format(`YYYY-MM-DDTHH:mm:ss.SSS`);
                break;
        }
        d += `&publishedAt=${e}Z&publishedAt=${t}Z`;
    }
    let { data: p } = await t(d, { headers: { Origin: `https://notefolio.net` } }),
        m =
            p?.resultData.map((t) => {
                let { id: n, title: r, user: i, createdAt: a, categories: o = [], contents: s = [] } = t,
                    c = s.map((e) => u(e)).join(` `);
                return { title: r, link: `https://notefolio.net/${i.url}/${n}`, description: c, pubDate: e(a), author: i.nick, category: o.map((e) => e.replace(`portfolio.category.`, ``)) };
            }) || [];
    return { title: `${r}/${i}/${a}/${s} search`, item: m };
}
export { d as route };
