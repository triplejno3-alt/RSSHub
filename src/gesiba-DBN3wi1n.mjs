import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { r as t } from './common-utils-uYpL50sT.mjs';
import { load as n } from 'cheerio';
const r = `https://www.gesiba.at`,
    i = {
        name: `Angebote`,
        example: `/gesiba/verfuegbar=alle&plz[]=1100&plz[]=1120&size-from=45&size-to=80&rooms-from=2&rooms-to=3&betreuung=0`,
        path: `*`,
        maintainers: [`sk22`],
        categories: [`other`],
        description: `
Note that, on https://www.gesiba.at/immobilien/wohnungen, filters are added to
the URL like \`&filter[plz]=1100,1120\`, but the endpoint used here expects it
like \`&plz[]=1100&plz[]=1120\`, if multiple values are passed to one parameter
`,
        async handler(i) {
            let a = t(i).slice(1);
            a.startsWith(`&`) && (a = a.slice(1));
            let o = `${r}/index.php?p=actions/sprig-core/components/render&sprig%3AsiteId=0347ff5aeebc536543e7e865c4ed9dd97a9eb81ef054d47105ba6c4ca1da10801&sprig%3Aid=37ff8c3b5f5f7ad3bca87140e3fb8094cc656fcdc5d705c964065a830717c906component-vvyfgj&sprig%3Acomponent=e0737af02d4f2e1586c10610b098b6f75b51b994ddbd89cafd13ef07dc6da9ca&sprig%3Atemplate=3b669582a22c2742c4b713143ea4663ddba00812852f876074de96ad2fc04c24_components%2F_objectList&sprig%3Avariables%5BbaseUrl%5D=0c66aec55b6b038f0c9eb2ddea75d44d0c52b6fbc93960847d53f9d0af3f6162%2Fimmobilien%2Fwohnungen&${a}`,
                s = n(await e(o));
            return {
                title: `Wohnungen - Gesiba`,
                language: `de`,
                logo: `https://www.gesiba.at/assets/img/gesiba-logo.png`,
                allowEmpty: !0,
                item: s(`#object-result a.card`)
                    .toArray()
                    .map((e) => {
                        let t = s(e),
                            n = r + e.attribs.href,
                            i = r + t.find(`img`).attr(`src`),
                            a = t.find(`.card-title`).text().trim(),
                            o = t.find(`.price`).text().trim(),
                            c = t
                                .find(`.mb-3 > p`)
                                .toArray()
                                .map((e) => s(e).text().trim())
                                .join(`, `),
                            l = t
                                .find(`.seperated:first-child > *`)
                                .toArray()
                                .map((e) => s(e).text().trim())
                                .join(`, `),
                            u = t
                                .find(`.justify-content-between > .flex-column > *`)
                                .toArray()
                                .map((e) => s(e).text().trim())
                                .join(`, `),
                            d = (o ? `${o}, ` : ``) + u + (l ? `, ${l}` : ``);
                        return { guid: `${n}#${encodeURIComponent(u)}`, title: `${a}, ${c}`, link: n, description: d, image: i, content: { html: t.html() ?? t.text(), text: t.text() } };
                    }),
                link: o,
            };
        },
    };
export { i as route };
