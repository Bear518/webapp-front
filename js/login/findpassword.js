$(function() {
	$(".phoneRegBtn").click(function(){
		$(".f_mailgro1").show().siblings().hide();
		})
	$(".mailRegBtn").click(function(){
		$(".f_phonegro1").show().siblings().hide();
		})
	$("#findpas_phone").click(function(){
		phonestp1()		
		})
	$("#cxfs").click(function(){
		$(".f_phonegro1").show().siblings().hide();
		$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
		})
	$("#cxfs2").click(function(){
		$(".f_mailgro1").show().siblings().hide();
		$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
		})

	$("#findpas_phone2").click(function(){
		phonestp2()		
		})
	$("#findpas_phone3").click(function(){
		phonestp3()		
		})
	$("#findpas_mail").click(function(){
		mailstp1()		
		})
	$("#findpas_mail2").click(function(){
		mailstp2()		
		})
	$("#findpas_mail3").click(function(){
		mailstp3()		
		})
	placeholder();
	
	$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
	/*验证码更新*/
	$('.yzm_a').click(function(){
	$('.yzm_img').attr('src',$._CACHEOBJ.context+'/base/captcha?'+Math.random());
	}); 

});

function  phonestp1(){
	$('#RegPhone').text("");
	$('#CheckCode1').text("");
var RegPhone= $('#RegPhone').val();
var CheckCode1= $('#CheckCode1').val();
if (RegPhone == "") {
	lerrnum(1);
	$(".lerr1").text("请输入手机号");
	$("#RegPhone").focus();
	return false;
}
if (RegPhone.length!==11) {
	lerrnum(1);
	$(".lerr1").text("请输入正确的手机号");
	$("#RegPhone").focus();
	return false;
}
if(CheckCode1 == "") {
	lerrnum(2);
	$(".lerr2").text("请输入验证码");
	$("#CheckCode1").focus();
	return false;
}
$.ajax({
	type: "post",
	dataType: "json",
	url: $._CACHEOBJ.context+"/safe/passwordReset/smsCaptcha",
	data:{ "mobilephone":RegPhone,"captcha":CheckCode1},
	beforeSend:function(){
	  $(".f_phonegro1 .lerr").hide();
	  $("#findpas_phone").text("提交中，请稍后");			 
	  },
	success: function (mm) {
	  if(mm.status== "SUCCESS")
	 {
	   $(".f_phonegro1 .lerr").hide();
	   $("#findpas_phone").text("找回密码");	
	   $(".f_phonegro2").show().siblings().hide();	
	 }else
	 {    lerrnum(1);
	 	if(mm.content==null){
		  $(".lerr1").text("提交失败,"+mm.message); 
		  $("#findpas_phone").text("找回密码");	}
		  else{$(".lerr1").text("提交失败,"+mm.content[0].message); 
		  $("#findpas_phone").text("找回密码");}
	 }
	}
});
}

function  phonestp2(){
	$('#code_phone').text("");
var code_phone= $('#code_phone').val();
if (code_phone == "") {
	lerrnum(3);
	$(".lerr3").text("请输入验证码");
	$("#code_phone").focus();
	return false;
}
$.ajax({
	type: "post",
	dataType: "json",
	url: $._CACHEOBJ.context+"/safe/passwordReset/verifySmsCaptcha",
	data:{ "smsCaptcha":code_phone},
	beforeSend:function(){
	  $(".f_phonegro2 .lerr").hide();
	  $("#changepic_btn1").text("提交中，请稍后");			 
	  },
	success: function (mm) {
	  if(mm.status== "SUCCESS")
	 {
	   $(".f_phonegro2 .lerr").hide();
	   $("#changepic_btn2").text("提交");	
	   $(".f_phonegro3").show().siblings().hide();	
	 }else
	 {    lerrnum(3);
		  $(".lerr3").text("提交失败,"+mm.content.message); 
		  $("#changepic_btn2").text("提交");	
	 }
	}
});
}

function  phonestp3(){
	$('#paswrd').text("");
	$('#repaswrd').text("");
var paswrd= $('#paswrd').val();
var repaswrd= $('#repaswrd').val();
if (paswrd == "") {
	lerrnum(4);
	$(".lerr4").text("请输入密码");
	$("#paswrd").focus();
	return false;
}
if(paswrd.length>16 || paswrd.length<6 ) {
	lerrnum(4);
	$(".lerr4").text("请输入6-16位密码");
	$("#paswrd").focus();
	return false;
}
if(repaswrd !== paswrd) {
	lerrnum(5);
	$(".lerr5").text("两次密码不一致");
	$("#repaswrd").focus();
	return false;
}
$.ajax({
	type: "post",
	dataType: "json",
	url: $._CACHEOBJ.context+"/safe/passwordReset/resetMobilphonePassword",
	data:{ "password":paswrd,"confirmPassword":repaswrd},
	beforeSend:function(){
	  $(".f_phonegro3 .lerr").hide();
	  $("#changepic_btn3").text("提交中，请稍后");			 
	  },
	success: function (mm) {
	  if(mm.status== "SUCCESS")
	 {
	   $(".f_phonegro3 .lerr").hide();
	   $("#changepic_btn3").text("确认");	
	   $(".f_phonegro4").show().siblings().hide();	
	 }else
	 {    lerrnum(4);
		  $(".lerr4").text("提交失败,"+mm.message); 
		  $("#changepic_btn3").text("确认");	
	 }
	}
});
}

function  mailstp1(){
$('#Regmail').text("");
$('#CheckCode2').text("");
var Regmail= $('#Regmail').val();
var CheckCode2= $('#CheckCode2').val();
if (Regmail == "") {
	lerrnum(6);
	$(".lerr6").text("请输入邮箱");
	$("#Regmail").focus();
	return false;
}
if(CheckCode2 == "") {
	lerrnum(7);
	$(".lerr7").text("请输入验证码");
	$("#CheckCode2").focus();
	return false;
}
$.ajax({
	type: "post",
	dataType: "json",
	url: $._CACHEOBJ.context+"/safe/passwordReset/emailCaptcha",
	data:{ "email":Regmail,"captcha":CheckCode2},
	beforeSend:function(){
	  $(".f_mailgro1 .lerr").hide();
	  $("#findpas_mail").text("提交中，请稍后");			 
	  },
	success: function (mm) {
	  if(mm.status== "SUCCESS")
	 {
	   $(".f_mailgro1 .lerr").hide();
	   $("#findpas_mail").text("提交");	
	   $(".f_mailgro2").show().siblings().hide();	
	 }else
	 {    lerrnum(6);
		  $(".lerr6").text("提交失败,"+mm.message); 
		  $("#findpas_mail").text("提交");	
	 }
	}
});
}

function  mailstp2(){
	$('#code_mail').text("");
var code_mail= $('#code_mail').val();
if (code_mail == "") {
	lerrnum(8);
	$(".lerr8").text("请输入验证码");
	$("#code_mail").focus();
	return false;
}
$.ajax({
	type: "post",
	dataType: "json",
	url: $._CACHEOBJ.context+"/safe/passwordReset/verifyEmailCaptcha",
	data:{ "emailCaptcha":code_mail},
	beforeSend:function(){
	  $(".f_mailgro2 .lerr").hide();
	  $("#findpas_mail2").text("提交中，请稍后");			 
	  },
	success: function (mm) {
	  if(mm.status== "SUCCESS")
	 {
	   $(".f_mailgro2 .lerr").hide();
	   $("#findpas_mail2").text("提交");	
	   $(".f_mailgro3").show().siblings().hide();	
	 }else
	 {    lerrnum(8);
		  $(".lerr8").text("提交失败,"+mm.message); 
		  $("#findpas_mail2").text("提交");	
	 }
	}
});
}

function  mailstp3(){
	$('#mpaswrd').text("");
	$('#mrepaswrd').text("");
var mpaswrd= $('#mpaswrd').val();
var mrepaswrd= $('#mrepaswrd').val();
if (mpaswrd == "") {
	lerrnum(9);
	$(".lerr9").text("请输入密码");
	$("#mpaswrd").focus();
	return false;
}
if(mpaswrd.length>16 || mpaswrd.length<6 ) {
	lerrnum(9);
	$(".lerr9").text("请输入6-16位密码");
	$("#mpaswrd").focus();
	return false;
}
if(mrepaswrd !== mpaswrd) {
	lerrnum(10);
	$(".lerr10").text("两次密码不一致");
	$("#mrepaswrd").focus();
	return false;
}
$.ajax({
	type: "post",
	dataType: "json",
	url: $._CACHEOBJ.context+"/safe/passwordReset/resetEmailPassword",
	data:{ "password":mpaswrd,"confirmPassword":mrepaswrd},
	beforeSend:function(){
	  $(".f_mailgro3 .lerr").hide();
	  $("#findpas_mail3").text("提交中，请稍后");
	  },
	success: function (mm) {
	  if(mm.status== "SUCCESS")
	 {
	   $(".f_mailgro3 .lerr").hide();
	   $("#findpas_mail3").text("确认");	
	   $(".f_mailgro4").show().siblings().hide();	
	 }else
	 {    lerrnum(9);
		  $(".lerr9").text("提交失败,"+mm.message); 
		  $("#findpas_mail3").text("确认");	
	 }
	}
});
}


function  lerrnum(nb){
	$(".lerr").hide();$(".lerr"+nb).show();
	$(".MainCenterCont li").removeClass("focus");
	$(".linputli"+nb).addClass("focus");
	
}

/*输入框提示*/
function  placeholder(){	
	placeholdeready("RegPhone");
	placeholdeready("CheckCode1");
	
	placeholdeready("Regmail");
	placeholdeready("CheckCode2");
	
	placeholdeready("code_phone");
	
	placeholdeready("code_mail");
	
	placeholdeready("paswrd");	
	placeholdeready("repaswrd");
	
	placeholdeready("mpaswrd");
	placeholdeready("mrepaswrd");
		
	var iptli=$(".placeholder").parent();
	iptli.find("input").focus(function(){
		$(this).parent().find(".placeholder").hide();
	})
}
/*输入框提示初始化*/
function  placeholdeready(ipid){
	var id= $('#'+ipid).val();
	if (id !== "") {
		$('#'+ipid).parent().find(".placeholder").hide();
	}
}










