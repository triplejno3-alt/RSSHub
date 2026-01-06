import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { t as n } from './valid-host-Bsy2BS2p.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { CookieJar as c } from 'tough-cookie';
const l = new c(),
    u = e.extend({ cookieJar: l });
function d(e) {
    let t = new URLSearchParams(e);
    return (t.set(`is_format_data`, `1`), t.set(`is_new_list`, `1`), t.set(`type`, `1`), t.toString());
}
async function f() {
    let e = o(await u(`https://rent.591.com.tw`).text())(`meta[name="csrf-token"]`).attr(`content`);
    if (!e) throw Error(`CSRF token not found`);
    return e;
}
async function p(e) {
    let t = await f(),
        {
            data: { data: n },
        } = await u({ url: e, headers: { 'X-CSRF-TOKEN': t } }).json();
    return n;
}
const m = (e) => {
        let t = e.photo_list.slice(1);
        return s(
            a(r, {
                children: [
                    i(`img`, { src: e.photo_list[0], style: `margin-bottom: 20px;` }),
                    a(`table`, {
                        children: [
                            a(`tr`, { children: [i(`td`, { children: `類型` }), i(`td`, { children: e.kind_name })] }),
                            a(`tr`, { children: [i(`td`, { children: `坪數` }), a(`td`, { children: [e.area, ` 坪`] })] }),
                            a(`tr`, { children: [i(`td`, { children: `樓層` }), i(`td`, { children: e.floor_str })] }),
                            a(`tr`, { children: [i(`td`, { children: `社區` }), i(`td`, { children: e.community })] }),
                            a(`tr`, { children: [i(`td`, { children: `地點` }), i(`td`, { children: e.location })] }),
                            a(`tr`, { children: [i(`td`, { children: `更新時間` }), i(`td`, { children: e.refresh_time })] }),
                            a(`tr`, { children: [i(`td`, { children: `標籤` }), i(`td`, { children: e.rent_tag.map((e) => i(`code`, { children: e.name })) })] }),
                        ],
                    }),
                    a(`p`, { children: [`更多資訊請見 `, i(`a`, { href: `https://rent.591.com.tw/home/${e.post_id}`, children: `591 租屋` })] }),
                    i(`br`, {}),
                    i(`h3`, { children: `更多圖片` }),
                    i(`br`, {}),
                    i(`div`, { id: `more-pictures`, children: t.map((e) => i(`img`, { src: e, style: `margin-bottom: 20px;` })) }),
                ],
            })
        );
    },
    h = {
        path: `/:country/rent/:query?`,
        categories: [`other`],
        example: `/591/tw/rent/order=posttime&orderType=desc`,
        parameters: { country: `Country code. Only tw is supported now`, query: `Query Parameters` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Rental house`,
        maintainers: [`Yukaii`],
        handler: g,
        description: `::: tip
  Copy the URL of the 591 filter housing page and remove the front part \`https://rent.591.com.tw/?\`, you will get the query parameters.
:::`,
    };
async function g(e) {
    let r = e.req.param(`query`) ?? ``,
        i = e.req.param(`country`) ?? `tw`;
    if (!n(i) && i !== `tw`) throw new t(`Invalid country codes. Only "tw" is supported now.`);
    let a = await p(`https://rent.591.com.tw/home/search/rsList?${d(r)}`),
        o = `https://rent.591.com.tw/?${r}`,
        s = a.map((e) => {
            let { title: t, post_id: n, price: r, price_unit: i } = e,
                a = `https://rent.591.com.tw/home/${n}`;
            return { title: `${t} - ${r} ${i}`, description: m(e), link: a };
        });
    return (e.set(`json`, { houses: a }), { title: `591 租屋 - 自訂查詢`, link: o, description: `591 租屋 - 自訂查詢, query: ${r}`, item: s });
}
export { h as route };
