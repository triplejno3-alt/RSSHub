import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{t as n}from"./timezone-CrV-DT8S.mjs";import{load as r}from"cheerio";const i=async i=>{let a=`http://due.hitsz.edu.cn`,o={teaching:[`jwxw/jwgl`,`jwxw/kwgl`,`jwxw/zcgl`,`jwxw/xkgl`,`jwxw/cjgl`],studentStatus:[`jwxw/xjgl_b_`,`jwxw/xjgl_y_`],teachingSupport:[`jwxw/jxxxh`,`jwxw/jzxj`],education:[`xwgl/bksxw`,`xwgl/ssxwpy/ktyzj`,`xwgl/bsxwpy/qqhj1`]},{type:s=`all`}=i.req.param(),c=Object.keys(o).includes(s)?s:`all`,l=c===`all`?Object.values(o).flat():o[c],u=l.map(async e=>{let n=new URL(`${e}.htm`,a).href;try{return await t(n)}catch{return null}});return{title:`哈尔滨工业大学（深圳）教务部-教务学务与学位管理-所有栏目新闻汇总`,description:`哈尔滨工业大学（深圳）教务部中教务学务和学位管理所有栏目的最新新闻汇总，包括教务管理、考务管理、注册管理、选课管理、成绩管理、学籍管理、教学信息化、奖助学金、本科生新闻、硕士学位培养、博士学位培养等`,link:`http://due.hitsz.edu.cn/jwxw/jwgl.htm`,item:(await Promise.all(u)).flatMap((t,i)=>{if(!t)return[];let o=l[i],s=r(t.data);return s(`ul.box-main-list li, .list-main li, .list-main-modular li`).toArray().map(t=>{let r=s(t),i=r.find(`a`).attr(`href`);if(!i)return null;let c=r.find(`span`).text().trim(),l=r.find(`label`).text().trim();return{title:c,link:new URL(i,a).href,pubDate:l?n(e(l),8):null,category:o,description:c}}).filter(Boolean)}).filter(Boolean).filter(e=>!e.title.includes(`统一身份认证平台`)),author:`哈尔滨工业大学（深圳）教务部`}},a={path:`/due/general/:type?`,name:`教务部教务学务与学位管理所有栏目`,url:`due.hitsz.edu.cn`,maintainers:[`guohuiyuan`],handler:i,example:`/hitsz/due/general`,parameters:{type:{description:`栏目类型筛选，默认all（所有栏目）`,options:[{value:`all`,label:`所有栏目`},{value:`teaching`,label:`教务核心业务`},{value:`studentStatus`,label:`学籍相关`},{value:`teachingSupport`,label:`教学支持`},{value:`education`,label:`学生培养`}],default:`all`}},description:`哈尔滨工业大学（深圳）教务部中教务学务和学位管理所有栏目的最新新闻汇总。

#### 栏目分组说明
支持按业务类型筛选，使用路径参数指定分组：
- \`type=teaching\` - 教务核心业务：教务管理、考务管理、注册管理、选课管理、成绩管理
- \`type=studentStatus\` - 学籍相关：本科生学籍管理、研究生学籍管理
- \`type=teachingSupport\` - 教学支持：教学信息化、奖助学金
- \`type=education\` - 学生培养：本科生新闻、硕士学位培养、博士学位培养
- \`type=all\` 或省略 - 所有栏目（默认）

#### 包含栏目：
- [教务管理](http://due.hitsz.edu.cn/jwxw/jwgl.htm)
- [考务管理](http://due.hitsz.edu.cn/jwxw/kwgl.htm)
- [注册管理](http://due.hitsz.edu.cn/jwxw/zcgl.htm)
- [选课管理](http://due.hitsz.edu.cn/jwxw/xkgl.htm)
- [成绩管理](http://due.hitsz.edu.cn/jwxw/cjgl.htm)
- [学籍管理（本）](http://due.hitsz.edu.cn/jwxw/xjgl_b_.htm)
- [学籍管理（研）](http://due.hitsz.edu.cn/jwxw/xjgl_y_.htm)
- [教学信息化](http://due.hitsz.edu.cn/jwxw/jxxxh.htm)
- [奖助学金](http://due.hitsz.edu.cn/jwxw/jzxj.htm)
- [本科生新闻](http://due.hitsz.edu.cn/xwgl/bksxw.htm)
- [硕士学位培养](http://due.hitsz.edu.cn/xwgl/ssxwpy/ktyzj.htm)
- [博士学位培养](http://due.hitsz.edu.cn/xwgl/bsxwpy/qqhj1.htm)`,categories:[`university`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`due.hitsz.edu.cn/jwxw/jwgl.htm`],target:`/hitsz/due/general`}]};export{i as handler,a as route};