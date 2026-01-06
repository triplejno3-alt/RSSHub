import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/shenzhen/hrss/szksy/:caty/:page?`,
    categories: [`government`],
    example: `/gov/shenzhen/hrss/szksy/bmxx/2`,
    parameters: { caty: `信息类别`, page: `页码` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xxgk.sz.gov.cn/cn/xxgk/zfxxgj/:caty`] }],
    name: `深圳市考试院`,
    maintainers: [`zlasd`],
    handler: a,
    url: `hrss.sz.gov.cn/*`,
    description: `| 通知公告 | 报名信息 | 成绩信息 | 合格标准 | 合格人员公示 | 证书发放信息 |
| :------: | :------: | :------: | :------: | :----------: | :----------: |
|   tzgg   |   bmxx   |   cjxx   |   hgbz   |    hgrygs    |     zsff     |`,
};
async function a(i) {
    let a = i.req.param(`caty`),
        o = i.req.param(`page`) ?? `1`,
        s = `/szksy/zwgk/${a}/index${Number.parseInt(o) > 1 ? `_${o}` : ``}.html`,
        c = new URL(s, `http://hrss.sz.gov.cn/`),
        l = await t({ method: `get`, url: c });
    if (l.statusCode !== 200) throw Error(l.statusMessage);
    let u = r(l.data),
        d = u(`.zx_rm_tit span`).text().trim(),
        f = u(`.zx_ml_list ul li`)
            .slice(1)
            .toArray()
            .map((t) => {
                let r = u(t).find(`div.list_name a`),
                    i = u(t).find(`span:eq(1)`);
                return { title: r.text().trim(), link: r.attr(`href`), pubDate: n(e(i.text().trim(), `YYYY/MM/DD`), 0) };
            });
    return { title: `深圳市考试院 - ` + d, link: c.href, item: f };
}
export { i as route };
