import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { a as e, c as t, i as n, m as r, s as i, u as a } from './api-Dcvu7xdq.mjs';
const o = { path: `/ff14risingstones/user-dynamics/:uid`, example: `/sdo/ff14risingstones/user-dynamics/10001226`, name: `用户动态`, categories: [`bbs`], maintainers: [`KarasuShin`], features: { requireConfig: r }, handler: s };
async function s(r) {
    i();
    let o = r.req.param(`uid`),
        [s, c] = await Promise.all([n(o), e(o)]);
    return { title: `石之家 - ${c.character_name}@${c.group_name} 的动态`, link: `${a}#/me/dynamics?uuid=${o}`, image: c.avatar, item: await t(s) };
}
export { o as route };
