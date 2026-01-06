import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r, t as i } from './utils-DiT9KnQ-.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/:lang?`,
    categories: [`multimedia`],
    example: `/91porn`,
    parameters: { lang: 'Language, see below, `en_US` by default ' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`91porn.com/index.php`], target: `` }],
    name: `Hot Video Today`,
    maintainers: [`TonyRL`],
    handler: s,
    url: `91porn.com/index.php`,
    description: `| English | 简体中文 | 繁體中文 |
| ------- | -------- | -------- |
| en_US  | cn_CN   | zh_ZH   |`,
};
async function s(o) {
    let { domain: s = `91porn.com` } = o.req.query(),
        c = `https://${s}/index.php`,
        { lang: l = `en_US` } = o.req.param();
    i(s);
    let u = a((await n.post(c, { form: { session_language: l }, headers: { referer: c } })).data),
        d = u(`.row .well`)
            .toArray()
            .map((e) => ((e = u(e)), { title: e.find(`.video-title`).text(), link: e.find(`a`).attr(`href`), poster: e.find(`.img-responsive`).attr(`src`) }));
    return (
        (d = await Promise.all(
            d.map((i) =>
                e.tryGet(`91porn:${l}:${new URL(i.link).searchParams.get(`viewkey`)}`, async () => {
                    let { data: e } = await n(i.link),
                        o = a(e);
                    return ((i.pubDate = t(o(`.title-yakov`).eq(0).text(), `YYYY-MM-DD`)), (i.description = r({ link: i.link, poster: i.poster })), (i.author = o(`.title-yakov a span`).text()), delete i.poster, i);
                })
            )
        )),
        { title: `${u(`.login_register_header`).text()} - 91porn`, link: c, item: d }
    );
}
export { o as route };
