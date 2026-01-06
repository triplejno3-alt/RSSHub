import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './timezone-CrV-DT8S.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as n } from './utils-UYnaHvS1.mjs';
import { load as r } from 'cheerio';
const i = new Map([
        [`16tz`, { title: `南京理工大学电光16 -- 通知公告`, id: `/_t217/tzgg` }],
        [`16dt`, { title: `南京理工大学电光16 -- 主任寄语`, id: `/_t217/zrjy` }],
        [`17tz`, { title: `南京理工大学电光17 -- 年级通知`, id: `/_t689/njtz` }],
        [`17dt`, { title: `南京理工大学电光17 -- 每日动态`, id: `/_t689/mrdt` }],
        [`18tz`, { title: `南京理工大学电光18 -- 年级通知`, id: `/_t900/njtz_10234` }],
        [`18dt`, { title: `南京理工大学电光18 -- 主任寄语`, id: `/_t900/zrjy_10251` }],
        [`19tz`, { title: `南京理工大学电光19 -- 通知公告`, id: `/_t1163/tzgg_11606` }],
        [`19dt`, { title: `南京理工大学电光19 -- 每日动态`, id: `/_t1163/mrdt_11608` }],
    ]),
    a = {
        path: `/eo/:grade?/:type?`,
        categories: [`university`],
        example: `/njust/eo/17/tz`,
        parameters: {
            grade: '年级，见下表，默认为本科 2017 级，未列出的年级所对应的参数可以从级网二级页面的 URL Path 中找到，例如：本科 2020 级为 `_t1316`',
            type: '类别，见下表，默认为年级通知（通知公告），未列出的类别所对应的参数可以从级网二级页面的 URL Path 中找到，例如：电光 20 的通知公告为 `tzgg_12969`',
        },
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `电光学院年级网站`,
        maintainers: [`jasongzy`],
        handler: o,
        description: `\`grade\` 列表：

| 本科 2016 级 | 本科 2017 级 | 本科 2018 级 | 本科 2019 级 |
| ------------ | ------------ | ------------ | ------------ |
| 16           | 17           | 18           | 19           |

  \`type\` 列表：

| 年级通知（通知公告） | 每日动态（主任寄语） |
| -------------------- | -------------------- |
| tz                   | dt                   |`,
    };
async function o(a) {
    let o = a.req.param(`grade`) ?? `17`,
        s = a.req.param(`type`) ?? `tz`,
        c = i.get(o + s);
    c ||= { title: ``, id: `/` + o + `/` + s };
    let l = `https://dgxg.njust.edu.cn` + c.id + `/list.htm`,
        u = r(await n(l, !0));
    c.title ||= u(`title`).text();
    let d = u(`li.list_item`);
    return { title: c.title, link: l, item: d.toArray().map((n) => ({ title: u(n).find(`a`).text().trim(), pubDate: t(e(u(n).find(`span.Article_PublishDate`).text(), `YYYY-MM-DD`), 8), link: u(n).find(`a`).attr(`href`) })) };
}
export { a as route };
