import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { load as r } from 'cheerio';
const i = `https://makerworld.com`,
    a = () =>
        n.tryGet(`makerworld:nextBuildId`, async () => {
            let n = r(await e(`${i}/en`, { headers: { 'User-Agent': t.trueUA } }));
            return JSON.parse(n(`script#__NEXT_DATA__`).text()).buildId;
        });
export { a as n, i as t };
