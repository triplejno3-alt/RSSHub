import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import{t}from"./logger-_vmdpChp.mjs";import{t as n}from"./cache-DLkCV5c7.mjs";import{t as r}from"./parse-date-DjdQS_Nt.mjs";import{Fragment as i,jsx as a,jsxs as o}from"hono/jsx/jsx-runtime";import{load as s}from"cheerio";import{renderToString as c}from"hono/jsx/dom/server";import{raw as l}from"hono/html";const u={path:`/`,categories:[`programming`],example:`/transformer-circuits`,parameters:{},radar:[{source:[`transformer-circuits.pub/`],target:`/`}],name:`Articles`,maintainers:[`shinmohuang`],handler:d};async function d(){let t=`https://transformer-circuits.pub`,i=s(await e(t)),a=i(`.toc a`).toArray().map(e=>{let a=i(e),o=a,s=a.prevAll(`.date`).first().text().trim();if(o.hasClass(`paper`)||o.hasClass(`note`)){let e=o.hasClass(`paper`)?`Paper`:`Note`,i=o.find(`h3`).text().trim(),a=``,c=o.find(`.byline`);c.length&&(a=c.text().trim());let l=o.find(`.description`).text().trim(),u=o.attr(`href`),d=u?u.startsWith(`http`)?u:`${t}/${u}`:t;return n.tryGet(d,async()=>{let t=await f(d);return{title:i,link:d,pubDate:r(s,`MMMM YYYY`),author:a,description:t||`${e}: ${l}`,category:[`AI`,`Machine Learning`,`Anthropic`,`Transformer Circuits`]}})}return null});return{title:`Transformer Circuits Thread`,link:t,item:(await Promise.all(a)).filter(Boolean),description:`Research on reverse engineering transformer language models into human-understandable programs`}}async function f(n){try{let r=s(await e(n));r(`.article-header, .tooltip, modal, script, style, d-front-matter, .visual-toc`).remove();let i=r(`d-article`).html();return i||(i=r(`main article, .article-content, .post-content, .content-area`).html()||r(`.content, .article, .post`).html()||r(`main`).html(),i||=(t.warn(`No suitable content container found for ${n}`),`<p>Could not extract content. Please visit <a href="${n}">the original page</a>.</p>`)),c(a(p,{content:i,link:n}))}catch(e){let r=e instanceof Error?e.message:String(e);return t.error(`Error fetching article content from ${n}: ${r}`),null}}const p=({content:e,link:t})=>o(i,{children:[a(`style`,{children:`
    .content-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #333;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    pre, code {
        background-color: #f5f5f5;
        border-radius: 3px;
        padding: 0.2em 0.4em;
        overflow-x: auto;
    }
    a {
        color: #0366d6;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    h1, h2, h3, h4, h5, h6 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
    }
    p, ul, ol {
        margin-bottom: 16px;
    }
    .read-original {
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
        padding: 10px;
        background-color: #f7f7f7;
        border-radius: 4px;
    }
    /* Support for custom elements used on transformer-circuits website */
    d-figure, figure {
        margin: 20px 0;
        text-align: center;
    }
    d-byline {
        font-size: 0.9em;
        color: #666;
        margin: 15px 0;
    }
    .gdoc-image img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
    }
`}),a(`div`,{class:`content-wrapper`,children:l(e)}),a(`div`,{class:`read-original`,children:a(`a`,{href:t,target:`_blank`,children:`Read Original`})})]});export{u as route};