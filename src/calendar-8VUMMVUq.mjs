import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/job/calendar`,
    categories: [`university`],
    example: `/hrbeu/job/calendar`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`job.hrbeu.edu.cn/*`] }],
    name: `就业服务平台`,
    maintainers: [`Derekmini`],
    handler: r,
    url: `job.hrbeu.edu.cn/*`,
    description: `| 通知公告 | 热点新闻 |
| :------: | :------: |
|   tzgg   |   rdxw   |

#### 大型招聘会 {#ha-er-bin-gong-cheng-da-xue-jiu-ye-fu-wu-ping-tai-da-xing-zhao-pin-hui}


#### 今日招聘会 {#ha-er-bin-gong-cheng-da-xue-jiu-ye-fu-wu-ping-tai-jin-ri-zhao-pin-hui}`,
};
async function r() {
    let n = new Date(),
        r = n.getFullYear(),
        i = n.getMonth() + 1,
        a;
    a = i < 10 ? `0` + i : i;
    let o = n.getDate(),
        s = await e(`http://job.hrbeu.edu.cn/HrbeuJY/Web/Employ/QueryCalendar`, { query: { yearMonth: r + `-` + a } }),
        c = ``;
    for (let e = 0, t = s.length; e < t; e++) s[e].day === Number(o) && (c = s[e].Items[0].link);
    let l = t(await e(`http://job.hrbeu.edu.cn${c}`, { parseResponse: (e) => e }));
    return {
        title: `今日招聘会`,
        link: `http://job.hrbeu.edu.cn/HrbeuJY/web`,
        item: l(`li.clearfix`)
            .toArray()
            .map((e) => ({ title: l(e).find(`span.news_tit.news_tit_s`).find(`a`).attr(`title`), description: `点击标题，登录查看招聘详情`, link: l(e).find(`span.news_tit.news_tit_s`).find(`a`).attr(`href`) })),
        allowEmpty: !0,
    };
}
export { n as route };
