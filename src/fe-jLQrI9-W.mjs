import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/fe/:category`,
    categories: [`university`],
    example: `/bnu/fe/18`,
    parameters: {},
    radar: [{ source: [`fe.bnu.edu.cn/pc/cms1info/list/1/:category`] }],
    name: `教育学部-培养动态`,
    maintainers: [`etShaw-zh`],
    handler: a,
    description: '`https://fe.bnu.edu.cn/pc/cms1info/list/1/18` 则对应为 `/bnu/fe/18',
};
async function a(i) {
    let { category: a } = i.req.param(),
        o;
    try {
        o = await n.post(`https://fe.bnu.edu.cn/pc/cmscommon/nlist`, {
            headers: {
                Accept: `application/json, text/javascript, */*; q=0.01`,
                'Content-Type': `application/x-www-form-urlencoded; charset=UTF-8`,
                Origin: `https://fe.bnu.edu.cn`,
                Referer: `https://fe.bnu.edu.cn/pc/cms1info/list/1/18`,
                'X-Requested-With': `XMLHttpRequest`,
            },
            body: `columnid=${a}&page=1`,
        });
    } catch {
        throw Error(`Failed to fetch data from API`);
    }
    let s = JSON.parse(o.body);
    if (s.code !== 0 || !s.data) throw Error(`Invalid API response`);
    let c = s.data.map((e) => ({ title: e.title, link: `https://fe.bnu.edu.cn/html/1/news/${e.htmlpath}/n${e.newsid}.html`, pubDate: t(e.happendate, `YYYY-MM-DD`) }));
    return {
        title: `北京师范大学教育学部-培养动态`,
        link: `https://fe.bnu.edu.cn/pc/cms1info/list/1/18`,
        description: `北京师范大学教育学部-培养动态最新通知`,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return ((t.author = `北京师范大学教育学部`), (t.description = e(`.news02_div`).html() || `暂无详细内容`), t);
                })
            )
        ),
    };
}
export { i as route };
