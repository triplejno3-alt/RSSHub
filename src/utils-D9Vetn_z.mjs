import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = `https://hk01.com`,
    s = `https://web-data.api.hk01.com`,
    c = ({ image: e, teasers: t, blocks: o }) =>
        a(
            i(n, {
                children: [
                    e ? r(`img`, { src: e }) : null,
                    t?.length ? r(`backquote`, { children: t.map((e) => r(`p`, { children: e })) }) : null,
                    o?.length
                        ? o.map((e) => {
                              if (e.blockType === `summary`) return r(`backquote`, { children: e.summary?.map((e) => r(`p`, { children: e })) });
                              if (e.blockType === `text`)
                                  return e.htmlTokens?.map((e) =>
                                      e.map((e) =>
                                          e.type === `text`
                                              ? r(`p`, { children: e.content })
                                              : e.type === `link`
                                                ? r(`a`, { href: e.link, children: e.content })
                                                : e.type === `boldText`
                                                  ? r(`b`, { children: e.content })
                                                  : e.type === `boldLink`
                                                    ? r(`a`, { href: e.link, children: r(`b`, { children: e.content }) })
                                                    : null
                                      )
                                  );
                              if (e.blockType === `quote`) return i(`q`, { children: [e.message, ` —— `, e.author] });
                              if (e.blockType === `image`) {
                                  let { image: t } = e;
                                  return t ? i(`figure`, { children: [r(`figurecaption`, { children: t.caption }), r(`img`, { src: t.cdnUrl, alt: t.caption, height: t.originalHeight, width: t.originalWidth })] }) : null;
                              }
                              return e.blockType === `gallery`
                                  ? e.images?.map((e) => i(`figure`, { children: [r(`figurecaption`, { children: e.caption }), r(`img`, { src: e.cdnUrl, alt: e.caption, height: e.originalHeight, width: e.originalWidth })] }))
                                  : null;
                          })
                        : null,
                ],
            })
        ),
    l = (n, r, i) =>
        Promise.all(
            n
                .filter((e) => e.type !== 2)
                .slice(0, r ? Number.parseInt(r) : 50)
                .map((t) => ({
                    title: t.data.title,
                    link: `${o}/sns/article/${t.data.articleId}`,
                    pubDate: e(t.data.publishTime * 1e3),
                    category: t.data.tags.map((e) => e.tagName),
                    author: t.data.authors.map((e) => e.publishName).join(`, `),
                }))
                .map((e) =>
                    i(e.link, async () => {
                        let n = await t({ method: `get`, url: e.link }),
                            r = JSON.parse(n.data.match(/"__NEXT_DATA__" type="application\/json">({"props":.*})<\/script>/)[1]);
                        return (
                            (e.description = c({ image: r.props.initialProps.pageProps.article.originalImage.cdnUrl, teasers: r.props.initialProps.pageProps.article.teaser, blocks: r.props.initialProps.pageProps.article.blocks })),
                            e
                        );
                    })
                )
        );
export { s as n, o as r, l as t };
