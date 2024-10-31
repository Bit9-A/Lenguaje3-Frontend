import{r as o,_ as R,u as W,R as l,g as u,h as A,P as t,i as X,a5 as q,T as Z,j as e,a as $,b as y,c as N,E as C,d as T,C as V}from"./index-CRL0QlJC.js";import{T as _,L,b as x}from"./DefaultLayout-Ck-bEmpc.js";import"./CContainer-Bx03NkIH.js";import"./cil-user-Dlmw-Gem.js";var D=o.createContext({}),d=o.forwardRef(function(s,a){var i=s.children,n=s.animation,r=n===void 0?!0:n,c=s.autohide,U=c===void 0?!0:c,E=s.className,p=s.color,v=s.delay,b=v===void 0?5e3:v,m=s.index,w=s.innerKey,k=s.visible,B=k===void 0?!1:k,H=s.onClose,M=s.onShow,G=R(s,["children","animation","autohide","className","color","delay","index","innerKey","visible","onClose","onShow"]),O=o.useRef(),J=W(a,O),z=o.useState(!1),Y=z[0],K=z[1],S=o.useRef();o.useEffect(function(){K(B)},[B]);var Q={visible:Y,setVisible:K};o.useEffect(function(){return function(){return clearTimeout(S.current)}},[]),o.useEffect(function(){F()},[Y]);var F=function(){U&&(clearTimeout(S.current),S.current=window.setTimeout(function(){K(!1)},b))};return l.createElement(_,{in:Y,nodeRef:O,onEnter:function(){return M&&M(m??null)},onExited:function(){return H&&H(m??null)},timeout:250,unmountOnExit:!0},function(P){var j;return l.createElement(D.Provider,{value:Q},l.createElement("div",u({className:A("toast",(j={fade:r},j["bg-".concat(p)]=p,j["border-0"]=p,j["show showing"]=P==="entering"||P==="exiting",j.show=P==="entered",j),E),"aria-live":"assertive","aria-atomic":"true",role:"alert",onMouseEnter:function(){return clearTimeout(S.current)},onMouseLeave:function(){return F()}},G,{key:w,ref:J}),i))})});d.propTypes={animation:t.bool,autohide:t.bool,children:t.node,className:t.string,color:X,delay:t.number,index:t.number,innerKey:t.oneOfType([t.number,t.string]),onClose:t.func,onShow:t.func,visible:t.bool};d.displayName="CToast";var h=o.forwardRef(function(s,a){var i=s.children,n=s.className,r=R(s,["children","className"]);return l.createElement("div",u({className:A("toast-body",n)},r,{ref:a}),i)});h.propTypes={children:t.node,className:t.string};h.displayName="CToastBody";var g=o.forwardRef(function(s,a){var i=s.children,n=s.as,r=R(s,["children","as"]),c=o.useContext(D).setVisible;return n?l.createElement(n,u({onClick:function(){return c(!1)}},r,{ref:a}),i):l.createElement(L,u({onClick:function(){return c(!1)}},r,{ref:a}))});g.propTypes=u(u({},L.propTypes),{as:t.elementType});g.displayName="CToastClose";var f=o.forwardRef(function(s,a){var i=s.children,n=s.className,r=s.closeButton,c=R(s,["children","className","closeButton"]);return l.createElement("div",u({className:A("toast-header",n)},c,{ref:a}),i,r&&l.createElement(g,null))});f.propTypes={children:t.node,className:t.string,closeButton:t.bool};f.displayName="CToastHeader";var I=o.forwardRef(function(s,a){var i=s.children,n=s.className,r=s.placement,c=s.push,U=R(s,["children","className","placement","push"]),E=o.useState([]),p=E[0],v=E[1],b=o.useRef(0);o.useEffect(function(){b.current++,c&&m(c)},[c]);var m=function(w){v(function(k){return q(q([],k,!0),[l.cloneElement(w,{index:b.current,innerKey:b.current,onClose:function(B){return v(function(H){return H.filter(function(M){return M.props.index!==B})})}})],!1)})};return l.createElement(Z,{portal:typeof r=="string"},p.length>0||i?l.createElement("div",u({className:A("toaster toast-container",{"position-fixed":r,"top-0":r&&r.includes("top"),"top-50 translate-middle-y":r&&r.includes("middle"),"bottom-0":r&&r.includes("bottom"),"start-0":r&&r.includes("start"),"start-50 translate-middle-x":r&&r.includes("center"),"end-0":r&&r.includes("end")},n)},U,{ref:a}),i,p.map(function(w){return l.cloneElement(w,{visible:!0})})):null)});I.propTypes={children:t.node,className:t.string,placement:t.oneOfType([t.string,t.oneOf(["top-start","top-center","top-end","middle-start","middle-center","middle-end","bottom-start","bottom-center","bottom-end"])]),push:t.any};I.displayName="CToaster";const ee=()=>{const[s,a]=o.useState(0),i=o.useRef(),n=e.jsxs(d,{title:"CoreUI for React.js",children:[e.jsxs(f,{closeButton:!0,children:[e.jsx("svg",{className:"rounded me-2",width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid slice",focusable:"false",role:"img",children:e.jsx("rect",{width:"100%",height:"100%",fill:"#007aff"})}),e.jsx("strong",{className:"me-auto",children:"CoreUI for React.js"}),e.jsx("small",{children:"7 min ago"})]}),e.jsx(h,{children:"Hello, world! This is a toast message."})]});return e.jsxs(e.Fragment,{children:[e.jsx(V,{color:"primary",onClick:()=>a(n),children:"Send a toast"}),e.jsx(I,{ref:i,push:s,placement:"top-end"})]})},ne=()=>e.jsxs($,{children:[e.jsx(y,{xs:12,children:e.jsxs(N,{className:"mb-4",children:[e.jsxs(C,{children:[e.jsx("strong",{children:"React Toast"})," ",e.jsx("small",{children:"Basic"})]}),e.jsxs(T,{children:[e.jsx("p",{className:"text-body-secondary small",children:"Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted” content and strongly encourage a dismiss button."}),e.jsx(x,{href:"components/toast",children:e.jsxs(d,{autohide:!1,visible:!0,children:[e.jsxs(f,{closeButton:!0,children:[e.jsx("svg",{className:"rounded me-2",width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid slice",focusable:"false",role:"img",children:e.jsx("rect",{width:"100%",height:"100%",fill:"#007aff"})}),e.jsx("strong",{className:"me-auto",children:"CoreUI for React.js"}),e.jsx("small",{children:"7 min ago"})]}),e.jsx(h,{children:"Hello, world! This is a toast message."})]})}),e.jsx(x,{href:"components/toast",children:ee()})]})]})}),e.jsx(y,{xs:12,children:e.jsxs(N,{className:"mb-4",children:[e.jsxs(C,{children:[e.jsx("strong",{children:"React Toast"})," ",e.jsx("small",{children:"Translucent"})]}),e.jsxs(T,{children:[e.jsx("p",{className:"text-body-secondary small",children:"Toasts are slightly translucent to blend in with what's below them."}),e.jsx(x,{href:"components/toast#translucent",tabContentClassName:"bg-dark",children:e.jsxs(d,{autohide:!1,visible:!0,children:[e.jsxs(f,{closeButton:!0,children:[e.jsx("svg",{className:"rounded me-2",width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid slice",focusable:"false",role:"img",children:e.jsx("rect",{width:"100%",height:"100%",fill:"#007aff"})}),e.jsx("strong",{className:"me-auto",children:"CoreUI for React.js"}),e.jsx("small",{children:"7 min ago"})]}),e.jsx(h,{children:"Hello, world! This is a toast message."})]})})]})]})}),e.jsx(y,{xs:12,children:e.jsxs(N,{className:"mb-4",children:[e.jsxs(C,{children:[e.jsx("strong",{children:"React Toast"})," ",e.jsx("small",{children:"Stacking"})]}),e.jsxs(T,{children:[e.jsx("p",{className:"text-body-secondary small",children:"You can stack toasts by wrapping them in a toast container, which will vertically add some spacing."}),e.jsx(x,{href:"components/toast#stacking",children:e.jsxs(I,{className:"position-static",children:[e.jsxs(d,{autohide:!1,visible:!0,children:[e.jsxs(f,{closeButton:!0,children:[e.jsx("svg",{className:"rounded me-2",width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid slice",focusable:"false",role:"img",children:e.jsx("rect",{width:"100%",height:"100%",fill:"#007aff"})}),e.jsx("strong",{className:"me-auto",children:"CoreUI for React.js"}),e.jsx("small",{children:"7 min ago"})]}),e.jsx(h,{children:"Hello, world! This is a toast message."})]}),e.jsxs(d,{autohide:!1,visible:!0,children:[e.jsxs(f,{closeButton:!0,children:[e.jsx("svg",{className:"rounded me-2",width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid slice",focusable:"false",role:"img",children:e.jsx("rect",{width:"100%",height:"100%",fill:"#007aff"})}),e.jsx("strong",{className:"me-auto",children:"CoreUI for React.js"}),e.jsx("small",{children:"7 min ago"})]}),e.jsx(h,{children:"Hello, world! This is a toast message."})]})]})})]})]})}),e.jsx(y,{xs:12,children:e.jsxs(N,{className:"mb-4",children:[e.jsxs(C,{children:[e.jsx("strong",{children:"React Toast"})," ",e.jsx("small",{children:"Custom content"})]}),e.jsxs(T,{children:[e.jsxs("p",{className:"text-body-secondary small",children:["Customize your toasts by removing sub-components, tweaking them with"," ",e.jsx("a",{href:"https://coreui.io/docs/utilities/api",children:"utilities"}),", or by adding your own markup. Here we've created a simpler toast by removing the default"," ",e.jsx("code",{children:"<CToastHeader>"}),", adding a custom hide icon from"," ",e.jsx("a",{href:"https://coreui.io/icons/",children:"CoreUI Icons"}),", and using some"," ",e.jsx("a",{href:"https://coreui.io/docs/utilities/flex",children:"flexbox utilities"})," to adjust the layout."]}),e.jsx(x,{href:"components/toast#custom-content",children:e.jsx(d,{autohide:!1,className:"align-items-center",visible:!0,children:e.jsxs("div",{className:"d-flex",children:[e.jsx(h,{children:"Hello, world! This is a toast message."}),e.jsx(g,{className:"me-2 m-auto"})]})})}),e.jsx("p",{className:"text-body-secondary small",children:"Alternatively, you can also add additional controls and components to toasts."}),e.jsx(x,{href:"components/toast#custom-content",children:e.jsx(d,{autohide:!1,visible:!0,children:e.jsxs(h,{children:["Hello, world! This is a toast message.",e.jsxs("div",{className:"mt-2 pt-2 border-top",children:[e.jsx(V,{type:"button",color:"primary",size:"sm",children:"Take action"}),e.jsx(g,{as:V,color:"secondary",size:"sm",className:"ms-1",children:"Close"})]})]})})})]})]})}),e.jsx(y,{xs:12,children:e.jsxs(N,{className:"mb-4",children:[e.jsxs(C,{children:[e.jsx("strong",{children:"React Toast"})," ",e.jsx("small",{children:"Custom content"})]}),e.jsxs(T,{children:[e.jsxs("p",{className:"text-body-secondary small",children:["Building on the above example, you can create different toast color schemes with our"," ",e.jsx("a",{href:"https://coreui.io/docs/utilities/colors",children:"color"})," and"," ",e.jsx("a",{href:"https://coreui.io/docs/utilities/background",children:"background"})," utilities. Here we've set ",e.jsx("code",{children:'color="primary"'})," and added ",e.jsx("code",{children:".text-white"})," ","class to the ",e.jsx("code",{children:"<Ctoast>"}),", and then set ",e.jsx("code",{children:"white"})," property to our close button. For a crisp edge, we remove the default border with"," ",e.jsx("code",{children:".border-0"}),"."]}),e.jsx(x,{href:"components/toast#color-schemes",children:e.jsx(d,{autohide:!1,color:"primary",className:"text-white align-items-center",visible:!0,children:e.jsxs("div",{className:"d-flex",children:[e.jsx(h,{children:"Hello, world! This is a toast message."}),e.jsx(g,{className:"me-2 m-auto",white:!0})]})})})]})]})})]});export{ne as default};
