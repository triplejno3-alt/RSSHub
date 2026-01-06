import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = {
    path: `/:routeParams?`,
    parameters: { routeParams: `额外参数type,story和lang:请参阅以下说明和表格` },
    radar: [
        { source: [`www.bing.com/`], target: `` },
        { source: [`cn.bing.com/`], target: `` },
    ],
    name: `每日壁纸`,
    maintainers: [`FHYunCai`, `LLLLLFish`],
    handler: i,
    url: `www.bing.com/`,
    example: `/bing/type=UHD&story=1&lang=zh-CN`,
    description: `| 参数    | 含义                 | 接受的值                                                      | 默认值       | 备注                                                     |
|-------|--------------------|-----------------------------------------------------------|-----------|--------------------------------------------------------|
| type  | 输出壁纸的像素类型          | UHD/1920x1080/1920x1200/768x1366/1080x1920/1080x1920_logo | 1920x1080 | 1920x1200与1080x1920_logo带有水印,输入的值不在接受范围内都会输出成1920x1080 |
| story | 是否输出壁纸的故事          | 1/0                                                       | 0         | 输入的值不为1都不会输出故事                                         |
| lang  | 输出壁纸图文的地区(中文或者是英文) | zh/en                                               | zh     | zh/en输出的壁纸图文不一定是一样的;如果en不生效,试着部署到其他地方               |
`,
};
async function i(r) {
    let i = new URLSearchParams(r.req.param(`routeParams`)),
        a = i.get(`type`) || `1920x1080`,
        o = i.get(`lang`),
        s = ``;
    (o !== `zh` && o !== `en` && (o = `zh`),
        o === `zh` ? ((o = `zh-CN`), (s = `https://cn.bing.com`)) : ((o = `en-US`), (s = `https://www.bing.com`)),
        [`UHD`, `1920x1080`, `1920x1200`, `768x1366`, `1080x1920`, `1080x1920_logo`].includes(a) || (a = `1920x1080`));
    let c = i.get(`story`) === `1`,
        l = (await e(`/hp/api/model`, { baseURL: s, method: `GET`, query: { mtk: o } })).MediaContents.map((e) => {
            let r = e.Ssd,
                i = `<img width="1920" height="1080" src="${`${s}${e.ImageContent.Image.Url.match(/\/th\?id=[^_]+_[^_]+/)[0].replace(/(_\d+x\d+\.webp)$/i, ``)}_${a}.jpg`}" alt="Article Cover Image" style="display: block; margin: 0 auto;"><br>`;
            return (
                c && ((i += `<b>${e.ImageContent.Headline}</b>`), (i += `<i>${e.ImageContent.QuickFact.MainText}</i><br>`), (i += `<p>${e.ImageContent.Description}<p>`)),
                { title: e.ImageContent.Title, description: i, link: `${s}${e.ImageContent.BackstageUrl}`, author: e.ImageContent.Copyright, pubDate: n(t(r, `YYYYMMDD_HHmm`), 0) }
            );
        });
    return { title: `Bing每日壁纸`, link: s, description: `Bing每日壁纸`, item: l };
}
export { r as route };
