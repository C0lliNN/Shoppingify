(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{448:function(n,e,t){"use strict";t.r(e),t.d(e,"default",(function(){return Y}));var a=t(6),r=t.n(a),c=t(10),i=t(11),o=t(251),u=t.n(o),s=t(0),l=t.n(s),p=t(8),f=t(45),d=t(27),m=t(15),b=t(2),g=t(3),h=t(1);function x(){var n=Object(b.a)(["\n  border: 1px solid ",";\n  border-radius: 6px;\n  color: ",";\n  padding: 3px 5px;\n  margin: auto 15px;\n"]);return x=function(){return n},n}function v(){var n=Object(b.a)(["\n  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);\n  border-radius: 12px;\n  padding: 20px;\n  margin: 12px auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  & h3 {\n    font-size: ",";\n    font-weight: 700;\n  }\n\n  & .date {\n    color: #c1c1c4;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    font-weight: 500;\n    font-size: ",";\n    & .icon {\n      margin-right: 10px;\n    }\n  }\n\n  & .right {\n    cursor: pointer;\n    background-color: transparent;\n    border: none;\n    outline: none;\n    & span {\n      color: #f9a109;\n      font-size: ",";\n    }\n  }\n"]);return v=function(){return n},n}function E(){var n=Object(b.a)(["\n  font-size: ",";\n  font-family: ",";\n  font-weight: 600;\n  margin-top: 50px;\n"]);return E=function(){return n},n}function j(){var n=Object(b.a)(["\n  margin: 0;\n  margin-top: 40px;\n"]);return j=function(){return n},n}function O(){var n=Object(b.a)(["\n  font-size: ",";\n  font-weight: 700;\n\n  @media (min-width: ","px) {\n    font-size: 32px;\n  }\n"]);return O=function(){return n},n}function w(){var n=Object(b.a)(["\n  padding: 20px 40px;\n"]);return w=function(){return n},n}var y=g.a.section(w()),k=g.a.h3(O(),h.i,h.l),_=g.a.ul(j()),z=g.a.p(E(),h.h,h.e),C=g.a.li(v(),h.g,h.f,h.h),N=g.a.span(x(),(function(n){return n.canceled?"#EB5757":"#56CCF2"}),(function(n){return n.canceled?"#EB5757":"#56CCF2"}));function Y(){var n=Object(s.useState)([]),e=Object(i.a)(n,2),t=e[0],a=e[1],o=Object(s.useState)(!0),b=Object(i.a)(o,2),g=b[0],h=b[1],x=Object(s.useState)(),v=Object(i.a)(x,2),E=v[0],j=v[1],O=Object(p.g)();function w(){return(w=Object(c.a)(r.a.mark((function n(){var e,t,c,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m.a.get("/lists");case 3:e=n.sent,t=e.data,c=t.map((function(n){var e=u()(n.updated).format("MMM DD.M.YYYY");return{_id:n._id,name:n.name,date:e,status:n.status}})),a(c),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),i=n.t0.response?n.t0.response.data.message:n.t0.message,j(i);case 13:return n.prev=13,h(!1),n.finish(13);case 16:case"end":return n.stop()}}),n,null,[[0,9,13,16]])})))).apply(this,arguments)}Object(s.useEffect)((function(){!function(){w.apply(this,arguments)}()}),[]);var Y=null;return Y=g?l.a.createElement(d.a,null):E?l.a.createElement(f.a,{message:E}):t.length?l.a.createElement(_,null,t.map((function(n){return l.a.createElement(C,{key:n._id},l.a.createElement("h3",null,n.name),l.a.createElement("div",null,l.a.createElement("div",{className:"date"},l.a.createElement("span",{className:"material-icons-round icon"},"event_note"),l.a.createElement("span",null,n.date),l.a.createElement(N,{canceled:"canceled"===n.status},n.status),l.a.createElement("button",{className:"right",onClick:function(){return e=n._id,void O.push("/history/".concat(e));var e}},l.a.createElement("span",{className:"material-icons-round"},"arrow_forward_ios")))))}))):l.a.createElement(z,null,"No Items Yet"),l.a.createElement(y,null,l.a.createElement(k,null,"Shopping History"),Y)}}}]);
//# sourceMappingURL=9.632abe32.chunk.js.map