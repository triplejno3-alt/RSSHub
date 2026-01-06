import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './common-config-Dzt4CsME.mjs';
const t = {
    path: `/exhibitions`,
    categories: [`travel`],
    example: `/jewishmuseum/exhibitions`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Exhibitions`,
    maintainers: [`chazeon`],
    handler: n,
};
async function n() {
    let t = `https://thejewishmuseum.org/exhibitions`;
    return await e({
        link: t,
        url: t,
        title: `Jewish Museums - Exhibitions`,
        item: { item: `#current article.exhibition, #upcoming article, #past article.exhibition`, title: `$('h3').text()`, link: `$('h3').parent().attr('href')` },
    });
}
export { t as route };
