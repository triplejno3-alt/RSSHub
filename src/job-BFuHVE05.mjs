import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = { RecruitList: `专场招聘会`, Doublechoice: `校园双选会`, Broadcast: `空中宣讲`, joblist2: `招聘公告` },
    i = {
        path: `/job/:category?`,
        categories: [`university`],
        example: `/ustc/job`,
        parameters: { category: `分类，见下表，默认为招聘公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`job.ustc.edu.cn/`], target: `/job` }],
        name: `就业信息网`,
        maintainers: [`nczitzk`],
        handler: a,
        url: `job.ustc.edu.cn/`,
        description: `| 专场招聘会  | 校园双选会   | 空中宣讲  | 招聘公告 |
| ----------- | ------------ | --------- | -------- |
| RecruitList | Doublechoice | Broadcast | joblist2 |`,
    };
async function a(i) {
    let a = i.req.param(`category`) ?? `joblist2`,
        o = 0.01234567890123456,
        s = `http://ustc.ahbys.com`,
        c = `http://www.job.ustc.edu.cn`,
        l = `${c}/${a}.html`,
        u = (
            await n({
                method: (() => {
                    switch (a) {
                        case `RecruitList`:
                        case `Broadcast`:
                        case `joblist2`:
                            return `get`;
                        case `Doublechoice`:
                            return `post`;
                    }
                })(),
                url: (() => {
                    switch (a) {
                        case `RecruitList`:
                            return `${s}/API/Web/index10358.ashx?rd=${o}&pagesize=20&pageindex=1&action=bookinglist&kind=13&keyword=`;
                        case `Doublechoice`:
                            return `${s}/API/Web/index10358.ashx?rd=${o}`;
                        case `Broadcast`:
                            return `${s}/API/Web/index10358.ashx?rd=${o}&pagesize=20&pageindex=1&action=bookinglist2&kind=2`;
                        case `joblist2`:
                            return `${s}/API/Web/index10358.ashx?action=joblist2&pagesize=50&pageindex=1&rand=${o}&keyword=`;
                    }
                })(),
                form: (() => {
                    switch (a) {
                        case `RecruitList`:
                        case `Broadcast`:
                        case `joblist2`:
                            return {};
                        case `Doublechoice`:
                            return { pagesize: 15, pageindex: 1, action: `recruitlist`, rand: o };
                    }
                })(),
                allowGetBody: !0,
            })
        ).data.data
            .slice(0, 10)
            .map((e) => {
                switch (a) {
                    case `RecruitList`:
                        return { title: e.ID, pubDate: t(e.HoldDate), link: `${c}/Recruit.html?id=${e.ID}` };
                    case `Doublechoice`:
                        return { ID: e.ID, title: e.Theme, pubDate: t(e.HoldDate), link: `${c}/R2.html?id=${e.ID}` };
                    case `Broadcast`:
                        return { title: e.ID, pubDate: t(e.HoldDate), link: `${c}/R2.html?id=${e.ID}` };
                    case `joblist2`:
                        return { title: e.JID, pubDate: t(e.UpdateDate), link: `${c}/Job2.html?jid=${e.JID}&cid=${e.CompanyID}` };
                    default:
                        return {};
                }
            }),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = await n({
                        method: (() => {
                            switch (a) {
                                case `RecruitList`:
                                case `Broadcast`:
                                case `joblist2`:
                                    return `get`;
                                case `Doublechoice`:
                                    return `post`;
                            }
                        })(),
                        url: (() => {
                            switch (a) {
                                case `RecruitList`:
                                    return `${s}/API/Web/index10358.ashx?rd=${o}&action=bookinginfo&rid=${t.title}&rand=${o}`;
                                case `Doublechoice`:
                                    return `${s}/API/Web/index10358.ashx`;
                                case `Broadcast`:
                                    return `${s}/API/Web/index10358.ashx?rd=${o}&action=binfo&rid=${t.title}&rand=${o}`;
                                case `joblist2`:
                                    return `${s}/API/Web/index10358.ashx?rd=${o}&action=jobinfo2&jid=${t.title}&rand=${o}`;
                            }
                        })(),
                        form: (() => {
                            switch (a) {
                                case `RecruitList`:
                                case `Broadcast`:
                                case `joblist2`:
                                    return {};
                                case `Doublechoice`:
                                    return { pagesize: 100, pageindex: 1, action: `recruitcompany`, rid: t.ID, rand: o };
                            }
                        })(),
                        allowGetBody: !0,
                    });
                    return (
                        (t.title = (() => {
                            switch (a) {
                                case `RecruitList`:
                                case `Broadcast`:
                                    return e.data.Theme;
                                case `Doublechoice`:
                                    return t.title;
                                case `joblist2`:
                                    return e.data.JobName;
                            }
                        })()),
                        (t.description = (() => {
                            switch (a) {
                                case `RecruitList`:
                                case `Broadcast`:
                                    return e.data.Description;
                                case `Doublechoice`: {
                                    let n = `<table><thead style="background-color: #f6f6ee"><tr><th style="white-space: nowrap;">单位名称</th><th style="white-space: nowrap;">展位号</th><th>职位信息</th></tr><tr></tr></thead><tbody>`;
                                    for (let r of e.data.CompanyList)
                                        n += `<tr><td style="white-space:nowrap"><a style="color:#004276;font-size:14px;"'+
                                    'href="${c}/Company.html?cid=${r.CompanyID}" target="_blank">${r.CompanyName}</a></td>'+
                                    '<td style="white-space:nowrap">${t.nPos}</td><td>${t.JobList}</td></tr>`;
                                    return `${n}</tbody></table>`;
                                }
                                case `joblist2`:
                                    return e.data.PostionDesc;
                            }
                        })()),
                        t
                    );
                })
            )
        );
    return { title: `${r[a]} - 中国科学技术大学就业信息网`, link: l, item: d };
}
export { i as route };
