    function DY_scroll(wraper, prev, next, img, speed, or) {
        var wraper = $(wraper);
        var prev = $(prev);
        var next = $(next);
        var img = $(img).find('ul');
        var len=img.find('li').length;
        var w = img.find('li').outerWidth(true);
        var s = speed;
        var num=0;
        prev.click(function () {
            num --;
            if( num == -1 ){
                num=0
            }else{
                img.animate({'margin-left': -w*num}, function () {
                    img.css({'margin-left': -w*num});
                });
            }
        });
        next.click(function () {
            num ++;
            if( num == len-2){
                num= len-3;
            }else{
                img.animate({'margin-left': -w*num}, function () {
                    img.css({'margin-left': -w*num});
                });
            }
        });

        if (or == true) {
            ad = setInterval(function () {
                next.click();
            }, s * 1000);
            wraper.hover(function () {
                clearInterval(ad);
            }, function () {
                ad = setInterval(function () {
                    next.click();
                }, s * 1000);
            });
        }
    }
    DY_scroll('.img-scroll', '.prev', '.next', '.img-list', 3, false);// true为自动播放，不加此参数或false就默认不自动

        var courseModule={
        bindEvents:function(){
            var self=this;
            $(".j-allcourselist").on("mouseleave", function () {
                $("#j-item .item").removeClass("cur");
                $(".j-cateright").hide();
            });
            $('#j_order_wrap').on('click','span',function(){
                var $this=$(this),orderBy=$this.data('value');
                $('#j_order_wrap').find('span').removeClass('cf1');
                $this.addClass('cf1');
                self.orderBy=orderBy;
                self.searchCourse(1);
            });
            $('#j-item').on('mouseover','.item',function(){
                var $this=$(this),directionId=$this.data('id');
                $(this).addClass("cur").siblings().removeClass("cur");
                $(".j-cateright").show();
               /* self.directionId=directionId;*/
                var sortsArr=self.sortHashList[directionId];
                // console.log(sortsArr);
                self.classifyListDom(sortsArr);
                var index=$this.index();
                self.fnImg(index);
            });
            $('.sidenav').on('click','.sidenav_dot',function(){
                var $this=$(this), index=$(this).index(),$el=$(".sidenav-wrap .sidenav-list").eq(index);
                $this.addClass('sidenav_dot_active');
                $this.siblings().removeClass("sidenav_dot_active");
                $el.siblings().fadeOut();
                $el.fadeIn();
            });

        },
        fnImg:function(index){
            var arrUrl = [ 'img/index/1.1.1/list-bg1.png', 'img/index/1.1.1/list-bg2.png', 'img/index/1.1.1/list-bg3.png', 'img/index/1.1.1/list-bg4.png' ];
            //alert(index);
            $("#j-rwrap-img").css("background-image", 'url("' + arrUrl[index] + '")');
           // $("#j-rwrap-img").attr("src",arrUrl[index]);
        },
        classifyListDom:function(result){
            var dom='';
            dom+='<div class="j-rwrap-list"><h4 class="tit">分类目录</h4><div class="links"><p>';
                for(var i=0,ii=result.length;i<ii;i++){
                    var item=result[i];
                    dom+='<a href="/view/seek/course.html?directionId='+item.directionId+'&sortId='+item.id+'" target="_blank" data-id="'+item.id+'">'+item.name+'</a><span>/</span>';
                }
            dom+='</p></div></div>';
            dom+='<div class="j-rwrap-recommend f-cb"><a class="tit" href="" target="_blank">系列课程</a><p class="links">';

                dom+='<a href=""target="_blank">'+result.description+'</a><br>';

            dom+='</p></div>';
            $('#j-rwrap').html(dom);
        },
        getDirectionList:function(){
            var self=this;
            $.ajax({
                type:'get',
                url:mainModule.uri.getDirectionList,
                success:function(result){
                    mainModule.log('课程列表查询接口返回',result);
                    mainModule.httpInterceptor(result,self.renderDirectionListDom);
                    /*mainModule.httpInterceptor(result,self.classifyListDom);*/
                }
            })
        },
        renderDirectionListDom:function(result){
            var dom='';
            for(var i=0,ii=result.length;i<ii;i++){
                var item=result[i];
                courseModule.sortHashList=courseModule.sortHashList||[];
                item.sorts.description=item.description;
                courseModule.sortHashList[item.id]=item.sorts;
                var itemsn=item.sorts;
                        dom+='<div class="item j-item" data-id="'+item.id+'"><div class="curbg"></div>' +
                        '<div class="inn"><p><a href="/view/seek/course.html?directionId='+item.id+'" target="_blank" data-id="'+item.id+'">'+item.name+'</a></p>' ;
                    for(var j=0,jj=itemsn.length;j<jj;j++){
                        var sortItem=itemsn[j];
                        if(sortItem.recommended){
                            dom+='<a href="/view/seek/course.html?directionId='+item.id+'&sortId='+sortItem.id+'" target="_blank" data-id="'+sortItem.id+'" >'+sortItem.name+'</a>';
                        }

                    }
                dom+='</div></div>';
            }
            $('#j-item').html(dom);
        },
        renderKeChenDom:function(result){
            var dom='',
                    len=result.length,total=result.total;
            // console.log(result.total+'total');
            for(var i=0;i<len;i++){
                var item=result[i];
                item.hard==1?(item.hard='初级'):(item.hard==2?(item.hard='中级'):(item.hard='高级'));
                item.updateStatue==1?(item.updateStatueStr='连载中'):(item.updateStatueStr='已完结');
                dom+='<li><div class="lessonimg-box img-hover-bigger">' +
                        '<a href="view/lesson/lessonintro.html?courseid='+item.id+'&version='+mainModule.version+'" target="_blank"><img src="'+item.picture+'" class="lessonimg"><span class="c-st c-st'+item.updateStatue+'">'+item.updateStatueStr+'</span></a></div>' +
                        '<div class="lesson-infor"><h2 class="lesson-info-h2"><a href="view/lesson/lessonintro.html?courseid='+item.id+'" target="_blank" title="'+item.name+'">'+item.name+'</a></h2> ' +
                        '<div class="lesson-info"><div class=""><i class="renshu-icon"></i> <em>'+item.watchedNum+'</em></div>' ;
                switch(item.type){
                    case 0:
                        dom+=' <div class="clearfix"><span class="free">免费</span><span class="f-r">'+item.hard+'</span></div>';
                        break;
                    case 1:
                        dom+=' <div class="clearfix"><span class="vip">会员</span><span class="f-r">'+item.hard+'</span></div>';
                        break;
                    case 2:
                        dom+=' <div class="clearfix"><span class="money">¥ '+item.price+'</span>';
                        if(item.originalCost){
                            dom+='<span class="origin-price">¥ '+item.originalCost+'</span>';
                        }
                        dom+='<span class="f-r">'+item.hard+'</span></div>';
                        break;
                }
                dom+='</div></div></li>';
            }
            $('#lesson-list').html(dom);
        },
        searchCourse:function(page){
            var self=this,paramsObj={page:page};
            this.directionId?(paramsObj.directionId=this.directionId):void 0;
            this.sortId?(paramsObj.sortId=this.sortId):void 0;
            this.hard?(paramsObj.hard=this.hard):void 0;
            (this.type==0||this.type)?(paramsObj.type=this.type):void 0;
            this.orderBy?(paramsObj.orderBy=this.orderBy):(paramsObj.orderBy='createDate');
            var data={
                // directionId:,
                // hard:,//难度,1:初２：中３：高
                // orderBy:,//createDate：创建时间倒序，watchedNum：热度
                page:1,
                rows:5,
                showIndex:1
                // sortId:,
                // type:,//类型，0免费，1会员，2单独付费，
            };
            $.extend(data,paramsObj||{});
            mainModule.log('课程查询条件数据',data);
            $.ajax({
                type:'get',
                data:data,
                url:mainModule.uri.searchCourse,
                success:function(result){
                    mainModule.log('课程查询接口返回',result);
                    mainModule.httpInterceptor(result,self.renderKeChenDom);
                }
            })
        },
        getHomeJobMap:function(){
            var self=this;
            $.ajax({
                type:'get',
                data:{page:1,rows:6},
                url:mainModule.uri.getHomeJobMap,
                success:function(result){
                    mainModule.log('推荐图谱列表',result);
                    mainModule.httpInterceptor(result,self.renderMapDom);
                }
            })
        },
        renderMapDom:function(result){
            var self=courseModule;
            
            for(var i=0,ii=result.length;i<ii;i++){
                var item=result[i],j=i+1;
                if(i>1||true){
                    j=j%4==0?4:j%4;
                    var dom='<div style="display:none;" class="j-zytp-box clearfix j_map_wrap_'+i+'">'+
                                '<div class="j-zytp">'+
                                   ' <div class="">'+
                                        '<div class="j-zytp-container">'+
                                            '<div class="j-cell j-tupu'+j+'">'+
                                                '<div class="j-zytp-cnt">'+
                                                    '<h3 class="j_name">'+
                                                       
                                                    '</h3>'+
                                                    '<p class="introduce text-ellipsis j_desc"></p>'+
                                                    '<a href="" class="zytp-path">查看详情 &gt;</a>'+
                                                    '<div class="zytp-module j_extra_list_wrap">'+
                                                        
                                                   ' </div>'+
                                                '</div>'+
                                           ' </div>'+
                                            '<div>'+
                                                '<div class="j-course-list clearfix j_list_wrap">'+

                                                '</div>'+
                                           ' </div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="j-work box-shadow">'+
                                    '<h3>工作机遇</h3>'+
                                    '<div class="j-work-list">'+

                                    '</div>'+
                                '</div>'+
                            '</div>';
                    // $(dom).insertAfter('.j_map_wrap_1');
                    $('.j_map_container').append(dom);
                }
                var $wrap=$('.j_map_wrap_'+i).show();
                // if(i==0){
                    $wrap.find('.j_name').html(item.name);
                    $wrap.find('.zytp-path').attr('href','/view/zytp/detail.html?id='+item.id);
                    $wrap.find('.j_desc').html(item.description);
                    self.renderMapCourseDom(item.indexCourseVos,$wrap,i);
                    self.renderMapExtraCourseDom(item.indexCourseVos,$wrap);
                    self.getRecommendJob(item.id,$wrap);
                // }
                // dom+='';

            }
            // $('.j_recommend_map_wrap').html(dom);
        },
        renderMapCourseDom:function(result,$wrap,index){
            var dom='';
            for(var i=0,ii=result.length;i<ii;i++){
                if(i==4){
                    break;
                }
                if(i==1&&index==0){
                    dom+='<div class="j-course-xlkc img-hover-bigger">'+
                            '<div class="wrap ">'+
                                '<a href="http://www.skillbridge.cn/view/lesson/lessonintro.html?courseid=208" target="_blank">'+
                                    '<div class="img-hover-bigger pic">'+
                                        '<img data-original="img/index/1.1.1/img1.png" width="468" height="172">'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>';
                }
                if(index==2&&i==1){
                    dom+='<div class="j-course-xlkc img-hover-bigger">'+
                            '<div class="wrap ">'+
                                '<a href="http://www.skillbridge.cn/view/lesson/lessonintro.html?courseid=301" target="_blank">'+
                                    '<div class="img-hover-bigger pic">'+
                                        '<img data-original="img/index/1.1.1/img3.jpg" width="468" height="172">'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>';
                }
                if(index>3&&i==1){
                    dom+='<div class="j-course-xlkc img-hover-bigger">'+
                            '<div class="wrap ">'+
                                '<a href="http://www.skillbridge.cn/view/lesson/lessonintro.html?courseid=301" target="_blank">'+
                                    '<div class="img-hover-bigger pic">'+
                                        '<img data-original="img/index/1.1.1/img3.jpg" width="468" height="172">'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>';
                }
                var item=result[i];
                item.updateStatue==1?(item.updateStatueStr='连载中'):(item.updateStatueStr='已完结');
                // item.picture='img/index/1.1.1/img4.jpg';
                dom+='<div class="j-course">'+
                        '<div class="wrap box-shadow">'+
                            '<a href="/view/lesson/lessonintro.html?courseid='+item.id+'&version='+mainModule.version+'" target="_blank">'+
                                '<div class="img-hover-bigger pic">'+
                                    '<img data-original="'+item.picture+'" width="224" height="124"><span class="c-st c-st'+item.updateStatue+'">'+item.updateStatueStr+'</span>'+
                                '</div>'+
                                '<p class="tit text-ellipsis">'+item.name+'</p>'+
                            '</a>'+
                        '</div>'+
                    '</div>';
                if(index==1&&i==3){
                    dom+='<div class="j-course-xlkc img-hover-bigger">'+
                            '<div class="wrap ">'+
                                '<a href="http://www.skillbridge.cn/view/lesson/lessonintro.html?courseid=201" target="_blank">'+
                                    '<div class="img-hover-bigger pic">'+
                                        '<img data-original="img/index/1.1.1/img2.png" width="468" height="172">'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>';
                }
                if(index==3&&i==3){
                    dom+='<div class="j-course-xlkc img-hover-bigger">'+
                            '<div class="wrap ">'+
                                '<a href="http://www.skillbridge.cn/view/lesson/lessonintro.html?courseid=325" target="_blank">'+
                                    '<div class="img-hover-bigger pic">'+
                                        '<img data-original="img/index/1.1.1/img4.jpg" width="468" height="172">'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>';
                }

            }
            $wrap.find('.j_list_wrap').html(dom);
            $("img").lazyload({effect: "fadeIn"});

        },
        renderMapExtraCourseDom:function(result,$wrap){
            var dom='';
            if(result.length>4){
                for(var i=4,ii=result.length;i<ii;i++){
                    var item=result[i];
                    dom+='<a href="/view/lesson/lessonintro.html?courseid='+item.id+'&version='+mainModule.version+'" class="item">'+item.name+'</a>'
                }
                $wrap.find('.j_extra_list_wrap').html(dom);
            }
        },
        getRecommendJob:function(jobMapId,$wrap){
            var self=this;
            $.ajax({
                type:'get',
                data:{jobMapId:jobMapId,page:1,rows:6},
                url:mainModule.uri.getMapRecommendJob,
                success:function(result){
                    mainModule.log('图谱推荐职位',result);
                    mainModule.httpInterceptor(result,self.renderRecommendJobDom,undefined,$wrap);
                }
            })
        },
        getHomeRightStatistics:function(){
            var self=this;
            $.ajax({
                type:'get',
                url:mainModule.uri.getHomeRightStatistics,
                success:function(result){
                    mainModule.log('统计数据',result);
                    mainModule.httpInterceptor(result,self.renderStatisticsDom);
                }
            })
        },
        renderStatisticsDom:function(result){
            var $wrap=$('.j_statistics_wrap');
            $wrap.find('.j_map_num').html(result.jobMapNum);
            $wrap.find('.j_video_num').html(result.courseChapterNum);
            $wrap.find('.j_class_time').html(Math.floor(result.totalCourseTime/3600));
            $wrap.find('.j_job_num').html(result.jobNum);
        },
        renderRecommendJobDom:function(result,$wrap){
            var dom='';
            for(var i=0,ii=result.length;i<ii;i++){
                var item=result[i];
                item.updateDate=this.formatFulldate().date;
                dom+='<div class="j-work-info">'+
                       ' <p><a href="/view/xzjy/detail.html?id='+item.id+'" target="_blank">'+item.jobName+'</a></p>'+
                        '<div class=" clearfix ">'+
                            '<span class="time">'+item.updateDate+'</span>'+
                            '<span class="site f-r"><i></i>'+item.address+'</span>'+
                        '</div>'+
                    '</div>';
            }
            dom+='<a class="j-work-more" target="_blank" href="/view/xzjy/list.html"><span>更多机遇</span><span class="icn"></span></a>';
            $wrap.find('.j-work-list').html(dom);
        },
        init:function(){
            this.bindEvents();
            this.getDirectionList();
            this.searchCourse(1);
            this.getHomeJobMap();
            this.getHomeRightStatistics();
        }
    };
    courseModule.init();
    console.log('courseModule loaded');