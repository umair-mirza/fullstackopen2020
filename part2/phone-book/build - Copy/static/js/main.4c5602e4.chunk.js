(this["webpackJsonpphone-book"]=this["webpackJsonpphone-book"]||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),a=t(14),u=t.n(a),o=t(3),i=t(0),s=function(e){var n=e.searchField,t=e.handleSearch;return Object(i.jsxs)(i.Fragment,{children:["search contact: ",Object(i.jsx)("input",{value:n,onChange:t})]})},l=function(e){var n=e.handleSubmit,t=e.newName,c=e.handleNewName,r=e.newPhone,a=e.handleNewPhone;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h2",{children:"Add new contact"}),Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:function(e){return c(e)}})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:r,onChange:function(e){return a(e)}})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})]})},d=function(e){var n=e.filteredPersons,t=e.deleteHandler;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h2",{children:"Numbers"}),n.map((function(e){return Object(i.jsxs)("div",{children:[e.name,"  ",e.number," ",Object(i.jsx)("button",{onClick:function(){return t(e.id)},children:"Delete"})]},e.id)}))]})},j=t(4),h=t.n(j),b="/api/persons",f=(t(38),function(e){var n=e.message,t=e.error;return null===n?null:n&&!1===t?Object(i.jsx)("div",{className:"message",children:n}):Object(i.jsx)("div",{className:"errormessage",children:n})}),m=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),u=Object(o.a)(a,2),j=u[0],m=u[1],O=Object(c.useState)(""),x=Object(o.a)(O,2),v=x[0],p=x[1],g=Object(c.useState)(""),w=Object(o.a)(g,2),S=w[0],N=w[1],C=Object(c.useState)(null),y=Object(o.a)(C,2),P=y[0],k=y[1],T=Object(c.useState)(!1),F=Object(o.a)(T,2),A=F[0],D=F[1];Object(c.useEffect)((function(){h.a.get(b).then((function(e){return e.data})).then((function(e){return r(e)})),console.log("successful import")}),[]);var E=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Phonebook"}),Object(i.jsx)(f,{message:P,error:A}),Object(i.jsx)(s,{searchField:S,handleSearch:function(e){N(e.target.value)}}),Object(i.jsx)(l,{handleSubmit:function(e){e.preventDefault();var n,c=t.find((function(e){return e.name===j}));if(c&&c.number===v)alert("name already exists");else if(c&&c.number!==v){var a={name:j,number:v};(function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))})(c.id,a).then((function(e){var n=t.map((function(n){return n.id!==e.id?n:e}));r(n),m(""),p(""),k("The contact ".concat(j," has been successfull Updated!")),setTimeout((function(){k(null)}),3e3)}))}else{(n={name:j,number:v},h.a.post(b,n).then((function(e){return e.data}))).then((function(e){r(t.concat(e)),m(""),p(""),k("The Contact ".concat(j," has been successfully Added!")),D(!1),setTimeout((function(){k(null)}),3e3)})).catch((function(e){k(e.response.data.error),D(!0),setTimeout((function(){k(null)}),3e3)}))}},newName:j,handleNewName:function(e){m(e.target.value)},newPhone:v,handleNewPhone:function(e){p(e.target.value)}}),Object(i.jsx)(d,{filteredPersons:E,deleteHandler:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Are you sure you want to delete ".concat(n.name))&&function(e){return h.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))}(e).then(r(t.filter((function(n){return n.id!==e})))).catch((function(e){k("Contact has already been Deleted!"),D(!0),setTimeout((function(){k(null)}),3e3)}))}})]})};u.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(m,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.4c5602e4.chunk.js.map