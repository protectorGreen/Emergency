
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/mydata/mydata","pages/login/login","pages/login/reg","pages/leftwindow/leftwindow","pages/index/mydata/modifypwd","pages/index/mydata/deductionnotice","pages/index/mydata/appinfo","pages/index/mydata/applyJoinH","pages/index/mydata/headquantersInfo","pages/index/mydata/emergencyplanInfo","pages/index/mydata/performanceInfo","pages/index/mydata/imchat","pages/index/mydata/pdfview","pages/index/mydata/sendofficialdoc","pages/index/mydata/testmapn","pages/index/mydata/testmap","pages/index/mydata/pdfview1","pages/index/mydata/chat","pages/index/mydata/deduction","pages/index/mydata/deductionnew","pages/index/mydata/applyseat","pages/index/mydata/modifyequipment","pages/index/mydata/dispatchequipment"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","pageOrientation":"landscape"},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Emergency","compilerVersion":"3.1.22","entryPagePath":"pages/login/login","entryPageQuery":"?abc","realEntryPagePath":"pages/index/mydata/mydata","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/mydata/mydata","meta":{"isQuit":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"用户信息","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/login/reg","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/leftwindow/leftwindow","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/modifypwd","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/deductionnotice","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"推演通知","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/appinfo","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"使用简介","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/applyJoinH","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"加入指挥部","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/headquantersInfo","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"指挥部信息","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/emergencyplanInfo","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"预案信息","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/performanceInfo","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"推演信息","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/imchat","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"imChat","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/pdfview","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"pdfView","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/sendofficialdoc","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"公文发送","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/testmapn","meta":{"isNVue":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/testmap","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/pdfview1","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/chat","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/deduction","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/deductionnew","meta":{"isNVue":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/applyseat","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/modifyequipment","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/mydata/dispatchequipment","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
