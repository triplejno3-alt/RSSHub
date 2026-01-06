import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { FetchError as a } from 'ofetch';
import { load as o } from 'cheerio';
const s = `Basic YW5vbnltb3VzOkdpQ2VMRWp4bnFCY1ZwbnA2Y0xzVXZKaWV2dlJRY0FYTHY=`,
    c = async (c, l) => {
        let u = l.req.param(`type`) ?? `latest`,
            d = l.req.param(`language`) ?? `zh-hans`,
            f,
            p;
        switch (c) {
            case `author`:
                ((f = `https://api.theinitium.com/api/v2/author/?language=${d}&slug=${u}`), (p = `https://theinitium.com/author/${u}/`));
                break;
            case `follow`:
                ((f = `https://api.theinitium.com/api/v2/user/follows/${u}/?language=${d}`), (p = `https://theinitium.com/follow/`));
                break;
            case `channel`:
                ((f = `https://api.theinitium.com/api/v2/channel/articles/?language=${d}&slug=${u}`), (p = `https://theinitium.com/channel/${u}/`));
                break;
            case `tags`:
                ((f = `https://api.theinitium.com/api/v2/tag/articles/?language=${d}&slug=${u}`), (p = `https://theinitium.com/tags/${u}/`));
                break;
            default:
                throw new i(`wrong model`);
        }
        let m = { email: e.initium.username, password: e.initium.password },
            h = JSON.stringify(m),
            g,
            _ = await t.get(`initium:token`);
        _
            ? (g = _)
            : e.initium.bearertoken
              ? ((g = e.initium.bearertoken), t.set(`initium:token`, e.initium.bearertoken))
              : m.email === void 0
                ? (g = s)
                : ((g =
                      `token ` +
                      (await r.post(`https://api.theinitium.com/api/v2/auth/login/?language=${d}`, { headers: { 'Content-Type': `application/json`, Accept: `application/json`, Connection: `keep-alive`, Authorization: s }, body: h }))
                          .data.token),
                  t.set(`initium:token`, g));
        let v = { Accept: `*/*`, Connection: `keep-alive`, Authorization: g },
            y;
        try {
            y = await r(f, { headers: v });
        } catch (e) {
            throw (e instanceof a && e.statusCode === 401 && (await t.set(`initium:token`, ``)), e);
        }
        let b = y.data.name || (y.data[c] && y.data[c].name) || `追踪`,
            x = y.data.results ?? y.data.digests,
            S = y.data[c] && (y.data[c].cover || y.data[c].avatar),
            C = (e) =>
                t.tryGet(`theinitium:${e}:${d}`, async () => {
                    let t = ``,
                        { data: n } = await r(`https://api.theinitium.com/api/v2/article/detail/?language=${d}&slug=${e}`, { headers: v });
                    if ((n.lead.length && (t += `<p>「` + n.lead + `」</p>`), n.byline.length && (t += `<p>` + n.byline + `</p>`), n.content))
                        t += n.content.replace(`<figure class="advertisement"/><br/>`, ``).replaceAll(/(?:<br>){2}-{11}<br>.*$/g, ``);
                    else if (n.type === `html`) t += `内容为空，请稍后再来`;
                    else if (n.type === `web`) {
                        let e = o((await r(n.web.url)).body).html();
                        t += e;
                    }
                    if (n.paywall_enabled) {
                        let n = d + `;q=0.9`,
                            i = o(
                                (
                                    await r(`https://theinitium.com/article/${e}/`, {
                                        headers: {
                                            'user-agent': `Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.92 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`,
                                            'accept-language': n,
                                        },
                                    })
                                ).body
                            )(`div.paywall`).html();
                        i && (t += i.replace(`<meta itemprop="isAccessibleForFree" content="false">`, ``));
                    }
                    return t;
                }),
            w = await Promise.all(
                x
                    .filter((e) => e.article)
                    .slice(0, g === s ? 25 : x.length)
                    .map(async (e) => {
                        ((e.article.date = n(e.article.date)), (e.article.updated = n(e.article.updated)));
                        let t = await C(e.article.slug);
                        return {
                            title: e.article.headline,
                            author: e.article.authors.length > 0 ? e.article.authors.map((e) => e.name).toString() : e.article.byline,
                            category: e.article.channels.filter((e) => !e.homepage).map((e) => e.name),
                            description: t,
                            link: new URL(e.article.url, `https://theinitium.com`).href,
                            pubDate: e.article.date,
                            updated: e.article.updated,
                            guid: t.endsWith(`内容为空，请稍后再来`) ? e.article.uuid + `-I-am-empty` : e.article.uuid,
                        };
                    })
            );
        return { title: `端传媒 - ${b}`, link: p, icon: `https://theinitium.com/misc/about/logo192.png`, item: w, image: S };
    };
export { c as t };
