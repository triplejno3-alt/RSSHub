import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/jwc/:category?`,
    categories: [`university`],
    example: `/xaut/jwc/tzgg`,
    parameters: { category: `通知类别，默认为通知公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `教务处`,
    maintainers: [`mocusez`],
    handler: a,
    description: `::: warning
  有些内容需使用校园网或 VPN 访问知行网获取
:::

| 通知公告 | 新闻动态 | 规章制度 | 竞赛结果公示 | 竞赛获奖通知 | 竞赛信息 | 公开公示 |
| :------: | :------: | :------: | :----------: | :----------: | :------: | :------: |
|   tzgg   |   xwdt   |   gzzd   |     jggs     |     jsjg     |   jsxx   |   gkgs   |`,
};
async function a(i) {
    let a = i.req.param(`category`),
        o = `http://jwc.xaut.edu.cn/`,
        s = { tzgg: `tzgg.htm`, xwdt: `xwdt.htm`, gzzd: `gzzd.htm`, jggs: `xkjs/jggs.htm`, jsjg: `xkjs/jsjg.htm`, jsxx: `xkjs/jsxx.htm`, gkgs: `gkgs.htm` },
        c = { tzgg: `通知公告`, xwdt: `新闻动态`, gzzd: `规章制度`, jggs: `竞赛结果公示`, jsjg: `竞赛获奖通知`, jsxx: `竞赛信息`, gkgs: `公开公示` };
    c[a] === void 0 && (a = `tzgg`);
    let l = (await n({ method: `get`, url: o + s[a] })).body,
        u = r(l),
        d = u(`.main_conRCb a`)
            .slice(0, 20)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e
                    .attr(`href`)
                    .replace(/^\.\./, o)
                    .replace(/^(info)/, o + `info`);
                return { title: e.find(`em`).text(), link: n, pubDate: t(e.find(`span`).text()) };
            });
    return {
        title: `西安理工大学教务处-` + c[a],
        link: o,
        description: `西安理工大学教务处-` + c[a],
        item: await Promise.all(
            d.map((t) =>
                e.tryGet(
                    t.link,
                    async () => (
                        !t.link.match(`zhixing.xaut.edu.cn`) && !t.link.match(`xinwen.xaut.edu.cn`)
                            ? (t.description = r((await n({ method: `get`, url: t.link })).body)(`#vsb_content`).html())
                            : (t.description = `请在校内或校园VPN内查看内容`),
                        t
                    )
                )
            )
        ),
    };
}
export { i as route };
