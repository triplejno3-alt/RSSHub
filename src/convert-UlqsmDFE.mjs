import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/convert/:query?`,
    categories: [`finance`],
    example: `/sse/convert/beginDate=2018-08-18&endDate=2019-08-18&companyCode=603283&title=股份`,
    parameters: { query: `筛选条件，见示例` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `可转换公司债券公告`,
    maintainers: [`kt286`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`query`) ?? ``,
        i = `https://bond.sse.com.cn/disclosure/announ/convertible/`,
        a = `https://www.sse.com.cn`,
        o = {};
    if (r) {
        let e = r.split(`&`);
        for (let t of e) {
            let [e, n] = t.split(`=`);
            e && (o[e] = n);
        }
    }
    return {
        title: `上证债券信息网 - 可转换公司债券公告`,
        link: i,
        item: (await t(`https://query.sse.com.cn/infodisplay/queryBulletinKzzTipsNew.do`, { searchParams: { isPagination: !0, 'pageHelp.pageSize': 20, flag: 0, _: Date.now(), ...o }, headers: { Referer: i } })).data.result.map(
            (t) => ({ title: t.title, description: `${a}${t.URL}`, pubDate: e(t.ADDDATE), link: `${a}${t.URL}`, author: t.security_Code })
        ),
    };
}
export { n as route };
