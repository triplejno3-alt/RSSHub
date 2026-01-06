import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/person/:id`,
    categories: [`anime`],
    example: `/bangumi.tv/person/32943`,
    parameters: { id: `人物 id, 在人物页面的地址栏查看` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bgm.tv/person/:id`] }],
    name: `现实人物的新作品`,
    maintainers: [`ylc395`],
    handler: i,
};
async function i(r) {
    let i = `https://bgm.tv/person/${r.req.param(`id`)}/works?sort=date`,
        a = n(await e(i)),
        o = a(`.nameSingle a`).text(),
        s = a(`.item`)
            .toArray()
            .map((e) => {
                let t = a(e),
                    n = t.find(`.l`);
                return { work: n.text(), workURL: `https://bgm.tv${n.attr(`href`)}`, workInfo: t.find(`p.info`).text(), job: t.find(`.badge_job`).text() };
            });
    return {
        title: `${o}参与的作品`,
        link: i,
        item: s.map((e) => {
            let n = e.workInfo.match(/(\d{4}[年-]\d{1,2}[月-]\d{1,2})/);
            return { title: `${o}以${e.job}的身份参与了作品《${e.work}》`, description: e.workInfo, link: e.workURL, pubDate: n ? t(n[1], [`YYYY-MM-DD`, `YYYY-M-D`]) : null };
        }),
    };
}
export { r as route };
