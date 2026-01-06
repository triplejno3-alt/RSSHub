import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = (r) => Promise.all(r.map((r) => e.tryGet(r.link, async () => ((r.description = n((await t.post(r.link)).data)(`div.xxy_text`).html()), r))));
export { r as t };
