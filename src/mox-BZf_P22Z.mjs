import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:category?`,
    categories: [`anime`],
    example: `/mox`,
    parameters: { category: `分类，可在对应分类页 URL 中找到` },
    features: {
        requireConfig: [{ name: `MOX_COOKIE`, optional: !0, description: `注册用户登录后的 Cookie, 可以从浏览器开发者工具Network面板中的mox页面请求获取，Cookie内容形如VOLSKEY=xxxxxx; VLIBSID=xxxxxx; VOLSESS=xxxxxx` }],
        antiCrawler: !0,
    },
    radar: [{ source: [`mox.moe/l/:category`, `mox.moe/`] }],
    name: `首頁`,
    maintainers: [`nczitzk`],
    handler: a,
    description:
        '::: tip\n  在首页将分类参数选择确定后跳转到的分类页面 URL 中，`/l/` 后的字段即为分类参数。\n\n  如 [科幻 + 日語 + 日本 + 長篇 + 完結 + 最近更新](https://mox.moe/l/CAT%2A科幻,日本,完結,lastupdate,jpn,l,BL) 的 URL 为 [https://mox.moe/l/CAT%2A 科幻，日本，完結，lastupdate,jpn,l,BL](https://mox.moe/l/CAT%2A科幻,日本,完結,lastupdate,jpn,l,BL)，此时 `/l/` 后的字段为 `CAT%2A科幻,日本,完結,lastupdate,jpn,l,BL`。最终获得路由为 [`/mox/CAT%2A科幻,日本,完結,lastupdate,jpn,l,BL`](https://rsshub.app/mox/CAT%2A科幻,日本,完結,lastupdate,jpn,l,BL)\n:::\n\n::: warning\n  由于 mox.moe 对非登录用户屏蔽了部分漫画详情内容的获取，且极易触发反爬机制，导致访问ip被重定向至google.com，因此在未配置`MOX_COOKIE`参数的情况下路由只会返回漫画标题和封面，不会对详情内容进行抓取。\n:::',
};
async function a(i) {
    let a = i.req.param(`category`) ?? ``,
        o = `https://mox.moe${a ? `/l/${a}` : ``}`,
        s = e.mox.cookie,
        c = r((await n({ method: `get`, url: o, headers: { cookie: s } })).data),
        l = c(`.listbg td`)
            .toArray()
            .map((e) => {
                let t = c(e).find(`a`).last(),
                    n = t.attr(`href`)?.split(`/`).pop(),
                    r = c(e)
                        .find(`a div div`)
                        .attr(`style`)
                        ?.match(/background:url\((.*?)\)/)?.[1];
                return { title: t.text(), description: r ? `<img src="${r}">` : void 0, link: t.attr(`href`), guid: n };
            })
            .filter((e) => e.guid);
    return (
        s &&
            (l = await Promise.all(
                l.map((e) =>
                    t.tryGet(e.guid, async () => {
                        let t = await n({ method: `get`, url: e.link, headers: { cookie: s } }),
                            i = r(t.data);
                        e.author = i(`.author .text_bglight font a`)
                            .toArray()
                            .map((e) => c(e).text())
                            .filter(Boolean)
                            .join(`、`);
                        let a = i(`.author .text_bglight`).toArray(),
                            o = t.data?.match(/document\.getElementById\("div_desc_content"\)\.innerHTML = "(.*?)";/s)?.[1] ?? ``;
                        return ((e.description = `<img src="${i(`.img_book`).attr(`src`)}"><br>${a.map((e) => c(e).html()).join(`<br>`)}<br>${o}`), e);
                    })
                )
            )),
        { title: `Mox.moe`, link: o, item: l }
    );
}
export { i as route };
