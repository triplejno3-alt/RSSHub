import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/jwgl`,
    categories: [`university`],
    example: `/ouc/jwgl`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jwgl.ouc.edu.cn/cas/login.action`, `jwgl.ouc.edu.cn/public/SchoolNotice.jsp`] }],
    name: `选课信息教务通知`,
    maintainers: [`3401797899`],
    handler: a,
    url: `jwgl.ouc.edu.cn/cas/login.action`,
    description: `::: warning
  由于选课通知仅允许校园网访问，需自行部署。
:::`,
};
async function a() {
    let i = `http://jwgl.ouc.edu.cn/public/listSchoolNotices.action?currentPage=1&recordsPerPage=15&qtitle=`,
        a = r((await n(i)).data),
        o = a(`div.datalist table tbody tr`)
            .toArray()
            .map((e) => {
                e = a(e);
                let n = e
                        .find(`a`)
                        .attr(`onclick`)
                        .match(/viewNotice\('(.+?)'\)/)[1],
                    r = e.find(`td`);
                return { title: r.eq(2).text(), link: `http://jwgl.ouc.edu.cn/public/viewSchoolNoticeDetail.action?schoolNoticeId=` + n, pubDate: t(r.eq(3).text(), `YYYY-MM-DD HH:mm`) };
            });
    return {
        title: `中国海洋大学选课信息教务通知`,
        link: i,
        description: `中国海洋大学选课信息教务通知`,
        item: await Promise.all(o.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n(t.link)).data)(`div.notice`).html()), t)))),
    };
}
export { i as route };
