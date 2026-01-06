import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = `https://xsijishe.com`,
    o = {
        path: `/forum/:fid`,
        categories: [`bbs`],
        example: `/xsijishe/forum/51`,
        parameters: { fid: `子论坛 id` },
        features: {
            requireConfig: [
                { name: `XSIJISHE_COOKIE`, description: `` },
                { name: `XSIJISHE_USER_AGENT`, description: `` },
            ],
            requirePuppeteer: !1,
            antiCrawler: !1,
            supportBT: !1,
            supportPodcast: !1,
            supportScihub: !1,
            nsfw: !0,
        },
        name: `论坛`,
        maintainers: [`akynazh`],
        handler: s,
        description: '::: tip 关于子论坛 id 的获取方法\n  `/xsijishe/forum/51` 对应于论坛 `https://xsijishe.com/forum-51-1.html`，这个论坛的 fid 为 51，也就是 `forum-{fid}-1` 中的 fid。\n:::',
    };
async function s(o) {
    let s = `${a}/forum-${o.req.param(`fid`)}-1.html`,
        c = { 'Accept-Encoding': `gzip, deflate, br`, 'Accept-Language': `zh-CN,zh;q=0.9,en;q=0.8`, Cookie: e.xsijishe.cookie, 'User-Agent': e.xsijishe.userAgent },
        l = i((await r(s, { headers: c })).data),
        u = l(`.nex_bkinterls_top .nex_bkinterls_ls a`).text(),
        d = l(`[id^="normalthread"]`)
            .toArray()
            .map((e) => {
                e = l(e);
                let t = e.find(`.nex_author_btms`),
                    r = e.find(`.nex_forumtit_top a`).first(),
                    i = t.find(`.nex_ftdate`),
                    o = i.find(`span`).length > 0 ? i.find(`span`).attr(`title`) : i.text().replace(`发表于`, ``);
                return { title: r.text().trim(), pubDate: n(o.trim()), category: t.find(`em a`).text().trim(), link: a + `/` + r.attr(`href`), author: e.find(`.nex_threads_author`).find(`a`).text().trim() };
            });
    return (
        (d = await Promise.all(
            d.map((e) =>
                t.tryGet(e.link, async () => {
                    let t = i((await r(e.link, { headers: c })).data),
                        n = t(`.t_f`).first();
                    return (
                        n.find(`img`).each((e, n) => {
                            ((n = t(n)), n.attr(`zoomfile`) && (n.attr(`src`, n.attr(`zoomfile`)), n.removeAttr(`zoomfile`), n.removeAttr(`file`)), n.removeAttr(`onmouseover`));
                        }),
                        (e.description = n.html()),
                        e
                    );
                })
            )
        )),
        { title: `司机社${u}论坛`, link: s, description: `司机社${u}论坛`, item: d }
    );
}
export { o as route };
