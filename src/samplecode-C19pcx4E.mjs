import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import n from 'markdown-it';
const r = n({ html: !0 }),
    i = {
        path: `/developer/harmonyos/sample-code`,
        categories: [`programming`],
        example: `/huawei/developer/harmonyos/sample-code`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`developer.huawei.com/consumer/cn/samples`], target: `/huawei/developer/harmonyos/sample-code` }],
        name: `HarmonyOS 示例代码`,
        maintainers: [`JiZhi-Error`],
        handler: a,
    };
async function a() {
    return {
        title: `HarmonyOS 示例代码 - 华为开发者联盟`,
        link: `https://developer.huawei.com/consumer/cn/samples/`,
        description: `华为鸿蒙系统示例代码更新`,
        language: `zh-CN`,
        item: (
            await e(`https://svc-drcn.developer.huawei.com/community/servlet/consumer/partnerCommunityService/v1/servlet/samplecode/getSampleCodes`, {
                method: `POST`,
                headers: { 'content-type': `application/json`, origin: `https://developer.huawei.com`, referer: `https://developer.huawei.com/` },
                body: JSON.stringify({ classifyId: ``, classifyIdList: [], keywords: ``, language: `zh`, pageIndex: 1, pageSize: 100 }),
            })
        ).resultList.map((e) => ({ title: r.renderInline(e.name), link: e.link, description: r.render(e.description), category: e.keywords, pubDate: t(e.updateTime), author: `HarmonyOS`, id: e.id, image: e.effectPictureUrl })),
    };
}
export { i as route };
