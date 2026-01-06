import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { n as e, t } from './util-GgHyLnNT.mjs';
const n = {
    path: `/realtime/:section?`,
    categories: [`traditional-media`],
    example: `/zaobao/realtime/china`,
    parameters: { section: `分类，缺省为 china` },
    name: `即时新闻`,
    maintainers: [`shunf4`],
    handler: r,
    description: `| 中国  | 新加坡    | 国际  | 财经     |
| ----- | --------- | ----- | -------- |
| china | singapore | world | zfinance |`,
};
async function r(n) {
    let r = n.req.param(`section`) ?? `china`,
        i,
        a;
    switch (r) {
        case `singapore`:
            ((i = `新加坡`), (a = `/realtime/singapore`));
            break;
        case `world`:
            ((i = `国际`), (a = `/realtime/world`));
            break;
        case `zfinance`:
            ((i = `财经`), (a = `/finance/realtime`));
            break;
        case `china`:
        default:
            ((i = `中港台`), (a = `/realtime/china`));
            break;
    }
    let { resultList: o } = await e(a);
    return { title: `《联合早报》-${i}-即时`, link: `https://www.zaobao.com` + a, description: `新加坡、中国、亚洲和国际的即时、评论、商业、体育、生活、科技与多媒体新闻，尽在联合早报。`, image: t, item: o };
}
export { n as route };
