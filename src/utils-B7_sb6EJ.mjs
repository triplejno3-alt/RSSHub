import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
function r(r) {
    return t.tryGet(r.link, async () => {
        let t = n(await e(r.link));
        return (
            (r.description = r.link.includes(`external`) ? t(`:is([class^=external-article-brief],[class^=external-article-content])`).html() : t(`:is([class^=brief__BriefContainer],[class^=article-content__Wrapper])`).html()),
            (r.category = [...r.category, ...(t(`meta[name='keywords']`).attr(`content`) ?? ``).split(`,`)]),
            r
        );
    });
}
export { r as t };
