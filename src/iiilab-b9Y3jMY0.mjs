import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './common-config-Dzt4CsME.mjs';
const t = { path: `/`, radar: [{ source: [`www.iiilab.com/`], target: `` }], name: `Unknown`, maintainers: [`Joey`], handler: n, url: `www.iiilab.com/` };
async function n() {
    let t = `https://www.iiilab.com/`;
    return await e({
        link: t,
        url: t,
        title: `%title%`,
        description: `%description%`,
        params: { title: `发现`, description: `人人都是自媒体-发现` },
        item: {
            item: `.aw-common-list > div`,
            title: `$('a').first().text()`,
            link: `$('a').first().attr('href')`,
            description: `$('.markitup-box').first().text()`,
            pubDate: `parseDate($('.text-color-999').first().text(), 'YYYY-MM-DD HH:mm')`,
            guid: Buffer.from(`$('a').attr('href')`).toString(`base64`),
        },
    });
}
export { t as route };
