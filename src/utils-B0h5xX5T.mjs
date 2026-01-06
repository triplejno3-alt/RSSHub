import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './description-UqFyTtWs.mjs';
import { load as i } from 'cheerio';
const a = `https://www.yicai.com`,
    o = async (i, o) => {
        let c = (await t({ method: `get`, url: i })).data.map((t) => ({
            title: t.NewsTitle,
            link: t.url.startsWith(`http`) ? t.url : `${a}${t.AppID === 0 ? `/vip` : ``}${t.url}`,
            author: t.NewsAuthor || t.NewsSource || t.CreaterName,
            pubDate: n(e(t.CreateDate), 8),
            category: [t.ChannelName],
            description: r({ image: { src: t.originPic, alt: t.NewsTitle }, video: { src: t.VideoUrl, type: t.VideoUrl?.split(/\./).pop() ?? void 0 }, intro: t.NewsNotes }),
        }));
        return Promise.all(s(c, o));
    };
function s(n, r) {
    return n.map((n) =>
        r(n.link, async () => {
            let r = i((await t({ method: `get`, url: n.link })).data);
            if (!n.pubDate) {
                let t = r(`script[src='/js/alert.min.js']`).next().text() || r(`title`).next().text();
                n.pubDate = e(`${new Map(JSON.parse(t.match(/_pb = (\[.*?]);/)[1].replaceAll(`'`, `"`))).get(`actime`)}:00`);
            }
            return (r(`h1`).remove(), r(`.u-btn6, .m-smallshare, .topic-hot`).remove(), (n.description = (n.description ?? ``) + (r(`.multiText, #multi-text, .txt`).html() ?? ``)), n);
        })
    );
}
export { s as n, a as r, o as t };
