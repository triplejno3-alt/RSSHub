import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{load as n}from"cheerio";import r from"dayjs";const i={path:`/zj/search/:websiteid?/:word/:cateid?`,categories:[`government`],example:`/gov/zj/search`,parameters:{websiteid:`搜索范围-全省、各市各区、详细信息点击源网站https://www.zj.gov.cn/请求中寻找`,word:`搜索关键词-默认：人才`,cateid:`信息分类-默认：658（全部）`,sortType:`排序类型-默认：2（按时间）`},radar:[{source:[`search.zj.gov.cn/jsearchfront/search.do`],target:`/zj/search/:websiteid?/:word/:cateid?`}],name:`浙江省人民政府-全省政府网站统一搜索`,url:`search.zj.gov.cn/jsearchfront/search.do`,maintainers:[`HaoyuLee`],description:`
| 行政区域         | websiteid |
| ------------ | -- |
| 宁波市本级     | 330201000000000  |

| 搜索关键词         | word    |

| 信息分类         | cateid    |

| 排序类型         | sortType    |
| ------------ | -- |
| 按相关度     | 1  |
| 按时间     | 2  |
    `,async handler(i){let{websiteid:a=`330201000000000`,word:o=`人才`,cateid:s=658,sortType:c=2}=i.req.param(),{data:{result:l}}=await t.post(`https://search.zj.gov.cn/jsearchfront/interfaces/cateSearch.do`,{form:{websiteid:a,pg:`30`,p:`1`,cateid:s,word:o,checkError:1,isContains:0,q:o,begin:r().subtract(1,`week`).format(`YYYYMMDD`),end:r().format(`YYYYMMDD`),timetype:2,pos:`title,content,keyword`,sortType:c}}),u=l?.map(t=>{let r=n(t),i=r(`.titleWrapper>a`),a=r(`.sourceTime>span`);return{title:i.text().trim()||``,link:i.attr(`href`)||``,pubDate:e(a.eq(1).text().trim().replace(`时间:`,``))||``,author:a.eq(0).text().trim().replace(`来源:`,``)||``,description:r(`.newsDescribe>a`).text()||``}})||[],d={};for(let e of u)d[e.link]||(d[e.link]=e);return{title:`浙江省人民政府-全省政府网站统一搜索`,link:`https://search.zj.gov.cn/jsearchfront/search.do`,item:Object.entries(d).map(([,e])=>e)}}};export{i as route};