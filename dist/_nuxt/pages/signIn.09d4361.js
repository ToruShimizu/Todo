(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{384:function(e,t,r){var content=r(542);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(15).default)("532017be",content,!0,{sourceMap:!1})},385:function(e,t,r){var content=r(544);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(15).default)("2bbbf044",content,!0,{sourceMap:!1})},528:function(e,t,r){"use strict";r.r(t);r(56);var o=r(12),l=r(69),n=r(77),c=r(233),d=r(89),v=r(138),m={mixins:[l.a,n.a,c.a,d.a,v.a],props:{createUserDialog:{type:Boolean}},data:function(){return{loadingCreateUser:!1,showPassword:!1}},methods:{createUser:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.loader="loadingCreateUser",e.getUserPassword&&e.getUserEmail){t.next=4;break}return e.$refs.form.validate(),t.abrupt("return");case 4:return t.next=6,e.$store.dispatch("modules/auth/createUser",{email:e.getUserEmail,password:e.getUserPassword,userName:e.getUserName});case 6:e.loader=null,e.$refs.form.reset();case 8:case"end":return t.stop()}}),t)})))()},closeCreateUser:function(){this.getUserName="",this.getUserEmail="",this.getUserPassword="",this.$refs.form.reset(),this.$emit("close-create-user")}}},f=(r(541),r(20)),w=r(31),h=r.n(w),x=r(372),_=r(195),U=r(176),P=r(19),C=r(373),R=r(374),y=r(364),V=r(375),k=r(177),D=r(376),E=r(366),component=Object(f.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-dialog",{attrs:{persistent:"","max-width":"500px",transition:"scroll-y-transition"},model:{value:e.createUserDialog,callback:function(t){e.createUserDialog=t},expression:"createUserDialog"}},[r("v-app",[r("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[r("v-card",{staticClass:"mx-auto mt-5 text-center",attrs:{width:"400px"}},[r("v-card-title",{staticClass:"text-center"},[r("h4",{staticClass:"fill-width"},[e._v("新規作成")])]),e._v(" "),r("v-divider"),e._v(" "),r("v-card-text",[r("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.createUser(t)}}},[r("p",[e._v("\n                ○○○@example.comとすることで、\n                "),r("br"),e._v("サンプルのメールアドレスで作成することができます。\n              ")]),e._v(" "),r("v-text-field",{attrs:{"prepend-inner-icon":"mdi-card-account-details-outline",label:"名前を入力する",rules:[e.validRules.nameRules.required],clearable:""},model:{value:e.getUserName,callback:function(t){e.getUserName=t},expression:"getUserName"}}),e._v(" "),r("v-text-field",{attrs:{"prepend-inner-icon":"mdi-email-outline",label:"メールアドレスを入力する",rules:[e.validRules.emailRules.required,e.validRules.emailRules.regex],clearable:""},model:{value:e.getUserEmail,callback:function(t){e.getUserEmail=t},expression:"getUserEmail"}}),e._v(" "),r("v-text-field",{attrs:{type:e.showPassword?"text":"Password","prepend-inner-icon":"mdi-lock-outline","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",label:"パスワードを入力する(6文字以上)",rules:[e.validRules.passwordRules.required,e.validRules.passwordRules.regex],counter:"72"},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.getUserPassword,callback:function(t){e.getUserPassword=t},expression:"getUserPassword"}}),e._v(" "),r("v-card-actions",[r("v-btn",{staticClass:"hidden-xs-only",attrs:{color:"primary"},on:{click:e.closeCreateUser}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-login-variant")]),e._v("ログイン画面へ戻る\n                ")],1),e._v(" "),r("v-btn",{staticClass:"hidden-sm-and-up",attrs:{color:"primary"},on:{click:e.closeCreateUser}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-login-variant")]),e._v("戻る\n                ")],1),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"success",loading:e.loadingCreateUser,disabled:e.loadingCreateUser},on:{click:e.createUser}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-account-plus")]),e._v("新規作成\n                ")],1)],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,"7e0e3e34",null);t.default=component.exports;h()(component,{VApp:x.a,VBtn:_.a,VCard:U.a,VCardActions:P.a,VCardText:P.b,VCardTitle:P.c,VCol:C.a,VDialog:R.a,VDivider:y.a,VForm:V.a,VIcon:k.a,VSpacer:D.a,VTextField:E.a})},529:function(e,t,r){"use strict";r.r(t);var o=r(69),l=r(77),n=r(89),c={mixins:[o.a,l.a,n.a],props:{resetPasswordDialog:{type:Boolean}},data:function(){return{loadingResetPassword:!1}},methods:{passwordReset:function(){"test@example.com"!==this.getUserEmail?this.getUserEmail?(this.loader="loadingResetPassword",this.$store.dispatch("modules/auth/passwordReset",{email:this.getUserEmail}),this.$refs.form.reset()):this.$refs.form.validate():alert("テストユーザーはパスワードを再設定することはできません")},closeResetPasswprd:function(){this.$emit("close-reset-password"),this.getUserEmail="",this.$refs.form.reset()}}},d=r(20),v=r(31),m=r.n(v),f=r(372),w=r(195),h=r(176),x=r(19),_=r(373),U=r(374),P=r(364),C=r(375),R=r(177),y=r(376),V=r(366),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-dialog",{attrs:{persistent:"","max-width":"400px",transition:"scroll-y-transition"},model:{value:e.resetPasswordDialog,callback:function(t){e.resetPasswordDialog=t},expression:"resetPasswordDialog"}},[r("v-app",[r("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[r("v-card",{staticClass:"mx-auto mt-5 text-center",attrs:{width:"400px"}},[r("v-card-title",{staticClass:"text-center"},[r("h4",{staticClass:"fill-width"},[e._v("パスワード再設定")])]),e._v(" "),r("v-divider"),e._v(" "),r("v-card-text",[r("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.passwordReset(t)}}},[r("p",[e._v("\n                登録されているメールアドレスを入力してください。\n                "),r("br"),e._v("パスワード再設定のURLが送信されます。\n              ")]),e._v(" "),r("v-text-field",{attrs:{"prepend-inner-icon":"mdi-email-outline",label:"登録されているメールアドレス",rules:[e.validRules.emailRules.required,e.validRules.emailRules.regex],clearable:""},model:{value:e.getUserEmail,callback:function(t){e.getUserEmail=t},expression:"getUserEmail"}}),e._v(" "),r("v-card-actions",[r("v-btn",{staticClass:"hidden-sm-and-up",attrs:{color:"primary"},on:{click:e.closeResetPasswprd}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-login-variant")]),e._v("戻る\n                ")],1),e._v(" "),r("v-btn",{staticClass:"hidden-xs-only",attrs:{color:"primary"},on:{click:e.closeResetPasswprd}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-login-variant")]),e._v("ログイン画面へ戻る\n                ")],1),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"success",loading:e.loadingResetPassword,disabled:e.loadingResetPassword},on:{click:e.passwordReset}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-email-send")]),e._v("送信\n                ")],1)],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{VApp:f.a,VBtn:w.a,VCard:h.a,VCardActions:x.a,VCardText:x.b,VCardTitle:x.c,VCol:_.a,VDialog:U.a,VDivider:P.a,VForm:C.a,VIcon:R.a,VSpacer:y.a,VTextField:V.a})},541:function(e,t,r){"use strict";var o=r(384);r.n(o).a},542:function(e,t,r){(t=r(14)(!1)).push([e.i,".fill-width[data-v-7e0e3e34]{width:100%}",""]),e.exports=t},543:function(e,t,r){"use strict";var o=r(385);r.n(o).a},544:function(e,t,r){(t=r(14)(!1)).push([e.i,".fill-width[data-v-24afb7ee]{width:100%}.link-caption[data-v-24afb7ee]{text-decoration:none;color:#666!important;font-size:.75rem}.separator[data-v-24afb7ee]{margin-top:30px;margin-bottom:30px;height:0;border-top:1px solid #ddd;border-bottom:1px solid #fff;position:relative}.middle_separator[data-v-24afb7ee]{position:absolute;padding:0 16px;color:#ccc;background:#fff;font-size:11px;text-shadow:0 1px 0 #fff;text-transform:uppercase;top:-7px;left:30%;color:#777;font-size:13px;top:-9px;left:41%}",""]),e.exports=t},607:function(e,t,r){"use strict";r.r(t);r(13),r(8),r(7),r(4),r(10),r(56);var o=r(12),l=r(1),n=r(24),c=r(69),d=r(77),v=r(89),m=r(138),f=r(528),w=r(529);function h(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var x={mixins:[c.a,d.a,v.a,m.a],components:{CreateUser:f.default,ResetPassword:w.default},data:function(){return{loadingTestLogin:!1,loadingLogin:!1,showPassword:!1,createUserDialog:!1,resetPasswordDialog:!1}},methods:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(t){Object(l.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({testLogin:function(){this.loader="loadingTestLogin",this.$store.dispatch("modules/auth/login",{email:"test@example.com",password:"testUser",userName:"テストユーザー"})},login:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.getUserPassword&&e.getUserEmail){t.next=3;break}return e.$refs.form.validate(),t.abrupt("return");case 3:return e.loader="loadingLogin",t.next=6,e.$store.dispatch("modules/auth/login",{email:e.getUserEmail,password:e.getUserPassword});case 6:e.getUserEmail="",e.getUserPassword="",e.loader=null,e.$refs.form.reset();case 10:case"end":return t.stop()}}),t)})))()},openCreateUser:function(){this.createUserDialog=!0},closeCreateUser:function(){this.createUserDialog=!1},openResetPassword:function(){this.resetPasswordDialog=!0},closeResetPasswprd:function(){this.resetPasswordDialog=!1}},Object(n.b)("modules/auth",["googleLogin"]))},_=(r(543),r(20)),U=r(31),P=r.n(U),C=r(372),R=r(195),y=r(176),V=r(19),k=r(373),D=r(364),E=r(375),O=r(177),j=r(376),$=r(366),component=Object(_.a)(x,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[r("v-card",{staticClass:"mx-auto",attrs:{width:"400px"}},[r("v-card-title",{staticClass:"text-center"},[r("h4",{staticClass:"fill-width"},[e._v("ログインはこちらから")])]),e._v(" "),r("v-divider"),e._v(" "),r("v-card-text",[r("v-btn",{staticClass:"fill-width text-capitalize caption",staticStyle:{"border-color":"#979797"},attrs:{height:"48px",outlined:"",tile:""},on:{click:e.googleLogin}},[r("img",{staticClass:"button-logo-img mr-4",staticStyle:{height:"24px"},attrs:{src:"https://madeby.google.com/static/images/google_g_logo.svg"}}),e._v("Googleアカウントでログイン\n        ")]),e._v(" "),r("v-btn",{staticClass:"fill-width text-capitalize caption mt-5",staticStyle:{"border-color":"#979797"},attrs:{height:"48px",outlined:"",tile:"",loading:e.loadingTestLogin,disabled:e.loadingTestLogin},on:{click:e.testLogin}},[r("v-icon",[e._v("mdi-account-arrow-left-outline ")]),e._v(" テストユーザーでログイン\n        ")],1)],1),e._v(" "),r("v-divider"),e._v(" "),r("div",{staticClass:"separator separator_login_page"},[r("div",{staticClass:"middle_separator"},[e._v("または")])]),e._v(" "),r("v-card-text",[r("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.login(t)}}},[r("v-text-field",{attrs:{"prepend-inner-icon":"mdi-email-outline",label:"メールアドレスを入力する",rules:[e.validRules.emailRules.required,e.validRules.emailRules.regex],clearable:""},model:{value:e.getUserEmail,callback:function(t){e.getUserEmail=t},expression:"getUserEmail"}}),e._v(" "),r("v-text-field",{attrs:{type:e.showPassword?"text":"Password","prepend-inner-icon":"mdi-lock-outline","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",label:"パスワードを入力する(6文字以上)",rules:[e.validRules.passwordRules.required,e.validRules.passwordRules.regex],counter:"72"},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.getUserPassword,callback:function(t){e.getUserPassword=t},expression:"getUserPassword"}}),e._v(" "),r("v-btn",{staticClass:"fill-width",attrs:{text:"",color:"primary accent-4"},on:{click:e.openResetPassword}},[e._v("\n            パスワードを忘れた方はこちら")]),e._v(" "),r("v-card-actions",[r("v-btn",{attrs:{color:"primary",loading:e.loadingLogin,disabled:e.loadingLogin},on:{click:e.login}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-login-variant")]),e._v("ログイン\n            ")],1),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"success"},on:{click:e.openCreateUser}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-account-plus")]),e._v("新規作成はこちら\n            ")],1),e._v(" "),r("CreateUser",{attrs:{createUserDialog:e.createUserDialog},on:{"close-create-user":e.closeCreateUser}}),e._v(" "),r("ResetPassword",{attrs:{resetPasswordDialog:e.resetPasswordDialog},on:{"close-reset-password":e.closeResetPasswprd}})],1)],1)],1)],1)],1)],1)}),[],!1,null,"24afb7ee",null);t.default=component.exports;P()(component,{CreateUser:r(528).default,ResetPassword:r(529).default}),P()(component,{VApp:C.a,VBtn:R.a,VCard:y.a,VCardActions:V.a,VCardText:V.b,VCardTitle:V.c,VCol:k.a,VDivider:D.a,VForm:E.a,VIcon:O.a,VSpacer:j.a,VTextField:$.a})}}]);