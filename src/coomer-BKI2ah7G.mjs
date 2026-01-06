import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = { Accept: `text/css` },
    c = {
        path: `/:source?/:id?`,
        categories: [`multimedia`],
        example: `/coomer`,
        parameters: { source: `Source, see below, Posts by default`, id: `User id, can be found in URL` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        radar: [
            { source: [`coomer.st/`], target: `` },
            { source: [`coomer.st/:source/user/:id`], target: `/:source/:id` },
        ],
        name: `Posts`,
        maintainers: [`nczitzk`, `AiraNadih`],
        handler: l,
        description: `Sources

| Posts | OnlyFans | Fansly | CandFans |
| ----- | -------- | ------- | -------- |
| posts | onlyfans | fansly   | candfans |

::: tip
  When \`posts\` is selected as the value of the parameter **source**, the parameter **id** does not take effect.
  There is an optinal parameter **limit** which controls the number of posts to fetch, default value is 25.
:::`,
    };
async function l(n) {
    let r = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 25,
        i = n.req.param(`source`) ?? `posts`,
        o = n.req.param(`id`),
        c = i === `posts`,
        l = `https://coomer.st`,
        f = `${l}/api/v1`,
        p = await t({ method: `get`, url: c ? `${f}/posts` : `${f}/${i}/user/${o}/posts`, headers: s }),
        m = c ? p.data.posts : p.data,
        h = c ? `` : await d(`${f}/${i}/user/${o}`),
        g = c ? `Coomer Posts` : `Posts of ${h} from ${i} | Coomer`,
        _ = c ? `${l}/favicon.ico` : `https://img.coomer.st/icons/${i}/${o}`,
        v = m
            .filter((e) => e.content || e.attachments)
            .slice(0, r)
            .map((t) => {
                ((t.files = []), `path` in t.file && t.files.push({ name: t.file.name, path: t.file.path, extension: t.file.path.replace(/.*\./, ``).toLowerCase() }));
                for (let e of t.attachments) t.files.push({ name: e.name, path: e.path, extension: e.path.replace(/.*\./, ``).toLowerCase() });
                let n = a(u(t)),
                    r = n(`img, a, audio, video`).map(function () {
                        return n(this).prop(`outerHTML`);
                    }),
                    i = ``;
                (t.content && (i += `<div>${t.content}</div>`), (n = a(i)));
                let o = 0,
                    s = /downloads.fanbox.cc/;
                (n(`a`).each(function () {
                    let e = n(this).attr(`href`);
                    s.test(e) && (o++, n(this).replaceWith(r[o]));
                }),
                    (i = (r.length > 0 ? r[0] : ``) + n.html()));
                for (let e of r.slice(o + 1)) i += e;
                let c = {};
                return (
                    a(i)(`audio source, video source`).each(function () {
                        let e = n(this).attr(`src`) ?? ``,
                            t = { m4a: `audio/mp4`, mp3: `audio/mpeg`, mp4: `video/mp4` }[e.replace(/.*\./, ``).toLowerCase()] || null;
                        t !== null && (c = { enclosure_url: new URL(e, l).toString(), enclosure_type: t });
                    }),
                    { title: t.title || e(t.published), description: i, author: h, pubDate: e(t.published), guid: `coomer:${t.service}:${t.user}:post:${t.id}`, link: `${l}/${t.service}/user/${t.user}/post/${t.id}`, ...c }
                );
            });
    return { title: g, image: _, link: c ? `${l}/posts` : `${l}/${i}/user/${o}`, item: v };
}
const u = (e) =>
    o(
        i(n, {
            children: [
                e.files?.map((e, t) =>
                    [`jpg`, `png`, `webp`, `jpeg`, `jfif`].includes(e.extension)
                        ? r(`img`, { src: e.path }, `image-${t}`)
                        : [`m4a`, `mp3`, `ogg`].includes(e.extension)
                          ? r(`audio`, { controls: !0, children: r(`source`, { src: e.path, type: `audio/${e.extention}` }) }, `audio-${t}`)
                          : [`mp4`, `webm`].includes(e.extension)
                            ? r(`video`, { controls: !0, children: r(`source`, { src: e.path, type: `video/${e.extention}` }) }, `video-${t}`)
                            : r(`a`, { href: e.path, children: e.name }, `file-${t}`)
                ),
                e.embed
                    ? i(n, {
                          children: [
                              e.embed.type === `image` ? r(`img`, { src: e.embed.thumbnail?.proxy_url }) : null,
                              e.embed.type === `link`
                                  ? i(n, {
                                        children: [
                                            e.embed.thumbnail ? r(`a`, { href: e.embed.thumbnail.url, children: r(`img`, { src: e.embed.thumbnail.proxy_url }) }) : null,
                                            r(`a`, { href: e.embed.url, children: e.embed.title }),
                                            e.embed.description ? r(`p`, { children: e.embed.description }) : null,
                                        ],
                                    })
                                  : null,
                          ],
                      })
                    : null,
            ],
        })
    );
async function d(e) {
    return (await t({ method: `get`, url: `${e}/profile`, headers: s })).data.name;
}
export { c as route };
