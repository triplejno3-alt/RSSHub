import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { n as e, t } from './utils-BlpFcuCK.mjs';
const n = {
    path: `/insights`,
    example: `/capitalmind/insights`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`capitalmind.in/insights`], target: `/insights` }],
    name: `Insights`,
    maintainers: [`Rjnishant530`],
    handler: r,
};
async function r() {
    let n = await e(`insights`);
    return {
        title: `Capitalmind Insights`,
        link: `${t}/insights`,
        description: `Financial insights and analysis from Capitalmind`,
        language: `en`,
        item: n,
        allowEmpty: !1,
        image: `${t}/favicons/favicon.ico`,
        icon: `${t}/favicons/favicon.ico`,
        logo: `${t}/favicons/favicon.ico`,
    };
}
export { n as route };
