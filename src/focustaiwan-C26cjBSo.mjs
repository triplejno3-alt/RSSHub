import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = {
    path: `/:category?`,
    categories: [`new-media`],
    example: `/focustaiwan`,
    parameters: { category: `分类，见下表，默认为 news` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Category`,
    maintainers: [`nczitzk`],
    handler: d,
    description: `| Latest | Editor's Picks | Photos of the Day |
| ------ | -------------- | ----------------- |
| news   | editorspicks   | photos            |

| Politics | Cross-strait | Business | Society | Science & Tech | Culture | Sports |
| -------- | ------------ | -------- | ------- | -------------- | ------- | ------ |
| politics | cross-strait | business | society | science & tech | culture | sports |`,
};
async function d(u) {
    let d = await n({ method: `post`, url: `https://focustaiwan.tw/cna2019api/cna/FTNewsList`, form: { action: 4, category: u.req.param(`category`) ?? `news`, pageidx: 2, pagesize: 50 } }),
        f = d.data.ResultData.Items.map((e) => ({ title: e.HeadLine, link: e.PageUrl, category: e.ClassName, pubDate: r(t(e.CreateTime), 8) })),
        p = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = await n({ method: `get`, url: t.link }),
                        r = s(e.data);
                    r(`img`).each(function () {
                        r(this).html(`<img src="${r(this).attr(`data-src`)}">`);
                    });
                    let u = r(`meta[property="og:image"]`).attr(`content`),
                        d = e.data.match(/var pAudio_url = "(.*)\.mp3";/);
                    return (
                        d && ((t.enclosure_url = d[1]), (t.enclosure_type = `audio/mpeg`), (t.itunes_item_image = u)),
                        (t.description = c(o(i, { children: [a(`img`, { src: u }), a(`div`, { children: r(`.paragraph`).html() ? l(r(`.paragraph`).html()) : null })] }))),
                        t
                    );
                })
            )
        );
    return { title: d.data.ResultData.MetaData.Title, link: d.data.ResultData.MetaData.CanonicalUrl, item: p, itunes_author: `Focus Taiwan`, image: `https://imgcdn.cna.com.tw/Eng/website/img/default.png` };
}
export { u as route };
