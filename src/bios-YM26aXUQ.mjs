import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = { zh: { url: `https://odinapi.asus.com.cn/`, lang: `cn`, websiteCode: `cn` }, en: { url: `https://odinapi.asus.com/`, lang: `en`, websiteCode: `global` } },
    l = (n, r) => {
        let { url: i, lang: a, websiteCode: o } = c[r] ?? c.zh,
            s = `${i}recent-data/apiv2/SearchSuggestion?SystemCode=asus&WebsiteCode=${o}&SearchKey=${n}&SearchType=ProductsAll&RowLimit=4&sitelang=${a}`;
        return t.tryGet(`asus:bios:${n}:${r}`, async () => {
            let t = (await e(s)).Result[0].Content[0];
            return { productID: t.DataId, hashId: t.HashId, url: t.Url, title: t.Title, image: t.ImageURL, m1Id: t.M1Id, productLine: t.ProductLine };
        });
    },
    u = {
        path: `/bios/:model/:lang?`,
        categories: [`program-update`],
        example: `/asus/bios/RT-AX88U/zh`,
        parameters: {
            model: `Model, can be found in product page`,
            lang: {
                description: `Language, provide access routes for other parts of the world`,
                options: [
                    { label: `Chinese`, value: `zh` },
                    { label: `Global`, value: `en` },
                ],
                default: `en`,
            },
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [
                    `www.asus.com/displays-desktops/:productLine/:series/:model`,
                    `www.asus.com/laptops/:productLine/:series/:model`,
                    `www.asus.com/motherboards-components/:productLine/:series/:model`,
                    `www.asus.com/networking-iot-servers/:productLine/:series/:model`,
                    `www.asus.com/:region/displays-desktops/:productLine/:series/:model`,
                    `www.asus.com/:region/laptops/:productLine/:series/:model`,
                    `www.asus.com/:region/motherboards-components/:productLine/:series/:model`,
                    `www.asus.com/:region/networking-iot-servers/:productLine/:series/:model`,
                ],
                target: `/bios/:model`,
            },
        ],
        name: `BIOS`,
        maintainers: [`Fatpandac`],
        handler: d,
        url: `www.asus.com`,
    };
async function d(t) {
    let c = t.req.param(`model`),
        u = t.req.param(`lang`) ?? `en`,
        d = await l(c, u),
        f = (
            await e(u === `zh` ? `https://www.asus.com.cn/support/api/product.asmx/GetPDBIOS?website=cn&model=${c}&sitelang=cn` : `https://www.asus.com/support/api/product.asmx/GetPDBIOS?website=global&model=${c}&sitelang=en`)
        ).Result.Obj[0].Files.map((e) => ({
            title: e.Title,
            description: o(
                u === `zh`
                    ? a(r, {
                          children: [
                              i(`p`, { children: `更新信息：` }),
                              s(e.Description),
                              a(`p`, { children: [`版本: `, e.Version] }),
                              a(`p`, { children: [`大小: `, e.FileSize] }),
                              a(`p`, { children: [`下载链接: `, i(`a`, { href: e.DownloadUrl.China, children: `中国下载` }), ` | `, i(`a`, { href: e.DownloadUrl.Global, children: `全球下载` })] }),
                          ],
                      })
                    : a(r, {
                          children: [
                              i(`p`, { children: i(`b`, { children: `Changes:` }) }),
                              s(e.Description),
                              a(`p`, { children: [i(`b`, { children: `Version:` }), ` `, e.Version] }),
                              a(`p`, { children: [i(`b`, { children: `Size:` }), ` `, e.FileSize] }),
                              a(`p`, { children: [i(`b`, { children: `Download:` }), ` `, i(`a`, { href: e.DownloadUrl.Global, children: e.DownloadUrl.Global.split(`/`).pop().split(`?`)[0] })] }),
                          ],
                      })
            ),
            guid: d.url + e.Version,
            pubDate: n(e.ReleaseDate, `YYYY/MM/DD`),
            link: d.url,
        }));
    return { title: `${d.title} BIOS`, link: d.url, image: d.image, item: f };
}
export { u as route };
