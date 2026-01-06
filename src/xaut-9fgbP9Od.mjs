import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/index/:category?`,
    categories: [`university`],
    example: `/xaut/index/tzgg`,
    parameters: { category: `通知类别，默认为学校新闻` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `学校主页`,
    maintainers: [`mocusez`],
    handler: o,
    description: `| 学校新闻 | 砥志研思 | 立德树人 | 传道授业 | 校闻周知 |
| :------: | :------: | :------: | :------: | :------: |
|   xxxw   |   dzys   |   ldsr   |   cdsy   |   xwzz   |`,
};
async function o(a) {
    let o = a.req.param(`category`),
        s = { xxxw: `xxxw.htm`, dzys: `dzys.htm`, ldsr: `ldsr.htm`, cdsy: `cdsy.htm`, xwzz: `xwzz.htm` },
        c = { xxxw: `学校新闻`, dzys: `砥志研思`, ldsr: `立德树人`, cdsy: `传道授业`, xwzz: `校闻周知` };
    c[o] === void 0 && (o = `xxxw`);
    let l = (await n({ method: `get`, url: `http://www.xaut.edu.cn/index/` + s[o] })).body,
        u = i(l),
        d = u(`div.nlist ul li`)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.find(`a`).attr(`href`).replace(/^\.\./, `http://www.xaut.edu.cn`),
                    i = r(t(e.find(`div.time`).text().trim()), 8);
                return { title: e.find(`h5`).text(), link: n, pubDate: i };
            });
    return {
        title: `西安理工大学官网-` + c[o],
        link: `http://www.xaut.edu.cn`,
        description: `西安理工大学官网-` + c[o],
        item: await Promise.all(
            d.map((t) =>
                e.tryGet(
                    t.link,
                    async () => (
                        !t.link.includes(`://zhixing.xaut.edu.cn/`) && !t.link.includes(`://xinwen.xaut.edu.cn/`)
                            ? (t.description = i((await n({ method: `get`, url: t.link })).body)(`#vsb_content`).html())
                            : (t.description = `请在校内或校园VPN内查看内容`),
                        t
                    )
                )
            )
        ),
    };
}
export { a as route };
