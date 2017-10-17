var xuexiModule={
    bindEvents:function(){
        var self=this;
        $('#j_courseandplan').click(function(e){
            var $this=$(e.target),type=$this.data('type');
            $this.siblings().removeClass('active');
            $this.addClass('active');
            if(/course/.test(type)){
                self.getMyCoursePlan();
            }else{
                self.getMyZytpList();
            }
        });
        $('#j_course_plan_wrap').on('click','.i-del-plan',function(){
            var $this=$(this),jobMapId=$this.data('id');
            self.cancelZytpPlan(jobMapId,function(){
                $this.parent().parent().remove();
            })
        });
        $('#j_course_plan_wrap').on('click','.i-del-course',function(){
            var $this=$(this),courseId=$this.data('id');
            self.delCoursePlan(courseId,function(){
                $this.parent().parent().remove();
            });
        });
        $('#j_kechen_name_wrap').on('click','li',function(){
            var $this=$(this),id=$this.data('courseid');
            $this.siblings().removeClass('active');
            $this.addClass('active');
            self.getMyCourseNotes(id);
        });
        $('#j_keshi_biji_container').on('click','.i-big',function(){
            var id=$(this).data('id'),$j_pop_box=$('#j_pop_box');
            mainModule.log('当前编辑的笔记对象',self.noteHashList[id]);
            var curItem=self.noteHashList[id][0],
                date=self.formatDate(curItem.createDate),
                pointtime=self.getPointtime(curItem.notePoint),
                dom='<a target="_blank" href="/view/course/play.html?courseId='+curItem.courseId+'&chapterId='+curItem.chapterId+'"><i class="i-icon i-triangle-l"></i>'+pointtime+'</a>';
            self.curEditBjItem=curItem;
            $j_pop_box.find('.j_date').html(date);
            $j_pop_box.find('.j_pointtime').html(dom);
            $j_pop_box.find('.j_txt').html(curItem.content);
            $j_pop_box.find('.j_txt').next().val(curItem.content)
            $j_pop_box.show();
            $j_pop_box.prev().show();
        });
        $('#j_keshi_biji_container').on('click','.i-del',function(){
            var $this=$(this),id=$this.data('id');
            self.delNotes(id,function(){
                $('#j_biji_'+id).remove();
            });
        });
        $('.j_info_edit').click(function(){
            $('#j_info_wrap').addClass('active');
        });
        $('#j_btn_update_info').click(function(){
            $('#j_info_wrap').removeClass('active'); 
        });
        $('#j_time_select_wrap').click(function(e){
            var $this=$(e.target),
                type=$this.data('type');
            var tempData={
                pieData:[
                    {name: "思维导图",value: 30,color: "#146b8b",lesson_id: 145}
                    ,{name: "Unity3D 入门", value: 14, color: "#cc9c59", lesson_id: 148}
                    ,{name: "原画设计", value: 8, color: "#b0c6fd", lesson_id: 141}
                    ,{name: "金融基础", value: 1, color: "#df0ab9", lesson_id: 80},
                    {name: "Zbrush次时代游戏高模制作", value: 1, color: "#56dabf", lesson_id: 139}
                ],
                timeChart:{
                    labels: ["01", "02", "03", "04", "05", "06", "07","08","09", "10", "11", "12", "13", "14", "15","16","17","18","19","20","21","22","23","24"],
                    datasets: [
                        {
                            label: "My First dataset",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [65, 59, 80, 81, 56, 55, 40]
                        },
                        // {
                        //     label: "My Second dataset",
                        //     fillColor: "rgba(151,187,205,0.2)",
                        //     strokeColor: "rgba(151,187,205,1)",
                        //     pointColor: "rgba(151,187,205,1)",
                        //     pointStrokeColor: "#fff",
                        //     pointHighlightFill: "#fff",
                        //     pointHighlightStroke: "rgba(151,187,205,1)",
                        //     data: [28, 48, 40, 19, 86, 27, 90]
                        // }
                    ]
                }
            };
            switch(type){
                case 'today':
                    type='DAY';
                    tempData.timeChart.labels=["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00","8:00","9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"];
                break;
                case 'weekday':
                    type="WEEK";
                    tempData.timeChart.labels=["周日","周一", "周二", "周三", "周四", "周五", "周六"];
                break;
                case 'month':
                    type="MONTH";
                    tempData.timeChart.labels=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
                break;
                case 'year':
                    type="YEAR";
                    tempData.timeChart.labels=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
                break;
            }
            self.getMyLineData(type,function(lineData){
                self.getMyPieData(type,function(pieData){
                    var transformData=self.transformValuesByPeriodAndData(type,lineData,pieData);
                    tempData.timeChart.datasets[0].data=transformData.lineData;
                    tempData.pieData=transformData.pieData;
                    mainModule.log('要渲染的今天的学习数据如下',tempData);
                    self.renderChartDom(tempData.timeChart,tempData.pieData);
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                });
            });
        })
    },
    makeLabelsDataByPeriod:function(period){
        var len,arr;
        switch(period){
            case 'DAY':
                len=24;
            break;
            case 'WEEK':
                len=7;
            break;
            case 'MONTH':
                len=31;
            break;
            case 'YEAR':
                len=12;
            break;
        }
        arr=new Array(len);
        for(var i=1;i<=len;i++){
            var item='';
            if(i<10){
                item='0'+i;
            }
            item=item+i;
            arr.push(item);
        }
        mainModule.log('labels make data by period',arr);
        return arr;
    },
    transformValuesByPeriodAndData:function(period,lineData,pieData){
        var len,arr,pieArr=[];
        switch(period){
            case 'DAY':
                len=24;
                arr=new Array(len);
                for(var j=0,jj=arr.length;j<jj;j++){
                    arr[j]=0;
                }
                for(var i=0,ii=lineData.length;i<ii;i++){
                    var item=lineData[i],index=item.dateString.split(' ')[1]-1;
                    arr[index]=Math.floor(item.learningTime/60);
                }
                mainModule.log('今天的学习数据',arr);
            break;
            case 'WEEK':
                len=7;
                arr=new Array(len);
                for(var j=0,jj=arr.length;j<jj;j++){
                    arr[j]=0;
                }
                for(var i=0,ii=lineData.length;i<ii;i++){
                    var item=lineData[i],index=new Date(item.dateString).getDay();
                    index==7?0:index;
                    arr[index]=Math.floor(item.learningTime/60);
                }
                mainModule.log('这一周的学习数据',arr);
            break;
            case 'MONTH':
                len=31;
                arr=new Array(len);
                for(var j=0,jj=arr.length;j<jj;j++){
                    arr[j]=0;
                }
                for(var i=0,ii=lineData.length;i<ii;i++){
                    var item=lineData[i],index=new Date(item.dateString).getDate()-1;
                    arr[index]=Math.floor(item.learningTime/60);
                }
                mainModule.log('这一月的学习数据',arr);
            break;
            case 'YEAR':
                len=12;
                arr=new Array(len);
                for(var j=0,jj=arr.length;j<jj;j++){
                    arr[j]=0;
                }
                for(var i=0,ii=lineData.length;i<ii;i++){
                    var item=lineData[i],index=new Date(item.dateString).getMonth()-1;
                    arr[index]=Math.floor(item.learningTime/60);
                }
                mainModule.log('这一年的学习数据',arr);
            break;
        }

        for(var i=0,ii=pieData.learningTimeVOList.length;i<ii;i++){
            var item=pieData.learningTimeVOList[i],color;
            switch(i){
                case 0:
                    color='#146b8b';
                break;
                case 1:
                    color='#cc9c59';
                break;
                case 2:
                    color='#b0c6fd';
                break;
                case 3:
                    color='#df0ab9';
                break;
                case 4:
                    color='#56dabf';
                break;
            }
            var pieItem={name: item.courseName,value: item.learningTime,color: color,lesson_id: item.courseId};
            pieArr.push(pieItem);
        }
        mainModule.log('make values by period',arr);
        return {lineData:arr,pieData:pieArr};
    },
    encodeHtml:function(str){
        return str.replace("&","&amp")
                  .replace("<","&lt")
                  .replace(" ","&nbsp")
                  .replace(">","&gt")
                  .replace("\"","&quot;")
                  .replace("'","&qpos");

    },
    getChartDataBytime:function(){
        var result={
            pieData:[
                {name: "思维导图",value: 30,color: "#146b8b",lesson_id: 145}
                ,{name: "Unity3D 入门", value: 14, color: "#cc9c59", lesson_id: 148}
                ,{name: "原画设计", value: 8, color: "#b0c6fd", lesson_id: 141}
                ,{name: "金融基础", value: 1, color: "#df0ab9", lesson_id: 80},
                {name: "Zbrush次时代游戏高模制作", value: 1, color: "#56dabf", lesson_id: 139}
            ],
            timeChart:{
                datasets:[{
                    data:[0, 0, 0, 1, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    fillColor: "rgba(220,220,220,0.5)",
                    pointStrokeColor: "rgba(0,0,220,1)",
                    strokeColor: "rgba(0,220,0,1)"
                }],
                labels:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
            }
        };
        console.log(result.timeChart);
        this.renderChartDom(result.timeChart,result.pieData);
    },
    renderChartDom:function(lineChartData, pieData){
        var ctx = $("#myLine").get(0).getContext("2d");
        var ctx1 = $("#myPie").get(0).getContext("2d");

        var myNewChart = new Chart(ctx);
        this.lineObj&&this.lineObj.destroy();
        this.pieObj&&this.pieObj.destroy();
        this.lineObj=myNewChart.Line(lineChartData, {
            responsive : false,
            scaleShowLabels : true,
        });
        this.pieObj=new Chart(ctx1).Pie(pieData, {});
        var dom='';
        for(var i=0,ii=pieData.length;i<ii;i++){
            var item=pieData[i];
             dom+='<li><a target="_blank" href="/view/lesson/lessonintro.html?courseid='+item.lesson_id+'"><span style="border-left:16px solid '+item.color+'" class="learned-kechen">'+item.name+'</span></a><span class="time">'+this.formattime(item.value)+'</span></li>';
        }
        $('#pieDetail').html(dom);
    },
    formattime:function(totalseconds){
        var hours=Math.floor(totalseconds/3600),
            minutes=Math.floor((totalseconds%3600)/60),
            seconds=(totalseconds%3600)%60;
        var time='';
        if(hours>0){
            time+=hours+'小时 ';
        }
        if(minutes>0&&hours<1){
            time+=minutes+'分钟 ';
        }
        if(seconds>0&&minutes<1){
            time+=seconds+'秒';
        }
        // console.log(totalseconds);
        return time||totalseconds;
    },
    formatDate:function(date){
        var date=new Date(date),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            datetime=year+'/'+month+'/'+day;
        return datetime;
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
    getMyNoteCourses:function(){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getMyNoteCourses,
            success:function(result){
                mainModule.log('我的笔记的课程列表',result);
                if(result.status=='SUCCESS'){
                    self.renderNoteCoursesDom(result.content);
                }
            }
        })
    },
    renderNoteCoursesDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i];
            if(i==0){
                dom+='<li class="active" data-courseid="'+item.courseId+'">'+item.courseName+'</li>';
                this.getMyCourseNotes(item.courseId);
            }else{
                dom+='<li class="" data-courseid="'+item.courseId+'">'+item.courseName+'</li>';
            }
        }
        if(result.length>0){
            $('#j_no_biji_wrap').hide();
            $('#j_biji_wrap').show();
        }
        $('#j_kechen_name_wrap').html(dom);
    },
    getMyCourseNotes:function(courseId){
        var self=this;
        $.ajax({
            type:'get',
            data:{courseId:courseId},
            url:mainModule.uri.getMyCourseNotes,
            success:function(result){
                mainModule.log('获取课时下的所有笔记',result);
                if(result.status=='SUCCESS'){
                    self.renderMCNDom(result.content);
                }
            }
        })
    },
    renderMCNDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var itema=result[i];
            dom+='<dl class="clearfix">'+
                    '<dt class="f-l"><span class="number">'+(i+1)+'</span>'+itema.chapterName+'</dt>'+
                    '<dd class="f-l">'+
                        '<ul class="keshi-biji-wrap clearfix">';
            for(var j=0,jlen=itema.noteList.length;j<jlen;j++){
                var item=itema.noteList[j];
                this.noteHashList=this.noteHashList||{};
                this.noteHashList[item.id]=[];
                this.noteHashList[item.id].push(item);
                dom+='<li id="j_biji_'+item.id+'" class="f-l">'+
                            '<div class="biji-header-wrap">'+
                                '<span>'+this.formatDate(item.createDate)+'</span><i data-id="'+item.id+'" class="i-icon i-big"></i><i data-id="'+item.id+'" class="i-icon i-del f-r"></i>'+
                            '</div>'+
                            '<div class="biji-txt-wrap"><p>'+item.content+'</p></div>'+
                            '<div><a target="_blank" href="/view/course/play.html?courseId='+item.courseId+'&chapterId='+item.chapterId+'&notePoint='+item.notePoint+'">'+
                                '<span class="pointtime f-r" >'+
                                    '<i class="i-icon i-triangle-l"></i>'+this.getPointtime(item.notePoint)+'</span>'+
                            '</a></div>'+
                     '</li>';
             }
             dom+='</ul></dd></dl>';
        }
         $('#j_keshi_biji_container').html(dom);
    },
     updateNotes:function(item,content,callback){
        var self=this;
        $.ajax({
            type:'post',
            data:{id:item.id,courseId:item.courseId,chapterId:item.chapterId,content:content},
            url:mainModule.uri.updateNotes,
            success:function(result){
                mainModule.log('笔记修改数据',result);
                self.httpInterceptor(result,callback);
            }
        })
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
    getMyCoursePlan:function(succFunc,failFunc){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getMyCoursePlan,
            success:function(result){
                mainModule.log('我的课程计划',result)
                self.httpInterceptor(result,self.renderMyCoursePlanDom,failFunc)
            }
        })
    },
    renderMyCoursePlanDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i],
                perc=item.finishPercent.substring(0,item.finishPercent.indexOf('.')),
                curClassName=(item.currentChapter&&item.currentChapter.name)||'暂无',
                nextClassName=(item.nextChapter&&item.nextChapter.name)||'暂无',
                curHref='javascript:;',
                nextHref='javascript:;';
            if(item.currentChapter&&item.currentChapter.courseId){
                curHref='/view/course/play.html?courseId='+item.currentChapter.courseId+'&chapterId='+item.currentChapter.id;
            }
            if(item.nextChapter&&item.nextChapter.courseId){
                nextHref='/view/course/play.html?courseId='+item.nextChapter.courseId+'&chapterId='+item.nextChapter.id;
            }
                // currentChapter=currentChapter||'暂无',
                // nextChapter=nextChapter||'暂无';

            dom+='<li class="'+this.getPlanRenderBg(i)+'">'+
            '<div class="clearfix"><i data-id="'+item.courseId+'" class="i-icon i-del-course i-del f-r"></i></div>'+
            '<div class="cf"><a class="kechen-name" href="/view/lesson/lessonintro.html?courseid='+item.courseId+'">'+item.courseName+'</a><span>'+perc+'%</span></div>'+
            '<div class="progress-line"><div class="perc" style="width:'+item.finishPercent+'"></div></div>'+
            '<div class="content-wrap">正在学习：'+
            '<a class="c3a cur-xuexi" href="'+curHref+'" title="'+curClassName+'">'+curClassName+'</a>'+
            '下个课时：<a class="c20 next-kechen" href="'+nextHref+'" title="'+nextClassName+'">'+nextClassName+'</a>'+
            '笔记数：<span class="biji-number">'+item.totalNoteNumber+'</span>'+
            '</div></li>';
            
        }
        if(result.length>0){
            $('#j_no_kechen_wrap').hide();
            $('#j_no_zytp_wrap').hide();
        }else{
            $('#j_no_kechen_wrap').show();
            $('#j_no_zytp_wrap').hide();
        }
        $('#j_course_plan_wrap').html(dom);
    },
    getPlanRenderBg:function(i){
        var bgC;
        switch(i%4){
            case 0:
                bgC='fist-item';
            break;
            case 1:
                bgC='second-item';
            break;
            case 2:
                bgC='three-item';
            break;
            case 3:
                bgC='four-item';
            break;
        }
        return bgC;
    },
    delCoursePlan:function(courseId,succFunc){
        var self=this;
        $.ajax({
            type:'post',
            data:{courseId:courseId},
            url:mainModule.uri.delMyCoursePlan,
            success:function(result){
                mainModule.log('删除该课程计划',result);
                self.httpInterceptor(result,succFunc);
            }
        })
    },
    getMyZytpList:function(){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getMyZytpList,
            success:function(result){
                mainModule.log('我的职业图谱',result);
                self.httpInterceptor(result,self.renderMyZytpListDom);
            }
        });
    },
    renderMyZytpListDom:function(result){
        var dom='';
        for(var i=0,len=result.length;i<len;i++){
            var item=result[i],
                perc=item.speedProgress.substring(0,item.speedProgress.indexOf('.')),
                curClassName=(item.currentCourse&&item.currentCourse.name)||'暂无',
                nextClassName=(item.nextCourse&&item.nextCourse.name)||'暂无',
                curCourseId=item.currentCourse&&item.currentCourse.id,
                nextCourseId=item.nextCourse&&item.nextCourse.id,
                curHref=curCourseId?('/view/lesson/lessonintro.html?courseid='+curCourseId):'javascript:;',
                nextHref=nextCourseId?('/view/lesson/lessonintro.html?courseid='+nextCourseId):'javascript:;';

                // currentChapter=currentChapter||'暂无',
                // nextChapter=nextChapter||'暂无';

            dom+='<li class="'+this.getPlanRenderBg(i)+'">'+
            '<div class="clearfix"><i data-id="'+item.id+'" class="i-icon i-del-plan i-del f-r"></i></div>'+
            '<div class="cf"><a class="kechen-name" href="/view/zytp/detail.html?id='+item.id+'">'+item.name+'</a><span>'+perc+'%</span></div>'+
            '<div class="progress-line"><div class="perc" style="width:'+item.speedProgress+'"></div></div>'+
            '<div class="content-wrap">正在学习：'+
            '<a class="c3a cur-xuexi" target="_blank" href="'+curHref+'" title="'+curClassName+'">'+curClassName+'</a>'+
            // '下个课时：<a class="c20 next-kechen" target="_blank" href="'+nextHref+'" title="'+nextClassName+'">'+nextClassName+'</a>'+
            '</div></li>';
            
        }
        if(result.length>0){
            $('#j_no_zytp_wrap').hide();
            $('#j_no_kechen_wrap').hide();
        }else{
            $('#j_no_kechen_wrap').hide();
            $('#j_no_zytp_wrap').show();
        }
        $('#j_course_plan_wrap').html(dom);
    },
    cancelZytpPlan:function(jobMapId,succFun){
        var self=this;
        $.ajax({
            type:'post',
            data:{jobMapId:jobMapId},
            url:mainModule.uri.cancelZytpPlan,
            success:function(result){
                mainModule.log('取消计划接口数据',result);
                mainModule.httpInterceptor(result,succFun);
            }
        });
    },
    getMyPieData:function(time,callback){
        $.ajax({
            type:'get',
            data:{period:time},
            url:mainModule.uri.getMyPieData,
            success:function(result){
                mainModule.log('我的饼图数据',result);
                mainModule.httpInterceptor(result,callback);
            }
        });
    },
    getMyLineData:function(time,callback){
        $.ajax({
            type:'get',
            data:{period:time},
            url:mainModule.uri.getMyLineData,
            success:function(result){
                mainModule.log('我的线性数据',result);
                mainModule.httpInterceptor(result,callback);
            }
        });
    },
    httpInterceptor:function(result,succFunc,errFunc){
        if(result.status=='SUCCESS'){
            if(result.content){
                succFunc.call(this,result.content.list||result.content.rows||result.content);
            }else{
                succFunc.call(this,result);
            }
        }else{
            errFunc&&errFunc.call(this,result);
        }
    },
    init:function(){
        var self=this;
        this.bindEvents();
        this.getMyNoteCourses();
        this.getMyCoursePlan();
        // this.getChartDataBytime();
        // this.getMyZytpList();
        $('#j_time_select_wrap .active').trigger('click');
    }
};
    xuexiModule.init();