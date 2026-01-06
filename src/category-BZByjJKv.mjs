import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as n } from './fetch-article-BZoaP0pr.mjs';
const r = {
        path: `/category/:category`,
        categories: [`new-media`],
        example: `/twreporter/category/world`,
        parameters: { category: `Category` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`twreporter.org/:category`] }],
        name: `分類`,
        maintainers: [`emdoe`],
        handler: a,
        url: `twreporter.org/`,
    },
    i = {
        world: { name: `國際兩岸`, url_name: `world`, category_id: `63206383207bf7c5f871622c` },
        humanrights: { name: `人權司法`, url_name: `humanrights`, category_id: `63206383207bf7c5f8716234` },
        politics_and_society: { name: `政治社會`, url_name: `politics-and-society`, category_id: `63206383207bf7c5f871623d` },
        health: { name: `醫療健康`, url_name: `health`, category_id: `63206383207bf7c5f8716245` },
        environment: { name: `環境永續`, url_name: `environment`, category_id: `63206383207bf7c5f871624d` },
        econ: { name: `經濟產業`, url_name: `econ`, category_id: `63206383207bf7c5f8716254` },
        culture: { name: `文化生活`, url_name: `culture`, category_id: `63206383207bf7c5f8716259` },
        education: { name: `教育校園`, url_name: `education`, category_id: `63206383207bf7c5f8716260` },
        podcast: { name: `Podcast`, url_name: `podcast`, category_id: `63206383207bf7c5f8716266` },
        opinion: { name: `評論`, url_name: `opinion`, category_id: `63206383207bf7c5f8716269` },
        photos_section: { name: `影像`, url_name: `photography`, category_id: `574d028748fa171000c45d48` },
    };
async function a(r) {
    let a = r.req.param(`category`),
        o = `https://go-api.twreporter.org/v2/posts?category_id=${i[a].category_id}`,
        s = `https://www.twreporter.org/categories/${i[a].url_name}`,
        c = (await e(o)).data.records,
        l = await Promise.all(
            c.map((e) => {
                let r = e.title;
                return t.tryGet(e.slug, async () => {
                    let t = await n(e.slug);
                    return ((t.title = r), t);
                });
            })
        );
    return { title: `報導者 | ${i[a].name}`, link: s, item: l };
}
export { r as route };
