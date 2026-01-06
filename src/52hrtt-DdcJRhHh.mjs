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
    path: `/:area?/:type?`,
    categories: [`new-media`],
    example: `/52hrtt/global`,
    parameters: { area: `地区，默认为全球`, type: `分类，默认为新闻` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `新闻`,
    maintainers: [`nczitzk`],
    handler: o,
    description:
        '地区和分类皆可在浏览器地址栏中找到，下面是一个例子。\n\n  访问华人头条全球站的国际分类，会跳转到 `https://www.52hrtt.com/global/n/w?infoTypeId=A1459145516533`。其中 `global` 即为 **全球** 对应的地区代码，`A1459145516533` 即为 **国际** 对应的分类代码。',
};
async function o(a) {
    let o = a.req.param(`area`) ?? `global`,
        s = a.req.param(`type`) ?? ``,
        c = `https://www.52hrtt.com`,
        l = `${c}/${o}/n/w${s ? `?infoTypeId=${s}` : ``}`,
        u = await n({ method: `get`, url: `${c}/s/webapi/${o}/n/w${s ? `?infoTypeId=${s}` : ``}` }),
        d = i((await n({ method: `get`, url: l })).data),
        f = u.data.data.infosMap.infoList.filter((e) => e.infoTitle).map((e) => ({ title: e.infoTitle, author: e.quoteFrom, pubDate: r(t(e.infoStartTime), 8), link: `${c}/${o}/n/w/info/${e.infoCentreId}` })),
        p = await Promise.all(f.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n({ method: `get`, url: t.link })).data)(`.info-content`).html()), t))));
    return { title: `${u.data.data.area.areaName} - ${d(`.router-link-active`).eq(0).text()} - 华人头条`, link: l, item: p };
}
export { a as route };
