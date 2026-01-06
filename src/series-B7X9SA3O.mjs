import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { n as e, t } from './utils-BsyXyXnz.mjs';
const n = {
    path: `/series/:seriesName`,
    parameters: { seriesName: `topic name in the series section` },
    categories: [`programming`],
    example: `/web/series/new-to-the-web`,
    radar: [{ source: [`web.dev/series/:seriesName`], target: `/series/:seriesName` }],
    name: `Series`,
    maintainers: [`KarasuShin`],
    handler: r,
    description: '::: tip\n    The `seriesName` can be extracted from the Series page URL: `https://web.dev/series/:seriesName`\n:::',
};
async function r(n) {
    let r = n.req.param(`seriesName`);
    return { title: r, link: `https://web.dev/series/${r}`, image: `https://web.dev/_pwa/web/icons/icon-144x144.png`, item: await t(`category:${e(r)}`) };
}
export { n as route };
