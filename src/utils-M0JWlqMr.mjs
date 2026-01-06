import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
async function a(a, o, s, c, l, u) {
    let d = await e(o, { rejectUnauthorized: !1 });
    if (!d) return [];
    let f = i(d),
        p = f(`tr[height=20]`)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.find(c).attr(`title`), link: new URL(e.find(c).attr(`href`), s).href, pubDate: r(n(e.find(l).text().trim(), `YYYY-MM-DD`), 8) }));
    return await Promise.all(
        p.map((a) =>
            t.tryGet(a.link, async () => {
                if (a.link.includes(`.jsp`)) return { ...a, description: `该通知无法直接预览，请点击原文链接↑查看` };
                let t = await e(a.link, { rejectUnauthorized: !1 });
                if (!t || (t.status >= 300 && t.status < 400)) a.description = `该通知无法直接预览，请点击原文链接↑查看`;
                else {
                    let e = i(t);
                    if (((a.title = e(u.title).text()), e(`script:contains("showVsbpdfIframe")`).length > 0)) a.description = `该通知无法直接预览，请点击原文链接↑查看`;
                    else {
                        let t = i(e(u.content).html());
                        (t(`a`).each(function () {
                            let t = e(this),
                                n = t.attr(`href`);
                            n && !n.startsWith(`http`) && t.attr(`href`, new URL(n, s).href);
                        }),
                            (a.description = t.html()));
                    }
                    a.pubDate = r(n(e(u.date).text().replaceAll(/年|月/g, `-`).replaceAll(`日`, ``)), 8);
                }
                return a;
            })
        )
    );
}
export { a as t };
