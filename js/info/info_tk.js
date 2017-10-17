var fileList=[];
$(function() {
/*tab切换*/
	$(".menu-wrap li").click(function(){		
		$(this).addClass("on").siblings().removeClass("on");;
		var id = $(this).attr("id")
		$("."+id).show().siblings().hide();
        document.title=$(this).html()+'_极视教育网';
	})
	
	var old_str=GetQueryString("id")
	$(".id"+old_str).click();	
    document.title=$(".id"+old_str).html()+'_极视教育网';
	
	$("#j_feedback_add_btn").click(function(){
		fileList=[];
		$("#addimg_wrap img").each(function(){
			if($(this)){
				fileList.push({content:$(this).attr("src"),name:"a.png"})
				}
		 });
	feedback();
	})
	$('.addimgw').on('click','.clsimg',function(){
	
		$(this).parent().remove();
	})
	    
})
function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}

function feedback() {
	var yj_title= $('#yj_title').val();
	var yj_main= $('#yj_main').val();
	var yj_tel= $('#yj_tel').val();
	
	if (yj_title == "") {
		errnum(1);
		$(".err1").text("请输入标题");
		$("#yj_title").focus();
		return false;
	}
	if(yj_main == "") {
		errnum(2);
		$(".err2").text("请输入内容");
		$("#yj_main").focus();
		return false;
	}
	if(yj_tel == "") {
		errnum(3);
		$(".err3").text("请输入联系方式");
		$("#yj_tel").focus();
		return false;
	}
	if(fileList.length>5){
		errnum(4);
		$(".err4").text("上传图片超过5张");
		return false;

	}
	 $.ajax({
		type: "post",
		dataType: "json",
		data:JSON.stringify({"subject":yj_title,"detail":yj_main,"contact":yj_tel,"fileList":fileList}),
		contentType:"application/json",
		url: $._CACHEOBJ.context+"/user/feedback/submit",
		success: function (fdb) {
			if(fdb.status== "SUCCESS"){
			alert("建议反馈提交成功!")
			}
			else{
			alert(fdb.message)
			}
		}
	});
}
 
function  errnum(nb){
	$(".err").hide();$(".err"+nb).show();	
}
 
 
 function uploadjyFile(file){
        var self=this;
        var files = !!file.files ? file.files : [];
        if (!files.length || !window.FileReader) return;
            var fileType=files[0].type;
            var reader = new FileReader();

            reader.readAsDataURL(files[0]);
            console.info(files[0]);

            reader.onloadend = function(){
                mainModule.log('要上传的反馈图片',this.result);
                var $this=$('#up_feedback'),$parent=$this.parent();
                console.info($this);
                $parent.append('<span><img type="img" name="img" class="img-jy" src="'+this.result+'"><i class="iconfont clsimg">&#xe604;</i></span>');

                self.z=self.z||0;
                self.z++;
                var dom='<input type="file" name="file'+self.z+'" style="z-index:'+self.z+'" accept="image/gif, image/jpeg, image/png, image/bmp" class="z-input-file" onchange="uploadjyFile(this)">'
                $('#addimg_wrap').prepend(dom);

            }
    }

function feedback2() {
$('#uploadForm').attr('action',mainModule.uri.addFeedback);
        $('#uploadPhotoForm').attr('action',mainModule.uri.updateUserPhoto);
		
	 $('#j_feedback_add_btn').click(function(){
            $('#addimg_wrap').children().first().remove();
            $('#uploadForm').submit();
            var st=setTimeout(function(){
                    var result=JSON.parse(window.frames['ajaxifr'].document.body.children[0].innerHTML);
                    if(result.status=='SUCCESS'){
                        $('#j_jy_resmsg').removeClass('cr').html(result.message);
                        clearTimeout(st);
                        self.stjy=setTimeout(function(){
                            $('#j_jy_resmsg').empty();
                            clearTimeout(self.stjy);
                        },2000);
                        $('#yj_title').val('');
                        $('#yj_main').val('');$('#yj_tel').val('');
                        $('#addimg_wrap').find('img').remove();
                    }else{
                        $('#j_jy_resmsg').html(result.message).addClass('cr');
                    }
                    mainModule.log(window.frames['ajaxifr'].document.body.innerHTML);
                },2000);
 	});
}