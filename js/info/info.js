mainModule.log('jquery对象',$);
$.fn.localResizeIMG = function(obj) {
    this.on('change', function() {
        var file = this.files[0];
        var URL = window.URL || window.webkitURL;
        var blob = URL.createObjectURL(file);

        // 执行前函数
        if ($.isFunction(obj.before)) {
            obj.before(this, blob, file)
        };

        _create(blob, file);
        this.value = ''; // 清空临时数据
    });

    /**
     * 生成base64
     * @param blob 通过file获得的二进制
     */
    function _create(blob) {
        var img = new Image();
        img.src = blob;

        img.onload = function() {
            var that = this;

            //生成比例
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = w / scale;

            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            $(canvas).attr({
                width: w,
                height: h
            });
            ctx.drawImage(that, 0, 0, w, h);

            /**
             * 生成base64
             * 兼容修复移动设备需要引入mobileBUGFix.js
             */
            var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);

            // 修复IOS
            if (navigator.userAgent.match(/iphone/i)) {
                var mpImg = new MegaPixImage(img);
                mpImg.render(canvas, {
                    maxWidth: w,
                    maxHeight: h,
                    quality: obj.quality || 0.8
                });
                base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
            }

            // 修复android
            if (navigator.userAgent.match(/Android/i)) {
                var encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, w, h), obj.quality * 100 || 80);
            }

            // 生成结果
            var result = {
                base64: base64,
                clearBase64: base64.substr(base64.indexOf(',') + 1),
                ext:base64.substr(0,base64.indexOf(','))
            };

            // 执行后函数
            obj.success(result);
        };
    }
};
var infoModule={
    userInfo:{mobilephone:null,email:null},
    bindEvents:function(){
        var self=this;
        $('#j_xtxx_wrap').on('click','.i-del',function(){
            var $this=$(this),id=$this.data('id');
            self.delXtxx(id,function(){
                $this.closest('li').remove();
            })
        });
        $('.j_info_edit').click(function(){
            $('#j_info_wrap').addClass('active');
        });
        $('#j_btn_update_info').click(function(){
            var year=$('#j_years_select').val(),month=$('#j_months_select').val(),day=$('#j_days_select').val(),
                birthday=year+'-'+month+'-'+day;
            console.log(birthday);
            var info=self.getInputInfo();
            mainModule.log('要提交的用户信息',info);
            self.updateUserInfo(info,function(result){
                console.log(result);
                var mobilephone=$('#j_tel_sp').next().val(),email=$('#j_info_email_sp').next().val();
                (mobilephone!='(可在账户安全页绑定)')&&(info.mobilephone=mobilephone);
                (email!='(可在账户安全页绑定)')&&(info.email=email);
                self.fillInfoDom(info);
                $('#j_info_wrap').removeClass('active');
                $('#j_info_name_error_sp').html('*').removeClass('cr');
                $('#j_info_sex_error_sp').html('*').removeClass('cr');
                if(result.code=='SUCCESS'){
                    mainModule.showGlobalHintBar('已成功获得7天VIP!')
                }
            },function(result){
                mainModule.log('修改个人信息错误',result);
                for(var i=0,len=result.content.length;i<len;i++){
                    var content=result.content[i];
                    switch(content.field){
                        case 'nickname':
                            $('#j_info_name_error_sp').html(content.message).addClass('cr');
                        break;
                        case 'gender':
                            $('#j_info_sex_error_sp').html(content.message).addClass('cr');
                        break;
                    }
                }
            });
        });
        $('#j_feedback_add_btn').click(function(){
            $('#j_jyfk_addimg_wrap').children().first().remove();
            $('#uploadForm').submit();
            var st=setTimeout(function(){
                    // var $j_set_img=$('#j_set_img');
                    // $j_set_img.attr('src',window.frames['ajaxifr'].document.body.innerHTML);
                    // setInfoModule.updateInfo(5,$j_set_img[0]);
                    var result=JSON.parse(window.frames['ajaxifr'].document.body.children[0].innerHTML||{});
                    if(result.status=='SUCCESS'){
                        $('#j_jy_resmsg').removeClass('cr').html(result.message);
                        clearTimeout(st);
                        self.stjy=setTimeout(function(){
                            $('#j_jy_resmsg').empty();
                            clearTimeout(self.stjy);
                        },2000);
                        $('#j_jy_subject').val('');
                        $('#j_jy_detail').val('');
                        $('#j_jyfk_addimg_wrap').find('img').remove();
                    }else{
                        $('#j_jy_resmsg').html(result.message).addClass('cr');
                    }
                    mainModule.log(window.frames['ajaxifr'].document.body.innerHTML);
                },2000);
        });
        // $('#j_upload_feedback_img').localResizeIMG({success:function(result){
        //     mainModule.log('要上传的反馈图片',result);
        //     var $this=$('#j_upload_feedback_img'),$parent=$this.parent();
        //     console.info($this);
        //     $parent.append('<img class="img-jy" src="'+result.base64+'">');
        // }})
    },
    encodeHtml:function(str){
        return str.replace("&","&amp")
                  .replace("<","&lt")
                  .replace(" ","&nbsp")
                  .replace(">","&gt")
                  .replace("\"","&quot;")
                  .replace("'","&qpos");

    },
    vipPeriod:function(){
        var c=document.getElementById("myVipCanvas");
        var ctx=c.getContext("2d");
        ctx.lineWidth = 13;
        ctx.strokeStyle = "#59b3be";
        ctx.beginPath();
        ctx.arc(138,125,110,Math.PI,Math.PI*2);
        ctx.stroke();
        ctx.strokeStyle = "#6cd6e7";
        ctx.beginPath();
        ctx.arc(138,125,97,Math.PI,Math.PI*3/2);
        ctx.stroke();
        ctx.strokeStyle = "#e0e3e2";
        ctx.beginPath();
        ctx.arc(138,125,97,Math.PI*3/2,Math.PI*2);
        ctx.stroke();
        ctx.font = "12px Courier New";
        //设置字体填充颜色
        ctx.fillStyle = "#999";
        //从坐标点(50,50)开始绘制文字
        ctx.fillText("0", 10, 122);
        ctx.fillText("30", 260, 122);
    },
    getUserInfo:function(){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getUserInfo,
            success:function(result){
                mainModule.log('我的个人信息',result);
                if(result.status=='SUCCESS'){
                    self.fillInfoDom(result.content);
                    asModule.judgeIsShowPwdSetWrap(result.content.hasPassword);
                    self.mobilephone=result.content.mobilephone;
                    mainModule.setCookie('photo',result.content.icon||'/img/info/tx.jpg');
                    $('.user-photo').attr('src',result.content.icon||'/img/info/tx.jpg');
                    mainModule.setCookie('nickname',result.content.nickname);
                }else{
                    var st=setInterval(function(){
                        if($('.login_dl').length>0){
                            mainModule.popLoginBox();
                            clearInterval(st);
                        }
                    },1000);
                    mainModule.assertCookieExpired(result);
                }
            }
        })
    },
    filterBD:function(year,month,day){
        var arr=[],i=0,ii=arguments.length,args=arguments,date=new Date();
        while(i<ii){
            var val=args[i];
            if(/－/.test(val)){
                switch(i){
                    case 0:
                        val=date.getFullYear();
                    break;
                    case 1:
                        val=date.getMonth()+1;
                    break;
                    case 2:
                        val=date.getDate();
                    break;
                    default:
                    val='';
                    break;
                }
            }
            arr.push(val);
            i++;
        }
        return arr.join('-');
    },
    formatDate:function(date){
        var date=new Date(date),
            year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),
            datetime=year+'-'+month+'-'+day;
        return datetime;
    },
    getInputInfo:function(){
        var $j_tel_sp=$('#j_tel_sp'),
            $j_info_name_sp=$('#j_info_name_sp'),
            $j_info_sex_sp=$('#j_info_sex_sp'),
            $j_info_bd_sp=$('#j_info_bd_sp'),
            $j_info_st_sp=$('#j_info_st_sp'),
            $j_info_address_sp=$('#j_info_address_sp'),
            $j_info_tel_sp=$('#j_info_tel_sp'),
            $j_info_email_sp=$('#j_info_email_sp'),
            $j_info_intro_sp=$('#j_info_intro_sp');
        var birthday=this.filterBD($('#j_years_select').val(),$('#j_months_select').val(),$('#j_days_select').val());

        var info={
            nickname:$j_info_name_sp.next().val(),
            birthdate:birthday,
            address:$j_info_address_sp.next().find('input').val(),
            introduce:$j_info_intro_sp.next().val(),
            situation:$j_info_st_sp.next().find('select').val(),
            // gender:'M'
        };
        $j_info_sex_sp.next().find('input').each(function(i,el){
            var $this=$(el);
            if($this.prop('checked')){
                info.gender=$this.val();
            }
        });
        return info;
    },
    fillInfoDom:function(item){
        var $j_tel_sp=$('#j_tel_sp'),
            $j_info_name_sp=$('#j_info_name_sp'),
            $j_info_sex_sp=$('#j_info_sex_sp'),
            $j_info_bd_sp=$('#j_info_bd_sp'),
            $j_info_st_sp=$('#j_info_st_sp'),
            $j_info_address_sp=$('#j_info_address_sp'),
            $j_info_tel_sp=$('#j_info_tel_sp'),
            $j_info_email_sp=$('#j_info_email_sp'),
            $j_info_intro_sp=$('#j_info_intro_sp');
        //手机
        $j_tel_sp.html(item.mobilephone||'未填写');
        $j_tel_sp.next().val(item.mobilephone||'( 可在账户安全页绑定 )');
        //姓名
        $j_info_name_sp.html(item.nickname||'未填写');
        $j_info_name_sp.next().val(item.nickname||'');
        //性别
        switch(item.gender){
            case 'F':
                $j_info_sex_sp.html('女');
                $j_info_sex_sp.next().children('.female').prop('checked',true);
            break;
            case 'M':
                $j_info_sex_sp.html('男');
                $j_info_sex_sp.next().children('.male').prop('checked',true);
            break;
            case 'S':
                $j_info_sex_sp.html('保密');
                $j_info_sex_sp.next().children('.other').prop('checked',true);
            break;
            default:
                $j_info_sex_sp.html('未填写');
            break;
        }
        //生日
        if(item.birthdate){
            item.birthdate=this.formatDate(item.birthdate);
            var arr=item.birthdate.split('-');
            for(var i=0,len=arr.length;i<len;i++){
                switch(i){
                    case 0:
                        $('#j_years_select').val(arr[i]);
                    break;
                    case 1:
                        $('#j_months_select').val(arr[i]);
                    break;
                    case 2:
                        $('#j_days_select').val(arr[i]);
                    break;
                }
            }
        }
        $j_info_bd_sp.html(item.birthdate||'未填写');
        //个人状态
        $j_info_st_sp.html(item.situation||'未填写');
        $j_info_st_sp.next().children('select').val(item.situation||'未填写');
        //现居地
        $j_info_address_sp.html(item.address||'未填写');
        $j_info_address_sp.next().children('input').val(item.address||'');
        //邮箱
        $j_info_email_sp.html(item.email||'未填写');
        $j_info_email_sp.next().val(item.email||'( 可在账户安全页绑定 )');
        //个人简介
        $j_info_intro_sp.html(item.introduce||'未填写');
        $j_info_intro_sp.next().val(item.introduce||'');
        this.userInfo=item;
        //初始化账户安全模块的信息
        // console.info($('.j_as_tel'));
        if(infoModule.userInfo.mobilephone){
            $('.j_as_tel').html(infoModule.userInfo.mobilephone);
            $('#j_bind_tel_btn').html('［ 修改 ］');
            $('#j_as_tel_isbind_wrap').html('<i class="i-icon i-bind"></i>已绑定').addClass('cb3');
        }else{
            $('.j_as_tel').html('无');
            $('#j_bind_tel_btn').html('［ 绑定 ］');
            $('#j_as_tel_isbind_wrap').html('<i class="i-icon i-unbind"></i>未绑定');
        }
        if(infoModule.userInfo.email){
            var email=infoModule.userInfo.email;
            var str=email.substring(0,3)+'***'+email.substring(email.indexOf('@'));
            $('.j_as_email').html(str);
            $('#j_bind_email_btn').html('［ 修改 ］');
            $('#j_as_email_isbind_wrap').html('<i class="i-icon i-bind"></i>已绑定').addClass('cb3');
        }else{
            $('.j_as_email').html('无');
            $('#j_bind_email_btn').html('［ 绑定 ］');
            $('#j_as_email_isbind_wrap').html('<i class="i-icon i-unbind"></i>未绑定')
        }
    },
    updateUserInfo:function(info,succFunc,errFunc){
        var self=this;
        $.ajax({
            type:'post',
            data:info,
            url:mainModule.uri.updateUserInfo,
            success:function(result){
                mainModule.httpInterceptor(result,succFunc,errFunc);
            }
        })
    },
    addFeedback:function(){
        $.ajax({
            type:'post',
            url:mainModule.uri.addFeedback,
            success:function(result){
                mainModule
            }
        })
    },
    initYearsSelectDom:function(){
        var dom='',
            year=new Date().getFullYear();
        for(var i=0;i<40;i++){
            dom+='<option>'+(year--)+'</option>';
        }
        $('#j_years_select').append(dom);
    },
    initMonthsDom:function(){
        var dom='',month=12;
        for(var i=0;i<12;i++){
            dom+='<option>'+(month--)+'</option>';
        }
        $('#j_months_select').append(dom);
    },
    initDaysSelectDom:function(){
        var dom='',day=31;
        for(var i=1;i<32;i++){
            dom+='<option>'+(day--)+'</option>';
        }
        $('#j_days_select').append(dom);
    },
    uploadjyFile:function(file){
        var self=this;
        // Get a reference to the fileList
        var files = !!file.files ? file.files : [];
        // If no files were selected, or no FileReader support, return
        if (!files.length || !window.FileReader) return;
            var fileType=files[0].type;
            // Create a new instance of the FileReader
            var reader = new FileReader();

            // Read the local file as a DataURL
            reader.readAsDataURL(files[0]);
            console.info(files[0]);

            // When loaded, set image data as background of div
            reader.onloadend = function(){
                mainModule.log('要上传的反馈图片',this.result);
                var $this=$('#j_upload_feedback_img'),$parent=$this.parent();
                console.info($this);
                $parent.append('<img type="img" name="img" class="img-jy" src="'+this.result+'">');

                self.z=self.z||0;
                self.z++;
                var dom='<input type="file" name="file'+self.z+'" style="z-index:'+self.z+'" accept="image/gif, image/jpeg, image/png, image/bmp" class="z-input-file" onchange="infoModule.uploadjyFile(this)">'
                $('#j_jyfk_addimg_wrap').prepend(dom);

            }
    },
    uploadFile:function(file){
        // Get a reference to the fileList
        var files = !!file.files ? file.files : [];
        // If no files were selected, or no FileReader support, return
        if (!files.length || !window.FileReader) return;
            var fileType=files[0].type;
            // Create a new instance of the FileReader
            var reader = new FileReader();

            // Read the local file as a DataURL
            reader.readAsDataURL(files[0]);
            console.info(files[0]);

            // When loaded, set image data as background of div
            reader.onloadend = function(){
                $(".user-photo").attr("src",this.result);
                console.log(fileType);
                $('#uploadPhotoForm').submit();
                // saveFile(fileType,this.result);
               var si=setInterval(function(){
                    var result=JSON.parse(window.frames['ajaxifr'].document.body.children[0].innerHTML||{});
                    if(result.status=='SUCCESS'){
                        mainModule.setCookie('photo',result.content);
                        clearInterval(si);
                    }
                    mainModule.log('修改头像接口返回信息',window.frames['ajaxifr'].document.body.innerHTML);
                },1000);
            }
    },
    getXtxx:function(){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getXtxx,
            success:function(result){
                mainModule.log('系统消息返回结果',result);
                mainModule.httpInterceptor(result,self.renderXtxxDom);
            }
        })
    },
    renderXtxxDom:function(result){
        var dom='';
        for(var i=0,ii=result.length;i<ii;i++){
            var item=result[i],createDate=$.timeago(item.createDate);
            dom+='<li class="clearfix">'+
                        '<div class="img-wrap f-l"><img src="/img/info/broadcast.png"></div>'+
                        '<div class="f-l r-wrap">'+
                            '<div class="title-wrap">'+item.title+'<span class="time">'+createDate+'</span>';
            if(item.type!=1){
                dom+='<i class="i-icon i-del f-r"></i>';
            }
                            dom+='</div><div class="detail-wrap">'+
                                '<p>'+item.content+'</p>'+
                            '</div>'+
                        '</div>'+
                    '</li>';
        }
        result.length>0?($('#j_noxtxx_wrap').hide()):($('#j_noxtxx_wrap').show());
        $('#j_xtxx_wrap').html(dom);
    },
    delXtxx:function(id,succFunc){
        $.ajax({
            type:'post',
            url:mainModule.uri.delXtxx+id,
            success:function(result){
                mainModule.log('删除系统消息',result);
                mainModule.httpInterceptor(result,succFunc);
            }
        })
    },
    init:function(){
        this.vipPeriod();
        this.getUserInfo();
        this.bindEvents();
        this.initYearsSelectDom();
        this.initMonthsDom();
        this.initDaysSelectDom();
        $('#uploadForm').attr('action',mainModule.uri.addFeedback);
        // mainModule.log(mainModule.uri.updateUserPhoto,$('#uploadPhotoForm'));
        this.getXtxx();
    }
};
infoModule.init();
