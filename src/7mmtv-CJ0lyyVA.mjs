import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/:language?/:category?/:type?`,
    categories: [`multimedia`],
    example: `/7mmtv/zh/censored_list/all`,
    parameters: { language: 'Language, see below, `en` as English by default', category: 'Category, see below, `censored_list` as Censored by default', type: `Server, see below, all server by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Category`,
    maintainers: [`nczitzk`],
    handler: u,
    description: `**Language**

| English | 日本語 | 한국의 | 中文 |
| ------- | ------ | ------ | ---- |
| en      | ja     | ko     | zh   |

  **Category**

| Chinese subtitles AV | Censored       | Amateur          | Uncensored       | Asian self-timer | H comics     |
| -------------------- | -------------- | ---------------- | ---------------- | ---------------- | ------------ |
| chinese_list        | censored_list | amateurjav_list | uncensored_list | amateur_list    | hcomic_list |

| Chinese subtitles AV random | Censored random  | Amateur random     | Uncensored random  | Asian self-timer random | H comics random |
| --------------------------- | ---------------- | ------------------ | ------------------ | ----------------------- | --------------- |
| chinese_random             | censored_random | amateurjav_random | uncensored_random | amateur_random         | hcomic_random  |

  **Server**

| All Server | fembed(Full DL) | streamsb(Full DL) | doodstream | streamtape(Full DL) | avgle | embedgram | videovard(Full DL) |
| ---------- | --------------- | ----------------- | ---------- | ------------------- | ----- | --------- | ------------------ |
| all        | 21              | 30                | 28         | 29                  | 17    | 34        | 33                 |`,
};
async function u(l) {
    let u = `https://7mmtv.sx/${l.req.param(`language`) ?? `en`}/${l.req.param(`category`) ?? `censored_list`}/${l.req.param(`type`) ?? `all`}/1.html`,
        d = o((await n({ method: `get`, url: u })).data),
        f = d(`.video`)
            .toArray()
            .map((e) => {
                e = d(e);
                let n = e.find(`.video-title a`);
                return { title: n.text(), author: e.find(`.video-channel`).text(), pubDate: t(e.find(`.small`).text()), link: n.attr(`href`), poster: e.find(`img`).attr(`data-src`), video: e.find(`video`).attr(`data-src`) };
            });
    return (
        (f = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = o((await n({ method: `get`, url: t.link })).data),
                        l = e(`.content_main_cover img`).attr(`src`),
                        u = e(`.owl-lazy`)
                            .toArray()
                            .map((t) => e(t).attr(`data-src`)),
                        d = e(`.video-introduction-images-text`).html(),
                        f = t.poster ?? ``,
                        p = t.video,
                        m = p ? `<video mute loop="loop" autoplay="autoplay" poster="${f}"><source src="${p}"></video>` : ``;
                    return (
                        (t.description = s(a(r, { children: [l ? i(`img`, { src: l }) : null, p ? a(r, { children: [i(`br`, {}), c(m), i(`br`, {})] }) : null, d ? c(d) : null, u.map((e) => (e ? i(`img`, { src: e }) : null))] }))),
                        (t.category = e(`.categories a`)
                            .toArray()
                            .map((t) => e(t).text())),
                        delete t.poster,
                        delete t.video,
                        t
                    );
                })
            )
        )),
        {
            title: d(`title`)
                .text()
                .replace(/ - Watch JAV Online/, ``),
            link: u,
            item: f,
            description: d(`meta[name="description"]`).attr(`content`),
        }
    );
}
export { l as route };
