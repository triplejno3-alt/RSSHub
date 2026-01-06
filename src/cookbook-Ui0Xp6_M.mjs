import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/cookbook`,
    categories: [`programming`],
    description: `OpenAI Cookbook 提供了大量使用 OpenAI API 的实用指南和示例代码,涵盖了从基础到高级的各种主题,包括 GPT 模型、嵌入、函数调用、微调等。这里汇集了最新的 API 功能介绍和流行的应用案例,是开发者学习和应用 OpenAI 技术的宝贵资源。`,
    maintainers: [`liyaozhong`],
    radar: [{ source: [`cookbook.openai.com/`] }],
    url: `cookbook.openai.com/`,
    handler: a,
    example: `/openai/cookbook`,
    name: `Cookbook`,
};
async function a() {
    let i = `https://cookbook.openai.com`,
        a = `${i}/`;
    try {
        let t = r(await e(a)),
            o = t(`[class="min-h-[90vh] mt-4"] .grid a`)
                .toArray()
                .map((e) => {
                    let n = t(e),
                        r = n.find(`div.font-semibold.text-sm.text-primary.line-clamp-1.overflow-ellipsis`),
                        a = n.find(String.raw`span.text-xs.text-muted-foreground.md\:w-24.text-end`),
                        o = n.find(`p:contains("OpenAI")`),
                        s = n.find(`span[style^="color:"]`);
                    return { title: r.text().trim(), link: `${i}/${n.attr(`href`)}`, pubDate: a.text().trim(), author: o.text().replace(`OpenAI`, ``).trim(), category: s.toArray().map((e) => t(e).text().trim()) };
                });
        return (
            (o = (
                await Promise.all(
                    o.map((t) =>
                        n.tryGet(t.link, async () => {
                            try {
                                return ((t.description = r(await e(t.link))(String.raw`article.prose.prose-sm.sm\:prose-base.max-w-none.dark\:prose-invert`).html()), t);
                            } catch {
                                return { ...t, description: `` };
                            }
                        })
                    )
                )
            ).filter((e) => e?.description)),
            { title: `OpenAI Cookbook`, link: a, item: o }
        );
    } catch (e) {
        throw (t.error(`处理 OpenAI Cookbook 请求时发生错误: ${e}`), e);
    }
}
export { i as route };
