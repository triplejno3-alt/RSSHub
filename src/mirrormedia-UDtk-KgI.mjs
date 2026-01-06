import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './utils-B7_sb6EJ.mjs';
const r = { path: `/`, categories: [`traditional-media`], example: `/mirrormedia`, parameters: {}, name: `首页`, maintainers: [`dzx-dzx`], radar: [{ source: [`mirrormedia.mg`] }], handler: i };
async function i(r) {
    let i = `https://www.mirrormedia.mg`,
        a = await e(`https://v3-statics.mirrormedia.mg/files/json/post_external01.json`),
        o = [...a.choices.map((e) => ({ __from: `choices`, ...e })), ...a.latest.map((e) => ({ __from: `latest`, ...e }))]
            .map((e) => ({ title: e.title, pubDate: t(e.publishedDate), category: [...(e.sections ?? []).map((e) => e.name), e.__from], link: `${i}/${e.style === `` ? `external` : `story`}/${e.slug}` }))
            .slice(0, r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 20);
    return { title: `鏡週刊 Mirror Media`, link: i, item: await Promise.all(o.map((e) => n(e))) };
}
export { r as route };
