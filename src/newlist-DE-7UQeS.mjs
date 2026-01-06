import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/newlist`, categories: [`study`], example: `/ncpssd/newlist`, radar: [{ source: [`ncpssd.cn/`, `ncpssd.cn/newlist`] }], name: `最新文献`, maintainers: [`LyleLee`], handler: a, url: `ncpssd.cn/` };
async function a() {
    let i = `https://www.ncpssd.cn`,
        a = `/newlist?type=0`,
        o = (await n({ method: `get`, url: i + a })).data,
        s = r(o),
        c = s(`.news-list > li`)
            .toArray()
            .map((e) => {
                let t = s(e)
                        .find(`a`)
                        .text()
                        .replaceAll(/(\r\n|\n|\r)/gm, ``)
                        .trim(),
                    n =
                        i +
                        s(e)
                            .find(`a`)
                            .attr(`onclick`)
                            ?.match(/\('(.*?)'\)/)?.[1],
                    r = new URL(n);
                return { title: t, link: n, lngid: r.searchParams.get(`id`), type: r.searchParams.get(`typename`), pageType: r.searchParams.get(`nav`) };
            }),
        l = await Promise.all(
            c.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = { Accept: `application/json, text/javascript, */*; q=0.01`, 'Content-Type': `application/json; charset=UTF-8` },
                        i = { lngid: r.lngid, type: r.type, pageType: r.pageType },
                        a = await n.post(`https://www.ncpssd.cn/articleinfoHandler/getjournalarticletable`, { headers: e, json: i, responseType: `json` });
                    return { title: r.title, link: r.link, author: a.data.data.showwriter, description: a.data.data.remarkc, pubDate: t(a.data.data.publishDateTime) };
                })
            )
        );
    return { title: `国家哲学社会科学文献中心`, link: i + a, item: l };
}
export { i as route };
