import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = { name: `Mashiro's Baumkuchen`, url: `mashiro.best`, description: `Muen's blog posts`, zh: { name: `真白的年轮面包` } },
    a = `https://${i.url}`,
    o = {
        path: `/:lang`,
        categories: [`blog`],
        example: `/mashiro/en`,
        parameters: { lang: 'the language of the site. Can be either `en` or `zh-cn`. Default: `en`' },
        radar: [{ source: [`mashiro.best/`, `mashiro.best/:lang/`] }],
        name: `Blog`,
        maintainers: [`MuenYu`],
        handler: async (o) => {
            let { lang: s = `en` } = o.req.param(),
                c = s === `en` ? `${a}/archives/` : `${a}/${s}/archives/`,
                l = r(await e(c)),
                u = l(`.archives-group article`)
                    .toArray()
                    .slice(0, 10)
                    .map((e) => {
                        e = l(e);
                        let t = e.find(`a`).first();
                        return { title: t.find(`.article-title`).text(), link: `${a}${t.attr(`href`)}`, pubDate: n(t.find(`time`).attr(`datetime`)) };
                    }),
                d = await Promise.all(
                    u.map((n) =>
                        t.tryGet(
                            n.link,
                            async () => (
                                (n.description = r(await e(n.link))(`.article-content`)
                                    .first()
                                    .html()),
                                n
                            )
                        )
                    )
                );
            return { title: i.name, link: c, item: d };
        },
    };
export { o as route };
