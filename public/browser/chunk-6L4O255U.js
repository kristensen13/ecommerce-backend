import{p}from"./chunk-I5GBPY3C.js";import{a as d}from"./chunk-22JHINBQ.js";import"./chunk-7NYZPO2S.js";import"./chunk-TRWNYS6K.js";import{j as a,n as c,p as o}from"./chunk-23D7R4XH.js";import{S as n,Y as r,_ as s,hb as l}from"./chunk-27BBFG4U.js";var m=(()=>{class t{http=r(c);getCategories(){return this.http.get(`${o.API_ENDPOINT}${o.METHODS.GET_ALL_CATEGORIES}`)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=n({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var u=(()=>{class t{http=r(c);getProducts(){return this.http.get(`${o.API_ENDPOINT}${o.METHODS.GET_ALL_PRODUCTS}`)}createProduct(e){return this.http.post(`${o.API_ENDPOINT}${o.METHODS.CREATE_PRODUCT}`,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=n({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var D=(()=>{class t{productSvc=r(u);categorySvc=r(m);userSvc=r(d);isSidePanelVisible=!1;productObj={title:"",price:0,description:"",categoryId:0,images:[""]};categoryObj={id:"",name:"",image:"",creationAt:new Date,updatedAt:new Date};userObj={email:"",password:"",name:"",role:"USER_ROLE",img:"",google:!1,uid:"",imageUrl:""};categoryList=[];productList=[];userList=[];ngOnInit(){this.getAllCategories(),this.getAllProducts(),this.getAllUsers()}getAllCategories(){this.categorySvc.getCategories().subscribe({next:e=>{this.categoryList=e},error:e=>{console.log(e,"Error while fetching categories")}})}getAllProducts(){this.productSvc.getProducts().subscribe({next:e=>{this.productList=e},error:e=>{console.log(e,"Error while fetching products")}})}getAllUsers(){this.userSvc.getUsers().subscribe({next:e=>{this.userList=e},error:e=>{console.log(e,"Error while fetching users")}})}onSave(){this.productSvc.createProduct(this.productObj).subscribe({next:e=>{console.log(e,"Product created successfully"),this.getAllProducts()},error:e=>{console.log(e,"Error while creating product")}})}openSidePanel(){this.isSidePanelVisible=!0}closeSidePanel(){this.isSidePanelVisible=!1}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=s({type:t,selectors:[["app-products"]],standalone:!0,features:[l],decls:0,vars:0,template:function(i,f){},dependencies:[a,p],styles:[".grilla[_ngcontent-%COMP%]{padding-top:2rem;padding-bottom:2rem}.grilla[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.grilla[_ngcontent-%COMP%]   .col-3[_ngcontent-%COMP%]{display:flex}.card[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;margin-bottom:15px}.card-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1}.card-title[_ngcontent-%COMP%]{flex-grow:1}.card-img-top[_ngcontent-%COMP%]{max-height:70vh;object-fit:cover}"]})}return t})();export{D as ProductsComponent};
