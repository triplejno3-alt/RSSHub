import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './utils-BukaQkSZ.mjs';
const t = {
    path: `/subject/:id`,
    categories: [`picture`],
    example: `/dapenti/subject/184`,
    parameters: { id: `主题 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `主题`,
    maintainers: [`xyqfer`],
    handler: n,
};
async function n(t) {
    return await e.parseFeed({ subjectid: t.req.param(`id`) });
}
export { t as route };
