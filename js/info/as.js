var asModule={
    bindType:0,
    bindEvents:function(){
        var self=this;
        $('.j_refresh_imgcode').click(function(){
            mainModule.initVeriCodeImg();
        });
        $('#j_as_updatepwd_btn').click(function(){
            var $j_as_oldpwd=$('#j_as_oldpwd'),
                $j_as_newpwd=$('#j_as_newpwd'),
                $j_as_confirm_newpwd=$('#j_as_confirm_newpwd'),
                pwd=$j_as_oldpwd.val(),
                newPwd=$j_as_newpwd.val(),
                confirmNewPwd=$j_as_confirm_newpwd.val();
            console.log(pwd);
            if(!self.testPwd()){
                return;
            }
            self.updatePwd(pwd,newPwd,confirmNewPwd,function(result){
                $('#j_as_updatepwd_err').html(result.message).addClass('c4c');
                $j_as_oldpwd.val('');
                $j_as_newpwd.val('');
                $j_as_confirm_newpwd.val('');
                self.asst=setTimeout(function(){
                    $('#j_as_updatepwd_err').fadeOut().empty().removeClass('c4c');
                    clearTimeout(self.asst);
                },2000);
            },function(result){
                $('#j_as_updatepwd_err').html(result.content[0].message);
            });
        });
        $('#j_bind_tel_btn').click(function(){
            $('#j_as_update_type_txt').html('输入手机号');
            self.switchUpdateDomState();
            self.bindType=0;
        });
        $('#j_bind_email_btn').click(function(){
            $('#j_as_update_type_txt').html('输入邮箱号');
            self.switchUpdateDomState();
            self.bindType=1;
        });
        $('#j_as_btn_next_one').click(function(){
            self.confirmPwd(function(result){
                console.log(result);
                if(typeof result=='object'&&!result.content){
                    $('#j_as_confirmpwd_err').html('密码不正确');
                    return;
                }
                $('#j_as_confirmpwd_err').empty();
                $('#j_as_first_step').hide();
                $('#j_as_two_step').show();
                $('#j_as_three_step').hide();
                $('#j_as_progress').attr('src','/img/info/002.png');
                if(self.bindType===0){
                    // 修改手机或绑定手机
                    $('#j_as_account_input').attr('placeholder','请输入您的手机号');
                    $('#j_as_vericode_input').attr('placeholder','请输入手机验证码');
                }else{
                    $('#j_as_account_input').attr('placeholder','请输入您的邮箱号');
                    $('#j_as_vericode_input').attr('placeholder','请输入邮箱验证码');
                }
            },function(result){
                $('#j_as_confirmpwd_err').html(result.message);
            });
        });
        $('#j_as_btn_next_two').click(function(){
            var account=$('#j_as_account_input').val(),
                vericode=$('#j_as_vericode_input').val();
            self.updateAccount=account;
            if(self.bindType===0){
                if(!self.testTel()){
                    return;
                }
                self.updateTel(account,vericode,function(){
                    self.ThreeStepInitAfterUpdateSucc();
                    $('.j_account').html(account);
                    if(!infoModule.userInfo.mobilephone){
                        $('.j_response_msg').html('手机绑定完成');
                        return;
                    }
                    $('.j_response_msg').html('手机修改完成');
                    
                },function(result){
                    $('#j_as_two_error_p').html(result.message);
                })
            }else{
                if(!self.testEmail()){
                    return;
                }
                self.updateEmail(account,vericode,function(){
                    self.ThreeStepInitAfterUpdateSucc();
                    $('.j_account').html(account);
                    if(!infoModule.userInfo.email){
                        $('.j_response_msg').html('邮箱绑定完成');
                        return;
                    }
                    $('.j_response_msg').html('邮箱修改完成');
                    
                },function(result){
                     $('#j_as_two_error_p').html(result.message);
                })
            }
        });
        $('#j_as_get_vericode_btn').click(function(){
            if(self.bindType==0){
                if(!self.testTel()||!self.testImgCode()){
                    return;
                }
                asModule.sendTelCode(function(){
                    self.timing();
                    $('#j_as_two_error_p').html('手机验证码已发送至您的新手机号');
               },function(result){
                    $('#j_as_two_error_p').html(result.content[0].message);
               });
            }else{
                if(!self.testEmail()||!self.testImgCode()){
                    return;
                }
               asModule.sendEmailCode(function(){
                    self.timing();
                    $('#j_as_two_error_p').html('邮箱验证码已发送至您的新邮箱');
               },function(result){
                    $('#j_as_two_error_p').html(result.content[0].message);
               });
            }
        });
        $('#j_as_three_confirm_btn').click(function(){
            self.initUpdateDomState();
            self.switchUpdateDomState();
            var updateAccount=self.updateAccount;
            if(!self.bindType==0){
                var email=updateAccount;
                var str=email.substring(0,3)+'***'+email.substring(email.indexOf('@'));
                $('.j_as_email').html(str);
                $('#j_bind_email_btn').html('［ 修改 ］');
                $('#j_as_email_isbind_wrap').html('<i class="i-icon i-bind"></i>已绑定').addClass('cb3');
            }else{
                $('.j_as_tel').html(updateAccount);
                $('#j_bind_tel_btn').html('［ 修改 ］');
                $('#j_as_tel_isbind_wrap').html('<i class="i-icon i-bind"></i>已绑定').addClass('cb3');
            }
            // var email=$('#j_as_account_input').val();
            // var str=email.substring(0,3)+'***'+email.substring(email.indexOf('@'));
            // $('.j_as_email').html(str);
        })
    },
    ThreeStepInitAfterUpdateSucc:function(){
        $('#j_as_first_step').hide();
        $('#j_as_two_step').hide();
        $('#j_as_three_step').show();
        $('#j_as_progress').attr('src','/img/info/003.png');
    },
    confirmPwd:function(succFunc,failFunc){
        $.ajax({
            type:'get',
            data:{password:$('#j_as_confirmpwd').val()},
            url:mainModule.uri.confirmPwd,
            success:function(result){
                mainModule.log('确认密码',result);
                mainModule.httpInterceptor(result,succFunc,failFunc);
            }
        })
    },
    sendEmailCode:function(succFunc,failFunc){
        var captcha=$('#j_as_imgvericode_input').val();
        $.ajax({
            type:'get',
            data:{email:$('#j_as_account_input').val(),captcha:captcha},
            url:mainModule.uri.sendEmailCode,
            success:function(result){
                mainModule.log('发送email验证码结果',result);
                mainModule.httpInterceptor(result,succFunc,failFunc);
            }
        })
    },
    sendTelCode:function(succFunc,failFunc){
        var captcha=$('#j_as_imgvericode_input').val();
        $.ajax({
            type:'get',
            data:{mobilephone:$('#j_as_account_input').val(),"business":3,"captcha":captcha},
            url:mainModule.uri.sendTelCodeIncludeVeri,
            success:function(result){
                mainModule.log('发送Tel验证码结果',result);
                console.log(result);
                mainModule.httpInterceptor(result,succFunc,failFunc);
            }
        })
    },
    updateTel:function(tel,vericode,succFunc,failFunc){
        $.ajax({
            type:'post',
            data:{mobilephone:tel,smsCaptcha:vericode},
            url:mainModule.uri.updateTel,
            success:function(result){
                mainModule.log('修改手机号码',result);
                mainModule.httpInterceptor(result,succFunc,failFunc);
            }
        })
    },
    updateEmail:function(email,vericode,succFunc,failFunc){
        $.ajax({
            type:'post',
            data:{email:email,emailCaptcha:vericode},
            url:mainModule.uri.updateEmail,
            success:function(result){
                mainModule.log('修改email',result);
                mainModule.httpInterceptor(result,succFunc,failFunc);
            }
        })
    },
    updatePwd:function(password,newPassword,confirmPassword,succFunc,failFunc){
        var self=this;
        $.ajax({
            type:'post',
            data:{password:password,newPassword:newPassword,confirmPassword:confirmPassword},
            url:mainModule.uri.updatePwd,
            success:function(result){
                mainModule.log('修改密码接口',result)
                mainModule.httpInterceptor(result,succFunc,failFunc);
            }
        })
    },
    switchUpdateDomState:function(){
         $('#j_content_wrap').toggle();
         $('#j_tel_update_wrap').toggle();
    },
    initUpdateDomState:function(){
        $('#j_as_progress').attr('src','/img/info/001.png');
        $('#j_as_first_step').show();
        $('#j_as_two_step').hide();
        $('#j_as_three_step').hide();
    },
    count:60,
    timing:function(){
        var self=this;
        var count=--self.count;
        $('#j_as_get_vericode_btn').prop('disabled',true).val(count+"秒后重发");
        $('#j_as_get_vericode_btn').css('background','#E0E0E0');
        if(count>1){
            var st=setTimeout(function(){
                self.timing();
            },1000);
        }else
        {
            count=60;
            $('#j_as_get_vericode_btn').prop('disabled',false).val("获取验证码");
            $('#j_as_get_vericode_btn').css('background','#ff9015');
        }
    },
    passportReg:{
        pwd: /^.*[A-Za-z0-9_\.-]+.*$/,
        email: /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/,
        phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/,
    },
    testEmail:function(){
        var email=$('#j_as_account_input').val();
        if(email.trim()==''){
            $('#j_as_two_error_p').html('请填写邮箱号码');
            return false;
        }
        if(!this.passportReg.email.test(email)){
            $('#j_as_two_error_p').html('邮箱号码格式不正确');
            return false;
        }else{
            $('#j_as_two_error_p').empty();
            return true;
        }
    },
    testTel:function(){
        var tel=$('#j_as_account_input').val();
        if(tel.trim()==''){
            $('#j_as_two_error_p').html('请填写手机号码');
            return false;
        }
        if(!this.passportReg.phone.test(tel)){
            $('#j_as_two_error_p').html('手机号码格式不正确');
            return false;
        }else{
            $('#j_as_two_error_p').empty();
            return true;
        }
    },
    testImgCode:function(){
        var imgCode=$('#j_as_imgvericode_input').val();
        if(imgCode==''){
            $('#j_as_two_error_p').html('请输入验证码');
            return false;
        }
        if(imgCode.length>4){
            $('#j_as_two_error_p').html('验证码错误');
            return false;
        }
        $('#j_as_two_error_p').html('');
        return true;
    },
    testPwd:function(){
        var oldPwd=$('#j_as_oldpwd').val(),newPwd=$('#j_as_newpwd').val(),
            isEmpty=oldPwd=='',
            isEqual=newPwd==$('#j_as_confirm_newpwd').val();
        if(isEmpty){
            $('#j_as_updatepwd_err').html('密码不能为空');
            return false
        }
        if(!isEqual){
            $('#j_as_updatepwd_err').html('两个密码不一致');
            return false;
        }
        if(oldPwd==newPwd){
            $('#j_as_updatepwd_err').html('新旧密码不能一致');
            return false;
        }
        $('#j_as_updatepwd_err').empty();
        return true;
    },
    getUserBindTypes:function(){
        var mm=this.mm,self=this;
        $.ajax({
            type:'get',
            url:mm.uri.queryUserBindTypes,
            success:function(result){
                mm.log('获取用户绑定的第三方类型',result);
                mm.httpInterceptor(result,self.renderUserBindTypesDom);
            }
        })
    },
    renderUserBindTypesDom:function(result){
        var self=asModule;
        for(var i=0,ii=result.length;i<ii;i++){
            var item=result[i],typeStr=item.source;
            switch(item.source){
                case 'QQ':
                self.switchThBindingByBtn($('.j_as_qq'),typeStr);
                break;
                case 'WEIXIN':
                typeStr='微信';
                 self.switchThBindingByBtn($('.j_as_wx'),typeStr);
                break;
                case 'SINA':
                typeStr='新浪';
                 self.switchThBindingByBtn($('.j_as_sina'),typeStr);
                break;
            }
        }
    },
    switchThBindingByBtn:function($bind_btn,typeStr){
        var $p=$bind_btn.parent().prev(),msg,$img_wrap=$p.prev();
        $bind_btn.removeClass('btn-bind').addClass('btn-unbind');
        msg='已绑定'+(typeStr||this.asBindTypeName)+'账号';
        $p.removeClass('unbind').html(msg);
        $img_wrap.addClass('active-img-wrap');
        $bind_btn.val('立即解绑');
    },
    switchThUnBindingByBtn:function($bind_btn){
        var $p=$bind_btn.parent().prev(),$img_wrap=$p.prev();
        $bind_btn.toggleClass('btn-bind btn-unbind').html('立刻绑定');
        $p.addClass('unbind').html('未绑定');
        $img_wrap.removeClass('active-img-wrap');
    },
    judgeIsShowPwdSetWrap:function(hasPwd){
        hasPwd?($('#j_as_updatepwd_wrap').show()):($('#j_as_setpwd_wrap').show());
    },
    init:function(){
        this.mm=mainModule;
        this.bindEvents();
        this.getUserBindTypes();
        this.mm.initVeriCodeImg();
        console.log('asModule init');
    }
}
asModule.init();