$(function() {
	/*登录*/
	
	$("#lg_btn").click(function(){
		if($(this).hasClass("adp")){
			login(1);					
			return false;	
		}	
		else{
			login(0);		
			return false;
			}
    });
	/*回车键登录*/
	var SubmitOrHidden = function(evt){
    evt = window.event || evt;
    if(evt.keyCode==13){
		login();
		return false;
		}
	}
	$('#Password').keydown(function(evt){
		 evt = window.event || evt;
	    if(evt.keyCode==13){
			login();
			return false;
		}
	});
	// window.document.onkeydown=SubmitOrHidden;
	/*登出*/
	$(".logout").click(function(){
        logout();        		
    });
	/*没有账号-注册*/
	$(".mszc").click(function(){
        $('.login_dl').hide();  
		$('.register_dl').show();   
        $('.loginbg').height($(document).height())
		$('.yzm_img').attr('src',mainModule.uri.getVeriCodeImg+'?'+Math.random());

    });
	/*输入框信息提示*/
	
	//placeholder();
});
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

/*登录*/
function  login(e){
$('#Account').text("");
$('#Password').text("");
var Account= $('#Account').val();
var Password= $('#Password').val();
if (Account == "") {
	lerrnum(1);
	$(".lerr1").text("请输入手机/邮箱");
	//$("#Account").focus();
	return false;
}
if(Password == "") {
	lerrnum(2);
	$(".lerr2").text("请输入登录密码");
	//$("#Password").focus();
	return false;
}

logindata(Account,Password,e);
}
/*登录ajax*/
function  logindata(act,psw,e){
	var rememberMe=$('#cbkAutoLogin').prop('checked');
	$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/user/login",
		data:{ "username":act,"password":psw,rememberMe:rememberMe},
		beforeSend:function(){
		  $(".loginbox .lerr").hide();
		  $("#lg_btn").text("登录中，请稍后");			 
		  },
		success: function (lgn) {
		  if(lgn.status== "SUCCESS")
		 {
		   $(".loginbox .lerr").hide();
		   $("#lg_btn").text("登录");		
		  var content=lgn.content,nicname=content.nickname;
		  showname(nicname,content.isVip);
		  mainModule.initUserState({mobilephone:act,nickname:nicname,icon:content.icon,email:content.email,vip:content.isVip,rememberMe:rememberMe});
		   var href=window.location.href;
		   if(mainModule.isgoxuexipage){
		   		window.location.href='/view/info/index.html?type=1';
		   }
		  if(/info|lessonintro|edit|buy|play|detail|zyxx/.test(href)){
		  	window.location.reload();
		  }
		  if(e==1){
			  $(".addplan").click()
			  }
		 }else
		 {    lerrnum(1);
			  $(".lerr1").text(lgn.message); 
			  $("#lg_btn").text("登录");	
		 }
		}
	});
}
console.log('login.js');
/*退出登录*/
function  logout(){
	console.log('logout');
$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/user/logout",
		success: function (lgnout) {
		  if(lgnout.status== "SUCCESS")
		 {
			mainModule.delCookie('islogin');
			mainModule.delCookie('photo');
			mainModule.judgeIslogined();
			var href=window.location.href;
			if(/lessonintro|detail/.test(href)){
			    window.location.reload();
			}
			mainModule.locationToDefaultPageIfNotLogin();
		   // alert(lgnout.message);
		 }else
		 {    
			  // alert("退出失败");
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

/*输入框提示*/
function  placeholder(){	
	placeholdeready("Account");
	placeholdeready("Password");
	
	placeholdeready("RegPhone");
	placeholdeready("RegistPasswordPhone");
	placeholdeready("ConfirmPasswordPhone");
	placeholdeready("CheckCode1");
	placeholdeready("ValidatorCode");
	
	placeholdeready("RegEmail");
	placeholdeready("RegistPassword");
	placeholdeready("ConfirmPassword");
	placeholdeready("CheckCode");
		
	var iptli=$(".placeholder").parent();
	iptli.find("input").focusin(function(){
		$(this).parent().find(".placeholder").hide();
	})
	iptli.find("input").focusout(function(){
		var ipt=$(this).val();
		if(ipt== ""){
		$(this).parent().find(".placeholder").show();
		}
	})
}
/*输入框提示初始化*/
function  placeholdeready(ipid){
	var id= $('#'+ipid).val();
	if (id !== "") {
		$('#'+ipid).parent().find(".placeholder").hide();
	}
}

