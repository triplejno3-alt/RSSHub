import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
async function r(r, i) {
    let { data: a } = await t(`https://www.lifeweek.com.cn/api/article/${r.id}`),
        o = n(e(r.pubTime), 8);
    return { title: r.title, description: a.model.content, link: i, pubDate: o };
}
var i = r;
export { i as t };
