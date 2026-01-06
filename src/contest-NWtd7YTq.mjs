import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { n as r, t as i } from './utils-BZcfIILG.mjs';
const a = { path: `/contests`, categories: [`design`], example: `/makerworld/contests`, name: `Contests`, maintainers: [`TonyRL`], handler: o, radar: [{ source: [`makerworld.com/:lang/contests`] }] };
async function o() {
    let { listConst: a, previewList: o } = (await e(`${i}/_next/data/${await r()}/en/contests.json`, { headers: { 'User-Agent': t.trueUA } })).pageProps,
        s = [
            ...a.map((e) => ({ title: e.contestName, link: `${i}/en/contests/${e.id}?name=${e.contestName}`, description: e.themeDesc, pubDate: n(e.startTime) })),
            ...o.map((e) => ({ title: e.contestTheme, description: e.themeDesc, pubDate: n(e.contestTime) })),
        ];
    return { title: `Contest - MakerWorld`, description: `Join the contest to showcase your creativity and win substantial rewards`, link: `${i}/en/contests`, image: `${i}/favicon_new.png`, item: s };
}
export { a as route };
