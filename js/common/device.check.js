var checkDevice=function(){
        var url,href=window.location.href,index=href.indexOf('m.');
        var isMobile=/mobile/gi.test(window.navigator.userAgent);
        if(/800/.test(href)){
            var index=href.indexOf('8002');
            if(isMobile){
                if(index<0){
                    url=href.replace('8000','8002');
                }
            }else{
                if(index>0){
                     url=href.replace('8002','8000');
                }
            }
        }else if(/136/.test(href)){
            var index=href.indexOf('7000');
            if(isMobile){
                if(index<0){
                    url=href.replace('136','136:7000');
                }
            }else{
                if(index>0){
                     url=href.replace('136:7000','136');
                }
            }
        }else if(/skillbridge/.test(href)){
            if(isMobile){
                if(index<0){
                    url=href.replace('www.skillbridge.cn','m.skillbridge.cn');
                }
            }else{
                if(index>0){
                     url=href.replace('m.skillbridge.cn','www.skillbridge.cn');
                }
            }
        }

        url&&(window.location.href=url);
        console.log(url);
    };
checkDevice();