import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://ipsw.me/`,
    i = {
        path: `/index/:ptype/:pname`,
        categories: [`program-update`],
        example: `/ipsw/index/ipsws/iPad8,11`,
        parameters: {
            ptype: `Fill in ipsws or otas to get different versions of firmware`,
            pname: 'Product name, `http://rsshub.app/ipsw/index/ipsws/iPod`, if you fill in the iPad, follow the entire iPad series(ptype default to ipsws).`http://rsshub.app/ipsw/index/ipsws/iPhone11,8`, if you fill in the specific iPhone11,8, submit to the ipsws firmware information of this model',
        },
        name: `Apple Firmware Update-IPSWs/OTAs version`,
        maintainers: [`Jeason0228`],
        handler: o,
    };
function a(e) {
    return ((e = e.replace(`';`, ``)), (e = e.replace(`window.location = '/`, r)), e);
}
async function o(i) {
    let { pname: o, ptype: s } = i.req.param(),
        c = `https://ipsw.me/product/${o}`;
    o.includes(`,`) ? (s === `otas` ? (c = `https://ipsw.me/${s}/${o}`) : s === `ipsws` && (c = `https://ipsw.me/${o}`)) : (c = `https://ipsw.me/product/${o}`);
    let l = n((await t({ method: `get`, url: c, headers: { Referer: r } })).data),
        u = o.includes(`,`)
            ? l(`.firmware`)
                  .toArray()
                  .map((e) => ({ title: l(e).find(`td`).eq(1).text(), link: a(l(e).attr(`onclick`)) }))
            : l(`.products a`)
                  .toArray()
                  .map((e) => ({ title: l(e).find(`img`).attr(`alt`), link: l(e).attr(`href`) })),
        d = await Promise.all(
            u.map((i) => {
                let a = i.title,
                    s = new URL(i.link, r).href;
                return e.tryGet(s, async () => {
                    let e = n((await t({ method: `get`, url: s, headers: { Referer: r } })).data),
                        i = e(`div.selector__wizard`).html(),
                        c;
                    ((c = o.includes(`,`) ? e(`div.table-responsive table tr`).first().find(`td`).text().trim() : e(`tr.firmware`).first().find(`td`).eq(2).text().trim()),
                        (c = c.replace(`th`, ``).replace(`nd`, ``).replace(`st`, ``).replace(`rd`, ``)));
                    let l = c.replaceAll(` `, `,`);
                    return { title: a, link: s, description: i, pubDate: new Date(l).toLocaleDateString(), guid: a };
                });
            })
        );
    return { title: `${o} - ${s} Released`, link: c, description: `查看Apple-${o}- ${s} 固件-是否关闭验证`, item: d };
}
export { i as route };
