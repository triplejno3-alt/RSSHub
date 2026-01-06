import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ youTube: e, img: r, video: i }) =>
        n(t, {
            children: e
                ? n(`iframe`, { width: `560`, height: `315`, src: `https://www.youtube-nocookie.com/embed/${e}`, frameborder: `0`, allowfullscreen: !0, referrerpolicy: `strict-origin-when-cross-origin` })
                : r
                  ? n(`img`, { src: r })
                  : i
                    ? n(`video`, { src: i, controls: !0 })
                    : null,
        }),
    a = (e) => r(n(i, { ...e })),
    o = `https://meteor.today`,
    s = (t) =>
        t(`meteor:boards`, async () => {
            let { data: t } = await e.post(`${o}/board/get_boards`, { json: { isCollege: `false` } });
            return JSON.parse(decodeURIComponent(t.result)).map((e) => ({
                title: `${e.category ? `${e.category} - ` : ``}${e.name}`,
                description: e.id,
                feedDescription: e.description,
                category: e.articleCategory,
                link: `${o}/board/${e.alias ?? e.name}`,
                alias: e.alias,
                imgUrl: e.imageUrl,
                id: e.id,
            }));
        }),
    c = (e) => {
        let t = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-]+)&?/g,
            n = e.match(t),
            r = e.match(/https:\/\/i.imgur.com\/\w*.(jpg|png|gif|jpeg)/g),
            i = e.match(/(https:\/\/storage\.meteor\.today\/video\/[\da-f]{24}\.)(mp4|mov|avi|flv|wmv|mpeg|mkv)/gi),
            o = e.match(/assets\/images\/stickers\/(duck|ep2|ep1)\/\w*.(jpg|png|gif|jpeg)/g),
            s = e.match(/assets\/images\/emoji\/\w*.(jpg|png|gif|jpeg)/g);
        if ((n && (e = e.replaceAll(t, a({ youTube: `$1` }))), r)) for (let t of r) e = e.replace(t, a({ img: t }));
        if (i) for (let t of i) e = e.replace(t, a({ video: t }));
        if (o) for (let t of o) e = e.replace(t, a({ img: t }));
        if (s) for (let t of s) e = e.replace(t, a({ img: t }));
        return e.replaceAll(
            `
`,
            `<br>`
        );
    };
export { s as n, c as r, o as t };
