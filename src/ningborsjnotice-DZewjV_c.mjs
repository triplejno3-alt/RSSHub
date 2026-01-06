import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/zj/ningborsjnotice/:colId?`,
    categories: [`government`],
    example: `/gov/zj/ningborsjnotice/1229676740`,
    parameters: { colId: `公告分类id、详细信息点击源网站http://rsj.ningbo.gov.cn/请求中寻找` },
    radar: [{ source: [`rsj.ningbo.gov.cn/col/col1229676740/index.html`], target: `/zj/ningborsjnotice/:colId?` }],
    name: `宁波市人力资源和社会保障局-公告`,
    url: `rsj.ningbo.gov.cn`,
    maintainers: [`HaoyuLee`],
    description: `
| 公告类别         | colId |
| ------------ | -- |
| 事业单位进人公告     | 1229676740  |
    `,
    async handler(r) {
        let { colId: i = `1229676740` } = r.req.param(),
            a = `http://rsj.ningbo.gov.cn/col/col${i}/index.html`,
            { data: o } = await t(a),
            s = n(o)(`.titel.bgcolor01`).text();
        return {
            title: `宁波市人力资源和社会保障局-公告`,
            link: a,
            item: o.match(/<li class="news_line">.*<\/li>/g).map((t) => {
                let r = n(t),
                    i = r(`.news_titel`);
                return {
                    title: `宁波人社公告-${s}:${i.text()}`,
                    link: `http://rsj.ningbo.gov.cn${i.attr(`href`)}`,
                    pubDate: e(r(`.news_date`).text().replaceAll(/\[|]/g, ``)),
                    author: `宁波市人力资源和社会保障局`,
                    description: i.text(),
                };
            }),
        };
    },
};
export { r as route };
