import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
import { raw as i } from 'hono/html';
const a = {
    path: `/exam`,
    categories: [`government`],
    example: `/crac/exam`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `考试信息`,
    maintainers: [`admxj`],
    radar: [{ source: [`www.crac.org.cn/*`], target: `/exam` }],
    handler: o,
};
async function o() {
    let n = `http://82.157.138.16:8091/CRAC`;
    return {
        title: `考试信息-中国无线电协会业余无线电分会`,
        link: `http://82.157.138.16:8091/CRAC/crac/pages/list_examMsg.html`,
        item: (await e({ method: `post`, url: `${n}/app/exam_advice/examAdviceList`, body: { req: { type: `0`, page_no: `1`, page_size: `10` } } })).data.res.list.map((e) => {
            let i = `${n}/crac/pages/list_detail.html?id=${Buffer.from(e.id).toString(`base64`)}&type=${Buffer.from(e.type).toString(`base64`)}`;
            return {
                title: e.name,
                link: i,
                id: e.id,
                author: e.exam.organizer,
                pubDate: e.createDate,
                updated: e.updateDate,
                startDate: e.exam.signUpStartDate,
                category: [e.examType],
                image: e.weixin,
                description: r(t(s, { item: e })),
            };
        }),
    };
}
const s = ({ item: e }) =>
    n(`div`, {
        class: `notice-info`,
        children: [
            n(`table`, {
                class: `exam-table`,
                id: `exam_table`,
                style: `width: 90%;margin: 30px auto 0;border: 1px solid #e2e5ef;`,
                children: [
                    n(`tr`, {
                        children: [
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `组织者：` }),
                            t(`td`, { children: e.exam.organizer }),
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `报名开始日期：` }),
                            t(`td`, { children: e.exam.signUpStartDate }),
                        ],
                    }),
                    n(`tr`, {
                        children: [
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `报名截止日期：` }),
                            t(`td`, { children: e.exam.signUpEndDate }),
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `补充材料截止日期：` }),
                            t(`td`, { children: e.exam.supplementEndDate }),
                        ],
                    }),
                    n(`tr`, {
                        children: [
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `考试日期：` }),
                            t(`td`, { children: e.exam.examDate }),
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `最多参考人数：` }),
                            t(`td`, { children: e.exam.maxNum }),
                        ],
                    }),
                    n(`tr`, {
                        children: [
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `联系方式：` }),
                            t(`td`, { children: e.exam.telephone }),
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `考试方式：` }),
                            t(`td`, { children: e.exam.mode === 0 ? `机上考试` : `纸上考试` }),
                        ],
                    }),
                    n(`tr`, {
                        children: [
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `考试类型：` }),
                            n(`td`, { children: [e.exam.type, `类`] }),
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `考试地点：` }),
                            t(`td`, { children: e.exam.examArea }),
                        ],
                    }),
                    n(`tr`, {
                        children: [
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `电子邮箱：` }),
                            t(`td`, { children: e.exam.email }),
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `备注：` }),
                            t(`td`, { children: e.exam.remarks }),
                        ],
                    }),
                    n(`tr`, {
                        children: [
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;`, children: `微信群二维码：` }),
                            t(`td`, { children: t(`img`, { src: e.exam.weixin, style: `width: auto;height: 100px;` }) }),
                            t(`th`, { style: `width: 15%;padding: 12px 0;text-align: right;font-weight: normal;background-color: #f3f8ff;` }),
                            t(`td`, {}),
                        ],
                    }),
                ],
            }),
            t(`div`, { class: `content`, id: `detail_content`, children: e.content ? i(e.content) : null }),
        ],
    });
export { a as route };
