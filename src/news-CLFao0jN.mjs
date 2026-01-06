import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = { global: `最新`, shares: `股市`, bonds: `债市`, commodities: `商品`, forex: `外汇`, enterprise: `公司`, 'asset-manage': `资管`, tmt: `科技`, estate: `地产`, car: `汽车`, medicine: `医药` },
    i = {
        path: `/news/:category?`,
        categories: [`finance`],
        example: `/wallstreetcn/news`,
        radar: [{ source: [`wallstreetcn.com/news/:category`, `wallstreetcn.com/`] }],
        name: `资讯`,
        maintainers: [`nczitzk`],
        handler: a,
        description: `| id           | 分类 |
| ------------ | ---- |
| global       | 最新 |
| shares       | 股市 |
| bonds        | 债市 |
| commodities  | 商品 |
| forex        | 外汇 |
| enterprise   | 公司 |
| asset-manage | 资管 |
| tmt          | 科技 |
| estate       | 地产 |
| car          | 汽车 |
| medicine     | 医药 |`,
    };
async function a(i) {
    let a = i.req.param(`category`) ?? `global`,
        o = `https://api-one.wallstcn.com`,
        s = `https://wallstreetcn.com/news/${a}`,
        c = (await n({ method: `get`, url: `${o}/apiv1/content/information-flow?channel=${a}-channel&accept=article&limit=${i.req.query(`limit`) ?? 25}` })).data.data.items
            .filter((e) => e.resource_type !== `ad`)
            .map((e) => ({ type: e.resource_type, guid: e.resource.id, link: e.resource.uri, pubDate: t(e.resource.display_time * 1e3) }));
    return (
        (c = await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = (await n({ method: `get`, url: `${o}/apiv1/content/${t.type === `live` ? `lives/${t.guid}` : `articles/${t.guid}?extract=0`}` })).data;
                    if (e.code !== 2e4) return null;
                    let r = e.data;
                    return (
                        (t.title = r.title || r.content_text),
                        (t.author = r.source_name ?? r.author.display_name),
                        (t.description = r.content + (r.content_more ?? ``)),
                        (t.category = r.asset_tags?.map((e) => e.name) ?? []),
                        r.audio_uri && ((t.enclosure_type = `audio/mpeg`), (t.enclosure_url = r.audio_uri), (t.itunes_item_image = r.image?.uri ?? ``), (t.itunes_duration = r.audio_info?.duration ?? ``)),
                        delete t.type,
                        t
                    );
                })
            )
        )),
        (c = c.filter((e) => e !== null)),
        { title: `华尔街见闻 - 资讯 - ${r[a]}`, link: s, item: c, itunes_author: `华尔街见闻`, image: `https://static.wscn.net/wscn/_static/favicon.png` }
    );
}
export { i as route };
