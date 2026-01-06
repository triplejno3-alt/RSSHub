import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
        tzgg: { name: `tzgg`, url: `https://news.hfut.edu.cn/tzgg2.htm`, root: `https://news.hfut.edu.cn`, title: `合肥工业大学 - 通知公告` },
        jxky: { name: `jxky`, url: `https://news.hfut.edu.cn/tzgg2.htm`, root: `https://news.hfut.edu.cn`, title: `合肥工业大学 - 通知公告 - 教学科研` },
        qttz: { name: `qttz`, url: `https://news.hfut.edu.cn/tzgg2.htm`, root: `https://news.hfut.edu.cn`, title: `合肥工业大学 - 通知公告 - 其它通知` },
    },
    a = async (e, t) => {
        let a = i[t].url,
            s = i[t].title,
            c = r((await n(a)).data);
        return { title: s, link: a, resultList: await o(i[t].name, c) };
    };
async function o(i, a) {
    let o = a(`#tzz`).find(`li`).toArray();
    i === `jxky` ? (o = a(`#c01`).find(`li`).toArray()) : i === `qttz` && (o = a(`#c02`).find(`li`).toArray());
    let s = o.map((e) => {
        e = a(e);
        let n = e.find(`a`).attr(`href`),
            r = n;
        n.startsWith(`http`) || (r = `https://news.hfut.edu.cn/` + e.find(`a`).attr(`href`));
        let i = t(e.find(`i`).text(), `YYYY-MM-DD`);
        return { title: e.find(`p`).text(), pubDate: i, link: r };
    });
    return await Promise.all(
        s.map((t) =>
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
    path: `/hf/notice/:type?`,
    categories: [`university`],
    example: `/hfut/hf/notice/tzgg`,
    parameters: { type: '分类，见下表（默认为 `tzgg`)' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportRadar: !0, supportScihub: !1 },
    radar: [{ source: [`news.hfut.edu.cn`] }],
    name: `合肥校区通知`,
    maintainers: [`batemax`],
    handler: l,
    description: `| 通知公告(https://news.hfut.edu.cn/tzgg2.htm) | 教学科研(https://news.hfut.edu.cn/tzgg2/jxky.htm) | 其他通知(https://news.hfut.edu.cn/tzgg2/qttz.htm) |
| ------------ | -------------- | ------------------ |
| tzgg         | jxky            | qttz              |`,
};
async function l(e) {
    let { link: t, title: n, resultList: r } = await s(e, e.req.param(`type`) ?? `tzgg`);
    return { title: n, link: t, description: `合肥工业大学 - 通知公告`, item: r };
}
export { c as route };
