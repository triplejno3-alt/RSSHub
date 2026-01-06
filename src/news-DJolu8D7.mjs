import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/cn/news/:uid`,
    categories: [`government`],
    example: `/gov/cn/news/bm`,
    parameters: { uid: `分类名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `政府新闻`,
    maintainers: [`EsuRt`, `howfool`],
    handler: s,
    description: `| 政务部门 | 滚动新闻 | 新闻要闻 | 国务院新闻 | 国务院工作会议 | 政策文件 |
| :------: | :------: | :------: | :--------: | :------------: | :------: |
|    bm    |    gd    |    yw    |     gwy    |     gwyzzjg    |  zhengce |`,
};
async function s(o) {
    let s = o.req.param(`uid`),
        c = `https://www.gov.cn`,
        l = ``,
        u = ``,
        d = ``;
    switch (s) {
        case `bm`:
            ((l = `${c}/lianbo/bumen/index.htm`), (u = `中国政府网 - 部门政务`));
            break;
        case `yw`:
            ((l = `${c}/yaowen/index.htm`), (u = `中国政府网 - 新闻要闻`));
            break;
        case `gd`:
            ((l = `${c}/yaowen/index.htm`), (u = `中国政府网 - 滚动新闻`));
            break;
        case `gwy`:
            ((l = `${c}/pushinfo/v150203/`), (u = `中国政府网 - 国务院信息`));
            break;
        case `zhengce`:
            ((l = `http://sousuo.gov.cn/s.htm?t=zhengcelibrary`), (u = `中国政府网 - 政策文件`));
            break;
        case `gwyzzjg`:
            ((l = `${c}/gwyzzjg/huiyi/`), (u = `中国政府网 - 国务院工作会议`));
            break;
        default:
            e.error(`pattern not matched`);
    }
    let f = a((await r.get(l)).data);
    return (
        (d = l.includes(`zhengcelibrary`) ? f(`.dys_middle_result_content_item`) : l.includes(`bumen`) ? f(`.infolist li`) : f(`.news_box .list li:not(.line)`)),
        {
            title: u,
            link: l,
            item: await Promise.all(
                d.toArray().map((e) => {
                    e = f(e);
                    let o = e.find(`a`).attr(`href`);
                    return (
                        (o = o.startsWith(`http`) ? o : new URL(o, l).href),
                        t.tryGet(o, async () => {
                            let t, s, c, l, u, d;
                            if (/dysMiddleResultConItemTitle/g.test(e.html()))
                                o.includes(`content`)
                                    ? ((c = await r.get(o)), (s = a(c.data)), s(`.shuzi`).remove(), s(`#myFlash`).remove(), (t = /pages_content/g.test(s.html()) ? s(`.pages_content`).html() : s(`#UCAP-CONTENT`).html()))
                                    : (t = e.find(`a`).text());
                            else if (o.includes(`content`)) {
                                ((c = await r.get(o)), (s = a(c.data)));
                                let e = s.html();
                                ((l = i(n(s(`meta[name="firstpublishedtime"]`).attr(`content`), `YYYY-MM-DD HH:mm:ss`), 8)),
                                    (u = s(`meta[name="author"]`).attr(`content`)),
                                    (d = s(`meta[name="keywords"]`).attr(`content`).split(/[,;]/)),
                                    /zhengceku/g.test(o) ? (t = s(`.pages_content`).html()) : (s(`.shuzi`).remove(), s(`#myFlash`).remove(), (t = /UCAP-CONTENT/g.test(e) ? s(`#UCAP-CONTENT`).html() : s(`body`).html())));
                            } else t = e.find(`a`).text();
                            return { title: e.find(`a`).text(), description: t, link: o, pubDate: l, author: u, category: d.filter(Boolean) };
                        })
                    );
                })
            ),
        }
    );
}
export { o as route };
