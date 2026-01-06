import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = `https://auto.hdu.edu.cn`,
    o = async (e, o) => {
        let s = `${a}/${e}`,
            c = i((await r(s)).data),
            l = c(`.rightlist`)
                .toArray()
                .map((e) => {
                    let t = c(e),
                        r = t.find(`.newstitle a`),
                        i = r.attr(`href`),
                        o = r.text().trim(),
                        s = t
                            .find(`.newsinfo`)
                            .text()
                            .match(/日期：(\d{4}\/\d{2}\/\d{2})/),
                        l = t.find(`.newsbrief`).text().trim();
                    return { title: o || `无标题`, link: i ? new URL(i, a).href : a, pubDate: s ? n(s[1], `YYYY/MM/DD`) : void 0, description: l || `` };
                }),
            u = await Promise.all(
                l.map((e) =>
                    t.tryGet(e.link, async () => {
                        let { data: t } = await r(e.link),
                            n = i(t)(`.wp_articlecontent`).html();
                        return { ...e, description: n || e.description };
                    })
                )
            );
        return { title: `杭州电子科技大学自动化学院 - ${o}`, link: s, item: u };
    },
    s = {
        notice: { name: `通知公告`, path: `3779/list.htm` },
        graduate: { name: `研究生教育`, path: `3754/list.htm` },
        undergraduate: { name: `本科教学`, path: `3745/list.htm` },
        student: { name: `学生工作`, path: `3726/list.htm` },
    },
    c = {
        path: `/auto/:type?`,
        categories: [`university`],
        example: `/hdu/auto`,
        parameters: { type: `分类，见下表，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `自动化学院`,
        maintainers: [`jalenzz`],
        handler: (t) => {
            let n = t.req.param(`type`) || `notice`;
            return (n in s || (e.error(`Invalid type: ${n}. Valid types are: ${Object.keys(s).join(`, `)}, defaulting to notice`), (n = `notice`)), o(s[n].path, s[n].name));
        },
        description: `| 通知公告  | 研究生教育 |    本科教学    | 学生工作  |
| -------- | -------- |   --------    | -------- |
| notice   | graduate | undergraduate | student  |`,
        radar: [
            { source: [`auto.hdu.edu.cn/main.htm`, `auto.hdu.edu.cn/3779/list.htm`], target: `/auto/notice` },
            { source: [`auto.hdu.edu.cn/main.htm`, `auto.hdu.edu.cn/3754/list.htm`], target: `/auto/graduate` },
            { source: [`auto.hdu.edu.cn/main.htm`, `auto.hdu.edu.cn/3745/list.htm`], target: `/auto/undergraduate` },
            { source: [`auto.hdu.edu.cn/main.htm`, `auto.hdu.edu.cn/3726/list.htm`], target: `/auto/student` },
        ],
    };
export { c as route };
