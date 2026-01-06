import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { JSDOM as n } from 'jsdom';
const r = {
    path: `/result/:team`,
    categories: [`new-media`],
    example: `/dongqiudi/result/50001755`,
    parameters: { team: `球队 id, 可在[懂球帝数据](https://www.dongqiudi.com/data)中找到` },
    radar: [{ source: [`www.dongqiudi.com/team/*team`], target: (e) => `/dongqiudi/result/${e.team.replace(`.html`, ``)}` }],
    name: `足球赛果`,
    maintainers: [`HenryQW`],
    handler: i,
};
async function i(r) {
    let i = `https://www.dongqiudi.com/team/${r.req.param(`team`)}.html`,
        a = new n((await t(i)).data, { runScripts: `dangerously` }).window.__NUXT__.data[0],
        o = a.teamScheduleData.filter((e) => e.fs_A && e.fs_B),
        s = a.teamDetail.base_info.team_name,
        c = o.map((t) => ({
            title: `${t.match_title} ${t.team_A_name} ${t.fs_A}-${t.fs_B} ${t.team_B_name}`,
            guid: t.match_id,
            link: t.scheme.replace(`dongqiudi:///game/`, `https://www.dongqiudi.com/liveDetail/`),
            pubDate: e(t.start_time),
        }));
    return { title: `${s} 比赛结果`, link: i, item: c.slice(-10) };
}
export { r as route };
