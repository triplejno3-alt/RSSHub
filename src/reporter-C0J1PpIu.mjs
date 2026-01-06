import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { n, t as r } from './utils-BzNsBsFu.mjs';
const i = {
    path: `/app/reporter/:id`,
    categories: [`traditional-media`],
    example: `/oeeee/app/reporter/249`,
    parameters: { id: `记者 UID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `南都客户端（按记者）`,
    maintainers: [`TimWu007`],
    handler: a,
    description: '记者的 UID 可通过 `m.mp.oeeee.com` 下的文章页面获取。点击文章下方的作者头像，进入该作者的个人主页，即可从 url 中获取。',
};
async function a(i) {
    let a = i.req.param(`id`) ?? 0,
        { data: o } = await t(`https://m.mp.oeeee.com/show.php?m=Doc&a=getAuthorInfo&id=${a}`),
        s = o.data.list.map((e) => ({ title: `【` + e.media_nickname + `】` + e.title, description: n({ thumb: e.titleimg, description: e.summary }), link: e.url })),
        c = o.data.info ? o.data.info.name : ``,
        l = await Promise.all(s.map((t) => r(t, e.tryGet)));
    return { title: `南方都市报奥一网 - ${c}`, link: `https://m.mp.oeeee.com/w/${a}.html`, item: l };
}
export { i as route };
