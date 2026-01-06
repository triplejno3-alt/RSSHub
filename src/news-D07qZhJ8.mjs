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
    path: `/news/:category?`,
    categories: [`new-media`],
    example: `/qm120/news`,
    parameters: { category: `分类，见下表，默认为健康焦点` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`qm120.com/`] }],
    name: `新闻`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `qm120.com/`,
    description: `| 健康焦点 | 行业动态 | 医学前沿 | 法规动态 |
| -------- | -------- | -------- | -------- |
| jdxw     | hydt     | yxqy     | fgdt     |

| 食品安全 | 医疗事故 | 医药会展 | 医药信息 |
| -------- | -------- | -------- | -------- |
| spaq     | ylsg     | yyhz     | yyxx     |

| 新闻专题 | 行业新闻 |
| -------- | -------- |
| zhuanti  | xyxw     |`,
};
async function o(a) {
    let o = `http://www.qm120.com/news/${a.req.param(`category`) ?? `jdxw`}`,
        s = i((await n({ method: `get`, url: o })).data),
        c = s(`.lb2boxls ul li a`)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.text(), link: e.attr(`href`) }));
    return (
        (c = await Promise.all(
            c.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return ((a.description = e(`.neirong_body`).html()), (a.pubDate = r(t(e(`.neirong_head p span`).eq(1).text()), 8)), a);
                })
            )
        )),
        { title: `${s(`.zt_liebiao_tit`).text()} - 全民健康网`, link: o, item: c }
    );
}
export { a as route };
