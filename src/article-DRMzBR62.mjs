import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import './description-CN05cUaw.mjs';
import { n, r } from './util-pFc_biuX.mjs';
import { load as i } from 'cheerio';
const a = async (t) => {
        let { id: a = `0`, pushed: o = `0` } = t.req.param(),
            s = Number.parseInt(t.req.query(`limit`) ?? `20`, 10),
            c = new URL(`article`, r).href,
            l = new URL(`article/getList/${a}`, r).href,
            u = i(await e(c)),
            d = u(`html`).attr(`lang`) ?? `zh-CN`,
            f = await n(s, (await e(l, { query: { page: 1, pushed: o } })).data.dataList),
            p = u(`div[data_cid="${a}"]`).text();
        return {
            title: `${u(`title`).text().trim().split(/\s/)[0]}${p ? ` - ${p}` : a}`,
            description: u(`meta[name="description"]`).attr(`content`),
            link: c,
            item: f,
            allowEmpty: !0,
            author: u(`meta[name="keywords"]`).attr(`content`)?.split(/,/)[0] ?? void 0,
            language: d,
            id: c,
        };
    },
    o = {
        path: `/article/:id?/:pushed?`,
        name: `文章`,
        url: `www.dgtle.com`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/dgtle/article/0/0`,
        parameters: {
            id: {
                description: '分类，默认为 `0`，即最新，可在下表中找到',
                options: [
                    { label: `全部`, value: `0` },
                    { label: `数码`, value: `20` },
                    { label: `手机`, value: `18` },
                    { label: `平板`, value: `4` },
                    { label: `笔电`, value: `17` },
                    { label: `影音`, value: `5` },
                    { label: `汽车`, value: `401` },
                    { label: `视频`, value: `395` },
                    { label: `摄影`, value: `22` },
                    { label: `露营`, value: `405` },
                    { label: `家装`, value: `402` },
                    { label: `活动`, value: `138` },
                    { label: `生活`, value: `34` },
                    { label: `旅行`, value: `137` },
                    { label: `骑行`, value: `412` },
                    { label: `游戏`, value: `411` },
                    { label: `宠物`, value: `407` },
                    { label: `时尚`, value: `406` },
                    { label: `运动`, value: `403` },
                    { label: `应用`, value: `135` },
                    { label: `玩物`, value: `75` },
                    { label: `周边`, value: `19` },
                    { label: `文具`, value: `7` },
                    { label: `官方`, value: `400` },
                ],
            },
            pushed: {
                description: '推送排序，默认为 `0`，即最新发布',
                options: [
                    { label: `最新发布`, value: `0` },
                    { label: `首页推荐`, value: `1` },
                ],
            },
        },
        description: `:::tip
订阅 [数码](https://www.dgtle.com/article)，其对应分类 ID 为 \`20\`，此时路由为 [\`/dgtle/article/20\`](https://rsshub.app/dgtle/article/20)。
:::

<details>
  <summary>更多分类</summary>

  | [全部](https://www.dgtle.com/article)   | [数码](https://www.dgtle.com/article)     | [手机](https://www.dgtle.com/article)     | [平板](https://www.dgtle.com/article)   | [笔电](https://www.dgtle.com/article)     |
  | --------------------------------------- | ----------------------------------------- | ----------------------------------------- | --------------------------------------- | ----------------------------------------- |
  | [0](https://rsshub.app/dgtle/article/0) | [20](https://rsshub.app/dgtle/article/20) | [18](https://rsshub.app/dgtle/article/18) | [4](https://rsshub.app/dgtle/article/4) | [17](https://rsshub.app/dgtle/article/17) |

  | [影音](https://www.dgtle.com/article)   | [汽车](https://www.dgtle.com/article)       | [视频](https://www.dgtle.com/article)       | [摄影](https://www.dgtle.com/article)     | [露营](https://www.dgtle.com/article)       |
  | --------------------------------------- | ------------------------------------------- | ------------------------------------------- | ----------------------------------------- | ------------------------------------------- |
  | [5](https://rsshub.app/dgtle/article/5) | [401](https://rsshub.app/dgtle/article/401) | [395](https://rsshub.app/dgtle/article/395) | [22](https://rsshub.app/dgtle/article/22) | [405](https://rsshub.app/dgtle/article/405) |

  | [家装](https://www.dgtle.com/article)       | [活动](https://www.dgtle.com/article)       | [生活](https://www.dgtle.com/article)     | [旅行](https://www.dgtle.com/article)       | [骑行](https://www.dgtle.com/article)       |
  | ------------------------------------------- | ------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ------------------------------------------- |
  | [402](https://rsshub.app/dgtle/article/402) | [138](https://rsshub.app/dgtle/article/138) | [34](https://rsshub.app/dgtle/article/34) | [137](https://rsshub.app/dgtle/article/137) | [412](https://rsshub.app/dgtle/article/412) |

  | [游戏](https://www.dgtle.com/article)       | [宠物](https://www.dgtle.com/article)       | [时尚](https://www.dgtle.com/article)       | [运动](https://www.dgtle.com/article)       | [应用](https://www.dgtle.com/article)       |
  | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
  | [411](https://rsshub.app/dgtle/article/411) | [407](https://rsshub.app/dgtle/article/407) | [406](https://rsshub.app/dgtle/article/406) | [403](https://rsshub.app/dgtle/article/403) | [135](https://rsshub.app/dgtle/article/135) |

  | [玩物](https://www.dgtle.com/article)     | [周边](https://www.dgtle.com/article)     | [文具](https://www.dgtle.com/article)   | [官方](https://www.dgtle.com/article)       |
  | ----------------------------------------- | ----------------------------------------- | --------------------------------------- | ------------------------------------------- |
  | [75](https://rsshub.app/dgtle/article/75) | [19](https://rsshub.app/dgtle/article/19) | [7](https://rsshub.app/dgtle/article/7) | [400](https://rsshub.app/dgtle/article/400) |

</details>
`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.dgtle.com/article`], target: `/article` },
            { title: `全部`, source: [`www.dgtle.com/article`], target: `/article/0` },
            { title: `数码`, source: [`www.dgtle.com/article`], target: `/article/20` },
            { title: `手机`, source: [`www.dgtle.com/article`], target: `/article/18` },
            { title: `平板`, source: [`www.dgtle.com/article`], target: `/article/4` },
            { title: `笔电`, source: [`www.dgtle.com/article`], target: `/article/17` },
            { title: `影音`, source: [`www.dgtle.com/article`], target: `/article/5` },
            { title: `汽车`, source: [`www.dgtle.com/article`], target: `/article/401` },
            { title: `视频`, source: [`www.dgtle.com/article`], target: `/article/395` },
            { title: `摄影`, source: [`www.dgtle.com/article`], target: `/article/22` },
            { title: `露营`, source: [`www.dgtle.com/article`], target: `/article/405` },
            { title: `家装`, source: [`www.dgtle.com/article`], target: `/article/402` },
            { title: `活动`, source: [`www.dgtle.com/article`], target: `/article/138` },
            { title: `生活`, source: [`www.dgtle.com/article`], target: `/article/34` },
            { title: `旅行`, source: [`www.dgtle.com/article`], target: `/article/137` },
            { title: `骑行`, source: [`www.dgtle.com/article`], target: `/article/412` },
            { title: `游戏`, source: [`www.dgtle.com/article`], target: `/article/411` },
            { title: `宠物`, source: [`www.dgtle.com/article`], target: `/article/407` },
            { title: `时尚`, source: [`www.dgtle.com/article`], target: `/article/406` },
            { title: `运动`, source: [`www.dgtle.com/article`], target: `/article/403` },
            { title: `应用`, source: [`www.dgtle.com/article`], target: `/article/135` },
            { title: `玩物`, source: [`www.dgtle.com/article`], target: `/article/75` },
            { title: `周边`, source: [`www.dgtle.com/article`], target: `/article/19` },
            { title: `文具`, source: [`www.dgtle.com/article`], target: `/article/7` },
            { title: `官方`, source: [`www.dgtle.com/article`], target: `/article/400` },
        ],
        view: t.Articles,
    };
export { a as handler, o as route };
