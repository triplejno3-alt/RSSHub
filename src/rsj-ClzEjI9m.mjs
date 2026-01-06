import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/taiyuan/rsj/:caty/:page?`,
    categories: [`government`],
    example: `/gov/taiyuan/rsj/gggs`,
    parameters: { caty: `信息类别`, page: `页码` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`rsj.taiyuan.gov.cn/*`] }],
    name: `太原市人力资源和社会保障局政府公开信息`,
    maintainers: [`2PoL`],
    handler: a,
    url: `rsj.taiyuan.gov.cn/*`,
    description: `| 工作动态 | 太原新闻 | 通知公告 | 县区动态 | 国内动态 | 图片新闻 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| gzdt     | tyxw     | gggs     | xqdt     | gndt     | tpxw     |`,
};
async function a(i) {
    let a = i.req.param(`caty`),
        o = i.req.param(`page`) ?? `1`,
        s = `/zfxxgk/${a}/index${Number.parseInt(o) > 1 ? `_${o}` : ``}.shtml`,
        c = new URL(s, `http://rsj.taiyuan.gov.cn/`),
        l = await t(c.href);
    if (l.statusCode !== 200) throw Error(l.statusMessage);
    let u = r(l.data, { decodeEntities: !1 }),
        d = u(`.tit`).find(`a:eq(2)`).text(),
        f = u(`.RightSide_con ul li`)
            .toArray()
            .map((t) => {
                let r = u(t).find(`a`),
                    i = u(t).find(`span.fr`);
                return { title: r.attr(`title`), link: r.attr(`href`), pubDate: n(e(i.text(), `YYYY-MM-DD`), 8) };
            });
    return { title: `太原市人力资源和社会保障局 - ` + d, link: c.href, item: f };
}
export { i as route };
