import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
import r from 'iconv-lite';
const i = {
        lastupdate: `https://www.wenku8.net/modules/article/toplist.php?sort=lastupdate`,
        fullflag: `https://www.wenku8.net/modules/article/articlelist.php?fullflag=1`,
        postdate: `https://www.wenku8.net/modules/article/toplist.php?sort=postdate`,
        anime: `https://www.wenku8.net/modules/article/toplist.php?sort=anime`,
        allvisit: `https://www.wenku8.net/modules/article/toplist.php?sort=allvisit`,
        articlelist: `https://www.wenku8.net/modules/article/articlelist.php`,
    },
    a = { lastupdate: `今日更新`, fullflag: `完结全本`, postdate: `新书一览`, anime: `动画化作品`, allvisit: `热门轻小说`, articlelist: `轻小说列表` },
    o = { path: `/:category?`, name: `Unknown`, maintainers: [`Fatpandac`], handler: s };
async function s(o) {
    let s = o.req.param(`category`) ?? `lastupdate`,
        c = await t({ method: `get`, url: i[s], responseType: `buffer`, headers: { UserAgent: e.ua, cookie: e.wenku8.cookie } }),
        l = n(r.decode(c.data, `gbk`)),
        u = l(`td > div`)
            .toArray()
            .map((e) => ({ title: l(e).find(`b > a`).text(), link: l(e).find(`b > a`).attr(`href`), description: l(e).find(`img`).html() + l(e).find(`div:nth-child(2)`).remove(`b`).end().html() }));
    return { title: `轻小说文库 - ${a[s]}`, link: i[s], item: u };
}
export { o as route };
