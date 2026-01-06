import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = { en: (e) => `${e} images in total`, zh: (e) => `共${e}张图`, 'zh-tw': (e) => `共${e}張圖`, ko: (e) => `총 ${e}개의 이미지`, ja: (e) => `計${e}枚の画像` };
function s(t, n) {
    return (
        t(`.am__work__user-icon-container`).remove(),
        t(`.am__work__title`).attr(`style`, `display: inline;`),
        t(`.am__work__user-name`).attr(`style`, `display: inline; margin-left: 10px;`),
        t(`.mic__label`).each((e, r) => {
            let i = t(r),
                a = i.text();
            (i
                .parentsUntil(`.am__work`)
                .last()
                .parent()
                .find(`.am__work__title-container`)
                .append(`<p style="float: right; margin: 0;">${o[n](a)}</p>`),
                i.remove());
        }),
        t(`.article-item, ._feature-article-body__pixiv_illust`).after(`<br>`),
        t(`.arc__thumbnail-label`).remove(),
        t(`.arc__footer-container`).remove(),
        t(`article._article-card`).each((e, n) => {
            let r = t(n),
                i = r.find(`._thumbnail`),
                a = i.attr(`style`)?.match(/url\((.*?)\)/),
                o = a ? a[1] : ``;
            (i.remove(), o && r.prepend(`<img src="${o}" alt="Article thumbnail">`));
        }),
        t(`.fab__script`).each((e, n) => {
            let r = t(n),
                i = r.find(`blockquote > a`).attr(`href`);
            if (i) {
                let e = i.match(/\/status\/(\d+)/);
                if (e) {
                    let t = e[1];
                    (r.html(`
                <iframe
                    scrolling="no"
                    frameborder="0"
                    allowtransparency="true"
                    allowfullscreen="true"
                    class=""
                    style="position: static; visibility: visible; display: block; width: 550px; height: 1000px; flex-grow: 1;"
                    title="X Post"
                    src="https://platform.twitter.com/embed/Tweet.html?id=${t}"
                ></iframe>
            `),
                        r.find(`blockquote`).remove());
                }
            }
        }),
        t(`.am__body`)
            .html()
            ?.replaceAll(`https://i.pximg.net`, e.pixiv.imgProxy || ``) || ``
    );
}
const c = {
    path: `/:lang/:category?`,
    categories: [`anime`],
    view: i.Articles,
    example: `/pixivision/zh-tw`,
    parameters: { lang: `Language`, category: `Category` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Category`,
    maintainers: [`SnowAgar25`],
    description: '::: tip\n  `https://www.pixivision.net/zh-tw/c/interview` → `/pixivision/zh-tw/interview`\n:::',
    radar: [
        { source: [`www.pixivision.net/:lang`], target: `/:lang` },
        { source: [`www.pixivision.net/:lang/c/:category`], target: `/:lang/:category` },
    ],
    handler: l,
};
async function l(e) {
    let { lang: i, category: o } = e.req.param(),
        c = `https://www.pixivision.net`,
        l = o ? `${c}/${i}/c/${o}` : `${c}/${i}`,
        u = { headers: { Cookie: `user_lang=${i.replace(`-`, `_`)}` } },
        { data: d } = await r(l, u),
        f = a(d),
        p = f(`li.article-card-container a[data-gtm-action="ClickTitle"]`)
            .toArray()
            .map((e) => ({ title: f(e).text(), link: new URL(f(e).attr(`href`) ?? ``, c).href })),
        m = await Promise.all(
            p.map(
                async (e) =>
                    await t.tryGet(e.link, async () => {
                        let { data: t } = await r(e.link, u),
                            o = a(t),
                            c = s(o, i);
                        return { title: e.title, description: c, link: e.link, pubDate: n(o(`time`).attr(`datetime`) ?? ``) };
                    })
            )
        );
    return { title: `${f(`.ssc__header`).length ? f(`.ssc__header`).text() : `New`} - pixivision`, link: l, item: m.filter((e) => !!e) };
}
export { c as route };
