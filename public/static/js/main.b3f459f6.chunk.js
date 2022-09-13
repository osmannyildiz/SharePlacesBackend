(this["webpackJsonpyourplaces-frontend"]=this["webpackJsonpyourplaces-frontend"]||[]).push([[1],[,,,,,,,,,,,function(e,t,a){"use strict";var n=a(0),l=Object(n.createContext)({userId:null,token:null,login:function(e,t){},logout:function(){},isLoggedIn:!1});t.a=l},,,function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(0),l=a.n(n);a(39);function c(e){return l.a.createElement("div",{className:"".concat(e.asOverlay&&"spinner__overlay")},l.a.createElement("div",{className:"spinner-dual-ring"}))}},function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(0),l=a.n(n),c=a(7),r=a.n(c);a(29);function u(e){return r.a.createPortal(l.a.createElement("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-portal"))}},,,,,,function(e,t,a){},,function(e,t,a){e.exports=a(40)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(7),r=a.n(c),u=(a(28),a(1)),o=a(8),s=a(10),i=a(15),m=a(42),E=(a(30),a(11));a(31);function d(){var e=Object(n.useContext)(E.a);return l.a.createElement("ul",{className:"nav-links"},l.a.createElement("li",null,l.a.createElement(o.c,{className:"nav-link",to:"/",exact:!0},"ALL USERS")),!e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(o.c,{className:"nav-link",to:"/auth"},"AUTHENTICATE")),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(o.c,{className:"nav-link",to:"/users/".concat(e.userId,"/places")},"MY PLACES")),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(o.c,{className:"nav-link",to:"/places/add"},"ADD PLACE")),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement("button",{className:"nav-link",onClick:e.logout},"LOGOUT")))}function f(e){var t=l.a.createElement(m.a,{in:e.isOpen,classNames:"slide-in-left",timeout:200,mountOnEnter:!0,unmountOnExit:!0},l.a.createElement("aside",{className:"drawer"},l.a.createElement("nav",{className:"drawer-nav",onClick:e.handleCloseDrawer},l.a.createElement(d,null))));return r.a.createPortal(t,document.getElementById("drawer-portal"))}a(37),a(38);function g(){return l.a.createElement("nav",{className:"header-nav"},l.a.createElement(d,null))}function p(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],c=t[1];function r(){c(!1)}return l.a.createElement(l.a.Fragment,null,a&&l.a.createElement(i.a,{onClick:r}),l.a.createElement(f,{isOpen:a,handleCloseDrawer:r}),l.a.createElement("header",{className:"header"},l.a.createElement("button",{className:"header__menu-btn",onClick:function(){c(!0)}},l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null)),l.a.createElement("h1",{className:"header__title"},l.a.createElement(o.b,{to:"/"},"YourPlaces")),l.a.createElement(g,null)))}var b,v=a(14),h=function(){var e=Object(n.useState)(null),t=Object(s.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(null),r=Object(s.a)(c,2),u=r[0],o=r[1],i=Object(n.useState)(null),m=Object(s.a)(i,2),E=m[0],d=m[1],f=Object(n.useCallback)((function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(l(e),o(t),localStorage.setItem("authData",JSON.stringify({userId:e,token:t})),!a){var n=new Date,c=new Date(n.getTime()+36e5);localStorage.setItem("tokenExpiry",c.toISOString())}d(new Date(localStorage.getItem("tokenExpiry")))}),[]),g=Object(n.useCallback)((function(){l(null),o(null),localStorage.removeItem("authData"),d(null),localStorage.removeItem("tokenExpiry")}),[]);return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("authData")),t=localStorage.getItem("tokenExpiry"),a=new Date;e&&e.userId&&(t&&new Date(t)>a?f(e.userId,e.token,!0):g())}),[f,g]),Object(n.useEffect)((function(){if(E){var e=new Date,t=E.getTime()-e.getTime();b=setTimeout(g,t)}else clearTimeout(b)}),[E,g]),{userId:a,token:u,login:f,logout:g}},k=(a(21),l.a.lazy((function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,123))}))),I=l.a.lazy((function(){return Promise.all([a.e(0),a.e(7)]).then(a.bind(null,124))})),O=l.a.lazy((function(){return Promise.all([a.e(0),a.e(9)]).then(a.bind(null,125))})),N=l.a.lazy((function(){return Promise.all([a.e(3),a.e(6)]).then(a.bind(null,126))})),S=l.a.lazy((function(){return a.e(5).then(a.bind(null,127))}));var y=function(){var e,t=h(),a=t.userId,c=t.token,r=t.login,s=t.logout;return e=a?l.a.createElement(u.d,null,l.a.createElement(u.b,{path:"/",exact:!0},l.a.createElement(S,null)),l.a.createElement(u.b,{path:"/users/:userId/places",exact:!0},l.a.createElement(N,null)),l.a.createElement(u.b,{path:"/places/add",exact:!0},l.a.createElement(k,null)),l.a.createElement(u.b,{path:"/places/:placeId/edit",exact:!0},l.a.createElement(O,null)),l.a.createElement(u.a,{to:"/"})):l.a.createElement(u.d,null,l.a.createElement(u.b,{path:"/",exact:!0},l.a.createElement(S,null)),l.a.createElement(u.b,{path:"/auth",exact:!0},l.a.createElement(I,null)),l.a.createElement(u.b,{path:"/users/:userId/places",exact:!0},l.a.createElement(N,null)),l.a.createElement(u.a,{to:"/auth"})),l.a.createElement(E.a.Provider,{value:{userId:a,token:c,login:r,logout:s,isLoggedIn:!!a}},l.a.createElement(o.a,null,l.a.createElement(p,null),l.a.createElement("main",null,l.a.createElement(n.Suspense,{fallback:l.a.createElement("div",{className:"center"},l.a.createElement(v.a,null))},e))))};r.a.render(l.a.createElement(y,null),document.getElementById("root"))}],[[23,2,4]]]);
//# sourceMappingURL=main.b3f459f6.chunk.js.map