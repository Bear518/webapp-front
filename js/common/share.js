var shareModule={
	bindEvents:function(){
		var self=this;
        $('.share-wrap').on('mouseenter mouseout','.wx-item',function(e){
            if(e.type=='mouseenter'){
                $('#wemcn').show();
                // self.shareFreeVip();
            }
        });
		$('.share-wrap').on('click','.wxdj',function(e){
           
                $('#wemcn').show();
             
        });
		
        $('#ewmkg').click(function(){
            $('#wemcn').hide();
        });
       $('.share-wrap').on('click','.share-item',function(){
            var $this=$(this),type=$this.data('type'),basicHref,shareObj=self.shareObj,_hmt=_hmt;
             _hmt&&_hmt.push(['_trackEvent', shareObj.activityCode, 'click', type]);
            switch(type){
                case 'sina':
                    basicHref='http://service.weibo.com/share/share.php';
                break;
                case 'qq':
                	basicHref='http://connect.qq.com/widget/shareqq/index.html';
                break;
                case 'qqzone':
                    basicHref='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
                break;
                case 'wx':
                    return;
                break;
            }
            var share=function(basicHref){
                var nickname=self.getNickName();
                var title=shareObj.title;

                var shareUrl,href=window.location.href;
                if(/127|8000|8001|dev|192/.test(href)){
                    shareUrl='http://www.skillbridge.cn';
                }else{
                    shareUrl=shareObj.url;
                }
                if(type=='qqzone'){
                    shareUrl=shareUrl.replace('http://','');
                }
                // http://www.skillbridge.cn/img/icon/freevip.jpg 
                // shareUrl=mainModule.shareUriAddSearch(shareObj);
                console.log(shareObj);
                var desc=shareObj&&shareObj.desc;
                if(type=='sina'&&shareObj){
                    title=desc;
                    desc=title;
                }
                // title+=shareUrl;
                var l= {
                    url:shareUrl,
                    showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
                    desc:desc,/*默认分享理由(可选)*/
                    summary:'极视教育网',/*分享摘要(可选)*/
                    title:title,/*分享标题(可选)*/
                    site:'极视教育网',/*分享来源 如：腾讯网(可选)*/
                    pics:shareObj.pic, /*分享图片的路径(可选)*/
                    pic:shareObj.pic,
                    style:'203',
                    width:98,
                    height:22
                };
                var a=[];
                for(var b in l)
                a.push(b+"="+encodeURIComponent(l[b]));
                window.open(basicHref+"?"+a.join("&"),"_blank");
            };
            share(basicHref);
           // window.open('http://service.weibo.com/share/share.php','_blank');
        });
	},
	shareParamsInit:function(obj){
		// @param{title,url,desc}
		this.shareObj=obj;
	},
    getNickName:function(){
        var nickname=mainModule.getCookie('nickname'),
            tel=mainModule.getCookie('username')||'',
            email=mainModule.getCookie('email')||'';
        return nickname||(tel.substr(0,3)+'***'+tel.substr(6))||(email.substr(0,3)+'***'+email.substr(6))||'***';
    },
    generateQRCode:function(link){
        var link=link;
        link=link.replace('terminate_type=PC','terminate_type=MOBILE');
        // $.ajax({
        //     type:'post',
        //     data:{link:link},
        //     url:mainModule.uri.generateQRCode,
        //     success:function(result){
        //         console.log(result);
        //          $('#ewmimg').attr('src',result);
        //     }
        // })
        var src=mainModule.uri.generateQRCode+'?link='+encodeURIComponent(link);
        $('#ewmimg').attr('src',src);
    },
    getUserId:function(code,callback){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getUserId,
            data:{code:code},
            success:function(result){
                mainModule.log('生成分享链接接口返回',result)
                self.httpInterceptor(result,function(result){
                    console.log(result);
                    callback&&callback(result);
                })
            }
        })
    },
    getInvitedUserList:function(code){
        var self=this;
        $.ajax({
            type:'get',
            url:mainModule.uri.getInvitedUserList,
            data:{code:code,page:1,rows:12},
            success:function(result){
                mainModule.log('获取我邀请的人注册列表接口返回',result)
                self.httpInterceptor(result,function(result){
                    self.renderInvitedUserListDom(result);
                })
            }
        })
    },
    renderInvitedUserListDom:function(result){
        var ii=result.length,dom='<div><i class="i-icon i-vip-mark"></i></div> <h3 >'+'你已邀请'+ii+'位好友'+'</h3>'+
                        '<p>'+ii*30+'天VIP已经到手，最多可邀请12位好友，轻松获取年费VIP权益</p>';
        if(ii>=12){
            dom='<div><i class="i-icon i-vip-mark"></i></div> <h3 >恭喜你</h3>'+
                        '<p>已成功邀请12位好友，获得年费VIP</p>';
            result.length=12;
        }
                       dom+='<dl>'+
                            '<dt class="clearfix"><div class="td-wrap f-l">好友名单</div><div class="td-wrap f-r">奖励</div></dt>';
        
        for(var i=0,ii=result.length;i<ii;i++){
            var item=result[i],account=item.userName||item.mobilephone||item.email;
            dom+='<dd class="clearfix"><div class="td-wrap f-l">'+account+'</div><div class="td-wrap f-r">'+item.dayNum+'天VIP</div></dd>';
        }
        dom+='</dl>';
        if(ii==0||!ii){
           $('#j_invited_friends_list').find('.no-result-wrap').show();
           return;
        }
        var $wrap=$('#j_invited_friends_list');
        $wrap.find('.result-wrap').html(dom).show();
    },
    httpInterceptor:function(result,succFunc,errFunc,callback){
        if(result.status=='SUCCESS'){
            if(result.content){
                succFunc&&succFunc.call(this,result.content.list||result.content.rows||result.content,callback);
            }else{
                succFunc&&succFunc.call(this,result,callback);
            }
        }else{
            errFunc&&errFunc.call(this,result);
        }
    },
	init:function(){
		this.bindEvents();
	}
};
shareModule.init();