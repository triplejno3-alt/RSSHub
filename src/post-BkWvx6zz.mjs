import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { path: `/`, radar: [{ source: [`medieval-china.club/`], target: `` }], name: `Unknown`, maintainers: [`artefaritaKuniklo`], handler: o, url: `medieval-china.club/` };
async function o(a) {
    let o = `https://medieval-china.club`,
        { data: s } = await n(o),
        c = i(s),
        l = JSON.parse(
            c(`script:contains("window.localPosts")`)
                .text()
                .match(/window\.localPosts = JSON\.parse\('(.*)'\);/)[1]
        )
            .slice(0, a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 10)
            .map((e) => ({ title: e.title, link: `${o}${e.path}`, pubDate: r(t(e.date), 8) }));
    return {
        title: `中国的中古`,
        link: o,
        item: await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        r = i(e),
                        a = r(`img`).attr(`data-original`);
                    return (r(`img`).attr(`src`, `${o}${a}`), r(`.head-mask`).remove(), r(`div.lover-box`).remove(), (t.description = r(`article`).first().html()), t);
                })
            )
        ),
        image: `https://medieval-china.club/images/icons/favicon-144x144.png`,
        description: `世界那么大，你无法去到每一个地方，感受每一处风景；时间那么长，那些逝去的人你也终将无法与之谋面。而通过古人之文字，今人之分享，你可以领略以前风光之奇绝瑰玮，感受逝人之人情冷暖。中古就是这么一个地方，大家来自全球各地，不同时区，不同性别，不同身份，不同职业，但是大家都被中古的绚烂华章聚集在一起，哀其所哀，乐其所乐。这是一个虚拟的世界，但是我们仿佛跨越千里而来，谈一场绝世爱恋，今夕何夕！仅以此网站献给中古club的每一位成员，契阔谈宴，西园不芜！`,
    };
}
export { a as route };
