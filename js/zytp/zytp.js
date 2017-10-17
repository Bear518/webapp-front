var mycourseModule={
	bindEvents:function(tid){
		// 新版2.1.1关卡列表点击事件
		var self=this;
		$('.j_level_wrap').on('click','li dt',function(){
			var $this=$(this),id=$this.data('id'),$active_li=$this.parent().parent();
			if($active_li.hasClass('active')){
				return;
			}
			self.getRoutesCourse(id);
			$('.j_level_wrap').find('.active').removeClass('active').find('ul').css('height',0);
			$active_li.addClass('active');
		});
		/*tab切换*/
		$('.zyxy').addClass("active");
		var self=this;
		$(".introinfo_tab a").click(function(){		
			$(this).addClass("on").siblings().removeClass("on");;
			var id = $(this).attr("id")
			$("."+id).show().siblings().hide(); 
			window.location.href='#key_'+id;
		})
		/*关卡弹出层*/
		$('.gqul').on('mouseenter mouseout','.gqli',function(e){
			if(e.type=='mouseenter'){
				var gqid=$(this).find(".gq_info ul").attr("id");
				var hashResult=self.hashResult||{};
				if(hashResult[gqid]){
					$('#'+gqid).html(hashResult[gqid]);					
				}
				else{
				mycourseModule.getRoutesCourse(gqid);}
			}
		
		})
		/*加入学习*/
		$('.introbox').on('click','.addplan',function(){
			if(mainModule.getCookie('islogin')){
				mycourseModule.addplan(tid);
			}
			else{
				$('.login_dl').show();  
				$('.loginbg').height($(document).height());
			}
		})
		/*分享*/
		$('.introbox').on('click','.kwlist .sc',function(){
			mycourseModule.collectionJobMap(tid)
		});
		/*班级考核*/
		$("#sclass").click(function(){	
			mycourseModule.classExamineScore(tid);
		});
		// 实战直播标签项
		$('#j_item_live').click(function(){
			 $('#j_live_list_wrap').show();
		});
		//底部
		$("#tkcls").click(function(){	
			$(".flybox").animate({left:'-100%'});
			$(".adsite").animate({left:'-119px'});
			$(".adsite").animate({left:'0'});
			setTimeout(function(){
				$('.adbottom').hide();			
			},1000);  
		})
		$(".arr").click(function(){	
			$(".flybox").animate({left:'-99.9%'});
			$(".flybox").animate({left:'0%'});
			$(".adsite").animate({left:'-120px'});
			$('.adbottom').show();
		})
	},
	/*职业图谱详情*/
	getJobMapInfo:function(tid){
		var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getZytpDetail+tid,
            success:function(result){
                mainModule.log('获取职业图谱详情接口返回',result);				
				var dom ="";
				if(result.status== "SUCCESS"){
					var con=result.content.jobMapInfo;	
					$(".tpname").text(con.name)				
					dom +='<h3>'+con.name+'</h3><div class="kwlist"><ul>';
					con.labels=con.labels.replace(/'/gi,'"');
					con.labels=JSON.parse(con.labels||'[]');
                    for(var i=0,len=con.labels&&con.labels.length;i<len;i++){
                        var item=con.labels[i];
                        dom+='<li>'+item+'</li>';
                    }
					dom +='</ul><span><a href="javascript:;" class="fx"><i class="ico_fx"></i><b></b>'+
					'<div class="share-wrap2"><span><i data-type="sina" class="i-icon i-size i-sina share-item"></i><i data-type="qqzone" class="i-icon i-size i-qq share-item"></i><i data-type="wx" class="i-icon i-size i-wx share-item wxdj"></i></span></div></a>';
					if(con.hasCollection ==true){		
						dom += '<a class="sc" href="javascript:;"><i class="ico_sc on"></i><b>'+con.collectionNum+'</b></a>';}
					else{
						dom += '<a class="sc" href="javascript:;"><i class="ico_sc"></i><b>'+con.collectionNum+'</b></a>';
						}
					
					dom +='</span></div><div class="intro_wd">'+con.description+'</div>'+
					'<ul class="infolist"><li class="learn"><i></i><span>' + con.studyNum + '</span><b></b></li><li class="zan"><i></i><span>' + con.courseNum + '门课程</span><b></b></li><li class="ks"><i></i><span>' + con.chapterNum + '课时</span><b></b></li><li class="times"><i></i><span>' + mycourseModule.hours(con.totalVideoTime) + '小时</span><b></b></li>';
					var updsta=con.updateStatus;
					updsta==1?(updsta='连载中'):(updsta==2?(updsta='已完结'):(updsta='无'));
					dom +='<li class="genx"><i></i><span>'+updsta+'</span></li></ul>';
					
				
					var current=con.currentClass;
					var myclass=con.myClass;	
					// 没有购买过图谱			
					if(!con.hasBuy){//没有加入过小班					
						// if(current&&current.recruitStudentEndDate>new Date()){//当前有小班
							// dom +='<div class="dzbox1 hasclass">'+
							// '<span class="sevtime">（实战班报名截止日期：'+ mainModule.formatBirthdate(current.recruitStudentEndDate) +'）</span>'+
							// '<a href="javascript:;" class="addclass">报名实战班</a>';
							var htmlad=""
							htmlad+='￥'+con.price;
							if(con.originalPrice){
							htmlad+='<i>原价：'+con.originalPrice +'</i>';}
							$(".adprc").html(htmlad);
							$(".adbottom").show();		
						// }
						// else{//当前无小班
							dom +='<div class="dzbox1">';
						// 	$(".adbottom").hide();							
						// }
						$("#sclass").hide();
						
					}
					else{//加入过或正在学习小班
						$("#sclass").show();
						dom +='<div class="dzbox1 hasclass">';
						//mycourseModule.classExamineScore(tid);
						// var myDate =Date.parse(new Date());
						// if(myDate<=myclass.serviceEndDate){
						// 	dom +='<span class="sevtime">（班级服务时间：'+ mainModule.formatBirthdate(myclass.serviceStartDate) +'至'+ mainModule.formatBirthdate(myclass.serviceEndDate) +'）</span>'		;	
						// 	}
						// else{
						// 	dom +='<span class="sevtime">（班级服务时间：已过期）</span>'		;
						// }
						$(".adbottom").hide();
					}
					// con.isJoin==0
					if(!con.hasBuy){	
						dom +='<a href="javascript:void(0);" class="addclass">立即购买</a></div>';		
						$("#job1").show();$("#job2").hide();
						$('#wiki').addClass('on');
						$(".wiki").show();
					}
					else if(con.hasBuy){
						dom +='</div>';	
						$(".gqul").addClass("canwarch");
						$("#catlog").addClass('on');
						$('.catlog').show();
						// $("#catlog").click();
						$("#job1").hide();$("#job2").show();
					}
					self.showContentByHash();
					$('.introbox').html(dom); 
					/*加入小班*/
					$(".addclass").click(function(){
						if(mainModule.getCookie('islogin')){
						window.location.href="/view/vip/coursebuy.html?jobMapId="+tid;
						}
						else{
							$('.login_dl').show();  
							$('.loginbg').height($(document).height());
						}
					})
										
										
					/*图谱介绍*/
					var htmldes = "";		
					htmldes =con.detail;	
					if(htmldes){
						htmldes = htmldes.replace(/<script>/g,' &lt; script &gt;');
						$(".wiki").html(htmldes);
					}								
					/*介绍视频*/
					var video=con.promotionalVedio	;
					mycourseModule.videopre(tid,video,con.picture);
					/*当前学习关卡*/
					var curroute=result.content.currentStudyRoute,gqid;
					if(curroute&&curroute.id){
					var gqid=curroute.id;}
					mycourseModule.getJobMapRoute(tid,gqid);
					/*分享*/
					var lestit=con.name,pic=con.picture;
					mycourseModule.fengx(lestit,pic);
				}
				
            }
        })
	},
	showContentByHash:function(isJoin){
		var hash=window.location.hash;
		if(!mainModule.getCookie('islogin')){
			$('.wiki').trigger('click');
			return;
		}
		$(".introinfo_tab a").each(function(i,el){
			// console.log(el);
			var $this=$(el),attr=$this.attr('id');
			// if(isJoin&&hash=='wiki'){

			// }
			if(hash=='#key_'+attr){
				$this.trigger('click');
				return;
			}
		});
	},
	/*图谱职位推荐*/
	getRecommendJob:function(tid){
        $.ajax({
            type:'get',
            url:mainModule.uri.getMapRecommendJob,
			data:{"jobMapId":tid,"page":1,"rows":5},
            success:function(result){
                mainModule.log('获取图谱职位推荐接口返回',result);				
				var dom ="";
				if(result.status== "SUCCESS"){
					var con=result.content.rows,len=con.length;
					if(len<5){
						var ii=len}
					else{ ii=5}					
					for(var i=0;i<ii;i++){										
						var rows=con[i];
						dom += '<li><a href="/view/xzjy/detail.html?id='+ rows.id +'" target="_blank"><div class="jobtitle">'+ rows.jobName +'</div>'+
						'<div class="jobinfo"><span class="company">'+ rows.companyName +'</span>'+
						'<span class="address"><i></i>'+ rows.address +'</span>'+
						'<span class="time">'+ mainModule.formatBirthdate(rows.updateDate) +'</span>';
						var inbot=rows.incomeBottom,intop=rows.incomeTop;
						if(inbot==0&&intop==0){
							dom += '<span class="price">面议</span>';
						}
						else{
						var inbot2=parseInt(inbot/1000),
						intop2=parseInt(intop/1000);
						
							if(inbot2==intop2){
							dom += '<span class="price">¥'+ inbot2 +'K</span>';
							}
							else{
							dom += '<span class="price">¥'+ inbot2 +'K-'+ intop2 +'K</span>';
							}
						}
						dom += '</div></a></li>';
					}
					$('.joblist').html(dom); 
				}
				
            }
        })
	},
    renderKeChenDom:function(result){


    },
	/*关卡课程列表*/
	getRoutesCourse:function(gqid){
		var self=this;
		var $j_course_wrap=$('#j_course_wrap_'+gqid);
		var renderRouteCourseDom=function(result){
	        var dom='',
	            len=result.length,total=result.total;
	        // console.log(result.total+'total');
	        // for(var j=0;j<10;j++){
	        // 	result.push(result[0]);

	        // }
	        len=result.length;
	        for(var i=0;i<len;i++){
	            var item=result[i];
	            item.hard==1?(item.hard='初级'):(item.hard==2?(item.hard='中级'):(item.hard==3?(item.hard='高级'):(item.hard='等级无')));
	            item.updateStatue==1?(item.updateStatueStr='连载中'):(item.updateStatueStr='已完结');
	            item.percent?(item.percentStr='<span>'+item.percent+'</span>'):(item.percentStr='');
	            // if((i+1)%5==0){
	            //     dom+='<a target="_blank" href="/view/lesson/lessonintro.html?courseid='+item.id+'&version='+mainModule.version+'"> <li class="item-wrap mrg-b18 f-l">';
	            // }else
	            // {
	                dom+='<a target="_blank" href="/view/lesson/lessonintro.html?courseid='+item.courseId+'&version='+mainModule.version+'">  <li class="item-wrap mrg-b18 mrg-r18 f-l">';
	            // }
	            dom+='<div class="img-wrap"><img src="'+item.picture+'">'+item.percentStr+'</div>'+
	                    '<div class="detail-wrap">'+
	                        '<div title="'+item.name+'" class="c3 name-wrap">'+item.name+'</div>'+
	                        '<div class="fs12"><i class="i-header-icon i-people"></i>'+item.watchedNum+'</div>';
	                switch(item.type){
	                    case 0:
	                        dom+='<div class="clearfix"><div class="c2d f-l">免费</div><div class="fs12 f-r">'+item.hard+'</div></div>';
	                    break;
	                    case 1:
	                        dom+='<div class="clearfix"><div class="cf1 f-l">会员</div><div class="fs12 f-r">'+item.hard+'</div></div>';
	                    break;
	                    case 2:
	                        dom+='<div class="clearfix"><div class="ce2 f-l">¥ '+item.price;
	                        if(item.originalCost){
	                            dom+='<span class="origin-price">¥ '+item.originalCost+'</span>';
	                        }
	                        dom+='</div><div class="fs12 f-r">'+item.hard+'</div></div>';
	                    break;
	                }
	        // }
	             dom+='</div></li></a>';
	        }
	        var height=Math.ceil(len/4)*231;
	        if(len==0){
	            dom='<li style="line-height:200px;text-align:center;">该关卡暂无课程，试试其他关卡吧。</li>';
	            height=200;
	        }
	        var $j_course_wrap=$('#j_course_wrap_'+gqid);
	        $j_course_wrap.html(dom).css('height',height);

		};
		$j_course_wrap.html('<li style="line-height:200px;text-align:center;">正在努力加载中...</li>').css('height',200);
        $.ajax({
            type:'get',
            url:mainModule.uri.getZytpMapCourse,
			data:{"routeId":gqid},
            success:function(result){
                mainModule.log('获取关卡课程列表接口返回',result);				
				mainModule.httpInterceptor(result,function(result){
					renderRouteCourseDom(result);
				})			
            }
        })
	},
	getJobMapRoute:function(tid,gqid){
		var self=this;
		var renderMapRouteDom=function(result,currentRoute){
			var dom='';
			for(var i=0,ii=result.length;i<ii;i++){
				var item=result[i],index=i+1,serviceTimeStr='',
					classvo=item.jobMapLearningAdvice;
				// var stateClass=item.hasDone?('completed '):('');
				var stateClass=item.routeStudyStatue==3?('completed '):(item.routeStudyStatue==2?'current ':'');
				if(i==0&&!currentRoute){
					self.getRoutesCourse(item.id);
					stateClass+='active'
				}else if(currentRoute&&item.id==currentRoute.id){
					self.getRoutesCourse(currentRoute.id);
					stateClass+='active'
				}
				if(classvo){
					var stimestr=self.formatFulldate(classvo.startDate,1)+'至'+self.formatFulldate(classvo.endDate,1);
					var ltimestr='',topage='/view/zytp/task/submit.html',bgC='';
					var userHomework=item.userHomework,now=Date.parse(new Date());
					// for(var j=0,jj=liveTimes.length;j<jj;j++){
					// 	var itemLT=liveTimes[j],lastItem=liveTimes[jj-1];
					if(userHomework){
						if(now<userHomework.deadLine){
							ltimestr='作业阶段';
							bgC='bg-c01';
							// break;
						}
						if(now>=userHomework.deadLine&&now<userHomework.publishDay){
							ltimestr= '批改阶段';
							// break;
						}else if(now>=userHomework.publishDay){
							ltimestr='成绩公布阶段';
							topage='/view/zytp/task/result.html'
						}
						ltimestr&&(ltimestr='<a  href="'+topage+'?id='+userHomework.id+'&jobMapId='+userHomework.jobMapId+'">'+ltimestr+'</a>');
					}
					// }
					serviceTimeStr='<div class="work-time-wrap '+bgC+'">'+ltimestr+'</div><div class="service-time-wrap">建议学习计划：'+stimestr+'</div>';
				}
				

				dom+=' <li data-id="'+item.id+'" class="'+stateClass+'">'+
                    '<dl><dt data-id="'+item.id+'">'+
                        '<i class="i-state-icon i-default"></i>'+
                        serviceTimeStr+
                        '<h5>'+index+'.'+item.name+'</h5>'+
                        '<p>简介：'+item.description+'</p>'+
                    '</dt>'+
                    '<dd class="course-list-wrapper">'+
                        '<ul id="j_course_wrap_'+item.id+'" class="animation clearfix">'+
                            
                        '</ul>'+
                    '</dd>'+
                '</dl>'+
                '</li>';
			}
			$('.j_level_wrap').html(dom);

		};
        $.ajax({
            type:'get',
            url:mainModule.uri.getZytpLx,
			data:{"jobMapId":tid},
            success:function(result){
            	mainModule.log('获取图谱关卡接口返回',result);	
            	mainModule.httpInterceptor(result,function(result){
            		renderMapRouteDom(result.routeList,result.currentRoute);
            	})
            }
        })
     },
	/*图谱关卡2.1.0版本*/
	getJobMapRoute210:function(tid,gqid){
        $.ajax({
            type:'get',
            url:mainModule.uri.getZytpLx,
			data:{"jobMapId":tid},
            success:function(result){
                mainModule.log('获取图谱关卡接口返回',result);				
				var dom ="";
				if(result.status== "SUCCESS"){
					var con=result.content.routeList,ii=con.length;									
					for(var i=0;i<ii;i++){										
						var rows=con[i],
						nub=(i+1)%10;
						if(nub>=1&&nub<=5){
							dom += '<li class="gqli float_l';
						}
						else if(nub>=6&&nub<=9||nub==0){
							dom += '<li class="gqli float_r';
						}
						var hasdone=rows.hasDone,hasd;
						hasdone==true?(hasd=' over'):(hasd='');
						if(gqid&&gqid==rows.id){hasd=' on'}
						dom+= hasd+'">';						
						if(nub==0||nub==5){
							dom += '<i class="gqarr site"></i>';
						}
						else{
							dom += '<i class="gqarr"></i>';}
								
						var classvo=rows.classJobMapRouteVo;			
						dom += '<a class="gqlia" href="javascript:;">'+
						'<span class="mul">'+(i+1)+'</span><span class="title">'+rows.name+'</span></a>';
						var liveTimes=classvo&&classvo.liveTimes||[],now=Date.parse(new Date());
						for(var j=0,jj=liveTimes.length;j<jj;j++){
							var item=liveTimes[j],lastItem=liveTimes[jj-1];
							if(now<item.liveTimeStart){
								var liveStartTime=mycourseModule.formatFulldate(item.liveTimeStart);
								dom += '<span class="zb_info">直播时间:'+liveStartTime+'</span>';
								break;
							}
							if(now>=item.liveTimeStart&&now<item.liveTimeEnd){
								dom += '<span class="zb_info">正在直播</span>';
								break;
							}
							if(lastItem.liveTimeEnd<=now){
								dom += '<span class="zb_info">直播已结束</span>';
								break;
							}
						}
						// if(classvo&&classvo.liveTimes.length>0){
						// 	var liveTimes=classvo.liveTimes,now= Date.parse(new Date());

						// 	//alert(liveTimes[0].liveTimeEnd)
						// 	if(now<=liveTimes[0].liveTimeStart){
						// 	dom += '<span class="zb_info">直播时间:'+mycourseModule.formatFulldate(liveTimes[0].liveTimeStart)+'</span>';}
						// 	else if(now<liveTimes[0].liveTimeEnd&&now>=liveTimes[0].liveTimeStart){
						// 		dom += '<span class="zb_info">正在直播</span>';
						// 	}
						// 	else{
						// 		dom += '<span class="zb_info">直播已结束</span>';
						// 	}
						// }
						
            			dom += '<div class="gq_info"><i class="arr"></i><h5>简介</h5>'+
						'<pre>'+rows.description+'</pre><h5>课程</h5>'+
						'<ul id="'+rows.id+'"></ul>';
						if(classvo){
							dom += '<div class="zhibo"><span>辅导时间:'+mainModule.formatBirthdate(classvo.serviceDateStart)+'至'+mainModule.formatBirthdate(classvo.serviceDateEnd)+'</span>';
							var liveTimes=classvo.liveTimes||[],jj=liveTimes.length;
							for(var j=0;j<jj;j++){
							var liv=liveTimes[j];						
							dom += '<span>直播时间:'+mycourseModule.formatFulldate(liv.liveTimeStart)+'~'+mycourseModule.formattime(liv.liveTimeEnd)+'</span>';
							
							}
							dom += '</div>';
						}
						
						dom += '</div></li>';
						var rid='d'+rows.id;
					}
					$('.gqul').html(dom); 
					
				}
				
            }
        })
	},
	/*关卡课程列表2.1.0版本*/
	getRoutesCourse210:function(gqid){
		var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getZytpMapCourse,
			data:{"routeId":gqid},
            success:function(result){
                mainModule.log('获取关卡课程列表接口返回',result);				
				var dom ="";
				if(result.status== "SUCCESS"){
					var con=result.content,ii=con.length;
									
					for(var i=0;i<ii;i++){										
						var rows=con[i];
						var hasdone=rows.hasDone,hasd;
						hasdone==true?(hasd='pas'):(hasd='')
						dom += '<li class="'+hasd+'"><i></i><a href="/view/lesson/lessonintro.html?courseid='+rows.courseId+'&version='+mainModule.version+'" target="_blank">'+rows.name+'</a></li>';
					}
					self.hashResult=self.hashResult||{};
					self.hashResult[gqid]=dom;					
					$('#'+gqid).html(dom); 
				}				
            }
        })
	},
	/*video*/
	videopre:function(tid,video,picture) {
		// "/ccvedio/jobMapVedio/"+tid+"/"+video
	 $.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/ccvedio/jobMapVedio/"+tid,
            success: function (result) {
            	mainModule.log('图谱视频返回',result);
				// var jsonData=JSON.parse(vio.content);
    //             var htmlvid = "";			
				// htmlvid += jsonData.video.playcode;
				// htmlvid=htmlvid.replace(/width=600&height=490/g,'width=405&height=248');
				// $(".videobox").html(htmlvid);
				var st=setInterval(function(){
					if(window.Player){
	                    var playerThree=new Player({
	                        id:'j_map_video_wrap',
	                        source:result.content,
	                        cover:picture,
	                        type:2,
	                        width:'400px',
	                        height:'225px',
	                        debug:true,
	                    });
	                }
                    clearInterval(st);
                },1000);
			}
        });
	},
	/*分享*/
	fengx:function(lestit,pic){
		var link=mainModule.shareUriAddSearch({url:location.href,activityCode:'RECRUIT_USER'});
		shareModule.shareParamsInit({title:'沉迷学习！获得游戏开发成长属性！',url:link,desc:'我正在学习@极视教育 的图谱《'+lestit+'》，一起来沉迷学习，创造你的游戏世界！',activityCode:'RECRUIT_USER',pic:'http://www.skillbridge.cn'+pic});
        shareModule.generateQRCode(link);
	},
	/*加入学习*/
	addplan:function(cid) {
	 $.ajax({
            type: "post",
            dataType: "json",
			data:{"jobMapId":cid},
            url:mainModule.uri.joinZytpPlan,
            success: function (pln) {
				if(pln.status== "SUCCESS"){
				//$(".addplan").hide();
				//$(".gqul").addClass("canwarch");
				location.reload();
				}
				else{
				mainModule.assertCookieExpired(pln);
				$('.login_dl').show();  
            	$('.loginbg').height($(document).height())
					
				}
            }
        });
 	},
	/*收藏图谱*/
	collectionJobMap:function(tid){
		$.ajax({
			type: "get",
			dataType: "json",
			url: $._CACHEOBJ.context+"/jobMap/collection/add",
			data:{"jobMapId":tid},
			success: function (dl) {				
			if(dl.status== "SUCCESS"){
				var scnum=parseInt($(".kwlist .sc b").text());
				$(".kwlist .sc b").text(scnum+1);
				$(".ico_sc").addClass("on");
			}			
			else{
				if(mainModule.getCookie('islogin')){
					mainModule.showGlobalHintBar(dl.message);
				}
				else{
					$('.login_dl').show();  
					$('.loginbg').height($(document).height());
					}
			}
			}
		});
	},
	/*小时*/
	hours:function(value) {
		var theTime1 = 1;      
		if(value > 3600) {
		theTime1 = parseInt(value/3600);
		if(value%3600>=1800){
			theTime1=theTime1+1
			}
		}		
		return theTime1;
	},
	/*班级考核*/
	classExamineScore:function(tid){
		var self=this;
		 $.ajax({
            type:'get',
            url:mainModule.uri.getClassExamineScore,
			data:{"jobMapId":tid},
            success:function(result){
                mainModule.log('获取班级考核接口返回',result);				
				var dom ="",nodom ="",finalscore="";
				if(result.status== "SUCCESS"){
					var examscore=result.content.homeworkList,
					ii=examscore.length;
					if(examscore&&ii!==0){									
						for(var i=0;i<ii;i++){										
							var rows=examscore[i];
							var score=rows.score;
							// if(rows.type==1){
								// if(!score){
								// 	if(rows.type==1){
								// 		dom += '<li class="tg">';}
								// 	if(rows.type==2){
								// 		dom += '<li class="by">';
								// 	}
								// 	dom += '<div class="testitem-wrap"><div class="testitem"><i>'+ rows.name +'</i>'+
								// 	'<h6>'+rows.title+'</h6>'+                        
								// 	// '<span>提交截止时间：'+ mycourseModule.formatFulldate(rows.deadLine) +'</span>'+
								// 	'<span><a href="javascript;">前往考核</a></span></div></div>'+
								// 	'<div class="fs12 tc">提交截止时间：'+ mycourseModule.formatFulldate(rows.deadLine) +'</div>'+
								// 	'<div class="fs12 tc">成绩公布时间：'+ mycourseModule.formatFulldate(rows.deadLine) +'</div></li>';
								// }
								// else{
								// 	if(rows.type==1){
								// 		dom += '<li class="tg">';}
								// 	if(rows.type==2){
								// 		dom += '<li class="by tg">';
								// 	}
								// 	dom += '<div class="testitem"><i>'+ rows.name +'</i>'+
								// 	'<h6>得分：'+score+'</h6><span>（满分'+ rows.totalScore+'分）</span>'+
								// 	'<span>提交截止时间：'+ mycourseModule.formatFulldate(rows.deadLine) +'</span>'+
								// 	'<span>成绩公布时间：'+ mycourseModule.formatFulldate(rows.publishDay) +'</span></div></li>';
								// }
								var taskUrl='/view/zytp/task/submit.html?id='+rows.id+'&jobMapId='+self.jobMapId;
								if(Date.now()>rows.publishDay){
									taskUrl='/view/zytp/task/result.html?id='+rows.id+'&jobMapId='+self.jobMapId;
								}
								dom+='<li class="tg">'+
				                        '<div class="testitem-wrap">'+
				                            '<div class="testitem">'+
				                                '<h6>'+rows.name+'</h6>'+
				                                '<div class="t-wrap"><div title="'+rows.description+'" class="des">'+rows.description+'</div></div>'+
				                                '<div class="a-wrap"><a href="'+taskUrl+'" >前往考核</a></div>'+
				                            '</div>'+
				                        '</div>'+
				                        '<div class="fs12 tc l14">提交截止时间：'+mycourseModule.formatFulldate(rows.deadLine,true)+'</div>'+
				                        '<div class="fs12 tc l14">成绩公布时间：'+mycourseModule.formatFulldate(rows.publishDay,true)+'</div>'+
				                    '</li>';
							// }
							
						}	
						var totalScore=result.content.totalScore;
						// if(rows.type==2){
						if(!totalScore){
							finalscore+='<div class="lastt_item"><h6>未公布</h6><span class="hidden">成绩公布时间：'+ mycourseModule.formatFulldate(rows.publishDay) +'</span></div>';
						}
						else{
							finalscore+='<div class="lastt_item tj"><h6>'+totalScore+'分</h6><span class="hidden">（满分100分）</span><span class="mf hidden">成绩公布时间：'+ mycourseModule.formatFulldate(rows.publishDay) +'</span></div>';
						}
						$('.lasttest').html(finalscore);
							// }				
						$('.testlist ul').html(dom);
						$('.j_class_kh').show();
					}
					else{
						nodom += '<span class="nodata">暂无考核</span>';
						$(".class_kh").hide();
						$(".sclass").html(nodom)
					}

				}				
            }
        })
	},
	/*日期加时间*/
	formatFulldate:function(date,includeTime){
        var date=date&&new Date(date)||new Date(),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            hours=date.getHours(),minutes=date.getMinutes(),seconds=date.getSeconds();
            month<10&&(month='0'+month);
            day<10&&(day='0'+day);
            datetime=year+'-'+month+'-'+day;
        var time='';
            if(!includeTime){
            	if(hours<10&&hours>0){hours='0'+hours}
            	if(minutes<10&&minutes>0){minutes='0'+minutes}
            	time=hours&&(hours+':'+minutes)
        	}
		var data=datetime+" "+time;
        return data;
    },
	/*时间*/
	formattime:function(date){
        var date=date&&new Date(date)||new Date(),            
            hours=date.getHours(),minutes=date.getMinutes();
            if(hours<10){hours='0'+hours}
            if(minutes<10){minutes='0'+minutes}
            var time=hours+':'+minutes;
        return time;
    },
	init:function(){
		var jobMapId='04b43be6e29949df9105a6d559552ba8';
		if(/127|800|192/.test(window.location.href)){
			jobMapId='c0a861fb6bd146d2a3fc30728ffafc7c';
		}
		var tid =mainModule.getQueryValueByName("id")||jobMapId;
		this.jobMapId=tid;
		this.bindEvents(tid);	
		this.getJobMapInfo(tid);
		this.getRecommendJob(tid);
		
	}
}
mycourseModule.init();