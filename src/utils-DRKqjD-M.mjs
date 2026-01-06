import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
        path: `/:id`,
        parameters: { id: `南方周末频道 id, 可在该频道的 URL 中找到（即 https://www.infzm.com/contents?term_id=:id)` },
        categories: [`traditional-media`],
        example: `/infzm/1`,
        radar: [{ source: [`infzm.com/contents`], target: (e, t) => (t ? `/infzm/${t.match(/contents\?term_id=(\d*)/)?.[1]}` : ``) }],
        name: `频道`,
        maintainers: [`KarasuShin`, `ranpox`, `xyqfer`],
        handler: s,
        description: `下面给出部分参考：

| 推荐 | 新闻 | 观点 | 文化 | 人物 | 影像 | 专题 | 生活 | 视频 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1    | 2    | 3    | 4    | 7    | 8    | 6    | 5    | 131  |`,
    },
    o = `https://www.infzm.com/contents`;
async function s(e) {
    let t = e.req.param(`id`),
        r = `${o}?term_id=${t}`,
        { data: i } = await n({ method: `get`, url: `${o}?term_id=${t}&page=1&format=json`, headers: { Referer: r } }),
        a = await c(i.data.contents);
    return { title: `南方周末-${i.data.current_term.title}`, link: r, image: `https://www.infzm.com/favicon.ico`, item: a };
}
async function c(a) {
    return await Promise.all(
        a.map(({ id: a, subject: s, author: c, publish_time: l }) => {
            let u = `${o}/${a}`;
            return t.tryGet(u, async () => {
                let t = e.infzm.cookie;
                return {
                    title: s,
                    description: i((await n.get({ method: `get`, url: u, headers: { Referer: u, Cookie: t || `passport_session=${Math.floor(Math.random() * 100)};` } })).data)(`div.nfzm-content__content`).html() ?? ``,
                    pubDate: r(l, 8).toUTCString(),
                    link: u,
                    author: c,
                };
            });
        })
    );
}
export { o as n, a as r, c as t };
