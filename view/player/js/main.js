
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
define(['./player','./utils/helpers','utils/storage','jquery','patch/gb'
    ],function(Player,utils,Storage,$,gbPatch){
        var storage=new Storage();
        var providerType=0;
        window.onload = function() {
            if (window.applicationCache&&!!document.createElement('video').canPlayType) {
                // alert("你的浏览器支持HTML5");
                // 支持默认用video播放器
                providerType=0;
            } else {
                // alert("你的浏览器不支持HTML5");
                // 不支持默认用flash播放器
                providerType=1;
            }
        }
        var main=function(){

            this.init=function(){

            };
            this.setup=function(){
                utils.log('setup');
                utils.log('isFlashSupported',utils.isFlashSupported());
                var type=storage.getItem('providerType')||providerType,soursePath=[{name:'html5',script:'/view/player/1.4.10/prism-h5.js',link:'/view/player/css/1.4.10/skins/default/index.css'},{name:'flash',script:'//g.alicdn.com/de/prismplayer/1.4.10/prism-flash.js',link:'/view/player/css/1.4.10/skins/default/index.css'}];
                var sourseProvider=soursePath[type];
                utils.loadProvider(sourseProvider,function(){
                    var player=new Player({
                        id:'J_prismPlayer',
                        // source:'http://vod.skillbridge.cn/mun/hd-s.m3u8?auth_key=1479183794-0-0-9154db2b0b9d1aaf0a644f72e4dc8895',
                        type:type,
                        width:'403px',
                        height:'251px',
                        debug:false,

                    });
                    var player=new Player({
                        id:'j_test',
                        // source:'http://vod.skillbridge.cn/mun/hd-s.m3u8?auth_key=1479183794-0-0-9154db2b0b9d1aaf0a644f72e4dc8895',
                        type:type,
                        width:'100%',
                        height:'500px',
                        debug:false,

                    });
                    //播放页的设置
                    var playerTwo=new Player({
                        id:'j_video_wrap',
                        type:type,
                        width:'100%',
                        height:$('#j_left_wrap').height()+'px',
                        resizeId:'j_left_wrap',
                        resize:'auto',
                        debug:true,
                    });
                    // 详情页设置
                    
                    window.jsPlayer=(playerTwo.elementContainer&&playerTwo);
                    window.Player=Player;
                });
                
            }
        };
        new main().setup();
        window.$=$;
})