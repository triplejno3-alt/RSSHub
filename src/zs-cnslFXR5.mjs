import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = async (i) => {
        let { category: o = `zsxx1/zskx` } = i.req.param(),
            s = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            c = new URL(`${o}.htm`, `https://zs.xjtu.edu.cn`).href,
            l = a(await e(c)),
            u = l(`html`).attr(`lang`) ?? `zh`,
            d = [];
        ((d = l(`section.TextList ul li`)
            .slice(0, s)
            .toArray()
            .map((e) => {
                let t = l(e),
                    r = t.find(`a.flex`),
                    i = r.text(),
                    a = t.find(`b`).text(),
                    o = r.attr(`href`),
                    s = t.find(`i.zc`).toArray(),
                    d = [...new Set(s.map((e) => l(e).text()).filter(Boolean))],
                    f = a;
                return { title: i, pubDate: a ? n(a) : void 0, link: o ? new URL(o, c).href : void 0, category: d, updated: f ? n(f) : void 0, language: u };
            })),
            (d = (
                await Promise.all(
                    d.map((i) =>
                        i.link
                            ? t.tryGet(i.link, async () => {
                                  let t = a(await e(i.link)),
                                      o = t(`div.show01 h5`).text(),
                                      s = t(`div.v_news_content`).html(),
                                      c = t(`div.show01 i`)
                                          .text()
                                          ?.match(/(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})/)?.[1],
                                      l = t(`div.mianbao a`).toArray().slice(1),
                                      d = [...new Set(l.map((e) => t(e).text()).filter(Boolean))],
                                      f = c,
                                      p = { title: o, description: s, pubDate: c ? r(n(c), 8) : i.pubDate, category: d, content: { html: s, text: s }, updated: f ? r(n(f), 8) : i.updated, language: u };
                                  return { ...i, ...p };
                              })
                            : i
                    )
                )
            ).filter((e) => !0)));
        let f = l(`title`).text();
        return { title: f, description: f.split(/-/)[0], link: c, item: d, allowEmpty: !0, image: l(`div.logoimg img`).attr(`src`), author: l(`META[Name="keywords"]`).attr(`Content`), language: u, id: c };
    },
    s = {
        path: `/zs/:category{.+}?`,
        name: `本科招生网`,
        url: `zs.xjtu.edu.cn`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/xjtu/zs/zsxx1/zskx`,
        parameters: {
            category: {
                description: `分类，默认为 zsxx1/zskx，可在对应分类页 URL 中找到`,
                options: [
                    { label: `招生快讯`, value: `zsxx1/zskx` },
                    { label: `招生政策`, value: `zsxx1/zszc` },
                    { label: `招生计划`, value: `zsxx1/zsjh` },
                    { label: `阳光公告`, value: `zsxx1/yggg` },
                    { label: `历年录取`, value: `zsxx1/lnlq` },
                ],
            },
        },
        description:
            '::: tip\n若订阅 [招生快讯](https://zs.xjtu.edu.cn/zsxx1/zskx.htm)，网址为 `https://zs.xjtu.edu.cn/zsxx1/zskx.htm`，请截取 `https://zs.xjtu.edu.cn/` 到末尾 `.htm` 的部分 `zsxx1/zskx` 作为 `category` 参数填入，此时目标路由为 [`/xjtu/zs/zsxx1/zskx`](https://rsshub.app/xjtu/zs/zsxx1/zskx)。\n:::\n\n| [招生快讯](https://zs.xjtu.edu.cn/zsxx1/zskx.htm)   | [招生政策](https://zs.xjtu.edu.cn/zsxx1/zszc.htm)   | [招生计划](https://zs.xjtu.edu.cn/zsxx1/zsjh.htm)   | [阳光公告](https://zs.xjtu.edu.cn/zsxx1/yggg.htm)   | [历年录取](https://zs.xjtu.edu.cn/zsxx1/lnlq.htm)   |\n| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |\n| [zsxx1/zskx](https://rsshub.app/xjtu/zs/zsxx1/zskx) | [zsxx1/zszc](https://rsshub.app/xjtu/zs/zsxx1/zszc) | [zsxx1/zsjh](https://rsshub.app/xjtu/zs/zsxx1/zsjh) | [zsxx1/yggg](https://rsshub.app/xjtu/zs/zsxx1/yggg) | [zsxx1/lnlq](https://rsshub.app/xjtu/zs/zsxx1/lnlq) |\n',
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`zs.xjtu.edu.cn/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/xjtu/zs${t ? `/${t}` : ``}`;
                },
            },
        ],
        view: i.Articles,
    };
export { o as handler, s as route };
