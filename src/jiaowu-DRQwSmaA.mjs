import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './constants-DH4XKqIW.mjs';
import { load as a } from 'cheerio';
const o = async (t, n = `gb2312`) => new TextDecoder(n).decode(await e(t, { responseType: `arrayBuffer` })),
    s = (e) => {
        let t = e.trim();
        return ((t = t.startsWith(`&nbsp;&nbsp;`) ? t.slice(12) : t), (t = t.endsWith(`<br>`) ? t.slice(0, Math.max(0, t.length - 4)) : t), t.trim());
    },
    c = {
        path: `/jiaowu/jxtz/:detail?`,
        categories: [`university`],
        example: `/sicau/jiaowu/jxtz/detail`,
        parameters: { detail: `是否抓取全文，该值只要不为空就抓取全文返回，否则只返回标题` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`jiaowu.sicau.edu.cn/web/web/web/index.asp`], target: `/jiaowu/jxtz` }],
        name: `教务处`,
        maintainers: [`hualiong`],
        description: `
::: tip
抓取全文返回会导致更长的响应时间，可以尝试使用 \`/sicau/jiaowu/jxtz\` 路径，这将只返回标题，然后再在应用内抓取全文内容。
:::
`,
        url: `jiaowu.sicau.edu.cn/`,
        handler: async (e) => {
            let c = `https://jiaowu.sicau.edu.cn/web/web/web`,
                { detail: l = null } = e.req.param(),
                u = a(await o(`${c}/gwmore.asp`)),
                d = u(`tbody > .text-c:nth-child(-n+10)`)
                    .toArray()
                    .map((e) => {
                        let t = u(e).children(),
                            i = t.eq(2).find(`a`);
                        return {
                            category: [t.eq(1).text()],
                            link: `${c}/${i.attr(`href`)}`,
                            title: i.children().first().text(),
                            pubDate: r(n(t.eq(3).text(), `YYYY-M-D`), 8),
                            author: t.eq(4).text(),
                            description: `请在应用内抓取全文内容`,
                        };
                    });
            return (
                l && (d = await Promise.all(d.map((e) => t.tryGet(e.link, async () => ((e.description = s(a(await o(e.link))(`.text1[width="95%"] b`).html())), e))))),
                { title: `教学通知 - 四川农业大学教务处`, link: `https://jiaowu.sicau.edu.cn/web/web/web/gwmore.asp`, language: i.Chinese, item: d }
            );
        },
    };
export { c as route };
