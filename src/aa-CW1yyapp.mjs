import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './timezone-CrV-DT8S.mjs';
import { load as n } from 'cheerio';
function r(e) {
    let n = new Date(e);
    return (n.setFullYear(n.getFullYear() + 1911), t(n, 8));
}
async function i(t) {
    let i = t.req.param(`id`) ?? `2652`,
        a = `https://aa.nycu.edu.tw/aa/ch/app/news/list?module=headnews&id=${i}`,
        o = { 2652: `全部`, 2462: `註冊組`, 2502: `課務組`, 2523: `綜合組`, 2538: `實習組`, 2545: `數位教學中心`, 2565: `教學發展中心`, 2617: `國際高教培訓暨認證中心`, 2638: `雙語教育與學習推動辦公室` }[i],
        s = await e(a, { parseResponse: n }),
        c = s(`.newslist li`)
            .toArray()
            .map((e) => ({
                title: s(`a`, e).attr(`title`)?.trim() || ``,
                link: s(`a`, e).attr(`href`) || ``,
                pubDate: r(s(`div p:nth-child(1)`, e).text().replace(`更新日期：`, ``).trim()),
                category: [s(`div p:nth-child(2)`, e).text().replace(`分類：`, ``)],
                author: s(`div p:nth-child(3)`, e).text().replace(`發布單位：`, ``),
            }));
    return { title: `陽明交大教務處公告 - ${o}`, description: `國立陽明交大教務處公告 - ${o}`, language: `zh-TW`, link: a, item: c };
}
const a = {
    name: `教務處公告`,
    categories: [`university`],
    maintainers: [`simbafs`],
    description: `|           名稱           | :id  |
| :----------------------: | :--: |
|           全部           | 2652 |
|          註冊組          | 2462 |
|          課務組          | 2502 |
|          綜合組          | 2523 |
|          實習組          | 2538 |
|       數位教學中心       | 2545 |
|       教學發展中心       | 2565 |
|  國際高教培訓暨認證中心  | 2617 |
| 雙語教育與學習推動辦公室 | 2638 |`,
    path: `/aa/:id?`,
    parameters: { id: `id, see below` },
    example: `/nycu/aa/2652`,
    handler: i,
};
export { a as route };
