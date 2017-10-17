$(function() {		
	$("#cntbtn").click(function(){
        cntus();		
        return false;		
    });	
});

/*机构入驻申请*/
function  cntus(){
	$('#cnt_name').text("");
	$('#cnt_mail').text("");
	$('#cnt_tyle').text("");
	$('#cnt_txt').text("");		
	var cnt_name= $('#cnt_name').val();
	var cnt_mail=$("#cnt_mail").val();		
	var cnt_tyle= $('#cnt_tyle').val();
	var cnt_txt= $('#cnt_txt').val();	
	
	if (cnt_name == "") {
		errnum(1);
		$(".err1").text("请输入您的姓名");
		$("#cnt_name").focus();
		return false;
	}
	if(cnt_mail == "") {
		errnum(2);
		$(".err2").text("请输入电子邮箱");
		$("#cnt_mail").focus();
		return false;
	}
	if(cnt_tyle == "") {
		errnum(3);
		$(".err3").text("请输入主题");
		$("#cnt_tyle").focus();
		return false;
	}
	if(cnt_txt == "") {
		errnum(4);
		$(".err4").text("请输入消息内容");
		$("#cnt_txt").focus();
		return false;
	}
	var data={
		name:cnt_name,
		email:cnt_mail,
		subject:cnt_tyle,
		message:cnt_txt,		
	}
	cntdata(data);
}

function  cntdata(data){
	$.ajax({
		type: "post",
		dataType: "json",
		url: $._CACHEOBJ.context+"/contact/submit",
		data:data,
		beforeSend:function(){
		  $(".cntfrom .err").hide();
		  $("#cntbtn").text("提交中，请稍后");	
		  },
		success: function (cnt) {
		  if(cnt.status== "SUCCESS")
		 {$("#cntbtn").text("提交");	
		   $(".cntfrom .err").hide();
		  $(".tk_dl").show();
		  $('.loginbg').height($(document).height())
		 }else
		 {alert(cnt.content[0].message);	
		 }
		}
	});

}

$('#tkcls').click(function(){	
	$('.tk_dl').hide();      
})
$('.tk_btn').click(function(){	
	$('.tk_dl').hide();      
})



