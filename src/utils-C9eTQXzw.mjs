import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = (i, a) =>
    a(i.link, async () => {
        let { data: a } = await t(i.link),
            o = r(a);
        if (i.link.startsWith(`https://dl.3dmgame.com/`)) {
            let t = o(`.patchtop .lis`),
                [, r, a, s] = t.text().match(/补丁类型：(.*?)\n.*整理时间：(.*?)\n.*补丁制作：(.*?)\n/s);
            ((i.description = t.html() + o(`.L_title`).html() + o(`.GmL_1`).html()), (i.category = r), (i.pubDate = n(e(a), 8)), (i.author = s));
        } else ((i.description = o(`.news_warp_center`).html()), (i.pubDate = n(e(o(`.time span`).text()), 8)), (i.author = o(`.intem li:nth-child(2) .name`).text().trim()));
        return i;
    });
export { i as t };
