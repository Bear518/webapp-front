$(function() {
	/*tab切换*/
	$(".zc_tab a").click(function(){		
		$(this).addClass("on").siblings().removeClass("on");;
		var id = $(this).attr("id")
		$("."+id).show().siblings().hide();
	})
	/*弹框显示位置*/
	var top = ($(window).height() - 436)/2;  
	var scrollTop = $(document).scrollTop();   
	// $(".zcbox").css("top",top+scrollTop)
	$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
	/*验证码更新*/
	$('.yzm_a').click(function(){
	$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
	}); 
	/*短信验证码*/
	$('#btnSendSmsCode').click(function(){		
		yzm();		
	})
	/*注册-手机*/
	$("#regPhoneBtn").click(function(){
        regst();
        return false;
    });
	/*注册-邮箱*/
	$("#regEmailBtn").click(function(){
        regstmail();
        return false;
    });
	// 邮箱短信验证码
	$('#btnSendEmailSmsCode').click(function(){
		var email=$('#RegEmail').val(),imgCode=$('#CheckCode').val();
		if (email == "") {
			errnum(6);
			$(".err6").text("请输入邮箱");
			//$("#RegPhone").focus();
			return false;
		}
		if (!mainModule.passportReg.email.test(email)) {
			errnum(6);
			$(".err6").text("请输入正确的邮箱号");
			//$("#RegPhone").focus();
			return false;
		}
		if(imgCode == "") {
			lerrnum(9);
			$(".err9").text("请输入验证码");
			$("#CheckCode").focus();
			return false;
		}

		$.ajax({
			type:'get',
			data:{email:email,captcha:imgCode},
			url:mainModule.uri.sendEmailCode,
			beforeSend:function(){
				$("#btnSendEmailSmsCode").addClass("hui");			
				 $(".zcbox_phone .err").hide();
				 $(".zcbox_phone li").removeClass("focus");
			},
			success: function (yzm) {
			  	if(yzm.status== "SUCCESS")
				 {
					djs($("#btnSendEmailSmsCode")); 
				 }else
				 {
					 $("#btnSendEmailSmsCode").removeClass("hui");
					 var defaultInputNumber=6;
					 if(yzm.content[0].field=='captcha'){
					 	defaultInputNumber=9;
					 }
					 errnum(defaultInputNumber);
					 $(".err"+defaultInputNumber).text(yzm.content[0].message);
					 $('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random()); 
					 //$('#imgCC1').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
				 }
			}
		})
	});
	/*已有账号-登录*/
	$(".ljdl").click(function(){
        $('.register_dl').hide();  
		$('.login_dl').show();   
        $('.loginbg').height($(document).height())
    });
	
	bluript();
	if(mainModule.getCookie('islogin')){			
		// $("#tk_dl3").show();$('.loginbg').height($(document).height())
		window.location.href='/view/invite/index.html';
	}else{
		// $("#tk_dl3").hide();
	}
    $(".tkcls3").click(function(){
		//window.open("index.html",'_blank');
		window.location.href="index.html";
	})
	$(".courbtn").click(function(){
		//window.open("index.html",'_blank');
		window.location.href="index.html";
	})
	var invitename=mainModule.getQueryValueByName('name');
	$("#res .yel").text(invitename)
});
/*失去焦点事件*/
function bluript(){
	var UserName= $('#RegPhone');
	var UserPwd= $('#RegistPasswordPhone');
	//var UserPwd2= $('#ConfirmPasswordPhone');
	var CheckCode=$('#ValidatorCode');
	var $CheckCode1=$('#CheckCode1');
	var $emailCaptcha=$('#ValidatorEmailCode');
	var ipt= $('.zcbox_phone input');
	
	UserName.blur(function(){
		var val=$(this).val();
		if ($(this).val() == "") {
			errnum(1);
			$(".err1").text("请输入手机号");
			//$("#RegPhone").focus();
			return false;
		}
		if(/@/.test(val)){
			$('#RegEmail').val(val);
			$('#regPhonePanel').hide();
			$('#regMailPanel').show();
		}
		if ($(this).val().length!==11) {
			errnum(1);
			$(".err1").text("请输入正确的手机号");
			//$("#RegPhone").focus();
			return false;
		}
		if(!mainModule.checkAccount(val,0)){
			errnum(1);
			$(".err1").text("该手机号已注册");
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");
		}
		
	});
	UserPwd.blur(function(){
		if($(this).val() == "") {
			errnum(2);
			$(".err2").text("请输入登录密码");
			//$("#RegistPasswordPhone").focus();
			return false;
		}
		if($(this).val().length>16 || $(this).val().length<6 ) {
			errnum(2);
			$(".err2").text("请输入6-16位密码");
			//$("#RegistPasswordPhone").focus();
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");}
		})
	CheckCode.blur(function(){
		if($(this).val() == "") {
			errnum(5);
			$(".err5").text("请输入验证码");
			//$("#CheckCode1").focus();
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");}
		});
	$CheckCode1.blur(function(){
		if($(this).val() == "") {
			errnum(10);
			$(".err10").text("请输入验证码");
			//$("#CheckCode1").focus();
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");}
		});
	$emailCaptcha.blur(function(){
		if($(this).val() == "") {
			errnum(11);
			$(".err11").text("请输入邮箱验证码");
			//$("#CheckCode1").focus();
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");}
		});
	
	var UserName_m= $('#RegEmail');
	var UserPwd_m= $('#RegistPassword');
	//var UserPwd2_m= $('#ConfirmPassword');
	var CheckCode_m=$('#CheckCode');
	UserName_m.blur(function(){
		var val=$(this).val();
		if ($(this).val() == "") {
			errnum(6);
			$(".err6").text("请输入邮箱地址");
			//$("#RegEmail").focus();
			return false;
		}
		if(!/@/.test(val)){
			$('#RegPhone').val(val);
			$('#regMailPanel').hide();
			$('#regPhonePanel').show();
		}
		if(!mainModule.checkAccount(val,1)){
			errnum(6);
			$(".err6").text("该邮箱已注册");
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");}
	})
	UserPwd_m.blur(function(){
		if($(this).val() == "") {
			errnum(7);
			$(".err7").text("请输入登录密码");
			//$("#RegistPassword").focus();
			return false;
		}
		if($(this).val().length>16 || $(this).val().length<6 ) {
			errnum(7);
			$(".err7").text("请输入6-16位密码");
			//$("#RegistPassword").focus();
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");}
	})
	CheckCode_m.blur(function(){
		if($(this).val() == "") {
			errnum(9);
			$(".err9").text("请输入验证码");
			//$("#CheckCode").focus();
			return false;
		}
		else{$(".err").hide();
			$(".zcbox_main li").removeClass("focus");}
	})

}

//短信验证码
function yzm(){
	
	var UserName= $('#RegPhone').val();
	var CheckCode1= $('#CheckCode1').val();
		if (UserName == "") {
			errnum(1);
			$(".err1").text("请输入手机号");
			//$("#RegPhone").focus();
			return false;
		}
		if (UserName.length!==11) {
			errnum(1);
			$(".err1").text("请输入正确的手机号");
			//$("#RegPhone").focus();
			return false;
		}
		if(CheckCode1 == "") {
			lerrnum(10);
			$(".err10").text("请输入验证码");
			$("#CheckCode1").focus();
			return false;
		}
		$.ajax({
		type: "get",
		dataType: "json",
		url: $._CACHEOBJ.context+"/base/smscaptcha",
		data:{ "mobilephone":UserName,"business":1,"captcha":CheckCode1},
		beforeSend:function(){
			$("#btnSendSmsCode").addClass("hui");			
			 $(".zcbox_phone .err").hide();
			 $(".zcbox_phone li").removeClass("focus");
		},
		success: function (yzm) {
		  if(yzm.status== "SUCCESS")
		 {
			djs();
			 
		 }else
		 {
			 $("#btnSendSmsCode").removeClass("hui");
			 var defaultInputNumber=1;
			 if(yzm.content[0].field=='captcha'){
			 	defaultInputNumber=10;
			 }
			 errnum(defaultInputNumber);
			 $(".err"+defaultInputNumber).text(yzm.content[0].message);
			 $('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random()); 
			 //$('#imgCC1').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
		 }
		}
		});
}
/*验证码倒计时*/
function djs($btn) {
	var btn=$btn||$("#btnSendSmsCode");
	var wait=60; 
	time(btn);
	function time(o) { 
		if (wait == 0) { 
			o.removeClass("hui");
			o.removeAttr("disabled"); 
			o.attr("value","获取验证码"); 
			wait = 60; 
			$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
		} 
		else { 
			o.attr("disabled", true); 
			o.attr("value","重新发送(" + wait + ")"); 
			wait--; 
			setTimeout(function() { 
				time(o) 
			}, 
			1000) 
		} 
	} 	
}

var ttype;
var inviteuid=mainModule.getQueryValueByName('code'),access=mainModule.getQueryValueByName('access')||'SHARE';

/*判断终端类型*/
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        };
    }(),
}
if(browser.versions.mobile){
    ttype="MOBILE";
}else{
	ttype="PC";
	}
/*注册-手机*/
function  regst(){


$('#RegistPasswordPhone').text("");
//$('#ConfirmPasswordPhone').text("");
$('#ValidatorCode').text("");
var UserName= $('#RegPhone').val();
var UserPwd= $('#RegistPasswordPhone').val();
//var UserPwd2= $('#ConfirmPasswordPhone').val();
var CheckCode=$('#ValidatorCode').val();
if (UserName == "") {
	errnum(1);
	$(".err1").text("请输入手机号");
	//$("#RegPhone").focus();
	return false;
}
if (UserName.length!==11) {
	errnum(1);
	$(".err1").text("请输入正确的手机号");
	//$("#RegPhone").focus();
	return false;
}
if(UserPwd == "") {
	errnum(2);
	$(".err2").text("请输入登录密码");
	//$("#RegistPasswordPhone").focus();
	return false;
}
if(UserPwd.length>16 || UserPwd.length<6 ) {
	errnum(2);
	$(".err2").text("请输入6-16位密码");
	//$("#RegistPasswordPhone").focus();
	return false;
}
if(CheckCode == "") {
	errnum(5);
	$(".err5").text("请输入验证码");
	//$("#CheckCode1").focus();
	return false;
}
$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/activity/activityRegister",
		data:{ "access":"SHARE","activityCode":"RECRUIT_USER","mobilephone":UserName,"password":UserPwd,"confirmPassword":UserPwd,"smsCaptcha":CheckCode,"inviteUserId":inviteuid,"terminate_type":ttype},
		beforeSend:function(){
		  $("#regPhoneBtn").text("注册中，请稍后");			 
		  },
		success: function (msg) {
		  if(msg.status== "SUCCESS")
		 {
		  $(".zcbox_phone .err").hide();
		  $(".zcbox_phone li").removeClass("focus");
		  $("#regPhoneBtn").text("立即注册并领取");	
		  //mainModule.closeLoginOrRegPopBox();
		  logindata(UserName,UserPwd);
		  $('#j_global_hint_wrap').addClass('hint-animation');
		  //window.location.href='success.html';
		 }else
		 {
		  errnum(1);
		  if(msg.content!=null){$(".err1").text(msg.content[0].message); }
		  else{$(".err1").text(msg.message); }
		  $("#regPhoneBtn").text("立即注册并领取");	
		 }
		}
	});
}
/*注册-邮箱*/
function  regstmail(){
$('#RegistPassword').text("");
//$('#ConfirmPassword').text("");
$('#CheckCode').text("");
var UserName= $('#RegEmail').val();
var UserPwd= $('#RegistPassword').val();
//var UserPwd2= $('#ConfirmPassword').val();
var CheckCode=$('#CheckCode').val();
var emailCaptcha=$('#ValidatorEmailCode').val();
if (UserName == "") {
	errnum(6);
	$(".err6").text("请输入邮箱地址");
	//$("#RegEmail").focus();
	return false;
}
if(CheckCode == "") {
	errnum(9);
	$(".err9").text("请输入验证码");
	//$("#CheckCode").focus();
	return false;
}
if(emailCaptcha == "") {
	errnum(11);
	$(".err11").text("请输入邮箱验证");
	//$("#CheckCode").focus();
	return false;
}
if(UserPwd == "") {
	errnum(7);
	$(".err7").text("请输入登录密码");
	//$("#RegistPassword").focus();
	return false;
}
if(UserPwd.length>16 || UserPwd.length<6 ) {
	errnum(7);
	$(".err7").text("请输入6-16位密码");
	//$("#RegistPassword").focus();
	return false;
}
$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/activity/activityRegister",
		data:{  "access":access,emailCaptcha:emailCaptcha,"activityCode":"RECRUIT_USER","email":UserName,"password":UserPwd,"confirmPassword":UserPwd,"captcha":CheckCode,"inviteUserId":inviteuid,"terminate_type":ttype},
		beforeSend:function(){
		  $("#regEmailBtn").text("注册中，请稍后");			 
		  },
		success: function (msg) {
		  if(msg.status== "SUCCESS")
		 {
		  $(".zcbox_phone .err").hide();
		  $("#regEmailBtn").text("立即注册并领取");
		  logindata(UserName,UserPwd);
		  $('#j_global_hint_wrap').addClass('hint-animation');	
		 // window.location.href='success.html';
		 }else
		 {
		  errnum(6);
		  if(msg.content!=null){$(".err6").text(msg.content[0].message); }
		  else{$(".err6").text(msg.message); }
		  $("#regEmailBtn").text("立即注册并领取");	
		 }
		}
	});
}

/*错误提示的展示*/
function  errnum(nb){
	$(".err").hide();$(".err"+nb).show();
	$(".zcbox_main li").removeClass("focus");
	$(".inputli"+nb).addClass("focus");
	
}
function  lerrnum(nb){
	$(".lerr").hide();$(".lerr"+nb).show();
	$(".loginbox li").removeClass("focus");
	$(".linputli"+nb).addClass("focus");
	
}
/*登录ajax*/
function  logindata(act,psw){
	$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/user/login",
		data:{ "username":act,"password":psw,rememberMe:$('#cbkAutoLogin').prop('checked')},
		beforeSend:function(){
		  },
		success: function (lgn) {
		  if(lgn.status== "SUCCESS")
		 {
		  var content=lgn.content,nicname=content.nickname;
		  showname(nicname,content.isVip);
		  mainModule.initUserState({mobilephone:act,nickname:nicname,icon:content.icon,email:content.email,vip:content.isVip});
		   var href=window.location.href;
		   if(mainModule.isgoxuexipage){
		   		window.location.href='/view/info/index.html?type=1';
		   }
		  if(/info|lessonintro|edit|buy|play/.test(href)){
		  	window.location.reload();
		  }
		  window.location.href='success.html';
		 }
		 else { 
		 }
		}
	});
}

/*显示用户名*/
function  showname(nicname,isvip){
	isvip=isvip||mainModule.getCookie('isvip');
	nicname=nicname||mainModule.getCookie('nickname')||mainModule.getCookie('username')||mainModule.getCookie('email')||'';
	if(isvip){
		nicname='<i class="i-vip-icon i-vip"></i>'+nicname;
	}else{
		nicname='<i class="i-vip-icon i-no-vip"></i>'+nicname;
	}
	if(nicname!=""){
		$(".lgnamebox").html(nicname);
	}
}



