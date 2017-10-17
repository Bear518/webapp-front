
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
        'text!../templates/volume_slider.html',
        'utils/ui',
        'utils/storage',
        'utils/underscore',
        'utils/extendable',
        './components/rightclick'
    ],function(common,$,Controller,utils,Slider,videoControlbarTpl,controlbarTpl,volumeSliderTpl,UI,Storage,_,Extendable,RightClick){
        if(!$){
            console.log($);
            return;
        }
        utils.log('flashVersion',utils.flashVersion());
        var storage=new Storage();

        var playerSelect=Extendable.extend({
        constructor:function(config){
            this.config=config||{};
           
            this.elementContainer=document.getElementById(config.id);
            this.elementBody=document.getElementsByTagName('body')[0];
            if(!this.elementContainer){
                utils.log('no elementContainer find by',config.id);
                return;
            }
            this.$container=$(this.elementContainer);
            this.$container.addClass('prism-player jx-size js-player');
            this.providerType=config.type;
            this.init();
            if(!config.debug||1){
                new RightClick().setup({},this.elementContainer,this.elementContainer);
            }
        },
        setup:function(){
            // 初始化播放器
            var defaultConfig={
                id: "J_prismPlayer", // 容器id
                source: "",// 视频地址
                autoplay: false,    //自动播放：否
                width: "100%",       // 播放器宽度
                height: "530px",      // 播放器高度
                showBarTime:'3000',//控制栏自动隐藏时间（ms）
                // domain:'//skillbridge.cn',
                skinRes:"http://localhost:8008/view/player/flash/1.2.4/atlas/skin",
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
            };

            var config=_.extend(defaultConfig,this.config);
            if(config.width.indexOf('%')<0&&parseInt(config.width)<600){
                delete config.skinLayout;
                this.providerType=2;
                this.elementContainer.addEventListener("mouseout",function(e){
                    // var st=setTimeout(function(){
                        // $(self.elementControlBar).;
                    //     clearTimeout(st);
                    // },5000);
                });
            }
            var self=this;
            var player = new prismplayer(config);
            // _.extend(self,player);
            self.aliPlayer=player;
            this.elementContainer.addEventListener("mouseover",function(e){
                
                // if($('.prism-big-play-btn').is(':hidden')){
                    $(self.elementControlBar).css('bottom','0px');
                    // console.log(e);
                // }
            });

            // self.aliPlayer.tag&&this.elementContainer.addEventListener("click",function(e){
            //     if(!self.aliPlayer.tag.paused){
            //         self.aliPlayer.pause();
            //     }else{
            //         self.aliPlayer.play();
            //     }
            // });
            // 监听播放器的pause事件
            player.on("pause", function() {
                // alert("播放器暂停啦！");
                window.onPlayPaused&&onPlayPaused();
            });
            player.on("play", function() {
                // alert("播放器暂停啦！");
                window.onPlayResume&&onPlayResume();
            });
            player.on("ready", function() {
                console.log('播放器初始化完毕可以播放视频时触发 s');
                self.isReady=true;
                window.on_player_start&&on_player_start();
                // player.loadByUrl('http://res.skillbridge.cn/video/dkx1.mp4',20);
            });
            player.on('uiReady',function(){
                console.log('uiReady');
            });
            player.on('uiH5Ready',function(){
                utils.log('uiH5Ready');
                self.isReady=true;
            });
            player.on('url:change',function(){
                if(self.providerType==0){
                    console.log('url change');
                    var $this=$(self.elementRate).find('.active'),rate=$this.data('rate')||1.0;
                    self.controller.setPlaybackRate(rate);
                }
            });
            config.resize&&self.$container.css('height','100%');
            if(this.providerType!=1){
                self.isReady=true;
            }
            if(this.providerType==0){
                this.elementVolume=this.getElementByClassName('prism-volume');
                this.elementControlBar=this.getElementByClassName('prism-controlbar');
                var $ali_controlbar=$(this.elementControlBar);
                $ali_controlbar.append(videoControlbarTpl);

                this.elementVolumeSlider=this.getElementByClassName('j_volume_slider');
                this.elementProvider=this.getElementByClassName('provider-select-wrap');
                this.elementRate=this.getElementByClassName('rate-select-wrap');
                this.elementHd=this.getElementByClassName('hd-select-wrap');
                this.elementNext=this.getElementByClassName('next-period-wrap');
                $(this.elementVolume).css('right','405px');

                var volumeSlider=new Slider(this.elementVolumeSlider,'jx-volume-slider','horizontal');
                var controller=new Controller(player);
                self.controller=controller;
                
                new UI(this.elementHd).on('click',function(evt){
                    utils.log('hd select evt',evt);
                    var $this=$(evt.target),name=$this.html().substr(0,2),val=$this.data('value');
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                    // utils.log('switch hd video source');
                    // controller.loadByUrl('http://res.skillbridge.cn/video/dkx1.mp4',20);
                    $(self.elementHd).prev().html(name);
                    self.aliPlayer.continuePlayTime=self.aliPlayer.getCurrentTime();
                    window.playModule&&window.playModule.switchHd(val);
                });
                new UI(this.elementProvider).on('click',function(evt){
                    utils.log('player select evt',evt);
                    var $this=$(evt.target),type=$this.data('type');
                    storage.setItem('providerType',type);
                    window.location.reload();
                });
                new UI(this.elementRate).on('click',function(evt){
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
                new UI(this.elementNext).on('click',function(evt){
                    utils.log('elementNext click',evt);
                    window.playModule&&window.playModule.playNext();
                });
                this.elementPeriodState=this.getElementByClassName('period-state-wrap');
                new UI(this.elementPeriodState).on('click',function(evt){
                    utils.log('elementPeriodState click',evt);
                    window.playModule&&window.playModule.setPeriodLearned();
                });
                var self=this;
                this.volumeSlider=volumeSlider;
                this.volumeSlider.on('update',function(obj){
                    utils.log('volume update',obj);
                    controller.setVolume(obj.percentage);
                    
                    var perc=Math.round(obj.percentage);
                    if(!perc){
                        $(self.elementVolume).addClass('mute');
                        self.aliPlayer.tag.muted=true;
                    }else{
                        $(self.elementVolume).removeClass('mute');
                        self.aliPlayer.tag.muted=false;
                        // player.aliPlayer.tag.muted=false;
                    }
                    storage.setItem('volume',perc);
                    $(self.elementVolumeSlider).find('.title').html(perc+'%').css('visibility','visible');
                    var st=setTimeout(function(){
                        $(self.elementVolumeSlider).find('.title').css('visibility','hidden');
                        clearInterval(st);
                    },1000);
                });
                // $(volumeSlider.element()).insertBefore($insert_wrap);

            }else if(this.providerType==1){
                this.$container.append(controlbarTpl);

                this.elementProvider=this.getElementByClassName('provider-select-wrap');
                this.elementHd=this.getElementByClassName('hd-select-wrap');
                this.elementNext=this.getElementByClassName('next-period-wrap');

                new UI(this.elementProvider).on('click',function(evt){
                    utils.log('player select evt',evt);
                    var $this=$(evt.target),type=$this.data('type');
                    storage.setItem('providerType',type);
                    window.location.reload();
                });
                new UI(this.elementHd).on('click',function(evt){
                    utils.log('hd select evt',evt);
                    var $this=$(evt.target),name=$this.html().substr(0,2),val=$this.data('value');
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                    // utils.log('switch hd video source');
                    // controller.loadByUrl('http://res.skillbridge.cn/video/dkx1.mp4',20);
                    $(self.elementHd).prev().html(name);
                    window.playModule&&window.playModule.switchHd(val);
                    

                });
                new UI(this.elementNext).on('click',function(evt){
                    utils.log('elementNext click',evt);
                    window.playModule&&window.playModule.playNext();
                });
                this.elementPeriodState=this.getElementByClassName('period-state-wrap');
                new UI(this.elementPeriodState).on('click',function(evt){
                    utils.log('elementPeriodState click',evt);
                    window.playModule&&window.playModule.setPeriodLearned();
                });
            }else if(this.providerType==2){
                var self=this;
                var controller=new Controller(player);
                self.controller=controller;
                this.elementVolume=this.getElementByClassName('prism-volume');
                if(!this.elementVolume){return;}
                this.$container.addClass('s-size-container')
                this.elementControlBar=this.getElementByClassName('prism-controlbar');
                var $ali_controlbar=$(this.elementControlBar);
                $ali_controlbar.append(volumeSliderTpl);
                this.elementVolumeSlider=this.getElementByClassName('j_volume_slider');
                var volumeSlider=new Slider(this.elementVolumeSlider,'jx-volume-slider','vertical');
                new UI(this.elementVolume,{useHover:true,useMove:true}).on('over',function(evt){
                    self.elementVolumeSlider.style.display='block';
                }).on('out',function(evt){
                    self.elementVolumeSlider.style.display='none';
                }); 
                new UI(this.elementVolumeSlider,{useHover:true,useMove:true}).on('over',function(evt){
                    self.elementVolumeSlider.style.display='block';
                }).on('out',function(evt){
                    self.elementVolumeSlider.style.display='none';
                }); 
                this.volumeSlider=volumeSlider;
                this.volumeSlider.on('update',function(obj){
                    utils.log('volume update',obj);
                    controller.setVolume(obj.percentage);
                    
                    var perc=Math.round(obj.percentage);
                    if(!perc){
                        $(self.elementVolume).addClass('mute');
                        self.aliPlayer.tag.muted=true;
                    }else{
                        $(self.elementVolume).removeClass('mute');
                        self.aliPlayer.tag.muted=false;
                        // player.aliPlayer.tag.muted=false;
                    }
                    storage.setItem('volume',perc);
                });
            }
        },
        getElementByClassName:function(className){
            return this.elementContainer.getElementsByClassName(className)[0];
        },
        bindEvents:function(){
            var self=this;
            var $container=self.$container;
            $container.on('click','.prism-volume',function(evt){

               if(!/prism-volume mute/.test(evt.target.className)){
                    $(evt.target).removeClass('mute');
                    console.log('prism-volume click');
                    var volume=storage.getItem('volume')||50;
                    self.volumeSlider.render(volume);
                    // self.aliPlayer.tag.muted=false;
                    self.controller.setVolume(volume);
              }else{
                    // self.changeVolume(0);
                    self.volumeSlider.render(0);
                    $(evt.target).addClass('mute');
                    // self.aliPlayer.tag.muted=true;
               }
            });
            $container.on('click','.jx-btn-fullbrowser',function(evt){
               $container.toggleClass('jx-size jx-flag-fullscreen');
            });
            
            // var x=0;
            $(window).off('resize');
            $(window).resize(function() {
              utils.log('resize');
              self.$resizeContainer&&$container.css('height',self.$resizeContainer.height());
              if(!utils.isFullScreen()&&$('.prism-fullscreen').length>0){
                utils.log('exitFullScreen');
                var $wrap=$('.prism-fullscreen');
                $wrap.removeClass('prism-fullscreen');
                $wrap.find('.fullscreen').removeClass('fullscreen');
              }
            });
        },
        activePlayerSelectedEl:function(type){
            //HTML5\FLASH模式切换状态,type值为0\1
            var type=type||storage.getItem('providerType')||0;
            var $wrap=$(this.elementProvider);
            $wrap.find('.active').removeClass('active');
            $wrap.find('li').eq(type).addClass('active');
        },
        init:function(elementId){
            var self=this;
            self.setup();
            self.bindEvents();
            self.activePlayerSelectedEl();
        }
    });
    return playerSelect;
});