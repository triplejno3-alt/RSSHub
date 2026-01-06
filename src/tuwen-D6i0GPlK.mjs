import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './utils-Nfz9OT6p.mjs';
const n = {
    path: [`/tuwen/:type?`],
    categories: [`social-media`],
    example: `/coolapk/tuwen`,
    parameters: { type: `默认为hot` },
    features: {
        requireConfig: [{ name: `ALLOW_USER_HOTLINK_TEMPLATE`, optional: !0, description: '设置为`true`并添加`image_hotlink_template`参数来代理图片' }],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `图文`,
    maintainers: [`xizeyoupan`],
    handler: r,
    description: `| 参数名称 | 编辑精选 | 最新   |
| -------- | -------- | ------ |
| type     | hot      | latest |`,
};
async function r(n) {
    let r = n.req.param(`type`) || `hot`,
        i,
        a = new URL(`/v6/page/dataList`, t.base_url);
    (r === `latest`
        ? (a.searchParams.append(`url`, `/feed/digestList?${new URLSearchParams(`cacheExpires=300&type=12&message_status=all&is_html_article=1&filterEmptyPicture=1&filterTag=二手交易,酷安自贸区,薅羊毛小分队`).toString()}`),
          a.searchParams.append(`title`, `新鲜图文`),
          a.searchParams.append(`subTitle`, ``),
          (i = `酷安 - 新鲜图文`))
        : (a.searchParams.append(`url`, `#/feed/digestList?${new URLSearchParams(`type=12&is_html_article=1&recommend=3,4`).toString()}`), a.searchParams.append(`title`, `图文`), (i = `酷安图文 - 编辑精选`)),
        a.searchParams.append(`page`, `1`));
    let o = (await e(a, { headers: t.getHeaders() })).data.data,
        s = await Promise.all(o.map((e) => t.parseDynamic(e)));
    return { title: i, link: `https://www.coolapk.com/`, description: i, item: s };
}
export { n as route };
