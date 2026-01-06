import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import * as n from 'cheerio';
const r = {
    path: `/`,
    categories: [`game`],
    example: `/psnine`,
    name: `首页`,
    maintainers: [`betta-cyber`],
    handler: async () => {
        let r = `https://www.psnine.com/`,
            i = await e(r),
            a = n.load(i),
            o = a(`.list li`)
                .toArray()
                .map((e) => {
                    let n = a(e);
                    return {
                        title: n.find(`.title`).text(),
                        link: n.find(`.title a`).attr(`href`),
                        pubDate: t(
                            n
                                .find(`.meta`)
                                .contents()
                                .filter((e, t) => t.nodeType === 3)
                                .text()
                                .trim()
                                .split(/\s{2,}/)[0]
                        ),
                        author: n.find(`.meta a.psnnode`).text(),
                        category: n
                            .find(`.meta a.node`)
                            .toArray()
                            .map((e) => a(e).text()),
                    };
                });
        return { title: a(`head title`).text(), description: a(`head meta[name="description"]`).attr(`content`), image: `${r}/View/aimage/p9.png`, link: r, item: o };
    },
    radar: [{ source: [`psnine.com`] }],
};
export { r as route };
