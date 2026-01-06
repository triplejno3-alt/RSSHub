import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/sharefile-changelog/:sharefileID/:routeParams?`,
    categories: [`game`],
    example: `/steam/sharefile-changelog/2851063440/l=schinese`,
    parameters: { sharefileID: `Steam community sharefile id. Usually refers to a workshop item.`, routeParams: `Route parameters.` },
    radar: [{ title: `Sharefile Changelog`, source: [`steamcommunity.com/sharedfiles/filedetails/changelog/:sharefileID`], target: `/sharefile-changelog/:sharefileID` }],
    description: `Steam Community Sharefile's Changelog. Primary used for a workshop item.
Helpful route parameters:
- \`l=\` language parameter, change the language of description.
- \`p=\` page parameter, change the results page. p=1 by default.
`,
    name: `Sharefile Changelog`,
    maintainers: [`NyaaaDoge`],
    handler: async (r) => {
        let { sharefileID: i, routeParams: a } = r.req.param(),
            o = n(await e(`https://steamcommunity.com/sharedfiles/filedetails/changelog/${i}${a ? `?${a}` : ``}`)),
            s = o(`div.apphub_AppName`).first().text(),
            c = o(`div.apphub_AppIcon`).children(`img`).attr(`src`),
            l = o(`div.workshopItemTitle`).first().text(),
            u = o(`div.clearfix .changeLogCtn`)
                .toArray()
                .map((e) => {
                    e = o(e);
                    let n = e.find(`.headline`).first().text(),
                        r = e.find(`p`).first().attr(`id`),
                        a = e.find(`p`).first().html();
                    return { title: n, link: `https://steamcommunity.com/sharedfiles/filedetails/changelog/${i}`, description: a, pubDate: t(r, `X`) };
                });
        return { title: l, link: `https://steamcommunity.com/sharedfiles/filedetails/changelog/${i}`, description: `${s} steam community sharefile changelog`, item: u, icon: c };
    },
};
export { r as route };
