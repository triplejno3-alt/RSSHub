import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
const o = (e) => a.decode(e, `gbk`),
    s = {
        path: `/jsjxy`,
        categories: [`university`],
        example: `/stbu/jsjxy`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`jsjxy.stbu.edu.cn/news`, `jsjxy.stbu.edu.cn`] }, { source: [`stbu.edu.cn`] }],
        name: `计算机学院 - 通知公告`,
        maintainers: [`HyperCherry`],
        handler: c,
        url: `jsjxy.stbu.edu.cn/news`,
        description: `::: warning
计算机学院通知公告疑似禁止了非大陆 IP 访问，使用路由需要自行 [部署](https://docs.rsshub.app/deploy/)。
:::`,
    };
async function c() {
    let a = `https://jsjxy.stbu.edu.cn/news/`,
        { data: s } = await n(a, { responseType: `buffer`, https: { rejectUnauthorized: !1 } }),
        c = i(o(s)),
        l = c(`.content dl h4`)
            .toArray()
            .map((e) => {
                e = c(e);
                let t = e.find(`a`).first();
                return { title: t.text(), link: t.attr(`href`) };
            });
    return {
        title: `四川工商学院计算机学院 - 新闻动态`,
        link: a,
        description: `四川工商学院计算机学院 - 新闻动态`,
        item: await Promise.all(
            l.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link, { responseType: `buffer`, https: { rejectUnauthorized: !1 } }),
                        s = i(o(e));
                    return (
                        (a.description = s(`.content14`).first().html().trim()),
                        (a.pubDate = r(
                            t(
                                s(`.article .source`)
                                    .text()
                                    .split(`日期：`)[1]
                                    .replace(
                                        `
`,
                                        ``
                                    )
                                    .trim()
                            ),
                            8
                        )),
                        a
                    );
                })
            )
        ),
    };
}
export { s as route };
