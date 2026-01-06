import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = async (t) => {
        let n = t.req.param(`country`),
            r = t.req.param(`appid`);
        return {
            title: `App Comments`,
            appID: r,
            country: n,
            item: (await e(`https://monitor.appstare.net/spider/appComments?country=${n}&appId=${r}`)).map((e) => ({
                title: e.title,
                description: `
            <div style="font-size: 1.2em; color: #FFD700;">${`⭐️`.repeat(Math.floor(e.rating))}</div>
            <p>${e.review}</p>
        `,
                pubDate: new Date(e.date).toUTCString(),
            })),
            link: `https://appstare.net/data/app/comment/${r}/${n}`,
            allowEmpty: !0,
        };
    },
    n = {
        path: `/comments/:country/:appid`,
        name: `Comments`,
        url: `appstare.net/`,
        example: `/appstare/comments/cn/989673964`,
        maintainers: [`zhixideyu`],
        handler: t,
        parameters: { country: `App Store country code, e.g., US, CN`, appid: `Unique App Store application identifier (app id)` },
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`appstare.net/`] }],
        description: `Retrieve only the comments of the app from the past 7 days.`,
    };
export { t as handler, n as route };
