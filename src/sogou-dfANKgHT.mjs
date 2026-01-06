import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { n as r } from './wechat-mp-HNgcLN2K.mjs';
import { load as i } from 'cheerio';
const a = `https://weixin.sogou.com`,
    o = `SNUID=78725B470A0EF2C3F97AA5EB0BBF95C1; ABTEST=0|1680917938|v1; SUID=8F7B1C682B83A20A000000006430C5B2; PHPSESSID=le2lak0vghad5c98ijd3t51ls4; IPLOC=USUS5`;
async function s(r) {
    let s = `${a}/weixin`,
        c;
    try {
        c = { data: await e(s, { query: { ie: `utf8`, s_from: `input`, _sug_: `n`, _sug_type_: `1`, type: `2`, query: r, page: `1` }, headers: { Referer: a, Cookie: o } }) };
    } catch (e) {
        return (t.error(`Failed to fetch Sogou search for ${r}: ${e instanceof Error ? e.message : String(e)}`), []);
    }
    let l = i(c.data),
        u = l(`ul.news-list > li`)
            .toArray()
            .map(async (i) => {
                let c = l(i),
                    u = c.find(`h3 > a`).text().trim(),
                    d = c.find(`h3 > a`).attr(`href`);
                if (!d) return (t.warn(`Skipping item with missing link for wechatId: ${r}`), null);
                let f = a + d,
                    p = c.find(`p.txt-info`).text().trim(),
                    m = c
                        .find(`span.s2 script`)
                        .html()
                        ?.match(/timeConvert\('(\d+)'\)/),
                    h = m ? n(Number.parseInt(m[1]) * 1e3) : void 0,
                    g = f;
                try {
                    let n = (await e.raw(f, { headers: { Referer: s, Cookie: o }, redirect: `manual`, ignoreResponseError: !0 })).headers?.get(`location`);
                    if (n) {
                        if (!n.startsWith(`http`))
                            try {
                                n = new URL(n, f).toString();
                            } catch (e) {
                                (t.warn(`Invalid redirect location "${n}" for title "${u}" (wechatId: ${r}): ${e instanceof Error ? e.message : String(e)}`), (n = null));
                            }
                        if (typeof n == `string` && n)
                            if (n.startsWith(`http://mp.weixin.qq.com`) || n.startsWith(`https://mp.weixin.qq.com`)) g = n;
                            else
                                try {
                                    let t = (await e.raw(n, { headers: { Referer: f, Cookie: o }, redirect: `manual`, ignoreResponseError: !0 })).headers?.get(`location`);
                                    t && (t.startsWith(`http://mp.weixin.qq.com`) || t.startsWith(`https://mp.weixin.qq.com`)) && (g = t);
                                } catch (e) {
                                    t.warn(`Failed to resolve intermediate redirect for title "${u}" (wechatId: ${r}): ${e instanceof Error ? e.message : String(e)}`);
                                }
                    } else t.debug(`No redirect location found for title "${u}" (wechatId: ${r})`);
                } catch (e) {
                    let n = e instanceof Error ? e.message : String(e);
                    typeof e == `object` && e && `response` in e && typeof e.response == `object` && e.response !== null && `status` in e.response
                        ? t.debug(`Redirect request failed for "${u}" (wechatId: ${r}) with status ${e.response.status}: ${n}`)
                        : t.debug(`Redirect request failed for "${u}" (wechatId: ${r}): ${n}`);
                }
                let _ = g.startsWith(`http://mp.weixin.qq.com`) || g.startsWith(`https://mp.weixin.qq.com`),
                    v = c.find(`span.all-time-y2`).text().trim();
                return { title: u, link: g, description: p, author: v, pubDate: h, guid: g, _internal: { isWeChatLink: _ } };
            });
    return (await Promise.all(u)).filter((e) => e !== null);
}
const c = {
    path: `/sogou/:id`,
    categories: [`new-media`],
    example: `/wechat/sogou/qimao0908`,
    parameters: { id: `公众号 id, 打开 weixin.sogou.com 并搜索相应公众号， 在 URL 中找到 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `公众号（搜狗来源）`,
    maintainers: [`EthanWng97`, `pseudoyu`],
    handler: l,
};
async function l(e) {
    let n = e.req.param(`id`),
        i = await s(n),
        o = i[0]?.author || n,
        c = i.map(async (e) => {
            let n = e;
            if (e._internal.isWeChatLink)
                try {
                    n = await r(e);
                } catch (n) {
                    t.debug(`finishArticleItem failed for ${e.link}: ${n instanceof Error ? n.message : String(n)}`);
                }
            return n && typeof n == `object`
                ? { title: n.title, link: n.link, description: n.description, author: n.author, pubDate: n.pubDate, guid: n.guid, ...(n.content && { content: n.content }) }
                : (t.debug(`Unexpected null or non-object item during final processing for link: ${e?.link}`), null);
        }),
        l = (await Promise.all(c)).filter((e) => e !== null);
    return { title: `${o} 的微信公众号`, link: `${a}/weixin?query=${n}`, description: `${o} 的微信公众号`, item: l };
}
export { c as route };
