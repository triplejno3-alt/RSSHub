import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { a as n, i as r, n as i, t as a } from './utils-CUPMNkaE.mjs';
const o = {
    path: `/hub/events`,
    categories: [`programming`],
    example: `/baai/hub/events`,
    radar: [{ source: [`hub.baai.ac.cn/events`, `hub.baai.ac.cn/`] }],
    name: `智源社区 - 活动`,
    maintainers: [`TonyRL`],
    handler: s,
    url: `hub.baai.ac.cn/events`,
};
async function s() {
    let o = (await e(`${a}/api/v1/events`, { method: `POST`, body: { page: 1, tag_id: `` } })).data.map((e) => n(e)),
        s = await Promise.all(o.map((e) => t.tryGet(e.link, async () => ((e.description = await r(e)), e))));
    return { title: `活动 - 智源社区`, link: `${i}/events`, item: s };
}
export { o as route };
