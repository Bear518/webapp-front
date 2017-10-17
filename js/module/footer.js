    $(function(){
        //判断是否登陆来显示头像还是登陆注册
        // mainModule.judgeIslogined();
        // showname();
        // var photo=mainModule.getCookie('photo');
        // $('.j_user_photo').attr('src',photo||'/img/info/tx.jpg');
        var time=0,scrollY,href=window.location.href,isAtReusmePage=/wdjl\/edit/g.test(href);
        console.log('当前停留的scrolly'+window.scrollY);
        $(window).scroll(function(e){
            time++;
            if(time%2==0){
                 var $el=$('#goTop');
                if(this.scrollY>998/*&&scrollY>this.scrollY*/){
                    $el.fadeIn();
                }else{
                    $el.fadeOut();
                }
                if(isAtReusmePage){
                    if(this.scrollY>600){
                        $('#j_left_wrap')[0]&&$('#j_left_wrap').find('.left-wrap').css({'top':20,'height':500,'position':'fixed'});
                    }else{
                        $('#j_left_wrap')[0]&&$('#j_left_wrap').find('.left-wrap').css({'top':161,'height':'auto','position':'static'});
                    }
                    if(document.body.scrollHeight-this.scrollY<1100){
                        $('#j_left_wrap').find('.left-wrap').css('position','static');
                    }
                    // console.log(this.scrollY);
                    // console.log('scrollHeight的高度:'+document.body.scrollHeight+'scrollTop:'+document.body.scrollTop);

                }
                // console.log('scroll'+this.scrollY);
            }
            scrollY=this.scrollY;
            // $('body').css({position:'fixed',width:'100%'});
        });
    })
    function goxuexipage(){
        if(mainModule.getCookie('islogin')){
            window.location.href='/view/info/mycourse.html';
        }else{
            mainModule.isgoxuexipage=true;
            $('.login').trigger('click');
        }
    }
    var thobj=null;
    function showThBox_version1(imgsrc,name,type){
        $('.cls').trigger('click');
        var $popbox=$('#j_thlogin_popbox');
        $popbox.find('.name').html(name);
        $popbox.find('.photo').attr('src',imgsrc);
        $popbox.find('.type').html(type);
        $('#j_thlogin_popbox').show();
        $('#j_thlogin_popbg').show();
        mainModule.A&&mainModule.A.close();
        thobj={
            type:type,
            imgsrc:imgsrc,
            name:name
        }
    }
    var $j_thlogin_popbg=$('#j_thlogin_popbg'),
        $j_complete_accountbind_popbox=$('#j_complete_accountbind_popbox'),
        $j_thbind_popbox=$('#j_thbind_popbox'),
        refreshImgCode=function(){
            $('.yzm_img').attr('src',mainModule.uri.getVeriCodeImg+'?'+Math.random());
        };
    function showThBox(imgsrc,name,type){
        $('.cls').trigger('click');
        var $popbox=$j_complete_accountbind_popbox;
        $popbox.find('.photo').attr('src',imgsrc);
        $j_thbind_popbox.find('.photo').attr('src',imgsrc);
        $popbox.show();
        $j_thlogin_popbg.show();
        mainModule.A&&mainModule.A.close();
        thobj={
            type:type,
            imgsrc:imgsrc,
            name:name
        };
        refreshImgCode();
    }

    function setThImg(){
        var imgsrc=mainModule.getCookie('photo');
        $j_complete_accountbind_popbox.find('.photo').attr('src',imgsrc);
        $j_thbind_popbox.find('.photo').attr('src',imgsrc);
    }

    var completeAccountBind=function(){

        var $container=$('#j_complete_accountbind_popbox'),
            $account_input=$container.find('.input-account'),
            $err_ac=$j_complete_accountbind_popbox.find('.error-ac'),
            $img_vericode_input=$container.find('.input-img-vericode'),
            $vericode_input=$container.find('.input-vericode'),
            $pwd_input=$container.find('.input-pwd'),
            $ck_agreement=$container.find('.ck_agreement'),
            $btn_get_vericode=$container.find('.j_get_vericode');
        var total=60;
        var timing=function($btn){

            var self=this;
            var count=--total;
            $btn.prop('disabled',true).val(count+"秒后重发");
            $btn.css('background','#E0E0E0');
            if(count>1){
                var st=setTimeout(function(){
                    timing($btn);
                },1000);
            }else
            {
                total=60;
                $btn.prop('disabled',false).val("获取验证码");
                $btn.css('background','#ff9015');
            }
        };
        
        var dealtWithErr=function(result){
            var $err_ac=$j_complete_accountbind_popbox.find('.error-ac').hide(),
                $err_vericode=$j_complete_accountbind_popbox.find('.error-vericode').hide(),
                $err_pwd=$j_complete_accountbind_popbox.find('.error-pwd').hide(),
                $err_imgcode=$j_complete_accountbind_popbox.find('.error-imgcode').hide();

            for(var i=0,ii=result.length;i<ii;i++){
                var item=result[i];
                switch(item.field){
                    case 'mobilephone':
                        $err_ac.html(item.message).show();
                    break;
                    case 'email':
                        $err_ac.html(item.message).show();
                    break;
                    case 'captcha':
                        $err_imgcode.html(item.message).show();
                    break;
                    case 'password':
                        $err_pwd.html(item.message).show();
                    break;
                    case 'smsCaptcha':
                        $err_vericode.html(item.message).show();
                    break;
                    case 'emailCaptcha':
                        $err_vericode.html(item.message).show();
                    break;
                }
            }
        };
        $j_complete_accountbind_popbox.on('click','.j_get_vericode',function(){
            var account=$account_input.val(),
                imgCode=$img_vericode_input.val(),
                requestUri=mainModule.uri.sendTelCodeIncludeVeri,
                requestData={mobilephone:account,captcha:imgCode};
            // timing($btn_get_vericode);
            if(/@/.test(account)){
                requestUri=mainModule.uri.sendEmailCode;
                requestData={email:account,captcha:imgCode};
            }
            $.ajax({
                type:'get',
                data:requestData,
                url:requestUri,
                success:function(result){
                    mainModule.httpInterceptor(result,function(result){
                        timing($btn_get_vericode);
                    },function(result){
                        mainModule.log('完善账号信息发送验证码出错',result);
                        dealtWithErr(result.content);
                        refreshImgCode();
                    });
                    // refreshImgCode();
                }
            });
        });
        $j_complete_accountbind_popbox.on('click','.but-finish-bind',function(){
            var $this=$(this);
            $this.val('请求中...').attr('disabled',true);
            var account=$account_input.val(),
                vericode=$vericode_input.val(),
                password=$pwd_input.val();
            var data={
                mobilephone:account,
                smsCaptcha:vericode,
                password:password,
                confirmPassword:password
            };
            if(/@/.test(account)){
                data={
                    email:account,
                    captcha:vericode,
                    password:password,
                    confirmPassword:password
                };
            }
            if(!$ck_agreement.prop('checked')){
                return;
            }
            mainModule.log('要完善的账号信息',data);
            // return;
            $.ajax({
                type:'post',
                url:mainModule.uri.completeAccountInfo,
                data:data,
                success:function(result){
                    $this.val('完成').attr('disabled',false);
                    mainModule.httpInterceptor(result,function(){
                         mainModule.initUserState({mobilephone:account,nickname:thobj.name,icon:thobj.imgsrc,email:account});
                         reloadPage();
                        $container.hide();
                        $j_thlogin_popbg.fadeOut();
                    },function(result){
                        mainModule.log('完善的账号信息接口错误信息返回：',result);
                        if(result.content){
                            dealtWithErr(result.content);
                            return;
                        }
                        var $err_ac=$j_complete_accountbind_popbox.find('.error-ac').hide();
                        $err_ac.html(item.message).show();
                    })
                }
            })
        });
        $j_complete_accountbind_popbox.on('click','.close',function(){
            $j_complete_accountbind_popbox.hide();
            $j_thlogin_popbg.hide();
        });
        $j_complete_accountbind_popbox.on('click','.used',function(){
            $j_complete_accountbind_popbox.hide();
            $j_thbind_popbox.show();
        });
        $j_thbind_popbox.on('click','.nouse',function(){
            $j_complete_accountbind_popbox.show();
            $j_thbind_popbox.hide();
        });
        $j_complete_accountbind_popbox.on('click','.ck_agreement',function(){
            var $this=$(this),checked=$this.prop('checked');
            if(checked){
                $this.prop('checked',true);
                $this.next().css('color','#62aeb8');
            }else{
                $this.prop('checked',false);
                $this.next().css('color','red');
            }
        });
        $j_complete_accountbind_popbox.on('focus','input',function(){
            var $this=$(this);
            mainModule.inputFocusHide($this,1);
        });
        $j_complete_accountbind_popbox.on('blur','.input-account',function(){
            var account=$account_input.val(),type=0;
            if(/@/.test(account)){
                type=1;
            }
            if(!mainModule.checkAccount(account,type)){
                $err_ac.html('该账号已注册').show();
            }
        });
        // $j_complete_accountbind_popbox.on('click','.select-tab-wrap li',function(){
        //     console.log($(this));
        //     var $this=$(this),index=$this.index();
        //     if(index==1){
        //         $j_complete_accountbind_popbox.hide();
        //         $j_thbind_popbox.show();
        //         return;
        //     }
        // });
        console.log('completeAccountBind');
    };
    // refreshImgCode();
    completeAccountBind();
    var reloadPage=function(){
        if(/lessonintro/.test(window.location.href)){
            window.location.reload();
        }
    };
    function directLogin(imgsrc,name,type){
        mainModule.initUserState({mobilephone:'',nickname:name,icon:imgsrc});
        $('.cls').trigger('click');
        mainModule.A&&mainModule.A.close();
        reloadPage();
    }
    function showThErrBox(type,reason){
        $('.cls').trigger('click');
        var $popbox=$('#j_thlogin_err_popbox');
        $popbox.find('.type').html(type);
        $popbox.find('.reason').html(reason);
        $popbox.fadeIn();
        $('#j_thlogin_popbg').fadeIn();
        mainModule.A&&mainModule.A.close();
    }
    $('#j_slider_qrcode').hover(function(){
        var $this=$(this);
        $this.next().fadeIn();
    },function(){
         var $this=$(this);
        $this.next().fadeOut();
    });
    $('#j_thlogin_popbox').on('click','.bd',function(){
        $('#j_thlogin_popbox').hide();
        var $j_thbind_popbox=$('#j_thbind_popbox');
        $j_thbind_popbox.show();
        $j_thbind_popbox.find('.photo').attr('src',thobj.imgsrc);
    });
    // $('#j_thlogin_popbox')
    $('#j_complete_accountbind_popbox').on('click','.now-login',function(){
        var $this=$(this),type=$this.data('type');
        // 通过课程详情页面的完善按钮进来的
        if(type==1){
            $j_complete_accountbind_popbox.hide();
            $j_thlogin_popbg.hide();
        }
        $.ajax({
            type:'get',
            url:mainModule.uri.loginNow,
            success:function(result){
                mainModule.log('现在登陆返回数据',result);
                mainModule.httpInterceptor(result,function(){
                    mainModule.initUserState({mobilephone:'',nickname:thobj.name,icon:thobj.imgsrc});
                    // $('#j_thbind_popbox').find('.close').trigger('click');
                    $j_complete_accountbind_popbox.fadeOut();
                    $('#j_thlogin_popbg').fadeOut();
                    reloadPage();
                })
            }
        });
    });
    $('#j_thbind_popbox').on('click','.close',function(){
        $('#j_thbind_popbox').fadeOut();
        $('#j_thlogin_popbg').fadeOut();
        reloadPage();
    });
    $('#j_thbind_popbox').on('click','.but-finish-bind',function(){
        var $j_popbox=$('#j_thbind_popbox'),
            $ac_input=$j_popbox.find('.input-account'),
            $pwd_input=$j_popbox.find('.input-pwd'),
            $ac_err_sp=$ac_input.next(),
            $pwd_err_sp=$pwd_input.next(),
            name=$ac_input.val(),
            pwd=$pwd_input.val(),
            mm=mainModule;
        if((mm.testEmail(name,$ac_err_sp)||mm.testTel(name,$ac_err_sp))&&mm.testPwd(pwd,$pwd_err_sp)){
            $.ajax({
                type:'post',
                data:{userName:name,password:pwd},
                url:mm.uri.bindAccount,
                success:function(result){
                    mm.log('绑定账号接口返回数据',result);
                    mm.httpInterceptor(result,function(){
                        $('#j_thbind_popbox').find('.close').trigger('click');
                        mm.initUserState({mobilephone:'',nickname:thobj.name,icon:thobj.imgsrc});
                    },function(result){
                        $ac_err_sp.html(result.message);
                    });
                }
            })
        }

    });
    $('#j_thlogin_err_popbox').on('click','.btn-goback-login',function(){
        $('#j_thlogin_err_popbox').fadeOut();
        $('#j_thlogin_popbg').fadeOut();
        $('.login').trigger('click');
    });

    console.log('footer js loaded');