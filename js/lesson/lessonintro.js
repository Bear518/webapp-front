var hasc;
$(function() {
	var couid =mainModule.getQueryValueByName("courseid");
	
	window.courseId=couid;
	videopre(courseId);
	
	/*tab切换*/
	$(".introinfo_tab a").click(function(){		
		$(this).addClass("on").siblings().removeClass("on");;
		var id = $(this).attr("id")
		$("."+id).show().siblings().hide();
	})

	/*讲师信息*/
	var s = $(".tea_content ul");
	var html=s.html();
	$('.arr_r').click(function(){		
		if (!s.is(":animated")){
			$(".jg").toggle();$(".js").toggle();
			s.animate({ marginLeft: "-363px" }, "slow", function () {
			$('.tea_content ul li:first').before($('.tea_content ul li:last'));
			s.css("margin-left", "0px");
		});
		}
	})
	$('.arr_l').click(function(){
		if (!s.is(":animated")){
			$(".jg").toggle();$(".js").toggle();
			$('.tea_content ul li:first').before($('.tea_content ul li:last'));
			s.css("margin-left", "-363px");
			s.animate({ marginLeft: "0px" }, "slow");
		}
	});

	// 完善信息送会员弹框
	$('#tk_dl4').on('click','.btn-right',function(){
		$('#tk_dl4').hide();
		$('#j_thlogin_popbg').show();
		$('#j_complete_accountbind_popbox').show();
	});
	$('#tk_dl4').on('click','.close',function(){
		$('#tk_dl4').hide();
	});
	/*课程详情*/	 
	 $.ajax({
            type: "post",
            dataType: "json",
            url: $._CACHEOBJ.context+"/course/info/"+couid,
            success: function (pre) {
            	window.courseName=encodeURIComponent(pre.content.name);
            	document.title=pre.content.name+'_课程介绍_极视教育网';
				hasc=pre.content.hasCourse;
				var courprc=pre.content.price
				$(".courseprc").text(courprc);
                var htmlpre = "";			
			htmlpre += '<h3>' + pre.content.name + '</h3>';
			htmlpre += '<div class="dzbox"><span class="zan">有用（<b>' + pre.content.likesNum + '</b>人）</span><span class="learn">学习（<b>' + pre.content.watchedNum + '</b>人）</span></div>';
			htmlpre += '<ul><li class="times"><i></i><span>' + hours(pre.content.totalTimes) + '小时</span></li>';
			if(pre.content.type==1){
				htmlpre += '<li class="types"><i class="vip"></i><span>会员</span></li>';
				}
			else if(pre.content.type==0){
				htmlpre += '<li class="types"><i></i><span>免费</span></li>';
				$(".catlog ul").attr("id","allfree");
				}
			else if(pre.content.type==2){
				htmlpre += '<li class="types"><i class="hy"></i><span>￥'+courprc+'</span></li>';//单课
				}
			else{
				htmlpre += '<li class="types"><i class="vip"></i><span>￥'+courprc+'</span></li>';//单课/会员
				}
			htmlpre += '<li class="ks" style="margin:0"><i></i><span>' + pre.content.totalLessons + '课时</span></li></ul>';
			htmlpre += '<div class="intro_wd">' + pre.content.description + '</div>';
			if(pre.content.type==1){
				htmlpre += '<div class="dzbox1"><a class="addplan jr1" href="javascript:void(0);" data-jr="1">加入学习</a>';
				}
			else if(pre.content.type==0){
				htmlpre += '<div class="dzbox1"><a class="addplan jr0" href="javascript:void(0);" data-jr="1">加入学习</a>';
				}
			else if(pre.content.type==2){
				htmlpre += '<div class="dzbox1"><a class="addplan jr2" href="javascript:void(0);" data-jr="1">加入学习</a>';
				}
			else{
				htmlpre += '<div class="dzbox1"><a class="addplan jr3" href="javascript:void(0);" data-jr="1">加入学习</a>';
				}
				htmlpre += '<a title="取消学习" style="display:none" class="rmoveplan" href="javascript:void(0);"></a></div>';
			
			//课程购买链接			
			$(".courbtn").attr("href","/view/vip/coursebuy.html?id="+couid)
			
			$(".introbox").html(htmlpre);
			var tid=pre.content.teacherId;
			var instituteid=pre.content.organizationId;
			tid&&teacher(tid);
			instituteid&&institute(instituteid);
			if(!(tid&&instituteid)){$('.arr_r').hide();$('.arr_l').hide();}
			if(!tid&&!instituteid){$('.introinfo_site').hide()}
			readyitem(couid,hasc)
            }
        });
	
	
		
	
		
	/*面包屑*/
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/course/breadNavigation/"+couid,
			data:{"courseId":couid},
            success: function (mbx) {
			var htmlmbx = "";		
			if(mbx.status== "SUCCESS"){
				var result=mbx.content;
				var obj=JSON.parse(store.get('crumbs')||'{}'),curItem,len=result.length;
                   for(var i=0;i<len;i++){
                       var item=result[i];
                        if(item.industryId==obj.industryId&&item.directionId==obj.directionId){
                            curItem=item;
                           mainModule.log('匹配的面包屑数据',curItem);
                           break;
                        }
                   }
                   var rad=Math.round(Math.random()*(len-1));
                  mainModule.log('随机取面包屑list数据索引',rad);
                   curItem=curItem||result[rad];
                    mainModule.log('当前渲染的面包屑数据',curItem);
                   var indushref='/view/seek/course.html?industryId='+curItem.industryId,
                       dirhref='/view/seek/course.html?industryId='+curItem.industryId+'&directionId='+curItem.directionId,
                       sorthref='/view/seek/course.html?industryId='+curItem.industryId+'&directionId='+curItem.directionId+'&sortId='+curItem.sortId;
					
					htmlmbx += '<a href="/">首页</a>  >  <a href="/view/seek/course.html">寻找课程</a>  >  <a href="'+indushref+'">' + curItem.industryName + '</a>  > <a href="'+dirhref+'">' + curItem.directionName + '</a>  >  <a href="'+sorthref+'">' + curItem.sortName + '</a>';
			
			}			
			else{
					//htmlmbx += '<span class="nols"><i>此课程暂无wiki</i></span>';
			}
			$(".crumbs").html(htmlmbx);
            }
        });
	/*wiki*/
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/course/wiki/list",
			data:{"courseId":couid},
            success: function (wk) {
			var htmlwiki = "";		
			if(wk.status== "SUCCESS"){
				if(wk.content.length>0){
					for(var i=0; i<wk.content.length; i++){
						htmlwiki += '<li class="gray"><span>' + wk.content[i].title + '</span>' + wk.content[i].content + '</li>';
					}
				}
				else{//没有wiki
					htmlwiki += '<span class="nols"><i>此课程暂无知识点</i></span>';
			}
			}			
				else{//没有wiki
					htmlwiki += '<span class="nols"><i>此课程暂无知识点</i></span>';
			}
			$(".wiki ul").html(htmlwiki);
            }
        });
	/*评论*/
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/course/courseCommon/list",
			data:{"courseId":couid},
            success: function (pl) {
            var htmlcmt = "";
			if(pl.status== "SUCCESS"){
				if(pl.content.list.length>0){
					for(var j=0; j<pl.content.list.length; j++){
					var dpdate=pl.content.list[j].createDate;
					
					var dtime = $.timeago(dpdate);
					
					htmlcmt += '<li><img src="/img/info/tx.jpg"/><div class="comment_item">';
					var ncname=pl.content.list[j].nickName
					if(!ncname){
						if(!pl.content.list[j].mobilePhone){
							ncname=pl.content.list[j].email||'***';
						}else
						{
							ncname=pl.content.list[j].mobilePhone;
						}
						
					}
					
					htmlcmt += '<div class="comment_cap"><i></i><span>' + ncname + '</span> ' + dtime + '</div>';
					htmlcmt += '<span class="comment_con">' + pl.content.list[j].comment + '</span></div><div class="clear"></div></li>';
					}
				}
				else{//没有评论
					htmlcmt += '<span class="nols"><i>此课程暂无评论</i></span>';
				}
			}
			else{//没有评论
				htmlcmt += '<span class="nols"><i>此课程暂无评论</i></span>';
			}
			$(".comment ul").html(htmlcmt);
            }
        });	
	
	/*加入计划*/	
	$('body').on('click','.addplan',function(){
		if(mainModule.getCookie('islogin')){
			var cls=$(this).attr("class")
			if(!!!hasc){
				if(cls=="addplan jr0"){
					addplan(couid);
				}	
				else if(cls=="addplan jr1"){
					$('#tk_dl1').show();  
					$('.loginbg').height($(document).height())
				}	
				else if(cls=="addplan jr2"){
					$('#tk_dl2').show();  
					$('.loginbg').height($(document).height())
				}	
				else if(cls=="addplan jr3"){
					$('#tk_dl3').show();  
					$('.loginbg').height($(document).height())
				}	
			}
			else{
				addplan(couid);
				}
			}
		else{
			var jr=$(this).data("jr");			
			$('.login_dl').show();  
            $('.loginbg').height($(document).height());
			$('#lg_btn').addClass("adp");  
		}
	})	
	$('.catlog').on('click','.jrbtn',function(){
		if(mainModule.getCookie('islogin')){			
			addplan(couid);			
			}
		else{
			$('.login_dl').show();  
            $('.loginbg').height($(document).height());
			$('#lg_btn').addClass("adp");  
		}
	})	
	$('.catlog').on('click','.jrbtn_m',function(){
		if(mainModule.getCookie('islogin')){			
			addplan(couid);			
			}
		else{
			$('.login_dl').show();  
            $('.loginbg').height($(document).height());
			$('#lg_btn').addClass("adp");  
		}
	})	
	/*取消计划*/
	$('.introbox').on('click','.rmoveplan',function(){
		$(this).hide();
		$(".addplan").show();
		$(".progressbar").hide();
		$(".catlog ul").removeClass("canwarch");
		delplan(couid);
	})	
	/*关闭弹层*/
	$(".tk_box .iconfont").click(function(){		
		$(".tk_dl").hide();
	})
	/*点击列表付费*/
	$('.catlog').on('click','.payflern',function(){
		if($('.addplan').hasClass("jr1")){
			$('#tk_dl1').show();  
			$('.loginbg').height($(document).height())
		}	
		else if($('.addplan').hasClass("jr2")){
			$('#tk_dl2').show();  
			$('.loginbg').height($(document).height())
		}	
		else if($('.addplan').hasClass("jr3")){
			$('#tk_dl3').show();  
			$('.loginbg').height($(document).height())
		}		
	})
});
/*初始化*/
function readyitem(couid,hasc) {

/*课程目录*/
	$.ajax({
            type: "post",
            dataType: "json",
            url:$._CACHEOBJ.context+"/course/courseChapter/search",
			data:{"courseId":couid},
            success: function (chapnum) {
            var htmlchap = "",nub = 0,catlog= $(".catlog ul").attr("id"),index=0,cap=chapnum.content;			
			for(var i=0; i<cap.length; i++){
				var inum=i+1;				
				htmlchap += '<li class="zj"><i></i><span class="mul">章节 ' + inum + '</span><span class="title">' + cap[i].name + '</span></li>';
				for(var j=0; j<cap[i].subChapter.length; j++){
					var jnum=j+1,subc=cap[i].subChapter;
					htmlchap += '<li class="ks" id="' + subc[j].id + '"><span class="mul">课时 ' + (++index) + '</span><span class="title">' + subc[j].name + '</span>';
					if(subc[j].duration==null){
						htmlchap += '<span class="radio"></span><span class="k_time"><i></i></span>';
					}
					else{
					htmlchap += '<span class="radio"></span><span class="k_time"><i></i>' + formatSeconds(subc[j].duration) + '</span>';}
					if(mainModule.getCookie('islogin')){//已登录						
						if(catlog == "allfree"){//免费课程
							htmlchap += '<a class="jrbtn" href="javascript:" data-jr="1">加入学习</a>';
							htmlchap += '<a class="freebtn" target="_blank" href="../course/play.html?courseId=' + couid+'&chapterId='+subc[j].id + '&courseName='+courseName+'"></a>';
						}
						else{//付费课程							
							if(hasc==true){//已付费
								htmlchap += '<a class="jrbtn" href="javascript:" data-jr="1">加入学习</a>';
								htmlchap += '<a class="freebtn" data-jr="1" href="../course/play.html?courseId=' + couid+'&chapterId='+subc[j].id + '&courseName='+courseName+'"></a>';
							}
							else{//未付费
								if(subc[j].free==1){
									htmlchap += '<a class="jrbtn_y payflern" href="javascript:">付费学习</a>';
								}
								else{
									htmlchap += '<a class="jrbtn_y" target="_blank" href="../course/play.html?courseId=' + couid+'&chapterId='+subc[j].id + '&courseName='+courseName+'">预览</a>';
								}
							}
						}
					}
					else{//未登录						
						if(catlog == "allfree"){//免费课程
							htmlchap += '<a class="jrbtn_m" href="javascript:" data-jr="1">加入学习</a>';
						}
						else{//付费课程
							if(subc[j].free==1){//预览
								htmlchap += '<a class="jrbtn_m" href="javascript:" data-jr="1">付费学习</a>';
							}
							else{//付费
								htmlchap += '<a class="jrbtn_m" href="javascript:" data-jr="1" href="../course/play.html?courseId=' + couid+'&chapterId='+subc[j].id + '&courseName='+courseName+'">预览</a>';
							}							
						}
					
					}
					
					htmlchap += '</li>';
					
				}
				
				nub =nub+ subc.length;
				
			}
			var vid=cap[0].subChapter[0].vedioCode;
			// videopre(vid);//alert(vid);
			$(".catlog ul").html(htmlchap);
			//havelearnid(couid)
			if(mainModule.getCookie('islogin')){			
			catlogplan(couid);}
            }
        });

}
/*讲师详情*/
 function teacher(tid) {
	 $.ajax({
            type: "post",
            dataType: "json",
			data:{"teacherId":tid},
            url: $._CACHEOBJ.context+"/teacher/detail",
            success: function (tea) {
			  if(tea.status== "SUCCESS"){
                var htmltea = "";	
				if(tea.content.picture==null){			
					htmltea += '<img src="../../img/lessonintro/js.jpg"/>';
				}
				else{		
					htmltea += '<img src="' + tea.content.picture + '"/>';
				}
				htmltea += '<p class="name">' + tea.content.name + '</p>';
				htmltea += '<div class="info">' + tea.content.description + '<p>' + tea.content.signature + '</p></div>';
				
				}
			  else{
				  var htmltea = "";
				  htmltea += '<img src="../../img/lessonintro/js.jpg"/><p class="name">匿名</p><div class="info"></div>';
				  
				}	
				$(".teacherbox").html(htmltea);
            }
			
        });
 }
/*机构详情*/
 function institute(instituteid) {
	 $.ajax({
            type: "post",
            dataType: "json",
			data:{"instituteId":instituteid},
            url: $._CACHEOBJ.context+"/institute/detail",
            success: function (ins) {
				if(ins.status== "SUCCESS"){
					var htmlins = "";
					if(ins.content.picture==null){			
					htmlins += '<img src="../../img/lessonintro/qy.jpg"/>';
					}
					else{
					htmlins += '<img src="' + ins.content.picture + '"/>';
					}
					htmlins += '<p class="name">' + ins.content.name + '</p>';
					htmlins += '<div class="info">' + ins.content.description + '</div>';
					$(".institutebox").html(htmlins);
					}
				else{
					$(".institutebox").hide();
					$(".arr_l").hide();$(".arr_r").hide();
					
					}
            }
        });
 }
/*video*/
 function videopre(vid) {
 	// ccvedio/vedioPalyCode
	 $.ajax({
            type: "get",
            dataType: "json",
            data:{courseId:courseId},
            url: $._CACHEOBJ.context+"/course/introductionPlayCode",
            success: function (vio) {
				var jsonData=JSON.parse(vio.content);
                var htmlvid = "";			
				htmlvid += jsonData.video.playcode;
				//alert(jsonData.video.playcode);
				$(".videobox").html(htmlvid);
				}
        });
 }
/*添加课程计划*/
 function addplan(cid) {
	 $.ajax({
            type: "post",
            dataType: "json",
			data:{"courseId":cid},
            url: $._CACHEOBJ.context+"/user/courseplan/add",
            success: function (pln) {
				if(pln.status== "SUCCESS"){
				$(".addplan").hide();
				$(".rmoveplan").show();
				$(".progressbar").show();
				$(".catlog ul").addClass("canwarch");
				readyitem(cid,hasc);
				}
				else{
				mainModule.assertCookieExpired(pln);
				$('.login_dl').show();  
            	$('.loginbg').height($(document).height())
					
				}
            }
        });
 }
/*删除课程计划*/
 function delplan(cid) {
	 $.ajax({
            type: "post",
            dataType: "json",
			data:{"courseId":cid},
            url: $._CACHEOBJ.context+"/user/courseplan/del",
            success: function (pln) {
				readyitem(cid,hasc);
            }
        });
 }
/*已学课时*/
 function havelearn(cid) {
	 $.ajax({
            type: "post",
            dataType: "json",
			data:{"courseId":cid},
            url: $._CACHEOBJ.context+"/user/courseplan/chapter/learnedlist",
            success: function (hvlen) {
				if(hvlen.status== "SUCCESS"){
					var nub=$(".catlog .ks").length;
					var hvlennub=hvlen.content.length;
					var pro =(hvlennub/nub)*100;
					$(".progress_wd b").text(hvlennub);
					$(".progress span i").css("width",pro+"%");					
					for(var i=0;i<hvlen.content.length; i++){
					var havelenid=hvlen.content[i].chapterId;
					$("#"+havelenid+" .radio").addClass("choosed");
					}
					if(hvlen.content.length>0){
						$("#startstudy").text("继续学习")
						}
				}
				else{
					
				}		
            }
        });
 }
/*课程是否已经加入计划*/
function catlogplan(couid){
	$.ajax({
            type: "post",
            dataType: "json",
            url: $._CACHEOBJ.context+"/user/courseplan/planDetail",
			data:{"courseId":couid},
            success: function (pl) {
			if(pl.status== "SUCCESS"){
				$(".addplan").hide();
				$(".rmoveplan").show();
				$(".progressbar").show();
				$(".catlog ul").addClass("canwarch");	
				var ccid1=$(".catlog li.ks").eq(0).attr("id");
				if(pl.content.currentChapter==null || pl.content==null){
					$("#startstudy").attr("href","../course/play.html?courseName="+courseName+"&courseId=" + couid+"&chapterId="+ccid1);
					$(".nextls i").text($("#"+ccid1).find(".title").text());
					var href1=$("#"+ccid1).find(".freebtn").attr("href")
					$(".nextls a").attr("href",href1)
				}
				else{
					var ccid=pl.content.currentChapter.id;
					$("#startstudy").attr("href","../course/play.html?courseName="+courseName+"&courseId=" + couid+"&chapterId="+ccid);
					var nextid=$("#"+ccid).next()
					var nexttxt=nextid.find(".title").text();
					var nexttxt2=nextid.next().find(".title").text();
					//alert(ccid)
					if(!nextid.attr("id")){
						if(nexttxt2==""){
						$(".nextls i").text("最后一个课时已学完")
						}
						else{
							$(".nextls i").text(nexttxt2)
							var href1=nextid.next().find(".freebtn").attr("href")
							$(".nextls a").attr("href",href1)
							}
						}
					else{
						$(".nextls i").text(nexttxt)
						var href1=nextid.find(".freebtn").attr("href");
						//alert(href1)
						$(".nextls a").attr("href",href1)
						}
					}
				havelearn(couid);
			}			
			else{
				$(".rmoveplan").hide();
				$(".addplan").show();
				$(".progressbar").hide();
				$(".catlog ul").removeClass("canwarch");
			}
			
            }
        });
}
/*日期时间转化*/
function formatDate(date){
        var date=new Date(date),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            datetime=year+'-'+month+'-'+day;
        return datetime;
    }
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            }
    }
		if(theTime==0){
		    var result ="00";
			}
		else if(theTime>0&&theTime<10){
			var result ="0"+parseInt(theTime);
			}
		else{
        	result = ""+parseInt(theTime);
			}
        if(theTime1 > 0&&theTime1 < 10) {
        	result = "0"+parseInt(theTime1)+":"+result;
        }
		else{result = ""+parseInt(theTime1)+":"+result;}
        if(theTime2 > 0) {
        	result = ""+parseInt(theTime2)+":"+result;
        }
    return result;
}
function hours(value) {
    var theTime1 = 1;      
	if(value > 3600) {
	theTime1 = parseInt(value/3600);
	if(value%3600>=1800){
		theTime1=theTime1+1
		}
    }
    
    return theTime1;
}





