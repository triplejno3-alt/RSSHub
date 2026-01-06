import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './md5-DQN6cWFb.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/csrc/auditstatus/:apply_id`,
    categories: [`government`],
    example: `/gov/csrc/auditstatus/9ce91cf2d750ee62de27fbbcb05fa483`,
    parameters: { apply_id: '事项类别id，`https://neris.csrc.gov.cn/alappl/home/xkDetail` 列表中各地址的 appMatrCde 参数' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `申请事项进度`,
    maintainers: [`hillerliao`],
    handler: o,
};
async function o(a) {
    let { apply_id: o } = a.req.param(),
        s = await n(`https://neris.csrc.gov.cn/alappl/home1/onlinealog`, { searchParams: { appMatrCde: o } }),
        c = i(s.data),
        l = c(`tr[height="50"]`)
            .toArray()
            .map((n) => {
                n = c(n);
                let i = n.find(`li.templateTip`).text(),
                    a = n.find(`td[style="font-weight:100 ;color: black ;position: relative;left:20px"]`),
                    o = a.eq(-1).text(),
                    l = `【` + o + `】` + i,
                    u = a.eq(-1).next(`td`).text(),
                    d = ``;
                if (a.length > 1) for (let e = 0; e < a.length; e++) d += a.eq(e).next(`td`).text() + `，` + a.eq(e).text() + `；`;
                else d = u + `，` + o;
                let f = i + `：` + d;
                return { title: l, description: f, pubDate: r(t(u), 8), link: s.url, guid: `${s.url}#${e(f)}` };
            });
    return { title: `${c(`.zx2 div`).attr(`title`)} - 申请事项进度查询 - 中国证监会`, link: s.url, item: l };
}
export { a as route };
