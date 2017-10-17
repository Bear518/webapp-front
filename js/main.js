var mainModule={
	includeFucInit:function(){
		var self=this;
		$('div[include]').each(function(index,el){
	       var 	$this=$(this),
	       		includeStr=$this.attr('include');
	       $.ajax({
	        type:'get',
	        async:false,
	        url:$this.attr('include')+'?rad='+Math.random()*8,
	        success:function(dom){
	            $this.html(dom);
	            $this.removeAttr('include');
	            console.log(includeStr+'loaded');
	            if(/footer/.test(includeStr)){
	            	console.log('footer module loaded');
	            	self.includeFucInit();
	            }
	        }
	       })
		})
	},
	judgeUri:function(uriList){
		//ie可能不支持该console，防止js保错
		window.console=window.console||{};
		window.console.info=window.console.info||this.noop;
		window.console.error=window.console.error||this.noop;
		window.console.log=window.console.log||this.noop;
		var uriList=uriList||this.uri,host=window.location.host;
		for(var i in uriList){
			if(/127|800/.test(host)){
				uriList[i]='/skillbridge/'+uriList[i];
			}else{
				uriList[i]='/skillbridge/'+uriList[i];
			}
		}
		var href=window.location.href;
		if(/127|800|dev|192|226/.test(href)){
            
		}else{
			window.console.log=function(){
				return false;
			}
			window.console.info=function(){
				return false;
			}
			window.console.error=function(){
				return false;
			}
		}
	},
	uri:{
		indexCourseList:'course/indexlist',
		getCourse:'course/search',
		searchCourseSecondLevel:'course/searchByIndustryIdAndDirectionId',
		searchCourseThreeLevel:'course/searchByIndustryIdAndDirectionIdAndSortId',
		// getChapterByCourseId:'course/courseChapter/search',
        getChapterByCourseId:'course/courseChapter/chapterList',
		getPlayCode:'ccvedio/vedioPalyCode/',
		getNotes:'course/note/search',
		addNotes:'course/note/add',
		delNotes:'course/note/del/',
		updateNotes:'course/note/update',
		getComment:'course/courseCommon/list',
		addComment:'course/courseCommon/add',
		getUserInfo:'user/currentuser',
		getClassLearnedList:'user/courseplan/chapter/learnedlist',
		setClassUndone:'user/courseplan/chapter/undone',
		setClassDone:'user/courseplan/chapter/done',
		getMyNoteCourses:'course/note/noteMenue',
		getMyCourseNotes:'course/note/noteList',
		updateUserInfo:'user/updateInfo',
		addFeedback:'user/feedback',
		updateUserPhoto:'user/updateIcon',
		likeCourse:'course/like/add',
		getBreadNavigate:'course/breadNavigation/',
		getClassDetail:'course/courseChapter/info',
		confirmPwd:'user/safe/confirmPassword',
		sendEmailCode:'base/emailCaptcha',
		sendTelCode:'base/smsCaptchaNoCaptcha',
        sendTelCodeIncludeVeri:'/base/smscaptcha',
		updateTel:'user/safe/updateMobilephone',
		updateEmail:'user/safe/updateEmail',
		updatePwd:'user/updatePassword',
		getMyCoursePlan:'user/courseplan/userCoursePlanList',
		delMyCoursePlan:'user/courseplan/del',
		doRecord:'learingRecord/doRecord',
		getZytpList:'jobMap/list',
		getZytpLx:'jobMap/mapRoute/jobMapRoute',
		joinZytpPlan:'jobMap/jobMapPlane/joinPlane',
		cancelZytpPlan:'jobMap/jobMapPlane/cancelPlane',
		getZytpDetail:'jobMap/jobMapInfo/',
		getZytpMapCourse:'jobMap/mapRoute/routesCourse',
		getZytpStudyState:'jobMap/studyStatus/',
		getMyZytpList:'jobMap/userJobMapList',
		getXtxx:'message/messageList',
		delXtxx:'Message/delMessage/',
		getMyPieData:'user/learningData/pie',
		getMyLineData:'user/learningData/graph',
		loginNow:'oauthLogin/weixin/firstLogin',
		bindAccount:'oauthLogin/weixin/bindAccout',
		wxLogin:'oauthLogin/weixin/weixinLoginUrl',
		qqLogin:'oauthLogin/qq/authorize',
		getMyJobCollection:'job/collection/jobCollectionList',
		cancelMyJobCollection:'job/collection/cancelCoolection',
		getJobDetail:'job/jobInfo',
		jobCollect:'job/collection/doCoolection',
		qqBind:'oauthLogin/qq/bindAuthorize',
		queryUserBindTypes:'oauthLogin/qq/bindOAuthUsersOfCurrentUser',
		wxBind:'oauthLogin/weixin/bindWeixinUrl',
		unBindThBind:'oauthLogin/weixin/unbindAccount',
		setPwd:'user/setPassword',
		applyRecords:'job/applyRecords',
		delApplyedRecord:'job/deleteApplyRecords',
		getMyPayOrderList:'order/myOrderList',
		getCourseInfo:'course/info/',
		cancelOrder:'order/common/cancelOrder',
		getPreviewPlayCode:'ccvedio/preview/',
		rightList:'vip/rightList',
		saveCareerAnchor:'careerAnchor/save',
		getCareerAnchorList:'careerAnchor/careerAnchorList',
		getMyCareerAnchorInfo:'careerAnchor/getPersonCareerAnchor',
		getCACourseRecommand:'careerAnchor/courseRecommend',
		getCAIndustryDirectionRecommand:'careerAnchor/getCareerAnchorDirection',
		getCAJobRecommand:'careerAnchor/jobRecommend',
		generateQRCode:'careerAnchor/generateQrCode',
		countCA:'careerAnchor/addUp',
		getCACount:'careerAnchor/count',
		shareFreeVip:'vipUser/shareGiveVip',
		getUserId:'activity/generateActivityLink',
		getInvitedUserList:'activity/userInviteUserList',
		register:'activity/activityRegister',
        getVipRecord:'vip/vipRecord',
        checkAccount:'activity/validateRegisterInfo',
        getDirectionList:'course/directionList',
        searchCourse:'course/search',
        getVeriCodeImg:'base/captcha',
        getMyNotice:'inform/myInform',
        delNoticeById:'inform/deleteInform/',
        clearNotice:'inform/clearnAll',
        readNotice:'inform/readAll',
        readNoticeById:'inform/readInform/',
        hasNotice:'inform/myInformSummary',
        courseCollectionList:'user/courseCollection/myCourseCollection',
        userVipInfo:'vipUser/userVipInfo',
        getjobList:'/job/applyRecords',
        applyingJob:'/user/archive/detail',
        jobRecommendByCourse:'job/courseJobRecommend',
        getByCode:'dictionary/getByCode',
        getMapCollectionList:'jobMap/collection/myJobMapCollection',
        delMapCollection:'jobMap/collection/delete',
        getMapLearningList:'jobMap/userJobMapList',
        getMapPlayCode:'ccvedio/jobMapVedio/',
        getMapRecommendJob:'jobMap/recommendJob',
        getHomeJobMap:'jobMap/indexJobMapList',
        getHomeRightStatistics:'course/indexCount',
        getClassInfo:'class/currentClass',
        applyClass:'class/signUp',
        // getClassExamineScore:'class/classExamineScore',
        getClassExamineScore:'homework/myWorklist',
        alipay:'order/common/alipay',
        wxpay:'order/common/weixinPay',
        // placeOrderByClass:'order/common/generateClassOrder',
        placeOrderByClass:'order/common/generateJobMapOrder',
        wakeSession:'ccvedio/doNothing',
        getMapInfoByClassId:'class/classInfo',
        getMyCoupons:'userCoupon/myCoupons',
        obtainCoupon:'userCoupon/receiveCoupon',
        getCouponInfo:'coupon/info',
        exchangeCoupon:'userCoupon/exchangeCoupon',
        matchedCoupon:'userCoupon/matchedCoupons',
        orderCourse:'order/common/generateCourseOrder',
        getRecommanedMapByCourse:'jobMap/jobMapRecommend/',
        completeAccountInfo:'oauthLogin/weixin/createAndBindAccount',
        uploadHomeWorkFile:'homework/homeWorkUploadSign',
        getHomeWorkDetail:'homework/homeWorkDetail',
        downloadHomeWorkFile:'homework/downloadHomeWork'
	},
	noop:function(){},
	getQueryValueByName:function(name){
		var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {
			return undefined;
		}
		return result[1];
	},
	setCookie:function(name,value,forever)
	{
		//islogin mainModule.setCookie('islogin',true);
		var Days = 30;
		var exp = new Date();
        this.rememberMe=this.rememberMe||this.getCookie('rememberMe');
        if(!this.rememberMe){
		  exp.setTime(exp.getTime() + 30*60*1000);
        }else{
          exp.setDate(exp.getDate()+7);
        }
        if(forever){
            exp.setYear(exp.getFullYear()+2);
        }
		document.cookie = name + "="+ escape (value||'') + ";expires=" + exp.toGMTString()+";path=/";
	},
	getCookie:function(name) {
		//islogin mainModule.getCookie('islogin');
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	},
	delCookie:function(name)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
	},
	initCookie:function(){
		if(this.getCookie('islogin')){
			this.setCookie('islogin',true);
			this.setCookie('username',this.getCookie('username'));
			this.setCookie('photo',this.getCookie('photo')||'/img/info/setinfo/1.png');
		}
        if(this.getCookie('rememberMe')){
            this.setCookie('rememberMe',true);
        }
	},
	judgeIslogined:function(){
        if(this.getCookie('islogin')){
        	$('#j_reg_login_wrap').hide();
            $('#j_logined_wrap').css('display','inline-block');
            $('#j_login_email').css('display','inline-block');
            console.log('has logined');
            return true;
        }else{
            $('#j_reg_login_wrap').css('display','inline-block');
            $('#j_logined_wrap').hide();
            $('#j_login_email').hide();
            console.log('is not login');
            return false;
        }
	},
	isLogined:function(isPopBoxShow){
        if(this.getCookie('islogin')){
        	return true;
        }
        if(isPopBoxShow){
        	$('.login').trigger('click');
        }
        return false;
	},
	closeLoginOrRegPopBox:function(){
		$('.cls').trigger('click');
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
	popLoginBox:function(){
		var href=window.location.href;
		$('.login_dl').show();
			if(/info/.test(href)){
            	$('.loginbg').height($(document).height()-150).css('top',150);
        	}else{
            	$('.loginbg').height($(document).height())
    	}
	},
	bindGlobalEvents:function(){
		var self=this,href=window.location.href;
        /*点 导航登录-显示登录弹框*/
        $('.login').click(function(){
            self.popLoginBox();
        })
        /*登录弹框关闭*/
        $('.cls').click(function(){
        	// mainModule.isgoxuexipage=false;
        	if(/info/.test(href)&&!mainModule.getCookie('islogin')){
        		window.location.reload();
        	}
        	if(/wdjl/.test(href)&&!mainModule.getCookie('islogin')){
        		window.location.href='/';
        	}
            $('.login_dl').hide();      
        })
        /*显示注册弹框*/
        $('.register').click(function(){
            $('.register_dl').show();   
            $('.loginbg').height($(document).height())
			$('.yzm_img').attr('src',self.uri.getVeriCodeImg+'?'+Math.random());
			$('#regMailPanel .input').val("");
			$('#regPhonePanel .input').val("");			
			$(".zcbox_phone .err").hide(); $(".zcbox_mail .err").hide();
			$(".zcbox li").removeClass("focus");
        })
        /*注册弹框关闭*/
        $('.cls').click(function(){
        	if(/info/.test(href)&&!mainModule.getCookie('islogin')){
        		window.location.reload();
        	}
            $('.register_dl').hide();       
        });
        $('.j_thlogin_wrap').on('click','.wx',function(){
        	var href=self.uri.wxLogin;
        	self.A=window.open(href,"wechatLogin", "width=450,height=650,top=350,left=450,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
        });
        $('.j_thlogin_wrap').on('click','.qq',function(){
        	var href=self.uri.qqLogin;
        	self.A=window.open(href,"qqLogin", "width=450,height=650,top=350,left=450,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
        });
        $('.j_thlogin_wrap').on('click','.sina',function(){
        	var href='https://open.weixin.qq.com/connect/qrconnect?appid=wx0ee128801b8f6f8a&redirect_uri=www.skillbridge.cn/oauthLogin/weixin/userAuthorizeResult&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
        	self.A=window.open(href,"sinaLogin", "width=450,height=650,top=350,left=450,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
        });
	},
	httpInterceptor:function(result,succFunc,errFunc,callback){
        if(result.status=='SUCCESS'){
            if(result.content){
                result.content.list&&(result.content.list.total=result.content.total);
                result.content.rows&&(result.content.rows.total=result.content.total);
                result.content.courseMap&&(result.content.courseMap.rows.total=result.content.courseMap.total);
                succFunc&&succFunc.call(this,result.content.list||result.content.rows||(result.content.courseMap&&result.content.courseMap.rows)||result.content,callback);
            }else{
                succFunc&&succFunc.call(this,result,callback);
            }
        }else{
            errFunc&&errFunc.call(this,result);
            if(/未登录/.test(result.message)&&!result.skipCheckLogin){
            	this.popLoginBox();
            }
        }
    },
    formattime:function(totalseconds){
        var hours=Math.floor(totalseconds/3600),
            minutes=Math.floor((totalseconds%3600)/60),
            seconds=(totalseconds%3600)%60;
        var time='';
        if(hours>0){
            time+=hours+'小时 ';
        }
        if(minutes>0){
            time+=minutes+'分钟 ';
        }
        if(seconds>0&&minutes<1){
            time+=seconds+'秒';
        }
        // console.log(totalseconds);
        return time||totalseconds;
    },
    formatBirthdate:function(date){
        var date=new Date(date),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            datetime=year+'-'+month+'-'+day;
        return datetime;
    },
    formatFulldate:function(date){
        var date=date&&new Date(date)||new Date(),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            hours=date.getHours(),minutes=date.getMinutes(),seconds=date.getSeconds();
            month<10&&(month='0'+month);
            day<10&&(day='0'+day);
            datetime=year+'-'+month+'-'+day;

            if(hours<10){hours='0'+hours}
            if(minutes<10){minutes='0'+minutes}
            if(seconds<10){seconds='0'+seconds}
            var time=hours+':'+minutes+':'+seconds;
        return {date:datetime,time:time};
    },
    formatDate:function(date){
        var date=date&&new Date(date)||new Date(),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            hours=date.getHours(),minutes=date.getMinutes(),seconds=date.getSeconds();
            month<10&&(month='0'+month);
            day<10&&(day='0'+day);
            datetime=year+'-'+month+'-'+day;

            if(hours<10){hours='0'+hours}
            if(minutes<10){minutes='0'+minutes}
            if(seconds<10){seconds='0'+seconds}
            var time=hours+':'+minutes+':'+seconds;
        return {date:datetime,time:time};
    },
    formatToDotSplitDate:function(date){
        var date=date&&new Date(date)||new Date(),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            hours=date.getHours(),minutes=date.getMinutes(),seconds=date.getSeconds();
            month<10&&(month='0'+month);
            day<10&&(day='0'+day);
            datetime=year+'.'+month+'.'+day;
            return datetime;
    },
    remainDays:function(date){
    	var remainDate=date-Date.now();
    	return Math.floor(remainDate/(24*3600*1000))||0;
    },
    assertCookieExpired:function(result,isPopBoxShow){
        if(/未登录/.test(result.message)){
            this.delCookie('islogin');
            this.judgeIslogined();
            if(isPopBoxShow){
            	//这里轮询登陆模块是否已加载
				// var st=setInterval(function(){
                    if($('.login_dl').length>0){
                        mainModule.popLoginBox();
                        // clearInterval(st);
                    }
                // },1000);
            }
            this.locationToDefaultPageIfNotLogin();
        }
    },
    locationToDefaultPageIfNotLogin:function(){
        var href=window.location.href;
        if(/info|wdjl|system|vip/.test(href)&&!/serv|help|intro/.test(href)){
            window.location.href='/';
        }
        if(/xb_pay/.test(href)){
            var jobMapId=mainModule.getQueryValueByName('jobMapId');
            jobMapId?(window.location.href='/view/zytp/detail.html?id='+jobMapId):(window.location.href='/view/zytp/list.html');
        }
    },
    /*tel,nickname,imgsrc,email,isvip*/
    initUserState:function(info){
        info.mobilephone&&(info.mobilephone=info.mobilephone.substr(0,4)+'***'+info.mobilephone.substr(7));
        info.email&&(info.email=info.email.substr(0,1)+'***'+info.email.substr(info.email.indexOf('@')));
        this.rememberMe=info.rememberMe;
        this.setCookie('rememberMe',true);
		this.setCookie('islogin',true);
		this.closeLoginOrRegPopBox();
		this.judgeIslogined();
		this.setCookie('username',info.mobilephone);
		this.setCookie('nickname',info.nickname);
		this.setCookie('email',info.email);
		this.setCookie('photo',info.icon||this.getCookie('photo')||'/img/info/setinfo/1.png');
		this.setCookie('isvip',info.vip);
        //banner下拉信息头像、用户名赋值
		$(".j_username").html(info.nickname||info.mobilephone||info.email||'非法用户');
        $('.j_user_photo').attr('src',info.icon||this.getCookie('photo'));
        //showname弥补老版本banner用户名显示
        window.showname&&showname();
        //课程相关赋值
        if(info.courseId){
            var courseName=decodeURIComponent(info.courseName);
            $('.j_menu_course_name').html('<i></i>'+info.courseName);
            $('.j_menu_chapterName_name').html(info.chapterName);
            $('.j_menu_course_continue').attr('href','/view/course/play.html?courseId='+info.courseId+'&chapterId='+info.chapterid+'&courseName='+courseName);
            $('.j_menu_course_history').show();
        }else{
            $('.j_menu_course_history').hide();
        }
        if(!info.mobilephone&&!info.email){
            this.noAccountBound=true;
        }
    },
    passportReg:{
        pwd: /^.*[A-Za-z0-9_\.-]+.*$/,
        email: /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/,
        phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/,
    },
    setTimeFadeOut:function($el){
        var st=setTimeout(function(){
        	$el.fadeOut();
        	clearTimeout(st);
        },2000);
    },
    testEmail:function(email,$err_sp){
        var email=email;
        if(email.trim()==''){
            $err_sp.html('请填写邮箱号码').fadeIn();
            this.setTimeFadeOut($err_sp);
            return false;
        }
        if(!this.passportReg.email.test(email)){
            $err_sp.html('邮箱号码格式不正确').fadeIn();
            this.setTimeFadeOut($err_sp);
            return false;
        }else{
            $err_sp.empty();
            return true;
        }
    },
    testTel:function(tel,$err_sp){
        var tel=tel;
        if(tel.trim()==''){
            $err_sp.html('请填写手机号码').fadeIn();
            this.setTimeFadeOut($err_sp);
            return false;
        }
        if(!this.passportReg.phone.test(tel)){
            $err_sp.html('手机号码格式不正确').fadeIn();
            this.setTimeFadeOut($err_sp);
            return false;
        }else{
            $err_sp.empty();
            return true;
        }
    },
    testPwd:function(pwd,$err_sp){
        var isEmpty=pwd=='';
        if(isEmpty){
            $err_sp.html('密码不能为空').fadeIn();
            this.setTimeFadeOut($err_sp);
            return false
        }
        $err_sp.empty();
        return true;
    },
    inputFocusHide:function($input,type){
        var $err=$input.next('.err'),val=$err.html();
        if(val){
            $err.hide();
        }
        if(type){
            var $err=$input.parent().find('.error'),val=$err.html();
            if(val){
                $err.hide();
            }
        }
    },
    inputBlurShow:function($input){
        var $err=$input.next('.err'),val=$err.html();
        if(val){
            $err.show();
        }
    },
    disableBtn:function($this){
		$this.prop('disabled',true);
        var st=setTimeout(function(){
            $this.prop('disabled',false);
            clearTimeout(st);
        },2000);
    },
    toggleStrShowByIsLogined:function($el,beforeLoginStr,afterLoginStr){
        if(this.getCookie('islogin')){
            $el.val(afterLoginStr);
        }else{
            $el.val(beforeLoginStr);
        }
    },
    loopCheckIsLogined:function(callback){
    	var st=setInterval(function(){
            if(mainModule.getCookie('islogin')){
                callback&&callback();
                clearInterval(st);
            }   
        },100);
    },
    patchUriContext:function(){
	    var host = window.location.host;
	    if (/127|8000|8001|800/.test(host)) {
	        $._CACHEOBJ = {context: "/skillbridge"};
	    } else {
	        $._CACHEOBJ = {context: "/skillbridge"};
	    }
    },
    getSearchObj:function(){
        var search=window.location.search,searchObj={};
        if(search){
            search=search.substr(1);
            var arr=search.split('&');
            for(var i=0,ii=arr.length;i<ii;i++){
                var item=arr[i],keyvalueArr=item.split('='),key=keyvalueArr[0],value=keyvalueArr[1];
                searchObj[key]=value;
            }
        }
        return searchObj;
    },
    locationIncludeSearch:function(uri){
        window.location.href=uri+window.location.search;
    },
    shareUriAddSearch:function(shareConfig){
        var isMobile=/mobile/gi.test(window.navigator.userAgent),terminate_type=isMobile?'MOBILE':'PC';
        var chanelCode=mainModule.getQueryValueByName('chanelCode'),searchObj={
            access:'SHARE',
            activityCode:shareConfig.activityCode,
            terminate_type:terminate_type
        },searchArr=[],uri=shareConfig.url;
        chanelCode&&(searchObj.chanelCode=chanelCode);
        for(var key in searchObj){
            searchArr.push(key+'='+encodeURIComponent(searchObj[key]));
        }
        if(uri.indexOf('?')>-1){
        	return uri+'&'+searchArr.join('&');
        }
        return uri+'?'+searchArr.join('&');
    },
    showGlobalHintBar:function(msg){
        msg&&($('#j_global_hint_wrap').html(msg));
        $('#j_global_hint_wrap').addClass('hint-animation');
        var st=setTimeout(function(){
            $('#j_global_hint_wrap').removeClass('hint-animation');
        },2000);
    },
    showGlobalHintBarFast:function(msg){
        msg&&($('#j_global_hint_wrap').html(msg));
        $('#j_global_hint_wrap').css('visibility','visible');
        var st=setTimeout(function(){
            $('#j_global_hint_wrap').css('visibility','hidden');
        },2000);
    },
    checkAccount:function(account,type){
        var data={},isValid=false;
        // 0为手机号，1为email
        if(type){
            data.email=account;
        }else{
            data.mobilephone=account;
        }
        $.ajax({
            type:'post',
            data:data,
            async:false,
            url:mainModule.uri.checkAccount,
            success:function(result){
                mainModule.log('账号是否注册校验接口返回',result);
                var $btnSendSmsCode=$('#btnSendSmsCode'),
                    $j_get_vericode=$('.j_get_vericode');
                
                if(result.status=='SUCCESS'){
                    // 校验通过，没注册
                    isValid=true;
                    $btnSendSmsCode.length>0&&$btnSendSmsCode.attr('disabled',false);
                    $j_get_vericode.length>0&&$j_get_vericode.attr('disabled',false);
                }else{
                    $btnSendSmsCode.length>0&&$btnSendSmsCode.attr('disabled',true);
                    $j_get_vericode.length>0&&$j_get_vericode.attr('disabled',true);
                }
            }
        });
        return isValid;
    },
    createPage:function(self,total,$page_wrap,invokeFunc,rows){
        //self:要分页的对象，只要是包含isHasPaged字段，total：数据的总数，$page_wrap分页jquery对象，invokeFunc：回调函数，rows：每页的数量
        var rows=rows?rows:20;
        console.log('createPage:'+total);
        if(!self.isHasPaged){
            $page_wrap.hide();

        }
        if(total>rows&&!self.isHasPaged){
            var pageCount=(total%rows)==0?(total/rows):Math.floor(total/rows)+1;
            $page_wrap.off('click');
            $page_wrap.createPage({
                  pageCount:pageCount,
                  current:1,
                  isHasGoto:false,
                  backFn:function(p){
                      //单击回调方法，p是当前页码
                      console.log(p);
                      invokeFunc.call(self,p);
                  }
            });
            self.isHasPaged=true;
            $page_wrap.show();
        }
    },
    initVeriCodeImg:function(){
        //验证码图片初始化
        $('.j_vericode_img').attr('src',mainModule.uri.getVeriCodeImg+'?'+Math.random());
    },
    registerErrDealtWith:function(result,isEmail){
        var field=(result.content&&result.content[0].field),message=(result.content&&result.content[0].message)||result.message;
        if(isEmail){
            switch(field){
                // 图片验证码
                case 'captcha':
                    errnum(9);
                    $(".err9").text(message);
                    return false;
                break;
                // 邮箱验证码
                case 'emailCaptcha':
                    errnum(11);
                    $(".err11").text(message);
                    return false;
                break;
                default:
                    errnum(6);
                    $(".err6").text(message);
                    return false;
                break;
            }
        }else{
            switch(field){
                case 'smsCaptcha':
                    errnum(5);
                    $(".err5").text(message);
                    return false;
                break;
                default:
                    errnum(1);
                    $(".err1").text(message);
                    return false;
                break;
            }
        }
        
    },
    getUserInfo:function(){
        //全局获取用户信息接口
        var self=this;
        $.ajax({
            type:'get',
            url:self.uri.getUserInfo,
            success:function(result){
                mainModule.log('我的个人信息',result);
                if(result.status=='SUCCESS'){
                    self.userInfo=result.content;
                    self.initUserState(result.content);
                    self.initInfoBanner(result.content);
                    window.setInfoModule&&setInfoModule.renderUserInfo(result.content);
                    
                }else{
                    mainModule.assertCookieExpired(result);
                }
            }
        })
    },
    getCacheInfo:function(){
        //获取用户昵称
        var self=this,
            nickname=self.getCookie('nickname')||self.getCookie('username')||self.getCookie('email')||'非法用户',
            photo=self.getCookie('photo'),
            isvip=self.getCookie('isvip');
        return {nickname:nickname,photo:photo,isvip:isvip};
    },
    initInfoBanner:function(info){
        var nickname=info.nickname||info.mobilephone||info.email||'非法用户';
        var $wrap=$('#j_info_banner_wrap');
        $wrap.find('.j_user_photo').html(info.icon||this.getCookie('photo'));
        info.vip&&(nickname=nickname+'<i></i>');
        $wrap.find('.j_username_isvip').html(nickname);
        $wrap.find('.j_major').html(info.majorName||'未填写');
        $wrap.find('.j_desc').html(info.introduce||'就在线学习而言，重要的不是你花了多少钱，而是你投入了多少时间和精力。');
    },
    asyncInitInfoMenu:function(){
        //现根据cookie初始化menu信息的显示，怕info的请求时间长，infomenu初始化慢，形成响应误差，把原先footer js的代码放这里来了
        mainModule.judgeIslogined();
        window.showname&&window.showname();
        var photo=mainModule.getCookie('photo');
        $('.j_user_photo').attr('src',photo||'/img/info/setinfo/1.png');
        $(".j_username").html(this.getCookie('nickname')||this.getCookie('username')||this.getCookie('email')||'非法用户');
        if(this.getCookie('isvip')){
            $('.j_isvip').show();
        }
    },
    hasNotice:function(){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.hasNotice,
            success:function(result){
                self.log('是否有新的消息接口返回',result);
                result.skipCheckLogin=true;
                self.httpInterceptor(result,function(result){
                    console.log(result);
                   result.hasInform?($('.j_has_notice').show()):($('.j_has_notice').hide());
                })
            }
        })
    },
    version:'1.1.1',
    htmlEscape:function(str){
        str=str&&str.replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;');
        return str;
    },
	init:function(){
		this.judgeUri();
		//设置相对时间过期，跟后端同步
		this.initCookie();

		this.includeFucInit();
		this.bindGlobalEvents();
		//为了兼容登录注册模块uri
		this.patchUriContext();
        //初始化banner info的menu信息
        this.asyncInitInfoMenu();
        //双重赋值
        this.getUserInfo();
        //查询通知新信息
        this.hasNotice();
	}
};
mainModule.init();
