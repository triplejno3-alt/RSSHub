import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
const r = {
    path: `/report/:industry?`,
    categories: [`finance`],
    view: n.Articles,
    example: `/moodysmismicrosite/report/企业&金融机构`,
    parameters: {
        industry: {
            description: `可选参数，默认为全部行业。行业选择，支持使用&连接多个。`,
            options: [
                { value: `0`, label: `企业` },
                { value: `1`, label: `金融机构` },
                { value: `2`, label: `主权` },
                { value: `3`, label: `地方政府及城投公司` },
                { value: `4`, label: `宏观经济` },
                { value: `5`, label: `结构融资` },
                { value: `6`, label: `基础设施及项目融资` },
                { value: `7`, label: `ESG` },
                { value: `8`, label: `其他` },
            ],
            default: `全部`,
        },
    },
    radar: [{ source: [`www.moodysmismicrosite.com/report`] }],
    name: `industry`,
    description: `
| ID | Description |
| ---   | ---   |
| 0 | 企业 |
| 1 | 金融机构 |
| 2 | 主权 |
| 3 | 地方政府及城投公司 |
| 4 | 宏观经济 |
| 5 | 结构融资 |
| 6 | 基础设施项目融资 |
| 7 | ESG |
| 8 | 其他 |
    `,
    maintainers: [`Cedaric`],
    handler: i,
};
async function i(n) {
    let r = Object.fromEntries(Object.entries({ 0: `企业`, 1: `金融机构`, 2: `主权`, 3: `地方政府及城投公司`, 4: `宏观经济`, 5: `结构融资`, 6: `基础设施项目融资`, 7: `ESG`, 8: `其他` }).map(([e, t]) => [t, e])),
        i = n.req.param(`industry`) || `行业`,
        a =
            (
                await t(
                    `https://www.moodysmismicrosite.com/micro/v2/report/list?page_num=1&page_size=25&keyword=&industry_ids=${i
                        .split(`&`)
                        .map((e) => r[e.trim()])
                        .filter((e) => e !== void 0)
                        .join(`,`)}`
                )
            )?.data?.data?.list || [];
    return {
        title: `穆迪评级(${i})`,
        link: `https://www.moodysmismicrosite.com/report`,
        allowEmpty: !0,
        item: a.map((t) => ({ title: t.title, pubDate: e(t.release_time), link: `https://www.moodysmismicrosite.com/details/${t.id}`, description: t.content_profile, category: t.classification, guid: t.id })),
    };
}
export { r as route };
