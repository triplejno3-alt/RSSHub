import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/soft/:atype`,
    categories: [`programming`],
    example: `/elecfans/soft/special`,
    parameters: { atype: `需获取资料的类别` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `资料`,
    radar: [{ source: [`www.elecfans.com`] }],
    maintainers: [`tian051011`],
    handler: async (i) => {
        let { atype: a } = i.req.param(),
            o = r(await e(`https://www.elecfans.com/soft/${a}/`)),
            s = o(`#mainContent li`)
                .toArray()
                .map((e) => {
                    e = o(e);
                    let t = e.find(`a`).eq(1);
                    return { title: t.text(), link: String(t.attr(`href`)) };
                }),
            c = await Promise.all(
                s.map((i) =>
                    t.tryGet(i.link, async () => {
                        let a = r(await e(i.link));
                        i.pubDate = n(a(`.data-info-content2021 .upload-date`).eq(1).text());
                        let o = `https://www.elecfans.com/webapi/user/getSoftUserInfo?mid=${a(`#filed_mid2021`).first().text()}`;
                        return (
                            (i.author = await t.tryGet(o, async () => (await e(o)).data.uname)),
                            (i.description = a(`.simditor-body`).first().html()),
                            (i.category = a(`.nTags a > span`)
                                .toArray()
                                .map((e) => a(e).text().trim())),
                            i
                        );
                    })
                )
            );
        return { title: `elecfans ${a} softs`, link: `https://www.elecfans.com/soft/${a}/`, item: c };
    },
};
export { i as route };
