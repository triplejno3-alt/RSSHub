import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
const i = `https://e.ecust.edu.cn`,
    a = {
        path: `/jxjy/news`,
        categories: [`university`],
        example: `/ecust/jxjy/news`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`e.ecust.edu.cn/engine2/m/38F638B77773ADD3`, `e.ecust.edu.cn/`] }],
        name: `继续教育学院 - 学院公告`,
        maintainers: [`jialinghui`],
        handler: o,
        url: `e.ecust.edu.cn/engine2/m/38F638B77773ADD3`,
    };
async function o() {
    let { data: a } = await n.post(`${i}/engine2/general/1301/type/more-datas`, { form: { engineInstanceId: 1732458, pageNum: 1, pageSize: 20, typeId: 4562497, topTypeId: ``, sw: `` } }),
        o = a.data.datas.datas.map((e) => ({ title: e[1].value, link: e.url.startsWith(`http`) ? e.url : `${i}/engine2/d/${e.id}/${e.engineInstanceId}/0`, pubDate: r(t(e[6].value), 8) })),
        s = await Promise.all(
            o.map((t) =>
                e.tryGet(t.link, async () => {
                    if (t.link.includes(`toPhoneSign`)) return t;
                    let { data: e } = await n(t.link);
                    return ((t.description = JSON.parse(e.match(/"content":(".*")(?:,"sequence":\d+)?,"typePath"/)[1])), t);
                })
            )
        );
    return { title: `华东理工继续教育学院`, description: `学院公告`, link: `${i}/engine2/m/38F638B77773ADD3`, item: s };
}
export { a as route };
