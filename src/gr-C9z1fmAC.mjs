import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{load as r}from"cheerio";const i=`https://gr.xidian.edu.cn`,a={home_zxdt:{selector:{list:`.main-right-list ul li`},name:`主页-最新动态`,path:`/zxdt`},home_tzgg1:{selector:{list:`.main-right-list ul li`},name:`主页-通知公告`,path:`/tzgg1`},home_jzbg:{selector:{list:`.jzbg-list ul li`},name:`主页-讲座报告`,path:`/jzbg`},yyjs_jbqk:{name:`研院介绍-基本情况`,path:`/yyjs/jbqk`},yyjs_jbqk1:{name:`研院介绍-机构设置`,path:`/yyjs/jbqk1`},yyjs_jbqk2:{name:`研院介绍-部门领导`,path:`/yyjs/jbqk2`},yyjs_jbqk3:{selector:{list:`.main-right-list ul li`},name:`研院介绍-服务指南`,path:`/yyjs/jbqk3`},yyjs_jbqk4:{name:`研院介绍-学院联系方式`,path:`/yyjs/jbqk4`},yjsy:{selector:{list:`.main-right-list ul li`},name:`招生信息`,path:`/yjsy`},yjsy_yjszs:{selector:{list:`.main-right-list ul li`},name:`招生信息-硕士研究生招生`,path:`/yjsy/yjszs`},yjsy_bsyjszs:{selector:{list:`.main-right-list ul li`},name:`招生信息-博士研究生招生`,path:`/yjsy/bsyjszs`},yjsy_qtlxzs:{selector:{list:`.main-right-list ul li`},name:`招生信息-其他类型招生`,path:`/yjsy/qtlxzs`},pygl:{selector:{list:`.main-right-list ul li`},name:`培养管理`,path:`/pygl`},pygl_xsxw:{selector:{list:`.main-right-list ul li`},name:`培养管理-学术学位`,path:`pygl/pyfa1/xsxw1`},pygl_zyxw:{selector:{list:`.main-right-list ul li`},name:`培养管理-专业学位`,path:`/pygl/pyfa1/zyxw1`},pygl_jxgl:{selector:{list:`.main-right-list ul li`},name:`培养管理-教学管理`,path:`/pygl/jxgl`},pygl_jxgl1:{selector:{list:`.main-right-list ul li`},name:`培养管理-课程建设`,path:`/pygl/jxgl1`},pygl_jxgl2:{selector:{list:`.main-right-list ul li`},name:`培养管理-管理规定`,path:`/pygl/jxgl2`},pygl_jxgl3:{selector:{list:`.main-right-list ul li`},name:`培养管理-国际交流`,path:`/pygl/jxgl3`},pygl_bslc:{selector:{list:`.main-right-list ul li`},name:`培养管理-办事流程`,path:`/pygl/bslc`},xwsy:{selector:{list:`.main-right-list ul li`},name:`学位授予`,path:`/xwsy`},xwsy_tzgg:{selector:{list:`.main-right-list ul li`},name:`学位授予-通知公告`,path:`/xwsy/tzgg`},xwsy_gzzd:{selector:{list:`.main-right-list ul li`},name:`学位授予-规章制度`,path:`/xwsy/gzzd`},xwsy_swmd:{selector:{list:`.main-right-list ul li`},name:`学位授予-授位名单`,path:`/xwsy/swmd`},xwsy_zlxz:{selector:{list:`.main-right-list ul li`},name:`学位授予-资料下载`,path:`/xwsy/zlxz`}},o={path:`/gr/:category?`,categories:[`university`],example:`/xidian/gr/home_tzgg1`,parameters:{category:`通知类别，默认为主页-通知公告`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`研究生院/卓越工程师学院`,url:`gr.xidian.edu.cn`,maintainers:[`ZiHao256`],handler:s,description:`| 文章来源          | 参数           |
| ------------- | ------------ |
| ✅主页-最新动态      | home_zxdt    |
| ✅主页-通知公告      | home_tzgg1   |
| ✅主页-讲座报告      | home_jzbg    |
| ✅研院介绍-基本情况    | yyjs_jbqk    |
| ✅研院介绍-机构设置    | yyjs_jbqk1   |
| ✅研院介绍-部门领导    | yyjs_jbqk2   |
| ✅研院介绍-服务指南    | yyjs_jbqk3   |
| ✅研院介绍-学院联系方式  | yyjs_jbqk4   |
| ✅招生信息         | yjsy         |
| ✅招生信息-硕士研究生招生 | yjsy_yjszs   |
| ✅招生信息-博士研究生招生 | yjsy_bsyjszs |
| ✅招生信息-其他类型招生  | yjsy_qtlxzs  |
| ✅培养管理         | pygl         |
| ✅培养管理-学术学位    | pygl_xsxw    |
| ✅培养管理-专业学位    | pygl_zyxw    |
| ✅培养管理-教学管理    | pygl_jxgl    |
| ✅培养管理-课程建设    | pygl_jxgl1   |
| ✅培养管理-管理规定    | pygl_jxgl2   |
| ✅培养管理-国际交流    | pygl_jxgl3   |
| ✅培养管理-办事流程    | pygl_bslc    |
| ✅学位授予         | xwsy         |
| ✅学位授予-通知公告    | xwsy_tzgg    |
| ✅学位授予-规章制度    | xwsy_gzzd    |
| ✅学位授予-授位名单    | xwsy_swmd    |
| ✅学位授予-资料下载    | xwsy_zlxz    |`,radar:[{source:[`gr.xidian.edu.cn/`]}]};async function s(o){let{category:s=`home_tzgg1`}=o.req.param(),c=`${i}/${a[s].path}.htm`,l=r((await n(c,{headers:{referer:i},https:{rejectUnauthorized:!1}})).data);if(s===`yyjs_jbqk`||s===`yyjs_jbqk1`||s===`yyjs_jbqk2`||s===`yyjs_jbqk4`)return{title:l(`.right-bt-left`).text(),link:c,item:[{title:l(`.right-bt-left`).text(),link:c,description:l(`.main-right`).html()}]};{let o=l(a[s].selector.list).toArray().map(e=>(e=l(e),{title:e.find(`a`).text(),link:new URL(e.find(`a`).attr(`href`),i).href,pubDate:t(e.find(`span`).text())}));return o=await Promise.all(o.map(t=>e.tryGet(t.link,async()=>{let e=r((await n(t.link,{headers:{referer:c},https:{rejectUnauthorized:!1}})).data);return e(`.content-sxt`).remove(),t.description=e(`[name="_newscontent_fromname"]`).html(),t}))),{title:l(`title`).text(),link:c,item:o}}}export{o as route};