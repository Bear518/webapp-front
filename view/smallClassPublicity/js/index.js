$(function(){
    $('#j_mxxy_list_wrap').on('mouseover','li',function(){
        var $this=$(this), index=$(this).index();
        $this.addClass('opacity').siblings().removeClass("opacity");
        $(".mxxy-intro-box .mxxy-intro").eq(index).show().siblings().hide();
    });

    $('body').on('click','.j_btn_qq',function(){
        $("#Js_QQWPA").trigger("click");
    });
    $('body').on('click','.navbar-nav li',function(){
        var $this=$(this),index=$this.index();
        activeBar(index);
    });
    var isInView=function($el){
        var $win = $(window);
        var itemOffsetTop = $el.offset().top;
        var itemOuterHeight = $el.outerHeight();
        var winHeight = $win.height();
        // $win.scroll(function () {
            var winScrollTop = $win.scrollTop();
            if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop-winHeight)) {
                return true;
            } else {
                return false;
            }
        // })
    },activeBar=function(i){
        console.log('activeBar'+i);
        $('.navbar-nav').find('.active').removeClass('active');
        $('.navbar-nav li').eq(i).addClass('active');
    },isActiveBar=function(i){
        return $('.navbar-nav li').eq(i).hasClass('active');
    },notInViewToActiveEl=function(){
        var index=$('.navbar-nav li.active').index();
        if(index==5||index==6){
            index=7;
        }
        if(index==4){
            index=6;
        }
        console.log('notInViewToActiveEl'+index);
        var $el=$sections.eq(index);
        return isInView($el);
    };
    var $sections=$('body section'),num=0;
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".top-fixed").addClass("top-nav-bg");
        } else {
            $(".top-fixed").removeClass("top-nav-bg");
        }
            num++;
            console.log('scroll events num'+num);
            $sections.each(function(i,el){
                // console.log(el);
                var index=i;
                if(i==4||i==5){
                    index=3;
                }
                if(i==7){
                    index=6;
                }
                if(i==6){
                    index=4;
                }
                if(!notInViewToActiveEl()&&isInView($(el))&&!isActiveBar(index)){
                    activeBar(index);
                }
            });
    });
    new WOW({ mobile: false }).init();
});


var marketingModule={
    bindEvents:function(){
        var self=this;
        $('#j_marketing_overlays').on('click','.j_btn_call',function(){
            var $this=$(this),$wrap=$('#j_marketing_overlays'),tel=$wrap.find('.j_tel').val();
            if(checkTel()&&!self.disabledCall){
                self.disabledCall=true;
                $this.html('正在进行通话');
                console.log('正在进行通话');
                self.makeCall(tel,$this);
                $wrap.find('.j_tel').val('');
                var st=setTimeout(function(){
                    $this.html('免费通话咨询');
                    self.disabledCall=false;
                    clearTimeout(st);
                },1000*20);
            }
        });
        $('#contact').on('click','.j_btn_call',function(){
            var $this=$(this),$wrap=$('#contact'),tel=$wrap.find('.j_tel').val();
            if(checkTel1()&&!self.disabledCall){
                self.disabledCall=true;
                $this.html('正在进行通话');
                console.log('正在进行通话');
                self.makeCall(tel,$this);
                $wrap.find('.j_tel').val('');
                var st=setTimeout(function(){
                    $this.html('免费通话咨询');
                    self.disabledCall=false;
                    clearTimeout(st);
                },1000*20);
            }
        });

        $('.zytp-btn').on('click',function(){
            checkTel();
        });

        $('.box-fix').on('click','.tel',function(e){
            $('.zytp-index').show();
        });
        $('.zytp-index').on('mouseleave',function(e){
            $('.zytp-index').hide();
        });
        function Timeout(){
            $(".tel-box-hint").show();
            setTimeout(function(){
                $(".tel-box-hint").hide();
            },1000);
        };
        function checkTel(){
            var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            var isMob=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[023456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            var value=$('#j_marketing_overlays').find(".j_tel").val().trim();
            if(isMob.test(value)||isPhone.test(value)){
                return true;
            }
            else{
                Timeout();
                return false;
            }
        };
        function checkTel1(){
            var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            var isMob=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[023456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            var value=$('#contact').find(".j_tel").val().trim();
            if(isMob.test(value)||isPhone.test(value)){
                return true;
            }
            else{
                /*Timeout();*/
                return false;
            }
        };
    },
    makeCall:function(tel,$this){
        $.ajax({
            type:'get',
            url:'http://121.41.74.120/command?Action=Webcall&Account=N00000010053&PBX=sh.ali.5.3&Timeout=20&ServiceNo=02111110000&Exten='+tel,
            success:function(result){
                mainModule.log('电话接通数据',result);
                if(result.Succeed){
                    $this.html('免费通话咨询');
                }
            }
        })
    },
    init:function(){
        this.bindEvents();
    }
};
marketingModule.init();
var mainModule= {
    judgeUri: function (uriList) {
        //ie可能不支持该console，防止js保错
        window.console = window.console || {};
        window.console.info = window.console.info || this.noop;
        window.console.error = window.console.error || this.noop;
        window.console.log = window.console.log || this.noop;
        var uriList = uriList || this.uri, host = window.location.host;
        for (var i in uriList) {
            if (/127|800|localhost/.test(host)) {
                uriList[i] = '/skillbridge-customer/' + uriList[i];
            } else {
                uriList[i] = '/skillbridge/' + uriList[i];
            }
        }
        var href = window.location.href;
        if (/127|8000|8001|dev|192|localhost/.test(href)) {

        } else {
            window.console.log = function () {
                return false;
            }
            window.console.info = function () {
                return false;
            }
            window.console.error = function () {
                return false;
            }
        }
        // getCourse:'course/search'
    },
    uri: {
        getWXAccessToken:'careerAnchor/getAccesToken',
        getWXSignature:'careerAnchor/getSignForWeixin',
        getJSApiTicket:'careerAnchor/getJsApiTicket',
    },
    noop: function () {
    },
    wxShareConfig:function(){
        var access_token,jsapi_ticket,signature,timestamp,self=this;
        var getWXSignature=function(jsapi_ticket,noncestr,timestamp,url){
            $.ajax({
                type:'get',
                data:{jsapi_ticket:jsapi_ticket,noncestr:noncestr,timestamp:timestamp,url:url},
                url:mainModule.uri.getWXSignature,
                success:function(result){
                    self.log('生成签名接口返回',result);
                    self.httpInterceptor(result,{success:function(result){
                        wxConfig('',timestamp,'',result);
                    }})
                }
            })
        };
        // var getTicket=function(access_token){
        //     $.ajax({
        //         type:'get',
        //         async:false,
        //         data:{type:'jsapi',access_token:access_token},
        //         url:'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
        //         success:function(result){
        //             self.log('请求获得jsapi_ticket',result);
        //             self.httpInterceptor(result,{success:function(){
        //                 jsapi_ticket=result.content.ticket;
        //             }});
        //         }
        //     })
        // };
        $.ajax({
            type:'get',
            async:false,
            url:mainModule.uri.getJSApiTicket,
            success:function(result){
                // console.log(result);
                self.log('请求获得jsapi_ticket',result);
                self.httpInterceptor(result,{success:function(result){
                    var result=JSON.parse(result);
                    timestamp=Date.parse(new Date())/1000;
                    getWXSignature(result.ticket,'sdfksdjflsdjf',timestamp,location.href);
                    // alert(result.ticket);
                }})
            }
        });
        var wxConfig=function(appId,timestamp,nonceStr,signature){
            var si=setInterval(function(){

                if(wx&&signature){
                    // alert(signature);
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx156fb519219f6567', // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: 'sdfksdjflsdjf', // 必填，生成签名的随机串
                        signature:signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function(){
                        // alert('验证成功ready');
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        var shareObj=self.getWXShareObjByPage(),desc=shareObj.desc,link=shareObj.url,title=shareObj.title;
                        link=self.addSearch(shareObj);
                        wx.onMenuShareTimeline({
                            title: title, // 分享标题
                            link: link, // 分享链接
                            imgUrl: shareObj.imgUrl, // 分享图标
                            success: function () { 
                                // 用户确认分享后执行的回调函数
                                // alert('用户确认分享后执行的回调函数');
                                // self.handleShareAfterSuccess();
                            },
                            cancel: function () { 
                                // 用户取消分享后执行的回调函数
                                // alert('用户取消分享后执行的回调函数');
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接
                            imgUrl: shareObj.imgUrl, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () { 
                                // 用户确认分享后执行的回调函数
                                // alert('用户确认分享后执行的回调函数');
                                // self.handleShareAfterSuccess();
                            },
                            cancel: function () { 
                                // 用户取消分享后执行的回调函数
                                // alert('用户取消分享后执行的回调函数');
                            }
                        });
                        wx.onMenuShareQQ({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接
                            imgUrl:shareObj.imgUrl, // 分享图标
                            success: function () { 
                               // 用户确认分享后执行的回调函数
                               // alert('用户确认分享后执行的回调函数');
                               // self.handleShareAfterSuccess();
                            },
                            cancel: function () { 
                               // 用户取消分享后执行的回调函数
                               // alert('用户取消分享后执行的回调函数');
                            }
                        });
                    });
                    wx.error(function(res){
                        // alert('config信息验证失败');
                        mainModule.log('config信息验证失败',res);
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    });
                    // alert('me');

                    clearInterval(si);
                }
            },1000);
        }
    },
    getWXShareObjByPage:function(config){
        var href=location.href,link=href,
            desc='Unity3D、VR游戏开发工程师，4个月小白变大神',
            activityCode='PRACTICAL-CLASS',imgUrl='http://skillbridge.cn/view/smallClassPublicity/img/pic300.jpg';

        var result=this.shareConfig||{desc:desc,url:link,title:document.title,activityCode:activityCode,imgUrl:imgUrl};
        // config&&(result=config);
        // this.shareConfig=result;
        return result;
    },
    setWXShareObj:function(config){
        this.shareConfig=config;
    },
    log:function(detail,object,isError){
        if(isError){
            console.log('%c '+detail+':','color:#d9534f;font-size:1.5em');
            console.error(object||'');
        }else{
            console.log('%c '+detail+':','color:#5cb85c;font-size:1.5em');
            console.info(object||'');
        }
        
    },
    httpInterceptor:function(result,params){
        params=params||{};
        if(result.status=='SUCCESS'){
            if(result.content){
                result.content.list&&(result.content.list.total=result.content.total);
                result.content.rows&&(result.content.rows.total=result.content.total);
                result.content.courseMap&&(result.content.courseMap.rows.total=result.content.courseMap.total);
                params.success&&params.success.call(this,result.content.list||result.content.rows||(result.content.courseMap&&result.content.courseMap.rows)||result.content,params.callback);
            }else{
                params.success&&params.success.call(this,result,params.callback);
            }
        }else{
            params.error&&params.error.call(this,result);
            if(/未登录/.test(result.message)){
                params.notLoginCallback&&params.notLoginCallback(result);
            }
        }
    },
    handleShareAfterSuccess:function(){
        var href=location.href;
        if(/zycp/.test(href)){
            commonModule.shareFreeVip();
        }
    },
    isInWxApp:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return true;
        }
    },
    getQueryValueByName:function(name){
        var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return undefined;
        }
        return result[1];
    },
    addSearch:function(shareConfig){
        var isMobile=/mobile/gi.test(window.navigator.userAgent),terminate_type=isMobile?'MOBILE':'PC';
        var chanelCode=mainModule.getQueryValueByName('chanelCode'),searchObj={
            access:'SHARE',
            activityCode:shareConfig.activityCode,
            terminate_type:terminate_type
        },searchArr=[];
        chanelCode&&(searchObj.chanelCode=chanelCode);
        for(var key in searchObj){
            searchArr.push(key+'='+encodeURIComponent(searchObj[key]));
        }
        if(shareConfig.url.indexOf('?')>-1){
            return shareConfig.url+'&'+searchArr.join('&');
        }
        return shareConfig.url+'?'+searchArr.join('&');
    },
    init:function(){
        mainModule.judgeUri();
        mainModule.isInWxApp()&&this.wxShareConfig();
    }
};
(function(){
    if(mainModule.isInWxApp()){
        var wx=document.createElement('script');
        wx.src='//res.wx.qq.com/open/js/jweixin-1.0.0.js';
        var s=document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wx,s);
    }
})();
mainModule.init();


