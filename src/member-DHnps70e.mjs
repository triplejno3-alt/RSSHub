import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = { recommend: `精选`, books: `观书堂`, courses: `在线课`, huodongs: `观学院` },
    i = {
        path: `/member/:category?`,
        categories: [`new-media`],
        example: `/guancha/member/recommend`,
        parameters: { category: `分类，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`guancha.cn/`], target: `/:category?` }],
        name: `观学院`,
        maintainers: [`nczitzk`],
        handler: a,
        url: `guancha.cn/`,
        description: `| 精选      | 观书堂 | 在线课  | 观学院   |
| --------- | ------ | ------- | -------- |
| recommend | books  | courses | huodongs |`,
    };
async function a(i) {
    let a = i.req.param(`category`) ?? `recommend`,
        o = `https://member.guancha.cn`,
        s = await t({ method: `get`, url: `${o}/zaixianke/home` }),
        c;
    switch (a) {
        case `books`:
            c = s.data.data.books.map((e) => ({
                title: e.title,
                link: `${o}/guanshutang/summary.html?id=${e.id}&page=0`,
                description: `<img src="${e.cover}"><p>[${e.audio_time}] ${e.desc_short}</p>`,
                pubDate: new Date(Number.parseInt(e.cover.split(`/`).pop().slice(0, 10)) * 1e3).toUTCString(),
            }));
            break;
        case `courses`:
            c = s.data.data.courses.data.map((e) => {
                let t = ``,
                    n = new Date(0);
                for (let r of e.items) {
                    let e = new Date(r.publish_time);
                    ((n = Math.max(n, e)), (t += `<a href="${o}/zaixianke/content.html?id=${r.id}">${r.title}</a><br>`));
                }
                return { title: e.name, link: `${o}/zaixianke/summary.html?id=${e.id}`, author: e.author_name, description: `<img src="${e.cover}"><p>${e.desc_short}</p><br>${t}`, pubDate: n.toUTCString() };
            });
            break;
        default:
            c = s.data.data[a].map((t) => {
                let r = t.media_time && t.media_time.trim().split(/\D+/, 3);
                r &&= r.filter((e) => e !== ``);
                let i;
                return (
                    r && ((i = 0), (i += r.length >= 1 ? Number.parseInt(r.slice(-1)) : 0), (i += r.length >= 2 ? Number.parseInt(r.slice(-2)) * 60 : 0), (i += r.length >= 3 ? Number.parseInt(r.slice(-3)) * 60 * 60 : 0)),
                    {
                        title: t.title,
                        link: t.jump_url,
                        author: t.author_name,
                        description: `<img src="${t.big_pic}"><p>${t.summary}</p>`,
                        enclosure_url: t.media_url,
                        enclosure_length: t.media_size,
                        itunes_duration: i,
                        enclosure_type: `audio/mpeg`,
                        pubDate: Number.isNaN(+t.created_at) ? n(e(t.created_at), 8) : e(t.created_at * 1e3),
                    }
                );
            });
    }
    return { title: `观学院 - ${r[a]}`, link: `${o}/index.html`, item: c };
}
export { i as route };
