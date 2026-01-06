import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/mcr/product/*`,
    categories: [`program-update`],
    example: `/microsoft/mcr/product/dotnet/framework/runtime`,
    parameters: { product: `repository path in mcr.microsoft.com` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`https://mcr.microsoft.com/en-us/product/:product/tags`] }],
    name: `Product tags in mcr.microsoft.com`,
    maintainers: [`margani`],
    handler: n,
};
async function n(t) {
    let n = t.req.path.replace(`/microsoft/mcr/product/`, ``),
        { data: r } = await e({ method: `get`, url: `https://mcr.microsoft.com/api/v1/catalog/${n}/details?reg=mar` }),
        { data: i } = await e({ method: `get`, url: `https://mcr.microsoft.com/api/v1/catalog/${n}/tags?reg=mar` });
    return {
        title: `${r.name} - Microsoft Artifact Registry`,
        description: String(r.shortDescription),
        image: `https://mcr.microsoft.com${r.imagePath}`,
        link: `https://mcr.microsoft.com/en-us/product/${n}`,
        item: i.map((e) => {
            let t = [`Digest: \`${e.digest}\``, `Last modified date: ${new Date(e.lastModifiedDate).toDateString()}`];
            return (
                e.architecture && t.push(`Architecture: ${e.architecture}`),
                e.operatingSystem && t.push(`Operating system: ${e.operatingSystem}`),
                {
                    title: `${r.name} - ${e.name}`,
                    author: r.publisher,
                    description: t.join(`<br />`),
                    pubDate: new Date(e.lastModifiedDate),
                    guid: `mcr::${n}::${e.name}::${e.digest}`,
                    link: `https://mcr.microsoft.com/en-us/product/${n}/tags?name=${e.name}&digest=${e.digest}`,
                }
            );
        }),
    };
}
export { t as route };
