
var liveListModule={
	bindEvents:function(){
		var $container=$('#j_live_list_wrap'),
			$c_download=$container.find('.c_download'),
			$c_live_list=$container.find('.c_live_list');
		$container.on('click','.tab-wrap li',function(){
			var $this=$(this),i=$this.index();
			$this.siblings().removeClass('active');
			$this.addClass('active');
			$c_live_list.hide();
			$c_download.hide();
			if(i==0){
				$c_live_list.show();
				return;
			}
			$c_download.show();
		});

		/*下载*/
		$('.introinfo_content').on('click','.downld li a',function(){
		
			var dataId=$(this).attr("id");
			$.ajax({
	            type: "get",
	            dataType: "json",
	            url: $._CACHEOBJ.context+"/courseData/hasDownloadRight",
				data:{"dataId":dataId},
	            success: function (dl) {
				if(dl.status== "SUCCESS"){
					//downLoad(dataId);
					window.location.href=$._CACHEOBJ.context+"/courseData/downLoad?dataId="+dataId;
				}			
				else{
					//wordworm("您没有权限下载！")
					mainModule.showGlobalHintBar('您没有权限下载!');
				}
	            }
	        });
		})
	},init:function(){
		this.bindEvents();
	}
};
liveListModule.init();




