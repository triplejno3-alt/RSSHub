import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import * as n from 'cheerio';
const r = `http://www.qstheory.cn`,
    i = async (r) => {
        let i = await e(r.link),
            a = n.load(i);
        return (
            a(`.fs-text, .fs-pinglun, .hidden-xs`).remove(),
            (r.author = a(`.appellation`).text()),
            (r.description = a(`.highlight, .text`).html() || a(`.content`).html()),
            (r.pubDate = t(
                a(`.puttime_mobi, .pubtime, .headtitle span`)
                    .text()
                    .trim()
                    .replace(`发表于`, ``)
                    .replaceAll(/(年|月)/g, `-`)
                    .replace(`日`, ``)
            )),
            r
        );
    };
export { i as n, r as t };
