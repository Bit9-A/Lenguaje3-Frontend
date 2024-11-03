import{r as n,_ as f,R as r,a as u,c as v,P as o,u as re,H as I}from"./index-pQsb6_3c.js";import{T as te,d as ae,e as se}from"./DefaultLayout-DP3MRgx3.js";var k=n.forwardRef(function(e,i){var l=e.children,a=e.className,t=f(e,["children","className"]);return r.createElement("div",u({className:v("modal-content",a)},t,{ref:i}),l)});k.propTypes={children:o.node,className:o.string};k.displayName="CModalContent";var w=n.forwardRef(function(e,i){var l,a=e.children,t=e.alignment,c=e.className,d=e.fullscreen,p=e.scrollable,b=e.size,y=f(e,["children","alignment","className","fullscreen","scrollable","size"]);return r.createElement("div",u({className:v("modal-dialog",(l={"modal-dialog-centered":t==="center"},l[typeof d=="boolean"?"modal-fullscreen":"modal-fullscreen-".concat(d,"-down")]=d,l["modal-dialog-scrollable"]=p,l["modal-".concat(b)]=b,l),c)},y,{ref:i}),a)});w.propTypes={alignment:o.oneOf(["top","center"]),children:o.node,className:o.string,fullscreen:o.oneOfType([o.bool,o.oneOf(["sm","md","lg","xl","xxl"])]),scrollable:o.bool,size:o.oneOf(["sm","lg","xl"])};w.displayName="CModalDialog";var K=n.createContext({}),q=n.forwardRef(function(e,i){var l=e.children,a=e.alignment,t=e.backdrop,c=t===void 0?!0:t,d=e.className,p=e.container,b=e.duration,y=b===void 0?150:b,x=e.focus,U=x===void 0?!0:x,W=e.fullscreen,R=e.keyboard,X=R===void 0?!0:R,N=e.onClose,T=e.onClosePrevented,Y=e.onShow,O=e.portal,M=O===void 0?!0:O,Z=e.scrollable,$=e.size,P=e.transition,C=P===void 0?!0:P,B=e.unmountOnClose,_=B===void 0?!0:B,g=e.visible,ee=f(e,["children","alignment","backdrop","className","container","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),z=n.useRef(null),h=n.useRef(null),oe=n.useRef(null),ne=re(i,h),L=n.useState(g),m=L[0],E=L[1],S=n.useState(!1),V=S[0],D=S[1],le={visible:m,setVisible:E};n.useEffect(function(){E(g)},[g]),n.useEffect(function(){var s;return m?(z.current=document.activeElement,document.addEventListener("mouseup",H),document.addEventListener("keydown",j)):(s=z.current)===null||s===void 0||s.focus(),function(){document.removeEventListener("mouseup",H),document.removeEventListener("keydown",j)}},[m]);var F=function(){return c==="static"?D(!0):(E(!1),N&&N())};n.useLayoutEffect(function(){T&&T(),setTimeout(function(){return D(!1)},y)},[V]),n.useLayoutEffect(function(){return m?(document.body.classList.add("modal-open"),c&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout(function(){var s;U&&((s=h.current)===null||s===void 0||s.focus())},C?y:0)):(document.body.classList.remove("modal-open"),c&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),c&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}},[m]);var H=function(s){h.current&&h.current==s.target&&F()},j=function(s){s.key==="Escape"&&X&&F()};return r.createElement(r.Fragment,null,r.createElement(te,{in:m,mountOnEnter:!0,nodeRef:h,onEnter:Y,onExit:N,unmountOnExit:_,timeout:C?y:0},function(s){return r.createElement(I,{container:p,portal:M},r.createElement(K.Provider,{value:le},r.createElement("div",u({className:v("modal",{"modal-static":V,fade:C,show:s==="entered"},d),tabIndex:-1},m?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:u({},s!=="exited"&&{display:"block"})},ee,{ref:ne}),r.createElement(w,{alignment:a,fullscreen:W,scrollable:Z,size:$},r.createElement(k,{ref:oe},l)))))}),c&&r.createElement(I,{container:p,portal:M},r.createElement(ae,{visible:m})))});q.propTypes={alignment:o.oneOf(["top","center"]),backdrop:o.oneOfType([o.bool,o.oneOf(["static"])]),children:o.node,className:o.string,container:o.any,duration:o.number,focus:o.bool,fullscreen:o.oneOfType([o.bool,o.oneOf(["sm","md","lg","xl","xxl"])]),keyboard:o.bool,onClose:o.func,onClosePrevented:o.func,onShow:o.func,portal:o.bool,scrollable:o.bool,size:o.oneOf(["sm","lg","xl"]),transition:o.bool,unmountOnClose:o.bool,visible:o.bool};q.displayName="CModal";var A=n.forwardRef(function(e,i){var l=e.children,a=e.className,t=f(e,["children","className"]);return r.createElement("div",u({className:v("modal-body",a)},t,{ref:i}),l)});A.propTypes={children:o.node,className:o.string};A.displayName="CModalBody";var G=n.forwardRef(function(e,i){var l=e.children,a=e.className,t=f(e,["children","className"]);return r.createElement("div",u({className:v("modal-footer",a)},t,{ref:i}),l)});G.propTypes={children:o.node,className:o.string};G.displayName="CModalFooter";var J=n.forwardRef(function(e,i){var l=e.children,a=e.className,t=e.closeButton,c=t===void 0?!0:t,d=f(e,["children","className","closeButton"]),p=n.useContext(K).setVisible;return r.createElement("div",u({className:v("modal-header",a)},d,{ref:i}),l,c&&r.createElement(se,{onClick:function(){return p(!1)}}))});J.propTypes={children:o.node,className:o.string,closeButton:o.bool};J.displayName="CModalHeader";var Q=n.forwardRef(function(e,i){var l=e.children,a=e.as,t=a===void 0?"h5":a,c=e.className,d=f(e,["children","as","className"]);return r.createElement(t,u({className:v("modal-title",c)},d,{ref:i}),l)});Q.propTypes={as:o.elementType,children:o.node,className:o.string};Q.displayName="CModalTitle";export{q as C,J as a,Q as b,A as c,G as d};
