import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = (e) => `https://phys.ncku.edu.tw/news/${e === `_all` ? `` : e}`,
    r = {
        24: `物理系`,
        scholarship: `獎助學金`,
        admission: `招生與錄取報到`,
        'course-announcement': `助教公告`,
        'bachelor-announcement': `大學部`,
        'master-announcement': `研究所`,
        graduation: `畢業離校`,
        'student-guide': `學生手冊與新生入學`,
        honor: `榮譽榜`,
        career: `求才公告`,
        others: `其他`,
        _all: `所有訊息`,
    },
    i = {
        'zh-TW': { name: `國立成功大學物理系公告` },
        name: `Phys News`,
        description: `| 分類 | catagory |
| ---- | ---- |
| 物理系 | 24 |
| 獎助學金 | scholarship |
| 招生與錄取報到 | admission |
| 助教公告 | course-announcement |
| 大學部 | bachelor-announcement |
| 研究所 | master-announcement |
| 畢業離校 | graduation |
| 學生手冊與新生入學 | student-guide |
| 榮譽榜 | honor |
| 求才公告 | career |
| 其他 | others |
| 所有訊息 | _all |
`,
        path: `/phys/:catagory?`,
        parameters: { catagory: `catagory, default is _all` },
        categories: [`university`],
        example: `/ncku/phys/_all`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`phys.ncku.edu.tw/news/`], target: `/phys/_all` },
            { source: [`phys.ncku.edu.tw/news/:catagory/`], target: `/phys/:catagory` },
        ],
        maintainers: [`simbafs`],
        handler: async (i) => {
            let a = i.req.param(`catagory`) ?? `_all`;
            r[a] === void 0 && (a = `_all`);
            let o = await e(n(a), { parseResponse: t }),
                s = o(`.newsList .Txt`)
                    .toArray()
                    .map((e) => ({
                        title: o(`a`, e).text(),
                        pubDate: new Date(
                            o(`.newsDate`, e)
                                .text()
                                .match(/\d{4}(?: \/ \d{2}){2}/)?.[0] || ``
                        ),
                        link: o(`a`, e).attr(`href`),
                        catagory: o(`.newIcon`, e).text(),
                    }));
            return { title: `成大物理系公告 - ${r[a]}`, link: n(a), item: s };
        },
    };
export { i as route };
