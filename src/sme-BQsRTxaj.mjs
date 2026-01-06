import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `http://www.sme.buaa.edu.cn`,
    o = {
        path: `/sme/:path{.+}?`,
        name: `集成电路科学与工程学院`,
        url: `www.sme.buaa.edu.cn`,
        maintainers: [`MeanZhang`],
        handler: s,
        example: `/buaa/sme/tzgg`,
        parameters: { path: '版块路径，默认为 `tzgg`（通知公告）' },
        description:
            '::: tip\n\n版块路径（`path`）应填写板块 URL 中 `http://www.sme.buaa.edu.cn/` 和 `.htm` 之间的字段。\n\n示例：\n\n1. [通知公告](http://www.sme.buaa.edu.cn/tzgg.htm) 页面的 URL 为 `http://www.sme.buaa.edu.cn/tzgg.htm`，对应的路径参数为 `tzgg`，完整路由为 `/buaa/sme/tzgg`；\n2. [就业信息](http://www.sme.buaa.edu.cn/zsjy/jyxx.htm) 页面的 URL 为 `http://www.sme.buaa.edu.cn/zsjy/jyxx.htm`，对应的路径参数为 `zsjy/jyxx`，完整路由为 `/buaa/sme/zsjy/jyxx`。\n\n:::\n\n::: warning\n\n部分页面（如[学院介绍](http://www.sme.buaa.edu.cn/xygk/xyjs.htm)、[微纳中心](http://www.sme.buaa.edu.cn/wnzx.htm)、[院学生会](http://www.sme.buaa.edu.cn/xsgz/yxsh.htm)）存在无内容、内容跳转至外站等情况，因此可能出现解析失败的现象。\n\n:::',
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    };
async function s(e) {
    let { path: t = `tzgg` } = e.req.param(),
        n = `${a}/${t}.htm`,
        { title: r, list: i } = await c(n);
    return { title: r, link: n, item: await l(i), language: `zh-CN` };
}
async function c(e) {
    let { data: o } = await n(e),
        s = i(o);
    return {
        title: s(`.nytit .fr a`)
            .toArray()
            .slice(1)
            .map((e) => s(e).text().trim())
            .join(` - `),
        list: s(`div[class='Newslist'] > ul > li`)
            .toArray()
            .map((e) => {
                let n = s(e),
                    i = n.find(`a`).attr(`href`);
                return { title: n.find(`a`).text(), link: i?.startsWith(`http`) ? i : `${a}/${i}`, pubDate: r(t(n.find(`span`).text()), 8) };
            }),
    };
}
function l(t) {
    return Promise.all(
        t.map((t) =>
            e.tryGet(t.link, async () => {
                let { data: e } = await n(t.link);
                return ((t.description = i(e)(`div[class="v_news_content"]`).html()), t);
            })
        )
    );
}
export { o as route };
