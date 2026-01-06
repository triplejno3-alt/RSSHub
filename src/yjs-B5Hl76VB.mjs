import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/yjs`,
    categories: [`university`],
    example: `/tongji/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yz.tongji.edu.cn/zsxw/ggtz.htm`, `yz.tongji.edu.cn/`] }],
    name: `研究生招生网通知公告`,
    maintainers: [`shengmaosu`, `sitdownkevin`],
    handler: o,
    url: `yz.tongji.edu.cn/zsxw/ggtz.htm`,
};
async function a(e) {
    return ((e.description = r((await n(e.link)).data)(`#vsb_content`).html()), e);
}
async function o() {
    let i = `https://yz.tongji.edu.cn`,
        o = r((await n(`${i}/zsxw/ggtz.htm`)).body),
        s = o(`#content-box > div.content > div.list_main_content > ul`)
            .find(`li`)
            .toArray()
            .map((e) => {
                let n = o(e).find(`a`).attr(`title`),
                    r = o(e).find(`a`).attr(`href`);
                return { title: n, link: r.startsWith(`http`) ? r : new URL(r, `${i}/zsxw`).toString(), pubDate: t(o(e).find(`span`).text(), `YYYY-MM-DD`) };
            });
    return {
        title: `同济大学研究生招生网`,
        link: i,
        description: `同济大学研究生招生网通知公告`,
        image: `https://upload.wikimedia.org/wikipedia/zh/f/f8/Tongji_University_Emblem.svg`,
        icon: `https://upload.wikimedia.org/wikipedia/zh/f/f8/Tongji_University_Emblem.svg`,
        logo: `https://upload.wikimedia.org/wikipedia/zh/f/f8/Tongji_University_Emblem.svg`,
        item: await Promise.all(s.map((t) => e.tryGet(t.link, () => a(t)))),
    };
}
export { i as route };
