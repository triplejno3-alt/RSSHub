import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { n as t, t as n } from './utils-z6Ins7W9.mjs';
const r = {
    path: `/scientific`,
    categories: [`new-media`],
    example: `/guokr/scientific`,
    radar: [{ source: [`guokr.com/scientific`, `guokr.com/`] }],
    name: `科学人`,
    maintainers: [`alphardex`, `nczitzk`],
    handler: i,
    url: `guokr.com/scientific`,
};
async function i() {
    let { data: r } = await e(`https://www.guokr.com/beta/proxy/science_api/articles`, { searchParams: { retrieve_type: `by_category`, page: 1 } }),
        i = t(r);
    return { title: `果壳网 科学人`, link: `https://www.guokr.com/scientific`, description: `果壳网 科学人`, item: await Promise.all(i.map((e) => n(e))) };
}
export { r as route };
