import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { i as t, t as n } from './utils-3T3qaOHw.mjs';
const r = {
    name: `Mylist`,
    path: `/mylist/:id`,
    parameters: { id: `Mylist ID` },
    example: `/nicovideo/mylist/2973737`,
    maintainers: [`esperecyan`],
    radar: [{ source: [`www.nicovideo.jp/user/:user/mylist/:id`], target: `/mylist/:id` }],
    handler: async (r) => {
        let { id: i } = r.req.param(),
            a = await n(i);
        return {
            title: `マイリスト ${a.name}‐ニコニコ動画`,
            link: `https://www.nicovideo.jp/user/${a.owner.id}/mylist/${a.id}`,
            language: `ja`,
            item: a.items.map((n) => ({
                title: n.video.title,
                link: `https://www.nicovideo.jp/watch/${n.video.id}`,
                pubDate: e(n.addedAt),
                author: [{ name: n.video.owner.name, avatar: n.video.owner.iconUrl, url: `https://www.nicovideo.jp/user/${n.video.owner.id}` }],
                description: t(n.video, !1),
                image: n.video.thumbnail.nHdUrl ?? n.video.thumbnail.largeUrl ?? n.video.thumbnail.middleUrl ?? void 0,
            })),
        };
    },
};
export { r as route };
