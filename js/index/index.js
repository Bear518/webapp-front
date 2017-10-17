var indexModule={
    bindEvents:function(){
        var self=this;
        $('#j_viphover').hover(function(){
            var $this=$(this);
            $this.addClass('open');
        },function(){
            $(this).removeClass('open');
        });
        $('#j_kechen_indus_wrap').on('mouseenter mouseout','li',function(e){
            if(e.type=="mouseenter"){
              var $this=$(this),
                type=$this.data('type');
                indexModule.activeHoverInit($this);
                indexModule.getKeChenDataByType(type);
            }
        });
        $('#j_arrow_right').on('mouseenter mouseout',function(e){
            if(e.type=='mouseenter'){
                console.log('mouseenter');
                self.cancelImgSlider();
            }else{
                console.log('mouseout');
                self.loopImgSlider();
            }
        });
        $('#j_arrow_left').on('mouseenter mouseout',function(e){
            if(e.type=='mouseenter'){
                console.log('mouseenter');
                self.cancelImgSlider();
            }else{
                console.log('mouseout');
                self.loopImgSlider();
            }
        });
        $('#j_banner_dot_wrapper').on('mouseenter mouseout','.j_slide_dot',function(e){
            if(e.type=='mouseenter'){
                console.log('mouseenter');
                self.cancelImgSlider();
            }else{
                console.log('mouseout');
                self.loopImgSlider();
            }
        });
        $('#j_arrow_right').click(function(){
            var $j_top_img_slide=$('#j_top_img_slide'),
                cur=$j_top_img_slide.data('cur'),
                total=$j_top_img_slide.data('total');

                cur++;
                var percent=(cur-1)*100;
                if((cur-1)==total){
                    $('#j_top_img_slide').prepend($('#j_top_img_slide li').eq(total-1).clone()).css('width',(total+1)*100+'%');
                    $('#j_top_img_slide li').css('width',(100/(total+1))+'%');
                    $j_top_img_slide.css('left','0%');
                    percent=100;
                    cur=1;
                }
                indexModule.slideInvoke($j_top_img_slide,percent,cur,true,total);
                // $j_top_img_slide.animate({left:'-'+percent+'%'});
                // $j_top_img_slide.data('cur',cur);
                
                // var $j_dot_item_el=$('#j_dot_item_'+cur);
                // $j_dot_item_el.siblings().removeClass('slide-active-dot');
                // $j_dot_item_el.addClass('slide-active-dot');
        });
        $('#j_arrow_left').click(function(){
            var $j_top_img_slide=$('#j_top_img_slide'),
                cur=$j_top_img_slide.data('cur'),
                total=$j_top_img_slide.data('total');

                cur--;
                var percent=(cur-1)*100;
                if(cur<=0){
                    $('#j_top_img_slide').append($('#j_top_img_slide li').eq(0).clone()).css('width',(total+1)*100+'%');
                    $('#j_top_img_slide li').css('width',(100/(total+1))+'%');
                    percent=(total-1)*100;
                    cur=total;
                    $j_top_img_slide.css('left','-'+total*100+'%');
                }
                console.log(cur);
                indexModule.slideInvoke($j_top_img_slide,percent,cur,true,total);
                // $j_top_img_slide.animate({left:'-'+percent+'%'});
                // $j_top_img_slide.data('cur',cur);

                // var $j_dot_item_el=$('#j_dot_item_'+cur);
                // $j_dot_item_el.siblings().removeClass('slide-active-dot');
                // $j_dot_item_el.addClass('slide-active-dot');
        });
        $('#j_msgn_arrow_right').click(function(){
            var $j_msgn_slide_wrap=$('#j_msgn_slide_wrap'),
                cur=$j_msgn_slide_wrap.data('cur'),
                total=$j_msgn_slide_wrap.data('total');

                cur++;
                var percent=(cur-1)*100;
                if((cur-1)==total){
                    $j_msgn_slide_wrap.css('left','100%');
                    percent=0;
                    cur=1;
                }
                indexModule.slideInvoke($j_msgn_slide_wrap,percent,cur,false);
                
        });
        $('#j_msgn_arrow_left').click(function(){
            var $j_msgn_slide_wrap=$('#j_msgn_slide_wrap'),
                cur=$j_msgn_slide_wrap.data('cur'),
                total=$j_msgn_slide_wrap.data('total');

                cur--;
                var percent=(cur-1)*100;
                if(cur<=0){

                    percent=(total-1)*100;
                    cur=total;
                    $j_msgn_slide_wrap.css('left','-'+total*100+'%');
                }
                console.log(cur);
                indexModule.slideInvoke($j_msgn_slide_wrap,percent,cur,false);
                
        });
        $('#j_banner_dot_wrapper').on('click','.j_slide_dot',function(){
            var $this=$(this),
                cur=$this.data('cur'),
                $slide_active_dot=$('.slide-active-dot'),
                $j_top_img_slide=$('#j_top_img_slide'),
                active_cur=$slide_active_dot.data('cur'),
                percent;
            if(active_cur==cur){
                return;
            }
            if(active_cur<cur){
                //右滑
                percent=(cur-1)*100;
                var prePercent=(cur-2)*100;
                $j_top_img_slide.css('left','-'+prePercent+'%');
            }else
            {
                percent=(cur-1)*100;
                var prePercent=cur*100;
                $j_top_img_slide.css('left','-'+prePercent+'%');
            }
            indexModule.slideInvoke($j_top_img_slide,percent,cur,true);
            console.log(cur);
        });
        $('#j_mxxy_list_wrap').on('click','li',function(){
            var $this=$(this);intro=$this.data('intro');
            console.log(intro);
            $('.active-xx').removeClass('active-xx');
            $this.find('.mxxy-img-wrap').addClass('active-xx');
            $('#j_mxxy_intro').html(intro);
        });
        $('#j_kechen_list_wrap').on('click','li',function(){
            var $this=$(this),
                courseid=$this.data('id');
            var isMobile=/mobile/gi.test(window.navigator.userAgent);
            if(isMobile){
                window.location.href='/mobile/view/courseDetails.html?courseId='+courseid;
            }else{
                window.location.href="/view/lesson/lessonintro.html?courseid="+courseid;
            }
            console.log(videoid);
        });
        $('#j_msgn_slide_wrap').on('click','.msgn-header-wrap',function(){
            mainModule.log('点击事件发生');
            var $this=$(this),$play_icon=$(this).find('img.play-icon'),
                $conver_img=$play_icon.next(),$video=$conver_img.next(),
                $li=$this.parent();
            console.log($video[0]);
            $li.siblings().each(function(i,el){
                console.log(el);
                var $this=$(el),$video=$this.find('video');
                if(!$video[0].paused){
                    $video[0].pause();
                }
            })
            $video[0].play();
            $conver_img.fadeOut();
            $play_icon.hide();
        })
    },
    activeHoverInit:function($this){
        $this.siblings().removeClass('active');
        $this.addClass('active');
    },
    slideInvoke:function($el,percent,cur,isHasDot,total){
        // return;
        $el.animate({left:'-'+percent+'%'},'slow',function(){
            if(total&&$el.children().length>total){
                //向左滑动
                if(percent==100){
                    $el.children().eq(0).remove();
                    $('#j_top_img_slide').css('left','0%');
                }else{
                    $el.children().eq(total).remove();
                }
                $el.css('width',total*100+'%');
                $('#j_top_img_slide li').css('width',(100/total)+'%')
            }
        });
        $el.data('cur',cur);
        if(isHasDot){
            var $j_dot_item_el=$('#j_dot_item_'+cur);
            $j_dot_item_el.siblings().removeClass('slide-active-dot');
            $j_dot_item_el.addClass('slide-active-dot');
        }
    },
    getBannerData:function(){
        // <a href="#j_content_three_container" data-id="0" class="guid-wrap">指南</a>
        // {
        //     pic:'img/index/604.jpg',title:'3dMax游戏制作',href:'<a target="_blank" href="https://www.douyu.com/1517663"></a>', url:'https://www.douyu.com/1517663',content:'<div class="zhibo-src"><p>直播时间：<span>2016年12月22日19:00</span></p><p class="">直播地址：<a href="https://www.douyu.com/1517663">https://www.douyu.com/1517663</a></p></div>'
        // },
        var result=[{
             pic:'img/index/604.jpg',title:'从零开始学游戏3D美术设计师',href:'<a target="_blank" href="https://ke.qq.com/course/185052#tuin=6ad29a6b"></a> ',content:''
        },{
            pic:'img/index/600.jpg',title:'Unity3D工程师实战班级 线上精品课',href:'<a target="_blank" href="/view/zytp/detail.html?id=04b43be6e29949df9105a6d559552ba8"></a> ', url:'view/zytp/detail.html',content:''
        }];
		
        this.renderBannerDom(result);
        return;
        $.ajax({
            type:'get',
            url:mainModule.uri.getBanner,
            success:function(result){
                console.log(result);

            }
        })
    },
    renderBannerDom:function(result){
        var dom='',
            dotDom='',
            $j_top_img_slide=$('#j_top_img_slide'),
            len=result.length,
            width=100*len+'%';
        $j_top_img_slide.data('total',result.length).css('width',width);
        for(var i=0;i<len;i++){
            var item=result[i],
			
                percent=(100/len).toFixed(2);
            item.pic=item.pic||'img/index/100.jpg';
            dom+='<li title="'+item.title+'" class="slide-item" style="background:url('+item.pic+') no-repeat center center;width:'+percent+'%;">'+item.href+item.content+'</li>';
            if(i===0){
                dotDom+='<div id="j_dot_item_'+(i+1)+'" class="j_slide_dot slide-dot slide-active-dot f-l" data-cur="'+(i+1)+'"></div>';
            }else
            {
                dotDom+='<div id="j_dot_item_'+(i+1)+'" class="j_slide_dot slide-dot f-l" data-cur="'+(i+1)+'"></div>'
            }
            $('#j_banner_dot_wrapper').html(dotDom).css('width',30*len);
        }
        
        $j_top_img_slide.html(dom);
    },
    getKeChenDataByType:function(type){
        var result=[{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:false
        },{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:true
        },{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:true
        },{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:true
        },{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:false
        },{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:true
        },{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:true
        },{
            img:'img/index/101.jpg',
            name:'ios 开发',
            time:'12小时',
            chapterCount:10,
            likeCount:23438,
            studyedCount:23232332,
            free:true
        }];
        var data={page:1,rows:8};
        if(type!=0){
            data.industryId=type;
        }
        data.showIndex=1;
        //课程获取接口做了改变，原始接口为:getCourse
        $.ajax({
            type:'get',
            data:data,
            url:mainModule.uri.getCourse,
            success:function(result){
                console.log(result);
                if(result.content.industry&&$('#j_kechen_indus_wrap').children().length<2){
                    indexModule.renderIndustryListDom(result.content.industry);
                }
                if(result.content.courseMap){
                    indexModule.renderKeChenDom(result.content.courseMap.list);
                }
            }
        });
        // this.renderKeChenDom(result);
    },
    renderIndustryListDom:function(result){
        var dom='';
        var item1=result[1];
        result[1]=result[2];
        result[2]=item1;
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            switch(i){
                case 0:
                    dom+='<li class="j_kechen_item kechen-item f-l" data-type="'+item.id+'">'+
                        '<i class="kechen-i kechen-it-i"></i>'+
                        ''+item.name+''+
                    '</li>';
                break;
                case 1:
                    dom+='<li class="j_kechen_item kechen-item f-l" data-type="'+item.id+'">'+
                        '<i class="kechen-i kechen-ys-i"></i>'+
                        ''+item.name+''+
                    '</li>';
                break;
                case 2:
                    dom+='<li class="j_kechen_item kechen-item f-l" data-type="'+item.id+'">'+
                        '<i class="kechen-i kechen-jr-i"></i>'+
                        ''+item.name+''+
                    '</li>';
                break;
                case 3:
                    dom+='<li class="j_kechen_item kechen-item f-l" data-type="'+item.id+'">'+
                        '<i class="kechen-i kechen-zc-i"></i>'+
                        ''+item.name+''+
                    '</li>';
                break;
            }
        }
        $('#j_kechen_indus_wrap').append(dom);
    },
    renderKeChenDom:function(result){
        var dom='',
            len=result.length;

        for(var i=0;i<len;i++){
            var item=result[i];
            var totaltime=this.formattime(item.totalTimes);
            if((i+1)%4==0){
                dom+='<li data-id="'+item.id+'" class="kenchen-list-item f-l mrg-b36">';
            }else
            {
                dom+='<li data-id="'+item.id+'" class="kenchen-list-item f-l mrg-r33 mrg-b36">';
            }
            if(!!!item.type){
                dom+='<div class="kechen-img-wrap"><i class="mianfei-i"></i><img class="" src="'+item.picture+'"></div>';
            }else{
                switch(item.type){
                    case 1:
                        dom+='<div class="kechen-img-wrap"><i class="icon-i fufei-i"></i><img class="" src="'+item.picture+'"></div>';
                    break;
                    case 2:
                        dom+='<div class="kechen-img-wrap"><img class="" src="'+item.picture+'"><div class="kechen-price-wrap">¥ '+item.price+'</div></div>';
                    break;
                    case 3:
                        dom+='<div class="kechen-img-wrap"><i class="icon-i fufei-i"></i><img class="" src="'+item.picture+'"><div class="kechen-price-wrap">¥ '+item.price+'</div></div>';
                    break;
                }
            }
            dom+='<div class="kechen-detail-wrap">'+
                    '<p class="name c333">'+item.name+'</p>'+
                    '<div class="detail f12-c666">'+
                        '<i class="i-time"></i>'+totaltime+'<i class="i-chapter"></i>'+item.totalLessons+'课时'+
                    '</div>'+
                '</div>'+
                '<div class="kenchen-like-wrap f12-c666">'+
                    '<i class="i-like"></i>'+item.likesNum+'人'+
                    '<span class="f-r mrg-r20"><i class="icon-i i-watch-people"></i>'+item.watchedNum+'</span>'+
                '</div>'+
            '</li>';
        }
        $('#j_kechen_list_wrap').html(dom);
    },
    formattime:function(totalseconds){
        var hours=Math.floor(totalseconds/3600),
            minutes=Math.floor((totalseconds%3600)/60),
            seconds=(totalseconds%3600)%60;
        var time='';
        if(hours>0){
            time+=hours+'小时 ';
        }
        if(minutes>0){
            time+=minutes+'分钟 ';
        }
        if(seconds>0&&minutes<1){
            time+=seconds+'秒';
        }
        // console.log(totalseconds);
        return time||totalseconds;
    },
    getMsgnData:function(){
        var result=[{
            company:'掌金集团',
            img:'<img class="play-icon" src="img/index/503.png"><img class="conver-img" src="img/index/500.jpg"><video  class="yy-video" controls="controls" src="http://res.skillbridge.cn/video/msgn-3.mp4"  >your browser does not support the video tag</video>',
            content:'我们的员工需要强烈的责任感、事业心、耐心、细心、优秀的沟通能力，最好具有抗压能力，以及严谨的逻辑思维能力，同时要具有团队协作精神。公司气氛比较活跃与轻松，拒绝刻板与僵化。我们希望更多立志未来服务于金融行业、有梦想、有情怀、有激情的同学们加入到掌金公司。'
        },{
            company:'弘育基金',
            img:'<img class="play-icon" src="img/index/503.png"><img class="conver-img" src="img/index/501.jpg"><video  class="yy-video" controls="controls" src="http://res.skillbridge.cn/video/msgn-2.mp4" >your browser does not support the video tag</video>',
            content:'我们的员工需要专业的技能知识，优秀的职业和个人素养，良好的学习能力、表达与沟通能力。在面试的过程中我们需要了解员工的专业知识，以及员工的沟通与表达能力，我们更看重员工的发展潜力。在简历上我们希望应聘者能够把自己的工作经历，工作成就以及工作的亮点都呈现出来，让我们更加方便了解。应届毕业生的话，我们希望能够了解学生在学校学到的专业知识，以及社会实践的一些经历。'
        },{
            company:'大亚集团',
            img:'<img class="play-icon" src="img/index/503.png"><img class="conver-img" src="img/index/502.jpg"><video  class="yy-video" controls="controls" src="http://res.skillbridge.cn/video/msgn-1.mp4" >your browser does not support the video tag</video>',
            content:'岗位偏向于财经类毕业生，还有一部分木业铝箔技术性人才，以及统计类。HR在员工一进入到她的办公室门口就已经在进行考核了。在注重专业背景、个人素质的同时，我们更看重的是综合素质。能力上有一些学历或者是技能证书可以去做衡量，但是综合素质包括语言沟通、人际交往、亲和力，语言表达等等也很重要。因为在工作过程中合作意识是关键，所以这方面也会对应聘者进行更多的考核。当然还有一些细节方面也是需要注意的。'
        }];
        this.renderMsgnDom(result);
    },
    renderMsgnDom:function(result){
        var dom='',
            len=result.length,
            percent=len*100,
            averPerc=(100/len).toFixed(2),
            $j_msgn_slide_wrap=$('#j_msgn_slide_wrap');
        $j_msgn_slide_wrap.css('width',percent+'%').data('total',len);
        for(var i=0;i<len;i++){
            var item=result[i];
            dom+='<li style="width:'+averPerc+'%">'+
                   '<div class="msgn-header-wrap">'+item.img+'</div>'+
                   '<h4 style="color:#ff9001;margin-top:60px;margin-bottom:5px;font-weight:normal;">'+item.company+'人力资源部</h4>'+
                   '<h4 style="color:#ff9001;font-weight:normal;">给应聘者的建议</h4>'+
                    '<p class="msgn-content">'+item.content+'</p>'+
                '</li>';
        }
        $j_msgn_slide_wrap.html(dom);
    },
    getZytpData:function(){
        var result=[{
            img:'img/index/301.jpg',
            name:'Android工程师',
            courseCount:'210课时',
            industry:'移动互联网',
            major:'安卓'
        },{
            img:'img/index/302.jpg',
            name:'iOS开发工程师',
            courseCount:'120课时',
            industry:'移动互联网',
            major:'IOS'
        },{
            img:'img/index/303.jpg',
            name:'Unity3D工程师',
            courseCount:'156课时',
            industry:'互联网',
            major:'游戏'
        },{
            img:'img/index/304.jpg',
            name:'3D MAX建模师',
            courseCount:'115课时',
            industry:'互联网',
            major:'游戏'
        },{
            img:'img/index/305.jpg',
            name:'Maya 建模师',
            courseCount:'135课时',
            industry:'互联网',
            major:'游戏'
        }];
        this.renderZytpDom(result);
    },
    renderZytpDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            if(i<len-1){
                dom+='<li class="job-item border-bt-d9">';
            }else
            {
                dom+='<li class="job-item">';
            }
            dom+='<div class="job-img-wrap f-l"><img class="job-img" src="'+item.img+'"></div> '+
                    '<div>'+
                        '<p class="job-name mrg-b6">'+item.name+'</p>'+
                        '<span class="f12-c5ba">'+item.courseCount+'</span>'+
                        '<div class="f12-c5ba mrg-t12">'+
                           '<span class="job-type mrg-r27">'+item.industry+'</span>'+
                           '<span class="job-type">'+item.major+'</span>'+
                        '</div>'+
                    '</div>'+
                '</li>';
        }
        $('#j_zytp_list_wrap').html(dom);

    },
    getXzjyData:function(){
        var result=[{
            img:'img/index/200.png',
            name:'Java工程师',
            datetime:'宝尊电商',
            address:'上海市-闸北区'
        },{
            img:'img/index/201.jpg',
            name:'UI设计师',
            datetime:'上海盛亚信息科技有限公司',
            address:'上海－浦东新区'
        },{
            img:'img/index/202.jpg',
            name:'iOS工程师',
            datetime:'上海星之所在信息科技有限公司',
            address:'上海市-浦东新区'
        },{
            img:'img/index/203.jpg',
            name:'助理产品设计师',
            datetime:'上海埃林哲软件系统股份有限公司',
            address:'上海-长宁区'
        },{
            img:'img/index/204.jpg',
            name:'Web前端开发工程师',
            datetime:'上海国云信息科技有限公司',
            address:'上海－浦东新区'
        }];
        //this.renderXzjyDom(result);
    },
   /* renderXzjyDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            if(i<len-1){
                dom+='<li class="job-item border-bt-d9">';
            }else{
                dom+='<li class="job-item">';
            }
            dom+='<div class="job-img-wrap f-l"><img class="job-img" src="'+item.img+'"></div> '+
                    '<div class="lh26">'+
                        '<p class="job-name">'+item.name+'</p>'+
                        '<span class="f12-c5ba">'+item.datetime+'</span>'+
                        '<div class="f12-c5ba "><span>'+item.address+'</span></div>'+
                    '</div>'+
                '</li>';
        }
        $('#j_xzjy_list_wrap').html(dom);
    },*/
    getMxxyData:function(){
        var result=[{
            img:'img/index/402.jpg',
            name:'董董',
            intro:'我今年大二，影视动画专业，专业课开始逐渐增多，上专业课时都是老师远程控制我们的电脑进行学习，速度比较快，很多都来不及反应，所以就选择了在线自主学习，这里可以随时停下做笔记，而且这里的老师讲的非常细，几乎每个知识点都能覆盖到，非常方便。经过1个月的学习与练习，同学遇到的问题都来找我，我都能轻松解决，哈哈哈'
        },{
            img:'img/index/400.jpg',
            name:'Moon',
            intro:'美妙的语言是生活的财富，学会如何说话能给人生助力，尤其是作为销售的我，在跟随李玉琪老师的学习中，让我逐步成为一个能力出众的销售人员。'
        },{
            img:'img/index/404.jpg',
            name:'小醒',
            intro:'现在找工作没有一技之长真的好难，但是我在这儿学习了3DMax之后，居然还给我推荐了工作，而且还是一家非常知名的公司，这真是太让我意外了。我要好好学习，我相信不久的将来，我将升职加薪，当上总经理，出任CEO，迎娶白富美，走上人生巅峰。'
        },{
            img:'img/index/401.jpg',
            name:'塔娜',
            intro:'我是学播音专业的，还有半年就毕业了，现在面临找工作的难题。我发现播音专业的就业面较窄，薪资较低。家里从事互联网行业的亲戚建议我学习iOS开发，说这个职业现在普遍薪资水平较高。偶然的机会，我通过朋友知道了极视教育，说这个网站上有个很资深的iOS老师。到现在，我已经坚持了一个月了，已经基本入门，还通过极视教育联系上了那个老师，和老师成为了朋友，他给了我很多职业规划上和学习上的建议。非常感谢极视教育，让我毕业前不再迷茫！ '
        },{
            img:'img/index/403.jpg',
            name:'Marco',
            intro:'我热爱绘画，爱挑战，15年加入了极视教育UI视觉设计专业的培训，极视教育虽然是个企业但里面的工作人员却有一颗教育的心。在这里，我接受了老师专业的指导和职业发展的建议，并且极视教育还用自己的资源帮助我寻找工作，真心觉得这是家有情怀的在线教育机构~'
        }];
        this.renderMxxyDom(result);
    },
    renderMxxyDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            dom+='<li class="mxxy-item f-l" data-intro="'+item.intro+'">';
            if(i==0){
                $('#j_mxxy_intro').html(item.intro);
                dom+='<div class="mxxy-img-wrap active-xx about"><img src="'+item.img+'"></div>';
            }else{
                dom+='<div class="mxxy-img-wrap about"><img src="'+item.img+'"></div>';
            }
            dom+='<p class="name">'+item.name+'</p>'+
            '</li>';
        }
        $('#j_mxxy_list_wrap').html(dom);
    },
	/*joblist*/
	jobload:function(){	
	   $.ajax({
            type: "post",
            dataType: "json",
            url: $._CACHEOBJ.context+"/job/jobList",
			data:{page:1,rows:5},
			beforeSend:function(){
		      $("#j_xzjy_list_wrap").html("查找中，请稍后...");			 
		    },
            success: function (job) {
    			if(job.status== "SUCCESS"){
    				//totalPage=parseInt(job.content.total/data.rows)+1;
                    var htmljob = "";
                    var list=job.content.list;
    				if(list.length>0){
    					for(var i=0;i<5;i++){
                            var item=list[i];
    						htmljob += '<li class="job-item border-bt-d9 clearfix">'+
                            '<a href="/view/xzjy/detail.html?id='+item.jobId+'">'+
                            '<div class="job-img-wrap f-l"><img src="' +item.companyLogo + '" class="job-img">'+
                            '</div> <div class="lh26 f-l"><p class="job-name">' +item.jobName + '</p>'+
                            '<span class="f12-c5ba">' +item.companyName + '</span>'+
                           '<div class="f12-c5ba "><span>' +item.areaCode + '</span>'+
                            '</div></div></a></li>';
    					}
    				}else{//没有job
    					htmljob += '<span class="nols"><i>没有符合要求的职位</i></span>';
    				}
                    $("#j_xzjy_list_wrap").html(htmljob);
    			}
    			
            }
        });
	},
	/*tplist*/
	tpload:function(){	
	   $.ajax({
            type: "post",
            dataType: "json",
            url: $._CACHEOBJ.context+"/jobMap/list",
			data:{page:1,rows:5},
			beforeSend:function(){
		      $("#j_xzjy_list_wrap").html("查找中，请稍后...");			 
		    },
            success: function (job) {
    			var htmljob = "";		
    			if(job.status== "SUCCESS"){
    				//totalPage=parseInt(job.content.total/data.rows)+1;
    				if(job.content.list.length>0){
                        var jobList=job.content.list;
    					for(var i=0,ii=jobList.length;i<ii;i++){
                            var jobItem=jobList[i];
    						htmljob += '<li class="job-item border-bt-d9"><a href="/view/zytp/detail.html?id='+jobItem.id+'">'+
                            '<div class="job-img-wrap f-l"><img src="' +jobItem.picture + '" class="job-img"></div> '+
                            '<div><p class="job-name mrg-b6">' +jobItem.name + '</p>'+
                            '<span class="f12-c5ba">' +jobItem.chapterNum + '课时</span>'+
                            '<div class="f12-c5ba mrg-t12">';
    						var labelDom='',labelsArr=JSON.parse(jobItem.labels);
                            labelsArr=labelsArr.splice(0,3);
							//alert(labelsArr[0])
    						for(var j=0,jj=labelsArr.length;j<jj;j++){
                                var item=labelsArr[j];
                                labelDom+='<span class="job-type mrg-r27">'+item+'</span>';
                        	}
    						htmljob+=labelDom;
                            htmljob+='</div></div></a></li>';
    					}
    				}
    				else{//没有job
    					htmljob += '<span class="nols"><i>没有符合要求的图谱</i></span>';
    				}
    			}else{
                    //没有job
    				htmljob += '<span class="nols"><i>error:' + job.message + '</i></span>';
    		    }
			     $("#j_zytp_list_wrap").html(htmljob);
            }
        });
	},
    loopImgSlider:function(){
        var si=setInterval(function(){
            $('#j_arrow_right').trigger('click');
        },4000);
        this.topImgSliderSi=si;
    },
    cancelImgSlider:function(){
        clearInterval(this.topImgSliderSi);
    },
    init:function(){
         this.bindEvents();
        this.getBannerData();
        // this.getKeChenDataByType(0);
        this.getMsgnData();
        //this.getZytpData();
        //this.getXzjyData();
        this.getMxxyData();
		// this.jobload();
		// this.tpload();
        this.loopImgSlider();
    }
};
indexModule.init();