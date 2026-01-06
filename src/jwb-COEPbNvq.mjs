import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/jwb/:type?`,
    categories: [`university`],
    example: `/dgut/jwb/jwtz`,
    parameters: { type: `哪种通知，默认为教务通知` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    maintainers: [`1200522928`],
    radar: [{ source: [`jwb.dgut.edu.cn/tzgg/`], target: `` }],
    name: `教务部通知公告`,
    description: `| 教学动态 | 教务通知 | 教研通知 | 实践通知 | 产业学院 |  通识教育  |"杨振宁"班|招生信息 |采购公告 |
| ------- | -------  | ---------| --------| --------| ----------|---------|------- |--------|
| jxdt    | jwtz     | jytz     |   sjtz  |   cyxy  |   tsjy    | yznb    |  zsxx  | cggg   |`,
    handler: a,
};
async function a(i) {
    let { type: a = `jwtz` } = i.req.param(),
        o = `https://jwb.dgut.edu.cn/tzgg/${a}.htm`,
        s = r(await e(o)),
        c = s(`ul.ul-new4 > li`)
            .toArray()
            .map((e) => {
                let t = s(e).find(`a.con`);
                return { title: t.find(`.tit`).text().trim(), pubDate: n(`${t.find(`.year`).text().trim()}-${t.find(`.day`).text().trim()}`), link: `https://jwb.dgut.edu.cn/${t.attr(`href`)}` };
            }),
        l = await Promise.all(
            c.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link));
                    return { ...n, description: t(`div.v_news_content`).first().html() || void 0 };
                })
            )
        );
    return { title: s(`title`).text(), link: o, allowEmpty: !0, item: l };
}
export { i as route };
