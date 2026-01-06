import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/jiaowc/tzgg/:category?`,
    categories: [`university`],
    example: `/lsnu/jiaowc/tzgg`,
    parameters: { category: `分类名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`lsnu.edu.cn/`], target: `/jiaowc/tzgg` }],
    name: `教学部通知公告`,
    maintainers: [`nyaShine`],
    handler: i,
    url: `lsnu.edu.cn/`,
    description: `| 实践教学科 | 教育运行科 | 教研教改科 | 学籍管理科 | 考试科 | 教材建设管理科 |
| ---------- | ---------- | ---------- | ---------- | ------ | -------------- |
| sjjxk      | jxyxk      | jyjgk      | xjglk      | ksk    | jcjsglk        |`,
};
async function i(r) {
    let i = r.req.param(`category`),
        a = (await t({ method: `get`, url: i ? `https://jiaowc.lsnu.edu.cn/tzgg/${i}.htm` : `https://jiaowc.lsnu.edu.cn/tzgg.htm` })).data,
        o = n(a)(`tr[id^="line_u5_"]`).toArray();
    return {
        title: `乐山师范学院教学部通知公告`,
        link: `https://jiaowc.lsnu.edu.cn/tzgg.htm`,
        item: await Promise.all(
            o.map(async (r) => {
                let i = n(r),
                    a = i(`a`).attr(`title`),
                    o = `https://jiaowc.lsnu.edu.cn/${i(`a`).attr(`href`)}`,
                    s = i(`td[width="80"]`).text();
                return await e.tryGet(o, async () => {
                    let e = (await t({ method: `get`, url: o })).data;
                    return { title: a, link: o, description: n(e)(`.v_news_content`).html(), pubDate: new Date(s).toUTCString() };
                });
            })
        ),
    };
}
export { r as route };
