$(function() {
	/*学员风采读取数据*/
    var menlist = [
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群"
},
{
	"src":"../../img/vip/menpic.jpg",
	"intro":"1参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群参与极视教育特邀用户群"
}
	];
	var html = "";	
		$.each(menlist,function(){
		html += '<li><img src="' + this["src"] + '"/>';
		html += '<p>' + this["intro"] + '</p></li>';
		});
	$(".menshow_ul").html(html);   

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
	
	
	var Data1 = 
{
	title:"月会员",
	price:"68",
	intro:"月会员，适合需要短期内学 习某技能知识点的同学",
	mensev1:"1、观看会员课程",
	mensev2:"2、资料下载",
	mensev3:"",
	mensev4:"",
	mensev5:""
}
	;
	var Data2 = 
{
	title:"季会员",
	price:"58",
	intro:"季度会员，适合三个月内 突破单项技能的同学",
	mensev1:"1、观看会员课程",
	mensev2:"2、资料下载",
	mensev3:"",
	mensev4:"",
	mensev5:""
}
	;
	var Data3 = 
{
	title:"半年会员",
	price:"48",
	intro:"半年会员，适合系统性学习一系列相关技能的同学",
	mensev1:"1、观看会员课程",
	mensev2:"2、资料下载",
	mensev3:"",
	mensev4:"",
	mensev5:""
}
	;
	var Data4 = 
{
	title:"年会员",
	price:"38",
	intro:"年会员，适合“0基础”小白，完整的职业养成计划",
	mensev1:"1、观看会员课程",
	mensev2:"2、资料下载",
	mensev3:"3、技术问答",
	mensev4:"4、1对1“伴读书童”",
	mensev5:""
}
	;
	/*vip介绍读取数据*/		
	var viphtml = "";	
	viphtml += '<li class="mon1"><div class="vi_title"><span>' + Data1.title + '</span><h3>￥<b class="monpri">68</b>/<i>月</i></h3></div>';
	viphtml += '<p>' + Data1.intro + '</p><span class="hmday"></span>';
	viphtml += '<div class="fv"><span style="background-color:#6dc6d2">' + Data1.mensev1 + '</span><span>' + Data1.mensev2 + '</span><span style="background-color:#6dc6d2">' + Data1.mensev3 + '</span><span>' + Data1.mensev4 + '</span><span style="background-color:#6dc6d2">' + Data1.mensev5 + '</span></div><a class="buy_btn" id="btn1" data-href="memberbuy.html?code=1" target="_blank">立即购买</a>';
	
	viphtml += '<li class="year1"><div class="vi_title"><span>' + Data2.title + '</span><h3>￥<b class="jipri">58</b>/<i>月</i></h3></div>';
	viphtml += '<p>' + Data2.intro + '</p><span class="hmday">原价：<b class="monpri">68</b>/月</span>';
	viphtml += '<div class="fv"><span style="background-color:#60aeb9">' + Data2.mensev1 + '</span><span>' + Data2.mensev2 + '</span><span style="background-color:#60aeb9">' + Data2.mensev3 + '</span><span>' + Data2.mensev4 + '</span><span style="background-color:#60aeb9">' + Data2.mensev5 + '</span></div><a class="buy_btn" id="btn2" style="" data-href="memberbuy.html?code=3" target="_blank">立即购买</a>';
	
	viphtml += '<li class="mon2"><div class="vi_title"><span>' + Data3.title + '</span><h3>￥<b class="hfyearpri">48</b>/<i>月</i></h3></div>';
	viphtml += '<p>' + Data3.intro + '</p><span class="hmday">原价：<b class="monpri">68</b>/月</span>';
	viphtml += '<div class="fv"><span style="background-color:#feac51">' + Data3.mensev1 + '</span><span>' + Data3.mensev2 + '</span><span style="background-color:#feac51">' + Data3.mensev3 + '</span><span>' + Data3.mensev4 + '</span><span style="background-color:#feac51">' + Data3.mensev5 + '</span></div><a class="buy_btn" id="btn3" style="" data-href="memberbuy.html?code=6" target="_blank">立即购买</a>';
	
	viphtml += '<li class="year2"><div class="vi_title"><span>' + Data4.title + '</span><h3>￥<b class="yearpri">68</b>/<i>月</i></h3></div>';
	viphtml += '<p>' + Data4.intro + '</p><span class="hmday">原价：<b class="monpri">68</b>/月</span>';
	viphtml += '<div class="fv"><span style="background-color:#fb992e">' + Data4.mensev1 + '</span><span>' + Data4.mensev2 + '</span><span style="background-color:#fb992e">' + Data4.mensev3 + '</span><span>' + Data4.mensev4 + '</span><span style="background-color:#fb992e">' + Data4.mensev5 + '</span></div><a class="buy_btn" id="btn4" style="" data-href="memberbuy.html?code=12" target="_blank">立即购买</a>';
	// $(".viplist").html(viphtml);  
	viplist(function(result){
		mainModule.log('viplist 接口返回',result);
		var viphtml='';
		for(var i=0,ii=result.length;i<ii;i++){
			var item=result[i],className='',bgColor='',btnClassName='';
			switch(i){
				case 0:
					className='mon1';
					bgColor='#6dc6d2';
					btnClassName='btn1';
				break;
				case 1:
					className='year1';
					bgColor='#60aeb9';
					btnClassName='btn2';
				break;
				case 2:
					className='mon2';
					bgColor='#feac51';
					btnClassName='btn3';
				break;
				case 3:
					className='year2';
					bgColor='#fb992e';
					btnClassName='btn4';
				break;
			}
			viphtml += '<li class="'+className+'"><div class="vi_title"><span>' + item.name + '</span><h3>￥<b class="yearpri">'+item.price+'</b>/<i>月</i></h3></div>';
			viphtml += '<p>' + item.descripe + '</p><span class="hmday">原价：<b class="monpri">'+result[0].price+'</b>/月</span>';

			viphtml += '<div class="fv">';
			var len=item.rightList.length;
			for(var j=0,jj=len;j<jj;j++){
				var rightItem=item.rightList[j],rbgColor=bgColor;
				// bgColor=
				if(j%2==1){
					rbgColor='inhert';
				}
				viphtml+='<span style="background-color:'+rbgColor+'">' + rightItem.name + '</span>';

			}
			if(len<5){
				for(var k=5-len;k>0;k--){
					if(k%2==0){
						bgColor='inhert';
					}
					viphtml+='<span style="background-color:'+bgColor+'"></span>';
				}
			}
			viphtml+='</div><a class="buy_btn" id="'+btnClassName+'" style="" data-href="memberbuy.html?code='+item.areaBottom+'" target="_blank">立即购买</a>';
			
		}
		$(".viplist").html(viphtml); 
	})

	$('.viplist').on('click','.buy_btn',function(){
		if(mainModule.isLogined(true)){
			window.location.href=$(this).data('href');
		}
	})
	
});
function viplist(callback){
	$.ajax({
		type: "get",
		dataType: "json",
		data:{page:1,rows:4},
		url: $._CACHEOBJ.context+"/vip/list",
		success: function (mb) {
			if(mb.status== "SUCCESS"){
				var mb=mb.content;
				
				$(".monpri").text(gminfo(0,mb));	
				$(".jipri").text(gminfo(2,mb));	
				$(".hfyearpri").text(gminfo(5,mb));	
				$(".yearpri").text(gminfo(11,mb));	
				callback(mb.rows);
			}
			else{
				if(mb.content!=null){alert(mb.content[0].message); }
		  		else{alert(mb.message); }

			}
		}
	})		
}
function gminfo(code,mb){
	var list=mb.rows;				
	for(var i=0;i<list.length; i++){
		if(code+1>=list[i].areaBottom&&code+1<list[i].areaTop){
			var price=list[i].price;
			return price;
			
			
		}			
	}	
}
