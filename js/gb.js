(function(){
    var host = window.location.host;
    if (/127|8000|8001|800/.test(host)) {
        $._CACHEOBJ = {context: "/skillbridge"};
    } else {
        $._CACHEOBJ = {context: "/skillbridge"};
    }
})();
