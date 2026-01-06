import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { n, r, t as i } from './utils-B1TuH4pn.mjs';
async function a(a) {
    let o = a.req.path.replace(`/taptap`, ``).startsWith(`/intl/`),
        s = a.req.param(`id`),
        c = a.req.param(`lang`) ?? (o ? `en_US` : `zh_CN`),
        l = `${r(o)}/app/${s}`,
        u = await n(s, c, o),
        d = u.app.icon.original_url,
        f = u.app.title,
        p = `${f}${u.app.developers ? ` by` + u.app.developers.map((e) => e.name).join(` & `) : ``}`,
        m = (await e(`${r(o)}/webapiv2/apk/v1/list-by-app?app_id=${s}&from=0&limit=10&${i(c)}`, { headers: { Referer: l } })).data.list;
    return {
        title: `TapTap 更新记录 ${f}`,
        description: p,
        link: l,
        image: d,
        item: m.map((e) => ({ title: `${f} / ${e.version_label}`, description: e.whatsnew.text, pubDate: t(e.update_date, `X`), link: l, guid: e.version_label })),
    };
}
export { a as t };
