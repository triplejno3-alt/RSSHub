import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/international/:subpath{.+}`, name: `Unknown`, maintainers: [], handler: a };
async function a(i) {
    let a = i.req.param(`subpath`),
        o = `http://international.xjtu.edu.cn`,
        s = `${o}/${a.split(`.`)[0]}.htm`,
        c = r((await n(s)).data),
        l = c(`div.pageTitle`).text(),
        u = c(`.news-list-a > .c`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`a`).attr(`title`), pubDate: t(e.find(`p.list-time`).text()), link: new URL(e.find(`a`).attr(`href`), o).href })),
        d = await Promise.all(u.map((t) => e.tryGet(t.link, async () => (new URL(t.link).pathname.startsWith === `/content.jsp` || (t.description = r((await n(t.link)).data)(`div.ctnCont`).html()), t))));
    return { title: `西安交通大学国际处 - ${l}`, link: s, description: `西安交通大学国际处 - ${l}`, item: d };
}
export { i as route };
