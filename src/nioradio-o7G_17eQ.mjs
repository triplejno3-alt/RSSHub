import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{URLSearchParams as n}from"node:url";const r={path:`/nioradio/:albumid`,categories:[`multimedia`],description:`
::: tip
**如何获取电台 ID？**
打开蔚来 APP 后，点击“此地”→“NIO Radio”，找到自己想要转换为播客的专辑，分享后在生成的链接中找到\`container_id=\`后方的数字即可。
常见电台 ID：
| 电台名称          | 电台 ID |
| :------------ | :---- |
| 资讯充电站（早间版）    | 5     |
| 资讯充电站（晚间版）    | 23    |
| E 次元财经报       | 148   |
| 塞萌不塞车         | 661   |
| 乐行记           | 11    |
| Weekend Dance | 547   |
:::`,example:`/nio/nioradio/5`,parameters:{albumid:`电台专辑 ID`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!0,supportScihub:!1},name:`NIO Radio`,maintainers:[`marcosteam`],handler:async r=>{let{albumid:i}=r.req.param(),a=(await e(`https://gateway-front-external.nio.com/moat/100914/v2/audio/list`,{method:`POST`,body:new n({albumId:i,sorttype:`2`,pagenum:`1`,pagesize:`10`}).toString(),headers:{"Content-Type":`application/x-www-form-urlencoded`}})).result.dataList,o=a[0].albumName,s=a[0].albumPic,c=a.map(e=>({title:e.audioName,link:`https://app.nio.com/app/radio/share/?item_type=1&item_id=${String(e.audioId).slice(1)}&container_id=${i}`,pubDate:t(e.onlineTime),description:e.albumDesc,author:e.host.join(`, `),itunes_item_image:e.albumPic,itunes_duration:e.duration/1e3,enclosure_url:e.aacPlayUrl192,enclosure_length:e.aacFileSize192,enclosure_type:`audio/x-m4a`}));return{title:`NIO Radio - ${o}`,link:`https://www.nio.com`,itunes_author:a[0].host.join(`, `),image:s,item:c}}};export{r as route};