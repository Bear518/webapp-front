
// define(function(require){
//     console.log(require);
//     var $=require('jquery-1.9.0.min');
//     console.log($);
// });
// requirejs.config({
//     config: {
//         text: {
//             //Valid values are 'node', 'xhr', or 'rhino'
//             // env: 'node'
//         }
//     }
// });
define(['./common',
        'jquery',
        './controller/controller',
        './utils/helpers',
        'components/slider',
        'text!../templates/video_controlbar.html',
        'text!../templates/controlbar.html',
        'utils/ui',
        'utils/storage',

    ],function(common,$,Controller,utils,Slider,videoControlbarTpl,controlbarTpl,UI,Storage){
        if(!$){
            console.log($);
            return;
        }
        var storage=new Storage();
        // storage.setItem('providerType',0);
        var $container=$('#J_prismPlayer');
        // var $=require('jquery');
        var playerSelect={
        loadProvider:function(provider,callback){
            for(var key in provider){
                if(/script/.test(key)){
                    utils.loadScript(provider[key],callback);
                }
                if(/link/.test(key)){
                    utils.loadStyle(provider[key]);
                }
            }
        },
        setup:function(){
            // 初始化播放器
            var player = new prismplayer({
                id: "J_prismPlayer", // 容器id
                source: "http://res.skillbridge.cn/video/dkx1.mp4",// 视频地址
                autoplay: false,    //自动播放：否
                width: "100%",       // 播放器宽度
                height: "530px",      // 播放器高度
                showBarTime:'116000',//控制栏自动隐藏时间（ms）
                // domain:'//skillbridge.cn',
                // skinRes:"//skillbridge.cn/skin",
                skinLayout: [
                    {
                        "name":"bigPlayButton",
                        "align":"blabs",
                        "x":30,
                        "y":80
                    },
                    {
                        "name":"controlBar",
                        "align":"blabs",
                        "x":0,
                        "y":0,
                        "children":[
                            {
                                "name":"progress",
                                "align":"tlabs",
                                "x":0,
                                "y":0
                            },
                            {
                                "name":"playButton",
                                "align":"tlabs",
                                "x":20,
                                "y":25
                            },
                            {
                                "name":"timeDisplay",
                                "align":"tlabs",
                                "x":100,
                                "y":23
                            },
                            // {
                            //     "name":"setButton",
                            //     "align":"trabs",
                            //     "x":150,
                            //     "y":23
                            // },
                            {
                                "name":"volume",
                                "align":"trabs",
                                "x":323,
                                "y":23
                            },
                            {
                                "name":"fullScreenButton",
                                "align":"trabs",
                                "x":116,
                                "y":23
                            }
                        ]
                    }
                ]
            });
            var clickDom = document.getElementById("J_clickToPlay");
            clickDom.addEventListener("click", function(e) {
            // 调用播放器的play方法
                // player.play();
                // player.setPlayerSize('100%','100%');
                player.loadByUrl('http://res.skillbridge.cn/video/dkx1.mp4',20);
            });
            var playerDom=document.getElementById('J_prismPlayer');
            playerDom.addEventListener("mouseover",function(e){
                
                // if($('.prism-big-play-btn').is(':hidden')){
                    $('.prism-controlbar').show();
                    // console.log(e);
                // }
            });
            // 监听播放器的pause事件
            player.on("pause", function() {
                // alert("播放器暂停啦！");
            });
            player.on('uiReady',function(){
                console.log('uiReady');
            });
            if(this.providerType==0){
                $('.prism-volume').css('right','405px');
                var $ali_controlbar=$('.prism-controlbar');
                $ali_controlbar.append(videoControlbarTpl);
                // var $insert_wrap;
                // if($('.prism-volume')[0]){
                //     $insert_wrap=$('.prism-volume');
                //     $insert_wrap.css({'position':'relative','margin-right':'112px'});
                // }else{
                //     $insert_wrap=$('.prism-fullscreen-btn');
                //     $('<div class="prism-volume"  style="float: right; margin-right: 112px; margin-top: 25px; position: relative;"></div>').insertAfter($insert_wrap);
                //     $insert_wrap=$('.prism-volume');
                // }
                // //h5播放器清晰度，音量嵌入
                // var hdEl=utils.createElement(hdSelectTpl);
                // $(hdEl).insertAfter($insert_wrap);
                // $(rateSelectTpl).insertAfter($insert_wrap);

                var volumeSlider=new Slider($('.j_volume_slider')[0],'jx-volume-slider','horizontal');
                var controller=new Controller(player);
                new UI($('.hd-select-wrap')[0]).on('click',function(evt){
                    utils.log('hd select evt',evt);
                    var $this=$(evt.target),val=$this.html();
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                    utils.log('switch hd video source');
                    controller.loadByUrl('http://res.skillbridge.cn/video/dkx1.mp4',20);
                    $('.hd-selected').html(val);
                });
                new UI($('.provider-select-wrap')[0]).on('click',function(evt){
                    utils.log('player select evt',evt);
                    var $this=$(evt.target),type=$this.data('type');
                    storage.setItem('providerType',type);
                    window.location.reload();
                });
                new UI($('.rate-select-wrap')[0]).on('click',function(evt){
                    utils.log('rate select evt',evt);
                    var $this=$(evt.target),rate=$this.data('rate'),val=$this.html();
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                    utils.log('change rate to ',rate);
                    var videoPlayRate=controller.getPlaybackRate();
                    utils.log('current video rate is',videoPlayRate);
                    controller.setPlaybackRate(rate);
                    $('.rate-selected').html(val);
                });
                var self=this;
                this.volumeSlider=volumeSlider;
                this.volumeSlider.on('update',function(obj){
                    utils.log('volume update',obj);
                    controller.setVolume(obj.percentage);
                    
                    var perc=Math.round(obj.percentage);
                    storage.setItem('volume',perc);
                    $('.j_volume_slider').find('.title').html(perc+'%').css('visibility','visible');
                    var st=setTimeout(function(){
                        $('.j_volume_slider').find('.title').css('visibility','hidden');
                        clearInterval(st);
                    },1000);
                });
                // $(volumeSlider.element()).insertBefore($insert_wrap);

            }else if(this.providerType==1){
                $container.append(controlbarTpl);
                new UI($('.provider-select-wrap')[0]).on('click',function(evt){
                    utils.log('player select evt',evt);
                    var $this=$(evt.target),type=$this.data('type');
                    storage.setItem('providerType',type);
                    window.location.reload();
                });
            }
        },
        changeVolume : function(percentage) {
            this.elementThumb=this.elementThumb||this.$volume_container.find('.knob')[0];
            this.elementProgress=this.elementProgress||this.$volume_container.find('.progress')[0];
            percentage = Math.max(0, Math.min(percentage, 100));
            this.elementThumb.style.bottom = percentage + '%';
            this.elementProgress.style.height = percentage + '%';
        },
        bindEvents:function(){
            var self=this;
            // 音量的模块加的
            this.$container=$container;
            this.$volume_container=$container.find('.j_volume_slider');
            this.elementRail=$container.find('.slider-wrap');
            // 音量的模块加的
            function stopPropagation(e) {  
                e = e || window.event;  
                if(e.stopPropagation) { //W3C阻止冒泡方法  
                    e.stopPropagation();  
                } else {  
                    e.cancelBubble = true; //IE阻止冒泡方法  
                }  
            }
            // $('#J_prismPlayer').on('click','.slider-wrap',function(evt){
            //      // stopPropagation(evt);
            //     // console.log(e);
            //     var bounds=utils.bounds(evt.target),percentage;
            //     dimension = evt.pageY;
            //     if (dimension >= bounds.bottom) {
            //         percentage = 0;
            //     } else if (dimension <= bounds.top) {
            //         percentage = 100;
            //     } else {
            //         percentage = utils.between((bounds.height-(dimension-bounds.top))/bounds.height, 0, 1) * 100;
            //     }
            //     console.log('音量百分比'+percentage);
            //     self.changeVolume(percentage);
               
            // });
            $('#J_prismPlayer').on('click','.prism-volume',function(evt){
                
               // stopPropagation(evt);
               // if()
               if(!/prism-volume mute/.test(evt.target.className)){
                    $('.prism-volume').removeClass('mute');
                    console.log('prism-volume click');
                    var volume=storage.getItem('volume')||50;
                    self.volumeSlider.render(volume);
               }else{
                    // self.changeVolume(0);
                    self.volumeSlider.render(0);
                    $('.prism-volume').addClass('mute');
               }
            });
            $('#J_prismPlayer').on('click','.jx-btn-fullbrowser',function(evt){
               $container.toggleClass('jx-size jx-flag-fullscreen');
            });
            // var x=0;
            $(window).resize(function() {
              utils.log('resize');
            });
        },
        activePlayerSelectedEl:function(type){
            var $wrap=$('.provider-select-wrap');
            $wrap.find('.active').removeClass('active');
            $wrap.find('li').eq(type).addClass('active');
        },
        init:function(){
            var type=storage.getItem('providerType')||0,soursePath=[{name:'html5',script:'/view/player/1.4.10/prism-h5.js',link:'/view/player/css/1.4.10/skins/default/index.css'},{name:'flash',script:'//g.alicdn.com/de/prismplayer/1.4.10/prism-flash.js'}];
            var sourseProvider=soursePath[type];
            this.loadProvider(sourseProvider,function(){
                self.setup();
                self.bindEvents();
                self.activePlayerSelectedEl(type);
                // clearInterval(si);
            });
            this.providerType=type;
            // 0代表h5视频播放器、1代表flash播放器
            // this.setup();
            var self=this;
            // var si=setInterval(function(){
            //     if(prismplayer){
            //         self.setup();
            //         self.bindEvents();
            //         clearInterval(si);
            //     }
            // },1000)
        }
    };
    playerSelect.init();
})