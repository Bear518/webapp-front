var key=mainModule.getQueryValueByName('column'),username=mainModule.getQueryValueByName('nickname');
var commonModule={
    bindEvents:function(){
        var self=this;
        $('.share-wrap').on('mouseenter mouseout','.i-wx',function(e){
            if(e.type=='mouseenter'){
                $('#wemcn').show();
                self.shareFreeVip();
            }
        });
        $('#ewmkg').click(function(){
            $('#wemcn').hide();
        });
       $('.share-wrap').on('click','.i-icon',function(){
            self.shareFreeVip();
            var $this=$(this),type=$this.data('type'),basicHref;
            _hmt&&_hmt.push(['_trackEvent', 'CAREER_ANCHOR', 'click', type]);
            switch(type){
                case 'sina':
                    basicHref='http://service.weibo.com/share/share.php';
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
                var title='大学生、职场新人必看，可能是最靠谱的职业测试。';
                if(key&&mainModule.getCookie('islogin')){
                    var linkHref=window.location.origin+'/view/zycp/share.html?column='+key+'&nickname='+encodeURI(nickname);
                    linkHref=mainModule.shareUriAddSearch({url:linkHref,activityCode:'CAREER_ANCHOR'});
                    title='大学生、职场新人必看，可能是最靠谱的职业测试。 点击查看：'+nickname+'的结果 '+linkHref+' 分享自@极视教育Skillbridge';
                }
                var shareUrl,href=window.location.href;
                if(/127|8000|8001|dev|192/.test(href)){
                    // shareUrl='http://www.skillbridge.cn';
                    shareUrl=window.location.origin+'/view/zycp/index.html';
                }else{
                    shareUrl=window.location.origin+'/view/zycp/index.html';
                }
                if(type=='qqzone'){
                    shareUrl=shareUrl.replace('http://','');
                }
                shareUrl=mainModule.shareUriAddSearch({url:shareUrl,activityCode:'CAREER_ANCHOR'});
                console.log(shareUrl);
                var l= {
                    url:shareUrl,
                    showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
                    desc:'职业锚问卷（Career Anchor Questionaire）是国外职业测评运用最广泛，最有效的工具之一。 职业锚问卷是一种职业生涯规划咨询、自我了解的工具，能够协助组织或个人进行更理想的职业生涯发展计划。职业锚没有好坏， 请根据第一感觉，不假思索迅速答题。',/*默认分享理由(可选)*/
                    summary:'极视教育职业测评',/*分享摘要(可选)*/
                    title:title,/*分享标题(可选)*/
                    site:'极视教育网',/*分享来源 如：腾讯网(可选)*/
                    pics:'', /*分享图片的路径(可选)*/
                    style:'203',
                    width:98,
                    height:22
                };
                var a=[];
                for(var b in l)
                a.push(b+"="+encodeURIComponent(l[b]));
                window.open(basicHref+"?"+a.join("&"),"_blank","width=615,height=505,top=242,left=308,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
            };
            share(basicHref);
           // window.open('http://service.weibo.com/share/share.php','_blank');
        });
    },
    getNickName:function(){
        var nickname=mainModule.getCookie('nickname'),
            tel=mainModule.getCookie('username')||'',
            email=mainModule.getCookie('email')||'';
        return username||nickname||(tel.substr(0,3)+'***'+tel.substr(6))||(email.substr(0,3)+'***'+email.substr(6))||'***';
    },
    generateQRCode:function(){
        var link=window.location.origin+'/view/zycp/index.html',nickname=this.getNickName();
        if(mainModule.getCookie('islogin')&&key){
            link=window.location.origin+'/view/zycp/share.html?column='+encodeURIComponent(key)+'&nickname='+encodeURIComponent(nickname);
        }
        link=mainModule.shareUriAddSearch({url:link,activityCode:'CAREER_ANCHOR'});
        link=link.replace('terminate_type=PC','terminate_type=MOBILE');
        var src=mainModule.uri.generateQRCode+'?link='+encodeURIComponent(link);
        $('#ewmimg').attr('src',src);
    },
    shareFreeVip:function(){
        $.ajax({
            type:'get',
            url:mainModule.uri.shareFreeVip,
            success:function(result){
                mainModule.log('分享赠送vip接口返回',result);
            }
        })
    },
    init:function(){
        // this.checkDevice();
        this.bindEvents();
        this.generateQRCode();
    }
};
commonModule.init();
var careerPathList={
    'c1':{name:'TF 技术/职能型职业锚',intro:'这种定位的人会发现自己对某一特定工作很擅长并且很热衷。真正让他们感到自豪的是他们所具备的专业才能。他们倾向于一种“专家式”的生活，一般不喜欢成为全面的管理人员，因为这将意味着他们放弃在技术/职能领域的成就。但他们愿意成为一名职能经理，因为职能经理可以更好地帮助他们在专业领域上发展。',industryChoose:'技术主管\职能部门经理\IT\互联网\软件\通信\电子\机械\制药\化工',column:'c1'},
    'c2':{name:'GM 管理型职业锚',intro:'这种定位的人对管理本身具有很大的兴趣，具有成为管理人员的强烈愿望，并将此看成职业进步的标准。他们有提升到全面管理职位上所需要的相关能力，并希望自己的职位不断得到提升，这样他们可以承担更大的责任，并能够做出影响成功或失败的决策。',industryChoose:'高管、行政人员、企业管理',column:'c2'},
    'c3':{name:'AU 自主/独立型职业锚',intro:'这种定位的人追求自主和独立，不愿意接受别人的约束，也不愿受程序、工作时间、着装方式以及在任何组织中都不可避免的标准规范的制约。无论什么样的工作，他们希望能用自己的方式、工作习惯、时间进度和自己的标准来完成工作。',industryChoose:'教师、咨询顾问、研发人员、科研、自由职业',column:'c3'},
    'c4':{name:'SE 安全/稳定型职业锚',intro:'安全与稳定是这种类型的人选择职业最基本、最重要的需求。他们需要“把握自己的发展”，只有在职业的发展可以预测、可以达到或实现的时候，他们才会真正感觉放松。',industryChoose:'银行职员、公务员、财务管理、会计、结算、出纳、审计、税务、银行信贷',column:'c4'},
    'c5':{name:'EC 创造/创业型职业锚',intro:'这种定位的人，最重要的是建立或设计某种完全属于自己的东西；建立或投资新的公司；收购其他的公司，并按照自己的意愿进行改造。创造并不仅仅是发明家或艺术家所作的事，创业者也需要创造的激情和动力。他们有强烈的冲动向别人证明：通过自己的努力能够创建新的企业、产品或服务，并使之发展下去。当在经济上获得成功后，赚钱便成为他们衡量成功的标准。',industryChoose:'设计、广告、媒体、艺术、产品、创业',column:'c5'},
    'c6':{name:'SV 服务/奉献型职业锚',intro:'这种定位的人希望职业能够体现个人价值观，他们关注工作带来的价值，而不在意是否能发挥自己的才能或能力。他们的职业决策通常基于能否让世界变得更加美好。',industryChoose:'医护、社工、幼师、社会福利组织、志愿者、安全、社会责任、健康、餐饮、旅游、环保',column:'c6'},
    'c7':{name:'CH 挑战型职业锚',intro:'这种定位的人认为他们可以征服任何事情或任何人，并将成功定义为“克服不可能的障碍，解决不可能解决的，或战胜非常强硬的对手”。随着自己的进步，他们喜欢寻找越来越强硬的“挑战”，希望在工作中面临越来越艰巨的任务。 ',industryChoose:'特种兵、销售、市场、公关',column:'c7'},
    'c8':{name:'LS 生活型职业锚',intro:'这种定位的人是喜欢允许他们平衡并结合个人的需要、家庭的需要和职业的需要的工作环境。他们希望将生活的各个主要方面整合为一个整体。正因为如此，他们需要一个能够提供足够的弹性让他们实现这一目标的职业环境。甚至可以牺牲他们职业的一些方面，如：提升带来的职业转换，他们将成功定义得比职业成功更广泛。他们认为自己在如何去生活，在那里居住，以及如何处理家庭事情，及在组织中的发展道路是与众不同的。',industryChoose:'营养师、宠物医生、档案\图书管理员',column:'c8'},
};
