
$(function() {
/*tab切换*/
	$(".menu-wrap li").click(function(){		
		$(this).addClass("on").siblings().removeClass("on");;
		var id = $(this).attr("id")
		$("."+id).show().siblings().hide();
		$(".fkwm").show();
	})
	$('.info_content').on('click','.title-wrap',function(){
		var $this=$(this).parent();
		$this.toggleClass('active default');
		$this.find('i').toggleClass('i-sub i-add');
	});
	    
})