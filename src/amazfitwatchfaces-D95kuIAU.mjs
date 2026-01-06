import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, description: t }) => c(o(i, { children: [e?.map((e) => (e?.src ? a(`figure`, { children: a(`img`, { src: e.src, alt: e.alt ?? void 0 }) }) : null)), t ? a(i, { children: l(t) }) : null] })),
    d = async (r) => {
        let { device: i, sort: a, searchParams: o } = r.req.param(),
            c = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            l = `https://amazfitwatchfaces.com`,
            d = new URL(`${i}/${a}${o ? `?${o}` : ``}`, l).href,
            f = s(await e(d)),
            p = f(`html`).attr(`lang`) ?? `en`,
            m = [];
        return (
            (m = f(`div.wf-panel`)
                .slice(0, c)
                .toArray()
                .map((e) => {
                    let t = f(e),
                        n = t.prop(`title`),
                        r = t.find(`img.wf-img`).attr(`src`),
                        i = u({ images: r ? [{ src: r, alt: n }] : void 0 }),
                        a = t.find(`a.wf-act`).attr(`href`),
                        o = t.find(`div.wf-comp code`).toArray(),
                        s = [...new Set(o.map((e) => f(e).text()).filter(Boolean))],
                        c = t
                            .find(`div.wf-user a`)
                            .toArray()
                            .map((e) => {
                                let t = f(e);
                                return { name: t.text(), url: t.attr(`href`) ? new URL(t.attr(`href`), l).href : void 0, avatar: void 0 };
                            });
                    return { title: n, description: i, link: a ? new URL(a, l).href : void 0, category: s, author: c, content: { html: i, text: i }, image: r, banner: r, language: p };
                })),
            (m = (
                await Promise.all(
                    m.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = s(await e(r.link)),
                                      i = t(`div.page-title h1`).text(),
                                      a = t(`img#watchface-preview`).attr(`src`),
                                      o = u({ images: a ? [{ src: a, alt: i }] : void 0, description: t(`div.unicodebidi`).html() ?? void 0 }),
                                      c = t(`i.fa-calendar`).parent().find(`span`).text(),
                                      d = t(`.title`).attr(`href`),
                                      f = t(`div.mdesc a.btn-sm`).toArray(),
                                      m = [...new Set(f.map((e) => t(e).text()).filter(Boolean))],
                                      h = t(`div.wf-userinfo-name`)
                                          .toArray()
                                          .map((e) => {
                                              let n = t(e).find(`a.wf-author-h`);
                                              return { name: n.text(), url: n.attr(`href`) ? new URL(n.attr(`href`), l).href : void 0, avatar: n.find(`img.wf-userpic`).attr(`src`) };
                                          }),
                                      g = t(`i.fa-clock-o`).parent().find(`span`).text(),
                                      _ = {
                                          title: i,
                                          description: o,
                                          pubDate: c ? n(c, `DD.MM.YYYY HH:mm`) : r.pubDate,
                                          link: d ? new URL(d, l).href : r.link,
                                          category: m,
                                          author: h,
                                          content: { html: o, text: o },
                                          image: a,
                                          banner: a,
                                          updated: g ? n(g, `DD.MM.YYYY HH:mm`) : r.updated,
                                          language: p,
                                      };
                                  return { ...r, ..._ };
                              })
                            : r
                    )
                )
            ).filter((e) => !0)),
            {
                title: f(`title`).text(),
                description: f(`meta[property="og:description"]`).attr(`content`),
                link: d,
                item: m,
                allowEmpty: !0,
                image: f(`img.mainlogolg`).attr(`src`) ? new URL(f(`img.mainlogolg`).attr(`src`), l).href : void 0,
                author: f(`meta[property="og:site_name"]`).attr(`content`),
                language: p,
                id: d,
            }
        );
    },
    f = {
        path: `/:device/:sort/:searchParams?`,
        name: `Watch Faces`,
        url: `amazfitwatchfaces.com`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/amazfitwatchfaces/amazfit-x/fresh`,
        parameters: {
            device: {
                description: `Device Id`,
                options: [
                    { label: `Amazfit X`, value: `amazfit-x` },
                    { label: `Amazfit Band`, value: `amazfit-band` },
                    { label: `Amazfit Bip`, value: `bip` },
                    { label: `Amazfit Active`, value: `active` },
                    { label: `Amazfit Balance`, value: `balance` },
                    { label: `Amazfit Cheetah`, value: `cheetah` },
                    { label: `Amazfit Falcon`, value: `falcon` },
                    { label: `Amazfit GTR`, value: `gtr` },
                    { label: `Amazfit GTS`, value: `gts` },
                    { label: `Amazfit T-Rex`, value: `t-rex` },
                    { label: `Amazfit Stratos`, value: `pace` },
                    { label: `Amazfit Verge Lite`, value: `verge-lite` },
                    { label: `Haylou Watches`, value: `haylou` },
                    { label: `Huawei Watches`, value: `huawei-watch-gt` },
                    { label: `Xiaomi Mi Band 4`, value: `mi-band-4` },
                    { label: `Xiaomi Mi Band 5`, value: `mi-band-5` },
                    { label: `Xiaomi Mi Band 6`, value: `mi-band-6` },
                    { label: `Xiaomi Mi Band 7`, value: `mi-band-7` },
                    { label: `Xiaomi Smart Band 8`, value: `mi-band` },
                    { label: `Xiaomi Smart Band 9`, value: `mi-band` },
                ],
            },
            sort: {
                description: `Sort By`,
                options: [
                    { label: `Fresh`, value: `fresh` },
                    { label: `Updated`, value: `updated` },
                    { label: `Random`, value: `random` },
                    { label: `Top`, value: `top` },
                ],
            },
            searchParams: { description: `Search Params` },
        },
        description: `::: tip
If you subscribe to [Updated watch faces for Amazfit X](https://amazfitwatchfaces.com/amazfit-x/updated)，where the URL is \`https://amazfitwatchfaces.com/amazfit-x/updated\`, extract the part \`https://amazfitwatchfaces.com/\` to the end, which is \`amazfit-x/updated\`, and use it as the parameter to fill in. Therefore, the route will be [\`/amazfitwatchfaces/amazfit-x/updated\`](https://rsshub.app/amazfitwatchfaces/amazfit-x/updated).

If you subscribe to [TOP for the last 6 months (Only new) - Xiaomi Smart Band 9](https://amazfitwatchfaces.com/mi-band/top?compatible=Smart_Band_9&topof=6months)，where the URL is \`https://amazfitwatchfaces.com/mi-band/top?compatible=Smart_Band_9&topof=6months\`, extract the part \`https://amazfitwatchfaces.com/\` to the end, which is \`mi-band/top\`, and use it as the parameter to fill in. Therefore, the route will be [\`/amazfitwatchfaces/mi-band/top/compatible=Smart_Band_9&topof=6months\`](https://rsshub.app/amazfitwatchfaces/mi-band/top/compatible=Smart_Band_9&topof=6months).
:::

<details>
  <summary>More devices</summary>

| Device Name                                                                                | Device Id       |
| ------------------------------------------------------------------------------------------ | --------------- |
| [Amazfit X](https://amazfitwatchfaces.com/amazfit-x/fresh)                                 | [amazfit-x](https://rsshub.app/amazfitwatchfaces/amazfit-x/fresh) |
| [Amazfit Band](https://amazfitwatchfaces.com/amazfit-band/fresh)                           | [amazfit-band](https://rsshub.app/amazfitwatchfaces/amazfit-band/fresh) |
| [Amazfit Bip](https://amazfitwatchfaces.com/bip/fresh)                                     | [bip](https://rsshub.app/amazfitwatchfaces/bip/fresh) |
| [Amazfit Active](https://amazfitwatchfaces.com/active/fresh)                               | [active](https://rsshub.app/amazfitwatchfaces/active/fresh) |
| [Amazfit Balance](https://amazfitwatchfaces.com/balance/fresh)                             | [balance](https://rsshub.app/amazfitwatchfaces/balance/fresh) |
| [Amazfit Cheetah](https://amazfitwatchfaces.com/cheetah/fresh)                             | [cheetah](https://rsshub.app/amazfitwatchfaces/cheetah/fresh) |
| [Amazfit Falcon](https://amazfitwatchfaces.com/falcon/fresh)                               | [falcon](https://rsshub.app/amazfitwatchfaces/falcon/fresh) |
| [Amazfit GTR](https://amazfitwatchfaces.com/gtr/fresh)                                     | [gtr](https://rsshub.app/amazfitwatchfaces/gtr/fresh) |
| [Amazfit GTS](https://amazfitwatchfaces.com/gts/fresh)                                     | [gts](https://rsshub.app/amazfitwatchfaces/gts/fresh) |
| [Amazfit T-Rex](https://amazfitwatchfaces.com/t-rex/fresh)                                 | [t-rex](https://rsshub.app/amazfitwatchfaces/t-rex/fresh) |
| [Amazfit Stratos](https://amazfitwatchfaces.com/pace/fresh)                                | [pace](https://rsshub.app/amazfitwatchfaces/pace/fresh) |
| [Amazfit Verge Lite](https://amazfitwatchfaces.com/verge-lite/fresh)                       | [verge-lite](https://rsshub.app/amazfitwatchfaces/verge-lite/fresh) |
| [Haylou Watches](https://amazfitwatchfaces.com/haylou/fresh)                               | [haylou](https://rsshub.app/amazfitwatchfaces/haylou/fresh) |
| [Huawei Watches](https://amazfitwatchfaces.com/huawei-watch-gt/fresh)                      | [huawei-watch-gt](https://rsshub.app/amazfitwatchfaces/huawei-watch-gt/fresh) |
| [Xiaomi Mi Band 4](https://amazfitwatchfaces.com/mi-band-4/fresh)                          | [mi-band-4](https://rsshub.app/amazfitwatchfaces/mi-band-4/fresh) |
| [Xiaomi Mi Band 5](https://amazfitwatchfaces.com/mi-band-5/fresh)                          | [mi-band-5](https://rsshub.app/amazfitwatchfaces/mi-band-5/fresh) |
| [Xiaomi Mi Band 6](https://amazfitwatchfaces.com/mi-band-6/fresh)                          | [mi-band-6](https://rsshub.app/amazfitwatchfaces/mi-band-6/fresh) |
| [Xiaomi Mi Band 7](https://amazfitwatchfaces.com/mi-band-7/fresh)                          | [mi-band-7](https://rsshub.app/amazfitwatchfaces/mi-band-7/fresh) |
| [Xiaomi Smart Band 8](https://amazfitwatchfaces.com/mi-band/fresh?compatible=Smart_Band_8) | [mi-band](https://rsshub.app/amazfitwatchfaces/mi-band/fresh/compatible=Smart_Band_8) |
| [Xiaomi Smart Band 9](https://amazfitwatchfaces.com/mi-band/fresh?compatible=Smart_Band_9) | [mi-band](https://rsshub.app/amazfitwatchfaces/mi-band/fresh/compatible=Smart_Band_9) |

</details>
`,
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`amazfitwatchfaces.com/:device/:sort`],
                target: (e) => {
                    let t = e.device,
                        n = e.sort;
                    return `/amazfitwatchfaces${t ? `/${t}${n ? `/${n}` : ``}` : ``}`;
                },
            },
            { title: `Fresh watch faces for Amazfit X`, source: [`amazfitwatchfaces.com/amazfit-x/fresh`], target: `/amazfit-x/fresh` },
            { title: `Fresh watch faces for Amazfit Band`, source: [`amazfitwatchfaces.com/amazfit-band/fresh`], target: `/amazfit-band/fresh` },
            { title: `Fresh watch faces for Amazfit Bip`, source: [`amazfitwatchfaces.com/bip/fresh`], target: `/bip/fresh` },
            { title: `Fresh watch faces for Amazfit Active`, source: [`amazfitwatchfaces.com/active/fresh`], target: `/active/fresh` },
            { title: `Fresh watch faces for Amazfit Balance`, source: [`amazfitwatchfaces.com/balance/fresh`], target: `/balance/fresh` },
            { title: `Fresh watch faces for Amazfit Cheetah`, source: [`amazfitwatchfaces.com/cheetah/fresh`], target: `/cheetah/fresh` },
            { title: `Fresh watch faces for Amazfit Falcon`, source: [`amazfitwatchfaces.com/falcon/fresh`], target: `/falcon/fresh` },
            { title: `Fresh watch faces for Amazfit GTR`, source: [`amazfitwatchfaces.com/gtr/fresh`], target: `/gtr/fresh` },
            { title: `Fresh watch faces for Amazfit GTS`, source: [`amazfitwatchfaces.com/gts/fresh`], target: `/gts/fresh` },
            { title: `Fresh watch faces for Amazfit T-Rex`, source: [`amazfitwatchfaces.com/t-rex/fresh`], target: `/t-rex/fresh` },
            { title: `Fresh watch faces for Amazfit Stratos`, source: [`amazfitwatchfaces.com/pace/fresh`], target: `/pace/fresh` },
            { title: `Fresh watch faces for Amazfit Verge Lite`, source: [`amazfitwatchfaces.com/verge-lite/fresh`], target: `/verge-lite/fresh` },
            { title: `Fresh watch faces for Haylou Watches`, source: [`amazfitwatchfaces.com/haylou/fresh`], target: `/haylou/fresh` },
            { title: `Fresh watch faces for Huawei Watches`, source: [`amazfitwatchfaces.com/huawei-watch-gt/fresh`], target: `/huawei-watch-gt/fresh` },
            { title: `Fresh watch faces for Xiaomi Mi Band 4`, source: [`amazfitwatchfaces.com/mi-band-4/fresh`], target: `/mi-band-4/fresh` },
            { title: `Fresh watch faces for Xiaomi Mi Band 5`, source: [`amazfitwatchfaces.com/mi-band-5/fresh`], target: `/mi-band-5/fresh` },
            { title: `Fresh watch faces for Xiaomi Mi Band 6`, source: [`amazfitwatchfaces.com/mi-band-6/fresh`], target: `/mi-band-6/fresh` },
            { title: `Fresh watch faces for Xiaomi Mi Band 7`, source: [`amazfitwatchfaces.com/mi-band-7/fresh`], target: `/mi-band-7/fresh` },
            { title: `Fresh watch faces for Xiaomi Smart Band 8`, source: [`amazfitwatchfaces.com/mi-band/fresh`], target: `/mi-band/fresh/compatible=Smart_Band_8` },
            { title: `Fresh watch faces for Xiaomi Smart Band 9`, source: [`amazfitwatchfaces.com/mi-band/fresh`], target: `/mi-band/fresh/compatible=Smart_Band_9` },
        ],
        view: r.Articles,
    };
export { d as handler, f as route };
