import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/careers`,
    categories: [`university`],
    example: `/hnu/careers`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`scc.hnu.edu.cnundefined`] }],
    name: `校园招聘`,
    maintainers: [`ningyougan`],
    handler: n,
    url: `scc.hnu.edu.cnundefined`,
};
async function n() {
    let t = `http://scc.hnu.edu.cn/`,
        n = `${t}module/getcareers`;
    return {
        title: `校园招聘`,
        link: n,
        item: (await e({ method: `get`, url: `${n}?start_page=1&type=inner&day=&count=20&start=1` })).data.data.map((e) => ({
            title: e.company_name,
            link: `${t}detail/career?id=${e.career_talk_id}`,
            description: e.address + ` - ` + e.meet_time + ` - ` + e.professionals,
            category: e.company_property + ` - ` + e.city_name,
        })),
    };
}
export { t as route };
