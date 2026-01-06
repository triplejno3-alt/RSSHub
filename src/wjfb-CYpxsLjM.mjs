import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.miit.gov.cn`,
    a = {
        path: `/miit/wjfb/:ministry`,
        categories: [`government`],
        example: `/gov/miit/wjfb/ghs`,
        parameters: { ministry: `部门缩写，可以在对应 URL 中获取` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`miit.gov.cn/jgsj/:ministry/wjfb/index.html`] }],
        name: `文件发布`,
        maintainers: [`Fatpandac`],
        handler: o,
    };
async function o(a) {
    let o = `${i}/jgsj/${a.req.param(`ministry`)}/wjfb/index.html`,
        s = await n(o),
        c = s.headers[`set-cookie`][0].split(`;`)[0],
        l = r(s.data),
        u = l(`div.dqwz > a:nth-child(4)`).text(),
        d = l(`div.lmy_main_rb > script:nth-child(2)`)
            .toArray()
            .map((e) => ({ url: `${i}${l(e).attr(`url`)}`, queryData: JSON.parse(l(e).attr(`querydata`).replaceAll(`"`, `|`).replaceAll(`'`, `"`).replaceAll(`|`, `"`)) }))[0],
        f = r(
            (
                await n({
                    method: `get`,
                    url: `${d.url}?${Object.keys(d.queryData)
                        .map((e) => `${e}=${d.queryData[e]}`)
                        .join(`&`)}`,
                    headers: { Cookie: c },
                })
            ).data.data.html
        ),
        p = f(`ul > li`)
            .toArray()
            .map((e) => ({ title: f(e).find(`a`).text(), link: new URL(f(e).find(`a`).attr(`href`), i).href, pubDate: t(f(e).find(`span`).text(), `YYYY-MM-DD`) })),
        m = await Promise.all(
            p.map((t) =>
                e.tryGet(
                    t.link,
                    async () => (
                        (t.description = r((await n(t.link)).data)(`#con_con`)
                            .html()
                            .replaceAll(/(<iframe.*?src=")(.*?)(".*?>)/g, `$1` + i + `$2$3`)),
                        t
                    )
                )
            )
        );
    return { title: `工业和信息化部 - ${u} 文件发布`, link: o, item: m };
}
export { a as route };
