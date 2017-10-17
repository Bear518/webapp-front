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
	
	/*验证码更新*/
	$('.yzm_a').click(function(){
	$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
	}); 
	/*短信验证码*/
	$('#btnSendSmsCode').click(function(){		
		yzm();		
	});
	// 邮箱短信验证码
	$('#btnSendEmailSmsCode').click(function(){
		var email=$('#RegEmail').val(),imgCode=$('#CheckCode').val();
		if (email == "") {
			errnum(6);
			$(".err6").text("请输入手机/邮箱号");
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
				 	var defaultInputNumber=6;
				 	if(yzm.content[0].field=='captcha'){
				 		defaultInputNumber=9;
				 	}
					 $("#btnSendEmailSmsCode").removeClass("hui");
					 errnum(defaultInputNumber);
					 $(".err"+defaultInputNumber).text(yzm.content[0].message);
					 $('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random()); 
					 //$('#imgCC1').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
				 }
			}
		})
	});
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
     // 新版调到第二步
     var $el_tel=$('#RegPhone'),$el_email=$('#RegEmail'),
     	 $el_pwd= $('#RegistPasswordPhone'),
     	 $el_email_pwd=$('#RegistPassword'),
     	$j_thlogin_wrap=$('.j_thlogin_wrap');
     // 0、1；手机、邮箱
     $('#regPhonePanel').on('click','#go_second_view',function(){
     	if(!validateTel($el_tel.val())||!validatePwd($el_pwd.val())||!validateAgreement(0)){
     		return;
     	}
     	var $this=$(this),$first_view=$this.parent(),
     		$second_view=$first_view.next();
     	$first_view.hide();
     	$j_thlogin_wrap.hide();
     	$second_view.show();
     });
     // 返回修改手机
     $('#regPhonePanel').on('click','.j_goback_update',function(){
     	var $this=$(this),$second_view=$this.parent(),
     		$first_view=$second_view.prev();
     	$first_view.show();
     	$j_thlogin_wrap.show();
     	$second_view.hide();
     });
     $('#regMailPanel').on('click','#go_second_view',function(){
     	if(!validateEmail($el_email.val())||!validateEmailPwd($el_email_pwd.val())||!validateAgreement(1)){
     		return;
     	}
     	var $this=$(this),$first_view=$this.parent(),
     		$second_view=$first_view.next();
     	$first_view.hide();
     	$j_thlogin_wrap.hide();
     	$second_view.show();
     });
     // 返回修改邮箱
     $('#regMailPanel').on('click','.j_goback_update',function(){
     	var $this=$(this),$second_view=$this.parent(),
     		$first_view=$second_view.prev();
 		$j_thlogin_wrap.show();
     	$first_view.show();
     	$second_view.hide();
     });
	/*已有账号-登录*/
	$(".ljdl").click(function(){
        $('.register_dl').hide();  
		$('.login_dl').show();   
        $('.loginbg').height($(document).height())
    });
    $('.j_view_pwd').click(function(){
    	var $this=$(this),
    		$input=$this.parent().find('input'),
    		type=$input.attr('type');
    	if(type=='text'){
    		$input.attr('type','password');
    		return;
    	}
    	$input.attr('type','text');
    });
	
	bluript()
	//判断是邮箱还是手机注册
	// $('#RegPhone').keydown(function(){
	// 	console.log('RegPhone change');
	// })
});
var validateTel=function(val){
		if (val== "") {
			errnum(1);
			$(".err1").text("请输入手机/邮箱号");
			//$("#RegPhone").focus();
			return false;
		}
		if(/@/.test(val)){
			$('#RegEmail').val(val);
			$('#zcbox_mail').trigger('click');
			if(!mainModule.checkAccount(val,1)){
				errnum(6);
				$(".err6").text("该邮箱已注册");
				return false;
			}
		}
		if (val.length!==11) {
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
			return true;
		}
},validateEmail=function(val){
	if (val == "") {
		errnum(6);
		$(".err6").text("请输入手机/邮箱号");
		//$("#RegEmail").focus();
		return false;
	}
	if(/\d+/.test(val)&&val.length==11){
		$('#RegPhone').val(val);
		$('#zcbox_phone').trigger('click');
		if(!mainModule.checkAccount(val,0)){
			errnum(1);
			$(".err1").text("该手机号已注册");
			return false;
		}
	}
	if(!mainModule.passportReg.email.test(val)){
		errnum(6);
		$(".err6").text("该账号不合法");
		return false;
	}
	if(!mainModule.checkAccount(val,1)){
		errnum(6);
		$(".err6").text("该邮箱已注册");
		return false;
	}
	else{
		$(".err").hide();
		$(".zcbox_main li").removeClass("focus");
		return true;
	}
},validatePwd=function(pwd){
	if(pwd == "") {
			errnum(2);
			$(".err2").text("请输入登录密码");
			//$("#RegistPasswordPhone").focus();
			return false;
		}
		if(pwd.length>16 || pwd.length<6 ) {
			errnum(2);
			$(".err2").text("请输入6-16位密码");
			//$("#RegistPasswordPhone").focus();
			return false;
		}
		else{
			$(".err").hide();
			$(".zcbox_main li").removeClass("focus");
			return true;
		}
},validateEmailPwd=function(pwd){
	if(pwd == "") {
		errnum(7);
		$(".err7").text("请输入登录密码");
		//$("#RegistPassword").focus();
		return false;
	}
	if(pwd.length>16 || pwd.length<6 ) {
		errnum(7);
		$(".err7").text("请输入6-16位密码");
		//$("#RegistPassword").focus();
		return false;
	}
	else{
		$(".err").hide();
		$(".zcbox_main li").removeClass("focus");
		return true;
	}
},validateAgreement=function(type){
	var $checkbox_agree=$('#ckbPhone'),$email_agree=$('#ckbEmail');
	if(type==0&&!$checkbox_agree.prop('checked')){
		$checkbox_agree.next().css('color','red');
		return;
	}
	if(type==1&&!$email_agree.prop('checked')){
		$email_agree.next().css('color','red');
		return;
	}
	$checkbox_agree.next().css('color','#62aeb8');
	$email_agree.next().css('color','#62aeb8');
	return true;
};
/*失去焦点事件*/
function bluript(){
	var UserName= $('#RegPhone');
	var UserPwd= $('#RegistPasswordPhone');
	var UserPwd2= $('#ConfirmPasswordPhone');
	var CheckCode=$('#ValidatorCode');
	var CheckCode1=$('#CheckCode1');
	var $emailCaptcha=$('#ValidatorEmailCode');
	var ipt= $('.zcbox_phone input');
	
	UserName.blur(function(){
		var val=$(this).val();
		validateTel(val);
		
	});
	UserPwd.blur(function(){
		var val=$(this).val();
		validatePwd(val);
	})
	UserPwd2.blur(function(){
		if($(this).val() !== UserPwd.val()) {
			errnum(3);
			$(".err3").text("两次密码不一致");
			//$("#ConfirmPasswordPhone").focus();
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
		
	CheckCode1.blur(function(){
		if($(this).val() == "") {
			errnum(10);
			$(".err10").text("请输入图片验证码");
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
	var UserPwd2_m= $('#ConfirmPassword');
	var CheckCode_m=$('#CheckCode');
	UserName_m.blur(function(){
		var val=$(this).val();
		console.log(val);
		validateEmail(val);
	})
	UserPwd_m.blur(function(){
		validateEmailPwd($(this).val());
	})
	UserPwd2_m.blur(function(){
		if($(this).val() !== UserPwd_m.val()) {
			errnum(8);
			$(".err8").text("两次密码不一致");
			//$("#ConfirmPassword").focus();
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
			$(".err1").text("请输入手机/邮箱号");
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
/*注册-手机*/
function  regst(){
$('#RegistPasswordPhone').text("");
$('#ConfirmPasswordPhone').text("");
$('#ValidatorCode').text("");
var UserName= $('#RegPhone').val();
var UserPwd= $('#RegistPasswordPhone').val();
var UserPwd2= $('#ConfirmPasswordPhone').val();
var CheckCode=$('#ValidatorCode').val();
if (UserName == "") {
	errnum(1);
	$(".err1").text("请输入手机/邮箱号");
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
// if(UserPwd2 !== UserPwd) {
// 	errnum(3);
// 	$(".err3").text("两次密码不一致");
// 	//$("#ConfirmPasswordPhone").focus();
// 	return false;
// }
if(CheckCode == "") {
	errnum(5);
	$(".err5").text("请输入验证码");
	//$("#CheckCode1").focus();
	return false;
}
var data={ "mobilephone":UserName,"password":UserPwd,"confirmPassword":UserPwd,"smsCaptcha":CheckCode,access:'DIRECT',activityCode:'OFFICIAL_WEBSITE',terminate_type:'PC'};
// var defaultObj={};
if(/zycp/.test(window.location.href)){
	data.activityCode='CAREER_ANCHOR';
}
var searchObj=mainModule.getSearchObj();
$.extend(data,searchObj);
mainModule.log('data',data);
$.ajax({
		type: "post",
		dataType: "json",
		url:mainModule.uri.register,
		data:data,
		beforeSend:function(){
		  $("#regPhoneBtn").text("注册中，请稍后");			 
		  },
		success: function (msg) {
		  if(msg.status== "SUCCESS")
		 {
		  $(".zcbox_phone .err").hide();
		  $(".zcbox_phone li").removeClass("focus");
		  $("#regPhoneBtn").text("注册");	
		  mainModule.closeLoginOrRegPopBox();
		  logindata(UserName,UserPwd);
		  mainModule.showGlobalHintBar();
		 }else
		 {
		  // errnum(1);
		  // if(msg.content!=null){$(".err1").text(msg.content[0].message); }
		  // else{$(".err1").text(msg.message); }
		  mainModule.registerErrDealtWith(msg);
		  $("#regPhoneBtn").text("注册");	
		 }
		}
	});
}
/*注册-邮箱*/
function  regstmail(){
$('#RegistPassword').text("");
$('#ConfirmPassword').text("");
$('#CheckCode').text("");
var UserName= $('#RegEmail').val();
var UserPwd= $('#RegistPassword').val();
var UserPwd2= $('#ConfirmPassword').val();
var CheckCode=$('#CheckCode').val();
var emailCaptcha=$('#ValidatorEmailCode').val();
if (UserName == "") {
	errnum(6);
	$(".err6").text("请输入手机/邮箱号");
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
	$(".err11").text("请输入验证码");
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
// if(UserPwd2 !== UserPwd) {
// 	errnum(8);
// 	$(".err8").text("两次密码不一致");
// 	//$("#ConfirmPassword").focus();
// 	return false;
// }

var data={ "email":UserName,emailCaptcha:emailCaptcha,"password":UserPwd,"confirmPassword":UserPwd,"captcha":CheckCode,access:'DIRECT',activityCode:'OFFICIAL_WEBSITE',terminate_type:'PC'};
if(/zycp/.test(window.location.href)){
	data.activityCode='CAREER_ANCHOR';
}
// var defaultObj={};
var searchObj=mainModule.getSearchObj();
$.extend(data,searchObj);
mainModule.log('邮箱注册data',data);
$.ajax({
		type: "post",
		dataType: "json",
		url:mainModule.uri.register,
		data:data,
		beforeSend:function(){
		  $("#regEmailBtn").text("注册中，请稍后");			 
		  },
		success: function (msg) {
		  if(msg.status== "SUCCESS")
		 {
		  $(".zcbox_phone .err").hide();
		  $("#regEmailBtn").text("注册");
		  logindata(UserName,UserPwd);
		  mainModule.showGlobalHintBar();
		 }else
		 {
		  // errnum(6);
		  // if(msg.content!=null){$(".err6").text(msg.content[0].message); }
		  // else{$(".err6").text(msg.message); }
		  mainModule.registerErrDealtWith(msg,true);
		  $("#regEmailBtn").text("注册");	
		 }
		}
	});
}
console.log('register loaded');







