define(['utils/browser','utils/underscore'],function(browser,_) {

    var utils = {
        loadScript:function(src,callback){
             var hm = document.createElement("script");
              hm.src = src;
              hm.async=false;
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
              this.finished(hm,callback);
        },
        loadStyle:function(src,callback){
            var hm = document.createElement("link");
              hm.href = src;
              hm.type='text/css';
              hm.rel = 'stylesheet';
              // hm.async=false;
              var s = document.getElementsByTagName("link")[0]; 
              s.parentNode.insertBefore(hm, s);
              this.finished(hm,callback)
        },
        finished:function(js,callback){
             if (!/*@cc_on!@*/0) { //if not IE
                //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
                js.onload = function () {
                    // alert('Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload');
                    callback&&callback();
                }
            } else {
                //IE6、IE7 support js.onreadystatechange
                js.onreadystatechange = function () {
                    if (js.readyState == 'loaded' || js.readyState == 'complete') {
                        // alert('IE6、IE7 support js.onreadystatechange');
                        callback&&callback();
                    }
                }
            }
        },
        loadProvider:function(provider,callback){
            for(var key in provider){
                if(/script/.test(key)){
                    this.loadScript(provider[key],callback);
                }
                if(/link/.test(key)){
                    this.loadStyle(provider[key]);
                }
            }
        }
    };

    utils.log = function () {
        if (!window.console) {
            return;
        }
        if (typeof console.log === 'object') {
            console.log(Array.prototype.slice.call(arguments, 0));
        } else {
            console.log.apply(console, arguments);
        }
    };

    utils.between = function (num, min, max) {
        return Math.max(Math.min(num, max), min);
    };

    // utils.bounds=function($el){
    //     var offset=$el.offset(),height=$el.height();
    //     return {top:offset.top,bottom:offset.top+height,height:height};
    // };
    utils.createElement=function (html) {
            var newElement = document.createElement('div');
            newElement.innerHTML = html;
            return newElement.firstChild;
    };
    utils.bounds = function(element) {
        var bounds = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!element || !document.body.contains(element)) {
            return bounds;
        }
        var rect = element.getBoundingClientRect(),
            scrollOffsetY = window.pageYOffset,
            scrollOffsetX = window.pageXOffset;
        if (!rect.width && !rect.height && !rect.left && !rect.top) {
            //element is not visible / no layout
            return bounds;
        }
        bounds.left = rect.left + scrollOffsetX;
        bounds.right = rect.right + scrollOffsetX;
        bounds.top = rect.top + scrollOffsetY;
        bounds.bottom = rect.bottom + scrollOffsetY;
        bounds.width = rect.right - rect.left;
        bounds.height = rect.bottom - rect.top;
        return bounds;
    };
    utils.serialize = function (val) {
        if (val === undefined) {
            return null;
        }
        if (typeof val === 'string' && val.length < 6) {
            var lowercaseVal = val.toLowerCase();
            if (lowercaseVal === 'true') {
                return true;
            }
            if (lowercaseVal === 'false') {
                return false;
            }
            if (!isNaN(Number(val)) && !isNaN(parseFloat(val))) {
                return Number(val);
            }
        }
        return val;
    };
    var classNameArray = function(element) {
        return _.isString(element.className) ? element.className.split(' ') : [];
    };
    var trim = function (inputString) {
        return inputString.replace(/^\s+|\s+$/g, '');
    };
    var setClassName = function(element, className) {
        className = trim(className);
        if (element.className !== className) {
            element.className = className;
        }
    };
    utils.addClass = function (element, classes) {
        // TODO:: use _.union on the two arrays

        var originalClasses = classNameArray(element);
        var addClasses = _.isArray(classes) ? classes : classes.split(' ');

        _.each(addClasses, function (c) {
            if (!_.contains(originalClasses, c)) {
                originalClasses.push(c);
            }
        });

        setClassName(element, originalClasses.join(' '));
    };
    utils.removeClass = function (element, c) {
        var originalClasses = classNameArray(element);
        var removeClasses = _.isArray(c) ? c : c.split(' ');

        setClassName(element, _.difference(originalClasses, removeClasses).join(' '));
    };
    var invokeFieldOrMethod = function(element, method) {
       var usablePrefixMethod;
       ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
           if (usablePrefixMethod) return;
           if (prefix === "") {
               // 无前缀，方法首字母小写
               method = method.slice(0,1).toLowerCase() + method.slice(1);   
           }
           var typePrefixMethod = typeof element[prefix + method];
           if (typePrefixMethod + "" !== "undefined") {
               if (typePrefixMethod === "function") {
                   usablePrefixMethod = element[prefix + method]();
               } else {
                   usablePrefixMethod = element[prefix + method];
               }
           }
       });
       return usablePrefixMethod;
    };
    utils.isFullScreen=function(){
        if(invokeFieldOrMethod(document,'FullScreen') || invokeFieldOrMethod(document,'IsFullScreen') || document.IsFullScreen)
        {
            return true;
        }
        return;
    }
    _.extend(utils,browser);
    return utils;
});

