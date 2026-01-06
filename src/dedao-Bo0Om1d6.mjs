import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:category?`,
    name: `文章`,
    maintainers: [`nczitzk`, `pseudoyu`],
    categories: [`new-media`],
    example: `/dedao`,
    parameters: { category: '分类，见下表，默认为`news`' },
    description: `| 新闻 | 人物故事 | 视频 |
| ---- | ---- | ---- |
| news | figure | video |`,
    handler: a,
};
async function a(i) {
    let a = i.req.param(`category`) ?? `news`,
        o = `https://www.igetget.com/${a === `video` ? `video` : `news`}`,
        s = await n({ method: `get`, url: o }),
        c = JSON.parse(s.data.match(/window.__INITIAL_STATE__= (.*);<\/script>/)[1]),
        l = (a === `news` ? c.news : a === `figure` ? c.figure : c.videoList).map((e) => ({
            title: e.title,
            pubDate: t(e.online_time),
            link: `${o}/${a === `news` ? `article/` : a === `figure` ? `people/` : ``}${e.online_time.split(`T`)[0].split(`-`).join(``)}/${e.token}`,
        }));
    return (
        (l = await Promise.all(l.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link })).data)(`.menu-article`).html()), t))))),
        { title: `得到${a === `video` ? `` : `大事件`} - ${a === `news` ? `新闻` : a === `figure` ? `人物故事` : `视频`}`, link: o, item: l, description: c.description }
    );
}
export { i as route };
