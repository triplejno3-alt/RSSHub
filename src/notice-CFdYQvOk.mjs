import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
        tzgg: { name: `tzgg`, url: `https://xc.hfut.edu.cn/1955/list.htm`, root: `https://xc.hfut.edu.cn`, title: `合肥工业大学宣城校区 - 通知公告` },
        gztz: { name: `gztz`, url: `https://xc.hfut.edu.cn/gztz/list.htm`, root: `https://xc.hfut.edu.cn`, title: `合肥工业大学宣城校区 - 院系动态 - 工作通知` },
    },
    a = async (e, t) => {
        let a = i[t].url;
        return { title: i[t].title, link: a, resultList: await o(r((await n(a)).data)) };
    };
async function o(i) {
    let a = i(`#wp_news_w6`)
        .find(`li`)
        .toArray()
        .map((e) => {
            e = i(e);
            let n = e.find(`a`).attr(`href`),
                r = n;
            n.startsWith(`http`) || (r = `https://xc.hfut.edu.cn/` + e.find(`a`).attr(`href`));
            let a = t(e.find(`.news_meta`).text(), `YYYY-MM-DD`);
            return { title: e.find(`a`).attr(`title`), pubDate: a, link: r };
        });
    return await Promise.all(
        a.map((t) =>
            e.tryGet(t.link, async () => {
                let e;
                try {
                    let i = r((await n(t.link)).data);
                    e = i(`.wp_articlecontent`).html() ?? i(`.v_news_content`).html() ?? t.link;
                } catch {
                    e = t.link;
                }
                return { title: t.title, link: t.link, description: e, pubDate: t.pubDate };
            })
        )
    );
}
var s = a;
const c = {
    path: `/xc/notice/:type?`,
    categories: [`university`],
    example: `/hfut/xc/notice/tzgg`,
    parameters: { type: '分类，见下表（默认为 `tzgg`)' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportRadar: !0, supportScihub: !1 },
    radar: [{ source: [`xc.hfut.edu.cn`] }],
    name: `宣城校区通知`,
    maintainers: [`batemax`],
    handler: l,
    description: `| 通知公告(https://xc.hfut.edu.cn/1955/list.htm) | 院系动态-工作通知(https://xc.hfut.edu.cn/gztz/list.htm) |
| ------------ | -------------- |
| tzgg         | gztz           |`,
};
async function l(e) {
    let { link: t, title: n, resultList: r } = await s(e, e.req.param(`type`) ?? `tzgg`);
    return { title: n, link: t, description: `合肥工业大学宣城校区 - 通知公告`, item: r };
}
export { c as route };
