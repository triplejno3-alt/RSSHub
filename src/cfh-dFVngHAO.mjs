import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
    path: `/gerenzhongxin/cfh/:uid`,
    categories: [`finance`],
    view: r.Articles,
    example: `/eastmoney/gerenzhongxin/cfh/2922094262312522`,
    parameters: { uid: `用户id,即用户主页网址末尾的数字` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`guba.eastmoney.com`] }, { source: [`caifuhao.eastmoney.com`] }, { source: [`i.eastmoney.com/:uid`], target: `/gerenzhongxin/cfh/:uid` }],
    name: `个人中心长文`,
    maintainers: [`AwesomeDog`],
    handler: a,
};
async function a(r) {
    let i = r.req.param(`uid`),
        a = (await t(`https://i.eastmoney.com/api/guba/postCenterList?uid=${i}&pagenum=1&pagesize=10&type=1&filterType=1&onlyYt=0`)).data.result,
        o = a[0].post_user.user_nickname,
        s = a.map((t) => {
            let r = t.post_content;
            if (t.post_pic_url && t.post_pic_url.length > 0) {
                let e = t.post_pic_url.map((e) => `<img src="${e}">`).join(``);
                r += `<br>` + e;
            }
            return { title: t.post_title || `${o} 发布了长文: ${r}`, description: r, pubDate: n(e(t.post_publish_time), 8), link: `https://caifuhao.eastmoney.com/news/${t.post_source_id}`, author: t.post_user.user_nickname };
        });
    return { title: `${o} 的东财长文`, link: `https://i.eastmoney.com/${i}#cfh`, image: `https://avator.eastmoney.com/qface/${i}/360`, item: s };
}
export { i as n, a as t };
