import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
import o from 'iconv-lite';
const s = ({ name: e, type: i, date: o, registrationDeadline: s }) =>
        a(
            r(t, {
                children: [
                    r(`text`, { children: [`考试项目名称：`, e, ` `] }),
                    n(`br`, {}),
                    r(`text`, { children: [`考试类别：`, i, ` `] }),
                    n(`br`, {}),
                    r(`text`, { children: [`考试日期：`, o, ` `] }),
                    n(`br`, {}),
                    r(`text`, { children: [`报名起止日期：`, s, ` `] }),
                ],
            })
        ),
    c = {
        path: [`/sh/rsj/ksxm`, `/shanghai/rsj/ksxm`],
        categories: [`government`],
        example: `/gov/sh/rsj/ksxm`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`rsj.sh.gov.cn/`] }],
        name: `上海市职业能力考试院 考试项目`,
        maintainers: [`Fatpandac`],
        handler: l,
        url: `rsj.sh.gov.cn/`,
    };
async function l() {
    let t = `http://www.rsj.sh.gov.cn/ksyzc/wangz/kwaplist_300.jsp`,
        n = await e({ method: `get`, url: t, responseType: `buffer` }),
        r = i(o.decode(n.data, `gbk`));
    return {
        title: `上海市职业能力考试院 - 考试项目`,
        link: t,
        item: r(`kwap`)
            .toArray()
            .map((e) => ({
                title: r(e).find(`kaosxmmc`).text(),
                link: `http://www.rsj.sh.gov.cn/ksyzc/index801.jsp`,
                description: s({ name: r(e).find(`kaosxmmc`).text(), type: r(e).find(`kaoslb_dmfy`).text(), date: r(e).find(`kaosrq`).text(), registrationDeadline: r(e).find(`baomksrq_A300`).text() }),
                guid: `${r(e).find(`kaosrq`).text()}${r(e).find(`kaosxmmc`).text()}`,
            })),
    };
}
export { c as route };
