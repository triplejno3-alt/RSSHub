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
    example: `/pku/hr`,
    parameters: { category: `分类，见下方说明，默认为首页最新公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hr.pku.edu.cn/`] }],
    name: `人事处`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `hr.pku.edu.cn/`,
    description:
        '::: tip\n  分类字段处填写的是对应北京大学人事处分类页网址中介于 **`http://hr.pku.edu.cn/`** 和 **/index.htm** 中间的一段，并将其中的 `/` 修改为 `-`。\n\n  如 [北京大学人事处 - 人才招聘 - 教师 - 教学科研人员](https://hr.pku.edu.cn/rczp/js/jxkyry/index.htm) 的网址为 `https://hr.pku.edu.cn/rczp/js/jxkyry/index.htm` 其中介于 **`http://hr.pku.edu.cn/`** 和 **`/index.ht`** 中间的一段为 `rczp/js/jxkyry`。随后，并将其中的 `/` 修改为 `-`，可以得到 `rczp-js-jxkyry`。所以最终我们的路由为 [`/pku/hr/rczp-js-jxkyry`](https://rsshub.app/pku/hr/rczp-js-jxkyry)\n:::',
};
async function a(i) {
    let a = i.req.param(`category`)?.replaceAll(`-`, `/`) ?? `zxgg`,
        o = `https://hr.pku.edu.cn/`,
        s = `${o}/${a}/index.htm`,
        c = r((await n({ method: `get`, url: s })).data),
        l = c(`.item-list li a`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.text().replace(/\d+、/, ``), link: `${o}/${a}/${e.attr(`href`)}` })),
        u = await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data);
                    return (e(`.title`).remove(), (i.description = e(`.article`).html()), (i.pubDate = t(e(`#date`).text())), i);
                })
            )
        );
    return { title: `${c(`h2`).text()} - ${c(`title`).text()}`, link: s, item: u };
}
export { i as route };
