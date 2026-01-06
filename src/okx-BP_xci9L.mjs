import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:section?`,
    categories: [`finance`],
    example: `/okx/new-listings`,
    parameters: {
        section: {
            description: `公告版块`,
            default: `latest-announcements`,
            options: [
                { value: `latest-announcements`, label: `最新公告` },
                { value: `new-listings`, label: `新币种上线` },
                { value: `delistings`, label: `币对下线` },
                { value: `trading-updates`, label: `交易规则更新` },
                { value: `deposit-withdrawal-suspension-resumption`, label: `充提暂停/恢复公告` },
                { value: `p2p-trading`, label: `C2C 公告` },
                { value: `web3`, label: `Web3` },
                { value: `earn`, label: `赚币` },
                { value: `jumpstart`, label: `Jumpstart` },
                { value: `api`, label: `API公告` },
                { value: `okb-buy-back-burn`, label: `OKB销毁` },
                { value: `others`, label: `其他` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.okx.com/zh-hans/help/section/:section`], target: `/:section` }],
    name: `公告`,
    maintainers: [`lxl66566`],
    handler: a,
};
async function a(i) {
    let a = `https://www.okx.com`,
        { section: o = `latest-announcements` } = i.req.param();
    o = o.replace(/^announcements-/, ``);
    let s = r(await e(`${a}/zh-hans/help/section/announcements-${o}`)),
        c = JSON.parse(s(`script[data-id="__app_data_for_ssr__"]`).text()),
        l = c?.appContext?.initialProps?.sectionData?.articleList?.items?.map((e) => ({ title: e.title, link: `${a}/zh-hans/help/${e.slug}`, pubDate: new Date(e.publishTime) })) || [],
        u = await Promise.all(
            l.map((e) =>
                t.tryGet(e.link, async () => {
                    let t = await n(e.link).then((e) => r(e.data)(`div[class^="index_richTextContent"]`).html());
                    return { ...e, description: t || `内容获取失败` };
                })
            )
        );
    return { title: c?.appContext?.serverSideProps?.sectionOutline?.title || `Unknown`, link: `${a}/zh-hans/help/section/announcements-${o}`, item: u, allowEmpty: !0 };
}
export { i as route };
