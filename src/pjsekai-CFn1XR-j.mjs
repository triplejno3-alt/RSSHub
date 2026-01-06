import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import * as r from 'cheerio';
const i = {
    path: `/pjsekai/news`,
    categories: [`game`],
    example: `/sega/pjsekai/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`pjsekai.sega.jp/news/index.html`] }],
    name: `世界计划 多彩舞台 ｜ ProjectSekai ｜ プロセカ`,
    maintainers: [`15x15G`],
    handler: a,
    url: `pjsekai.sega.jp/news/index.html`,
};
async function a() {
    let i = (await t.get(`https://cdn.jsdelivr.net/gh/Sekai-World/sekai-master-db-diff@master/userInformations.json`)).data || [];
    return {
        title: `Project Sekai - News`,
        link: `https://pjsekai.sega.jp/`,
        description: `プロジェクトセカイ カラフルステージ！ feat.初音ミク`,
        item: await Promise.all(
            i.map(async (i) => {
                let a = ``,
                    o = ``,
                    s = i.displayOrder.toString() + i.id.toString();
                if (i.path.startsWith(`information/`)) {
                    let n = i.path.replace(/information\/index.html\?id=/, ``);
                    a = `https://production-web.sekai.colorfulpalette.org/${i.path}`;
                    try {
                        o = await e.tryGet(s, async () => {
                            let e = await t.get(`https://production-web.sekai.colorfulpalette.org/html/${n}.html`);
                            return r.load(e.data).html();
                        });
                    } catch {
                        o = a;
                    }
                } else ((a = i.path), (o = i.title));
                return { title: i.title, link: a, pubDate: n(new Date(i.startAt), 8), description: o, category: i.informationTag, guid: s };
            })
        ),
    };
}
export { i as route };
