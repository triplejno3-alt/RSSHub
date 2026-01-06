import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n as e } from './puppeteer-BbZGb8cd.mjs';
import { n as t, t as n } from './utils-Cm4ljMif.mjs';
const r = {
    path: `/master/:channel`,
    categories: [`traditional-media`],
    example: `/cw/master/8`,
    parameters: { channel: `主頻道 ID，可在 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `主頻道`,
    maintainers: [`TonyRL`],
    handler: i,
    description: `| 主頻道名稱 | 主頻道 ID |
| ---------- | --------- |
| 財經       | 8         |
| 產業       | 7         |
| 國際       | 9         |
| 管理       | 10        |
| 環境       | 12        |
| 教育       | 13        |
| 人物       | 14        |
| 政治社會   | 77        |
| 調查排行   | 15        |
| 健康關係   | 79        |
| 時尚品味   | 11        |
| 運動生活   | 103       |
| 重磅外媒   | 16        |`,
};
async function i(r) {
    let i = await e(),
        { $: a, items: o } = await t(`master`, i, r);
    return (
        await i.close(),
        {
            title: a(`head title`).text(),
            description: a(`meta[name=description]`).attr(`content`),
            link: `${n}/masterChannel.action?idMasterChannel=${r.req.param(`channel`)}`,
            image: `${n}/assets_new/img/fbshare.jpg`,
            language: a(`meta[property="og:locale"]`).attr(`content`),
            item: o,
        }
    );
}
export { r as route };
