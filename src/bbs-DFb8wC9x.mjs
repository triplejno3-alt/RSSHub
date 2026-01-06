import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = {
    path: [`/bbs/:id?/:order?`, `/bxj/:id?/:order?`],
    categories: [`bbs`],
    example: `/hupu/bbs/topic-daily`,
    parameters: { id: `编号，可在对应社区 URL 中找到，默认为#步行街主干道`, order: '排序方式，可选 `0` 即 最新回复 或 `1` 即 最新发布，默认为最新回复' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`m.hupu.com/:category`, `m.hupu.com/`], target: `/:category` }],
    name: `社区`,
    maintainers: [`LogicJake`, `nczitzk`],
    handler: u,
    description: `::: tip
  更多社区参见 [社区](https://bbs.hupu.com)
:::`,
};
async function u(l) {
    let u = l.req.param(`id`) ?? `34`,
        d = l.req.param(`order`) ?? `1`,
        f = `https://bbs.hupu.com`,
        p = `${f}/${u}${d === `1` ? `-postdate` : ``}`,
        m = s((await n({ method: `get`, url: p })).data);
    m(`.page-icon`).remove();
    let h = m(`.bbs-sl-web-post-layout .post-title a`)
        .toArray()
        .map((e) => ((e = m(e)), { title: e.text(), link: `${f}${e.attr(`href`)}`, pubDate: r(t(e.parent().parent().find(`.post-time`).text(), `MM-DD HH:mm`), 8) }));
    return (
        (h = await Promise.all(
            h.map((t) =>
                e.tryGet(t.link, async () => {
                    try {
                        let e = await n({ method: `get`, url: t.link }),
                            r = s(e.data);
                        (r(`.seo-dom`).remove(), (t.author = r(`.post-user-comp-info-top-name`).first().text()), (t.description = r(`.main-thread`).first().html()));
                        let l = e.data.match(/matchId=(\d+)-BATTLE_REPORT/);
                        if (l) {
                            e = await n({ method: `get`, url: `https://games.mobileapi.hupu.com/1/7.5.36/basketballapi/news/battleReport?relationId=${l[1]}&relationType=BATTLE_REPORT` });
                            let r = e.data.result;
                            t.description = c(
                                o(i, {
                                    children: [
                                        r.img ? a(`img`, { src: r.img }) : null,
                                        r.beginContent ? a(`p`, { children: r.beginContent }) : null,
                                        r.keyEvent?.length
                                            ? o(i, { children: [a(`h1`, { children: `关键事件` }), r.keyEvent.map((e) => o(i, { children: [a(`p`, { children: e.title }), e.gifImgs?.map((e) => a(`img`, { src: e }))] }))] })
                                            : null,
                                        r.playerScoreImg ? o(i, { children: [a(`h1`, { children: `球员评分` }), a(`img`, { src: r.playerScoreImg })] }) : null,
                                    ],
                                })
                            );
                        }
                    } catch {}
                    return t;
                })
            )
        )),
        { title: `虎扑社区 - ${m(`.bbs-sl-web-intro-detail-title`).text()}`, link: p, item: h, description: m(`.bbs-sl-web-intro-detail-desc-text`).first().text() }
    );
}
export { l as route };
