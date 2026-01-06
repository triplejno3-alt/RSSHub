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
    path: `/:id?`,
    categories: [`finance`],
    example: `/barronschina`,
    parameters: { id: `栏目 id，默认为快讯` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`barronschina.com.cn/`], target: `/:category?` }],
    name: `栏目`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `barronschina.com.cn/`,
    description: `::: tip
  栏目 id 留空则返回快讯，在对应页地址栏 \`columnId=\` 后可以看到。
:::`,
};
async function o(a) {
    let o = a.req.param(`id`) ?? ``,
        s = `http://www.barronschina.com.cn`,
        c = `${s}/index/${o ? `column/article?columnId=${o}` : `shortNews`}`,
        l = i((await n({ method: `get`, url: c })).data),
        u = o
            ? await Promise.all(
                  l(`.title`)
                      .toArray()
                      .map((e) => ((e = l(e)), { title: e.find(`.title`).text(), link: `${s}${e.parent().attr(`href`)}` }))
                      .map((a) =>
                          e.tryGet(a.link, async () => {
                              let e = i((await n({ method: `get`, url: a.link })).data);
                              return ((a.description = e(`.cont_main`).html()), (a.pubDate = r(t(e(`.timeTag`).text()), 8)), a);
                          })
                      )
              )
            : l(`dd`)
                  .toArray()
                  .map((e) => {
                      e = l(e);
                      let n = e.find(`strong`).text();
                      e.find(`strong`).remove();
                      let i = e.find(`.short`).html();
                      return (e.find(`.short`).remove(), { title: n, description: i, link: c, pubDate: r(t(`${e.parent().find(`dt`).text()} ${e.text()}`), 8) });
                  });
    return { title: l(`title`).text().split(`，`)[0], link: c, item: u };
}
export { a as route };
