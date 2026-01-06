import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { n as e, r as t } from './utils-CA4deCoK.mjs';
const n = {
    path: `/tag/:tag`,
    categories: [`picture`],
    example: `/misskon/tag/cosplay`,
    parameters: { tag: `Any tag that exists in MissKon` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`misskon.com/tag/:tag/`], target: `/tag/:tag` }],
    name: `Tag`,
    maintainers: [`Urabartin`],
    handler: async (n) => {
        let { tag: r } = n.req.param(),
            i = await t(r),
            a = new URLSearchParams();
        a.set(`tags`, i.id);
        let o = await e(a.toString());
        return { title: `MissKON - ${i.name}`, link: i.link, description: i.description, item: o };
    },
};
export { n as route };
