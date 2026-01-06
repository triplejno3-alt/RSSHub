import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/shenzhen/zzb/:caty/:page?`,
    categories: [`government`],
    example: `/gov/shenzhen/zzb/tzgg`,
    parameters: { caty: `信息类别`, page: `页码` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zzb.sz.gov.cn/*`] }],
    name: `深圳市委组织部`,
    maintainers: [`zlasd`],
    handler: a,
    url: `zzb.sz.gov.cn/*`,
    description: `| 通知公告 | 任前公示 | 政策法规 | 工作动态 | 部门预算决算公开 | 业务表格下载 |
| :------: | :------: | :------: | :------: | :--------------: | :----------: |
|   tzgg   |   rqgs   |   zcfg   |   gzdt   |       xcbd       |     bgxz     |`,
};
async function a(i) {
    let a = i.req.param(`caty`),
        o = i.req.param(`page`) ?? `1`,
        s = `/${a}/index${Number.parseInt(o) > 1 ? `_${o}` : ``}.html`,
        c = new URL(s, `http://www.zzb.sz.gov.cn/`),
        l = await t({ method: `get`, url: c });
    if (l.statusCode !== 200) throw Error(l.statusMessage);
    let u = r(l.data),
        d = u(`#Title`).text().trim(),
        f = u(`#List tbody tr td table tbody tr td[width="96%"]`)
            .toArray()
            .map((t) => {
                let r = u(t).find(`font a`),
                    i = u(t).find(`font[size="2px"]`);
                return { title: r.text(), link: r.attr(`href`), pubDate: n(e(i.text().trim(), `YYYY/MM/DD`), 0) };
            });
    return { title: `深圳组工在线 - ` + d, link: c.href, item: f };
}
export { i as route };
