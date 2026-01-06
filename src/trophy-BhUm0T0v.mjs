import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/trophy/:id`,
    categories: [`game`],
    example: `/ps/trophy/DIYgod_`,
    parameters: { id: `User ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `PlayStation Network user trophy`,
    maintainers: [`DIYgod`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`id`),
        i = t((await e({ method: `get`, url: `https://psnprofiles.com/${r}?order=last-trophy` })).data),
        a = i(`.zebra tr`)
            .filter((e) => i(e).find(`.progress-bar span`).text() !== `0%`)
            .toArray()
            .map((e) => i(e).find(`.title`).attr(`href`))
            .slice(0, 3),
        o = await Promise.all(
            a.map(async (n) => {
                let r = t((await e({ method: `get`, url: `https://psnprofiles.com` + n + `?order=date&trophies=earned&lang=zh-cn` })).data);
                return r(`.zebra tr.completed`)
                    .toArray()
                    .map(
                        (e) => (
                            (e = r(e)),
                            {
                                title: e.find(`.title`).text() + ` - ` + r(`.page h3`).eq(0).text().trim().replace(` Trophies`, ``),
                                description: `<img src="${e.find(`.trophy source`).attr(`srcset`).split(` `)[1]}"><br>${e
                                    .find(`.title`)
                                    .parent()
                                    .contents()
                                    .filter((e, t) => t.nodeType === 3)
                                    .text()
                                    .trim()}<br>等级：${{ Platinum: `白金`, Gold: `金`, Silver: `银`, Bronze: `铜` }[e.find(`td`).eq(5).find(`img`).attr(`title`)]}<br>珍贵度：${e.find(`.hover-show .typo-top`).text()}`,
                                link: `https://psnprofiles.com` + e.find(`.title`).attr(`href`),
                                pubDate: new Date(
                                    +new Date(
                                        e
                                            .find(`.typo-top-date nobr`)
                                            .contents()
                                            .filter((e, t) => t.nodeType === 3)
                                            .text() +
                                            ` ` +
                                            e.find(`.typo-bottom-date`).text()
                                    ) +
                                        480 * 60 * 1e3
                                ).toUTCString(),
                            }
                        )
                    );
            })
        ),
        s = [];
    for (let e of o) s = [...s, ...e];
    return ((s = s.toSorted((e, t) => new Date(t.pubDate) - new Date(e.pubDate))), { title: `${r} 的 PSN 奖杯`, link: `https://psnprofiles.com/${r}/log`, item: s });
}
export { n as route };
