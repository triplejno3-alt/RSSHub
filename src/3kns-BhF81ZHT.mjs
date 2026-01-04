import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{Fragment as n,jsx as r,jsxs as i}from"hono/jsx/jsx-runtime";import{load as a}from"cheerio";import{renderToString as o}from"hono/jsx/dom/server";const s={path:`/:filters?/:order?`,categories:[`game`],example:`/3kns/category=all&lang=all`,parameters:{filters:`过滤器，可用参数见下表`,order:`排序，按高分排序:desc;按低分排序:asc`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`3k-Switch游戏库`,maintainers:[`xzzpig`],handler:c,url:`www.3kns.com/`,description:`游戏类型(category)

| 不限 | 角色扮演 | 动作冒险 | 策略游戏 | 模拟经营 | 即时战略 | 格斗类 | 射击游戏 | 休闲益智 | 体育运动 | 街机格斗 | 无双类 | 其他游戏 | 赛车竞速 |
| ---- | -------- | -------- | -------- | -------- | -------- | ------ | -------- | -------- | -------- | -------- | ------ | -------- | -------- |
| all  | 1        | 2        | 3        | 4        | 5        | 6      | 7        | 8        | 9        | 10       | 11     | 12       | 13       |

  游戏语言(language)

| 不限 | 中文 | 英语 | 日语 | 其他 | 中文汉化 | 德语 |
| ---- | ---- | ---- | ---- | ---- | -------- | ---- |
| all  | 1    | 2    | 3    | 4    | 5        | 6    |

  游戏标签(tag)

| 不限 | 热门 | 多人聚会 | 僵尸 | 体感 | 大作 | 音乐 | 三国 | RPG | 格斗 | 闯关 | 横版 | 科幻 | 棋牌 | 运输 | 无双 | 卡通动漫 | 日系 | 养成 | 恐怖 | 运动 | 乙女 | 街机 | 飞行模拟 | 解谜 | 海战 | 战争 | 跑酷 | 即时策略 | 射击 | 经营 | 益智 | 沙盒 | 模拟 | 冒险 | 竞速 | 休闲 | 动作 | 生存 | 独立 | 拼图 | 魔改 xci | 卡牌 | 塔防 |
| ---- | ---- | -------- | ---- | ---- | ---- | ---- | ---- | --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | -------- | ---- | ---- | ---- | ---- | ---- | ---- | -------- | ---- | ---- | ---- | ---- | -------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | -------- | ---- | ---- |
| all  | 1    | 2        | 3    | 4    | 5    | 6    | 7    | 8   | 9    | 10   | 11   | 12   | 13   | 14   | 15   | 16       | 17   | 18   | 19   | 20   | 21   | 22   | 23       | 24   | 25   | 26   | 27   | 28       | 29   | 30   | 31   | 32   | 33   | 34   | 35   | 36   | 37   | 38   | 39   | 40   | 41       | 42   | 43   |

  发售时间(pubDate)

| 不限 | 2017 年 | 2018 年 | 2019 年 | 2020 年 | 2021 年 | 2022 年 | 2023 年 | 2024 年 |
| ---- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| all  | 1       | 2       | 3       | 4       | 5       | 6       | 7       | 8       |

  游戏集合(collection)

| 不限 | 舞力全开 | 马里奥 | 生化危机 | 炼金工房 | 最终幻想 | 塞尔达 | 宝可梦 | 勇者斗恶龙 | 模拟器 | 秋之回忆 | 第一方 | 体感健身 | 开放世界 | 儿童乐园 |
| ---- | -------- | ------ | -------- | -------- | -------- | ------ | ------ | ---------- | ------ | -------- | ------ | -------- | -------- | -------- |
| all  | 1        | 2      | 3        | 4        | 5        | 6      | 7      | 8          | 9      | 10       | 11     | 12       | 13       | 14       |`};async function c(n){let i=new URLSearchParams(n.req.param(`filters`)),s=n.req.param(`order`),c=i.get(`category`)??`all`,u=i.get(`language`)??`all`,d=i.get(`tag`)??`all`,f=i.get(`pubDate`)??`all`,p=i.get(`collection`)??`all`,m=`https://www.3kns.com/`,h=new URL(`${m}forum.php?mod=forumdisplay&fid=2&filter=sortid&typeid=0&sortid=1&searchsort=1&orderbystr=0`);h.searchParams.set(`dztgeshi`,c),h.searchParams.set(`dztfenlei`,u),h.searchParams.set(`nex_sg_tags`,d),h.searchParams.set(`deanbgbs`,f),h.searchParams.set(`nex_sg_stars`,p),s!==void 0&&(h.searchParams.set(`ascdescstr`,s),h.searchParams.set(`orderbystr`,`nex_sg_score`));let g=a((await t(h)).data),_=g(`form .newItem`).toArray().map(t=>{let n=g(t),i=n.find(`.showname a`).text().trim(),a=n.find(`.showtype`).text().trim(),s=n.find(`.showdate`).contents()[0].data.trim();return{title:i,link:m+n.find(`.entry-media a`).attr(`href`),pubDate:e(s??``),category:[a],description:o(r(l,{cover:n.find(`.entry-media img`).attr(`src`)?.trim().replace(`.`,m),title:i,tid:n.find(`.jb-chakan`).text().trim(),category:a,language:n.find(`.jb-new`).text().trim(),pubDate:s,system:n.find(`.jb-youxxx`).text().trim(),score:n.find(`.shownamep`).text().trim(),version:n.find(`.jb-youxbb`).text().trim()}))??``}});return{title:g(`title`).text(),link:h.toString(),allowEmpty:!0,item:_}}const l=({cover:e,title:t,tid:a,category:o,language:s,pubDate:c,system:l,score:u,version:d})=>i(n,{children:[r(`img`,{src:e}),r(`h1`,{children:t}),i(`p`,{children:[`游戏TID：`,a]}),i(`p`,{children:[`类型：`,o]}),i(`p`,{children:[`语言：`,s]}),i(`p`,{children:[`更新日期：`,c]}),i(`p`,{children:[`系统要求：`,l]}),r(`p`,{children:u}),i(`p`,{children:[`游戏版本：`,d]})]});export{s as route};