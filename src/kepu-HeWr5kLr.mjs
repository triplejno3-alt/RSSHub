import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
        latest: `div.index_tabs_container.js-tabs-container > div:nth-child(1)`,
        bitcoin: `div.index_tabs_container.js-tabs-container > div:nth-child(2)`,
        ethereum: `div.index_tabs_container.js-tabs-container > div:nth-child(3)`,
        defi: `div.index_tabs_container.js-tabs-container > div:nth-child(4)`,
        inter_blockchain: `div.index_tabs_container.js-tabs-container > div:nth-child(5)`,
        mining: `div.index_tabs_container.js-tabs-container > div:nth-child(6)`,
        safety: `div.index_tabs_container.js-tabs-container > div:nth-child(7)`,
        satoshi_nakamoto: `div.index_tabs_container.js-tabs-container > div:nth-child(8)`,
        public_blockchain: `div.index_tabs_container.js-tabs-container > div:nth-child(9)`,
    },
    i = { latest: `最新`, bitcoin: `比特币`, ethereum: `以太坊`, defi: `DeFi`, inter_blockchain: `跨链`, mining: `挖矿`, safety: `安全`, satoshi_nakamoto: `中本聪`, public_blockchain: `公链` },
    a = {
        path: `/kepu/:channel?`,
        categories: [`new-media`],
        example: `/hellobtc/kepu/latest`,
        parameters: { channel: `类型，见下表，默认为最新` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `科普`,
        maintainers: [`Fatpandac`],
        handler: o,
        description: `| latest | bitcoin | ethereum | defi | inter_blockchain | mining | safety | satoshi_nakomoto | public_blockchain |
| ------ | ------- | -------- | ---- | ----------------- | ------ | ------ | ----------------- | ------------------ |
| 最新   | 比特币  | 以太坊   | DeFi | 跨链              | 挖矿   | 安全   | 中本聪            | 公链               |`,
    };
async function o(a) {
    let o = a.req.param(`channel`) ?? `latest`,
        s = `https://www.hellobtc.com/kepu.html`,
        c = n((await t(s)).data),
        l = c(r[o])
            .find(`div.new_item`)
            .toArray()
            .map((e) => ({ title: c(e).find(`a`).text(), link: c(e).find(`a`).attr(`href`) })),
        u = await Promise.all(
            l.map((r) =>
                e.tryGet(
                    r.link,
                    async () => (
                        (r.description = n((await t(r.link)).data)(`#js_content`)
                            .html()
                            .replaceAll(/(<img.*?)data-src(.*?>)/g, `$1src$2`)),
                        r
                    )
                )
            )
        );
    return { title: `白话区块链 - 科普 ${i[o]}`, link: s, item: u };
}
export { a as route };
