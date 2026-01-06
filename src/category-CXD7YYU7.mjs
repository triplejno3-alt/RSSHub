import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './utils-OLSnwVIy.mjs';
const n = [
        { value: `interview`, label: `इंटरव्यू`, id: 92820 },
        { value: `audio`, label: `ऑडियो`, id: 5153 },
        { value: `kala-sahitya`, label: `कला-साहित्य`, id: 101061 },
        { value: `campus`, label: `कैंपस`, id: 5261 },
        { value: `covid-19`, label: `कोविड-19`, id: 73034 },
        { value: `jan-ki-baat`, label: `जन की बात`, id: 985 },
        { value: `duniya`, label: `दुनिया`, id: 33 },
        { value: `north-east`, label: `नॉर्थ ईस्ट`, id: 5834 },
        { value: `prasangik`, label: `प्रासंगिक`, id: 3394 },
        { value: `bharat`, label: `भारत`, id: 30 },
        { value: `media`, label: `मीडिया`, id: 3338 },
        { value: `media-bol`, label: `मीडिया बोल`, id: 7963 },
        { value: `rajneeti`, label: `राजनीति`, id: 31 },
        { value: `vichar`, label: `विचार`, id: 73061 },
        { value: `vigyan`, label: `विज्ञान`, id: 32 },
        { value: `vishesh`, label: `विशेष`, id: 2494 },
        { value: `video`, label: `वीडियो`, id: 34 },
        { value: `samaj`, label: `समाज`, id: 28 },
        { value: `ham-bhi-bharat`, label: `हम भी भारत`, id: 14383 },
        { value: `hamare-bare-mein`, label: `हमारे बारे में`, id: 29 },
    ],
    r = {
        path: `/category/:category`,
        categories: [`new-media`],
        example: `/thewirehindi/category/bharat`,
        parameters: { category: { description: `Category name`, options: n.map(({ value: e, label: t }) => ({ value: e, label: t })) } },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`thewirehindi.com/category/*`] }],
        name: `Category`,
        maintainers: [`Rjnishant530`],
        handler: i,
        url: `thewirehindi.com/`,
    };
async function i(r) {
    let { category: i } = r.req.param(),
        a = n.find((e) => e.value === i);
    if (!a) throw Error(`Category "${i}" not found`);
    let { data: o } = await e(`https://thewirehindi.com/wp-json/wp/v2/posts?categories=${a.id}&_embed`),
        s = o.map((e) => t(e));
    return {
        title: `The Wire Hindi - ${a.label}`,
        link: `https://thewirehindi.com/category/${i}/`,
        item: s,
        description: `Latest news from The Wire Hindi - ${a.label} category`,
        logo: `https://thewirehindi.com/wp-content/uploads/2023/05/cropped-The-wire-32x32.jpeg`,
        language: `hi`,
    };
}
export { r as route };
