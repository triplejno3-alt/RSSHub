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
    path: `/news/:site?/:id?/:keyword?`,
    radar: [{ source: [`club.6parkbbs.com/:id/index.php`, `club.6parkbbs.com/`], target: `/:id?` }],
    name: `新闻栏目`,
    maintainers: [`nczitzk`, `cscnk52`],
    parameters: { site: `分站，可选newspark、local，默认为 newspark`, id: `栏目 id，可选，默认为空`, keyword: `关键词，可选，默认为空` },
    description:
        '::: tip 提示\n若订阅 [时政](https://www.6parknews.com/newspark/index.php?type=1)，其网址为 <https://www.6parknews.com/newspark/index.php?type=1>，其中 `newspark` 为分站，`1` 为栏目 id。\n若订阅 [美国](https://local.6parknews.com/index.php?type_id=1)，其网址为 <https://local.6parknews.com/index.php?type_id=1>，其中 `local` 为分站，`1` 为栏目 id。\n:::',
    handler: o,
};
async function o(a) {
    let o = a.req.param(`site`) ?? `newspark`,
        s = a.req.param(`id`) ?? ``,
        c = a.req.param(`keyword`) ?? ``,
        l = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 50,
        u = o === `local`,
        d = `https://${u ? o : `www`}.6parknews.com`,
        f = `${`${d}${u ? `` : `/newspark`}/index.php`}${c ? `?act=newssearch&app=news&keywords=${c}&submit=查询` : s ? (Number.isNaN(s) ? `?act=${s}` : u ? `?type_id=${s}` : `?type=${s}`) : ``}`,
        p = i((await n({ method: `get`, url: f })).data),
        m = p(`#d_list ul li, #thread_list li, .t_l .t_subject`)
            .toArray()
            .slice(0, l)
            .map((e) => {
                e = p(e);
                let t = e.find(`a`).first(),
                    n = t.attr(`href`);
                return { title: t.text(), link: n.startsWith(`http`) ? n : `${d}/${n.startsWith(`view`) ? `newspark/${n}` : n}` };
            });
    return (
        (m = await Promise.all(
            m
                .filter((e) => /6parknews\.com/.test(e.link))
                .map((a) =>
                    e.tryGet(a.link, async () => {
                        try {
                            let e = await n({ method: `get`, url: a.link }),
                                o = i(e.data),
                                s = e.data.match(/新闻来源:(.*?)于.*(\d{4}(?:-\d{2}){2} (?:\d{1,2}:){2}\d{1,2})/);
                            ((a.title = o(`h2`).text()), (a.author = s[1].trim()), (a.pubDate = r(t(s[2], `YYYY-MM-DD h:m`), 8)), (a.description = o(`#shownewsc`).html().replaceAll(`<p></p>`, ``)));
                        } catch {}
                        return a;
                    })
                )
        )),
        { title: p(`title`).text(), link: f, item: m }
    );
}
export { a as route };
