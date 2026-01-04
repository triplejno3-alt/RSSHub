import{t as e}from"./md5-DQN6cWFb.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{t as i}from"./types-Bl_lnefZ.mjs";const a={path:`/gerenzhongxin/trpl/:uid`,categories:[`finance`],view:i.Articles,example:`/eastmoney/gerenzhongxin/trpl/2922094262312522`,parameters:{uid:`用户id,即用户主页网址末尾的数字`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`guba.eastmoney.com`]},{source:[`caifuhao.eastmoney.com`]},{source:[`i.eastmoney.com/:uid`],target:`/gerenzhongxin/trpl/:uid`}],name:`个人中心评论`,maintainers:[`AwesomeDog`],handler:o};async function o(i){let a=i.req.param(`uid`),o=(await n(`https://i.eastmoney.com/api/guba/myreply?pageindex=1&uid=${a}&checkauth=true`)).data.result.list,s=o[0].reply_user.user_nickname,c=o.map(n=>{let i=`https://guba.eastmoney.com/news,${n.reply_guba.stockbar_code},${n.source_post_id}.html#allReplyList`,a=`
        <p>${n.source_post_title}</p>
        <hr/>
        <br/>
        <blockquote cite="${i}">
          <p>${n.reply_text}</p>
        </blockquote>
        <p style="text-align:right;">—— 评论者：<cite>${n.reply_user.user_nickname}</cite></p>
        `,o=`guid-`+e(n.reply_text)+`-${n.source_post_id}`;return{title:n.post_title||`${s} 发布了评论: ${a}`,description:a,pubDate:r(t(n.reply_publish_time),8),link:i,guid:o,author:n.reply_user.user_nickname}});return{title:`${s} 的东财评论`,link:`https://i.eastmoney.com/${a}#trpl`,image:`https://avator.eastmoney.com/qface/${a}/360`,item:c}}export{a as n,o as t};