 var indexModule={
 	bindEvents:function(){
    var self=this;
 		$('#j_pop_box').on('click','.i-edit',function(){
 			var $j_bj_txt_wrap=$('#j_bj_txt_wrap'),$this=$(this);
 			$j_bj_txt_wrap.addClass('active');
 			$j_bj_txt_wrap.next().show();
      $this.addClass('i-edit-active');
 		});
 		$('#j_pop_box').on('click','.i-close',function(){
 			  self.popClose();
 		});
 		$('#j_pop_box').on('click','.btn-save',function(){
 			var $this=$(this),
 				$parent=$this.parent();
 			$parent.prev().removeClass('active');
 			$parent.hide();
      var curEditBjItem=xuexiModule.curEditBjItem,
          content=$('#j_bj_txt_wrap').find('textarea').val();
      xuexiModule.updateNotes(curEditBjItem,content,function(){
        $('#j_biji_'+curEditBjItem.id).find('p').html(content);
        self.popClose();
        curEditBjItem.content=content;
        $('#j_pop_box .i-edit-active').removeClass('i-edit-active');
      })
 		});
   	$('#j_menu_wrap').on('click','li',function(e){
   		var $this=$(this),
   			id=$this.data('id'),$wrap=$(id);
   		$this.siblings().removeClass('active');
   		$wrap.siblings().hide();
   		$wrap.show();
   		$this.addClass('active');
      document.title=$this.data('title')+'_极视教育网';
      // store.set('curMenuItem',id);
      if($wrap.data('include')){
        self.includeHtmlByType($wrap);
      }
   	});
   	$(function(){
      var type=mainModule.getQueryValueByName('type');
      if(type){
        $('#j_menu_wrap li').each(function(i,el){
           $this=$(el);
           if($this.data('type')==type){
              return false;
           }
        });
        self.initMenuDomState($this,$this.data('id'));
        document.title=$this.data('title')+'_极视教育网';
      }else{
     		$('#j_xuexi_container').show();
     		$('#j_info_container').hide();
        $('#j_account_safe_container').hide();
      }
   	})
 	},
  includeHtmlByType:function($wrap){
    var arr=[$wrap.data('include')],$info_wrap=$('#j_info_container'),$as_wrap=$('#j_account_safe_container');
    //账户安全跟个人信息要绑定加载，这两个模块没有解耦合
    if(/safe|info/.test($wrap.attr('id'))){
      arr=[$info_wrap.data('include'),$as_wrap.data('include')];
    }
    var len=arr.length;
    while(len--){
      var url=arr[len];
      $.ajax({
        type:'get',
        async:false,
        url:url,
        success:function(dom){
          if(len>0){
            $as_wrap.html(dom).removeAttr('data-include').data('include','');
            $wrap=$info_wrap;
            return;
          }
          $wrap.html(dom).removeAttr('data-include').data('include','');
        }
      })
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
  getRightList:function(){
    var self=this;
    $.ajax({
      type:'get',
      url:mainModule.uri.rightList,
      success:function(result){
        mainModule.log('vip所有权益接口返回',result);
        if(result.status=='SUCCESS'){
          var dom='<li class="f-l"><i class="i-icon i-blue-tick"></i>免费课程</li><li class="f-l"><i class="i-icon i-blue-tick"></i>申请职位</li>',
          ii=result.content&&result.content.length;
          self.rightListHashArr=self.rightListHashArr||{};
          for(var i=0;i<ii;i++){
            var item=result.content[i];
            self.rightListHashArr[item.id]=true;
            dom+='<li id="j_user_scope_'+item.id+'" style="color:#999;" class="f-l"><i style="visibility:hidden;" class="i-icon i-blue-tick"></i>'+item.name+'</li>';
          }
          if(!ii){
            dom+='<li style="width:100%;text-align:center;" class="f-l">暂无用户权益</li>';
          }
          $('.j_userscope_list').html(dom);
        }
        self.getUserInfo();
      }
    })
  },
  getUserInfo:function(){
          var self=this;
          $.ajax({
              type:'get',
              url:mainModule.uri.getUserInfo,
              success:function(result){
                  mainModule.log('我的个人信息',result);
                  if(result.status=='SUCCESS'){
                      var content=result.content;
                      // mainModule.setCookie('photo',result.content.icon||'/img/info/tx.jpg');
                      // $('.user-photo').attr('src',content.icon||'/img/info/tx.jpg');
                      // mainModule.setCookie('nickname',result.content.nickname);
                      if(content.vip){
                        var expireDate=mainModule.remainDays(content.vipEndDate);
                        $('.j_expire_date').html(expireDate+'天');
                        if(expireDate>30*5){
                          $('#j_vip_crown').toggleClass('i-year-crown i-month-crown');
                        }
                        $('.j_novip_show').hide();
                        $('.j_vip_show').show();
                        var dom='',ii=content.rightList&&content.rightList.length;
                        for(var i=0;i<ii;i++){
                          var item=content.rightList[i];
                          if(self.rightListHashArr[item.id]){
                            // dom+='<li class="f-l"><i class="i-icon i-blue-tick"></i>'+item.name+'</li>';
                            $('#j_user_scope_'+item.id).removeAttr('style').find('i').removeAttr('style');
                          }
                        }
                        // $('#j_info_vip_wrap').find('.j_userscope_list').html(dom);
                      }else{
                        $('.j_vip_show').hide();
                        $('.j_novip_show').show();
                      }
                      mainModule.initUserState(content);
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
  initMenuDomState:function($this,id){
      $this.siblings().removeClass('active');
      var $wrap=$(id);
      $wrap.siblings().hide();
      $wrap.show();
      $this.addClass('active');
      if($wrap.data('include')){
        this.includeHtmlByType($wrap);
      }
  },
  popClose:function(){
    $('#j_pop_box').hide();
    $('#j_pop_box').prev().hide();
  },
 	init:function(){
 		this.bindEvents();
    this.getRightList();
    $('#uploadPhotoForm').attr('action',mainModule.uri.updateUserPhoto);
 	}
 };
 indexModule.init();