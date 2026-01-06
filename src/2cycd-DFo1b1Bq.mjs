import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
const o = { path: `/:fid/:sort?`, name: `Unknown`, maintainers: [`shelken`], handler: s };
async function s(o) {
    let s = `http://www.2cycd.com/forum.php?mod=forumdisplay&fid=${o.req.param(`fid`) ?? `43`}&orderby=${o.req.param(`sort`) ?? `dateline`}`,
        c = await n(s, { responseType: `buffer` }),
        l = i(a.decode(c.data, `gbk`)),
        u = l(`tbody[id^="normalthread_"]`)
            .toArray()
            .map((e) => {
                e = l(e);
                let t = e.find(`a.s.xst`),
                    n = e.find(`td.by cite a`).eq(0).text();
                return { title: t.text(), link: t.attr(`href`), author: n };
            }),
        d = await Promise.all(
            u.map((o) =>
                e.tryGet(o.link, async () => {
                    let e = await n(o.link, { responseType: `buffer` }),
                        s = i(a.decode(e.data, `gbk`)),
                        c = s(`td[id^="postmessage_"]`).first(),
                        l = s(`em[id^="authorposton"]`).first();
                    return ((o.description = c.html()), (o.pubDate = r(t(l.find(`span`).attr(`title`), `YYYY-M-D HH:mm:ss`), 8)), o);
                })
            )
        );
    return { title: l(`title`).text(), link: s, item: d };
}
export { o as route };
