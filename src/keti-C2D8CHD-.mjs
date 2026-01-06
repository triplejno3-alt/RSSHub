import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/keti/:id?`,
    categories: [`government`],
    example: `/bjsk/keti`,
    parameters: { id: `分类 id，见下表，默认为通知公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`keti.bjsk.org.cn/indexAction!to_index.action`, `keti.bjsk.org.cn/`], target: `/keti/:id` }],
    name: `基金项目管理平台`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `keti.bjsk.org.cn/indexAction!to_index.action`,
    description: `| 通知公告                         | 资料下载                         |
| -------------------------------- | -------------------------------- |
| 402881027cbb8c6f017cbb8e17710002 | 2c908aee818e04f401818e08645c0002 |`,
};
async function a(i) {
    let a = i.req.param(`id`) ?? `402881027cbb8c6f017cbb8e17710002`,
        o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 100,
        s = `https://keti.bjsk.org.cn`,
        c = `${s}/articleAction!to_moreList.action?entity.columnId=${a}&pagination.pageSize=${o}`,
        l = r((await n({ method: `get`, url: c })).data),
        u = l(`a.news`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`.zizizi`).text(), link: `${s}${e.attr(`href`)}`, pubDate: t(e.find(`.date`).text()) }));
    return (
        (u = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link })).data);
                    return ((t.description = e(`.d_text`).html()), (t.author = e(`div.d_information p span`).last().text()), t);
                })
            )
        )),
        { title: `北京社科基金项目管理平台 - ${l(`.noticetop`).text()}`, link: c, item: u }
    );
}
export { i as route };
