import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
        title: { en: `Hong Kong Centre for Health Protection`, zh_cn: `香港卫生防护中心`, zh_tw: `香港衛生防護中心` },
        important_ft: { en: `Important Topics`, zh_cn: `重要资讯`, zh_tw: `重要資訊` },
        press_data_index: { en: `Press Releases`, zh_cn: `新闻稿`, zh_tw: `新聞稿` },
        ResponseLevel: { en: `Response Level`, zh_cn: `应变级别`, zh_tw: `應變級別` },
        publication: { en: `Periodicals & Publications`, zh_cn: `期刊及刊物`, zh_tw: `期刊及刊物` },
        HealthAlert: { en: `Health Notice`, zh_cn: `健康通告`, zh_tw: `健康通告` },
    },
    a = { path: `/chp/:category?/:language?`, radar: [{ source: [`dh.gov.hk/`] }], name: `Unknown`, maintainers: [`nczitzk`], handler: o, url: `dh.gov.hk/` };
async function o(a) {
    let o = { en: `en`, zh_cn: `sc`, zh_tw: `tc` },
        s = a.req.param(`category`) ?? `important_ft`,
        c = a.req.param(`language`) ?? `zh_tw`,
        l = `https://www.chp.gov.hk`,
        u = `${l}/js/${s}.js`,
        d = `${l}/${o[c]}${s === `press_data_index` ? `/media/116` : ``}/index.html`,
        f = await n({ method: `get`, url: u }),
        p = JSON.parse(f.data.match(/"data":(\[{.*}])}/)[1]).map((e) => {
            let n = ``;
            return (
                (n = e.UrlPath_en
                    ? e[`UrlPath_${c}`].includes(`http`)
                        ? e[`UrlPath_${c}`]
                        : `${l}${e[`UrlPath_${c}`]}`
                    : s === `ResponseLevel` && e.FilePath_en
                      ? e[`FilePath_${c}`].includes(`http`)
                          ? e[`FilePath_${c}`]
                          : `${l}${e[`FilePath_${c}`]}`
                      : `${l}/${o[c]}/${s === `publication` ? `guideline` : `features`}/${e.InfoBlockID}.html`),
                { link: n, pubDate: t(e.PublishDate), description: e[`Content_${c}`] ?? ``, title: e[`Title_${c}`]?.replace(/<.*>/, ``) ?? `` }
            );
        }),
        m = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    if ((s === `important_ft` || s === `press_data_index`) && (t.link.indexOf(`htm`) > 0 || t.link.indexOf(`/features/`) > 0)) {
                        let e = r((await n({ method: `get`, url: t.link })).data);
                        (e(`#btmNav, script`).remove(), e(`.contHeader, .title_display_date`).remove(), e(`.printBtn, .bookmarkBtn, .qrBtn, .qr-content`).remove(), (t.description = e(`#mainContent, #pressrelease`).html()));
                    }
                    return t;
                })
            )
        );
    return { title: `${i[s][c]} - ${i.title[c]}`, link: d, item: m };
}
export { a as route };
