import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/symposium/:id?/:classId?`,
    categories: [`new-media`],
    example: `/52hrtt/symposium/F1626082387819`,
    parameters: { id: `专题 id`, classId: `子分类 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`52hrtt.com/global/n/w/symposium/:id`], target: `/symposium/:id` }],
    name: `专题`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `专题 id 和 子分类 id 皆可在浏览器地址栏中找到，下面是一个例子。

  访问 “邱毅看平潭” 专题，会跳转到 \`https://www.52hrtt.com/global/n/w/symposium/F1626082387819\`。其中 \`F1626082387819\` 即为 **专题 id** 对应的地区代码。

::: tip
  更多的专题可以点击 [这里](https://www.52hrtt.com/global/n/w/symposium)
:::`,
};
async function o(a) {
    let o = a.req.param(`id`) ?? ``,
        s = a.req.param(`classId`) ?? ``,
        c = `https://www.52hrtt.com`,
        l = `${c}/global/n/w/symposium/${o}`,
        u = await n({ method: `get`, url: `${c}/s/webapi/global/symposium/getInfoList?symposiumId=${o}${s ? `&symposiumclassId=${s}` : ``}` }),
        d = i((await n({ method: `get`, url: l })).data),
        f = u.data.data.filter((e) => e.infoTitle).map((e) => ({ title: e.infoTitle, author: e.quoteFrom, pubDate: r(t(e.infoStartTime), 8), link: `${c}/global/n/w/info/${e.infoCentreId}` })),
        p = await Promise.all(f.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n({ method: `get`, url: t.link })).data)(`.info-content`).html()), t))));
    return { title: d(`title`).text(), link: l, item: p };
}
export { a as route };
