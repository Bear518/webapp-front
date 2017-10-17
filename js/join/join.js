var te_timeval;
$(function() {
	/*tab切换*/
	$("#te_sex a").click(function(){		
		$(this).addClass("on").siblings().removeClass("on");		
	})
	$("#org_type a").click(function(){		
		$(this).addClass("on").siblings().removeClass("on");		
	})
	
	/*学员风采读取数据*/
    var menlist = [
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1欧阳"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"欧阳"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1欧阳"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1欧阳"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1欧阳"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1欧阳"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"欧阳"
}
	];
	/*优秀老师*/
	var html = "";	
		$.each(menlist,function(){
		html += '<li><img src="' + this["src"] + '"/>';
		html += '<p>' + this["intro"] + '</p></li>';
		});
	$(".menshow_ul").html(html);
	/*优秀机构*/ 
	var html = "";	
		$.each(menlist,function(){
		html += '<li><img src="' + this["src"] + '"/>';
		html += '<p>' + this["intro"] + '</p></li>';
		});
	$(".menshow_ul2").html(html);   

	/*学员风采图片滚动*/
	linum = $('.menshow_ul li').length;//图片数量
	w = linum * 305;//ul宽度
		
	$('.rt_arr').click(function(){		
		var lft=$('.menshow_ul').position().left;
		var mm=lft+w;
		var lft2=$('.menshow_ul').position().left;
		if(linum>4 && mm>=1220){//多于4张图片
			$('.menshow_ul').animate({left:lft2-1220+'px'},600);
		}
	})
	$('.lft_arr').click(function(){
		var lft=$('.menshow_ul').position().left;
		var mm=lft+w;
		if(linum>4 ){
			if(mm>0 && mm<w){
		var lft2=$('.menshow_ul').position().left;
		$('.menshow_ul').animate({left:lft2+1220+'px'},600);
			}
		}
		
	}) 
	$("#tea_join").click(function(){
        teajoin();		
        return false;		
    });
	
	$("#org_join").click(function(){
        orgjoin();		
        return false;		
    });
	
	$('#te_time').change(function(){ 
		te_timeval=$(this).children('option:selected').val(); 
	})
	
});
/*老师入驻*/
function  teajoin(){
	$('#te_name').text("");
	$('#te_age').text("");
	$('#te_hy').text("");
	$('#te_zy').text("");	
	$('#te_mail').text("");
	$('#te_tel').text("");
	$('#te_ads').text("");
	$('#te_zy').text("");
	$('#te_bz').text("");
	var te_name= $('#te_name').val();
	/*性别*/
	var radioid=$("#te_sex .on").attr("id");
	var te_sex= 0;
	if( radioid =="te_ma"){
		te_sex= 1
		}
	else{
		te_sex= 0
		}		
	var te_age= $('#te_age').val();
	var te_hy= $('#te_hy').val();
	var te_zy= $('#te_zy').val();
	/*从业时间*/
	
	//var te_time=te_timeval;
	
	var te_mail= $('#te_mail').val();
	var te_tel= $('#te_tel').val();
	var te_ads= $('#te_ads').val();
	var te_zy= $('#te_zy').val();
	var te_bz= $('#te_bz').val();

	if (te_name == "") {
		errnum(1);
		$(".err1").text("请输入姓名");
		$("#te_name").focus();
		return false;
	}
	if(te_age !== ""){		
		var z= /^[0-9]*$/;
		if(!z.test(te_age)){
		   errnum(3);
		$(".err3").text("格式不正确");
		$("#te_age").focus();
		return false
		}
	}
	if(te_hy == "") {
		errnum(4);
		$(".err4").text("请输入行业");
		$("#te_hy").focus();
		return false;
	}
	if(te_zy == "") {
		errnum(5);
		$(".err5").text("请输入专业");
		$("#te_zy").focus();
		return false;
	}
	if(!te_timeval){
		errnum(6);
		$(".err6").text("请输入从业时间");
		$("#te_time").focus();
		return false;
	}
	if(te_mail !== ""){
		if(!te_mail.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
			errnum(7);
			$(".err7").text("邮箱格式不正确");
			$("#te_mail").focus();
			return false;
		}
	}
	if(te_tel == "") {
		errnum(8);
		$(".err8").text("请输入电话号码");
		$("#te_tel").focus();
		return false;
	}
	if(!mainModule.passportReg.phone.test(te_tel)){
		errnum(8);
		$(".err8").text("联系电话格式不正确");
		$("#te_tel").focus();
		return false;
	}
	var data={
		name:te_name,
		sex:te_sex,
		age:te_age,
		industry:te_hy,
		courseName:te_zy,
		workingTime:te_timeval,
		email:te_mail,
		phone:te_tel,
		address:te_ads,
		remark:te_bz,
	}
	teajoindata(data);
}

function  teajoindata(data){
	var $tea_join=$("#tea_join");
	$tea_join.prop('disabled',true);
	$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/teacher/apply",
		data:data,
		beforeSend:function(){
		  $(".infobox .err").hide();
		  $tea_join.text("提交中，请稍后");	
	  	},
		success: function (lgn) {
		 	if(lgn.status== "SUCCESS")
			 {
			 	$tea_join.text("老师入驻").prop('disabled',false);	
			   	$(".infobox .err").hide();
			   //window.open("join_succ.html",'top');
			   // openwin("join_succ.html")
			   window.location.href='join_succ.html';
			 }else
			 {
			 	alert(lgn.message);	
			 }
		},
		error:function(result){

		}
	});

}

/*机构入驻申请*/
function  orgjoin(){
	$('#org_name').text("");
	$('#org_mennub').text("");
	$('#org_time').text("");
	$('#org_con').text("");	
	$('#org_zynub').text("");
	$('#org_mail').text("");
	$('#org_phone').text("");
	$('#org_addr').text("");
	$('#org_agency').text("");
	$('#org_agencyph').text("");
	$('#org_bz').text("");
	var org_name= $('#org_name').val();
	var radiotext=$("#org_type .on").text();			
	var org_mennub= $('#org_mennub').val();
	var org_time= $('#org_time').val();
	var org_con= $('#org_con').val();
	var org_zynub=$('#org_zynub').val();
	var org_mail= $('#org_mail').val();
	var org_phone= $('#org_phone').val();
	var org_addr= $('#org_addr').val();
	var org_agency= $('#org_agency').val();
	var org_agencyph= $('#org_agencyph').val();
	var org_bz= $('#org_bz').val();
	
	if (org_name == "") {
		errnum(1);
		$(".err1").text("请输入机构名称");
		$("#org_name").focus();
		return false;
	}
	if(org_mennub !== ""){		
		var z= /^[0-9]*$/;
		if(!z.test(org_mennub)){
		   errnum(3);
		$(".err3").text("格式不正确");
		$("#org_mennub").focus();
		return false
		}
	}
	var a = /^(\d{4})-(\d{2})-(\d{2})$/
	if(org_time !== ""){
		if (!a.test(org_time)) { 
		errnum(4);
		$(".err4").text("格式不正确");
		$("#org_time").focus();
		return false 
		} 
	}
	if(org_zynub !== ""){		
		var z= /^[0-9]*$/;
		if(!z.test(org_zynub)){
		   errnum(6);
		$(".err6").text("格式不正确");
		$("#org_zynub").focus();
		return false
		}
	}
	if(org_mail !== ""){
		if(!org_mail.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
			errnum(7);
			$(".err7").text("邮箱格式不正确");
			$("#org_mail").focus();
			return false;
		}
	}
	if(org_phone == "") {
		errnum(8);
		$(".err8").text("请输入联系电话");
		$("#org_phone").focus();
		return false;
	}
	if(org_phone !== ""){		
		var z= /^[0-9]*$/;
		if(!z.test(org_phone)){
		   errnum(8);
		$(".err8").text("格式不正确");
		$("#org_phone").focus();
		return false
		}
	}
	if(org_agency == "") {
		errnum(9);
		$(".err9").text("请输入代理人");
		$("#org_agency").focus();
		return false;
	}
	if(org_agencyph == "") {
		errnum(10);
		$(".err10").text("请输入代理电话");
		$("#org_agencyph").focus();
		return false;
	}
	if(org_agencyph !== ""){		
		var z= /^[0-9]*$/;
		if(!z.test(org_agencyph)){
		   errnum(10);
		$(".err10").text("格式不正确");
		$("#org_agencyph").focus();
		return false
		}
	}
	var data={
		name:org_name,
		property:radiotext,
		scale:org_mennub,
		foundedDate:org_time,
		content:org_con,
		majorNum:org_zynub,
		email:org_mail,
		phone:org_phone,
		address:org_addr,
		agentName:org_agency,
		agentPhone:org_agencyph,
		remarks:org_bz,
	}
	orgjoindata(data);
}

function  orgjoindata(data){
	$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/institute/entering/apply",
		data:data,
		beforeSend:function(){
		  $(".infobox .err").hide();
		  $("#org_join").text("提交中，请稍后");	
		  },
		success: function (lgn) {
		  if(lgn.status== "SUCCESS")
		 {$("#org_join").text("机构入驻");	
		   $(".infobox .err").hide();
		   //window.open("join_succ.html",'top');
		   openwin("join_succ.html")
		 }else
		 {alert(lgn.content[0].message);	
		 }
		}
	});

}
function openwin(url) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "openwin");
    document.body.appendChild(a);
    a.click();
}





