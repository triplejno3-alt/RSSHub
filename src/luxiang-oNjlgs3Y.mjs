import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = { path: `/luxiang/:category?`, radar: [{ source: [`zhibo8.cc/:category/luxiang.htm`], target: `/luxiang/:category` }], name: `Unknown`, maintainers: [`TonyRL`], handler: a };
async function a(i) {
    let a = `https://www.zhibo8.cc`,
        { category: o = `nba` } = i.req.param(),
        s = `${a}/${o}/luxiang.htm`,
        c = r((await t(s)).data),
        l = c(`.box`)
            .toArray()
            .flatMap((t) => {
                t = c(t);
                let r = t.find(`h2`).text().split(` `)[0];
                return t
                    .find(`a`)
                    .toArray()
                    .map((t) => {
                        let i = c(t).attr(`href`);
                        return { title: `${t.previousSibling.data.replace(` | `, ``)} ${c(t).text()}`, link: `${a}${i}`, pubDate: n(e(`${i.replace(`/${o}/`, ``).slice(0, 4)} ${r}`, `YYYY M月D日`), 8) };
                    });
            });
    return { title: c(`head title`).text(), link: s, image: `https://www.zhibo8.cc/favicon.ico`, item: l };
}
export { i as route };
