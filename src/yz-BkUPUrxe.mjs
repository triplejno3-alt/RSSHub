import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{load as i}from"cheerio";const a=`http://yz.neu.edu.cn`,o=5792,s={download:o,master1:5932,master2:5933,phd1:5945,phd2:5946},c=async(s,c)=>await Promise.all(s.map(async s=>{let l=i(s),d=l(`span.Article_Title > a`),f=d.attr(`title`)??``,p=a+d.attr(`href`),m={title:f,link:p,description:``,pubDate:(()=>{let e=l(`span.Article_PublishDate`);return e.text()?r(t(e.text()),8):void 0})(),author:c===o?`研招办`:``};return c===o&&/\.(pdf|docx?|xlsx?|zip|rar|7z)$/i.test(p)?(m.description=`
                        <p>${f}</p><br/>
                        <a href="${p}">点击进入下载地址传送门～</a>
                    `,m):await e.tryGet(p,async()=>{let e=i((await n(p)).data);if(m.description=u(e),c!==o){let n=e(`.arti_update`).text().match(/(\d{4}-\d{2}-\d{2})/),i=n?n[1]:``,a=e(`.arti_publisher`).text().match(/[:：]?\s*(.+)/),o=a?a[1].trim():``;m.pubDate=r(t(i),8),m.author=o}return m})})),l=async e=>{let t=e.req.param(`type`);s[t]&&(t=s[t]);let r=(await n(`${a}/${t}/list.htm`)).data,o=i(r),l=o(`title`).text(),u=await c(o(`div.col_news_list ul.wp_article_list li`).toArray(),t);return{title:`${l}-东北大学研究生招生信息网`,description:l,link:a,item:u}},u=e=>{let t=e(`.entry`);return!t||t.length===0?``:(t.find(`span`).removeAttr(`style`).removeAttr(`class`),t.find(`div`).each((t,n)=>{let r=e(n).html();e(n).replaceWith(r)}),t.find(`p`).removeAttr(`style`).removeAttr(`class`),t.find(`a`).removeAttr(`style`).removeAttr(`class`),t.find(`td`).removeAttr(`bgcolor`),t.find(`img`).each((t,n)=>{let r=e(n).attr(`src`),i=e(n).attr(`alt`)||``;e(n).replaceWith(`<img src="${r}" alt="${i}" />`)}),t.find(`.wp_pdf_player`).each((t,n)=>{let r=a+e(n).attr(`pdfsrc`);e(n).replaceWith(`
            <p>点击进入文件传送门～：<a href="${r}">查看文件</a></p>
            `)}),t.find(`.wp_video_player`).each((t,n)=>{let r=e(n),i=r.attr(`sudy-wp-src`);if(i){let e=a+i,t=r.attr(`style`)?.match(/width:\s*(\d+)px/),n=t&&t[1]?t[1]:`600`,o=r.attr(`style`)?.match(/height:\s*(\d+)px/),s=`
                <video controls width="${n}" height="${o&&o[1]?o[1]:`400`}" style="max-width: 100%;margin-left: auto;margin-right: auto;">
                    <source src="${e}" type="video/mp4">
                    您的浏览器不支持 video 标签。
                </video>
            `;r.replaceWith(s)}}),t.html())},d={path:`/yz/:type`,categories:[`university`],example:`/neu/yz/master1`,parameters:{type:`分类id,见下表`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`yz.neu.edu.cn/:type/list.htm`],target:`/yz/:type`}],name:`研究生招生信息网`,url:`yz.neu.edu.cn`,maintainers:[`paintstar`],handler:l,description:`
| 分类名                     | 分类id      |
| ------------------------- | ---------- |
| 硕士公告                   | master1     |
| 硕士简章                   | master2     |
| 博士公告                   | phd1        |
| 博士简章                   | phd2        |
| 下载中心                   | download    |`};export{d as route};