import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = `xiaoyuzhou_items`,
    i = (e) => {
        e = new Date(e);
        let t = new Date();
        return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
    },
    a = async () => {
        let r = e.xiaoyuzhou.device_id || `f5d56d9a-8530-49a4-a6d2-cfb4b7a31240`,
            i =
                (await t.get(`XIAOYUZHOU_TOKEN`)) ||
                e.xiaoyuzhou.refresh_token ||
                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVzhieXB2dTJtT24xZWNqcEppN2p6R2xhMDBhMHYxellLaHFcL0ZXVWVkdDcxNlh3bnJnOFE0cFpGbVJmVFJQQ29ESWsxMmVuY3RcLzNqQWNjeFU3aTZNbkM4MUtWcUlmWWJJbVBKdXJDTXVYc1dHa2x0SE5TK3llNnJvTldLSWN1M1ZFTGY5WFE0cGhnK2crQld6bFloM2g0VUtONlNKWWlUSGtkaHowd0RJYXIrdTlzOE5PaEJPYXdJXC80NEFZcW41RjJqUXNnU3o1TExDSGtuTENuUFppRXllaTNwcVFwRkgweWFWbk03bmQ2RFhrUmVmUExVMTVpMXcwRnpkXC9wWDEiLCJ2IjozLCJpdiI6IkJiVGFjXC9KTG9BU1NYY0tPMkk3M0JBPT0iLCJpYXQiOjE1OTQ1NzIyOTEuODE2fQ.aQm7A6A1R3P94s88vWBWTbIeek9nJ-q9ztfCB7o1uK0`,
            a = { applicationid: `app.podcast.cosmos`, 'app-version': `1.6.0`, 'x-jike-device-id': r, 'user-agent': `okhttp/4.7.2` },
            o = await n({ method: `post`, url: `https://api.xiaoyuzhoufm.com/app_auth_tokens.refresh`, headers: { ...a, 'x-jike-refresh-token': i } });
        t.set(`XIAOYUZHOU_TOKEN`, o.data[`x-jike-refresh-token`]);
        let s = (await n({ method: `post`, url: `https://api.xiaoyuzhoufm.com/v1/editor-pick/list`, headers: { ...a, 'x-jike-access-token': o.data[`x-jike-access-token`] } })).data.data,
            c = [];
        for (let e of s) {
            let t = new Date(e.date + ` 00:00:00 +0800`).toUTCString();
            for (let n of e.picks) ((n.pubDate = t), c.push(n));
        }
        return c.map((e) => {
            let t = e.episode.title + ` - ` + e.episode.podcast.title,
                n = e.episode.eid,
                r = e.episode.image ? e.episode.image.picUrl : e.episode.podcast.image ? e.episode.podcast.image.picUrl : ``,
                i = `https://www.xiaoyuzhoufm.com/episode/${n}`,
                a = e.pubDate,
                o = e.episode.duration,
                s = e.episode.enclosure.url;
            return {
                title: t,
                description: `<p><strong>${e.comment.author.nickname}：</strong>${e.comment.text}</p><hr>` + e.episode.shownotes,
                link: i,
                author: e.episode.podcast.author,
                pubDate: a,
                enclosure_url: s,
                itunes_duration: o,
                itunes_item_image: r,
                enclosure_type: `audio/mpeg`,
            };
        });
    },
    o = { path: `/`, radar: [{ source: [`xiaoyuzhoufm.com/`], target: `` }], name: `Unknown`, maintainers: [`prnake`, `Maecenas`], handler: s, url: `xiaoyuzhoufm.com/` };
async function s() {
    let e = await t.tryGet(r, () => a());
    return (
        i(e[0].pubDate) || ((e = await a()), t.set(r, e)),
        {
            title: `小宇宙 - 发现`,
            link: `https://www.xiaoyuzhoufm.com/`,
            description: `小宇宙的编辑精选`,
            image: `https://www.xiaoyuzhoufm.com/apple-touch-icon.png`,
            itunes_author: `小宇宙`,
            itunes_category: `Society & Culture`,
            item: e,
        }
    );
}
export { o as route };
