import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/qq/sdk/changelog/:platform`,
    categories: [`program-update`],
    example: `/tencent/qq/sdk/changelog/iOS`,
    parameters: { platform: `平台，iOS / Android` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `更新日志`,
    maintainers: [`nuomi1`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`platform`),
        a = ``,
        o = ``;
    if (i === `iOS`) ((a = `iOS SDK 历史变更`), (o = `https://wiki.connect.qq.com/ios_sdk历史变更`));
    else if (i === `Android`) ((a = `Android SDK 历史变更`), (o = `https://wiki.connect.qq.com/android_sdk历史变更`));
    else throw new t(`not support platform`);
    let s = n((await e.get(o)).data),
        c = s(`.wp-editor`)
            .children(`p`)
            .filter((e, t) => s(t).text() !== ``),
        l = [],
        u = [];
    c.each((e, t) => {
        (s(t).find(`strong`).length && u.push(e),
            l.push(
                s(t)
                    .text()
                    .replace(
                        `
`,
                        ``
                    )
            ));
    });
    let d = u.map((e, t) => {
        let n = l.slice(u[t], u[t + 1]);
        return {
            title: n[0],
            description: n.slice(1).join(`
`),
        };
    });
    return { title: a, link: o, item: d };
}
export { r as route };
