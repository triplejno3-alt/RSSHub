import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/seie/news_center`,
    categories: [`university`],
    example: `/scut/seie/news_center`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www2.scut.edu.cn/ee/16285/list.htm`] }],
    name: `电子与信息学院 - 新闻速递`,
    maintainers: [`auto-bot-ty`],
    handler: a,
    url: `www2.scut.edu.cn/ee/16285/list.htm`,
    description: `::: warning
由于学院官网对非大陆 IP 的访问存在限制，需自行部署。
:::`,
};
async function a() {
    let i = `https://www2.scut.edu.cn`,
        a = `${i}/ee/16285/list.htm`,
        o = r((await n(a)).data),
        s = o(`.news_ul li`)
            .toArray()
            .map((e) => {
                e = o(e);
                let n = e.find(`.news_title a`);
                return { title: n.attr(`title`), link: n.attr(`href`), pubDate: t(e.find(`.news_meta`).text(), `YYYY-MM-DD`) };
            });
    return {
        title: `华南理工大学电子与信息学院 - 新闻速递`,
        link: a,
        item: await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(`${i}${t.link}`)).data);
                    return (
                        e(`.wp_articlecontent *`).each((t, n) => {
                            let r = e(n);
                            (r.removeAttr(`style`),
                                r.removeAttr(`lang`),
                                r.removeAttr(`original-src`),
                                r.removeAttr(`sudyfile-attr`),
                                r.removeAttr(`data-layer`),
                                ((!r
                                    .text()
                                    .replace(
                                        `
`,
                                        ``
                                    )
                                    .trim().length &&
                                    !r.has(`img`)) ||
                                    r.attr(`name`) === `_GoBack` ||
                                    r.is(`style`)) &&
                                    r.remove());
                        }),
                        (t.description = e(`.wp_articlecontent`)
                            .html()
                            .replaceAll(/^(<br>)+|(<br>)+$/g, ``)
                            .trim()),
                        t
                    );
                })
            )
        ),
    };
}
export { i as route };
