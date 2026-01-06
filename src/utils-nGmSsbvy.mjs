import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = `otobanana.com`,
    c = `https://api.${s}`,
    l = `https://${s}`,
    u = (e, n) =>
        n(`otobanana:user:${e}`, async () => {
            let { data: n } = await t(`${c}/users/${e}/`);
            return n;
        }),
    d = (t) => ({
        title: t.title,
        description: a(
            i(n, {
                children: [
                    r(`img`, { src: t.thumbnail_url }),
                    r(`br`, {}),
                    r(`audio`, { controls: !0, children: r(`source`, { src: t.audio_url, type: `audio/x-m4a` }) }),
                    r(`br`, {}),
                    `💬 ${t.comment_count} ❤️ ${t.like_count} 🍌 ${t.gift_banana} ${t.play_count} 再生`,
                    r(`br`, {}),
                    t.text
                        ? o(
                              t.text.replaceAll(
                                  `
`,
                                  `<br>`
                              )
                          )
                        : null,
                ],
            })
        ),
        pubDate: e(t.created_at),
        link: `https://otobanana.com/cast/${t.id}`,
        author: `${t.user.name} (@${t.user.username})`,
        itunes_item_image: t.thumbnail_url,
        itunes_duration: t.duration_time,
        enclosure_url: t.audio_url,
        enclosure_type: `audio/x-m4a`,
        upvotes: t.like_count,
        comments: t.comment_count,
    }),
    f = (t) => ({
        title: t.title,
        description: t.is_open ? `配信中のライブ` : `終了しました`,
        pubDate: e(t.created_at),
        link: t.room_url,
        guid: `${t.room_url}#${t.id}`,
        author: `${t.user.name} (@${t.user.username})`,
        upvotes: t.like_count,
        comments: t.comment_count,
    }),
    p = ({ id: t, type_label: n, cast: r, message: i }) => {
        switch (n) {
            case `cast`:
                return d(r);
            case `message`:
                return {
                    title: i.text.split(`
`)[0],
                    description: i.text.replaceAll(
                        `
`,
                        `<br>`
                    ),
                    pubDate: e(i.created_at),
                    link: `https://otobanana.com/${n}/${t}`,
                    author: `${i.user.name} (@${i.user.username})`,
                    upvotes: i.like_count,
                    comments: i.comment_count,
                };
            default:
                throw Error(`Unknown post type: ${n}`);
        }
    };
export { f as a, d as i, l as n, p as o, u as r, c as t };
