import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { n } from './utils-7RMq-xOX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/sports/:type?`, name: `新浪体育`, categories: [`new-media`], example: `/sports`, parameters: { type: `类别` }, maintainers: [`nczitzk`], handler: a };
async function a(i) {
    let a = i.req.param(`type`),
        o = `https://sports.sina.com.cn/others/${a}.shtml`,
        s = `ul.list2 li a`;
    a === `ufc` ? ((o = `http://roll.sports.sina.com.cn/s_ufc_all/index.shtml`), (s = `#d_list ul li span a`)) : (a === `winter` || a === `horse`) && ((o = `https://sports.sina.com.cn/${a}/`), (s = `[class^=news-list] .list li a`));
    let c = r((await t({ method: `get`, url: o })).data),
        l = c(s)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.text(), link: e.attr(`href`).replace(`http://`, `https://`) })),
        u = await Promise.all(l.map((t) => n(t, e.tryGet)));
    return { title: `${c(`title`).text().split(`_`)[0]} - 新浪体育`, description: c(`meta[name="description"]`).attr(`content`), link: o, item: u };
}
export { i as route };
