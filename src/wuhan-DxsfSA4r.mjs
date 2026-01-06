import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `https://www.whwater.com`,
    r = { path: `/wuhan/:channelId?`, radar: [{ source: [`whwater.com/IWater.shtml`, `whwater.com/`], target: `/wuhan` }], name: `Unknown`, maintainers: [], handler: i, url: `whwater.com/IWater.shtml` };
async function i(r) {
    let { channelId: i = 68 } = r.req.param(),
        a = (
            await t.post(`https://manager.whwater.com:8900/website/article/findChannelArticle`, {
                form: { channelId: i, searchKey: ``, thumbnailStatus: 0, topStatus: 0, recommendStatus: 0, page: 1, size: r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 30 },
            })
        ).data.data,
        o = a.articleArray.map((t) => ({ title: t.title, description: t.content, pubDate: e(t.publishTime), link: `https://${n}/IPolicyDetails.shtml?id=31&sid=${i}${t.articleLink}` }));
    return { title: `${a.channelName}通知 - 武汉市水务集团有限公司`, link: `${n}/IWater.shtml?id=31&sid=48`, item: o };
}
export { r as route };
