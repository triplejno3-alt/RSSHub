import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
const n = { path: `/:type?`, name: `Unknown`, maintainers: [`Fatpandac`], handler: r };
async function r(n) {
    let r = `https://td.zjgtjy.cn:8553/devops/noticeInfo/queryNoticeInfoList?pageSize=10&pageNumber=1&noticeType=${n.req.param(`type`) === `all` ? `` : n.req.param(`type`).toUpperCase()}&sort=DESC`,
        i = (await e(r)).data;
    return {
        title: `浙江土地使用权挂牌公告`,
        link: r,
        item: await Promise.all(
            i.map(async (n) => {
                let r = `https://td.zjgtjy.cn:8553/devops/noticeInfo/queryNoticeLandContentDetails?noticeId=${n.GGID}&transactionMode=${n.JYFS}`,
                    i = `https://td.zjgtjy.cn/view/trade/announcement/detail?id=${n.GGID}&category=${n.ZYLB}&type=${n.JYFS}`,
                    a = await t.tryGet(r, async () => {
                        let t = await e(r);
                        return ((t = t.queryNoticeContent.GGNR), (t = t.replaceAll(`&lt;`, `<`).replaceAll(`&gt;`, `>`).replaceAll(`&quot;`, `"`)), t);
                    });
                return { title: n.GGMC, description: a, link: i, pubDate: n.GGFBSJ };
            })
        ),
    };
}
export { n as route };
