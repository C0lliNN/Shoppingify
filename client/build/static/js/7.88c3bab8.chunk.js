(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{139:function(e,a,n){"use strict";n.d(a,"a",(function(){return t}));var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},449:function(e,a,n){"use strict";n.r(a);var t=n(6),r=n.n(t),l=n(10),s=n(0),i=n.n(s),o=n(17),m=n(13),u=n(8),c=n(139),d=n(9),p=n(12),h=n(27),v=n(2),g=n(3),f=n(1);function E(){var e=Object(v.a)(["\n  font-size: 12px;\n  font-weight: 600;\n  color: ",";\n  align-self: start;\n  display: block;\n  margin-top: 8px;\n"]);return E=function(){return e},e}function w(){var e=Object(v.a)(["\n  text-align: center;\n  margin-top: 50px;\n"]);return w=function(){return e},e}function b(){var e=Object(v.a)(["\n  margin-top: 50px;\n"]);return b=function(){return e},e}var y=g.a.form(b()),T=g.a.div(w()),L=g.a.span(E(),f.d.danger),j=n(38),q=n(47),x=n.n(q),O=n(48);a.default=function(){var e=Object(u.g)(),a=Object(p.c)((function(e){return e.auth})).isLoading,n=Object(p.b)(),t=Object(O.a)(),s=t.register,v=t.handleSubmit,g=t.errors,f=t.getValues,E=s({required:{value:!0,message:"The name is required"},minLength:{value:3,message:"The name must have more than 3 chars"},maxLength:{value:100,message:"The name must have less than 100 chars"}}),w=s({required:{value:!0,message:"The email is required"},minLength:{value:8,message:"The email must have more than 8 chars"},maxLength:{value:255,message:"The email must have less than 255 chars"},pattern:{value:c.a,message:"The email is not valid"}}),b=s({required:{value:!0,message:"The password is required"},minLength:{value:6,message:"The password must have more than 6 chars"},maxLength:{value:255,message:"The password must have less than 255 chars"}}),q=s({required:{value:!0,message:"The password Confirmation is required"},validate:function(e){return e===f("password")||"The password don't match"}});function S(){return(S=Object(l.a)(r.a.mark((function e(a,t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),delete a.password_confirmation,n(Object(d.q)(a));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return a?i.a.createElement(h.a,null):i.a.createElement(i.a.Fragment,null,i.a.createElement(j.d,null,i.a.createElement("img",{src:x.a,alt:"Shoppingify"}),i.a.createElement(j.c,null,"Signup"),i.a.createElement("img",{src:x.a,alt:"Shoppingify"})),i.a.createElement(y,{onSubmit:v((function(e,a){return S.apply(this,arguments)}))},i.a.createElement(o.a,null,i.a.createElement(o.a.Label,{htmlFor:"name"},"Name"),i.a.createElement(o.a.Input,{id:"name",placeholder:"Enter your name",name:"name",ref:E}),(null===g||void 0===g?void 0:g.name)&&i.a.createElement(L,null,null===g||void 0===g?void 0:g.name.message)),i.a.createElement(o.a,null,i.a.createElement(o.a.Label,{htmlFor:"email"},"Email"),i.a.createElement(o.a.Input,{id:"email",placeholder:"Enter your email",name:"email",ref:w}),(null===g||void 0===g?void 0:g.email)&&i.a.createElement(L,null,null===g||void 0===g?void 0:g.email.message)),i.a.createElement(o.a,null,i.a.createElement(o.a.Label,{htmlFor:"password"},"Password"),i.a.createElement(o.a.Input,{id:"password",type:"password",placeholder:"Enter your password",name:"password",ref:b}),(null===g||void 0===g?void 0:g.password)&&i.a.createElement(L,null,null===g||void 0===g?void 0:g.password.message)),i.a.createElement(o.a,null,i.a.createElement(o.a.Label,{htmlFor:"passwordConfirmation"},"Confirm Password"),i.a.createElement(o.a.Input,{id:"passwordConfirmation",type:"password",placeholder:"Repeat the password",name:"password_confirmation",ref:q}),(null===g||void 0===g?void 0:g.password_confirmation)&&i.a.createElement(L,null,null===g||void 0===g?void 0:g.password_confirmation.message)),i.a.createElement(T,null,i.a.createElement(m.a,{type:"button",btnType:"flat",onClick:function(){e.push("/login")}},"login"),i.a.createElement(m.a,{type:"submit",btnType:"raised",variant:"secondary"},"Signup"))))}}}]);
//# sourceMappingURL=7.88c3bab8.chunk.js.map