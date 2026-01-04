import{t as e}from"./parse-date-DjdQS_Nt.mjs";const t=(e,t=``)=>{for(let n of e.content)switch(n.type){case`text`:t+=`<div>${n.content}</div>`;break;case`image`:t+=`<img src="${n.url.replaceAll(/_.+\.jpg/g,`.jpg`)}" />`;break;case`video`:try{t+=`<video
            controls="controls"
            width="${n.playlist.hd.width}"
            height="${n.playlist.hd.height}"
            poster="${n.cover_info.thumbnail}"
            src="${n.playlist.hd.play_url}"
          >`}catch{t+=`<video
                controls="controls"
                width="${n.playlist.pop().width}"
                height="${n.playlist.pop().height}"
                poster="${n.thumbnail}"
                src="${n.playlist.pop().play_url}"
              >`}break;case`link`:t+=`<div><a href="${n.url}">${n.title}</a><br><img src="${n.image_url}" /></div>`;break;default:t+=`未知类型，请点击<a href="https://github.com/DIYgod/RSSHub/issues">链接</a>提交issue`}return t},n=n=>n.map(n=>{let r=n.target??n,i=e(r.created*1e3),a=r.author.name,o=`${a}：${r.excerpt_title}`,s=`https://www.zhihu.com/pin/${r.id}`,c=t(r,`<a href="https://www.zhihu.com${r.author.url}">${a}</a>：`);if(r.origin_pin!==void 0){let e=r.origin_pin,n=`<a href="https://www.zhihu.com/pin/${e.id}">转发原文</a>：`,i=t(e,`<a href="https://www.zhihu.com${e.author.url}">${e.author.name}</a>：`);c=`${c} ${n} ${i}`}return{title:o,description:c,author:a,pubDate:i,link:s}});export{n as t};