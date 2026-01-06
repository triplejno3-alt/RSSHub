import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:category?`,
    categories: [`journal`],
    example: `/mwm`,
    parameters: { category: `分类，见下表，默认为本期要目` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`mwm.net.cn/web/:category`, `mwm.net.cn/`] }],
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 本期要目 | 网络首发 | 学术活动 | 通知公告 |
| -------- | -------- | -------- | -------- |
| bqym     | wlsf     | xshd     | tzgg     |`,
};
async function a(i) {
    let a = i.req.param(`category`) ?? `bqym`,
        o = `http://www.mwm.net.cn`,
        s = `${o}/web/${a === `bqym` ? `bqym?pagesize=${i.req.query(`limit`) ?? 100}` : a}`,
        c = r((await n({ method: `get`, url: s })).data);
    c(`.n_date`).remove();
    let l = c(`.n_title, .con1_text`)
        .toArray()
        .map((e) => ((e = c(e)), { title: e.text(), link: `${o}${e.attr(`href`)}` }));
    return (
        (l = await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data);
                    return (
                        (i.description = e(`.mrt20`).html()),
                        (i.author = e(`.mrl20`)
                            .text()
                            .trim()
                            .replace(/作者：/, ``)),
                        (i.pubDate = t(e(`.date`).eq(0).text(), `YYYY年MM月DD日`)),
                        i
                    );
                })
            )
        )),
        { title: c(`title`).text(), link: s, item: l }
    );
}
export { i as route };
