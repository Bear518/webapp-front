var datetime;
$(function() {
	/*优惠券优惠码*/
	$(".qh1").click(function(){
		$(".yhq").hide();
		$(".yhm").show();		
	})
	$(".qh2").click(function(){
		$(".yhm").hide();
		$(".yhq").show();		
	})
	/*选择支付方式*/
	$(".choslist li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");				
	})
	/*支付弹框*/
	$("#step2but").click(function(){
		var type=$(".choslist .on").find("a").attr("class");
		if(type=="zfb"){
			$("#tk_dl1").show();
			}
		if(type=="wx"){
			$("#tk_dl2").show();
			}		
	})
	$('.tkcls2').click(function(){	
		$('#tk_dl2').hide();      
	})
	$('#cancelbtn').click(function(){	
		$('#tk_dl1').hide();      
	})
	
})
function openwin(url) {
    // var a = document.createElement("a");
    // a.setAttribute("href", url);
    // a.setAttribute("target", "_blank");
    // a.setAttribute("id", "openwin");
    // document.body.appendChild(a);
    // a.click();
    console.log(url);
    window.open(url,'_blank');
}
var loopCheckIsPaid=function(orderId){
	var st=setInterval(function(){
		ptype(orderId);
	},2000);
};









