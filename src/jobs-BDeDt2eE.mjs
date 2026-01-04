import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./types-Bl_lnefZ.mjs";import{a as r,d as i,f as a,i as o,l as s,n as c,o as l,r as u,u as d}from"./utils-Bk8Ks1dv.mjs";const f={path:`/jobs/:job_types/:exp_levels/:keywords?/:routeParams?`,categories:[`social-media`],view:n.Notifications,example:`/linkedin/jobs/C-P/1/software engineer`,parameters:{job_types:`See the following table for details, use '-' as delimiter`,exp_levels:`See the following table for details, use '-' as delimiter`,keywords:`keywords`,routeParams:`additional query parameters, see the table below`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.linkedin.com/jobs/search`],target:(e,t)=>{let n=new URLSearchParams(new URL(t).search),r=a(n.get(`f_JT`)),i=a(n.get(`f_E`)),o=encodeURIComponent(n.get(`keywords`)||``),s=new URLSearchParams;for(let[e,t]of n.entries())[`f_JT`,`f_E`,`keywords`].includes(e)||s.append(e,t);return`/linkedin/jobs/${r}/${i}/${o}/?${s.toString()}`}}],name:`Jobs`,maintainers:[`BrandNewLifeJackie26`,`zhoukuncheng`],handler:p,description:`#### \`job_types\` list

| Full Time | Part Time | Contractor | All |
| --------- | --------- | ---------- | --- |
| F         | P         | C          | all |

#### \`exp_levels\` list

| Intership | Entry Level | Associate | Mid-Senior Level | Director | All |
| --------- | ----------- | --------- | ---------------- | -------- | --- |
| 1         | 2           | 3         | 4                | 5        | all |

#### \`routeParams\` additional query parameters

##### \`f_WT\` list

| Onsite | Remote | Hybrid |
| ------ | ------- | ------ |
|    1   |    2    |   3    |

##### \`geoId\`

  Geographic location ID. You can find this ID in the URL of a LinkedIn job search page that is filtered by location.

  For example:
  91000012 is the ID of East Asia.

##### \`f_TPR\`

  Time posted range. Here are some possible values:

  *   \`r86400\`: Past 24 hours
  *   \`r604800\`: Past week
  *   \`r2592000\`: Past month

  For example:

  1.  If we want to search software engineer jobs of all levels and all job types, use \`/linkedin/jobs/all/all/software engineer\`
  2.  If we want to search all entry level contractor/part time software engineer jobs, use \`/linkedin/jobs/P-C/2/software engineer\`
  3.  If we want to search remote mid-senior level software engineer jobs in APAC posted within the last month, use \`/linkedin/jobs/F/4/software%20engineer/f_WT=2&geoId=91000003&f_TPR=r2592000\`

  **To make it easier, the recommended way is to start a search on [LinkedIn](https://www.linkedin.com/jobs/search) and use [RSSHub Radar](https://github.com/DIYgod/RSSHub-Radar) to load the specific feed.**`};async function p(n){let a=d(n.req.param(`job_types`),o),f=d(n.req.param(`exp_levels`),c),p=new URLSearchParams(n.req.param(`routeParams`)),m=new URL(`/jobs-guest/jobs/api/seeMoreJobPostings/search`,`https://www.linkedin.com/`);m.searchParams.append(l,n.req.param(`keywords`)||``),m.searchParams.append(r,a),m.searchParams.append(u,f);for(let[e,t]of p)m.searchParams.has(e)||m.searchParams.append(e,t);m=m.toString();let h=s(await e(m)),g=i(n.req.param(`job_types`),o),_=i(n.req.param(`exp_levels`),c);return{title:`LinkedIn Job Listing`+(g?` | Job Types: ${g}`:``)+(_?` | Experience Levels: ${_}`:``)+(n.req.param(`keywords`)?` | Keywords: ${n.req.param(`keywords`)}`:``),link:m,description:`This feed gets LinkedIn job posts`,item:h.map(e=>({title:`${e.company} is hiring ${e.title}`,description:`Title: ${e.title} | Company: ${e.company} | Location: ${e.location} `,pubDate:t(e.pubDate),link:e.link}))}}export{f as route};