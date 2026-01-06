import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/blockedservers`,
    categories: [`game`],
    example: `/minecraft/blockedservers`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`minecraft.net/`] }],
    name: `Java Blocked Servers`,
    maintainers: [`xtexChooser`],
    handler: n,
    url: `minecraft.net/`,
    description: `Java 版中被 Mojang 通过 sessionserver 阻止的服务器域名的 SHA-1 散列`,
    zh: { name: `Java版被阻止的服务器域名散列` },
};
async function n() {
    let t = (await e({ method: `get`, url: `https://sessionserver.mojang.com/blockedservers` })).data
            .toString()
            .split(
                `
`
            )
            .filter((e) => e !== ``),
        n = `Minecraft Java版被阻止的服务器域名散列`;
    return { title: n, link: `https://sessionserver.mojang.com/blockedservers`, description: n, item: t.map((e) => ({ title: e, description: `域名散列 ${e} 被阻止`, guid: e })) };
}
export { t as route };
