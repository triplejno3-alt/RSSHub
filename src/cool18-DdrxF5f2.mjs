import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:id?/:type?/:keyword?`,
    url: `cool18.com`,
    example: `cool18.com/bbs4`,
    parameters: {
        id: `the name of the bbs`,
        type: 'the type of the post. Can be `home`, `gold` or `threadsearch`. Default: `home`',
        keyword: `the keyword to search.`,
        pageSize: `the number of posts to fetch. If the type is not in search, you can type any words. Default: 10`,
    },
    categories: [`bbs`],
    radar: [{ source: [`cool18.com/:id/`], target: `/:id/:type?/:keyword?` }],
    name: `禁忌书屋`,
    maintainers: [`nczitzk`, `Gabrlie`],
    handler: a,
    features: { nsfw: !0 },
};
async function a(i) {
    let { id: a = `bbs4`, type: o = `home`, keyword: s } = i.req.param(),
        c = `https://www.cool18.com/` + a + `/index.php`,
        l = c + (o === `home` ? `` : o === `gold` ? `?app=forum&act=gold` : `?action=search&act=threadsearch&app=forum&keywords=${s}&submit=查询`),
        u = r(await e(l)),
        d = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 20,
        f =
            o === `home`
                ? JSON.parse(
                      u(`script:contains("_PageData")`)
                          .text()
                          .match(/const\s+_PageData\s*=\s*(\[[\s\S]*?]);/)?.[1] || `[]`
                  )
                      .slice(0, d)
                      .map((e) => ({ title: e.subject, link: `${c}?app=forum&act=threadview&tid=${e.tid}`, pubDate: n(e.dateline, `MM/DD/YY`), author: e.username, category: e.type, description: `` }))
                : u(`#d_list ul li, #thread_list li, .t_l .t_subject`)
                      .slice(0, d)
                      .toArray()
                      .map((e) => {
                          let t = u(e).find(`a`).first();
                          return { title: t.text(), link: `${c}/${t.attr(`href`)}`, pubDate: n(u(e).find(`i`).text(), `MM/DD/YY`), author: u(e).find(`a`).last().text(), category: t.find(`span`).first().text(), description: `` };
                      }),
        p = await Promise.all(
            f.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link))(`pre`);
                    if (t.length > 0) {
                        let e = t.html();
                        n.description = e ? e.replaceAll(/<font color="#E6E6DD">cool18.com<\/font>/g, ``) : ``;
                    }
                    return n;
                })
            )
        );
    return { title: u(`title`).text(), link: l, item: p };
}
export { i as route };
