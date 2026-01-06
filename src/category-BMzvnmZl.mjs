import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { n as r, t as i } from './util-CvIiZVp2.mjs';
import { load as a } from 'cheerio';
const o = async (t) => {
        let { id: o } = t.req.param();
        if (!o) throw new n(`请填入合法的分类 id，参见广场 https://www.jisilu.cn/explore/`);
        let s = Number.parseInt(t.req.query(`limit`) ?? `30`, 10),
            c = new URL(`/category/${o}`, r).href,
            l = a(await e(c)),
            u = l(`html`).prop(`lang`) ?? `zh`,
            d = await i(l, l(`div.aw-question-list`), s);
        l(`div.pagination`).remove();
        let f = l(`meta[name="keywords"]`).prop(`content`).split(/,/)[0],
            p = l(`div.aw-logo img`).prop(`src`);
        return {
            title: `${l(`title`).text()} - ${l(`li.active`)
                .slice(1)
                .toArray()
                .map((e) => l(e).text())
                .join(`|`)}`,
            description: l(`meta[name="description"]`).prop(`content`),
            link: c,
            item: d,
            allowEmpty: !0,
            image: p,
            author: f,
            language: u,
            id: c,
        };
    },
    s = {
        path: `/category/:id`,
        name: `分类`,
        url: `www.jisilu.cn`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/jisilu/category/4`,
        parameters: { id: `分类 id，可在对应分类页 URL 中找到` },
        description:
            '::: tip\n若订阅 [债券/可转债](https://www.jisilu.cn/category/4)，网址为 `https://www.jisilu.cn/category/4`，请截取 `https://www.jisilu.cn/category/` 到末尾的部分 `4` 作为 `id` 参数填入，此时目标路由为 [`/jisilu/category/4`](https://rsshub.app/jisilu/category/4)。\n:::\n\n| 新股 | 债券/可转债 | 套利 | 其他 | 基金 | 股票 |\n| ---- | ----------- | ---- | ---- | ---- | ---- |\n| 3    | 4           | 5    | 6    | 7    | 8    |\n',
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.jisilu.cn/category/:id`], target: `/category/:id` },
            { title: `新股`, source: [`www.jisilu.cn/category/3`], target: `/category/3` },
            { title: `债券/可转债`, source: [`www.jisilu.cn/category/4`], target: `/category/4` },
            { title: `套利`, source: [`www.jisilu.cn/category/5`], target: `/category/5` },
            { title: `其他`, source: [`www.jisilu.cn/category/6`], target: `/category/6` },
            { title: `基金`, source: [`www.jisilu.cn/category/7`], target: `/category/7` },
            { title: `股票`, source: [`www.jisilu.cn/category/8`], target: `/category/8` },
        ],
        view: t.Articles,
    };
export { o as handler, s as route };
