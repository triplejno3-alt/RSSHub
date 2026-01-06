import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import * as n from 'cheerio';
const r = {
    path: `/trade`,
    categories: [`game`],
    example: `/psnine/trade`,
    name: `闲游`,
    maintainers: [`betta-cyber`],
    handler: async () => {
        let r = `https://www.psnine.com/trade`,
            i = await e(r),
            a = n.load(i),
            o = a(`.list li`)
                .toArray()
                .map((e) => {
                    let n = a(e),
                        r = n.find(`.touch`);
                    return {
                        title: n.find(`.content`).text(),
                        link: r.attr(`href`),
                        description: n.find(`.r`).text() + r.html(),
                        pubDate: t(
                            n
                                .find(`div.meta`)
                                .contents()
                                .filter((e, t) => t.nodeType === 3)
                                .text()
                                .trim()
                                .split(/\s{2,}/)[0]
                        ),
                        author: n.find(`.psnnode`).text(),
                        category: n
                            .find(`.node`)
                            .toArray()
                            .map((e) => a(e).text()),
                    };
                });
        return { title: a(`head title`).text(), link: r, item: o };
    },
    radar: [{ source: [`psnine.com/trade`, `psnine.com`] }],
};
export { r as route };
