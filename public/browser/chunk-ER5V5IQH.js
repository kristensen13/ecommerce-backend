import{p as i,q as f}from"./chunk-23D7R4XH.js";import{S as l,Y as s,f as c}from"./chunk-27BBFG4U.js";var p=i.BASE_URL,w=(()=>{class o{localStorageSvc=s(f);constructor(){}uploadFile(a,e,m){return c(this,null,function*(){try{let t=`${p}/upload/${e}/${m}`,n=new FormData;n.append("image",a);let r=yield(yield fetch(t,{method:"PUT",headers:{"x-token":this.localStorageSvc.getItem("token")||""},body:n})).json();if(r.ok)return r.fileName;throw console.log("Upload failed"),new Error(r.msg);return!1}catch(t){return console.log(t),!1}})}static \u0275fac=function(e){return new(e||o)};static \u0275prov=l({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();export{w as a};
