import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { n, r, t as i } from './utils-B1TuH4pn.mjs';
const a = (e, t) => (e ? (t === `helpful` || t === `recent` ? `type=${t}` : `type=helpful`) : t === `new` || t === `hot` ? `sort=${t}` : `sort=hot`),
    o = async (n) => {
        let o = n.id,
            s = n.order ?? `hot`,
            c = n.lang ?? `zh_CN`,
            l = `${r(!1)}/webapiv2/review/v2/list-by-app?app_id=${o}&limit=10`;
        return (
            (l += `&${a(!1, s)}`),
            (l += `&${i(c)}`),
            (await e(l)).data.list.map((e) => {
                let n = e.moment.author.user.name;
                return {
                    title: `${n} - ${e.moment.review.score}星`,
                    author: n,
                    description: e.moment.review.contents.text + (e.moment.review.contents.images ? e.moment.review.contents.images.map((e) => `<img src="${e.original_url}">`).join(``) : ``),
                    link: `${r(!1)}/review/${e.moment.review.id}`,
                    pubDate: t(e.moment.publish_time, `X`),
                };
            })
        );
    },
    s = async (n) => {
        let o = n.id,
            s = n.order ?? `helpful`,
            c = n.lang ?? `en_US`,
            l = `${r(!0)}/webapiv2/feeds/v3/by-app?app_id=${o}&limit=10`;
        return (
            (l += `&${a(!0, s)}`),
            (l += `&${i(c)}`),
            (await e(l)).data.list.map((e) => {
                let n = e.post.user.name,
                    i = e.post.list_fields.app_ratings[o].score;
                return { title: `${n} - ${`★`.repeat(i)}`, author: n, description: e.post.list_fields.summary || e.post.list_fields.title, link: `${r(!0)}/post/${e.post.id_str}`, pubDate: t(e.post.published_time, `X`) };
            })
        );
    };
async function c(e) {
    let t = e.req.path.replace(`/taptap`, ``).startsWith(`/intl/`),
        i = e.req.param(`id`),
        c = e.req.param(`order`) ?? `default`,
        l = e.req.param(`lang`) ?? (t ? `en_US` : `zh_CN`),
        u = await n(i, l, t),
        d = u.app.icon.original_url,
        f = u.app.title,
        p = t ? await s({ id: i, order: c, lang: l }) : await o({ id: i, order: c, lang: l });
    return { title: `TapTap 评价 ${f}`, link: `${r(t)}/app/${i}/review?${a(t, c)}`, image: d, item: p };
}
export { c as t };
