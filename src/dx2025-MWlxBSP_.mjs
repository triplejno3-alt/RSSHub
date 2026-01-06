import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/:type?/:category?`,
    categories: [`new-media`],
    example: `/dx2025`,
    parameters: { type: `内容类别，见下表，默认为空`, category: `行业分类，见下表，默认为空` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: i,
    description: `内容类别

| 产业观察             | 行业报告         | 政策   | 数据 |
| -------------------- | ---------------- | ------ | ---- |
| industry-observation | industry-reports | policy | data |

  行业分类

| 行业                 | 行业名称                                                          |
| -------------------- | ----------------------------------------------------------------- |
| 新一代信息技术       | next-generation-information-technology-industry-reports           |
| 高档数控机床和机器人 | high-grade-cnc-machine-tools-and-robots-industry-reports          |
| 航空航天装备         | aerospace-equipment-industry-reports                              |
| 海工装备及高技术船舶 | marine-engineering-equipment-and-high-tech-ships-industry-reports |
| 先进轨道交通装备     | advanced-rail-transportation-equipment-industry-reports           |
| 节能与新能源汽车     | energy-saving-and-new-energy-vehicles-industry-reports            |
| 电力装备             | electric-equipment-industry-reports                               |
| 农机装备             | agricultural-machinery-equipment-industry-reports                 |
| 新材料               | new-material-industry-reports                                     |
| 生物医药及医疗器械   | biomedicine-and-medical-devices-industry-reports                  |
| 现代服务业           | modern-service-industry-industry-reports                          |
| 制造业人才           | manufacturing-talent-industry-reports                             |`,
};
async function i(r) {
    let i = r.req.param(`type`) || ``,
        a = r.req.param(`category`) || ``,
        o = `https://www.dx2025.com${i === `` ? `` : `/archives/${i === `tag` ? `tag${a === `` ? `` : `/${a}`}` : `category/${i}${a === `` ? `` : `/${a}`}`}`}`,
        s = n((await t({ method: `get`, url: o })).data),
        c = s(`.entry-title a`)
            .slice(0, 10)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.text(), link: e.attr(`href`) })),
        l = await Promise.all(
            c.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = n((await t({ method: `get`, url: r.link })).data);
                    return ((r.author = e(`.entry-author-name`).text()), (r.description = e(`.bpp-post-content, .entry-content`).html()), (r.pubDate = new Date(e(`.entry-date`).attr(`datetime`)).toUTCString()), r);
                })
            )
        );
    return { title: s(`title`).text(), link: o, item: l };
}
export { r as route };
