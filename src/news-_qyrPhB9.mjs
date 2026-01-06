import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { t as a } from './description-CW5ZppJY.mjs';
import { load as o } from 'cheerio';
const s = async (i) => {
        let { category: s = `new` } = i.req.param(),
            c = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            l = `https://www.ali213.net`,
            u = new URL(`news/${s.endsWith(`/`) ? s : `${s}/`}`, l).href,
            d = o(await e(u)),
            f = d(`html`).prop(`lang`) ?? `zh-CN`,
            p = d(`div.n_lone`)
                .slice(0, c)
                .toArray()
                .map((e) => {
                    let t = d(e),
                        r = t.find(`h2.lone_t a`),
                        i = r.prop(`title`) || r.text(),
                        o = r.prop(`href`),
                        s = t.find(`img`),
                        c = s?.prop(`src`),
                        l = s?.prop(`alt`),
                        u = t.find(`div.lone_f_r_t`).text(),
                        p = a({ images: s ? [{ src: c, alt: l }] : void 0, intro: u }),
                        m = t.find(`div.lone_f_r_f span`).last().text().split(/：/).pop();
                    return { title: i, description: p, pubDate: n(t.find(`div.lone_f_r_f span`).first().text()), link: o, author: m, content: { html: p, text: t.find(`div.lone_f_r_t`).text() }, image: c, banner: c, language: f };
                });
        p = (
            await Promise.all(
                p.map((i) =>
                    !i.link && typeof i.link != `string`
                        ? i
                        : t.tryGet(i.link, async () => {
                              try {
                                  let t = o(await e(i.link)),
                                      s = t(`h1.newstit`).text(),
                                      c = t(`div#Content img`).first().prop(`src`),
                                      l = t(`div#Content p span img`),
                                      u = {};
                                  l.length &&
                                      l.each((e, n) => {
                                          let r = t(n),
                                              i = r.closest(`p`),
                                              o = r.prop(`src`),
                                              s = o?.split(/\./).pop();
                                          s && o && ((u[s] = { url: o }), i.replaceWith(a({ images: [{ src: o }] })));
                                      });
                                  let d = a({ description: t(`div#Content`).html() ?? `` }),
                                      p = t(`div.extend_read ul li a`)
                                          .toArray()
                                          .map((e) => {
                                              let n = t(e);
                                              return { url: n.prop(`href`), type: `related`, content_html: n.prop(`title`) || n.text() };
                                          })
                                          .filter((e) => !0);
                                  return {
                                      ...i,
                                      title: s,
                                      description: d,
                                      pubDate: r(n(t(`div.newstag_l`).text().split(/\s/)[0]), 8),
                                      content: { html: d, text: t(`div#Content`).html() ?? `` },
                                      image: c,
                                      banner: c,
                                      language: f,
                                      media: Object.keys(u).length > 0 ? u : void 0,
                                      _extra: { links: p.length > 0 ? p : void 0 },
                                  };
                              } catch {
                                  return i;
                              }
                          })
                )
            )
        ).filter((e) => !0);
        let m = `游侠网`,
            h = d(`div.news-list-title`).text(),
            g = new URL(`news/images/ali213_app_big.png`, l).href;
        return { title: `${m} - ${h}`, description: h, link: u, item: p, allowEmpty: !0, image: g, author: m, language: f, id: u };
    },
    c = {
        path: `/news/:category?`,
        name: `资讯`,
        url: `www.ali213.net`,
        maintainers: [`nczitzk`],
        handler: s,
        example: `/ali213/news/new`,
        parameters: { category: '分类，默认为 `new`，即最新资讯，可在对应分类页 URL 中找到' },
        description: `::: tip
若订阅 [游戏资讯](https://www.ali213.net/news/game/)，网址为 \`https://www.ali213.net/news/game/\`，请截取 \`https://www.ali213.net/news/\` 到末尾 \`/\` 的部分 \`game\` 作为 \`category\` 参数填入，此时目标路由为 [\`/ali213/news/game\`](https://rsshub.app/ali213/news/game)。
:::

| 分类名称 | 分类 ID |
| -------- | ------- |
| 最新资讯 | new     |
| 评测     | pingce  |
| 游戏     | game    |
| 动漫     | comic   |
| 影视     | movie   |
| 科技     | tech    |
| 电竞     | esports |
| 娱乐     | amuse   |
| 手游     | mobile  |
`,
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.ali213.net/news/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/news/${t ? `/${t}` : ``}`;
                },
            },
            { title: `最新资讯`, source: [`www.ali213.net/news/new`], target: `/news/new` },
            { title: `评测`, source: [`www.ali213.net/news/pingce`], target: `/news/pingce` },
            { title: `游戏`, source: [`www.ali213.net/news/game`], target: `/news/game` },
            { title: `动漫`, source: [`www.ali213.net/news/comic`], target: `/news/comic` },
            { title: `影视`, source: [`www.ali213.net/news/movie`], target: `/news/movie` },
            { title: `科技`, source: [`www.ali213.net/news/tech`], target: `/news/tech` },
            { title: `电竞`, source: [`www.ali213.net/news/esports`], target: `/news/esports` },
            { title: `娱乐`, source: [`www.ali213.net/news/amuse`], target: `/news/amuse` },
            { title: `手游`, source: [`www.ali213.net/news/mobile`], target: `/news/mobile` },
        ],
        view: i.Articles,
    };
export { s as handler, c as route };
