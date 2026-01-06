import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { JSDOM as n } from 'jsdom';
var r = {
    getPlayInfo: async (r, i, a = ``) => {
        let o = `https://node.kg.qq.com/play?s=${i}`,
            s = a ? `ksong:${a}` : o;
        return await e.tryGet(s, async () => {
            let { window: e } = new n((await t(o)).data, { runScripts: `dangerously` }),
                r = e.__DATA__,
                i = r.detail.song_name,
                s = r.detail.content,
                c = r.detail.nick,
                l = r.detail.cover,
                u = r.detail.playurl;
            a ??= r.detail.ksong_mid;
            let d = r.detail.ctime,
                f = r.detail.comments;
            return { name: i, link: o, description: s, author: c, enclosure_url: u, ksong_mid: a, ctime: d, itunes_item_image: l, comments: f };
        });
    },
};
export { r as t };
