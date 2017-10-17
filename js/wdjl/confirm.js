$(function() {
	
	$('.conf_btn a').click(function(){
		if(mainModule.getCookie('islogin')){
			var id=mainModule.getQueryValueByName('id');
			resume_td(id);				
			
			}
		else{
			var jr=$(this).data("jr");					
			$('.login_dl').show();  
			$('.loginbg').height($(document).height())
		}
	})	
	var id=mainModule.getQueryValueByName('id');
	resume_top(id);
	
	
	$('.tkcls2').click(function(){	
		$('#tk_dl2').hide();      
	})
	$('.tk_btn').click(function(){	
		$('#tk_dl2').hide();      
	})
	
	
})

function  resume_td(id){
	$.ajax({
		type: "get",
		dataType: "json",
		url: $._CACHEOBJ.context+"/job/applyJob",
		data:{ "jobId":id},
		beforeSend:function(){
		  $(".conf_btn a").text("发送中");			 
		  },
		success: function (lgn) {
			if(lgn.status== "SUCCESS"){
			   $(".conf_btn a").text("发送简历");		
			   $('#tk_dl2').show();
			   $('.loginbg').height($(document).height()) 	
			}
			else{   
				 mainModule.showGlobalHintBar(lgn.message);
			 	 $(".conf_btn a").text("发送简历");	
			}
		}
	});
}
function  resume_top(id){
	$.ajax({
		type: "get",
		dataType: "json",
		url: $._CACHEOBJ.context+"/job/jobInfo",
		data:{ "id":id},
		success: function (lgn) {
			if(lgn.status== "SUCCESS"){
				var htmlinfo = "";
				htmlinfo += '<span class="com_img"><img src="' + lgn.content.companyLogo + '" alt=""></span>';
            htmlinfo += '<div class="jobinfo"><div class="jobtitle"><a href="###">' + lgn.content.jobName + '</a><span class="sx">' + lgn.content.jobType + '</span></div>';
            htmlinfo += '<span class="ico company"><i></i>' + lgn.content.companyName + '</span></div>';
				$(".jobcard").append(htmlinfo);		
			}
			else{   
			}
		}
	});
}