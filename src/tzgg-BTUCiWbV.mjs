import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/beijing/jw/tzgg`,
    categories: [`government`],
    example: `/gov/beijing/jw/tzgg`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jw.beijing.gov.cn/tzgg`] }],
    name: `通知公告`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `jw.beijing.gov.cn/tzgg`,
};
async function o() {
    let a = `http://jw.beijing.gov.cn`,
        o = `${a}/tzgg`,
        s = i((await n({ method: `get`, url: o })).data),
        c = s(`.col-md a`)
            .toArray()
            .map((e) => {
                e = s(e);
                let n = e.attr(`href`);
                return { title: e.text(), link: n.startsWith(`http`) ? n : `${a}${n.replace(/^\./, `/tzgg`)}`, pubDate: t(e.parent().find(`span`).text()) };
            });
    return (
        (c = await Promise.all(
            c.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data),
                        o = e(`meta[name="PubDate"]`).attr(`content`);
                    return ((a.author = e(`meta[name="ContentSource"]`).attr(`content`)), (a.pubDate = o ? r(t(e(`meta[name="PubDate"]`).attr(`content`)), 8) : a.pubDate), (a.description = e(`.TRS_UEDITOR`).html()), a);
                })
            )
        )),
        { title: `北京市教育委员会 - 通知公告`, link: o, item: c, description: s(`meta[name="ColumnDescription"]`).attr(`content`) }
    );
}
export { a as route };
