import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
const i = [`hakka`, `political`, `medical`, `local`, `international`],
    a = `https://www.hakkatv.org.tw`,
    o = `https://api.hakkatv.org.tw`,
    s = {
        path: `/news/:type?`,
        categories: [`traditional-media`],
        example: `/hakkatv/news`,
        parameters: { type: `新聞，見下表，留空為全部` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`hakkatv.org.tw/news`], target: `/news` }],
        name: `新聞首頁`,
        maintainers: [`TonyRL`],
        handler: c,
        url: `hakkatv.org.tw/news`,
        description: `| 客家焦點 | 政經要聞  | 民生醫療 | 地方風采 | 國際萬象      |
| -------- | --------- | -------- | -------- | ------------- |
| hakka    | political | medical  | local    | international |`,
    };
async function c(s) {
    let c = s.req.param(`type`),
        l = (
            c
                ? (await n(`${o}/api/news/index`, { searchParams: { per: 4, 'sort[created_at]': `desc`, type: c, keywords: `` } })).data.data
                : await Promise.all(
                      i.map(async (e) => {
                          let { data: t } = await n(`${o}/api/news/index`, { searchParams: { per: 4, 'sort[created_at]': `desc`, type: e, keywords: `` } });
                          return t.data;
                      })
                  )
        )
            .flat()
            .map((e) => ({ title: e.title, pubDate: r(t(e.created_at), 8), author: e.author, link: `${a}/news-detail/${e.id}`, id: e.id })),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(`${o}/api/news/read/${t.id}`);
                    return (
                        (t.category = e.tag.map((e) => e.tag)),
                        (t.description = e.content.replaceAll(
                            `
`,
                            `<br>`
                        )),
                        delete t.id,
                        t
                    );
                })
            )
        );
    return { title: `新聞首頁 - 客家電視台`, description: `客家電視是屬於全民、以至於全世界客家族群的頻道，亦是為傳播客家文化而存在，定位為「全體客家族群之媒體」。`, link: `${a}/news`, language: `zh-TW`, item: u };
}
export { s as route };
