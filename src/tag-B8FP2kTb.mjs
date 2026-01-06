import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './common-M_oPEFjF.mjs';
const t = {
    name: `標籤更新`,
    maintainers: [`Gandum2077`],
    path: `/tag/:tag`,
    example: `/wnacg/tag/漢化`,
    radar: [{ source: [`wnacg.com/*`], target: (e, t) => `/wnacg/tag/${new URL(t).pathname.match(/albums-index-tag-(.+?)\.html$/)[1]}` }],
    handler: e,
    url: `wnacg.com/albums.html`,
    features: { nsfw: !0 },
};
export { t as route };
