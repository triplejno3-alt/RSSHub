import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/counterstrike/matches/:team`,
    radar: [{ source: [`liquipedia.net/counterstrike/:id/Matches`, `liquipedia.net/dota2/:id`], target: `/counterstrike/matches/:id` }],
    example: `/liquipedia/counterstrike/matches/Team_Falcons`,
    name: `Counter-Strike Team Match Results`,
    maintainers: [`CookiePieWw`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`team`),
        i = `https://liquipedia.net/counterstrike/${r}/Matches`,
        a = t(await e(i)),
        o = a(`table`).first().find(`th`),
        s = {};
    o.each((e, t) => {
        let n = a(t).text().trim().toLowerCase();
        (n.includes(`date`) && (s.date = e), n.includes(`tournament`) && (s.tournament = e), n.includes(`score`) && (s.score = e), n.includes(`opponent`) && (s.opponent = e));
    });
    let c = a(`.recent-matches-bg-lose, .recent-matches-bg-win`)
        .toArray()
        .map((e) => {
            let t = a(e),
                n = (() => (t.attr(`class`) === `recent-matches-bg-lose` ? `LOSS` : `WIN`))(),
                o = t.find(`td`),
                c = o
                    .eq(s.date ?? 0)
                    .text()
                    .trim(),
                l = o
                    .eq(s.tournament ?? 5)
                    .text()
                    .trim(),
                u = o
                    .eq(s.score ?? 7)
                    .text()
                    .trim(),
                d = o
                    .eq(s.opponent ?? 8)
                    .text()
                    .trim();
            return { title: `[${n}] ${r} ${u} ${d} on ${l}`, description: `${c},  ${r} ${u} ${d} on ${l}`, link: i, guid: i + c };
        });
    return { title: `[Counter-Strike] ${r} Match Results From Liquipedia`, link: i, item: c };
}
export { n as route };
