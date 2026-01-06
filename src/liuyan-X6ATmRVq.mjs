import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/liuyan/:id/:state?`,
    categories: [`traditional-media`],
    example: `/people/liuyan/539`,
    parameters: { id: `编号，可在对应人物页 URL 中找到`, state: `状态，见下表，默认为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`liuyan.people.com.cn/`] }],
    name: `领导留言板`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `liuyan.people.com.cn/`,
    description: `| 全部 | 待回复 | 办理中 | 已办理 |
| ---- | ------ | ------ | ------ |
| 1    | 2      | 3      | 4      |`,
};
async function a(i) {
    let a = i.req.param(`id`),
        o = i.req.param(`state`) ?? `1`,
        s = `http://liuyan.people.com.cn`,
        c = `${s}/threads/list?fid=${a}#state=${o}`,
        l,
        u = (await n({ method: `post`, url: `${s}/threads/queryThreadsList`, form: { fid: a, state: o, lastItem: 0 } })).data.responseData.map((e) => ({
            title: e.subject,
            author: e.nickName,
            link: `${s}/threads/content?tid=${e.tid}`,
            pubDate: t(e.threadsCheckTime * 1e3),
        })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link })).data);
                    return ((t.description = e(`.content`).html()), (l ??= e(`#currentForum`).text()), t);
                })
            )
        );
    return { title: `${l} - 领导留言板 - 人民网`, link: c, item: d };
}
export { i as route };
