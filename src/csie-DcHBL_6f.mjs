import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = (e, t) => (e === `_all` ? `https://www.csie.ncku.edu.tw/zh-hant/news?page=${t}` : `https://www.csie.ncku.edu.tw/zh-hant/news/${e}?page=${t}`),
    r = { _all: `全部資訊`, normal: `一般資訊`, bachelorAdmission: `大學部招生`, masterAdmission: `研究所招生`, speeches: `演講及活動資訊`, awards: `獲獎資訊`, scholarship: `獎助學金`, jobs: `徵人資訊` },
    i = {
        'zh-TW': { name: `國立成功大學資訊系公告`, description: `可用分類：_all, normal, bachelorAdmission, masterAdmission, speeches, awards, scholarship, jobs` },
        name: `CSIE News`,
        description: `Availible catagories：_all, normal, bachelorAdmission, masterAdmission, speeches, awards, scholarship, jobs`,
        path: `/csie/:catagory?`,
        categories: [`university`],
        example: `/ncku/csie/normal`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.csie.ncku.edu.tw/zh-hant/news/`], target: `/csie/_all` },
            { source: [`www.csie.ncku.edu.tw/zh-hant/news/:catagory`], target: `/csie/:catagory` },
        ],
        maintainers: [`simbafs`],
        handler: async (i) => {
            let a = i.req.param(`catagory`) ?? `_all`;
            r[a] === void 0 && (a = `normal`);
            let o = (
                await Promise.allSettled(
                    Array.from({ length: 3 }).map(async (r, i) => {
                        let o = await e(n(a, 1 + i), { parseResponse: t });
                        return o(`.list-title > li`)
                            .toArray()
                            .map((e) => ({ title: o(`a`, e).text(), pubDate: new Date(o(`small`, e).text()), link: `https://www.csie.ncku.edu.tw${o(`a`, e).attr(`href`)}`, catagory: o(`span:nth-child(2)`, e).text() }));
                    })
                )
            )
                .filter((e) => e.status === `fulfilled`)
                .flatMap((e) => e.value);
            return { title: `成大資訊系公告 - ${r[a]}`, link: n(a, 1), item: o };
        },
    };
export { i as route };
