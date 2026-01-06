import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/news-room/:category?/:language?`,
    categories: [`government`],
    example: `/who/news-room/feature-stories`,
    parameters: { category: `Category, see below, Feature stories by default`, language: `Language, see below, English by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`who.int/news-room/:type`], target: `/news-room/:type` }],
    name: `Newsroom`,
    maintainers: [`LogicJake`, `nczitzk`],
    handler: a,
    url: `who.int/news`,
    description: `Category

| Feature stories | Commentaries |
| --------------- | ------------ |
| feature-stories | commentaries |

  Language

| English | العربية | 中文 | Français | Русский | Español | Português |
| ------- | ------- | ---- | -------- | ------- | ------- | --------- |
| en      | ar      | zh   | fr       | ru      | es      | pt        |`,
};
async function a(i) {
    let a = i.req.param(`category`) ?? `feature-stories`,
        o = i.req.param(`language`) ?? ``,
        s = `https://www.who.int`,
        c = `${s}/${o ? `${o}/` : ``}news-room/${a}`,
        l = r((await n({ method: `get`, url: c })).data),
        u = l(`.list-view--item a`);
    u =
        u.length === 0
            ? (await n({ method: `get`, url: `${s}/api/hubs/${a.replaceAll(`-`, ``)}?sf_culture=zh&$orderby=PublicationDateAndTime%20desc&$select=Title,PublicationDateAndTime,ItemDefaultUrl&$top=30` })).data.value.map((e) => ({
                  title: e.Title,
                  link: `${c}/detail/${e.ItemDefaultUrl}`,
                  pubDate: t(e.PublicationDateAndTime),
              }))
            : u.toArray().map((e) => ((e = l(e)), { link: `${e.attr(`href`).indexOf(`http`) === 0 ? `` : s}${e.attr(`href`)}` }));
    let d = await Promise.all(
        u.map((i) =>
            e.tryGet(i.link, async () => {
                let e = await n({ method: `get`, url: i.link }),
                    a = e.data.match(/"headline":"(.*)","description":"(.*)","datePublished":"(.*)","image"/);
                return (a ? ((i.title = a[1]), (i.description = a[2]), (i.pubDate = t(a[3]))) : (i.description = r(e.data)(`.sf-content-block`).html()), i);
            })
        )
    );
    return { title: `${l(`meta[property="og:title"]`).attr(`content`)} - WHO`, link: c, item: d };
}
export { i as route };
