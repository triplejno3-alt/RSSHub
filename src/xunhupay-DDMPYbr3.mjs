import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './common-config-Dzt4CsME.mjs';
const t = {
    path: `/blog`,
    categories: [`blog`],
    example: `/xunhupay/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.xunhupay.com/blog`] }],
    name: `文章`,
    maintainers: [`Joey`],
    handler: n,
    url: `www.xunhupay.com/blog`,
};
async function n() {
    let t = `https://www.xunhupay.com/blog.html`;
    return await e({
        link: t,
        url: t,
        title: `%title%`,
        description: `%description%`,
        params: { title: `博客`, description: `虎皮椒-博客` },
        item: {
            item: `.blog-post > article`,
            title: `$('h5').text()`,
            link: `$('a').attr('href')`,
            description: `$('.content').text()`,
            pubDate: `parseDate($('.date').text(), 'YYYY-MM-DD')`,
            guid: Buffer.from(`$('a').attr('href')`).toString(`base64`),
        },
    });
}
export { t as route };
