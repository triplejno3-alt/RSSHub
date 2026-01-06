import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './utils-DC3CeJpI.mjs';
const t = {
    path: `/tags/:type/:language?`,
    name: `话题・标签`,
    maintainers: [`AgFlore`],
    parameters: { type: '话题 ID，可从话题页 URL 中获取，如 `https://theinitium.com/tags/2019_10/`', language: '语言，简体`zh-hans`，繁体`zh-hant`，缺省为简体' },
    radar: [{ source: [`theinitium.com/tags/:type`], target: `/tags/:type` }],
    handler: (t) => e(`tags`, t),
    example: `/theinitium/tags/2019_10/zh-hans`,
    categories: [`new-media`],
};
export { t as route };
