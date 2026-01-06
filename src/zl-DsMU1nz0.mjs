import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './description-CW5ZppJY.mjs';
import { load as a } from 'cheerio';
const o = async (r) => {
        let { category: o } = r.req.param(),
            s = Number.parseInt(r.req.query(`limit`) ?? `1`, 10),
            c = `https://www.ali213.net`,
            l = new URL(`/news/zl/${o ? (o.endsWith(`/`) ? o : `${o}/`) : ``}`, c).href,
            u = new URL(`ajax/newslist`, `https://mp.ali213.net`).href,
            d = await e(u, { query: { type: `new` } }),
            f = a(await e(l)),
            p = f(`html`).prop(`lang`) ?? `zh`,
            m = JSON.parse(d.replace(/^\((.*)\)$/, `$1`))
                .data.slice(0, s)
                .map((e) => {
                    let t = e.Title,
                        r = i({ intro: e.GuideRead ?? `` }),
                        a = `ali213-zl-${e.ID}`,
                        o = e.PicPath ? `https:${e.PicPath}` : void 0,
                        s = e.xiaobian;
                    return {
                        title: t,
                        description: r,
                        pubDate: n(e.addtime * 1e3),
                        link: e.url ? `https:${e.url}` : void 0,
                        author: s,
                        guid: a,
                        id: a,
                        content: { html: r, text: e.GuideRead ?? `` },
                        image: o,
                        banner: o,
                        language: p,
                    };
                });
        m = (
            await Promise.all(
                m.map((n) =>
                    !n.link && typeof n.link != `string`
                        ? n
                        : t.tryGet(n.link, async () => {
                              let t = a(await e(n.link)),
                                  r = t(`h1.newstit`).text(),
                                  o = t(`div#Content`).html() ?? ``,
                                  s = [];
                              t(`a.currpage`)
                                  .parent()
                                  .find(`a:not(.currpage)`)
                                  .each((e, n) => {
                                      let r = t(n).attr(`href`);
                                      r && s.push(r);
                                  });
                              let c = await Promise.all(s.map(async (t) => a(await e(new URL(t, n.link).href))(`div#Content`).html() ?? ``));
                              ((o += c.join(``)), (o = i({ description: o })));
                              let l = t(`div.extend_read a`)
                                  .toArray()
                                  .map((e) => {
                                      let n = t(e);
                                      return { url: n.prop(`href`), type: `related`, content_html: n.text() };
                                  })
                                  .filter((e) => !0);
                              return {
                                  title: r,
                                  description: o,
                                  pubDate: n.pubDate,
                                  category: t(`.category`)
                                      .toArray()
                                      .map((e) => t(e).text()),
                                  author: n.author,
                                  doi: t(`meta[name="citation_doi"]`).prop(`content`) || void 0,
                                  guid: n.guid,
                                  id: n.guid,
                                  content: { html: o, text: o },
                                  image: n.image,
                                  banner: n.image,
                                  language: p,
                                  _extra: { links: l.length > 0 ? l : void 0 },
                              };
                          })
                )
            )
        ).filter((e) => !0);
        let h = f(`title`).text(),
            g = new URL(`news/images/dxhlogo.png`, c).href;
        return { title: h, description: f(`meta[name="description"]`).prop(`content`), link: l, item: m, allowEmpty: !0, image: g, author: h.split(/_/).pop(), language: p, id: l };
    },
    s = {
        path: `/zl/:category?`,
        name: `大侠号`,
        url: `www.ali213.net`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/ali213/zl`,
        parameters: { category: `分类，默认为首页，可在对应分类页 URL 中找到` },
        description:
            '::: tip\n若订阅 [游戏](https://www.ali213.net/news/zl/game/)，网址为 `https://www.ali213.net/news/zl/game/`，请截取 `https://www.ali213.net/news/zl/` 到末尾 `/` 的部分 `game` 作为 `category` 参数填入，此时目标路由为 [`/ali213/zl/game`](https://rsshub.app/ali213/zl/game)。\n:::\n\n| 首页                                     | 游戏                                         | 动漫                                           | 影视                                           | 娱乐                                           |\n| ---------------------------------------- | -------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |\n| [index](https://www.ali213.net/news/zl/) | [game](https://www.ali213.net/news/zl/game/) | [comic](https://www.ali213.net/news/zl/comic/) | [movie](https://www.ali213.net/news/zl/movie/) | [amuse](https://www.ali213.net/news/zl/amuse/) |\n',
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.ali213.net/news/zl/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/ali213/zl${t ? `/${t}` : ``}`;
                },
            },
            { title: `首页`, source: [`www.ali213.net/news/zl/`], target: `/zl` },
            { title: `游戏`, source: [`www.ali213.net/news/zl/game/`], target: `/zl/game` },
            { title: `动漫`, source: [`www.ali213.net/news/zl/comic/`], target: `/zl/comic` },
            { title: `影视`, source: [`www.ali213.net/news/zl/movie/`], target: `/zl/movie` },
            { title: `娱乐`, source: [`www.ali213.net/news/zl/amuse/`], target: `/zl/amuse` },
        ],
        view: r.Articles,
    };
export { o as handler, s as route };
