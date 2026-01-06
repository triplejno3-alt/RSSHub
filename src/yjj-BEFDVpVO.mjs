import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = { path: [`/sh/yjj/*`, `/shanghai/yjj/*`], name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let s = n(o) === `/sh/yjj` ? `/sh/yjj/zx-ylqx` : n(o),
        c = `https://yjj.sh.gov.cn`,
        l = `${c}${s.replace(/^\/sh\/yjj/, ``)}/index.html`,
        u = a((await r({ method: `get`, url: l })).data),
        d = u(`.pageList li a`)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.attr(`href`);
                return { title: e.text(), pubDate: t(e.next().text()), link: n.startsWith(`http`) ? n : `${c}${n}` };
            });
    return (
        (d = await Promise.all(
            d.map((n) =>
                e.tryGet(n.link, async () => {
                    try {
                        let e = a((await r({ method: `get`, url: n.link })).data),
                            o = e(`meta[name="pubdate"]`).attr(`content`) || e(`meta[name="PubDate"]`).attr(`content`);
                        ((n.description = e(`#ivs_content`).html()), (n.pubDate = i(t(o, [`YYYY-MM-DD HH:mm:ss`, `YYYY-MM-DD HH:mm`]), 8)));
                    } catch {}
                    return n;
                })
            )
        )),
        { title: u(`title`).text().replace(/--/, ` - `), link: l, item: d }
    );
}
export { o as route };
