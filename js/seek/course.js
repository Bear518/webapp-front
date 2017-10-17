var courseModule={
    bindEvents:function(){
        var self=this;
        $('#j_kechen_fenglei_list_wrap').on('click','.fenglei-option',function(){
            var $this=$(this),
                $wrap=$this.parent().parent();
            $wrap.find('.active').removeClass('active');
            //
            $wrap.next().find('.active').removeClass('active');
            //
            $this.addClass('active');
            self.searchKeChen(1);
            self.isHasPaged=false;
        });
        $('.j_indus_item').click(function(){
            var $this=$(this),
                type=$this.data('type');
            $this.siblings().removeClass('active');
            $this.addClass('active');
        });
        $('#j_kechen_list_wrap').on('click','.j_kechen_item',function(){
            var $this=$(this),
                courseId=$this.data('id'),
                videoId=$this.data('videoid');
            var isMobile=/mobile/gi.test(window.navigator.userAgent);
            if(isMobile){
                window.location.href='/mobile/view/courseDetails.html?courseId='+courseId;
            }else{
                var href="/view/lesson/lessonintro.html?courseid="+courseId;
                window.open(href,'_blank');
            }
        });
        //mouseenter mouseout
        $('#j_kechen_indus_wrap').on('click','li',function(e){
            // if(e.type=="mouseenter"){
              var $this=$(this),
                type=$this.data('type');
                self.activeHoverInit($this);
                self.industryId=type;
                self.getKeChenDataByIndusId(type,true);
                self.isHasPaged=false;

            // }
        });
    },
    searchKeChen:function(page){
        var data={page:page,rows:20},
            searchLevel=0,self=this;
        $('#j_kechen_fenglei_list_wrap').find('.active').each(function(index,el){
            var $this=$(this),
                type=$this.data('type'),
                id=$this.data('id');
            switch(type){
                case 'industry':
                    data.industryId=id;
                    searchLevel=1;
                break;
                case 'direction':
                    data.industryId=self.industryId;
                    if(id){
                        data.directionId=id;
                        searchLevel=2;
                    }else{
                        searchLevel=1;
                    }
                break;
                case 'skill':
                    if(id){
                        data.sortId=id;
                        searchLevel=3;
                    }
                break;
            }
        });
        console.log(data);
        store.set('crumbs',store.serialize(data));
        switch(searchLevel){
            case 1:
                courseModule.getKeChenDataByIndusId(data.industryId,undefined,data);
            break;
            case 2:
                courseModule.searchSecondLevel(data);
            break;
            case 3:
                courseModule.searchThreeLevel(data);
            break;
        }
    },
    searchThreeLevel:function(data){
        $.ajax({
            type:'get',
            data:data,
            url:mainModule.uri.searchCourseThreeLevel,
            success:function(result){
                console.log(result);
                if(result.content.direction){
                    $('#j_fenglei_direction_'+result.content.industry.id).parent().parent().find('.active').removeClass('active');
                    $('#j_fenglei_direction_'+result.content.industry.id).addClass('active');
                }
                courseModule.renderKeChenDom(result.content.courseMap.list,result.content.courseMap.total);
            }
        })
    },
    searchSecondLevel:function(data){
        $.ajax({
            type:'get',
            data:data,
            url:mainModule.uri.searchCourseSecondLevel,
            success:function(result){
                if(result.content.industry){
                    // $('#j_fenglei_industry_'+result.content.industry.id).parent().parent().find('.active').removeClass('active');
                    // $('#j_fenglei_industry_'+result.content.industry.id).addClass('active');
                }
                if(result.content.sort){
                    courseModule.renderSkillDom(result.content.sort);
                }
                courseModule.renderKeChenDom(result.content.courseMap.list,result.content.courseMap.total);
                console.log(result);
            }
        })
    },
    activeHoverInit:function($this){
        $this.siblings().removeClass('active');
        $this.addClass('active');
    },
    getKeChenDataByIndusId:function(indusId,isFromMenu,data){
        var data=$.extend({page:1,rows:20},data||{});
        $('#j_indus_fl_wrap').hide();
        if(indusId){
            data.industryId=indusId;
        }
        // if(indusId!=0&&isFromMenu){
        //     $('#j_indus_fl_wrap').hide();
        // }

        $.ajax({
            type:'get',
            data:data,
            url:mainModule.uri.getCourse,
            success:function(result){
                console.log(result);
                if(result.content.industry&&$('#j_kechen_indus_wrap').children().length<2){
                    courseModule.renderIndustryListDom(result.content.industry);
                }
                if(indusId==0){
                    courseModule.renderIndusFLDom(result.content.industry);
                }
                if(result.content.courseMap){
                    courseModule.renderKeChenDom(result.content.courseMap.list,result.content.courseMap.total);
                }
                if(result.content.direction){
                    courseModule.renderDirFLDom(result.content.direction);
                }
                if(result.content.sort){
                    courseModule.renderSkillDom(result.content.sort);
                }
            }
        });
    },
    renderSkillDom:function(result){
        var dom='<div class="f-l"><span class="title fenglei-name-wrap">分类：</span>'+
        '<span class="fenglei-name-wrap fenglei-option active" data-type="skill">全部</span></div><div class="f-l fenglei-r-wrap">';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
             dom+='<span id="j_fenglei_skill_'+item.id+'" data-type="skill" data-id="'+item.id+'" class="fenglei-name-wrap fenglei-option">'+item.name+'</span>';
        }
        dom+='</div>';
        $('#j_skill_fl_wrap').html(dom);
    },
    renderDirFLDom:function(result){
        var dom='<div class="f-l"><span class="title fenglei-name-wrap">方向：</span>'+
        '<span class="fenglei-name-wrap fenglei-option active " data-type="direction">全部</span></div><div class="f-l fenglei-r-wrap">';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
             dom+='<span id="j_fenglei_direction_'+item.id+'" data-type="direction" data-id="'+item.id+'" class="fenglei-name-wrap fenglei-option">'+item.name+'</span>';
        }
        dom+='</div>';
        $('#j_dir_fl_wrap').html(dom);
    },
    renderIndusFLDom:function(result){
        var dom='<div class="f-l"><span class="title fenglei-name-wrap">行业：</span>'+
            '<span class="fenglei-name-wrap fenglei-option active">全部</span></div><div class="f-l fenglei-r-wrap">';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            dom+='<span id="j_fenglei_industry_'+item.id+'" data-type="industry" data-id="'+item.id+'" class="fenglei-name-wrap fenglei-option">'+item.name+'</span>';
        }
        dom+='</div>';
        $('#j_indus_fl_wrap').html(dom);
    },
    renderIndustryListDom:function(result){
        var dom='';
        var item1=result[2];
        result[2]=result[1];
        result[1]=item1;
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            switch(i){
                case 0:
                    dom+='<li id="j_indus_item_'+item.id+'" class="j_indus_item kechen-item f-l " data-type="'+item.id+'">'+
                            '<i class="kechen-i kechen-it-i"></i>'+
                                 ''+item.name+''+
                            '</li>';
                break;
                case 1:
                    dom+='<li id="j_indus_item_'+item.id+'" class="j_indus_item kechen-item f-l " data-type="'+item.id+'">'+
                            '<i class="kechen-i kechen-ys-i"></i>'+
                                 ''+item.name+''+
                            '</li>';
                break;
                case 2:
                    dom+='<li id="j_indus_item_'+item.id+'" class="j_indus_item kechen-item f-l " data-type="'+item.id+'">'+
                            '<i class="kechen-i kechen-jr-i"></i>'+
                                 ''+item.name+''+
                            '</li>';
                break;
                case 3:
                    dom+='<li id="j_indus_item_'+item.id+'" class="j_indus_item kechen-item f-l " data-type="'+item.id+'">'+
                            '<i class="kechen-i kechen-zc-i"></i>'+
                                 ''+item.name+''+
                            '</li>';
                break;
            }
        }
        $('#j_kechen_indus_wrap').append(dom);
        var $j_indus_item_=$('#j_indus_item_'+this.industryId);
        $j_indus_item_.siblings('li').removeClass('active');
        $j_indus_item_.addClass('active');
    },
    renderKeChenDom:function(result,total){
        var dom='',
            len=result.length;

        for(var i=0;i<len;i++){
            var item=result[i];
            item.totalTimes=this.formattime(item.totalTimes);
            if((i+1)%4==0){
                dom+='<li data-id="'+item.id+'" data-videoid="'+item.introductionVideoId+'" class="j_kechen_item kenchen-list-item f-l mrg-b36">';
            }else
            {
                dom+='<li data-id="'+item.id+'" data-videoid="'+item.introductionVideoId+'" class="j_kechen_item kenchen-list-item f-l mrg-r33 mrg-b36">';
            }
            if(!!!item.type){
                dom+='<div class="kechen-img-wrap"><i class="icon-i mianfei-i"></i><img class="" src="'+item.picture+'"></div>';
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
                        '<i class="icon-i i-time"></i>'+item.totalTimes+'<i class="icon-i i-chapter"></i>'+item.totalLessons+'课时'+
                    '</div>'+
                '</div>'+
                '<div class="kenchen-like-wrap f12-c666">'+
                    '<i class="icon-i i-like"></i>'+item.likesNum+'人'+
                    '<span class="f-r mrg-r20"><i class="icon-i i-watch-people"></i>'+item.watchedNum+'</span>'+
                '</div>'+
            '</li>';
        }
        $('#j_kechen_list_wrap').html(dom);
        if(!this.isHasPaged){
            $('#j_kechen_page_control').hide();
        }
        var self=this;
        if(total>20&&!this.isHasPaged){
            var pageCount=(total%20)==0?(total/20):Math.floor(total/20)+1;
            $('#j_kechen_page_control').off('click');
            $('#j_kechen_page_control').createPage({
                  pageCount:pageCount,
                  current:1,
                  isHasGoto:true,
                  backFn:function(p){
                      //单击回调方法，p是当前页码
                      console.log(p);
                      courseModule.searchKeChen(p);
                      self.isClickPage=true;
                  }
            });
            this.isHasPaged=true;
            $('#j_kechen_page_control').show();
        }
        self.isClickPage?(window.scrollTo(0,403)):(self.isClickPage=false);
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
    isHasPaged:false,
    init:function(){
        var self=this;
        this.bindEvents();
        this.industryId=mainModule.getQueryValueByName('industryId');
        this.directionId=mainModule.getQueryValueByName('directionId');
        this.sortId=mainModule.getQueryValueByName('sortId');
        // setTimeout(function(){
            if(self.industryId){
                // $('#j_indus_item_'+self.industryId).trigger('click');
                this.getKeChenDataByIndusId(this.industryId);
            }else{
                this.getKeChenDataByIndusId();
            }
            setTimeout(function(){
                if(self.directionId){
                    $('#j_fenglei_direction_'+self.directionId).trigger('click');
                }
                setTimeout(function(){
                    if(self.sortId){
                        $('#j_fenglei_skill_'+self.sortId).trigger('click');
                    }
                },1000);
            },1000);
        // },1000);

    }
};
courseModule.init();