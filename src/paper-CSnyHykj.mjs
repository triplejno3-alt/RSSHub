import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/paper/:id?`,
    categories: [`traditional-media`],
    example: `/zjol/paper/zjrb`,
    parameters: { id: '报纸 id，见下表，默认为 `zjrb`，即浙江日报' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `浙报集团系列报刊`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 浙江日报 | 钱江晚报 | 美术报 | 浙江老年报 | 浙江法制报 | 江南游报 |
| -------- | -------- | ------ | ---------- | ---------- | -------- |
| zjrb     | qjwb     | msb    | zjlnb      | zjfzb      | jnyb     |`,
};
async function o(a) {
    let o = a.req.param(`id`) ?? `zjrb`,
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 100;
    if (![`zjrb`, `qjwb`, `msb`, `zjlnb`, `zjfzb`, `jnyb`].includes(o)) throw new r(`id not allowed`);
    let c = o === `jnyb` ? `map[name="PagePicMap"] area` : `ul.main-ed-articlenav-list li a`,
        l = o === `qjwb` ? `http://qjwb.thehour.cn` : `https://${o}.zjol.com.cn`,
        u = `${l}/paperindex.htm`,
        d = await n({ method: `get`, url: u }),
        f = d.data.match(/URL=(.*)"/)[1],
        p = t(f.match(/(\d{4}-\d{2}\/\d{2})/)[1], `YYYY-MM/DD`);
    ((u = `${l}/${f.replace(`/${f.split(`/`).pop()}`, ``)}`), (d = await n({ method: `get`, url: `${l}/${f}` })));
    let m = i(d.data),
        h = m(c)
            .toArray()
            .map((e) => `${u}/${m(e).attr(`href`)}`);
    return (
        await Promise.all(
            m(`#pageLink`)
                .slice(1)
                .toArray()
                .map((e) => `${u}/${m(e).attr(`href`)}`)
                .map(async (e) => {
                    let t = i((await n({ method: `get`, url: e })).data);
                    h.push(
                        ...t(c)
                            .toArray()
                            .map((e) => `${u}/${t(e).attr(`href`)}`)
                    );
                })
        ),
        (h = await Promise.all(
            h
                .filter((e) => (o === `jnyb` ? /\?div=1$/.test(e) : !0))
                .slice(0, s)
                .map((t) =>
                    e.tryGet(t, async () => {
                        let e = i((await n({ method: `get`, url: t })).data),
                            r = e(`.main-article-title`).text();
                        return (e(`.main-article-alltitle`).remove(), { title: r, pubDate: p, link: t.split(`?`)[0], description: e(`.main-article-content`).html() });
                    })
                )
        )),
        { title: m(`title`).text(), link: l, item: h }
    );
}
export { a as route };
