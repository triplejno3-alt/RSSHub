import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/:category?/:tab?`,
    categories: [`game`],
    example: `/2023game/sgame/topicList`,
    parameters: { category: `分类，见下表`, tab: `标签, 所有:all;最新:topicList;热门:jhcpb` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `游戏星辰`,
    maintainers: [`xzzpig`],
    handler: i,
    url: `www.2023game.com/`,
    description: `分类

| PS4游戏 | switch游戏 | 3DS游戏 | PSV游戏 | Xbox360 | PS3游戏 | 世嘉MD/SS | PSP游戏 | PC周边 | 怀旧掌机 | 怀旧主机 | PS4教程 | PS4金手指 | switch金手指 | switch教程 | switch补丁 | switch主题 | switch存档 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| ps4 | sgame | 3ds | psv | jiaocheng | ps3yx | zhuji.md | zhangji.psp | pcgame | zhangji | zhuji | ps4.psjc | ps41.ps4pkg | nsaita.cundang | nsaita.pojie | nsaita.buding | nsaita.zhutie | nsaita.zhuti |`,
};
async function i(r) {
    let i = (r.req.param(`category`) ?? `sgame`).replaceAll(`.`, `/`),
        a = r.req.param(`tab`) ?? `all`,
        o = `https://www.2023game.com/${i}/`,
        s = n((await t(o)).data),
        c = `.news`;
    a !== `all` && (c = `#${a} > ${c}`);
    let l = s(c)
        .toArray()
        .map((t) => {
            let n = s(t),
                r = n.find(`a`).attr(`href`);
            return { title: n.text().trim(), guid: `2023game:${r}`, link: r, pubDate: e(n.find(`.time_box`).text().trim()), description: n.html() ?? `` };
        });
    return { title: s(`title`).text(), link: o, allowEmpty: !0, image: `https://www.2023game.com/resources/img/logo.png`, item: l };
}
export { r as route };
