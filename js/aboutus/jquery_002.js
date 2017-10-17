(function(a) {
    a.fn.DB_rotateRollingBanner = function(b) {
        var c = {
            key: "",
            moveSpeed: 100,
            autoRollingTime: 5000
        };
        a.extend(c, b);
        return this.each(function() {
            var k = a(this);
            var l = k.find(".d_img");
            var h = l.find(">li");
            var j = k.find(".d_menu");
            var r = j.find(">li");
            var z = k.find(".d_prev");
            var B = k.find(".d_next");
            var p = h.length;
            var y = 5;
            var s = "next";
            var f;
            var C;
            var u = [];
            var x = [];
            var m = 1;
            var t = 0;
            var o = 0;
            var v = 0;
            var e = 0;
            w();
            function w() {
                
                d();
                g();
                n()
            }
            function d() {
                j.html("");
                for (var E = 0; E < p; E++) {
                    var D = h.eq(E);
                    if (E < y) {
                        u[E] = {
                            left: D.position().left,
                            top: D.position().top,
                            zIndex: D.css("z-index"),
                            width: D.width()
                        };
                        D.css("left", u[E].left)
                    } else {
                        D.css("left", u[y - 1].left)
                    }
                    x.push(D);
                    j.append("<li></li>")
                }
                r = j.find(">li");
                r.eq(0).addClass("d_select")
            }
            function g() {
                k.bind("mouseenter",
                function() {
                    clearInterval(f)
                }).bind("mouseleave",
                function() {
                    n()
                });
                r.bind("click",
                function() {
                    if (m && o != a(this).index()) {
                        t = a(this).index();
                        m = 0;
                        v = Math.abs(t - o);
                        if (t > o) {
                            s = "next"
                        } else {
                            s = "prev"
                        }
                        if (v > Math.ceil(p / 2)) {
                            v = p - v;
                            if (s == "next") {
                                s = "prev"
                            } else {
                                s = "next"
                            }
                        }
                        e = 0;
                        q();
                        if (v > 1) {
                            C = setInterval(function() {
                                if (m) {
                                    q();
                                    m = 0;
                                    if (e >= v) {
                                        clearInterval(C)
                                    }
                                }
                            },
                            50)
                        }
                    }
                });
                B.bind("click",
                function() {
                    if (m) {
                        s = "next";
                        m = 0;
                        if (t == p - 1) {
                            t = 0
                        } else {
                            t++
                        }
                        q()
                    }
                });
                z.bind("click",
                function() {
                    if (m) {
                        s = "prev";
                        m = 0;
                        if (t == 0) {
                            t = p - 1
                        } else {
                            t--
                        }
                        q()
                    }
                })
            }
            function q() {
                if (s == "next") {
                    for (i = 0; i < y; i++) {
                        var D = u[i - 1];
                        if (i == 0) {
                            x[i].fadeOut(c.moveSpeed)
                        } else {
                            x[i].css("z-index", D.zIndex).animate({
                                left: D.left,
                                top: D.top,
                                width: D.width
                            },
                            c.moveSpeed)
                        }
                    }
                    var D = u[y - 1];
                    if (x.length != y) {
                        x[y].css({
                            left: D.left,
                            top: D.top,
                            width: D.width,
                            "z-index": D.zIndex
                        }).fadeIn(c.moveSpeed,
                        function() {
                            m = 1
                        })
                    } else {
                        x[0].stop().css({
                            left: D.left,
                            top: D.top,
                            width: D.width,
                            "z-index": D.zIndex
                        }).fadeIn(c.moveSpeed,
                        function() {
                            m = 1
                        })
                    }
                    x.push(x.shift())
                } else {
                    for (i = 0; i < y; i++) {
                        var D = u[i + 1];
                        if (i == y - 1) {
                            x[i].css("z-index", 0).fadeOut(c.moveSpeed)
                        } else {
                            x[i].css("z-index", D.zIndex).animate({
                                left: D.left,
                                top: D.top,
                                width: D.width
                            },
                            c.moveSpeed)
                        }
                    }
                    var D = u[0];
                    x[x.length - 1].stop().css({
                        left: D.left,
                        top: D.top,
                        width: D.width,
                        "z-index": D.zIndex
                    }).fadeIn(c.moveSpeed,
                    function() {
                        m = 1
                    });
                    x.unshift(x.pop())
                }
                r.removeClass("d_select");
                r.eq(t).addClass("d_select");
                o = t;
                e++
            }
            function n() {
                f = setInterval(A, c.autoRollingTime)
            }
            function A() {
                B.click()
            }
        })
    }
})(jQuery);