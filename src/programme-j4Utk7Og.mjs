import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { jsx as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
    path: `/programme/:id?/:limit?/:isFull?`,
    categories: [`traditional-media`],
    example: `/sctv/programme/1`,
    parameters: { id: '节目 id，可在对应节目页中找到，默认为 `1`，即四川新闻联播', limit: `期数，默认为 15，即单次获取最新 15 期`, isFull: `是否仅获取完整视频，填写 true/yes 表示是、false/no 表示否，默认是` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `电视回放`,
    maintainers: [`nczitzk`],
    handler: s,
    description: `::: tip
  参数 **是否仅获取完整视频** 设置为 \`true\` \`yes\` \`t\` \`y\` 等值后，路由仅返回当期节目的完整视频，而不会返回节目所提供的节选视频。

  查看更多电视节目请前往 [电视回放](https://www.sctv.com/column/list)
:::

| 节目                   | id      |
| ---------------------- | ------- |
| 四川新闻联播           | 1       |
| 早安四川               | 2       |
| 今日视点               | 3       |
| 龙门阵摆四川           | 10523   |
| 非常话题               | 1014756 |
| 新闻现场               | 8385    |
| 黄金三十分             | 8386    |
| 全媒直播间             | 8434    |
| 晚报十点半             | 8435    |
| 现场快报               | 8436    |
| 四川乡村新闻           | 3673    |
| 四川文旅报道           | 8174    |
| 乡村会客厅             | 3674    |
| 金字招牌               | 3675    |
| 问您所 “？”            | 3677    |
| 蜀你最能               | 3679    |
| 美丽乡村印象           | 3678    |
| 美丽乡村               | 3676    |
| 乡村大篷车             | 3680    |
| 华西论健               | 3681    |
| 乡村聚乐部             | 3682    |
| 医保近距离             | 6403    |
| 音你而来               | 7263    |
| 吃八方                 | 7343    |
| 世界那么大             | 7344    |
| 风云川商               | 7345    |
| 麻辣烫                 | 7346    |
| 财经快报               | 7473    |
| 医生来了               | 7873    |
| 安逸的旅途             | 8383    |
| 运动 +                 | 8433    |
| 好戏连台               | 9733    |
| 防癌大讲堂             | 1018673 |
| 消费新观察             | 1017153 |
| 天天耍大牌             | 1014753 |
| 廉洁四川               | 1014754 |
| 看世界                 | 1014755 |
| 金熊猫说教育（资讯版） | 1014757 |
| 她说                   | 1014759 |
| 嗨宝贝                 | 1014762 |
| 萌眼看世界             | 1014764 |
| 乡村大讲堂             | 1014765 |
| 四川党建               | 1014766 |
| 健康四川               | 1014767 |
| 技能四川               | 12023   |`,
};
async function s(o) {
    let s = o.req.param(`id`) ?? `1`,
        c = o.req.param(`limit`) ? Number.parseInt(o.req.param(`limit`)) : 15,
        l = /t|y/i.test(o.req.param(`isFull`) ?? `true`),
        u = `https://kscgc.sctv-tf.com`,
        d = `${u}/sctv/lookback/${s}/date.json`,
        f = `${u}/sctv/lookback/index/lookbackList.json`,
        p = `https://www.sctv.com/column/detail?programmeIndex=/sctv/lookback/${s}/index.json`,
        m = await n({ method: `get`, url: d }),
        h = [],
        g = m.data.data.programmeArray.slice(0, c).map((e) => ({ guid: e.id, link: `${u}${e.programmeListUrl}` }));
    (await Promise.all(
        g.map((o) =>
            e.tryGet(o.link, async () => {
                let e = (await n({ method: `get`, url: o.link })).data.data.programmeList.map((e) => ({
                        guid: e.id,
                        title: e.programmeTitle,
                        link: e.programmeUrl,
                        pubDate: r(t(e.pubTime), 8),
                        description: a(i(`video`, { poster: e.programmeImage, controls: !0, children: i(`source`, { src: e.programmeUrl, type: `video/mp4` }) })),
                    })),
                    s = [];
                (l && (s = e.filter((e) => /（\d{4}(?:\.\d{2}){2}）/.test(e.title))), (h = [...h, ...(s.length === 0 ? e : s)]));
            })
        )
    ),
        (m = await n({ method: `get`, url: f })));
    let _, v;
    for (let e of m.data.data.programme_official)
        if (e.programmeId === s) {
            ((_ = e.programmeName), (v = e.programmeCover));
            break;
        }
    return { title: `四川广播电视台 - ${_}`, link: p, item: h.slice(0, o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 100), image: v };
}
export { o as route };
