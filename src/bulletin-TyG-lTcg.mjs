import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://bulletin.nuist.edu.cn`,
    i = {
        791: `全部`,
        792: `文件公告`,
        xsbgw: `学术报告`,
        779: `招标信息`,
        780: `会议通知`,
        781: `党政事务`,
        782: `组织人事`,
        783: `科研信息`,
        784: `招生就业`,
        785: `教学考试`,
        786: `专题讲座`,
        788: `校园活动`,
        789: `学院动态`,
        qt: `其他`,
    },
    a = {
        path: `/bulletin/:category?`,
        categories: [`university`],
        example: `/nuist/bulletin/791`,
        parameters: { category: '默认为 `791`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`bulletin.nuist.edu.cn/:category/list.htm`], target: `/bulletin/:category` }],
        name: `南信大信息公告栏`,
        maintainers: [`gylidian`],
        handler: o,
        description: `| 全部 | 文件公告 | 学术报告 | 招标信息 | 会议通知 | 党政事务 | 组织人事 |
| ---- | -------- | -------- | -------- | -------- | -------- | -------- |
| 791  | 792      | xsbgw    | 779      | 780      | 781      | 782      |

| 科研信息 | 招生就业 | 教学考试 | 专题讲座 | 校园活动 | 学院动态 | 其他 |
| -------- | -------- | -------- | -------- | -------- | -------- | ---- |
| 783      | 784      | 785      | 786      | 788      | 789      | qt   |

::: warning
  全文内容需使用 校园网或[VPN](http://vpn.nuist.edu.cn) 获取
:::`,
    };
async function o(a) {
    let o = Object.hasOwn(i, a.req.param(`category`)) ? a.req.param(`category`) : `791`,
        s = `${r}/${o}/list.htm`,
        c = n((await t(s)).data),
        l = c(`.news_list`).find(`.news`);
    return {
        title: `南信大信息公告栏` + (o === `791` ? `` : `:` + i[o]),
        link: s,
        item: l.toArray().map((t) => {
            if (((t = c(t)), o === `xsbgw`)) {
                let n = t.find(`.xs_title .btt a`);
                return { title: n.text(), author: t.find(`.xs_bgr`).text(), category: `学术报告`, pubDate: e(t.find(`.xs_date`).text()), link: new URL(n.attr(`href`), r).href };
            }
            let n = t.find(`.news_title`);
            return {
                title: [n.find(`.zdtb img`).length > 0 ? `[顶]` : ``, n.find(`.btt`).text()].join(` `),
                author: t.find(`.news_org`).text(),
                category: n.find(`.wjj`).text(),
                pubDate: e(t.find(`.news_date`).text()),
                link: new URL(n.find(`.btt a`).attr(`href`), r).href,
            };
        }),
    };
}
export { a as route };
