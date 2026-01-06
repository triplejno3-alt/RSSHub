import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/zbb/:type`,
    categories: [`university`],
    example: `/nju/zbb/cgxx`,
    parameters: { type: `分类名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `招标办公室`,
    maintainers: [`ret-1`],
    handler: a,
    description: `| 采购信息 | 成交公示 | 政府采购意向公开 |
| -------- | -------- | ---------------- |
| cgxx     | cjgs     | zfcgyxgk         |`,
};
async function a(i) {
    let a = i.req.param(`type`);
    if (a === `zfcgyxgk`) {
        let i = `https://zbb.nju.edu.cn/zfcgyxgk/index.chtml`,
            a = (await t({ method: `get`, url: i })).data,
            o = r(a);
        return {
            title: `政府采购意向公开`,
            link: i,
            item: o(`dd[cid]`)
                .toArray()
                .map(
                    (t) => (
                        (t = o(t)),
                        { title: t.find(`a`).attr(`title`), description: t.find(`a`).first().text(), link: `https://zbb.nju.edu.cn` + t.find(`a`).attr(`href`), pubDate: n(e(t.find(`span`).first().text(), `YYYY-MM-DD`), 8) }
                    )
                ),
        };
    } else {
        let i = { cgxx: `采购信息`, cjgs: `成交公示` },
            o = { hw: `货物类`, gc: `工程类`, fw: `服务类` },
            s = await Promise.all(
                Object.keys(o).map(async (i) => {
                    let s = (await t({ method: `get`, url: `https://zbb.nju.edu.cn/${a}${i}/index.chtml` })).data,
                        c = r(s);
                    return c(`dd[cid]`)
                        .toArray()
                        .map(
                            (t) => (
                                (t = c(t)),
                                {
                                    title: t.find(`a`).attr(`title`),
                                    description: t.find(`a`).first().text(),
                                    link: `https://zbb.nju.edu.cn` + t.find(`a`).attr(`href`),
                                    pubDate: n(e(t.find(`span`).first().text(), `YYYY-MM-DD`), 8),
                                    category: o[i],
                                }
                            )
                        );
                })
            );
        return { title: i[a], link: `https://zbb.nju.edu.cn/${a}hw/index.chtml`, item: [...s[0], ...s[1], ...s[2]] };
    }
}
export { i as route };
