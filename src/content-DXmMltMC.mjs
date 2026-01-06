import { Fragment as e, jsx as t } from 'hono/jsx/jsx-runtime';
import { renderToString as n } from 'hono/jsx/dom/server';
const r = (e) => ({
        operationName: `ViewForum`,
        query: `query ViewForum($fid: Int!, $page: Int, $action: String) {  forum(fid: $fid) {    name  }  forumCount(fid: $fid) {    info  }  hots: threadsFragment(fid: $fid, type: "hot") {    tid    title  }  threads(fid: $fid, action: $action, page: $page) {    ...threadComponent  }}fragment threadComponent on Thread {  tid  title}`,
        variables: { fid: Number.parseInt(e) },
    }),
    i = (e, t) => ({
        operationName: `ViewThread`,
        query: `query ViewThread($tid: Int!, $page: Int, $pid: String, $authorid: Int) {  thread(tid: $tid, authorid: $authorid, pid: $pid) {    ...threadComponent  }  ...repliesComponent}fragment threadComponent on Thread {  tid  title  dateline  author {    name  }  replies  tags {    name  }}fragment repliesComponent on Query {  posts(tid: $tid, page: $page, pid: $pid, authorid: $authorid) {    lou    pid    content    quote {      author {        name      }      pid      content    }    dateline    user {      name    }  }}`,
        variables: { tid: Number.parseInt(e), page: t },
    }),
    a = (e) => ({ operationName: `ViewThread`, query: `query ViewThread($tid: Int!){thread(tid: $tid){...threadComponent}}fragment threadComponent on Thread{replies}`, variables: { tid: Number.parseInt(e) } }),
    o = ({ content: n }) =>
        t(e, {
            children: n?.map((e) =>
                e.type === `paragraph`
                    ? t(`p`, {
                          children: e.children?.map((e) =>
                              e.text
                                  ? t(`span`, { style: e.color ? `color: ${e.color}` : void 0, children: e.bold ? t(`strong`, { children: e.text }) : e.text })
                                  : e.type === `emotion`
                                    ? t(`img`, { src: `https://image.lkong.com/bq/em${e.id}.gif` })
                                    : null
                          ),
                      })
                    : null
            ),
        }),
    s = (e) => n(t(o, { content: e }));
export { i, a as n, r, s as t };
