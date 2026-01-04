import"./ofetch-uhy-qh6X.mjs";import{t as e}from"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{t as n}from"./types-Bl_lnefZ.mjs";import{t as r}from"./config-not-found-DGyG6Tbz.mjs";const i={path:`/stars/:user/:repo`,categories:[`programming`],example:`/github/stars/DIYgod/RSSHub`,view:n.Notifications,parameters:{user:`GitHub username`,repo:`GitHub repo name`},features:{requireConfig:[{name:`GITHUB_ACCESS_TOKEN`,description:`GitHub Access Token`}]},radar:[{source:[`github.com/:user/:repo/stargazers`,`github.com/:user/:repo`]}],name:`Repo Stars`,maintainers:[`HenryQW`],handler:a};async function a(n){if(!e.github||!e.github.access_token)throw new r(`GitHub star RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);let i=n.req.param(`user`),a=n.req.param(`repo`),o=`https://github.com/${i}/${a}/stargazers`,s=(await t({method:`post`,url:`https://api.github.com/graphql`,headers:{Authorization:`bearer ${e.github.access_token}`},json:{query:`
            {
                repository(owner: "${i}", name: "${a}") {
                  stargazers(last: 10) {
                    edges {
                      node {
                        login
                        avatarUrl
                      }
                    }
                  }
                }
              }
            `}})).data.data.repository.stargazers.edges.toReversed();return{allowEmpty:!0,title:`${i}/${a}’s stargazers`,link:o,item:s.map(e=>({title:`${e.node.login} starred ${i}/${a}`,author:e.node.login,description:`<a href="https://github.com/${e.node.login}">${e.node.login}</a> <br> <img sytle="width:50px;" src='${e.node.avatarUrl}'>`,link:`https://github.com/${e.node.login}`}))}}export{i as route};