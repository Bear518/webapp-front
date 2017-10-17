var mycourseModule={
	bindEvents:function(){
	/*tab切换*/
		mycourseModule.isHasPaged=false;
		mycourseModule.isHasPaged2=false;
		// $(".menu-wrap li").click(function(){		
		// 	$(this).addClass("on").siblings().removeClass("on");;
		// 	var id = $(this).attr("id")
		// 	$("."+id).show().siblings().hide();
		// 	document.title=$(this).html()+'_极视教育网';
		// })
		$(".infotab a").click(function(){		
			$(this).addClass("on").siblings().removeClass("on");;
			var id = $(this).attr("id")
			$("."+id).show().siblings().hide(); 
			//mycourseModule.isHasPaged=false;       
		})
		$("#j_popupCancel").click(function(){		
			$("#tk_dl1").hide();
		})
		$('.learning').on('click','.tkcls',function(){
			$("#tk_dl1").show();
			$('.loginbg').height($(document).height());
			var cid=$(this).data("id");
			$(".courbtn").data("cbid",cid)
		})
		$('.mycollect').on('click','.tkcls',function(){			
			var cid=$(this).data("id");
			mycourseModule.delMyCollection(cid);
		})
		$("#tk_dl1 .courbtn").click(function(){
			var cbid=$(this).data("cbid");
			mycourseModule.delMyCoursePlan(cbid);
		})
		$('.learning').on('click','.les_bj',function(){			
			var id=$(this).data("id");
			$(".wdbj").show().siblings().hide();
			var wdjlname=$(this).parent().find(".nowlesname").text();
			$(".wdbj_title").text(wdjlname)
			mycourseModule.getNoteList(id);
		})
		$('.wdbj').on('click','.bjinfo_title .iconfont',function(){	
			var cid=$(this).data("cid"),nid=$(this).data("nid");
			mycourseModule.delMyNote(cid,nid);
		})
		$('.wdbj').on('click','.bebig',function(){	
			var bjtitle=$(this).parent(),bjli=bjtitle.parent(),
			bjname=bjtitle.find("span").text(),
			bjcont=bjli.find(".bjinfo_word").text(),
			bjtime=bjli.find(".bjinfo_time").text(),
			bjhref=bjli.find(".bjinfo_time").attr("href"),
			id=$(this).data("id"),
			cid=$(this).data("cid");
			$(".bjdata").text(bjname);
			$(".tk_main p").text(bjcont);$(".tk_main textarea").text(bjcont);
			$(".bjtime").text(bjtime).attr("href",bjhref);
			if(!bjtime){
				$(".bjtime").hide();
				}
			$("#tk_dl2").show();
			$('.loginbg').height($(document).height());
			$(".editbtn").attr("id",id);
			$(".editbtn").attr("data-cid",cid);
		})
		$(".tkcls2").click(function(){		
			$("#tk_dl2").hide();
			$("#tk_dl2 .tk_main p").show().siblings().hide();
		})
		$(".edit").click(function(){		
			$(".tk_main p").hide();
			$(".tk_main textarea").show();
			$("#tk_dl2 .tk_btn").show();
		})
		$(".editbtn").click(function(){		
			var bjcont2=$(".tk_main textarea").val(),id=$(this).attr("id"),cid=$(this).data("cid");
			bjcont2=bjcont2.replace(/</g,' &lt;');
			$(".tk_main p").text(bjcont2);
			$(".tk_main p").show();
			$(".tk_main textarea").hide();
			$("#tk_dl2 .tk_btn").hide();
			mycourseModule.updateMyNote(bjcont2,id,cid)
		})
		$(".fwtktb").click(function(){		
			$(".fwtk").show().siblings().hide();
		})
	},
	getLearningCourseList:function(data){
		var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getMyCoursePlan,
			data:data,
            success:function(result){
                mainModule.log('获取我的课程列表接口返回',result);
				var dom ="";
                if(result.status=='SUCCESS'){
					if(result.content){
						var cont=result.content,list=cont.rows,ii=list.length;										
						for(var i=0;i<ii;i++){
							var rows=list[i];
							dom += '<li data-cid="'+ rows.courseId +'"><a class="nowlesimg" href="/view/lesson/lessonintro.html?courseid='+rows.courseId+'" target="_blank"><img src="'+ rows.picture +'"></a>'+
							'<a class="nowlesname" href="/view/lesson/lessonintro.html?courseid='+rows.courseId+'" target="_blank">'+ rows.courseName +'</a><span class="les_jd">';
							var updateStatue=rows.updateStatue,
							updchap=rows.updateChapter,
							currchap=rows.currentChapter,
							nextchap=rows.nextChapter;
							if(updateStatue&&updateStatue==1&&updchap){
							dom +='更新至：'+updchap.name+' &nbsp;&nbsp;&nbsp;&nbsp;'; }
							else{dom +='已完结 &nbsp;&nbsp;&nbsp;&nbsp;';}							
							dom +='学习进度：<i class="yel">' +rows.finishPercent+ '</i></span>';	
							
							var href=currchap&&'/view/course/play.html?courseId='+currchap.courseId+'&chapterId='+currchap.id,
							curDom=currchap?('<a title="'+currchap.name+'" class="c-name" href="'+href+'" target="_blank">'+currchap.name+'</a>'):('暂无');							
							dom +='学至：'+curDom+'&nbsp;&nbsp;&nbsp;&nbsp;'	
							
							var nxthref=nextchap&&'/view/course/play.html?courseId='+nextchap.courseId+'&chapterId='+nextchap.id,
							nexDom=nextchap?('<a title="'+nextchap.name+'" class="c-name" href="'+nxthref+'" target="_blank">'+nextchap.name+'</a>'):('无');	
							dom +='下一个课时：'+nexDom+'<br>'	
							//if(nextchap){
							//dom +='下一个课时： <a class="" href="/view/course/play.html?courseId='+nextchap.courseId+'&chapterId='+nextchap.id+'" target="_blank">'+nextchap.name+'</a><br>';}
							//else{dom +='下一个课时：无<br>';}							
							dom +='<a class="les_bj" href="javascript:;" data-id="'+ rows.courseId +'">笔记 '+rows.totalNoteNumber+'</a>'+
							'<i class="iconfont tkcls" data-id="'+ rows.courseId +'">&#xe604;</i></li>';
						  }
						if(ii==0){
							dom += '<span class="nodata">暂无正在学习的课程</span>';
						}
						$('.learning ul').html(dom); 
						
						if(cont.total%data.rows==0){totalPage=parseInt(cont.total/data.rows);}
						else{totalPage=parseInt(cont.total/data.rows)+1;}
						if(cont.total<=5){$('.pagination').hide();}
						if(cont.total>5&&!mycourseModule.isHasPaged){
							 $('.pagination').show();
							 $('.pagination').off('click');
							 $('.pagination').createPage({
							  pageCount:totalPage,
							  current:1,
							  isHasGoto:false,
							  backFn:function(page){
								  //单击回调方法，p是当前页码						  
								   mycourseModule.getLearningCourseList(mycourseModule.pldata(page))  ;  
							  }
							});
						 }
						 mycourseModule.isHasPaged=true;
					}else{
						
					}
				}else{
					
				}
            }
        })
	},
	
	getCollectionCourseList:function(data){
		var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.courseCollectionList,
			data:data,
            success:function(result){
                mainModule.log('获取我的收藏列表接口返回',result);
				var dom ="";
                if(result.status=='SUCCESS'){
					if(result.content){
						var cont=result.content,list=cont.rows,ii=list.length;	
						if(ii>0){			
						  for(var i=0;i<ii;i++){
							var rows=list[i];
							dom += '<li data-cid="'+ rows.id +'"><a class="nowlesimg" href="/view/lesson/lessonintro.html?courseid='+rows.courseId+'" target="_blank"><img src="'+ rows.picture +'"></a>'+
							'<div class="mycol_info"><a class="nowlesname mar_t_10" href="/view/lesson/lessonintro.html?courseid='+rows.courseId+'" target="_blank">'+ rows.courseName +'</a><span class="les_jd">';
							var updateStatue=rows.updateStatue,
							updchap=rows.updateChapter,
							currchap=rows.currentChapter,
							nextchap=rows.nextChapter;
							if(updateStatue&&updateStatue==1&&updchap){
							dom +='更新至：'+updchap.name+' &nbsp;&nbsp;&nbsp;&nbsp;'; }
							else{dom +='已完结 &nbsp;&nbsp;&nbsp;&nbsp;';}
							
							dom +='</span>'+
							'<div class="lesson-info">';
							
							if(rows.type==1){
							dom += '<span class="vip">会员</span>';}
							else if(rows.type==0){
							dom += '<span class="free">免费</span>';}
							else if(rows.type==2){
								var priceStr='<span class="money">￥'+rows.price+'</span>';
								rows.originalCost&&(priceStr='<span class="money">￥'+rows.price+'<i>￥'+rows.originalCost+'</i></span>');
								dom +=priceStr;
							}
							
							rows.hard==1?(rows.hard='初级'):(rows.hard==2?(rows.hard='中级'):(rows.hard==3?(rows.hard='高级'):(rows.hard='等级无')));
							
							dom += '<span class=""><i class="renshu-icon"></i> <em>'+rows.watchedNum+'</em></span>'+
							'<span class="">'+rows.hard+'</span>'+
							'</div></div><i class="iconfont tkcls" data-id="'+ rows.id +'">&#xe604;</i></li>';
						  }
						}
						else if(ii==0){
							dom += '<span class="nodata">暂无收藏的课程</span>';
						}
						$('.mycollect ul').html(dom); 
						
						if(cont.total%data.rows==0){totalPage=parseInt(cont.total/data.rows);}
						else{totalPage=parseInt(cont.total/data.rows)+1;}
						if(cont.total<=5){$('.pagination2').hide();}
						if(cont.total>5&&!mycourseModule.isHasPaged2){
							 $('.pagination2').show();
							 $('.pagination2').off('click');
							 $('.pagination2').createPage({
							  pageCount:totalPage,
							  current:1,
							  isHasGoto:false,
							  backFn:function(page){
								  //单击回调方法，p是当前页码						  
								   mycourseModule.getCollectionCourseList(mycourseModule.pldata(page))  ;  
							  }
							});
						 }
						 mycourseModule.isHasPaged2=true;
					}else{
						
					}
				}else{
					
				}
            }
        })
	},
	
	getNoteList:function(data){
		var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getMyCourseNotes,
			data:{"courseId":data},
            success:function(result){
                mainModule.log('获取我的笔记列表接口返回',result);
				var dom ='<span class="classhour">课时</span>';
                if(result.status=='SUCCESS'){
					if(result.content){
						var cont=result.content,ii=cont.length;	
						if(ii>0){			
						  for(var i=0;i<ii;i++){
							var rows=cont[i],num=i+1;
							
							dom += '<div class="classhourtitle"><i>'+num+'</i><a href="/view/course/play.html?courseid='+rows.courseId+'&chapterId='+rows.chapterId+'" target="_blank">'+rows.chapterName+'</a></div><div class="bjinfo clearfix"><ul>';
							var list=rows.noteList,jj=list.length;
							if(jj>0){			
						 		for(var j=0;j<jj;j++){
									var lis=list[j]
									dom += '<li><i class="icon"></i>'+
									'<div class="bjinfo_title"><span>'+mainModule.formatBirthdate(lis.updateDate)+'</span><i class="iconfont" data-cid="'+ lis.courseId +'" data-nid="'+ lis.id +'">&#xe604;</i><i class="bebig" data-id="'+ lis.id +'" data-cid="'+ lis.courseId +'"></i></div>'+
									'<div class="bjinfo_word">'+lis.content+'</div>';
									if(lis.notePoint){
									dom += '<a href="/view/course/play.html?courseid='+lis.courseId+'&chapterId='+lis.chapterId+'&notePoint='+lis.notePoint+'" class="bjinfo_time" target="_blank">'+mycourseModule.formatSeconds(lis.notePoint)+'</a>';
									}									
									dom += '</li>';
								}
							}							
							dom +='</ul></div>';							
						  }
						}
						else if(ii==0){
							dom += '<span class="nodata">该课程暂无笔记</span>';
							$('.wdbj .info_content').css(border,0);
						}
						$('.wdbj .info_content').html(dom); 
					}else{
						
					}
				}else{
					
				}
            }
        })
	},
	
	delMyCoursePlan:function(id){
		var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.delMyCoursePlan,
			data:{"courseId":id},
            success:function(result){
                mainModule.log('删除正在学习数据',result);				
                if(result.status=='SUCCESS'){
					//$(".learning li[data-cid='"+id+"']").hide();
					$("#tk_dl1").hide();
					//location.reload()
					mycourseModule.getLearningCourseList(mycourseModule.pldata(0));
				}else{
					var rst=result.content;
					if(rst&&rst.message){
					alert(rst.message)}
					else{alert(result.message)}
				}
            }
        })
	},
	
	delMyCollection:function(id){
		var self=this;
        $.ajax({
            type:'get',
            url: $._CACHEOBJ.context+"/user/courseCollection/delete/"+id,			
            success:function(result){
                mainModule.log('删除我的收藏数据',result);				
                if(result.status=='SUCCESS'){
					mycourseModule.getCollectionCourseList(mycourseModule.pldata(0));
				}else{
					var rst=result.content;
					if(rst&&rst.message){
					alert(rst.message)}
					else{alert(result.message)}
				}
            }
        })
	},
	
	delMyNote:function(cid,nid){
		var self=this;
        $.ajax({
            type:'get',
            url: $._CACHEOBJ.context+"/course/note/del/"+nid,			
            success:function(result){
                mainModule.log('删除我的笔记数据',result);				
                if(result.status=='SUCCESS'){
					mycourseModule.getNoteList(cid);
				}else{
					var rst=result.content;
					if(rst&&rst.message){
					alert(rst.message)}
					else{alert(result.message)}
				}
            }
        })
	},
	
	updateMyNote:function(comment,id,cid){
		var self=this;
        $.ajax({
            type:'post',
            url: $._CACHEOBJ.context+"/course/note/update",	
			data:{"content":comment,"id":id},		
            success:function(result){
                mainModule.log('更新我的笔记数据',result);				
                if(result.status=='SUCCESS'){
					mycourseModule.getNoteList(cid);
					
				}else{
					var rst=result.content;
					if(rst&&rst.message){
					alert(rst.message)}
					else{alert(result.message)}
				}
            }
        })
	},
	
	pldata:function(page){	
		var pageSize = "5";//每页行数
		if(page==0){
			var currentPage = "1";//当前页
		}
		else{
			var currentPage = page;//当前页
		}
		var data={
			page:currentPage,
			rows:pageSize,	
		}
		return data;	
	},
	formatSeconds:function(value) {
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
	},
	init:function(){
		this.bindEvents();	
		this.getLearningCourseList(this.pldata(0));
		this.getCollectionCourseList(this.pldata(0));
	}
}
mycourseModule.init();