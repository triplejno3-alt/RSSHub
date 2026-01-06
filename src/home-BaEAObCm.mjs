import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './utils-COtSPE8M.mjs';
const t = `https://www.njxzc.edu.cn/89/list.htm`,
    n = {
        path: `/tzgg`,
        categories: [`university`],
        example: `/njxzc/tzgg`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.njxzc.edu.cn/89/list.htm`, `www.njxzc.edu.cn/`] }],
        name: `官网通知公告`,
        maintainers: [`real-jiakai`],
        handler: r,
        url: `www.njxzc.edu.cn/89/list.htm`,
    };
async function r(n) {
    return { title: `南京晓庄学院 -- 通知公告`, link: t, item: await e(n, t, `https://www.njxzc.edu.cn`, `a`, `.news_meta`, { title: `.arti_title`, content: `.wp_articlecontent`, date: `.arti_update` }, `.news_list .news`) };
}
export { n as route };
