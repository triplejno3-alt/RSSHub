import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './common-config-Dzt4CsME.mjs';
const t = { path: `/`, name: `Unknown`, maintainers: [`chazeon`], handler: n };
async function n() {
    let t = `https://stratechery.com/`;
    return await e({
        link: t,
        url: t,
        title: `Stratechery by Ben Thompson`,
        author: `Ben Thompson`,
        description: `Stratechery provides analysis of the strategy and business side of technology and media, and the impact of technology on society. `,
        item: {
            item: `article`,
            title: `$('article > header > h1 > a').text()`,
            link: `$('article > header > h1 > a').attr('href')`,
            pubDate: `parseDate($('article .entry-date').attr('datetime'))`,
            description: `$('article > .entry-content').html().replace(/%/g, '&percnt;')`,
        },
    });
}
export { t as route };
