! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.postscribe = t() : e.postscribe = t()
}(this, function() {

     document.addEventListener("keyup", function(e) { if (window.disable_key_escape) { e.preventDefault(); e.stopPropagation(); return false; } return true; });

    return function(e) {
		
		
        function t(r) {
            if (o[r]) return o[r].exports;
            var n = o[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
        }
        var o = {};
        return t.m = e, t.c = o, t.p = "", t(0)
    }([function(e, t, o) {
        "use strict";
        var r = o(1),
            n = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(r);
        e.exports = n.default
    }, function(e, t, o) {
        "use strict";

        function r() {}

        function n() {
            var e = f.shift();
            if (e) {
                var t = l.last(e);
                t.afterDequeue(), e.stream = i.apply(void 0, e), t.afterStreamStart()
            }
        }

        function i(e, t, o) {
            function i(e) {
                e = o.beforeWrite(e), g.write(e), o.afterWrite(e)
            }
            g = new c.default(e, o), g.id = u++, g.name = o.name || g.id, s.streams[g.name] = g;
            var d = e.ownerDocument,
                p = {
                    close: d.close,
                    open: d.open,
                    write: d.write,
                    writeln: d.writeln
                };
            a(d, {
                close: r,
                open: r,
                write: function() {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    return i(t.join(""))
                },
                writeln: function() {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    return i(t.join("") + "\n")
                }
            });
            var l = g.win.onerror || r;
            return g.win.onerror = function(e, t, r) {
                o.error({
                    msg: e + " - " + t + ": " + r
                }), l.apply(g.win, [e, t, r])
            }, g.write(t, function() {
                a(d, p), g.win.onerror = l, o.done(), g = null, n()
            }), g
        }

        function s(e, t, o) {
            if (l.isFunction(o)) o = {
                done: o
            };
            else if ("clear" === o) return f = [], g = null, void(u = 0);
            o = l.defaults(o, _), e = /^#/.test(e) ? window.document.getElementById(e.substr(1)) : e.jquery ? e[0] : e;
            var i = [e, t, o];
            return e.postscribe = {
                cancel: function() {
                    i.stream ? i.stream.abort() : i[1] = r
                }
            }, o.beforeEnqueue(i), f.push(i), g || n(), e.postscribe
        }
        t.__esModule = !0;
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var o = arguments[t];
                for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r])
            }
            return e
        };
        t.default = s;
        var d = o(2),
            c = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(d),
            p = o(4),
            l = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                return t.default = e, t
            }(p),
            _ = {
                afterAsync: r,
                afterDequeue: r,
                afterStreamStart: r,
                afterWrite: r,
                autoFix: !0,
                beforeEnqueue: r,
                beforeWriteToken: function(e) {
                    return e
                },
                beforeWrite: function(e) {
                    return e
                },
                done: r,
                error: function(e) {
                    throw new Error(e.msg)
                },
                releaseAsync: !1
            },
            u = 0,
            f = [],
            g = null;
        a(s, {
            streams: {},
            queue: f,
            WriteStream: c.default
        })
    }, function(e, t, o) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            var o = l + t,
                r = e.getAttribute(o);
            return p.existy(r) ? String(r) : r
        }

        function i(e, t) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = l + t;
            p.existy(o) && "" !== o ? e.setAttribute(r, o) : e.removeAttribute(r)
        }
        t.__esModule = !0;
        var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r])
                }
                return e
            },
            a = o(3),
            d = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(a),
            c = o(4),
            p = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                return t.default = e, t
            }(c),
            l = "data-ps-",
            _ = "ps-style",
            u = "ps-script",
            f = function() {
                function e(t) {
                    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    r(this, e), this.root = t, this.options = o, this.doc = t.ownerDocument, this.win = this.doc.defaultView || this.doc.parentWindow, this.parser = new d.default("", {
                        autoFix: o.autoFix
                    }), this.actuals = [t], this.proxyHistory = "", this.proxyRoot = this.doc.createElement(t.nodeName), this.scriptStack = [], this.writeQueue = [], i(this.proxyRoot, "proxyof", 0)
                }
                return e.prototype.write = function() {
                    var e;
                    for ((e = this.writeQueue).push.apply(e, arguments); !this.deferredRemote && this.writeQueue.length;) {
                        var t = this.writeQueue.shift();
                        p.isFunction(t) ? this._callFunction(t) : this._writeImpl(t)
                    }
                }, e.prototype._callFunction = function(e) {
                    var t = {
                        type: "function",
                        value: e.name || e.toString()
                    };
                    this._onScriptStart(t), e.call(this.win, this.doc), this._onScriptDone(t)
                }, e.prototype._writeImpl = function(e) {
                    this.parser.append(e);
                    for (var t = void 0, o = void 0, r = void 0, n = [];
                        (t = this.parser.readToken()) && !(o = p.isScript(t)) && !(r = p.isStyle(t));)(t = this.options.beforeWriteToken(t)) && n.push(t);
                    n.length > 0 && this._writeStaticTokens(n), o && this._handleScriptToken(t), r && this._handleStyleToken(t)
                }, e.prototype._writeStaticTokens = function(e) {
                    var t = this._buildChunk(e);
                    return t.actual ? (t.html = this.proxyHistory + t.actual, this.proxyHistory += t.proxy, this.proxyRoot.innerHTML = t.html, this._walkChunk(), t) : null
                }, e.prototype._buildChunk = function(e) {
                    for (var t = this.actuals.length, o = [], r = [], n = [], i = e.length, s = 0; s < i; s++) {
                        var a = e[s],
                            d = a.toString();
                        if (o.push(d), a.attrs) {
                            if (!/^noscript$/i.test(a.tagName)) {
                                var c = t++;
                                r.push(d.replace(/(\/?>)/, " " + l + "id=" + c + " $1")), a.attrs.id !== u && a.attrs.id !== _ && n.push("atomicTag" === a.type ? "" : "<" + a.tagName + " " + l + "proxyof=" + c + (a.unary ? " />" : ">"))
                            }
                        } else r.push(d), n.push("endTag" === a.type ? d : "")
                    }
                    return {
                        tokens: e,
                        raw: o.join(""),
                        actual: r.join(""),
                        proxy: n.join("")
                    }
                }, e.prototype._walkChunk = function() {
                    for (var e = void 0, t = [this.proxyRoot]; p.existy(e = t.shift());) {
                        var o = 1 === e.nodeType;
                        if (!(o && n(e, "proxyof"))) {
                            o && (this.actuals[n(e, "id")] = e, i(e, "id"));
                            var r = e.parentNode && n(e.parentNode, "proxyof");
                            r && this.actuals[r].appendChild(e)
                        }
                        t.unshift.apply(t, p.toArray(e.childNodes))
                    }
                }, e.prototype._handleScriptToken = function(e) {
                    var t = this,
                        o = this.parser.clear();
                    o && this.writeQueue.unshift(o), e.src = e.attrs.src || e.attrs.SRC, (e = this.options.beforeWriteToken(e)) && (e.src && this.scriptStack.length ? this.deferredRemote = e : this._onScriptStart(e), this._writeScriptToken(e, function() {
                        t._onScriptDone(e)
                    }))
                }, e.prototype._handleStyleToken = function(e) {
                    var t = this.parser.clear();
                    t && this.writeQueue.unshift(t), e.type = e.attrs.type || e.attrs.TYPE || "text/css", e = this.options.beforeWriteToken(e), e && this._writeStyleToken(e), t && this.write()
                }, e.prototype._writeStyleToken = function(e) {
                    var t = this._buildStyle(e);
                    this._insertCursor(t, _), e.content && (t.styleSheet && !t.sheet ? t.styleSheet.cssText = e.content : t.appendChild(this.doc.createTextNode(e.content)))
                }, e.prototype._buildStyle = function(e) {
                    var t = this.doc.createElement(e.tagName);
                    return t.setAttribute("type", e.type), p.eachKey(e.attrs, function(e, o) {
                        t.setAttribute(e, o)
                    }), t
                }, e.prototype._insertCursor = function(e, t) {
                    this._writeImpl('<span id="' + t + '"/>');
                    var o = this.doc.getElementById(t);
                    o && o.parentNode.replaceChild(e, o)
                }, e.prototype._onScriptStart = function(e) {
                    e.outerWrites = this.writeQueue, this.writeQueue = [], this.scriptStack.unshift(e)
                }, e.prototype._onScriptDone = function(e) {
                    return e !== this.scriptStack[0] ? void this.options.error({
                        msg: "Bad script nesting or script finished twice"
                    }) : (this.scriptStack.shift(), this.write.apply(this, e.outerWrites), void(!this.scriptStack.length && this.deferredRemote && (this._onScriptStart(this.deferredRemote), this.deferredRemote = null)))
                }, e.prototype._writeScriptToken = function(e, t) {
                    var o = this._buildScript(e),
                        r = this._shouldRelease(o),
                        n = this.options.afterAsync;
                    e.src && (o.src = e.src, this._scriptLoadHandler(o, r ? n : function() {
                        t(), n()
                    }));
                    try {
                        this._insertCursor(o, u), o.src && !r || t()
                    } catch (e) {
                        this.options.error(e), t()
                    }
                }, e.prototype._buildScript = function(e) {
                    var t = this.doc.createElement(e.tagName);
                    return p.eachKey(e.attrs, function(e, o) {
                        t.setAttribute(e, o)
                    }), e.content && (t.text = e.content), t
                }, e.prototype._scriptLoadHandler = function(e, t) {
                    function o() {
                        e = e.onload = e.onreadystatechange = e.onerror = null
                    }

                    function r() {
                        o(), null != t && t(), t = null
                    }

                    function n(e) {
                        o(), a(e), null != t && t(), t = null
                    }

                    function i(e, t) {
                        var o = e["on" + t];
                        null != o && (e["_on" + t] = o)
                    }
                    var a = this.options.error;
                    i(e, "load"), i(e, "error"), s(e, {
                        onload: function() {
                            if (e._onload) try {
                                e._onload.apply(this, Array.prototype.slice.call(arguments, 0))
                            } catch (t) {
                                n({
                                    msg: "onload handler failed " + t + " @ " + e.src
                                })
                            }
                            r()
                        },
                        onerror: function() {
                            if (e._onerror) try {
                                e._onerror.apply(this, Array.prototype.slice.call(arguments, 0))
                            } catch (t) {
                                return void n({
                                    msg: "onerror handler failed " + t + " @ " + e.src
                                })
                            }
                            n({
                                msg: "remote script failed " + e.src
                            })
                        },
                        onreadystatechange: function() {
                            /^(loaded|complete)$/.test(e.readyState) && r()
                        }
                    })
                }, e.prototype._shouldRelease = function(e) {
                    return !/^script$/i.test(e.nodeName) || !!(this.options.releaseAsync && e.src && e.hasAttribute("async"))
                }, e
            }();
        t.default = f
    }, function(e, t, o) {
        ! function(t, o) {
            e.exports = function() {
                return function(e) {
                    function t(r) {
                        if (o[r]) return o[r].exports;
                        var n = o[r] = {
                            exports: {},
                            id: r,
                            loaded: !1
                        };
                        return e[r].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
                    }
                    var o = {};
                    return t.m = e, t.c = o, t.p = "", t(0)
                }([function(e, t, o) {
                    "use strict";
                    var r = o(1),
                        n = function(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            }
                        }(r);
                    e.exports = n.default
                }, function(e, t, o) {
                    "use strict";

                    function r(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t.default = e, t
                    }

                    function n(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    t.__esModule = !0;
                    var i = o(2),
                        s = r(i),
                        a = o(3),
                        d = r(a),
                        c = o(6),
                        p = function(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            }
                        }(c),
                        l = o(5),
                        _ = {
                            comment: /^<!--/,
                            endTag: /^<\//,
                            atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
                            startTag: /^</,
                            chars: /^[^<]/
                        },
                        u = function() {
                            function e() {
                                var t = this,
                                    o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                                    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                n(this, e), this.stream = o;
                                var i = !1,
                                    a = {};
                                for (var d in s) s.hasOwnProperty(d) && (r.autoFix && (a[d + "Fix"] = !0), i = i || a[d + "Fix"]);
                                i ? (this._readToken = (0, p.default)(this, a, function() {
                                    return t._readTokenImpl()
                                }), this._peekToken = (0, p.default)(this, a, function() {
                                    return t._peekTokenImpl()
                                })) : (this._readToken = this._readTokenImpl, this._peekToken = this._peekTokenImpl)
                            }
                            return e.prototype.append = function(e) {
                                this.stream += e
                            }, e.prototype.prepend = function(e) {
                                this.stream = e + this.stream
                            }, e.prototype._readTokenImpl = function() {
                                var e = this._peekTokenImpl();
                                if (e) return this.stream = this.stream.slice(e.length), e
                            }, e.prototype._peekTokenImpl = function() {
                                for (var e in _)
                                    if (_.hasOwnProperty(e) && _[e].test(this.stream)) {
                                        var t = d[e](this.stream);
                                        if (t) return "startTag" === t.type && /script|style/i.test(t.tagName) ? null : (t.text = this.stream.substr(0, t.length), t)
                                    }
                            }, e.prototype.peekToken = function() {
                                return this._peekToken()
                            }, e.prototype.readToken = function() {
                                return this._readToken()
                            }, e.prototype.readTokens = function(e) {
                                for (var t = void 0; t = this.readToken();)
                                    if (e[t.type] && !1 === e[t.type](t)) return
                            }, e.prototype.clear = function() {
                                var e = this.stream;
                                return this.stream = "", e
                            }, e.prototype.rest = function() {
                                return this.stream
                            }, e
                        }();
                    t.default = u, u.tokenToString = function(e) {
                        return e.toString()
                    }, u.escapeAttributes = function(e) {
                        var t = {};
                        for (var o in e) e.hasOwnProperty(o) && (t[o] = (0, l.escapeQuotes)(e[o], null));
                        return t
                    }, u.supports = s;
                    for (var f in s) s.hasOwnProperty(f) && (u.browserHasFlaw = u.browserHasFlaw || !s[f] && f)
                }, function(e, t) {
                    "use strict";
                    t.__esModule = !0;
                    var o = !1,
                        r = !1,
                        n = window.document.createElement("div");
                    try {
                        var i = "<P><I></P></I>";
                        n.innerHTML = i, t.tagSoup = o = n.innerHTML !== i
                    } catch (e) {
                        t.tagSoup = o = !1
                    }
                    try {
                        n.innerHTML = "<P><i><P></P></i></P>", t.selfClose = r = 2 === n.childNodes.length
                    } catch (e) {
                        t.selfClose = r = !1
                    }
                    n = null, t.tagSoup = o, t.selfClose = r
                }, function(e, t, o) {
                    "use strict";

                    function r(e) {
                        var t = e.indexOf("--\x3e");
                        if (t >= 0) return new c.CommentToken(e.substr(4, t - 1), t + 3)
                    }

                    function n(e) {
                        var t = e.indexOf("<");
                        return new c.CharsToken(t >= 0 ? t : e.length)
                    }

                    function i(e) {
                        if (-1 !== e.indexOf(">")) {
                            var t = e.match(p.startTag);
                            if (t) {
                                var o = function() {
                                    var e = {},
                                        o = {},
                                        r = t[2];
                                    return t[2].replace(p.attr, function(t, n) {
                                        arguments[2] || arguments[3] || arguments[4] || arguments[5] ? arguments[5] ? (e[arguments[5]] = "", o[arguments[5]] = !0) : e[n] = arguments[2] || arguments[3] || arguments[4] || p.fillAttr.test(n) && n || "" : e[n] = "", r = r.replace(t, "")
                                    }), {
                                        v: new c.StartTagToken(t[1], t[0].length, e, o, !!t[3], r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))
                                    }
                                }();
                                if ("object" === (void 0 === o ? "undefined" : d(o))) return o.v
                            }
                        }
                    }

                    function s(e) {
                        var t = i(e);
                        if (t) {
                            var o = e.slice(t.length);
                            if (o.match(new RegExp("</\\s*" + t.tagName + "\\s*>", "i"))) {
                                var r = o.match(new RegExp("([\\s\\S]*?)</\\s*" + t.tagName + "\\s*>", "i"));
                                if (r) return new c.AtomicTagToken(t.tagName, r[0].length + t.length, t.attrs, t.booleanAttrs, r[1])
                            }
                        }
                    }

                    function a(e) {
                        var t = e.match(p.endTag);
                        if (t) return new c.EndTagToken(t[1], t[0].length)
                    }
                    t.__esModule = !0;
                    var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    };
                    t.comment = r, t.chars = n, t.startTag = i, t.atomicTag = s, t.endTag = a;
                    var c = o(4),
                        p = {
                            startTag: /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                            endTag: /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
                            attr: /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
                            fillAttr: /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i
                        }
                }, function(e, t, o) {
                    "use strict";

                    function r(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    t.__esModule = !0, t.EndTagToken = t.AtomicTagToken = t.StartTagToken = t.TagToken = t.CharsToken = t.CommentToken = t.Token = void 0;
                    var n = o(5),
                        i = (t.Token = function e(t, o) {
                            r(this, e), this.type = t, this.length = o, this.text = ""
                        }, t.CommentToken = function() {
                            function e(t, o) {
                                r(this, e), this.type = "comment", this.length = o || (t ? t.length : 0), this.text = "", this.content = t
                            }
                            return e.prototype.toString = function() {
                                return "\x3c!--" + this.content
                            }, e
                        }(), t.CharsToken = function() {
                            function e(t) {
                                r(this, e), this.type = "chars", this.length = t, this.text = ""
                            }
                            return e.prototype.toString = function() {
                                return this.text
                            }, e
                        }(), t.TagToken = function() {
                            function e(t, o, n, i, s) {
                                r(this, e), this.type = t, this.length = n, this.text = "", this.tagName = o, this.attrs = i, this.booleanAttrs = s, this.unary = !1, this.html5Unary = !1
                            }
                            return e.formatTag = function(e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                                    o = "<" + e.tagName;
                                for (var r in e.attrs)
                                    if (e.attrs.hasOwnProperty(r)) {
                                        o += " " + r;
                                        var i = e.attrs[r];
                                        void 0 !== e.booleanAttrs && void 0 !== e.booleanAttrs[r] || (o += '="' + (0, n.escapeQuotes)(i) + '"')
                                    } return e.rest && (o += " " + e.rest), o += e.unary && !e.html5Unary ? "/>" : ">", void 0 !== t && null !== t && (o += t + "</" + e.tagName + ">"), o
                            }, e
                        }());
                    t.StartTagToken = function() {
                        function e(t, o, n, i, s, a) {
                            r(this, e), this.type = "startTag", this.length = o, this.text = "", this.tagName = t, this.attrs = n, this.booleanAttrs = i, this.html5Unary = !1, this.unary = s, this.rest = a
                        }
                        return e.prototype.toString = function() {
                            return i.formatTag(this)
                        }, e
                    }(), t.AtomicTagToken = function() {
                        function e(t, o, n, i, s) {
                            r(this, e), this.type = "atomicTag", this.length = o, this.text = "", this.tagName = t, this.attrs = n, this.booleanAttrs = i, this.unary = !1, this.html5Unary = !1, this.content = s
                        }
                        return e.prototype.toString = function() {
                            return i.formatTag(this, this.content)
                        }, e
                    }(), t.EndTagToken = function() {
                        function e(t, o) {
                            r(this, e), this.type = "endTag", this.length = o, this.text = "", this.tagName = t
                        }
                        return e.prototype.toString = function() {
                            return "</" + this.tagName + ">"
                        }, e
                    }()
                }, function(e, t) {
                    "use strict";

                    function o(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                        return e ? e.replace(/([^"]*)"/g, function(e, t) {
                            return /\\/.test(t) ? t + '"' : t + '\\"'
                        }) : t
                    }
                    t.__esModule = !0, t.escapeQuotes = o
                }, function(e, t) {
                    "use strict";

                    function o(e) {
                        return e && "startTag" === e.type && (e.unary = a.test(e.tagName) || e.unary, e.html5Unary = !/\/>$/.test(e.text)), e
                    }

                    function r(e, t) {
                        var r = e.stream,
                            n = o(t());
                        return e.stream = r, n
                    }

                    function n(e, t) {
                        var o = t.pop();
                        e.prepend("</" + o.tagName + ">")
                    }

                    function i() {
                        var e = [];
                        return e.last = function() {
                            return this[this.length - 1]
                        }, e.lastTagNameEq = function(e) {
                            var t = this.last();
                            return t && t.tagName && t.tagName.toUpperCase() === e.toUpperCase()
                        }, e.containsTagName = function(e) {
                            for (var t, o = 0; t = this[o]; o++)
                                if (t.tagName === e) return !0;
                            return !1
                        }, e
                    }

                    function s(e, t, s) {
                        function a() {
                            var t = r(e, s);
                            t && p[t.type] && p[t.type](t)
                        }
                        var c = i(),
                            p = {
                                startTag: function(o) {
                                    var r = o.tagName;
                                    "TR" === r.toUpperCase() && c.lastTagNameEq("TABLE") ? (e.prepend("<TBODY>"), a()) : t.selfCloseFix && d.test(r) && c.containsTagName(r) ? c.lastTagNameEq(r) ? n(e, c) : (e.prepend("</" + o.tagName + ">"), a()) : o.unary || c.push(o)
                                },
                                endTag: function(o) {
                                    c.last() ? t.tagSoupFix && !c.lastTagNameEq(o.tagName) ? n(e, c) : c.pop() : t.tagSoupFix && (s(), a())
                                }
                            };
                        return function() {
                            return a(), o(s())
                        }
                    }
                    t.__esModule = !0, t.default = s;
                    var a = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,
                        d = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i
                }])
            }()
        }()
    }, function(e, t) {
        "use strict";

        function o(e) {
            return void 0 !== e && null !== e
        }

        function r(e) {
            return "function" == typeof e
        }

        function n(e, t, o) {
            var r = void 0,
                n = e && e.length || 0;
            for (r = 0; r < n; r++) t.call(o, e[r], r)
        }

        function i(e, t, o) {
            for (var r in e) e.hasOwnProperty(r) && t.call(o, r, e[r])
        }

        function s(e, t) {
            return e = e || {}, i(t, function(t, r) {
                o(e[t]) || (e[t] = r)
            }), e
        }

        function a(e) {
            try {
                return Array.prototype.slice.call(e)
            } catch (o) {
                var t = function() {
                    var t = [];
                    return n(e, function(e) {
                        t.push(e)
                    }), {
                        v: t
                    }
                }();
                if ("object" === (void 0 === t ? "undefined" : _(t))) return t.v
            }
        }

        function d(e) {
            return e[e.length - 1]
        }

        function c(e, t) {
            return !(!e || "startTag" !== e.type && "atomicTag" !== e.type || !("tagName" in e) || !~e.tagName.toLowerCase().indexOf(t))
        }

        function p(e) {
            return c(e, "script")
        }

        function l(e) {
            return c(e, "style")
        }
        t.__esModule = !0;
        var _ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.existy = o, t.isFunction = r, t.each = n, t.eachKey = i, t.defaults = s, t.toArray = a, t.last = d, t.isTag = c, t.isScript = p, t.isStyle = l
    }])
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], function(o) {
        return t(e, o)
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, require("jquery")) : e.gdpr_lightbox = t(e, e.jQuery || e.Zepto)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function o(e) {
        var t = N();
        return U && e.length ? (e.one(U, t.resolve), setTimeout(t.resolve, 500)) : t.resolve(), t.promise()
    }

    function r(e, o, r) {
        if (1 === arguments.length) return t.extend({}, e);
        if ("string" == typeof o) {
            if (void 0 === r) return void 0 === e[o] ? null : e[o];
            e[o] = r
        } else t.extend(e, o);
        return this
    }

    function n(e) {
        for (var t, o = decodeURI(e.split("#")[0]).split("&"), r = {}, n = 0, i = o.length; n < i; n++) o[n] && (t = o[n].split("="), r[t[0]] = t[1]);
        return r
    }

    function i(e, o) {
        return e + (e.indexOf("?") > -1 ? "&" : "?") + t.param(o)
    }

    function s(e, t) {
        var o = e.indexOf("#");
        return -1 === o ? t : (o > 0 && (e = e.substr(o)), t + e)
    }

    function a(e) {
        return t('<span class="gdpr_lightbox-error"></span>').append(e)
    }

    function d(e, o) {
        var r = o.opener() && o.opener().data("gdpr_lightbox-desc") || "Image with no description",
            n = t('<img src="' + e + '" alt="' + r + '"/>'),
            i = N(),
            s = function() {
                i.reject(a("Failed loading image"))
            };
        return n.on("load", function() {
            if (0 === this.naturalWidth) return s();
            i.resolve(n)
        }).on("error", s), i.promise()
    }

    function c(e, o) {
        var r, n, i;
        try {
            r = t(e)
        } catch (e) {
            return !1
        }
        return !!r.length && (n = t('<i style="display:none !important"></i>'), i = r.hasClass("gdpr_lightbox-hide"), o.element().one("gdpr_lightbox:remove", function() {
            n.before(r).remove(), i && !r.closest(".gdpr_lightbox-content").length && r.addClass("gdpr_lightbox-hide")
        }), r.removeClass("gdpr_lightbox-hide").after(n))
    }

    function p(e) {
        var o = M.exec(e);
        return !!o && f(s(e, i("https://www.youtube" + (o[2] || "") + ".com/embed/" + o[4], t.extend({
            autoplay: 1
        }, n(o[5] || "")))))
    }

    function l(e) {
        var o = P.exec(e);
        return !!o && f(s(e, i("https://player.vimeo.com/video/" + o[3], t.extend({
            autoplay: 1
        }, n(o[4] || "")))))
    }

    function _(e) {
        var o = R.exec(e);
        return !!o && (0 !== e.indexOf("http") && (e = "https:" + e), f(s(e, i("https://www.facebook.com/plugins/video.php?href=" + e, t.extend({
            autoplay: 1
        }, n(o[4] || ""))))))
    }

    function u(e) {
        var t = F.exec(e);
        return !!t && f(s(e, i("https://www.google." + t[3] + "/maps?" + t[6], {
            output: t[6].indexOf("layer=c") > 0 ? "svembed" : "embed"
        })))
    }

    function f(e) {
        return '<div class="gdpr_lightbox-iframe-container"><iframe frameborder="0" allowfullscreen allow="autoplay; fullscreen" src="' + e + '"/></div>'
    }

    function g() {
        return S.documentElement.clientHeight ? S.documentElement.clientHeight : Math.round(C.height())
    }

    function v(e) {
        var t = k();
        t && (27 === e.keyCode && t.options("esc") && t.close(), 9 === e.keyCode && m(e, t))
    }

    function m(e, t) {
        var o = t.element().find(E),
            r = o.index(S.activeElement);
        e.shiftKey && r <= 0 ? (o.get(o.length - 1).focus(), e.preventDefault()) : e.shiftKey || r !== o.length - 1 || (o.get(0).focus(), e.preventDefault())
    }

    function h() {
        t.each(O, function(e, t) {
            t.resize()
        })
    }

    function b(e) {
        1 === O.unshift(e) && (I.addClass("gdpr_lightbox-active"), C.on({
            resize: h,
            keydown: v
        })), t("body > *").not(e.element()).addClass("gdpr_lightbox-hidden").each(function() {
            var e = t(this);
            void 0 === e.data(D) && e.data(D, e.attr(j) || null)
        }).attr(j, "true")
    }

    function y(e) {
        var o;
        e.element().attr(j, "true"), 1 === O.length && (I.removeClass("gdpr_lightbox-active"), C.off({
            resize: h,
            keydown: v
        })), O = t.grep(O, function(t) {
            return e !== t
        }), o = O.length ? O[0].element() : t(".gdpr_lightbox-hidden"), o.removeClass("gdpr_lightbox-hidden").each(function() {
            var e = t(this),
                o = e.data(D);
            o ? e.attr(j, o) : e.removeAttr(j), e.removeData(D)
        })
    }

    function k() {
        return 0 === O.length ? null : O[0]
    }

    function x(e, o, r, n) {
        var i, s = "inline",
            a = t.extend({}, r);
        return n && a[n] ? (i = a[n](e, o), s = n) : (t.each(["inline", "iframe"], function(e, t) {
            delete a[t], a[t] = r[t]
        }), t.each(a, function(t, r) {
            return !r || (!(!r.test || r.test(e, o)) || (i = r(e, o), !1 !== i ? (s = t, !1) : void 0))
        })), {
            handler: s,
            content: i || ""
        }
    }

    function w(e, n, i, s) {
        function a(e) {
            p = t(e).css("max-height", g() + "px"), c.find(".gdpr_lightbox-loader").each(function() {
                var e = t(this);
                o(e).always(function() {
                    e.remove()
                })
            }), c.removeClass("gdpr_lightbox-loading").find(".gdpr_lightbox-content").empty().append(p), _ = !0, p.trigger("gdpr_lightbox:ready", [l])
        }
        var d, c, p, l = this,
            _ = !1,
            u = !1;
        n = t.extend({}, A, n), c = t(n.template), l.element = function() {
            return c
        }, l.opener = function() {
            return i
        }, l.options = t.proxy(r, l, n), l.handlers = t.proxy(r, l, n.handlers), l.resize = function() {
            _ && !u && p.css("max-height", g() + "px").trigger("gdpr_lightbox:resize", [l])
        }, l.close = function() {
            if (_ && !u) {
                u = !0, y(l);
                var e = N();
                if (s && (S.activeElement === c[0] || t.contains(c[0], S.activeElement))) try {
                    s.focus()
                } catch (e) {}
                return p.trigger("gdpr_lightbox:close", [l]), c.removeClass("gdpr_lightbox-opened").addClass("gdpr_lightbox-closed"), o(p.add(c)).always(function() {
                    p.trigger("gdpr_lightbox:remove", [l]), c.remove(), c = void 0, e.resolve()
                }), e.promise()
            }
        }, d = x(e, l, n.handlers, n.handler), c.attr(j, "false").addClass("gdpr_lightbox-loading gdpr_lightbox-opened flatpickr-calendar gdpr_lightbox-" + d.handler).appendTo("body").focus().on("click", "[data-gdpr_lightbox-close]", function(e) {
            t(e.target).is("[data-gdpr_lightbox-close]") && l.close()
        }).trigger("gdpr_lightbox:open", [l]), b(l), t.when(d.content).always(a)
    }

    function T(e, o, r) {
        e.preventDefault ? (e.preventDefault(), r = t(this), e = r.data("gdpr_lightbox-target") || r.attr("href") || r.attr("src")) : r = t(r);
        var n = new w(e, t.extend({}, r.data("gdpr_lightbox-options") || r.data("gdpr_lightbox"), o), r, S.activeElement);
        if (!e.preventDefault) return n
    }
    var S = e.document,
        C = t(e),
        N = t.Deferred,
        I = t("html"),
        O = [],
        j = "aria-hidden",
        D = "gdpr_lightbox-" + j,
        E = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
        A = {
            esc: !0,
            handler: null,
            handlers: {
                image: d,
                inline: c,
                youtube: p,
                vimeo: l,
                googlemaps: u,
                facebookvideo: _,
                iframe: f
            },
            template: '<div class="gdpr_lightbox" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="gdpr_lightbox-wrap" data-gdpr_lightbox-close role="document"><div class="gdpr_lightbox-loader" aria-hidden="true">Loading...</div><div class="gdpr_lightbox-container"><div class="gdpr_lightbox-content"></div><button class="gdpr_lightbox-close" type="button" aria-label="Close (Press escape to close)" data-gdpr_lightbox-close>&times;</button></div></div></div>'
        },
        J = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
        M = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        P = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        F = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
        R = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
        U = function() {
            var e = S.createElement("div"),
                t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var o in t)
                if (void 0 !== e.style[o]) return t[o];
            return !1
        }();
    return d.test = function(e) {
        return J.test(e)
    }, T.options = t.proxy(r, T, A), T.handlers = t.proxy(r, T, A.handlers), T.current = k, t(S).on("click.gdpr_lightbox", "[data-gdpr_lightbox]", T), T
}),
function(e) {
    var t = {
            common: {
                init: function() {
                    "use strict";

                    function t(e) {
                        try {
                            new URLSearchParams(window.location.search).has("gdpr_dbg") && console.warn(e)
                        } catch (e) {
                            console.warn(e)
                        }
                    }

                    function o() {
                        e.post(moove_frontend_gdpr_scripts.ajaxurl, {
                            action: "moove_gdpr_remove_php_cookies"
                        }, function(e) {
                            t("dbg - cookies removed")
                        })
                    }

                    function r() {
                        o();
                        var t = void 0 !== moove_frontend_gdpr_scripts.wp_lang ? moove_frontend_gdpr_scripts.wp_lang : "";
                        e.post(moove_frontend_gdpr_scripts.ajaxurl, {
                            action: "moove_gdpr_get_scripts",
                            strict: 0,
                            thirdparty: 0,
                            advanced: 0,
                            wp_lang: t
                        }, function(e) {
                            var t = {};
                            t.strict = 1, t.thirdparty = 0, t.advanced = 0, m(), n("script_inject", t), p(t)
                        })
                    }

                    function n(e, t) {
                        try {
                            jQuery().gdpr_cookie_compliance_analytics(e, t)
                        } catch (e) {}
                    }

                    function i(e) {
                        try {
                            jQuery().gdpr_cookie_compliance_consent_log(e)
                        } catch (e) {}
                    }

                    function s() {
                        var e = f("moove_gdpr_popup"),
                            t = {};
                        return t.strict = "0", t.thirdparty = "0", t.advanced = "0", e && (e = JSON.parse(e), t.strict = e.strict, t.thirdparty = e.thirdparty, t.advanced = e.advanced, p(t), n("script_inject", e)), void 0 !== moove_frontend_gdpr_scripts.ifbc ? ("strict" === moove_frontend_gdpr_scripts.ifbc && e && 1 === parseInt(e.strict) && a(), "thirdparty" === moove_frontend_gdpr_scripts.ifbc && e && 1 === parseInt(e.thirdparty) && a(), "advanced" === moove_frontend_gdpr_scripts.ifbc && e && 1 === parseInt(e.advanced) && a()) : "1" !== moove_frontend_gdpr_scripts.strict_init && a(), t
                    }

                    function a() {
                        e(document).find("iframe[data-gdpr-iframesrc]").each(function() {
                            e(this).attr("src", e(this).attr("data-gdpr-iframesrc"))
                        })
                    }

                    function d(e) {
                        u("moove_gdpr_popup", JSON.stringify({
                            strict: "1",
                            thirdparty: "1",
                            advanced: "1"
                        }), b), c("enabled-all"), n("accept_all", "")
                    }

                    function c(o) {
                        var r = !1;
                        try {
                            void 0 !== moove_frontend_gdpr_scripts.force_reload && "true" === moove_frontend_gdpr_scripts.force_reload && (r = !0)
                        } catch (e) {}
                        var i = s(),
                            a = moove_frontend_gdpr_scripts.enabled_default.third_party,
                            d = moove_frontend_gdpr_scripts.enabled_default.advanced;
                        if (document.cookie.indexOf("moove_gdpr_popup") >= 0 || 1 == a || 1 == d) {
                            var c = f("moove_gdpr_popup");
                            1 == a && (C.strict = 1, C.thirdparty = a), 1 == d && (C.strict = 1, C.advanced = d), C && (parseInt(i.strict) - parseInt(C.strict) < 0 && (r = !0), parseInt(i.thirdparty) - parseInt(C.thirdparty) < 0 && (r = !0), parseInt(i.advanced) - parseInt(C.advanced) < 0 && (r = !0))
                        }
                        if (r) c = {
                            strict: 0,
                            thirdparty: 0,
                            advanced: 0
                        }, n("script_inject", c), location.reload(!0);
                        else {
                            var p = f("moove_gdpr_popup");
                            t("dbg - inject - 4"), g(p), l(), e("#moove_gdpr_save_popup_settings_button").show()
                        }
                    }

                    function p(t) {
                        t && (n("script_inject", t), 1 === parseInt(t.strict) ? e("#moove_gdpr_strict_cookies").is(":checked") || (e("#moove_gdpr_strict_cookies").click(), e("#third_party_cookies fieldset, #third_party_cookies .gdpr-cc-form-fieldset").removeClass("fl-disabled"), e("#moove_gdpr_performance_cookies").prop("disabled", !1), e("#third_party_cookies .moove-gdpr-strict-secondary-warning-message").slideUp(), e("#advanced-cookies fieldset, #advanced-cookies .gdpr-cc-form-fieldset").removeClass("fl-disabled"), e("#advanced-cookies .moove-gdpr-strict-secondary-warning-message").slideUp(), e("#moove_gdpr_advanced_cookies").prop("disabled", !1)) : e("#moove_gdpr_strict_cookies").is(":checked") && (e("#moove_gdpr_strict_cookies").click().prop("checked", !0), e("#third_party_cookies fieldset, #third_party_cookies .gdpr-cc-form-fieldset").addClass("fl-disabled").closest(".moove-gdpr-status-bar").removeClass("checkbox-selected"), e("#moove_gdpr_performance_cookies").prop("disabled", !0).prop("checked", !1), e("#advanced-cookies fieldset, #advanced-cookies .gdpr-cc-form-fieldset").addClass("fl-disabled").closest(".moove-gdpr-status-bar").removeClass("checkbox-selected"), e("#moove_gdpr_advanced_cookies").prop("disabled", !0).prop("checked", !1)), 1 === parseInt(t.thirdparty) ? e("#moove_gdpr_performance_cookies").is(":checked") || e("#moove_gdpr_performance_cookies").click() : e("#moove_gdpr_performance_cookies").is(":checked") && e("#moove_gdpr_performance_cookies").click(), 1 === parseInt(t.advanced) ? e("#moove_gdpr_advanced_cookies").is(":checked") || e("#moove_gdpr_advanced_cookies").click() : e("#moove_gdpr_advanced_cookies").is(":checked") && e("#moove_gdpr_advanced_cookies").click(), e('input[data-name="moove_gdpr_performance_cookies"]').prop("checked", e("#moove_gdpr_performance_cookies").is(":checked")), e('input[data-name="moove_gdpr_strict_cookies"]').prop("checked", e("#moove_gdpr_strict_cookies").is(":checked")), e('input[data-name="moove_gdpr_advanced_cookies"]').prop("checked", e("#moove_gdpr_advanced_cookies").is(":checked")))
                    }

                    function l() {
                        e("#moove_gdpr_cookie_info_bar").length > 0 && (e("#moove_gdpr_cookie_info_bar").addClass("moove-gdpr-info-bar-hidden"), e("body").removeClass("gdpr-infobar-visible"), e("#moove_gdpr_cookie_info_bar").hide()), window.disable_key_escape=false 
                    }

                    function _() {
                        var o = !0;
                        if ("undefined" != typeof sessionStorage && 1 === parseInt(sessionStorage.getItem("gdpr_infobar_hidden")) && (o = !1), void 0 !== moove_frontend_gdpr_scripts.display_cookie_banner && o) {
                            if ("true" === moove_frontend_gdpr_scripts.display_cookie_banner) e("#moove_gdpr_cookie_info_bar").length > 0 && (e("#moove_gdpr_cookie_info_bar").removeClass("moove-gdpr-info-bar-hidden"), e("#moove_gdpr_save_popup_settings_button:not(.button-visible)").hide(), e("body").addClass("gdpr-infobar-visible"), window.disable_key_escape = true, e("#moove_gdpr_cookie_info_bar").show(), n("show_infobar", ""));
                            else if (e("#moove_gdpr_cookie_info_bar").length > 0) {
                                e("#moove_gdpr_cookie_info_bar").addClass("moove-gdpr-info-bar-hidden"), e("body").removeClass("gdpr-infobar-visible"), window.disable_key_escape=false, e("#moove_gdpr_cookie_info_bar").hide();
                                var r = {
                                    strict: 1,
                                    thirdparty: 1,
                                    advanced: 1
                                };
                                t("dbg - inject - 5"), g(JSON.stringify(r))
                            }
                        } else e("#moove_gdpr_cookie_info_bar").length > 0 && o && (e("#moove_gdpr_cookie_info_bar").removeClass("moove-gdpr-info-bar-hidden"), e("#moove_gdpr_save_popup_settings_button:not(.button-visible)").hide(), e("body").addClass("gdpr-infobar-visible"), window.disable_key_escape = true,  e("#moove_gdpr_cookie_info_bar").show(), n("show_infobar", ""))
                    }

                    function u(e, o, r) {
                        var n;
                        if (r > 0) {
                            var s = new Date;
                            s.setTime(s.getTime() + 24 * r * 60 * 60 * 1e3), n = "; expires=" + s.toGMTString()
                        } else n = "";
                        try {
                            var a = "SameSite=Lax";
                            void 0 !== moove_frontend_gdpr_scripts.cookie_attributes && (a = moove_frontend_gdpr_scripts.cookie_attributes), void 0 !== moove_frontend_gdpr_scripts.gdpr_consent_version && (o = JSON.parse(o), o.version = moove_frontend_gdpr_scripts.gdpr_consent_version, o = JSON.stringify(o)), document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(o) + n + "; path=/; " + a, i(o)
                        } catch (e) {
                            t("error - moove_gdpr_create_cookie: " + e)
                        }
                    }

                    function f(e) {
                        for (var t = encodeURIComponent(e) + "=", o = document.cookie.split(";"), r = 0; r < o.length; r++) {
                            for (var n = o[r];
                                " " === n.charAt(0);) n = n.substring(1, n.length);
                            if (0 === n.indexOf(t)) {
                                var i = decodeURIComponent(n.substring(t.length, n.length)),
                                    s = JSON.parse(i);
                                if (void 0 !== s.version) {
                                    if (void 0 !== moove_frontend_gdpr_scripts.gdpr_consent_version) {
                                        var a = moove_frontend_gdpr_scripts.gdpr_consent_version;
                                        if (parseFloat(a) > parseFloat(s.version)) return document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;", null
                                    }
                                } else if (void 0 !== moove_frontend_gdpr_scripts.gdpr_consent_version && parseFloat(moove_frontend_gdpr_scripts.gdpr_consent_version) > 1) return document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;", null;
                                return i
                            }
                        }
                        return null
                    }

                    function g(t) {
                        if (C = s(), t) {
                            var o = t;
                            t = JSON.parse(t);
                            s();
                            if (!1 !== N) {
                                var i = JSON.parse(N);
                                1 === parseInt(i.thirdparty) && 1 === parseInt(t.thirdparty) && (t.thirdparty = "0"), 1 === parseInt(i.advanced) && 1 === parseInt(t.advanced) && (t.advanced = "0")
                            }
                            if (n("script_inject", t), I = !0, void 0 !== moove_frontend_gdpr_scripts.ifbc ? ("strict" === moove_frontend_gdpr_scripts.ifbc && t && 1 === parseInt(t.strict) && a(), "thirdparty" === moove_frontend_gdpr_scripts.ifbc && t && 1 === parseInt(t.thirdparty) && a(), "advanced" === moove_frontend_gdpr_scripts.ifbc && t && 1 === parseInt(t.advanced) && a()) : 1 === parseInt(t.strict) && a(), void 0 !== moove_frontend_gdpr_scripts.scripts_defined) try {
                                var d = JSON.parse(moove_frontend_gdpr_scripts.scripts_defined);
                                if (1 === parseInt(t.strict)) 1 === parseInt(t.thirdparty) && void 0 === y.thirdparty && (d.thirdparty.header && postscribe(document.head, d.thirdparty.header), d.thirdparty.body && e(d.thirdparty.body).prependTo(document.body), d.thirdparty.footer && postscribe(document.body, d.thirdparty.footer), y.thirdparty = !0), 1 === parseInt(t.advanced) && void 0 === y.advanced && (d.advanced.header && postscribe(document.head, d.advanced.header), d.advanced.body && e(d.advanced.body).prependTo(document.body), d.advanced.footer && postscribe(document.body, d.advanced.footer), y.advanced = !0);
                                else {
                                    var t = f("moove_gdpr_popup");
                                    t && (m(), r())
                                }
                            } catch (e) {
                                console.error(e)
                            } else if (void 0 === y.thirdparty || void 0 === y.advanced) {
                                1 === t.thirdparty && (y.thirdparty = !0), 1 === t.advanced && (y.advanced = !0);
                                var c = void 0 !== moove_frontend_gdpr_scripts.wp_lang ? moove_frontend_gdpr_scripts.wp_lang : "";
                                0 === parseInt(t.thirdparty) && 0 === parseInt(t.advanced) && m(), e.post(moove_frontend_gdpr_scripts.ajaxurl, {
                                    action: "moove_gdpr_get_scripts",
                                    strict: t.strict,
                                    thirdparty: t.thirdparty,
                                    advanced: t.advanced,
                                    wp_lang: c
                                }, function(r) {
                                    N = o, n("script_inject", t);
                                    var i = JSON.parse(r);
                                    i.header && postscribe(document.head, i.header), i.body && e(i.body).prependTo(document.body), i.footer && postscribe(document.body, i.footer)
                                })
                            }
                        } else _()
                    }

                    function v() {
                        var t = !0;
                        e(document).find("#moove_gdpr_cookie_modal input[type=checkbox]").each(function() {
                            e(this).is(":checked") || (t = !1)
                        }), t ? (e(".moove-gdpr-button-holder .moove-gdpr-modal-allow-all").removeClass("button-visible").hide(), e(".moove-gdpr-button-holder .moove-gdpr-modal-save-settings").addClass("button-visible").show()) : e(".moove-gdpr-button-holder .moove-gdpr-modal-allow-all").removeClass("button-visible").show()
                    }

                    function m() {
                        try {
                            e(document).find("script[data-gdpr]").each(function() {
                                t("script_removed: " + e(this).attr("src")), e(this).remove()
                            });
                            for (var o = document.cookie.split(";"), r = window.location.hostname, n = 0; n < o.length; n++) {
                                var i = o[n],
                                    s = i.indexOf("="),
                                    a = s > -1 ? i.substr(0, s) : i;
                                a.includes("woocommerce") || a.includes("moove_gdpr_popup") || a.includes("wordpress") || (document.cookie = a + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=" + r, document.cookie = a + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=." + r, t("cookie removed: " + a + " - " + r))
                            }
                        } catch (e) {
                            t("error in gdpr_delete_all_cookies: " + e)
                        }
                        "undefined" != typeof sessionStorage && sessionStorage.removeItem("gdpr_session")
                    }

                    function h() {
                        var t = f("moove_gdpr_popup");
                        m(), o();
                        var r = "0",
                            n = "0",
                            i = "0",
                            s = !1;
                        t && (t = JSON.parse(t), r = t.strict, n = t.advanced, i = t.thirdparty), e("#moove_gdpr_strict_cookies").length > 0 ? e("#moove_gdpr_strict_cookies").is(":checked") ? (r = "1", s = !0) : r = "0" : (s = !0, r = "1"), e("#moove_gdpr_performance_cookies").is(":checked") ? (i = "1", s = !0) : i = "0", e("#moove_gdpr_advanced_cookies").is(":checked") ? (n = "1", s = !0) : n = "0", !t && s ? (u("moove_gdpr_popup", JSON.stringify({
                            strict: r,
                            thirdparty: i,
                            advanced: n
                        }), b), l(), e("#moove_gdpr_save_popup_settings_button").show()) : t && u("moove_gdpr_popup", JSON.stringify({
                            strict: r,
                            thirdparty: i,
                            advanced: n
                        }), b);
                        var t = f("moove_gdpr_popup");
                        t && (t = JSON.parse(t), "0" == t.strict && "0" == t.advanced && "0" == t.thirdparty && m())
                    }
                    var b = 365,
                        y = [];
					

			setTimeout(function() {	
				
			
				
			}, 1200);
		

                    void 0 !== moove_frontend_gdpr_scripts.cookie_expiration && (b = moove_frontend_gdpr_scripts.cookie_expiration), e(document).on("mouseup", '#moove_gdpr_cookie_info_bar .moove-gdpr-infobar-reject-btn, [href*="#gdpr-reject-cookies"]', function(t) { 
                        t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), m(), r(), e("#moove_gdpr_cookie_info_bar").length > 0 && (e("#moove_gdpr_cookie_info_bar").addClass("moove-gdpr-info-bar-hidden"),  e("body").removeClass("gdpr-infobar-visible"), e("#moove_gdpr_cookie_info_bar").hide(), window.disable_key_escape=false, e("#moove_gdpr_save_popup_settings_button").show()), u("moove_gdpr_popup", JSON.stringify({
                            strict: "1",
                            thirdparty: "0",
                            advanced: "0"
                        }), b), setTimeout(function() {
                            u("moove_gdpr_popup", JSON.stringify({
                                strict: "1",
                                thirdparty: "0",
                                advanced: "0"
                            }), b)
                        }, 500), c("reject-btn")
                    });
                    var k = !1,
                        x = e(".moove_gdpr_modal_theme_v2 .moove-gdpr-tab-main").first(),
                        w = e(".moove_gdpr_modal_theme_v2 .moove-gdpr-tab-main").first(),
                        T = 0,
                        S = 0;
                    e(document).on("keydown", function(t) {
                        if (e("body").hasClass("moove_gdpr_overflow") && e(".moove-gdpr-modal-content").hasClass("moove_gdpr_modal_theme_v1")) {
                            if (38 == t.keyCode) {
                                t.preventDefault();
                                var o = e("#moove-gdpr-menu li.menu-item-selected"),
                                    r = o.prev();
                                0 === r.length && (r = e("#moove-gdpr-menu li").last()), r.find(".moove-gdpr-tab-nav:visible").click(), e(".moove-gdpr-tab-main:visible").focus()
                            }
                            if (40 == t.keyCode || 9 == t.keyCode) {
                                t.preventDefault();
                                var o = e("#moove-gdpr-menu li.menu-item-selected"),
                                    n = o.next();
                                0 === n.length && (n = e("#moove-gdpr-menu li").first()), n.find(".moove-gdpr-tab-nav:visible").click(), e(".moove-gdpr-tab-main:visible").focus()
                            }
                            if (32 == t.keyCode) {
                                t.preventDefault();
                                e(".moove-gdpr-tab-main:visible").find(".moove-gdpr-status-bar input[type=checkbox]").click()
                            }
                            13 == t.keyCode && (t.preventDefault(), e(".moove-gdpr-modal-save-settings").click())
                        }
                        if (e("body").hasClass("moove_gdpr_overflow") && e(".moove-gdpr-modal-content").hasClass("moove_gdpr_modal_theme_v2")) {
                            if (38 == t.keyCode) {
                                t.preventDefault();
                                var o = e("#moove-gdpr-menu li.menu-item-selected"),
                                    r = o.prev();
                                0 === r.length && (r = e("#moove-gdpr-menu li").last()), r.find(".moove-gdpr-tab-nav:visible").click(), e(".moove-gdpr-tab-main:visible").focus()
                            }
                            if (40 == t.keyCode) {
                                t.preventDefault();
                                var o = e("#moove-gdpr-menu li.menu-item-selected"),
                                    n = o.next();
                                0 === n.length && (n = e("#moove-gdpr-menu li").first()), n.find(".moove-gdpr-tab-nav:visible").click(), e(".moove-gdpr-tab-main:visible").focus()
                            }
                            if (32 == t.keyCode) {
                                t.preventDefault();
                                e("#moove_gdpr_cookie_modal").find(".focus-g").click()
                            }
                            if (9 == t.keyCode) {
                                t.preventDefault();
                                var i = e("#moove_gdpr_cookie_modal .cookie-switch, #moove_gdpr_cookie_modal .mgbutton");
                                if (i.length > 0) {
                                    var s = !1;
                                    T < i.length ? (s = i[T], T++) : (T = 0, s = i[T]), e("#moove_gdpr_cookie_modal .focus-g").removeClass("focus-g"), e(s).addClass("focus-g")
                                } else {
                                    e(".cookie-switch").removeClass("focus-g");
                                    var n = x.next();
                                    x = n, 0 === n.length && (n = w, x = w), n.find(".cookie-switch").focus().addClass("focus-g")
                                }
                            }
                            13 == t.keyCode && (t.preventDefault(), e("#moove_gdpr_cookie_modal .focus-g").length > 0 && e("#moove_gdpr_cookie_modal .focus-g").hasClass("mgbutton") ? e("#moove_gdpr_cookie_modal .focus-g").click() : e(".moove-gdpr-modal-save-settings").click())
                        }
                    }), e(document).on("keydown", function(t) {
                        if (e("body").hasClass("gdpr-infobar-visible") && !e("body").hasClass("moove_gdpr_overflow")) {
                            if (9 == t.keyCode) {
                                var o = e("#moove_gdpr_cookie_info_bar button");
                                if (o.length > 0 && S < o.length) {
                                    var r = !1;
                                    t.preventDefault(), S < o.length ? (r = o[S], S++) : (S = 0, r = o[S]), e("#moove_gdpr_cookie_info_bar .focus-g").removeClass("focus-g"), e(r).addClass("focus-g")
                                } else S >= o.length && e("#moove_gdpr_cookie_info_bar .focus-g").removeClass("focus-g")
                            }
                            13 == t.keyCode && e("#moove_gdpr_cookie_info_bar .focus-g").length > 0 && (t.preventDefault(), e("#moove_gdpr_cookie_info_bar .focus-g").click())
                        }
                    }), e.fn.moove_gdpr_read_cookies = function(e) {
                        var t = f("moove_gdpr_popup"),
                            o = {};
                        return o.strict = "0", o.thirdparty = "0", o.advanced = "0", t && (t = JSON.parse(t), o.strict = t.strict, o.thirdparty = t.thirdparty, o.advanced = t.advanced), o
                    };
                    var C = s(),
                        N = !1,
                        I = !1,
                        O = "",
                        j = !1;
                    e(document).on("mouseup", "#moove_gdpr_cookie_info_bar .moove-gdpr-infobar-close-btn", function(t) {
                            t.preventDefault(), t.stopPropagation(), l(), e("#moove_gdpr_save_popup_settings_button").show(), "undefined" != typeof sessionStorage && sessionStorage.setItem("gdpr_infobar_hidden", 1)
                        }), e.fn.moove_gdpr_save_cookie = function(t) {
                            var o = f("moove_gdpr_popup"),
                                i = e(window).scrollTop();
                            if (!o) {
                                if (t.thirdParty) var s = "1";
                                else var s = "0";
                                if (t.advanced) var d = "1";
                                else var d = "0";
                                if (t.scrollEnable) {
                                    var c = t.scrollEnable;
                                    e(window).scroll(function() {
                                        !I && e(this).scrollTop() - i > c && ("undefined" === t.thirdparty && "undefined" === t.advanced || (u("moove_gdpr_popup", JSON.stringify({
                                            strict: "1",
                                            thirdparty: s,
                                            advanced: d
                                        }), b), o = JSON.parse(o), p(o)))
                                    })
                                } else "undefined" === t.thirdparty && "undefined" === t.advanced || (u("moove_gdpr_popup", JSON.stringify({
                                    strict: "1",
                                    thirdparty: s,
                                    advanced: d
                                }), b), o = JSON.parse(o), p(o));
                                if (o = f("moove_gdpr_popup"))
                                    if (o = JSON.parse(o), n("script_inject", o), I = !0, void 0 !== moove_frontend_gdpr_scripts.ifbc ? ("strict" === moove_frontend_gdpr_scripts.ifbc && o && 1 === parseInt(o.strict) && a(), "thirdparty" === moove_frontend_gdpr_scripts.ifbc && o && 1 === parseInt(o.thirdparty) && a(), "advanced" === moove_frontend_gdpr_scripts.ifbc && o && 1 === parseInt(o.advanced) && a()) : 1 === parseInt(o.strict) && a(), void 0 !== moove_frontend_gdpr_scripts.scripts_defined) try {
                                        var l = JSON.parse(moove_frontend_gdpr_scripts.scripts_defined);
                                        if (1 === parseInt(o.strict)) 1 === parseInt(o.thirdparty) && void 0 === y.thirdparty && (l.thirdparty.header && postscribe(document.head, l.thirdparty.header), l.thirdparty.body && e(l.thirdparty.body).prependTo(document.body), l.thirdparty.footer && postscribe(document.body, l.thirdparty.footer), y.thirdparty = !0), 1 === parseInt(o.advanced) && void 0 === y.advanced && (l.advanced.header && postscribe(document.head, l.advanced.header), l.advanced.body && e(l.advanced.body).prependTo(document.body), l.advanced.footer && postscribe(document.body, l.advanced.footer), y.advanced = !0);
                                        else {
                                            var o = f("moove_gdpr_popup");
                                            o && (m(), r())
                                        }
                                    } catch (e) {
                                        console.error(e)
                                    } else if (void 0 === y.thirdparty || void 0 === y.advanced) {
                                        1 === o.thirdparty && (y.thirdparty = !0), 1 === o.advanced && (y.advanced = !0);
                                        var _ = void 0 !== moove_frontend_gdpr_scripts.wp_lang ? moove_frontend_gdpr_scripts.wp_lang : "";
                                        0 === parseInt(o.thirdparty) && 0 === parseInt(o.advanced) && m(), e.post(moove_frontend_gdpr_scripts.ajaxurl, {
                                            action: "moove_gdpr_get_scripts",
                                            strict: o.strict,
                                            thirdparty: o.thirdparty,
                                            advanced: o.advanced,
                                            wp_lang: _
                                        }, function(t) {
                                            N = cookie_input, n("script_inject", o);
                                            var r = JSON.parse(t);
                                            r.header && postscribe(document.head, r.header), r.body && e(r.body).prependTo(document.body), r.footer && postscribe(document.body, r.footer)
                                        })
                                    }
                            }
                        },
                        function() {
                            var o = (location.pathname, e(window).scrollTop());
                            e("#moove_gdpr_save_popup_settings_button").show();
                            var r = moove_frontend_gdpr_scripts.enabled_default.third_party,
                                n = moove_frontend_gdpr_scripts.enabled_default.advanced;
                            if (void 0 !== moove_frontend_gdpr_scripts.enable_on_scroll && "true" === moove_frontend_gdpr_scripts.enable_on_scroll && 1 !== parseInt(r) && 1 !== parseInt(n) && (r = 1, n = 1), document.cookie.indexOf("moove_gdpr_popup") >= 0 || 1 == r || 1 == n) {
                                var i = f("moove_gdpr_popup");
                                if (i) {
                                    var a = s();
                                    "0" == a.strict && "0" == a.advanced && "0" == a.thirdparty && (m(), _())
                                } else {
                                    var d = !1;
                                    if ("undefined" != typeof sessionStorage && (d = sessionStorage.getItem("gdpr_session")), void 0 !== moove_frontend_gdpr_scripts.enable_on_scroll && "true" === moove_frontend_gdpr_scripts.enable_on_scroll) {
                                        if (d) try {
                                            p(JSON.parse(d)), I = !0, t("dbg - inject - 1"), g(d), u("moove_gdpr_popup", d, b), l()
                                        } catch (e) {} else if ((!I && 1 == moove_frontend_gdpr_scripts.enabled_default.third_party || !I && 1 == moove_frontend_gdpr_scripts.enabled_default.advanced) && (i = {
                                                strict: 1,
                                                thirdparty: r,
                                                advanced: n
                                            }, p(i), i = JSON.stringify(i), k = !0, _(), t("dbg - default scroll inject")), void 0 !== moove_frontend_gdpr_scripts.gdpr_aos_hide && ("1" === moove_frontend_gdpr_scripts.gdpr_aos_hide || "true" === moove_frontend_gdpr_scripts.gdpr_aos_hide || "object" == typeof moove_frontend_gdpr_scripts.gdpr_aos_hide && moove_frontend_gdpr_scripts.gdpr_aos_hide.includes("1")) && (t("dbg - enable on scroll - enter"), e(window).scroll(function() {
                                                if ((!I || k) && e(this).scrollTop() - o > 200) {
                                                    i = {
                                                        strict: 1,
                                                        thirdparty: r,
                                                        advanced: n
                                                    }, f("moove_gdpr_popup") || "undefined" != typeof sessionStorage && ((d = sessionStorage.getItem("gdpr_session")) || (sessionStorage.setItem("gdpr_session", JSON.stringify(i)), d = sessionStorage.getItem("gdpr_session")));
                                                    try {
                                                        p(i), i = JSON.stringify(i), _(), I = !0, t("dbg - inject - 2 - accept on scroll"), k || g(i), k = !1, u("moove_gdpr_popup", i, b), l(), c("check reload on scroll"), e("#moove_gdpr_save_popup_settings_button").show()
                                                    } catch (e) {}
                                                }
                                            })), void 0 !== moove_frontend_gdpr_scripts.gdpr_aos_hide && ("2" === moove_frontend_gdpr_scripts.gdpr_aos_hide || "object" == typeof moove_frontend_gdpr_scripts.gdpr_aos_hide && moove_frontend_gdpr_scripts.gdpr_aos_hide.includes("2"))) {
                                            var v = 30;
                                            if (void 0 !== moove_frontend_gdpr_scripts.gdpr_aos_hide_seconds) var v = parseInt(moove_frontend_gdpr_scripts.gdpr_aos_hide_seconds);
                                            t("dbg - hidetimer - enter, seconds: " + v), setTimeout(function() {
                                                if (t("dbg - hidetimer - is_created: " + I), !I) {
                                                    i = {
                                                        strict: 1,
                                                        thirdparty: r,
                                                        advanced: n
                                                    };
                                                    var o = f("moove_gdpr_popup");
                                                    t("dbg - hidetimer - cookies_stored: " + o), o || "undefined" != typeof sessionStorage && ((d = sessionStorage.getItem("gdpr_session")) || (sessionStorage.setItem("gdpr_session", JSON.stringify(i)), d = sessionStorage.getItem("gdpr_session")));
                                                    try {
                                                        p(i), i = JSON.stringify(i), _(), I = !0, t("dbg - inject - 2a"), g(i), u("moove_gdpr_popup", i, b), c("check reload hidetimer")
                                                    } catch (e) {}
                                                }
                                                l(), e("#moove_gdpr_save_popup_settings_button").show()
                                            }, 1e3 * v)
                                        }
                                    } else i = {
                                        strict: 1,
                                        thirdparty: r,
                                        advanced: n
                                    }, p(i), i = JSON.stringify(i), _()
                                }
                                t("dbg - inject - 3"), g(i)
                            } else _()
                        }(), e(document).on("click", '[data-href*="#moove_gdpr_cookie_modal"],[href*="#moove_gdpr_cookie_modal"]', function(t) {
                            t.preventDefault(), e("#moove_gdpr_cookie_modal").length > 0 && (j = !0, O = gdpr_lightbox("#moove_gdpr_cookie_modal"), e(".gdpr_lightbox").addClass("moove_gdpr_cookie_modal_open"), e(document).moove_gdpr_lightbox_open(), n("opened_modal_from_link", ""))
                        }), e(document).on("click", '[data-href*="#gdpr_cookie_modal"],[href*="#gdpr_cookie_modal"]', function(t) {
                            t.preventDefault(), e("#moove_gdpr_cookie_modal").length > 0 && (j = !0, O = gdpr_lightbox("#moove_gdpr_cookie_modal"), e(".gdpr_lightbox").addClass("moove_gdpr_cookie_modal_open"), e(document).moove_gdpr_lightbox_open(), n("opened_modal_from_link", ""))
                        }), e(document).on("click", "#moove_gdpr_cookie_info_bar .moove-gdpr-close-modal-button a, #moove_gdpr_cookie_info_bar .moove-gdpr-close-modal-button button", function(e) {
                            e.preventDefault()
                        }), e(document).on("click", ".moove-gdpr-modal-close", function(t) {
                            t.preventDefault(), e(".gdpr_lightbox .gdpr_lightbox-close").click(), e(document).moove_gdpr_lightbox_close()
                        }), e(document).on("click", "#moove-gdpr-menu .moove-gdpr-tab-nav", function(t) {
                            t.preventDefault(), t.stopPropagation(), e("#moove-gdpr-menu li").removeClass("menu-item-selected"), e(this).parent().addClass("menu-item-selected"), e(".moove-gdpr-tab-content .moove-gdpr-tab-main").hide(), e(e(this).attr("href")).show(), e(e(this).attr("data-href")).show(), n("clicked_to_tab", e(this).attr("data-href"))
                        }), e(document).on("gdpr_lightbox:close", function(t, o) {
                            e(document).moove_gdpr_lightbox_close()
                        }), e.fn.moove_gdpr_lightbox_close = function(t) {
                            j && (e("body").removeClass("moove_gdpr_overflow"), j = !1)
                        }, e.fn.moove_gdpr_lightbox_open = function(t) {
                            if (j) {
                                e("body").addClass("moove_gdpr_overflow");
                                var o = f("moove_gdpr_popup");
                                "none" === moove_frontend_gdpr_scripts.show_icons && e("body").addClass("gdpr-no-icons"), e(".moove-gdpr-status-bar input[type=checkbox]").each(function() {
                                    e(this).is(":checked") ? e(this).closest(".moove-gdpr-tab-main").find(".moove-gdpr-strict-warning-message").slideUp() : e(this).closest(".moove-gdpr-tab-main").find(".moove-gdpr-strict-warning-message").slideDown()
                                }), o ? (o = JSON.parse(o), p(o)) : e("#moove_gdpr_strict_cookies").is(":checked") || (e("#advanced-cookies .gdpr-cc-form-fieldset").addClass("fl-disabled"), e("#third_party_cookies .gdpr-cc-form-fieldset").addClass("fl-disabled")), void 0 !== typeof moove_frontend_gdpr_scripts.hide_save_btn && "true" === moove_frontend_gdpr_scripts.hide_save_btn ? e(".moove-gdpr-modal-save-settings").removeClass("button-visible").hide() : e(".moove-gdpr-modal-save-settings").addClass("button-visible").show(), v()
                            }
                        }, e(document).on("gdpr_lightbox:open", function(t, o) {
                            e(document).moove_gdpr_lightbox_open()
                        }), e(document).on("click", ".fl-disabled", function(t) {
                            e("#moove_gdpr_cookie_modal .moove-gdpr-modal-content").is(".moove_gdpr_modal_theme_v2") ? (e("#moove_gdpr_strict_cookies").click(), e(this).click()) : e(this).closest(".moove-gdpr-tab-main-content").find(".moove-gdpr-strict-secondary-warning-message").slideDown()
                        }), e(document).on("change", ".moove-gdpr-status-bar input[type=checkbox]", function(t) {
                            e(".moove-gdpr-modal-save-settings").addClass("button-visible").show(), e(".moove-gdpr-modal-allow-all").removeClass("button-visible").hide();
                            var o = e(this).closest(".moove-gdpr-tab-main").attr("id");
                            e(this).closest(".moove-gdpr-status-bar").toggleClass("checkbox-selected"), e(this).closest(".moove-gdpr-tab-main").toggleClass("checkbox-selected"), e("#moove-gdpr-menu .menu-item-" + o).toggleClass("menu-item-off"), e(this).is(":checked") ? e(this).closest(".moove-gdpr-tab-main").find(".moove-gdpr-strict-warning-message").slideUp() : e(this).closest(".moove-gdpr-tab-main").find(".moove-gdpr-strict-warning-message").slideDown(), e(this).is("#moove_gdpr_strict_cookies") && (e(this).is(":checked") ? (e("#third_party_cookies fieldset, #third_party_cookies .gdpr-cc-form-fieldset").removeClass("fl-disabled"), e("#moove_gdpr_performance_cookies").prop("disabled", !1), e("#third_party_cookies .moove-gdpr-strict-secondary-warning-message").slideUp(), e("#advanced-cookies fieldset, #advanced-cookies .gdpr-cc-form-fieldset").removeClass("fl-disabled"), e("#advanced-cookies .moove-gdpr-strict-secondary-warning-message").slideUp(), e("#moove_gdpr_advanced_cookies").prop("disabled", !1)) : (e(".gdpr_cookie_settings_shortcode_content").find("input").each(function() {
                                e(this).prop("checked", !1)
                            }), e("#third_party_cookies fieldset, #third_party_cookies .gdpr-cc-form-fieldset").addClass("fl-disabled").closest(".moove-gdpr-status-bar").removeClass("checkbox-selected"), e("#moove_gdpr_performance_cookies").prop("disabled", !0).prop("checked", !1), e("#advanced-cookies fieldset, #advanced-cookies .gdpr-cc-form-fieldset").addClass("fl-disabled").closest(".moove-gdpr-status-bar").removeClass("checkbox-selected"), e("#moove_gdpr_advanced_cookies").prop("disabled", !0).prop("checked", !1))), e('input[data-name="' + e(this).attr("name") + '"]').prop("checked", e(this).is(":checked")), v()
                        }), e(document).on("click", ".gdpr_cookie_settings_shortcode_content a.gdpr-shr-save-settings", function(t) {
                            t.preventDefault(), h(), e(".gdpr_lightbox .gdpr_lightbox-close").click(), e(document).moove_gdpr_lightbox_close(), c("modal-save-settings")
                        }), e(document).on("change", ".gdpr_cookie_settings_shortcode_content input[type=checkbox]", function(t) {
                            var o = e(this).attr("data-name"),
                                r = e("#" + o);
                            e(this).is(":checked") ? (e('input[data-name="' + o + '"]').prop("checked", !0), "moove_gdpr_strict_cookies" !== e(this).attr("data-name") && (e(this).closest(".gdpr_cookie_settings_shortcode_content").find('input[data-name="moove_gdpr_strict_cookies"]').is(":checked") || (e('input[data-name="' + o + '"]').prop("checked", !1), e('.gdpr_cookie_settings_shortcode_content input[data-name="moove_gdpr_strict_cookies"]').closest(".gdpr-shr-switch").css("transform", "scale(1.2)"), setTimeout(function() {
                                e('.gdpr_cookie_settings_shortcode_content input[data-name="moove_gdpr_strict_cookies"]').closest(".gdpr-shr-switch").css("transform", "scale(1)")
                            }, 300)))) : (e('input[data-name="' + o + '"]').prop("checked", e(this).is(":checked")), "moove_gdpr_strict_cookies" === e(this).attr("data-name") && e(".gdpr_cookie_settings_shortcode_content").find('input[type="checkbox"]').prop("checked", !1)), r.click()
                        }), e(document).on("mouseup", '.moove-gdpr-modal-allow-all, [href*="#gdpr-accept-cookies"]', function(t) {
                            t.preventDefault(), t.stopPropagation(), e("#moove_gdpr_cookie_modal").find("input[type=checkbox]").each(function() {
                                var t = e(this);
                                t.is(":checked") || t.click()
                            }), d("enable_all enable-all-button"), e(".gdpr_lightbox .gdpr_lightbox-close").click(), l(), h(), e(document).moove_gdpr_lightbox_close()
                        }), e(document).on("click", ".moove-gdpr-infobar-allow-all", function(e) {
                            e.preventDefault(), e.stopPropagation(), d("enable_all allow-btn")
                        }), e(document).on("click", ".moove-gdpr-modal-save-settings", function(t) {
                            t.preventDefault(), t.stopPropagation(), h(), e(".gdpr_lightbox .gdpr_lightbox-close").click(), e(document).moove_gdpr_lightbox_close(), c("modal-save-settings")
                        });
                    if (window.location.hash) {
                        var D = window.location.hash.substring(1);
                        "moove_gdpr_cookie_modal" !== D && "gdpr_cookie_modal" !== D || (j = !0, n("opened_modal_from_link", ""), setTimeout(function() {
                            e("#moove_gdpr_cookie_modal").length > 0 && (O = gdpr_lightbox("#moove_gdpr_cookie_modal"), e(".gdpr_lightbox").addClass("moove_gdpr_cookie_modal_open"), e(document).moove_gdpr_lightbox_open())
                        }, 500)), "gdpr-accept-cookies" === D && (e("#moove_gdpr_cookie_modal").find("input[type=checkbox]").each(function() {
                            var t = e(this);
                            t.is(":checked") || t.click()
                        }), d("enable_all enable-all-button"), e(".gdpr_lightbox .gdpr_lightbox-close").click(), l(), h(), e(document).moove_gdpr_lightbox_close()), "gdpr-reject-cookies" === D && (m(), r(), e("#moove_gdpr_cookie_info_bar").length > 0 && (e("#moove_gdpr_cookie_info_bar").addClass("moove-gdpr-info-bar-hidden"), e("body").removeClass("gdpr-infobar-visible"), window.disable_key_escape=false, e("#moove_gdpr_cookie_info_bar").hide(), e("#moove_gdpr_save_popup_settings_button").show()), _(), u("moove_gdpr_popup", JSON.stringify({
                            strict: "1",
                            thirdparty: "0",
                            advanced: "0"
                        }), b), setTimeout(function() {
                            u("moove_gdpr_popup", JSON.stringify({
                                strict: "1",
                                thirdparty: "0",
                                advanced: "0"
                            }), b)
                        }, 500))
                    }
                },
                finalize: function() {}
            }
        },
        o = {
            fire: function(e, o, r) {
                var n, i = t;
                o = void 0 === o ? "init" : o, n = "" !== e, n = n && i[e], (n = n && "function" == typeof i[e][o]) && i[e][o](r)
            },
            loadEvents: function() {
                var t = !1;
                void 0 !== moove_frontend_gdpr_scripts.geo_location && "true" === moove_frontend_gdpr_scripts.geo_location ? jQuery.post(moove_frontend_gdpr_scripts.ajaxurl, {
                    action: "moove_gdpr_localize_scripts"
                }, function(e) {
                    var r = JSON.parse(e);
                    void 0 !== r.display_cookie_banner && (moove_frontend_gdpr_scripts.display_cookie_banner = r.display_cookie_banner), void 0 !== r.enabled_default && (moove_frontend_gdpr_scripts.enabled_default = r.enabled_default), t || (t = !0, o.fire("common"))
                }) : o.fire("common"), e.each(document.body.className.replace(/-/g, "_").split(/\s+/), function(e, t) {
                    o.fire(t), o.fire(t, "finalize")
                }), o.fire("common", "finalize")
            }
        };
    e(document).ready(o.loadEvents)


    jQuery("#moove_gdpr_strict_cookies").on("change", function(e) {
        jQuery("#moove_gdpr_advanced_cookies").prop("checked", e.target.checked);
    });

}(jQuery);