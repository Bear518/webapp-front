 function on_cc_player_init(vid, objectID){
    var config = {};
    config.on_player_ready = "on_player_ready";
    config.on_player_start = "on_player_start";
    config.on_player_pause = "onPlayPaused";
    config.on_player_resume="onPlayResume";
    mainModule.log('播放器id',objectID);
    mainModule.log('视频id',vid);

    playModule.player=getFlash(objectID);
    playModule.player.setConfig(config);
    playModule.player.width="100%";
    playModule.player.height="100%";
    // var parentC=$(playModule.player).closest('div').attr('id'),appkey='EJG5pDERl',video='$'+vid+'$cc',title='极视教育'+(playModule.courseName||''),
    //     data={appkey:appkey,video:video,title:title};
    // console.log('父容器id\n'+parentC);
    // mainModule.log('云视链、cc、创建Iva实例数据如下',data);
    // var ivaInstance=new Iva(parentC,data);
 }
 function getFlash(objectID){
    return document.getElementsByName(objectID)[1]||document.getElementsByName(objectID)[0];
 }
 function getSWF(swfID){
    if(window.document[swfID]){
        return window.document[swfID];
    }else if(navigator.appName.indexOf('Microsoft')==-1){
        if(document.embeds&&document.embeds[swfID]){
            return document.embeds[swfID];
        }
    }else{
        return document.getElementById(swfID);
    }
 }
 function on_player_ready() {
    console.log('播放器准备');
    // playModule.player.start();
 }
function on_player_start() {
    console.log('播放器开始播放');
    // playModule.player.start();
    playModule.recordData.startTime=Date.now();
    if(playModule.queryNotePoint){
        playModule.player.seek(playModule.queryNotePoint);
    }
}
function onPlayPaused(){
    var moment=Date.now(),time=moment-playModule.recordData.startTime;
    playModule.recordData.learingSec=(playModule.recordData.learingSec||0)+Math.floor(time/1000);
    console.log('播放暂停，已经播放了'+time);

}
function onPlayResume(){
    playModule.recordData.startTime=Date.now();
    console.log('暂停后继续播放');
}
var playModule={
    bindEvents:function(){
        var self=this;
        window.onbeforeunload=function(){
            // playModule.endTime=Date.now();
            // var time=playModule.endTime-playModule.startTime;
            // store.set('playtime',time);
            // return '你确定离开此页面吗？';
            // setTimeout(function(){
            //     store.set('test',1);
            // },1000);
            if(self.recordData.startTime){
                self.doRecord();
            }
        }
        // $(".example1").on("click", function(event) {
        //         event.preventDefault();
        //         html2canvas(document.body, {
        //         allowTaint: true,
        //         taintTest: false,
        //         onrendered: function(canvas) {
        //             canvas.id = "mycanvas";
        //             //document.body.appendChild(canvas);
        //             //生成base64图片数据
        //             var dataUrl = canvas.toDataURL();
        //             var newImg = document.createElement("img");
        //             newImg.src =  dataUrl;
        //             document.body.appendChild(newImg);
        //         }
        //     });
        // }); 
        $('.j_vip_btn').click(function(){
            var type=$(this).data('type');
            switch(type){
                case 1:
                    window.open('/view/vip/memberbuy.html','_blank');
                    // window.location.href='/view/vip/memberbuy.html';
                break;
                case 2:
                   // window.location.href='/view/vip/coursebuy.html?id='+self.courseId;
                   window.open('/view/vip/coursebuy.html?id='+self.courseId,'_blank');
                break;
            }
        });
        $('#j_molu_list_wrap').on('click','li',function(){
            var $this=$(this),
                vedioCode=$this.data('vediocode'),
                classname=$this.data('name'),
                free=$this.data('free');
            mainModule.log('要播放的课时',classname);
            self.chapterId=$this.data('id');
            //打点播放数据
            if(self.recordData.startTime){
                console.log('课时已播放时长（秒）'+self.recordData.learingSec);
                self.doRecord(function(result){
                    self.recordData={};
                },function(result){
                    mainModule.log('保存播放数据出错',result);
                    if(self.recordData.learingSec>9){
                        var recordDataArr=JSON.parse(store.get('recordDataArr')||'[]');
                        recordDataArr.push(self.recordData);
                        var dataStr=JSON.stringify(recordDataArr);
                        store.set('recordDataArr',dataStr);
                        self.recordData={};
                    }else{
                        self.recordData={};
                    }
                });
            }
            //打点结束
            var isCanSee=self.isCanSee(free);
            if(!!!isCanSee){
                self.player.pause();
                return;
            }
            // $('#j_video_wrap').html('');
            self.getPlayCode(vedioCode,free,function(){
                $('#j_keshi_name').html(self.courseName||classname);
                self.chapterId=$this.data('id');
                // if($this.hasClass('learned')){
                //     $('#j_class_plan_item').removeClass('i-learn-wrap').addClass('i-learned-wrap');
                // }else{
                //     $('#j_class_plan_item').removeClass('i-learned-wrap').addClass('i-learn-wrap');
                // }
                $('.j_playing_item_class').removeClass('j_playing_item_class');
                $this.addClass('j_playing_item_class');
            });
            self.checkIsFinshedPlay();
        });
        $('#j_add_pointtime').click(function(){
            var $this=$(this),$checkbox=$this.prev(),$sp=$this.next();
            if($checkbox.prop('checked')){
                $checkbox.prop('checked',false);
                $sp.hide();
            }else{
                var time=self.getPointtime(self.player&&self.player.getCurrentTime());
                $sp.html(time).show();
                $checkbox.prop('checked',true);
            }
        });
        $('#j_bj_content_wrap').on('click','.pointtime',function(e){
            var $this=$(e.target),
                notePoint=$this.data('notepoint');
            self.player.seek(notePoint);
        });
        $('#j_biji_textarea').focus(function(){
            if($('#j_add_pointtime').prev().prop('checked')){
                var $sp=$(this).next().next().find('.pointtime');
                // self.st?clearInterval(self.st):void(0);
                // self.st=setInterval(function(){
                    var time=self.getPointtime((self.player&&self.player.getCurrentTime())||0);
                    $sp.html(time).show();
                // },1000);
            }
            
        });
        $('#j_biji_add').click(function(){
            var $j_biji_textarea=$('#j_biji_textarea'),
                txt=$j_biji_textarea.val(),
                $p=$j_biji_textarea.next();
            if(txt.trim()==''){
                $p.html('笔记不能为空');
                return;
            }
            mainModule.disableBtn($(this));
            $p.empty();
            playModule.addNotes(txt,function(result){
                // self.renderNotesDom(result);
                self.getNotes();
                $j_biji_textarea.val('');  
            });
        });
        $('#j_biji_list_wrap').on('click','.j_biji_del',function(){
            var $this=$(this),
                $dt=$this.parent(),
                $dd=$dt.next(),
                id=$this.data('id');
            self.delNotes(id,function(){
                $dt.remove();
                $dd.remove();
            });
        });
        $('#j_biji_list_wrap').on('click','.j_biji_edit',function(){
            var $this=$(this),
                $dt=$this.parent();
            $dt.addClass('active');
            $dt.next().addClass('active');
            $dt.next().find('textarea').val($dt.next().find('p').html());
        });
        $('#j_biji_list_wrap').on('click','.j_biji_btn_update',function(){
            var $this=$(this),
                $dd=$this.parent(),
                id=$this.data('id'),
                $textarea=$this.prev().prev(),
                $p=$textarea.prev(),
                content=$textarea.val(),
                $error_p=$this.prev();
            if(content.trim()==''){
                $error_p.html('笔记不能为空');
                return;
            }
            $error_p.empty();
            self.updateNotes(id,content,function(){
                $dd.removeClass('active');
                $dd.prev().removeClass('active');
                $p.html(content);
            });
        });
        $('#j_add_comment').click(function(){
            var $this=$(this),$parent=$this.parent(),
                $textarea=$parent.prev().prev(),
                comment=$textarea.val(),
                $p=$parent.prev();
            if(comment.trim()==''){
                $p.html('评论不能为空');
                return;
            }
            mainModule.disableBtn($this);
            $p.empty();
            comment=mainModule.htmlEscape(comment);
            self.addComment(comment,function(result){
                // self.renderCommentDom(result);
                self.getComment();
                $textarea.val('');
            })
        });
        $('.j_r_item').click(function(){
            var $this=$(this),
                id=$this.data('id');
            $('#j_title_wrap').html($this.data('title'));
            $this.siblings().removeClass('active');
            $this.addClass('active');
            $(id).show();
            $(id).siblings().hide();

            if($('#j_midden_wrap').is(':hidden'))
            {
                 // $('#j_midden_wrap').show().animate({width:'26%'},'fast');
                 // $('#j_left_wrap').animate({width:'70%'},'fast');
                $('#j_midden_wrap').show().css({width:'26%'});
                $('#j_left_wrap').css({width:'70%'});
            }
            if(id=='#j_pinglun_list_wrap'){
                $('#j_pinglun_list_wrap dl').html('');
                self.getComment();
            }
            if(id=='#j_biji_list_wrap'){
                self.getNotes();
                $('#j_bj_content_wrap').html('');
            }
        });
        $('#j_shrink_midden_wrap').click(function(){
            var $this=$(this),
                $midden_wrap=$this.parent();
            // $midden_wrap.animate({width:'0%'},1000).hide();
            $midden_wrap.css({width:'0%'}).hide();
            // $('#j_left_wrap').css({width:'96%'});
            $('#j_left_wrap').css('width','96%');
            $('.j_r_item').removeClass('active');
        });
        $('#j_custom_wrap').on('click','#j_like_item',function(){
            var $this=$(this);
            if($this.hasClass('i-like-wrap')){
                self.likeCourse(function(){
                    $this.toggleClass('i-liked-wrap i-like-wrap');
                },function(){
                    mainModule.log(result.message,result,true);
                })
                return;
            }

        });
        // $('#j_custom_wrap').on('click','#j_class_plan_item',function(){
        //     var $this=$(this);
        //     if($this.hasClass('i-learn-wrap')){
        //         self.setClassLearned(function(){
        //             $this.toggleClass('i-learned-wrap i-learn-wrap');
        //             $('#j_class_'+this.chapterId).addClass('learned');
        //         },function(){
        //             mainModule.log(result.message,result,true);
        //         });
        //         return;
        //     }
        //     self.setClassUnDone(function(){
        //         $this.toggleClass('i-learned-wrap i-learn-wrap');
        //         $('#j_class_'+this.chapterId).toggleClass('learned learn');
        //     },function(result){
        //         mainModule.log(result.message,result,true);
        //     });
        // });
        $('#j_custom_wrap').on('click','#j_set_learned',function(){
            var $this=$(this).parent();
            if($this.hasClass('i-learn-wrap')){
                self.setClassLearned(function(){
                    $this.toggleClass('i-learned-wrap i-learn-wrap');
                    $('#j_class_'+this.chapterId).addClass('learned');
                },function(){
                    mainModule.log(result.message,result,true);
                });
                return;
            }
        });
        $('#j_custom_wrap').on('click','#j_cancel_learned',function(){
            var $this=$(this).parent();
            self.setClassUnDone(function(){
                $this.toggleClass('i-learned-wrap i-learn-wrap');
                $('#j_class_'+this.chapterId).toggleClass('learned learn');
            },function(result){
                mainModule.log(result.message,result,true);
            });
        });

    },
    setPeriodLearned:function(){
        var self=this;
        if(!this.$j_left_wrap.hasClass('video-learned')){
            self.setClassLearned(function(){
                self.renderClassDetail({isLearned:true});
                $('#j_class_'+this.chapterId).toggleClass('learned learn');

            },function(result){
                // mainModule.log(result.message,result,true);
                mainModule.showGlobalHintBar(result.message);
            });
        }else{
            self.setClassUnDone(function(){
                self.renderClassDetail({isLearned:false});
                $('#j_class_'+this.chapterId).toggleClass('learned learn');

            },function(result){
                // mainModule.log(result.message,result,true);
                mainModule.showGlobalHintBar(result.message);

            });
        }
        
    },
    isCanSee:function(free){
        var self=this,type=self.courseType,$j_viphint_wrap=$('#j_viphint_wrap_'+type);
        if(self.courseType&&!!free&&!!!self.hasCourse){
            switch(self.courseType){
                case 1:
                    
                break;
                case 2:
                    $j_viphint_wrap.find('.price').html(self.coursePrice);
                break;
                case 3:
                    $j_viphint_wrap.find('.price').html(self.coursePrice);
                break;
            }
            $j_viphint_wrap.show();
            return false;
        }else{
            $j_viphint_wrap.hide();
        }
        return true;
    },
    getPointtime:function(notePoint){
        var pointtime=Math.floor(notePoint),time;
        this.notePoint=pointtime;
        if(pointtime>60){
            //10:00
            var minutes=Math.floor(pointtime/60),
                seconds=pointtime%60;
            if(minutes>9){
                if(seconds>9){
                    time=minutes+':'+seconds;
                }else{
                    time=minutes+':0'+seconds;
                }
                return time;
            }
            if(seconds>9){
                time='0'+minutes+':'+seconds;
            }else{
                time='0'+minutes+':0'+seconds;
            }
            return time;
        }
        if(pointtime>9){
            time='00:'+pointtime;
            return time;
        }
        time='00:0'+pointtime
        return time;
    },
    getChapterByCourseId:function(callback){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:this.courseId},
            url:mainModule.uri.getChapterByCourseId,
            success:function(result){
                mainModule.log('根据课程id查询章节和下面的课时',result);
                playModule.renderChapterDom(result.content);
                callback.call(self);
            }
        })
    },
    renderChapterDom:function(result){
        var dom='',self=this,index=0;
        for(var i=0,xlen=result.length;i<xlen;i++){
            var chapter=result[i];
            // if(i==xlen-1&&chapter.subChapter.length==0){
            //     dom+='<dt class="ba-icon zhangjie-item y-line y-none-line">章节'+(i+1)+''+
            //             '<span class="name-wrap">'+chapter.name+'</span>'+
            //         '</dt>';
            // }else{
            //     dom+='<dt class="ba-icon zhangjie-item y-line">章节'+(i+1)+''+
            //             '<span class="name-wrap">'+chapter.name+'</span>'+
            //         '</dt>';
            // }
            dom+='<dd><ul>'
            // for(var j=0,ylen=chapter.subChapter.length;j<ylen;j++){
                var keshi=chapter;
                if(i==0&&!this.chapterId){
                    mainModule.log('要播放的课时id',this.chapterId);
                     this.chapterId=keshi.id;
                     this.classname=keshi.name;
                     if(!this.isCanSee(keshi.free)){
                        // return;
                     }
                     this.getPlayCode(keshi.vediocode||'F7AA61FCA7642FC69C33DC5901307461',keshi.free,function(){
                        $('#j_keshi_name').html(self.courseName||self.classname);
                        // $('#j_class_plan_item').toggleClass('i-learned-wrap i-learn-wrap');
                     });

                }else if(this.chapterId&&this.chapterId==keshi.id){
                    //如果uri有传chapterId，
                    if(!this.isCanSee(keshi.free)){
                        // return;
                     }
                    mainModule.log('要播放的课时播放代码',keshi.vedioCode);
                    this.classname=keshi.name;
                    this.getPlayCode(keshi.vedioCode,keshi.free,function(){
                        $('#j_keshi_name').html(self.courseName||self.classname);
                    });
                }
                if(i==xlen-1){
                    dom+='<li id="j_class_'+keshi.id+'" data-free="'+keshi.free+'" data-id="'+keshi.id+'" data-name="'+keshi.name+'" data-vedioCode="'+keshi.vedioCode+'"  class="ba-icon keshi-item y-line y-none-line clearfix">课时'+(++index)+' '+
                        '<span class="name-wrap">'+keshi.name+'</span>'+
                        '<span class="k_time f-r"><i></i>'+this.getPointtime(keshi.duration)+'</span>'+
                    '</li>';
                }else{
                    dom+='<li id="j_class_'+keshi.id+'" data-free="'+keshi.free+'" data-id="'+keshi.id+'" data-name="'+keshi.name+'" data-vedioCode="'+keshi.vedioCode+'"  class="ba-icon keshi-item y-line clearfix">课时'+(++index)+' '+
                            '<span class="name-wrap">'+keshi.name+'</span>'+
                            '<span class="k_time f-r"><i></i>'+this.getPointtime(keshi.duration)+'</span>'+
                        '</li>';
                }
            // }
            dom+='</ul></dd>';
        }
        $('#j_molu_list_wrap').html(dom);
        //第一个播放的做标记
        $('#j_class_'+this.chapterId).addClass('j_playing_item_class');
    },
    getDefaultPlayCode:function(vedioCode,free,succFunc){
        $('#j_video_wrap').html('<div style="text-align: center;line-height: 150px;color: #fff;font-size: 16px;position: absolute;top: 50%;margin-top: -75px;">视频正在努力加载中...</div>')
        var url=mainModule.uri.getPlayCode;
        // if(!!!free){
        //     url=mainModule.uri.getPreviewPlayCode;
        // }
        var self=this;
        $.ajax({
            type:'get',
            url:url+vedioCode+'/'+this.courseId+'/'+this.chapterId,
            success:function(result){
                mainModule.log('获取视频代码接口返回',result);
                self.httpInterceptor(result,function(){
                    var jsonData=JSON.parse(result.content);
                    $('#j_video_wrap').html(jsonData.video.playcode);
                    setTimeout(function(){
                        $('#j_left_wrap').find('embed').css({width:'100%',height:'100%'});
                    },1000);
                    succFunc&&succFunc();
                    self.getClassDetail();
                },function(result){
                    $('#j_video_wrap').html('<div style="text-align: center;line-height: 150px;color: #fff;font-size: 16px;position: absolute;top: 50%;margin-top: -75px;">'+result.message+'</div>');
                });
                
            }
        })
    },
    getPlayCode:function(vedioCode,free,succFunc,hd){
        // $('#j_video_wrap').html('<div style="text-align: center;line-height: 150px;color: #fff;font-size: 16px;position: absolute;top: 50%;margin-top: -75px;">视频正在努力加载中...</div>')
        var url=mainModule.uri.getPlayCode;
        // if(!!!free){
        //     url=mainModule.uri.getPreviewPlayCode;
        // }
        // url+vedioCode+'/'+this.courseId+'/'+this.chapterId,
        // s/h 标清／高清
        var hd=hd||'h';
        var self=this;
        $.ajax({
            type:'get',
            url:url+this.courseId+'/'+this.chapterId+'/'+hd,
            success:function(result){
                mainModule.log('获取视频代码接口返回',result);
                self.httpInterceptor(result,function(){
                    // var jsonData=JSON.parse(result.content);
                    // $('#j_video_wrap').html(jsonData.video.playcode);
                    mainModule.log('video sourse',result.content);
                    var si=setInterval(function(){
                        if(window.jsPlayer&&window.jsPlayer.isReady){
                            var playTime=window.jsPlayer.aliPlayer.continuePlayTime||1;
                            window.jsPlayer.aliPlayer.loadByUrl(result.content,playTime);
                            window.jsPlayer.aliPlayer.trigger('url:change');
                            self.player=window.jsPlayer.aliPlayer;
                            clearInterval(si);
                            $('#j_left_wrap').find('.j_loading').hide();
                        }
                    },1000);
                    // setTimeout(function(){
                    //     $('#j_left_wrap').find('embed').css({width:'100%',height:'100%'});
                    // },1000);
                    succFunc&&succFunc();
                    self.getClassDetail();
                },function(result){
                    $('#j_video_wrap').html('<div style="text-align: center;line-height: 150px;color: #fff;font-size: 16px;position: absolute;top: 50%;margin-top: -75px;">'+result.message+'</div>');
                });
                
            }
        })
    },
    switchHd:function(hd){
        this.getPlayCode('','','',hd);
    },
    playNext:function(){
        var $playing=$('.j_playing_item_class'),$playing_dd=$playing.closest('dd'),$next;
        $next=$playing_dd.next();
        if($next.length){
            $next.find('li').trigger('click');
        }else{
            $playing_dd.parent().find('dd').first().find('li').trigger('click');
        }
    },
    getNotes:function(){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:self.courseId,chapterId:self.chapterId},
            url:mainModule.uri.getNotes,
            success:function(result){
                mainModule.log('笔记查询数据'+this.url,result);
                self.httpInterceptor(result,function(){
                    self.renderNotesDom(result.content);
                })
            }
        })
    },
    formatDate:function(date){
        var date=new Date(date),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            datetime=year+'-'+month+'-'+day;
        return datetime;
    },
    formatDateToSeconds:function(date){
        var date=new Date(date),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            hours=date.getHours(),minutes=date.getMinutes(),seconds=date.getSeconds();
            if(hours<10){
                hours='0'+hours;
            }
            if(minutes<10){
                minutes='0'+minutes;
            }
            if(seconds<10){
                seconds='0'+seconds;
            }
            datetime=year+'/'+month+'/'+day+' '+hours+':'+minutes+':'+seconds;
        return datetime;
    },
    addNotes:function(content,callback){
        var self=this;
        var date=new Date(),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            datetime=year+'-'+month+'-'+day;
        var data={chapterId:self.chapterId,courseId:self.courseId,content:content};
        $('#j_add_pointtime').prev().prop('checked')?(this.notePoint?data.notePoint=this.notePoint:void(0)):void(0);
        $.ajax({
            type:'post',
            data:data,
            url:mainModule.uri.addNotes,
            success:function(result){
                console.log(result);
                playModule.httpInterceptor(result,callback);
            }
        })
    },
    renderNotesDom:function(result){

        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            dom+='<dt class="bj-item clearfix">';
            if(item.notePoint){
                    dom+='<span data-notePoint="'+item.notePoint+'" class="ba-icon pointtime mrg-r20">'+this.getPointtime(item.notePoint)+'</span>';
                }
                    dom+='<span class="f12 c9">'+this.formatDate(item.createDate)+'</span>'+
                        '<i class="bg-icon i-del f-r j_biji_del" data-id="'+item.id+'"></i><i class="bg-icon i-edit f-r j_biji_edit"></i>'+
                    '</dt>'+
                    '<dd class="clearfix">'+
                        '<p>'+item.content+'</p>'+
                        '<textarea></textarea>'+
                        '<p class="error"></p>'+
                        '<input data-id="'+item.id+'" type="button" class="bj-btn-save f-r j_biji_btn_update" value="保存">'+
                    '</dd>';
            console.log(this.formatDate(item.createDate));
        }
        $('#j_bj_content_wrap').html(dom);
    },
    delNotes:function(id,callback){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.delNotes+id,
            success:function(result){
                console.log(result);
                self.httpInterceptor(result,callback);
            }
        })
    },
    updateNotes:function(id,content,callback){
        var self=this;
        $.ajax({
            type:'post',
            data:{courseId:playModule.courseId,chapterId:playModule.chapterId,id:id,content:content},
            url:mainModule.uri.updateNotes,
            success:function(result){
                mainModule.log('笔记修改数据',result);
                self.httpInterceptor(result,callback);
            }
        })
    },
    getComment:function(){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:self.courseId,page:1,rows:50,chapterId:self.chapterId},
            url:mainModule.uri.getComment,
            success:function(result){
                mainModule.log('评论数据'+this.url,result);
                self.httpInterceptor(result,self.renderCommentDom);
            }
        })
    },
    formatTel:function(tel){
        return tel.substring(0,4)+'***'+tel.substring(7);
    },
    formatEmail:function(email){
        return email&&(email.substr(0,4)+'***'+email.substr(7));
    },
    renderCommentDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i],photo=item.icon||'/img/info/105.jpg',
                username=item.nickName||(item.mobilePhone&&this.formatTel(item.mobilePhone))||this.formatEmail(item.email)||'***';
            item.createDate=item.createDate?item.createDate:new Date();
            item.createDate=$.timeago(item.createDate);
            item.comment=mainModule.htmlEscape(item.comment);
            item.username=mainModule.htmlEscape(item.username);
            dom+='<dt class="pinglun-dt">'+
                    '<div class="user-photo-wrap"><img src="'+photo+'"></div>'+
                    '<span class="user-name">'+username+'</span>'+
                    '<span class="time">'+item.createDate+'</span>'+
                '</dt><dd class="pinglun-dd">'+item.comment+'</dd>';
        }
        $('#j_pinglun_list_wrap dl').html(dom);
    },
    addComment:function(comment,callback){
        var self=this;
        $.ajax({
            type:'post',
            data:{comment:comment,courseId:self.courseId,chapterId:self.chapterId},
            url:mainModule.uri.addComment,
            success:function(result){
                console.log(result);
                self.httpInterceptor(result,callback);
            }
        })
    },
    searchNextPlayLi:function($j_class_el){
        var $j_latest_class_li;
        if($j_class_el.next().is('li')){
            $j_latest_class_li=$j_class_el;
            return $j_latest_class_li;
        }else{
            $j_latest_class_li=$j_class_el.closest('dd').next().next().find('li').first();
            if($j_latest_class_li.is('li')){
                return $j_latest_class_li;
            }else{
                return $j_class_el;
            }
        }
    },
    getClassLearnedList:function(succFunc,errFunc){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:this.courseId},
            url:mainModule.uri.getClassLearnedList,
            success:function(result){
                mainModule.log('已经学习的课时列表',result);
                self.httpInterceptor(result,succFunc,errFunc);
            }
        })
    },
    renderClassLearnedListDom:function(result){
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i],
                $j_class_el=$('#j_class_'+item.chapterId);
            $j_class_el.addClass('learned');
            // //做一个已经学习课时的标记
            // if(item.chapterId==this.chapterId){
            //     this.styxx=setTimeout(function(){
            //         $('#j_class_plan_item').toggleClass('i-learned-wrap i-learn-wrap');
            //         clearTimeout(this.styxx);
            //     },2000);
            // }
            //拿到最后一个学习完的课时id
            if(i==0){
                // var $j_latest_class_li=this.searchNextPlayLi($j_class_el);
                // $j_latest_class_li.addClass('learned');
                // this.chapterId=this.chapterId||$j_latest_class_li.data('id');
                // this.classname=this.classname||$j_latest_class_li.data('name');
                // mainModule.log('要播放的课时',this.classname);
                // this.getPlayCode($j_latest_class_li.data('vediocode'),function(){
                //     $('#j_keshi_name').html(this.classname);
                // });
                // //如果最后一个课时已经学习完
                // if(item.chapterId==this.chapterId){
                //     mainModule.log('已学完的课时',this.chapterId);
                //    this.st=setTimeout(function(){
                //         $('#j_class_plan_item').toggleClass('i-learned-wrap i-learn-wrap');
                //         clearTimeout(this.st);
                //     },2000);
                // }
            }
        }
    },
    httpInterceptor:function(result,succFunc,errFunc,i){
        if(result.status=='SUCCESS'){
            if(result.content){
                succFunc&&succFunc.call(this,result.content.list||result.content.rows||result.content);
            }else{
                succFunc&&succFunc.call(this,result,i);
            }
        }else{
            errFunc&&errFunc.call(this,result);
        }
        if(/NOTLOGIN/.test(result.errorType)){
            this.$mm.popLoginBox();
            errFunc&&errFunc.call(this,result);
        }
    },
    setClassLearned:function(succFunc,errFunc){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:this.courseId,chapterId:this.chapterId},
            url:mainModule.uri.setClassDone,
            success:function(result){
                self.httpInterceptor(result,succFunc,errFunc);
            }
        });
    },
    setClassUnDone:function(succFunc,errFunc){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:this.courseId,chapterId:this.chapterId},
            url:mainModule.uri.setClassUndone,
            success:function(result){
                self.httpInterceptor(result,succFunc,errFunc);
            }
        });
    },
    likeCourse:function(succFunc,errFunc){
        var self=this;
        $.ajax({
            type:'post',
            data:{courseId:this.courseId,chapterId:this.chapterId},
            url:mainModule.uri.likeCourse,
            success:function(result){
                self.httpInterceptor(result,succFunc,errFunc);
            }
        })
    },
    getBreadNavigate:function(succFunc,errFunc){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getBreadNavigate+this.courseId,
            success:function(result){
                mainModule.log('面包屑导航数据',result);
                self.httpInterceptor(result,self.renderBreadNavigateDom,errFunc);
            }
        })
    },
    renderBreadNavigateDom:function(result){
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
        console.log('随机取面包屑list数据索引'+rad);
        curItem=curItem||result[rad];
         mainModule.log('当前渲染的面包屑数据',curItem);
        // var indushref='/view/seek/course.html?industryId='+curItem.industryId,
        var dirhref='/view/seek/course.html?directionId='+(curItem&&curItem.directionId||''),
            sorthref='/view/seek/course.html?directionId='+(curItem&&curItem.directionId||'')+'&sortId='+(curItem&&curItem.sortId||'');
        // $('#j_bread_indus').html(curItem.industryName).attr('href',indushref);
        $('#j_bread_dir').html(curItem&&curItem.directionName).attr('href',dirhref);
        $('#j_bread_sort').html(curItem&&curItem.sortName).attr('href',sorthref);
    },
    getClassDetail:function(){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:this.courseId,chapterId:this.chapterId},
            url:mainModule.uri.getClassDetail,
            success:function(result){
                mainModule.log('课时详情获取',result);
                self.renderClassDetail.bind(self);
                self.httpInterceptor(result,self.renderClassDetail);
            }
        })
    },
    renderClassDetail:function(result){
        // if(result.isLike){
        //     $('#j_like_item').removeClass('i-like-wrap').addClass('i-liked-wrap');
        //     $('#j_likes').html(result.likes);
        // }else{
        //     $('#j_like_item').removeClass('i-liked-wrap').addClass('i-like-wrap');
        //     $('#j_likes').html('');
        // }
        mainModule.log('renderClassDetail of this is ',this);
        var $wrap=this.$j_left_wrap;
        if(result.isLearned){
            // $('#j_class_plan_item').removeClass('i-learn-wrap').addClass('i-learned-wrap');
            $wrap.addClass('video-learned');
        }else{
            // $('#j_class_plan_item').removeClass('i-learned-wrap').addClass('i-learn-wrap');
            $wrap.removeClass('video-learned');
        }
    },
    doRecord:function(succFunc,errFunc){
        var self=this;
        this.recordData.learingSec=(this.recordData.learingSec||0)+Math.floor((Date.now()-this.recordData.startTime)/1000);
        this.recordData.positionSec=Math.floor(this.player.getCurrentTime&&this.player.getCurrentTime()||this.recordData.positionSec||0);
        this.recordData.startTime=this.formatDateToSeconds(new Date(this.recordData.startTime));
        this.recordData.endTime=this.formatDateToSeconds(new Date());
        this.recordData.lessionId=this.courseId;
        this.recordData.chapterId=this.chapterId;
        var data={
            lessionId:this.courseId,
            chapterId:this.chapterId,
            startTime:this.recordData.startTime,
            endTime:this.recordData.endTime,
            learingSec:this.recordData.learingSec,
            positionSec:this.recordData.positionSec
        };
        mainModule.log('要打点的学习数据如下',data);
        if(this.recordData.learingSec>9){
            this.doRecordByData(data,succFunc,errFunc);
        }else{
            this.recordData={};
        }
    },
    doRecordByData:function(data,succFunc,errFunc,i){
        var self=this;
        $.ajax({
            type:'post',
            data:data,
            url:mainModule.uri.doRecord,
            success:function(result){
                mainModule.log('课程记录打点接口返回数据',result);
                self.httpInterceptor(result,succFunc,errFunc,i);
            }
        })
    },
    recordData:{},
    doRecordFromStore:function(){
        /********打点失败的从缓存中拿出来重新打点*********/
        var recordDataArr=JSON.parse(store.get('recordDataArr')||[]);
        for(var i=0,len=recordDataArr.length;i<len;i++){
            var item=recordDataArr[i];
            this.doRecordByData(item,function(result,i){
                recordDataArr.splice(i,1);
                var dataStr=JSON.stringify(recordDataArr);
                store.set('recordDataArr',dataStr);
            },undefined,i);
        }
    },
    checkIsFinshedPlay:function(){
        var self=this;
        var si=setInterval(function(){
            if(self.player&&self.player.getCurrentTime){
                var curPos=self.player.getCurrentTime(),totaltime=self.player.getDuration();
                if(20>totaltime-curPos){
                    // confirm('快播放完了');
                    // mainModule.log('当前的si',si);
                    var $j_class_plan_item=$('#j_class_plan_item');
                    if($j_class_plan_item.hasClass('i-learn-wrap')){
                        self.setClassLearned(function(){
                            $j_class_plan_item.toggleClass('i-learned-wrap i-learn-wrap');
                            $('#j_class_'+self.chapterId).addClass('learned');
                            self.renderClassDetail({isLearned:true});
                        },function(result){
                            mainModule.log(result.message,result,true);
                        });
                    }
                    self.doRecord();
                    clearInterval(si);
                }
            }
        },3000);
    },
    getCourseInfo:function(succFunc){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getCourseInfo+this.courseId,
            success:function(result){
                mainModule.log('课程详情接口返回数据',result);
                self.httpInterceptor(result,function(result){
                    self.courseType=result.type;
                    self.coursePrice=result.price;
                    self.hasCourse=result.hasCourse;
                    succFunc&&succFunc.call(self);
                })
            }
        })
    },
    wakeSession:function(){
        var si=setInterval(function(){
            $.ajax({
                type:'get',
                url:mainModule.uri.wakeSession,
                success:function(result){
                    mainModule.log('wakeSession',result);
                }
            })
        },10*60*1000);
    },
    init:function(){
        this.$mm=mainModule;
        this.$j_left_wrap=$('#j_left_wrap');
        this.courseId=mainModule.getQueryValueByName('courseId');
        if(!this.courseId){
            window.location.href="/view/seek/course.html";
        }
        this.chapterId=mainModule.getQueryValueByName('chapterId');
        this.queryNotePoint=mainModule.getQueryValueByName('notePoint');
        this.courseName=decodeURIComponent(this.$mm.getQueryValueByName('courseName')||'');
        document.title=this.courseName+'_极视教育网';
        mainModule.log('课程ID为'+this.courseId);

        this.bindEvents();
        this.getCourseInfo(function(){
            this.getChapterByCourseId(function(){
                this.getNotes();
                if(mainModule.getCookie('islogin')){
                    this.getClassLearnedList(this.renderClassLearnedListDom,function(result){
                        mainModule.log('获取学习列表失败',result,true);
                    });
                    mainModule.log('已经登陆');
                }
            });
        });
        this.getComment();
        this.getBreadNavigate();
        this.checkIsFinshedPlay();
        /*保存失败的学习数据，从浏览器中拿出来重新发请求*/
        if(store.get('recordDataArr')){
            this.doRecordFromStore();
        }
        this.wakeSession();
    }
};
playModule.init();