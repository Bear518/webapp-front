var hasc,lestit;;
$(function() {
	var couid =mainModule.getQueryValueByName("courseid");	
	window.courseId=couid;

	
	// 完善信息送会员弹框
	$('#tk_dl4').on('click','.btn-right',function(){
		$('#tk_dl4').hide();
		$('#j_thlogin_popbg').show();
		//刷新绑定的验证码
		refreshImgCode();
		// 绑定窗口图片显示
		setThImg();
		$('#j_complete_accountbind_popbox').show().find('.now-login').data('type',1);
	});
	$('#tk_dl4').on('click','.close',function(){
		$('#tk_dl4').hide();
	});
	/*课程详情*/	 
	
	$.ajax({
            type: "get",
            dataType: "json",
            async:false,
            url: $._CACHEOBJ.context+"/course/info/"+couid,
            success: function (pre) {
            	if(pre.code=='expire'){
            		window.stopContinue=true;
            		alert('该课程已下架!');
            		return;
            	}
            	window.courseName=encodeURIComponent(pre.content.name);
            	document.title=pre.content.name+'_课程介绍_极视教育网';
				hasc=pre.content.hasCourse;
				lestit=pre.content.name;
				var pic=pre.content.picture;
				window.coursePicture=pic;
				var courprc=pre.content.price
				$(".courseprc").text(courprc);
				
                var htmlpre = "";			
			htmlpre += '<h3>' + lestit + '</h3><div class="kwlist"><ul>';
			var hard=pre.content.hard;
			if(hard&&hard==1){
				htmlpre += '<li>初级</li>'
				}
			else if(hard&&hard==2){
				htmlpre += '<li>中级</li>'
				}
			else if(hard&&hard==3) {
				htmlpre += '<li>高级</li>'
				}
			
			htmlpre += '</ul><span><a class="fx" href="#"><i class="ico_fx"></i><b></b>';
			htmlpre += '<div class="share-wrap2"><span><i class="i-icon i-size i-sina share-item" data-type="sina"></i><i class="i-icon i-size i-qq share-item" data-type="qqzone"></i><i class="i-icon i-size i-wx share-item wxdj" data-type="wx"></i></span></div></a>';	
			if(pre.content.hasCollection ==true){		
				htmlpre += '<a class="sc" href="#"><i class="ico_sc on"></i><b>'+pre.content.collectionNum+'</b></a>';}
			else{
				htmlpre += '<a class="sc" href="#"><i class="ico_sc"></i><b>'+pre.content.collectionNum+'</b></a>';
				}
			htmlpre += '</span></div><pre class="intro_wd">' + pre.content.description + '</pre><ul class="infolist"><li class="learn"><i></i><span>' + pre.content.watchedNum + '</span><b></b></li><li class="zan"><i></i><span>' + pre.content.likesNum + '</span><b></b></li><li class="ks"><i></i><span>' + pre.content.totalLessons + '课时</span><b></b></li><li class="times"><i></i><span>' + hours(pre.content.totalTimes) + '小时</span><b></b></li>';
			if(pre.content.updateStatue==1){
				htmlpre += '<li class="genx"><i></i><span>连载中</span></li>';
				$('.updateStatue').text("连载中")
			}
			else if(pre.content.updateStatue==2){
				htmlpre += '<li class="genx"><i></i><span>已完结</span></li>';
				$('.updateStatue').text("已完结")
			}			
			htmlpre += '</ul>';
			
			
			if(pre.content.type==1){
				htmlpre += '<div class="dzbox1"><span class="types" style="color:#ff9001">会员</span>';
				}
			else if(pre.content.type==0){
				htmlpre += '<div class="dzbox1"><span class="types">免费</span>';
				$(".catlog ul").attr("id","allfree");
				}
			else if(pre.content.type==2){
				
				htmlpre += '<div class="dzbox1"><span class="types" style="color:#e30202">￥'+courprc;
				var cost=pre.content.originalCost;
				if(cost){
					htmlpre += '<i>￥'+cost+'</i>';
					$(".oldprc i").text(cost);
				}	
				else{
					$(".oldprc").hide();
					}			
				htmlpre += '</span>';//单课
				}
			//htmlpre += '<div class="dzbox1"><span class="types">免费</span>'
			if(pre.content.type==1){
				htmlpre += '<a class="addplan jr1" href="javascript:void(0);" data-jr="1">开始学习</a>';
				}
			else if(pre.content.type==0){
				htmlpre += '<a class="addplan jr0" href="javascript:void(0);" data-jr="1">开始学习</a>';
				}
			else if(pre.content.type==2){
				htmlpre += '<a class="addplan jr2" href="javascript:void(0);" data-jr="1">开始学习</a>';
				}
			else{
				htmlpre += '<a class="addplan jr3" href="javascript:void(0);" data-jr="1">开始学习</a>';
				}
				htmlpre += '<a id="startstudy" href="javascript:void(0);" target="_blank" style="display:none">继续学习</a></div>';
			
			//课程购买链接			
			$(".courbtn").attr("href","/view/vip/coursebuy.html?id="+couid)
			$(".introbox").html(htmlpre);
			
			//课程简介
			var htmldes = "";		
			htmldes =pre.content.introduce;				
			if(htmldes){
				$(".wiki").html(htmldes).show();;
				$("#wiki").show();
				htmldes = htmldes.replace(/<script>/g,' &lt; script &gt;');
			}			
			else{
				$("#wiki").hide();
				$("#catlog").addClass("on");
				$(".catlog").show();
			}
			//收藏分享
			//$(".kwlist .sc b").text(pre.content.collectionNum);
			
			
			var tid=pre.content.teacherId;
			var instituteid=pre.content.organizationId;
			tid&&teacher(tid);
			instituteid&&institute(instituteid);
			if(!tid&&!instituteid){
				// $('.introinfo_site').hide()
			}
			readyitem(couid,hasc)
			fengx(lestit,pic);
			
            }
			
        });	
		if(window.stopContinue){
			return;
		}
		var getRecommanedMapByCourse=(function(){
			var renderDom=function(result){
				if(!result||result.length<1){
		         	$('#j_recommand_map_wrap').hide();
		         	return;
		        }
				var dom='';
				// result.push(result[0]);
				for(var i=0,ii=result.length;i<ii;i++){
					var item=result[i];
					dom+='<a target="_blank" href="/view/zytp/detail.html?id='+item.id+'"><div class="img-wrap f-l"><img src="'+item.picture+'"></div>'+
			                '<div class="r-wrap f-l">'+
			                    '<h4>'+item.name+'</h4>'+
			                    '<p>'+item.description+'</p>'+
			                '</div></a>';
		         }

		        $('#j_recommand_map_wrap').show()
		        $('#j_recommand_map_wrap').find('.c-wrap').html(dom);
			}
			$.ajax({
				type:'get',
				url:mainModule.uri.getRecommanedMapByCourse+couid,
				success:function(result){
					mainModule.log('推荐职业图谱接口返回：',result);
					mainModule.httpInterceptor(result,function(result){
						renderDom(result);
					})
				}
			})
		})();
		videopre(courseId);	
		getRecommandedJob(courseId);
		/*tab切换*/
		$(".introinfo_tab a").click(function(){		
			$(this).addClass("on").siblings().removeClass("on");;
			var id = $(this).attr("id")
			$("."+id).show().siblings().hide();
		})	
		$('.introbox').on('click','.share-wrap2 i',function(){
			$.ajax({
	            type: "get",
	            dataType: "json",
	            url: $._CACHEOBJ.context+"/course/updateShareNum",
				data:{"id":couid},
	            success: function (mbx) {					
				if(mbx.status== "SUCCESS"){
					
				}}
			})
		})
		function fengx(lestit,pic){
		var link=mainModule.shareUriAddSearch({url:location.href,activityCode:'RECRUIT_USER'});
	shareModule.shareParamsInit({title:'沉迷学习！获得游戏开发成长属性！',url:link,desc:'我正在参加@极视教育 的课程《'+lestit+'》，一起来沉迷学习，创造你的游戏世界！',activityCode:'RECRUIT_USER',pic:'http://www.skillbridge.cn'+pic});
                shareModule.generateQRCode(link);
		}
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
                   
                  var curItem={};
				  if(result&&result[0]){
					  curItem = result[0];
					  }
                    mainModule.log('当前渲染的面包屑数据',curItem);
                   //indushref='/view/seek/course.html?industryId='+curItem.industryId,
                      var dirhref='/view/seek/course.html?directionId='+(curItem.directionId||''),
                       sorthref='/view/seek/course.html?directionId='+(curItem.directionId||'')+'&sortId='+(curItem.sortId||'');
					
					htmlmbx += '<a href="/">首页</a>  >  <a href="/view/seek/course.html">全部课程</a>  > <a href="'+dirhref+'">' + curItem.directionName + '</a>  >  <a href="'+sorthref+'">' + curItem.sortName + '</a>';
			$(".kwlist .fl").text(curItem.directionName)
			}			
			else{
			}
			$(".crumbs").html(htmlmbx);
            }
        });
	/*收藏*/
	$('.introbox').on('click','.kwlist .sc',function(){
	$.ajax({
            type: "post",
            dataType: "json",
            url: $._CACHEOBJ.context+"/user/courseCollection/add",
			data:{"courseId":couid},
            success: function (dl) {				
			if(dl.status== "SUCCESS"){
				//alert("收藏成功");
				var scnum=parseInt($(".kwlist .sc b").text());
				$(".kwlist .sc b").text(scnum+1);
				$(".ico_sc").addClass("on");
			}			
			else{
				if(mainModule.getCookie('islogin')){
					//wordworm(dl.message);					
					mainModule.showGlobalHintBar(dl.message);
				}
				else{
					$('.login_dl').show();  
            		$('.loginbg').height($(document).height());
					}
			}
            }
        });
	});
	$("#downld").click(function(){
		dl(couid);
		})
	/*评论*/
	$("#comment").click(function(){
		getcomment(pldata(0,couid))
		})
	
	
	/*add评论*/
	if(mainModule.getCookie('islogin')){
		$(".addcomment").click(function(){		
			addcomment(couid)		
		})	
	}
	else{
		$(".addcomment").click(function(){	
			$('.login_dl').show();  
			$('.loginbg').height($(document).height());
			})
		}
	
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
		
		
	
	/*相关课程*/
	$.ajax({
		type: "get",
		dataType: "json",
		url: $._CACHEOBJ.context+"/course/recommendCourse",
		data:{"courseId":couid},
		success: function (dl) {
		var htmlabt = "";	
		if(dl.status== "SUCCESS"){
			if(dl.content.length>0){
				for(var i=0; i<dl.content.length; i++){
				htmlabt += '<li><div class="lessonimg-box img-hover-bigger"><a href="/view/lesson/lessonintroNew.html?courseid='+dl.content[i].id + '" target="_blank"><img src="' + dl.content[i].picture + '" class="lessonimg"></a></div>';                
				htmlabt += '<div class="lesson-infor"><h2 class="lesson-info-h2"><a href="/view/lesson/lessonintroNew.html?courseid='+dl.content[i].id + '" target="_blank">' + dl.content[i].name + '</a></h2>';
	
				htmlabt += '<div class="lesson-info"><div class=""><i class="renshu-icon"></i> <em>' + dl.content[i].watchedNum + '</em></div>';
				
				if(dl.content[i].type==1){
				htmlabt += '<div class="clearfix"><span class="vip">会员</span>';
				}
			else if(dl.content[i].type==0){
				htmlabt += '<div class="clearfix"><span class="free">免费</span>';
				$(".catlog ul").attr("id","allfree");
				}
			else if(dl.content[i].type==2){
				htmlabt += '<div class="clearfix"><span class="money">￥'+dl.content[i].price;
				var cost=dl.content[i].originalCost;
				if(cost){
					htmlabt += '<i>￥'+cost+'</i>';
				}	
						
				htmlabt += '</span>';			
				
				
				}
				
				
				var hard=dl.content[i].hard;
				if(hard==1){
					htmlabt += '<span class="f-r">初级</span>'
					}
				else if(hard==2){
					htmlabt += '<span class="f-r">中级</span>'
					}
				else {
					htmlabt += '<span class="f-r">高级</span>'
					}
				
				
				htmlabt += '</div></div></div></li>';
				}
				$(".aboutles").html(htmlabt);
			}
			else if(dl.content.length==0){
				$(".courbagbar").hide();
				}
		}			
		else{
			
		}
		}
	});
	/*加入计划*/	
	$('body').on('click','.addplan',function(){
		if(mainModule.getCookie('islogin')){
			var cls=$(this).attr("class")
			if(!!!hasc){
				if(cls=="addplan jr0"){
					addplan(couid);
					// to do
					var href=$(".catlog ul").children().first().find('.freebtn').attr('href');
					href&&window.open(href,'_blank');
				}	
				else if(cls=="addplan jr1"){
					if(mainModule.noAccountBound){
						$('#tk_dl4').show();
						return;
					}
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
				var href=$(".catlog ul").children().first().find('.freebtn').attr('href');
				href&&window.open(href,'_blank');
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
		var $this=$(this);
		if(mainModule.getCookie('islogin')){
			var href=$this.next().attr('href');
			href&&window.open(href,'_blank');
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
	/*取消计划
	$('.introbox').on('click','.rmoveplan',function(){
		$(this).hide();
		$(".addplan").show();
		$(".progressbar").hide();
		$(".catlog ul").removeClass("canwarch");
		delplan(couid);
	})	*/
	/*关闭弹层*/
	$(".tk_box .iconfont").click(function(){		
		$(".tk_dl").hide();
	});
	/*点击列表付费*/
	$('.catlog').on('click','.payflern',function(){
		if($('.addplan').hasClass("jr1")){
			if(mainModule.noAccountBound){
				$('#tk_dl4').show();
				return;
			}
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
            url:$._CACHEOBJ.context+"/course/courseChapter/chapterList",
			data:{"courseId":couid},
            success: function (chapnum) {
            var htmlchap = "",nub = 0,catlog= $(".catlog ul").attr("id"),index=0,subc=chapnum.content;			
			
			for(var j=0; j<subc.length; j++){
				var jnum=j+1;
				htmlchap += '<li class="ks" id="' + subc[j].id + '"><span class="mul">课时 ' + (++index) + '</span><span class="title">' + subc[j].name + '</span>';
				if(subc[j].duration==null){
					htmlchap += '<span class="radio"></span><span class="k_time"><i></i></span>';
				}
				else{
				htmlchap += '<span class="radio"></span><span class="k_time"><i></i>' + formatSeconds(subc[j].duration) + '</span>';}
				if(mainModule.getCookie('islogin')){//已登录						
					if(catlog == "allfree"){//免费课程
						htmlchap += '<a class="jrbtn" href="javascript:" data-jr="1">学习</a>';
						htmlchap += '<a class="freebtn" target="_blank" href="../course/play.html?courseId=' + couid+'&chapterId='+subc[j].id + '&courseName='+courseName+'"></a>';
					}
					else{//付费课程							
						if(hasc==true){//已付费
							htmlchap += '<a class="jrbtn" href="javascript:" data-jr="1">学习</a>';
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
						htmlchap += '<a class="jrbtn_m" href="javascript:" data-jr="1">学习</a>';
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
			
			var vid=subc[0].vedioCode;
			$(".catlog ul").html(htmlchap);
			if(mainModule.getCookie('islogin')){			
			catlogplan(couid);}
			else{
				$(".addplan").show();
				}
            }
			
        });

}
/*讲师详情*/
 function teacher(tid) {
 	var $contain=$('.teainfo');
	 $.ajax({
            type: "get",
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
					htmltea += '<div class="info"><pre>' + tea.content.description + '</pre><p>' + tea.content.signature + '</p></div>';
					
				}else{
				  var htmltea = "";
				  htmltea += '<img src="../../img/lessonintro/js.jpg"/><p class="name">匿名</p><div class="info"></div>';
				  
				}	
				$(".teacherbox").html(htmltea);
				$contain.show();
				var instit=tea.content.institute;
				if(instit){
					var htmlins = "";		
					htmlins += '<p class="instit">机构信息</p><div class="insinfo"><p class="insname">' + instit.name +'</p><pre>'+ instit.description+'</pre></div>';
					
					$(".institutebox").html(htmlins);
				}
				else{
					$(".institutebox").hide();
				}
            }
			
        });
 }
/*添加评论*/
function addcomment(couid) {
	var comment= $('#commentitem').val();
	comment=comment.replace(/</g,' &lt;');
	//alert(comment)
	if (comment == "") {		
		//wordworm("请输入评论内容");
		mainModule.showGlobalHintBar('请输入评论内容!');
		return false;
	}
	$.ajax({
            type: "post",
            dataType: "json",
            url: $._CACHEOBJ.context+"/course/courseCommon/add",
			data:{"courseId":couid,"comment":comment},
            success: function (pl) {
			if(pl.status== "SUCCESS"){
				//wordworm("添加评论成功!");
				//mainModule.showGlobalHintBar('添加评论成功!');
				$('#commentitem').val("");
				isHasPaged=false;
				getcomment(pldata(0,couid));
				}
			else{
				
			}
            }
        });	
}
var isHasPaged=false;
/*评论*/
function getcomment(data,topage){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/course/courseCommon/list?rad="+Math.random()*1,
			data:data,
            success: function (pl) {
				if(topage){isHasPaged=false;}
            var htmlcmt = "";
			if(pl.status== "SUCCESS"){
				$(".plnub i").text(pl.content.total);
				var pllistnum=pl.content.rows.length;				
				if(pllistnum>0){
					for(var j=0; j<pllistnum; j++){
					var dpdate=pl.content.rows[j].createDate;
					
					var dtime = $.timeago(dpdate);
					
					htmlcmt += '<li class=" clearfix">';
					//if(mainModule.getCookie('photo'))
					var icon=pl.content.rows[j].icon||'/img/info/setinfo/1.png';
					htmlcmt += '<img src="'+icon+'"/>'+					
					'<div class="comment_item">';
					var ncname=pl.content.rows[j].nickName
					if(!ncname){
						if(!pl.content.rows[j].mobilePhone){
							ncname=pl.content.rows[j].email||'***';
						}else
						{
							ncname=pl.content.rows[j].mobilePhone;
						}						
					}
					ncname=mainModule.htmlEscape(ncname);
					var comment=pl.content.rows[j].comment;
					pl.content.rows[j].comment=mainModule.htmlEscape(comment);	
					htmlcmt += '<div class="comment_cap"><span>' + ncname + '</span>';
					var nowdate=new Date().getTime();
					var vipEndDate=new Date(pl.content.rows[j].vipEndDate).getTime()
					var ifvip=vipEndDate-nowdate;
					if(ifvip>0){					
					htmlcmt += '<i class="v">vip</i>';
					}
					if(pl.content.rows[j].good==1){
					htmlcmt += '<i class="j">精</i>';
					}
					htmlcmt += '</div><pre class="comment_con">' + pl.content.rows[j].comment + '</pre><span class="commif">';
					if(pl.content.rows[j].chapterName!==null){
					htmlcmt += '源自：<a href="/view/course/play.html?courseId=' + data.courseId+'&chapterId=' + pl.content.rows[j].chapterId+'&courseName=' + pl.content.rows[j].chapterName+'" target="_blank"><i>' + pl.content.rows[j].chapterName+'</i></a>';}
					htmlcmt += '<i> ' + dtime + '</i></span>';
					if(pl.content.rows[j].system==1){
						htmlcmt += '<div class="cback"><img src="../../img/lessonintro/tx.png"/><div class="comment_item comment_item2"><div class="comment_cap"><span>' + pl.content.rows[j].systemUserName+'</span></div><span class="comment_con">' + pl.content.rows[j].systemComment+'</span></div></div>';
						}
					htmlcmt += '</div><div class="clear"></div></li>';
					}
				}
				else{//没有评论
					htmlcmt += '<span class="nols"><i>此课程暂无评论</i></span>';
				}
				//分页
				
				if(pl.content.total%data.rows==0){totalPage=parseInt(pl.content.total/data.rows);}
				else{totalPage=parseInt(pl.content.total/data.rows)+1;}
				if(pl.content.total<=5){$('.pagination').hide();}
				 if(pl.content.total>5&&!isHasPaged){
					 $('.pagination').show();
					 $('.pagination').off('click');
				 	 $('.pagination').createPage({
					  pageCount:totalPage,
					  current:1,
					  isHasGoto:false,
					  backFn:function(page){
						  //单击回调方法，p是当前页码						  
						   getcomment(pldata(page,data.courseId))  ;  
					  }
            	 	});
				 }
				 isHasPaged=true;
			}
			else{//没有评论
				htmlcmt += '<span class="nols"><i>此课程暂无评论</i></span>';
			}
			$(".comment ul").html(htmlcmt);
            }
        });	
}
function pldata(page,couid){	
	var pageSize = "5";//每页行数
	if(page==0){
		var currentPage = "1";//当前页
	}
	else{
		var currentPage = page;//当前页
	}
	var data={
		courseId:couid,
		page:currentPage,
		rows:pageSize,	
	}
	return data;	
}	
/*video*/
 function videopre(vid) {
 	// ccvedio/vedioPalyCode
	 $.ajax({
            type: "get",
            dataType: "json",
            data:{courseId:courseId},
            url: $._CACHEOBJ.context+"/course/introductionPlayCode",
            success: function (result) {
				// var jsonData=JSON.parse(vio.content);
    			//             var htmlvid = "";			
				// htmlvid += jsonData.video.playcode;
				// htmlvid=htmlvid.replace(/width=600&height=490/g,'width=405&height=248');
				var si=setInterval(function(){
                        if(window.Player){
                        	try{
                        		// window.jsPlayer.aliPlayer.loadByUrl(result.content,2);
                        		var playerThree=new Player({
			                        id:'j_video_405x248_wrap',
			                        source:result.content,
			                        cover:window.coursePicture,
			                        width:'400px',
			                        height:'225px',
			                        debug:false,
			                    });
	                            // window.jsPlayer.aliPlayer.pause();
	                            clearInterval(si);
                        	}catch(e){
                        		console.log(e);
                        	}
                            
                        }
                    },1000);
				// $(".videobox").html(htmlvid);
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
				$("#startstudy").show();
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
            type: "get",
            dataType: "json",
			data:{"courseId":cid},
            url: $._CACHEOBJ.context+"/user/courseplan/chapter/learnedlist",
            success: function (hvlen) {
				if(hvlen.status== "SUCCESS"){
					var nub=$(".catlog .ks").length;
					var hvlennub=hvlen.content.length;
					var pro =(hvlennub/nub)*100;
					var pro2 =Math.round((hvlennub/nub)*100);
					$(".progress_wd b").text(hvlennub);
					$(".progress span i").css("width",pro+"%");	
					$(".pronum").html('<span class="pronum2">'+pro2+'</span>%')			
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
					if(pl.content){
					$(".addplan").hide();
					$("#startstudy").show();
					$(".progressbar").show();
					$(".catlog ul").addClass("canwarch");	
					var ccid1=$(".catlog li.ks").eq(0).attr("id");
					if(!pl.content.currentChapter){
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
							$(".nextls a").attr("href",href1)
						}
					}
						havelearn(couid);
				}
				else{
					$("#startstudy").hide();
					$(".addplan").show();
					$(".progressbar").hide();
					$(".catlog ul").removeClass("canwarch");
					}
				}	
					
			else{
				
			}
			
            }
        });
}
// 推荐课程
var getRecommandedJob=function(courseId){
	$.ajax({
		type:'get',
		data:{courseId:courseId,page:1,rows:5},
		url:mainModule.uri.jobRecommendByCourse,
		success:function(result){
			mainModule.log('该课程的职位推荐',result);
			mainModule.httpInterceptor(result,renderJobDom);
		}
	})
},renderJobDom=function(result){
	if(!result||result.length<1){
		return;
	}
	var dom='';
	for(var i=0,ii=result.length;i<ii;i++){
		var item=result[i];
		item.updateDate=mainModule.formatFulldate(item.updateDate).date;
		dom+='<li>'+
				'<a target="_blank" href="/view/xzjy/detail.html?id='+item.id+'" class="name">'+item.jobName+'</a>'+
            	'<div class="clearfix"><span class="time">'+item.updateDate+'</span><span class="area"><i></i>'+item.address+'</span></div>'+
            '</li>';
	}
	var $wrap=$('#j_job_list_wrap');
	$wrap.find('.j_job_list').html(dom);
	$wrap.show();
};
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
function wordworm(text){	
	$(".worm").show();
	$(".worm span").text(text).addClass("up");	
	setTimeout(function () { 
        $(".worm span").removeClass();
    }, 2000);
}

/*DOWNLODE列表*/
function dl(couid){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/courseData/dataList",
			data:{"courseId":couid,"page":1,"rows":10},
            success: function (dl) {
			var htmldl = "";		
			if(dl.status== "SUCCESS"){
				if(dl.content.rows.length>0){
					for(var i=0; i<dl.content.rows.length; i++){
						var item=dl.content.rows[i],sz=item.size;
						if(sz<1024){sz='1KB'}
						else{sz=Math.floor(sz/1024)+'KB';}
						htmldl += '<li><i class="dicon"></i><span class="dname">' + item.name + '</span><span class="dif">' + sz + '</span><a id="' + dl.content.rows[i].id + '" href="javascript:;"><i></i>下载</a></li>';
					}
					
				}
				else{
					htmldl += '<span class="nodata">暂无下载资源</span>';
				}
			}			
			else{
				htmldl += '<span class="nodata">暂无下载资源</span>';
			}
			$(".downld ul").html(htmldl);
            }
        });
}

