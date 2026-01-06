import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './common-utils-uYpL50sT.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import './wechat-mp-HNgcLN2K.mjs';
import { t as e } from './general-C-fBY1um.mjs';
const t = { path: `/gaozhou/*`, name: `Unknown`, maintainers: [], handler: n };
async function n(t) {
    await e(
        {
            defaultPath: `zcjd/`,
            list_element: `.newslist li a`,
            list_include: `site`,
            title_element: `.head`,
            title_match: `(.*)`,
            description_element: `.contener`,
            author_element: void 0,
            author_match: void 0,
            authorisme: `高州市人民政府网`,
            pubDate_element: `.time span:nth-child(1)`,
            pubDate_match: `发布时间：(.*)`,
            pubDate_format: void 0,
        },
        t
    );
}
export { t as route };
