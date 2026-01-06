import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { t as n } from './utils-Nfz9OT6p.mjs';
const r = {
    path: `/huati/:tag`,
    categories: [`social-media`],
    example: `/coolapk/huati/iPhone`,
    parameters: { tag: `话题名称` },
    features: {
        requireConfig: [{ name: `ALLOW_USER_HOTLINK_TEMPLATE`, optional: !0, description: '设置为`true`并添加`image_hotlink_template`参数来代理图片' }],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `话题`,
    maintainers: [`xizeyoupan`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`tag`),
        a = (await e(n.base_url + `/v6/page/dataList?url=%23%2Ffeed%2FmultiTagFeedList%3FlistType%3Ddateline_desc%26tag=${i}&title=%E6%9C%80%E6%96%B0%E5%8F%91%E5%B8%83&subTitle=&page=1`, { headers: n.getHeaders() })).data.data,
        o = await Promise.all(a.map((e) => n.parseDynamic(e)));
    if (((o = o.filter(Boolean)), o.length === 0)) throw new t(`这个话题还没有被创建或现在没有图文及动态内容。`);
    return { title: `酷安话题-${i}`, link: `https://www.coolapk.com/`, description: `酷安话题-${i}`, item: o };
}
export { r as route };
