import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    jgdt: { baseUrl: `http://www.cbirc.gov.cn`, description: `监管动态`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=915,pageIndex=1,pageSize=18.json`, title: `监管动态` },
    ggtz: { baseUrl: `http://www.cbirc.gov.cn`, description: `公告通知`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=925,pageIndex=1,pageSize=18.json`, title: `公告通知` },
    zcfg: { baseUrl: `http://www.cbirc.gov.cn`, description: `政策法规`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=926,pageIndex=1,pageSize=18.json`, title: `政策法规` },
    zcjd: { baseUrl: `http://www.cbirc.gov.cn`, description: `政策解读`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=916,pageIndex=1,pageSize=18.json`, title: `政策解读` },
    zqyj: { baseUrl: `http://www.cbirc.gov.cn`, description: `征求意见`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=951,pageIndex=1,pageSize=18.json`, title: `征求意见` },
    xzxk: { baseUrl: `http://www.cbirc.gov.cn`, description: `行政许可`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=930,pageIndex=1,pageSize=18.json`, title: `行政许可` },
    xzcf: { baseUrl: `http://www.cbirc.gov.cn`, description: `行政处罚`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=931,pageIndex=1,pageSize=18.json`, title: `行政处罚` },
    xzjgcs: { baseUrl: `http://www.cbirc.gov.cn`, description: `行政监管措施`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=932,pageIndex=1,pageSize=18.json`, title: `行政监管措施` },
    gzlw: { baseUrl: `http://www.cbirc.gov.cn`, description: `工作论文`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=934,pageIndex=1,pageSize=18.json`, title: `工作论文` },
    jrzgyj: { baseUrl: `http://www.cbirc.gov.cn`, description: `金融监管研究`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=935,pageIndex=1,pageSize=18.json`, title: `金融监管研究` },
    tjxx: { baseUrl: `http://www.cbirc.gov.cn`, description: `统计信息`, link: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=954,pageIndex=1,pageSize=18.json`, title: `统计信息` },
};
async function r(e) {
    return (await t({ method: `get`, url: `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectByDocId/data_docId=` + e.docId + `.json` })).data.data.docClob;
}
const i = { path: `/:category?`, radar: [{ source: [`cbirc.gov.cn/:category`, `cbirc.gov.cn/`] }], name: `Unknown`, maintainers: [`JkCheung`], handler: a };
async function a(i) {
    let a = n[i.req.param(`category`) ?? `ggtz`],
        o = await e.tryGet(a.link, async () => (await t({ method: `get`, url: a.link, headers: { Referer: `http://www.cbirc.gov.cn` } })).data),
        s = await Promise.all(
            o.data.rows.map(async (e) => {
                let t = await r(e);
                return { title: e.docTitle, description: t, pubDate: e.publishDate, link: `http://www.cbirc.gov.cn/cn/view/pages/ItemDetail.html?docId=${e.docId}&itemId=925&generaltype=0` };
            })
        );
    return { title: `中国银保监会-${a.title}`, link: a.link, description: `中国银保监会-${a.title}`, item: s, language: `zh-CN` };
}
export { i as route };
