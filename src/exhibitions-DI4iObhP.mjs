import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './common-config-Dzt4CsME.mjs';
const t = {
    path: `/exhibitions/:state?`,
    categories: [`travel`],
    example: `/brooklynmuseum/exhibitions`,
    parameters: { state: '展览进行的状态：`current` 对应展览当前正在进行，`past` 对应过去的展览，`upcoming` 对应即将举办的展览，默认为 `current`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Exhibitions`,
    maintainers: [],
    handler: n,
};
async function n(t) {
    let n,
        r = t.req.param(`state`);
    switch (r) {
        case void 0:
        case `current`:
            n = `https://www.brooklynmuseum.org/exhibitions/`;
            break;
        default:
            n = `https://www.brooklynmuseum.org/exhibitions/${r}`;
    }
    return await e({
        link: n,
        url: n,
        title: `Brooklyn Museum - Exhibitions`,
        item: { item: `.exhibitions .image-card`, title: `$('h2 > a, h3 > a').text()`, link: `$('h2 > a, h3 > a').attr('href')`, description: `$('h6').text()` },
    });
}
export { t as route };
