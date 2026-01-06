import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/notice`,
    categories: [`university`],
    example: `/zuel/notice`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`wap.zuel.edu.cn/`, `wap.zuel.edu.cn/notice/list.htm`] }],
    name: `通知公告`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `wap.zuel.edu.cn/`,
};
async function a() {
    let i = `http://wap.zuel.edu.cn`,
        a = `${i}/notice/list.htm`,
        o = r((await n({ method: `get`, url: a })).data),
        s = o(`.list_item`)
            .toArray()
            .map((e) => {
                e = o(e);
                let n = e.find(`.Article_Title a`);
                return { title: n.text(), pubDate: t(e.find(`.Article_PublishDate`).text()), link: `${n.attr(`href`).startsWith(`http`) ? `` : i}${n.attr(`href`)}` };
            });
    return (
        (s = await Promise.all(s.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link })).data)(`.wp_articlecontent, .psgCont, .infodetail`).html()), t))))),
        { title: `中南财经大学 - 通知公告`, link: a, item: s }
    );
}
export { i as route };
