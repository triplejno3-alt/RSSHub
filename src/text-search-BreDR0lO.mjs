import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/text-search/:keyword`,
    categories: [`reading`],
    example: `/asianfanfics/text-search/milklove`,
    parameters: { keyword: `关键词` },
    name: `关键词`,
    maintainers: [`KazooTTT`],
    radar: [{ source: [`www.asianfanfics.com/browse/text_search?q=:keyword`], target: `/text-search/:keyword` }],
    description: `匹配asianfanfics搜索关键词`,
    handler: a,
};
async function a(i) {
    let a = i.req.param(`keyword`);
    if (a.trim() === ``) throw Error(`关键词不能为空`);
    let o = `https://www.asianfanfics.com/browse/text_search?q=${a}+`,
        s = r(await e(o, { headers: { 'user-agent': t.trueUA } })),
        c = s(`.primary-container .excerpt`)
            .toArray()
            .filter((e) => s(e).find(`.excerpt__title a`).length > 0)
            .map((e) => {
                let t = s(e);
                return {
                    title: t.find(`.excerpt__title a`).text(),
                    link: `https://www.asianfanfics.com` + t.find(`.excerpt__title a`).attr(`href`),
                    author: t.find(`.excerpt__meta__name a`).text().trim(),
                    pubDate: n(t.find(`time`).attr(`datetime`) || ``),
                    description: t.find(`.excerpt__text`).html(),
                };
            });
    return { title: `Asianfanfics - 关键词：${a}`, link: o, item: c };
}
export { i as route };
