import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/hr/:category?`,
    categories: [`university`],
    example: `/ruc/hr`,
    parameters: { category: `分类，见下方说明，默认为首页通知公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hr.ruc.edu.cn/`] }],
    name: `人事处`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `hr.ruc.edu.cn/`,
    description:
        '::: tip\n  分类字段处填写的是对应中国人民大学人事处分类页网址中介于 **`http://hr.ruc.edu.cn/`** 和 **/index.htm** 中间的一段，并将其中的 `/` 修改为 `-`。\n\n  如 [中国人民大学人事处 - 办事机构 - 教师事务办公室 - 教师通知公告](http://hr.ruc.edu.cn/bsjg/bsjsswbgs/jstzgg/index.htm) 的网址为 `http://hr.ruc.edu.cn/bsjg/bsjsswbgs/jstzgg/index.htm` 其中介于 **`http://hr.ruc.edu.cn/`** 和 **/index.htm** 中间的一段为 `bsjg/bsjsswbgs/jstzgg`。随后，并将其中的 `/` 修改为 `-`，可以得到 `bsjg-bsjsswbgs-jstzgg`。所以最终我们的路由为 [`/ruc/hr/bsjg-bsjsswbgs-jstzgg`](https://rsshub.app/ruc/hr/bsjg-bsjsswbgs-jstzgg)\n:::',
};
async function a(i) {
    let a = i.req.param(`category`)?.replaceAll(`-`, `/`) ?? `tzgg`,
        o = `http://hr.ruc.edu.cn`,
        s = `${o}/${a}/index.htm`,
        c = r((await n({ method: `get`, url: s })).data),
        l = c(`a[title]`)
            .toArray()
            .map((e) => {
                e = c(e);
                let t = e.attr(`href`);
                return { title: e.text(), link: `${o}${t.indexOf(`..`) === 0 ? t.replace(/\.\./, ``) : `/${a}/${t}`}` };
            });
    return (
        (l = await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    try {
                        let e = await n({ method: `get`, url: i.link });
                        ((i.description = r(e.data)(`.neirong`).html()), (i.pubDate = t(e.data.match(/日期：(\d{4}-\d{2}-\d{2})/)[1])));
                    } catch {
                        i.description = `Not Found`;
                    }
                    return i;
                })
            )
        )),
        { title: c(`title`).text(), link: s, item: l }
    );
}
export { i as route };
