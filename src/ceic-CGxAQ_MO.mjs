import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = {
    path: `/ceic/:type?`,
    categories: [`forecast`],
    example: `/earthquake/ceic/1`,
    parameters: { type: `类型，见下表` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.cea.gov.cn/cea/xwzx/zqsd/index.html`, `www.cea.gov.cn/`], target: `` }],
    name: `中国地震台`,
    maintainers: [`SettingDust`],
    handler: i,
    url: `www.cea.gov.cn/cea/xwzx/zqsd/index.html`,
    description: `| 参数 | 类型                        |
| ---- | --------------------------- |
| 1    | 最近 24 小时地震信息        |
| 2    | 最近 48 小时地震信息        |
| 5    | 最近一年 3.0 级以上地震信息 |
| 7    | 最近一年 3.0 级以下地震     |
| 8    | 最近一年 4.0 级以上地震信息 |
| 9    | 最近一年 5.0 级以上地震信息 |
| 0    | 最近一年 6.0 级以上地震信息 |

  可通过全局过滤参数订阅您感兴趣的地区.`,
};
async function i(r) {
    let i = Number(r.req.param(`type`));
    i ??= 1;
    let a = `http://www.ceic.ac.cn`,
        o = `${a}/ajax/speedsearch?num=${i}`,
        s = { O_TIME: `发震时刻(UTC+8)`, LOCATION_C: `参考位置`, M: `震级(M)`, EPI_LAT: `纬度(°)`, EPI_LON: `经度(°)`, EPI_DEPTH: `深度(千米)`, SAVE_TIME: `录入时间` },
        c = {
            1: `最近24小时地震信息`,
            2: `最近48小时地震信息`,
            3: `最近7天地震信息`,
            4: `最近30天地震信息`,
            5: `最近一年3.0级以上地震信息`,
            6: `最近一年地震信息`,
            7: `最近一年3.0级以下地震`,
            8: `最近一年4.0级以上地震信息`,
            9: `最近一年5.0级以上地震信息`,
            0: `最近一年6.0级以上地震信息`,
        };
    [3, 4, 6].includes(i) && (i = 1);
    let l = c[i],
        u = (await t(o)).data.replace(/,"page":"(.*?)","num":/, `,"num":`),
        d = JSON.parse(u.substring(1, u.length - 1)).shuju;
    return (
        d.length > 20 && (d = d.slice(0, 20)),
        {
            title: l,
            link: `${a}/speedsearch`,
            allowEmpty: !0,
            item: d.map((t) => {
                let r = [],
                    { NEW_DID: i, LOCATION_C: o, M: c, O_TIME: l } = t;
                for (let e in s) r.push(`${s[e]} ${t[e]}`);
                return { title: `${o}发生${c}级地震`, link: `${a}/${i}.html`, pubDate: n(e(l, `YYYY-MM-DD HH:mm:ss`), 8), description: r.join(`<br>`), guid: i };
            }),
        }
    );
}
export { r as route };
