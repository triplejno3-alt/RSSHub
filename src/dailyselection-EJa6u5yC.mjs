import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
    path: `/dailyselection`,
    name: `Daily Selection`,
    categories: [`picture`],
    view: r.Pictures,
    example: `/natgeo/dailyselection`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1 },
    radar: [{ source: [`nationalgeographic.com/`] }],
    maintainers: [`OrangeEd1t`],
    handler: a,
};
async function a() {
    let r = await t(`http://dili.bdatu.com/jiekou/mains/p1.html`),
        i = 0,
        a = ``;
    for (let e of r.data.album)
        if (Number.parseInt(e.ds) === 1) {
            ((i = e.sort), (a = e.addtime));
            break;
        }
    let o = `http://dili.bdatu.com/jiekou/albums/a` + i + `.html`,
        s = (await t(o)).data.picture,
        c = [];
    return (
        s.map((t) => {
            let r = { title: t.title, link: t.url, description: `<img src="${t.url}"><br>` + t.content, pubDate: n(e(a), 0), guid: t.id };
            return (c.push(r), r);
        }),
        { title: `Photo of the Daily Selection`, link: o, item: c }
    );
}
export { i as route };
