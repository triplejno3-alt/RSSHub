import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/jwb`,
    categories: [`university`],
    example: `/bnu/jwb`,
    parameters: {},
    radar: [{ source: [`jwb.bnu.edu.cn`] }],
    name: `教务部（研究生院）`,
    maintainers: [`ladeng07`],
    handler: a,
    url: `jwb.bnu.edu.cn/tzgg/index.htm`,
};
async function a() {
    let i = `https://jwb.bnu.edu.cn/tzgg/index.htm`,
        a = r((await n(i)).data),
        o = a(`.article-list .boxlist ul li`)
            .toArray()
            .map((e) => {
                e = a(e);
                let n = e.find(`a`);
                return { title: e.find(`a span`).text(), link: n.attr(`href`).startsWith(`http`) ? n.attr(`href`) : `https://jwb.bnu.edu.cn` + n.attr(`href`).slice(2), pubDate: t(e.find(`span.fr.text-muted`).text(), `YYYY-MM-DD`) };
            });
    return {
        title: `北京师范大学教务部`,
        link: i,
        description: `北京师范大学教务部最新通知`,
        item: await Promise.all(
            o.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return ((t.author = `北京师范大学教务部`), (t.description = e(`.contenttxt`).html()), t);
                })
            )
        ),
    };
}
export { i as route };
