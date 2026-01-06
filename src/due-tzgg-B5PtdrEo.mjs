import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = async () => {
        let i = `http://due.hitsz.edu.cn`,
            a = new URL(`index/tzggqb.htm`, i).href,
            o;
        try {
            o = await t(a);
        } catch {
            return { title: `哈尔滨工业大学（深圳）教务部通知公告`, description: `哈尔滨工业大学（深圳）教务部通知公告`, link: a, item: [], author: `哈尔滨工业大学（深圳）教务部` };
        }
        let s = r(o.data),
            c = s(`title`).text().trim() || `哈尔滨工业大学（深圳）教务部通知公告`,
            l = `哈尔滨工业大学（深圳）教务部`,
            u = s(`ul.list-main-modular li`)
                .toArray()
                .map((t) => {
                    let r = s(t),
                        a = r.find(`a`).attr(`href`);
                    if (!a) return null;
                    let o = r.find(`span`).text().trim(),
                        c = r.find(`label`).text().trim();
                    return { title: o, link: new URL(a, i).href, pubDate: c ? n(e(c), 8) : null, description: o };
                })
                .filter(Boolean);
        return { title: `${l} - ${c}`, description: c, link: a, item: u, author: l };
    },
    a = {
        path: `/due/tzgg`,
        name: `教务部`,
        url: `due.hitsz.edu.cn`,
        maintainers: [`guohuiyuan`],
        handler: i,
        example: `/hitsz/due/tzgg`,
        parameters: {},
        description: `:::tip
订阅 [通知公告](http://due.hitsz.edu.cn/index/tzggqb.htm)，其源网址为 \`http://due.hitsz.edu.cn/index/tzggqb.htm\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/hitsz/due/tzgg\`](https://rsshub.app/hitsz/due/tzgg)。
:::
如需获取教务学务和学位管理所有栏目的新闻汇总，请使用 [\`/hitsz/due/general\`](https://rsshub.app/hitsz/due/general) 路由。

<details>
<summary>更多栏目</summary>

| 栏目 | ID |
| - | - |
| [通知公告](http://due.hitsz.edu.cn/index/tzggqb.htm) | [tzgg](https://rsshub.app/hitsz/due/tzgg) |

</details>
`,
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`due.hitsz.edu.cn`, `due.hitsz.edu.cn/index/:id/list.htm`], target: `/hitsz/due/:id` },
            { title: `通知公告`, source: [`due.hitsz.edu.cn/index/tzggqb.htm`], target: `/hitsz/due/tzgg` },
        ],
    };
export { i as handler, a as route };
