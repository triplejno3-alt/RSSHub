import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
    let a = r((await t.get(i)).data),
        o = n(e(a(`time`).attr(`datetime`)), 8);
    return (
        a(`.image-container, .image-container-fill`).removeAttr(`style`),
        a(`.video-package`).each((e, t) => {
            let n = a(t),
                r = n.find(`.video-description`).html(),
                i = n.attr(`data-video-url`);
            n.html(`
            <p>${r}</p>
            <iframe frameborder="0" src="${i}" allowFullScreen="true"></iframe>
        `);
        }),
        { description: a(`article`).html(), pubDate: o }
    );
};
var a = {
    ProcessFeed: (e, t) =>
        Promise.all(
            e.map((e) => {
                let n = r(e),
                    a = n(`.title`),
                    o = new URL(a.attr(`href`), `https://www.jianshu.com`).toString();
                return t.tryGet(o, async () => {
                    let e = await i(o);
                    return { title: a.text(), link: o, author: n(`.nickname`).text(), ...e };
                });
            })
        ),
};
export { a as t };
