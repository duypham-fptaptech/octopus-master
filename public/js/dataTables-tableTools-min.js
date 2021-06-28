/*!
 TableTools 2.2.2
 2009-2014 SpryMedia Ltd - datatables.net/license

 ZeroClipboard 1.0.4
 Author: Joseph Huckaby - MIT licensed
*/
var TableTools;
(function (m, k, p) {
    var r = function (n) {
        var g = {
            version: "1.0.4-TableTools2", clients: {}, moviePath: "", nextId: 1, $: function (a) {
                "string" == typeof a && (a = k.getElementById(a));
                a.addClass || (a.hide = function () {
                    this.style.display = "none"
                }, a.show = function () {
                    this.style.display = ""
                }, a.addClass = function (a) {
                    this.removeClass(a);
                    this.className += " " + a
                }, a.removeClass = function (a) {
                    this.className = this.className.replace(RegExp("\\s*" + a + "\\s*"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
                }, a.hasClass = function (a) {
                    return !!this.className.match(RegExp("\\s*" + a +
                        "\\s*"))
                });
                return a
            }, setMoviePath: function (a) {
                this.moviePath = a
            }, dispatch: function (a, b, c) {
                (a = this.clients[a]) && a.receiveEvent(b, c)
            }, register: function (a, b) {
                this.clients[a] = b
            }, getDOMObjectPosition: function (a) {
                var b = {
                    left: 0,
                    top: 0,
                    width: a.width ? a.width : a.offsetWidth,
                    height: a.height ? a.height : a.offsetHeight
                };
                "" !== a.style.width && (b.width = a.style.width.replace("px", ""));
                "" !== a.style.height && (b.height = a.style.height.replace("px", ""));
                for (; a;) b.left += a.offsetLeft, b.top += a.offsetTop, a = a.offsetParent;
                return b
            },
            Client: function (a) {
                this.handlers = {};
                this.id = g.nextId++;
                this.movieId = "ZeroClipboard_TableToolsMovie_" + this.id;
                g.register(this.id, this);
                a && this.glue(a)
            }
        };
        g.Client.prototype = {
            id: 0,
            ready: !1,
            movie: null,
            clipText: "",
            fileName: "",
            action: "copy",
            handCursorEnabled: !0,
            cssEffects: !0,
            handlers: null,
            sized: !1,
            glue: function (a, b) {
                this.domElement = g.$(a);
                var c = 99;
                this.domElement.style.zIndex && (c = parseInt(this.domElement.style.zIndex, 10) + 1);
                var d = g.getDOMObjectPosition(this.domElement);
                this.div = k.createElement("div");
                var e =
                    this.div.style;
                e.position = "absolute";
                e.left = "0px";
                e.top = "0px";
                e.width = d.width + "px";
                e.height = d.height + "px";
                e.zIndex = c;
                "undefined" != typeof b && "" !== b && (this.div.title = b);
                0 !== d.width && 0 !== d.height && (this.sized = !0);
                this.domElement && (this.domElement.appendChild(this.div), this.div.innerHTML = this.getHTML(d.width, d.height).replace(/&/g, "&amp;"))
            },
            positionElement: function () {
                var a = g.getDOMObjectPosition(this.domElement), b = this.div.style;
                b.position = "absolute";
                b.width = a.width + "px";
                b.height = a.height + "px";
                0 !== a.width &&
                0 !== a.height && (this.sized = !0, b = this.div.childNodes[0], b.width = a.width, b.height = a.height)
            },
            getHTML: function (a, b) {
                var c = "", d = "id=" + this.id + "&width=" + a + "&height=" + b;
                if (navigator.userAgent.match(/MSIE/)) var e = location.href.match(/^https/i) ? "https://" : "http://",
                    c = c + ('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + e + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="' + a + '" height="' + b + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' +
                        g.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + d + '"/><param name="wmode" value="transparent"/></object>'); else c += '<embed id="' + this.movieId + '" src="' + g.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + a + '" height="' + b + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' +
                    d + '" wmode="transparent" />';
                return c
            },
            hide: function () {
                this.div && (this.div.style.left = "-2000px")
            },
            show: function () {
                this.reposition()
            },
            destroy: function () {
                if (this.domElement && this.div) {
                    this.hide();
                    this.div.innerHTML = "";
                    var a = k.getElementsByTagName("body")[0];
                    try {
                        a.removeChild(this.div)
                    } catch (b) {
                    }
                    this.div = this.domElement = null
                }
            },
            reposition: function (a) {
                a && ((this.domElement = g.$(a)) || this.hide());
                if (this.domElement && this.div) {
                    var a = g.getDOMObjectPosition(this.domElement), b = this.div.style;
                    b.left = "" + a.left +
                        "px";
                    b.top = "" + a.top + "px"
                }
            },
            clearText: function () {
                this.clipText = "";
                this.ready && this.movie.clearText()
            },
            appendText: function (a) {
                this.clipText += a;
                this.ready && this.movie.appendText(a)
            },
            setText: function (a) {
                this.clipText = a;
                this.ready && this.movie.setText(a)
            },
            setCharSet: function (a) {
                this.charSet = a;
                this.ready && this.movie.setCharSet(a)
            },
            setBomInc: function (a) {
                this.incBom = a;
                this.ready && this.movie.setBomInc(a)
            },
            setFileName: function (a) {
                this.fileName = a;
                this.ready && this.movie.setFileName(a)
            },
            setAction: function (a) {
                this.action =
                    a;
                this.ready && this.movie.setAction(a)
            },
            addEventListener: function (a, b) {
                a = a.toString().toLowerCase().replace(/^on/, "");
                this.handlers[a] || (this.handlers[a] = []);
                this.handlers[a].push(b)
            },
            setHandCursor: function (a) {
                this.handCursorEnabled = a;
                this.ready && this.movie.setHandCursor(a)
            },
            setCSSEffects: function (a) {
                this.cssEffects = !!a
            },
            receiveEvent: function (a, b) {
                var c, a = a.toString().toLowerCase().replace(/^on/, "");
                switch (a) {
                    case "load":
                        this.movie = k.getElementById(this.movieId);
                        if (!this.movie) {
                            c = this;
                            setTimeout(function () {
                                c.receiveEvent("load",
                                    null)
                            }, 1);
                            return
                        }
                        if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                            c = this;
                            setTimeout(function () {
                                c.receiveEvent("load", null)
                            }, 100);
                            this.ready = !0;
                            return
                        }
                        this.ready = !0;
                        this.movie.clearText();
                        this.movie.appendText(this.clipText);
                        this.movie.setFileName(this.fileName);
                        this.movie.setAction(this.action);
                        this.movie.setCharSet(this.charSet);
                        this.movie.setBomInc(this.incBom);
                        this.movie.setHandCursor(this.handCursorEnabled);
                        break;
                    case "mouseover":
                        this.domElement && this.cssEffects &&
                        this.recoverActive && this.domElement.addClass("active");
                        break;
                    case "mouseout":
                        this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0));
                        break;
                    case "mousedown":
                        this.domElement && this.cssEffects && this.domElement.addClass("active");
                        break;
                    case "mouseup":
                        this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
                }
                if (this.handlers[a]) for (var d = 0, e = this.handlers[a].length; d <
                e; d++) {
                    var f = this.handlers[a][d];
                    if ("function" == typeof f) f(this, b); else if ("object" == typeof f && 2 == f.length) f[0][f[1]](this, b); else if ("string" == typeof f) m[f](this, b)
                }
            }
        };
        m.ZeroClipboard_TableTools = g;
        var f = jQuery;
        TableTools = function (a, b) {
            !this instanceof TableTools && alert("Warning: TableTools must be initialised with the keyword 'new'");
            this.s = {
                that: this,
                dt: f.fn.dataTable.Api ? (new f.fn.dataTable.Api(a)).settings()[0] : a.fnSettings(),
                print: {
                    saveStart: -1, saveLength: -1, saveScroll: -1, funcEnd: function () {
                    }
                },
                buttonCounter: 0,
                select: {
                    type: "",
                    selected: [],
                    preRowSelect: null,
                    postSelected: null,
                    postDeselected: null,
                    all: !1,
                    selectedClass: ""
                },
                custom: {},
                swfPath: "",
                buttonSet: [],
                master: !1,
                tags: {}
            };
            this.dom = {
                container: null,
                table: null,
                print: {hidden: [], message: null},
                collection: {collection: null, background: null}
            };
            this.classes = f.extend(!0, {}, TableTools.classes);
            this.s.dt.bJUI && f.extend(!0, this.classes, TableTools.classes_themeroller);
            this.fnSettings = function () {
                return this.s
            };
            "undefined" == typeof b && (b = {});
            TableTools._aInstances.push(this);
            this._fnConstruct(b);
            return this
        };
        TableTools.prototype = {
            fnGetSelected: function (a) {
                var b = [], c = this.s.dt.aoData, d = this.s.dt.aiDisplay, e;
                if (a) {
                    a = 0;
                    for (e = d.length; a < e; a++) c[d[a]]._DTTT_selected && b.push(c[d[a]].nTr)
                } else {
                    a = 0;
                    for (e = c.length; a < e; a++) c[a]._DTTT_selected && b.push(c[a].nTr)
                }
                return b
            }, fnGetSelectedData: function () {
                var a = [], b = this.s.dt.aoData, c, d;
                c = 0;
                for (d = b.length; c < d; c++) b[c]._DTTT_selected && a.push(this.s.dt.oInstance.fnGetData(c));
                return a
            }, fnGetSelectedIndexes: function (a) {
                var b = [], c = this.s.dt.aoData,
                    d = this.s.dt.aiDisplay, e;
                if (a) {
                    a = 0;
                    for (e = d.length; a < e; a++) c[d[a]]._DTTT_selected && b.push(d[a])
                } else {
                    a = 0;
                    for (e = c.length; a < e; a++) c[a]._DTTT_selected && b.push(a)
                }
                return b
            }, fnIsSelected: function (a) {
                a = this.s.dt.oInstance.fnGetPosition(a);
                return !0 === this.s.dt.aoData[a]._DTTT_selected ? !0 : !1
            }, fnSelectAll: function (a) {
                this._fnRowSelect(a ? this.s.dt.aiDisplay : this.s.dt.aoData)
            }, fnSelectNone: function (a) {
                this._fnRowDeselect(this.fnGetSelectedIndexes(a))
            }, fnSelect: function (a) {
                "single" == this.s.select.type && this.fnSelectNone();
                this._fnRowSelect(a)
            }, fnDeselect: function (a) {
                this._fnRowDeselect(a)
            }, fnGetTitle: function (a) {
                var b = "";
                "undefined" != typeof a.sTitle && "" !== a.sTitle ? b = a.sTitle : (a = k.getElementsByTagName("title"), 0 < a.length && (b = a[0].innerHTML));
                return 4 > "¡".toString().length ? b.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "") : b.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g, "")
            }, fnCalcColRatios: function (a) {
                var b = this.s.dt.aoColumns, a = this._fnColumnTargets(a.mColumns), c = [], d = 0, e = 0, f, i;
                f = 0;
                for (i = a.length; f < i; f++) a[f] && (d = b[f].nTh.offsetWidth,
                    e += d, c.push(d));
                f = 0;
                for (i = c.length; f < i; f++) c[f] /= e;
                return c.join("\t")
            }, fnGetTableData: function (a) {
                if (this.s.dt) return this._fnGetDataTablesData(a)
            }, fnSetText: function (a, b) {
                this._fnFlashSetText(a, b)
            }, fnResizeButtons: function () {
                for (var a in g.clients) if (a) {
                    var b = g.clients[a];
                    "undefined" != typeof b.domElement && b.domElement.parentNode && b.positionElement()
                }
            }, fnResizeRequired: function () {
                for (var a in g.clients) if (a) {
                    var b = g.clients[a];
                    if ("undefined" != typeof b.domElement && b.domElement.parentNode == this.dom.container &&
                        !1 === b.sized) return !0
                }
                return !1
            }, fnPrint: function (a, b) {
                b === p && (b = {});
                a === p || a ? this._fnPrintStart(b) : this._fnPrintEnd()
            }, fnInfo: function (a, b) {
                var c = f("<div/>").addClass(this.classes.print.info).html(a).appendTo("body");
                setTimeout(function () {
                    c.fadeOut("normal", function () {
                        c.remove()
                    })
                }, b)
            }, fnContainer: function () {
                return this.dom.container
            }, _fnConstruct: function (a) {
                var b = this;
                this._fnCustomiseSettings(a);
                this.dom.container = k.createElement(this.s.tags.container);
                this.dom.container.className = this.classes.container;
                "none" != this.s.select.type && this._fnRowSelectConfig();
                this._fnButtonDefinations(this.s.buttonSet, this.dom.container);
                this.s.dt.aoDestroyCallback.push({
                    sName: "TableTools", fn: function () {
                        f(b.s.dt.nTBody).off("click.DTTT_Select", "tr");
                        f(b.dom.container).empty();
                        var a = f.inArray(b, TableTools._aInstances);
                        -1 !== a && TableTools._aInstances.splice(a, 1)
                    }
                })
            }, _fnCustomiseSettings: function (a) {
                "undefined" == typeof this.s.dt._TableToolsInit && (this.s.master = !0, this.s.dt._TableToolsInit = !0);
                this.dom.table = this.s.dt.nTable;
                this.s.custom = f.extend({}, TableTools.DEFAULTS, a);
                this.s.swfPath = this.s.custom.sSwfPath;
                "undefined" != typeof g && (g.moviePath = this.s.swfPath);
                this.s.select.type = this.s.custom.sRowSelect;
                this.s.select.preRowSelect = this.s.custom.fnPreRowSelect;
                this.s.select.postSelected = this.s.custom.fnRowSelected;
                this.s.select.postDeselected = this.s.custom.fnRowDeselected;
                this.s.custom.sSelectedClass && (this.classes.select.row = this.s.custom.sSelectedClass);
                this.s.tags = this.s.custom.oTags;
                this.s.buttonSet = this.s.custom.aButtons
            },
            _fnButtonDefinations: function (a, b) {
                for (var c, d = 0, e = a.length; d < e; d++) {
                    if ("string" == typeof a[d]) {
                        if ("undefined" == typeof TableTools.BUTTONS[a[d]]) {
                            alert("TableTools: Warning - unknown button type: " + a[d]);
                            continue
                        }
                        c = f.extend({}, TableTools.BUTTONS[a[d]], !0)
                    } else {
                        if ("undefined" == typeof TableTools.BUTTONS[a[d].sExtends]) {
                            alert("TableTools: Warning - unknown button type: " + a[d].sExtends);
                            continue
                        }
                        c = f.extend({}, TableTools.BUTTONS[a[d].sExtends], !0);
                        c = f.extend(c, a[d], !0)
                    }
                    (c = this._fnCreateButton(c, f(b).hasClass(this.classes.collection.container))) &&
                    b.appendChild(c)
                }
            }, _fnCreateButton: function (a, b) {
                var c = this._fnButtonBase(a, b);
                if (a.sAction.match(/flash/)) {
                    if (!this._fnHasFlash()) return !1;
                    this._fnFlashConfig(c, a)
                } else "text" == a.sAction ? this._fnTextConfig(c, a) : "div" == a.sAction ? this._fnTextConfig(c, a) : "collection" == a.sAction && (this._fnTextConfig(c, a), this._fnCollectionConfig(c, a));
                return c
            }, _fnButtonBase: function (a, b) {
                var c, d, e;
                b ? (c = a.sTag && "default" !== a.sTag ? a.sTag : this.s.tags.collection.button, d = a.sLinerTag && "default" !== a.sLinerTag ? a.sLiner : this.s.tags.collection.liner,
                    e = this.classes.collection.buttons.normal) : (c = a.sTag && "default" !== a.sTag ? a.sTag : this.s.tags.button, d = a.sLinerTag && "default" !== a.sLinerTag ? a.sLiner : this.s.tags.liner, e = this.classes.buttons.normal);
                c = k.createElement(c);
                d = k.createElement(d);
                var f = this._fnGetMasterSettings();
                c.className = e + " " + a.sButtonClass;
                c.setAttribute("id", "ToolTables_" + this.s.dt.sInstance + "_" + f.buttonCounter);
                c.appendChild(d);
                d.innerHTML = a.sButtonText;
                f.buttonCounter++;
                return c
            }, _fnGetMasterSettings: function () {
                if (this.s.master) return this.s;
                for (var a = TableTools._aInstances, b = 0, c = a.length; b < c; b++) if (this.dom.table == a[b].s.dt.nTable) return a[b].s
            }, _fnCollectionConfig: function (a, b) {
                var c = k.createElement(this.s.tags.collection.container);
                c.style.display = "none";
                c.className = this.classes.collection.container;
                b._collection = c;
                k.body.appendChild(c);
                this._fnButtonDefinations(b.aButtons, c)
            }, _fnCollectionShow: function (a, b) {
                var c = this, d = f(a).offset(), e = b._collection, j = d.left, d = d.top + f(a).outerHeight(),
                    i = f(m).height(), h = f(k).height(), o = f(m).width(),
                    g = f(k).width();
                e.style.position = "absolute";
                e.style.left = j + "px";
                e.style.top = d + "px";
                e.style.display = "block";
                f(e).css("opacity", 0);
                var l = k.createElement("div");
                l.style.position = "absolute";
                l.style.left = "0px";
                l.style.top = "0px";
                l.style.height = (i > h ? i : h) + "px";
                l.style.width = (o > g ? o : g) + "px";
                l.className = this.classes.collection.background;
                f(l).css("opacity", 0);
                k.body.appendChild(l);
                k.body.appendChild(e);
                i = f(e).outerWidth();
                o = f(e).outerHeight();
                j + i > g && (e.style.left = g - i + "px");
                d + o > h && (e.style.top = d - o - f(a).outerHeight() +
                    "px");
                this.dom.collection.collection = e;
                this.dom.collection.background = l;
                setTimeout(function () {
                    f(e).animate({opacity: 1}, 500);
                    f(l).animate({opacity: 0.25}, 500)
                }, 10);
                this.fnResizeButtons();
                f(l).click(function () {
                    c._fnCollectionHide.call(c, null, null)
                })
            }, _fnCollectionHide: function (a, b) {
                !(null !== b && "collection" == b.sExtends) && null !== this.dom.collection.collection && (f(this.dom.collection.collection).animate({opacity: 0}, 500, function () {
                    this.style.display = "none"
                }), f(this.dom.collection.background).animate({opacity: 0},
                    500, function () {
                        this.parentNode.removeChild(this)
                    }), this.dom.collection.collection = null, this.dom.collection.background = null)
            }, _fnRowSelectConfig: function () {
                if (this.s.master) {
                    var a = this, b = this.s.dt;
                    f(b.nTable).addClass(this.classes.select.table);
                    "os" === this.s.select.type && (f(b.nTBody).on("mousedown.DTTT_Select", "tr", function (a) {
                        if (a.shiftKey) f(b.nTBody).css("-moz-user-select", "none").one("selectstart.DTTT_Select", "tr", function () {
                            return !1
                        })
                    }), f(b.nTBody).on("mouseup.DTTT_Select", "tr", function () {
                        f(b.nTBody).css("-moz-user-select",
                            "")
                    }));
                    f(b.nTBody).on("click.DTTT_Select", this.s.custom.sRowSelector, function (c) {
                        var d = this.nodeName.toLowerCase() === "tr" ? this : f(this).parents("tr")[0], e = a.s.select,
                            j = a.s.dt.oInstance.fnGetPosition(d);
                        if (d.parentNode == b.nTBody && b.oInstance.fnGetData(d) !== null) {
                            if (e.type == "os") if (c.ctrlKey || c.metaKey) a.fnIsSelected(d) ? a._fnRowDeselect(d, c) : a._fnRowSelect(d, c); else if (c.shiftKey) {
                                var i = a.s.dt.aiDisplay.slice(), h = f.inArray(e.lastRow, i), o = f.inArray(j, i);
                                if (a.fnGetSelected().length === 0 || h === -1) i.splice(f.inArray(j,
                                    i) + 1, i.length); else {
                                    if (h > o) var g = o, o = h, h = g;
                                    i.splice(o + 1, i.length);
                                    i.splice(0, h)
                                }
                                if (a.fnIsSelected(d)) {
                                    i.splice(f.inArray(j, i), 1);
                                    a._fnRowDeselect(i, c)
                                } else a._fnRowSelect(i, c)
                            } else if (a.fnIsSelected(d) && a.fnGetSelected().length === 1) a._fnRowDeselect(d, c); else {
                                a.fnSelectNone();
                                a._fnRowSelect(d, c)
                            } else if (a.fnIsSelected(d)) a._fnRowDeselect(d, c); else if (e.type == "single") {
                                a.fnSelectNone();
                                a._fnRowSelect(d, c)
                            } else e.type == "multi" && a._fnRowSelect(d, c);
                            e.lastRow = j
                        }
                    });
                    b.oApi._fnCallbackReg(b, "aoRowCreatedCallback",
                        function (c, d, e) {
                            b.aoData[e]._DTTT_selected && f(c).addClass(a.classes.select.row)
                        }, "TableTools-SelectAll")
                }
            }, _fnRowSelect: function (a, b) {
                var c = this._fnSelectData(a), d = [], e, j;
                e = 0;
                for (j = c.length; e < j; e++) c[e].nTr && d.push(c[e].nTr);
                if (null === this.s.select.preRowSelect || this.s.select.preRowSelect.call(this, b, d, !0)) {
                    e = 0;
                    for (j = c.length; e < j; e++) c[e]._DTTT_selected = !0, c[e].nTr && f(c[e].nTr).addClass(this.classes.select.row);
                    null !== this.s.select.postSelected && this.s.select.postSelected.call(this, d);
                    TableTools._fnEventDispatch(this,
                        "select", d, !0)
                }
            }, _fnRowDeselect: function (a, b) {
                var c = this._fnSelectData(a), d = [], e, j;
                e = 0;
                for (j = c.length; e < j; e++) c[e].nTr && d.push(c[e].nTr);
                if (null === this.s.select.preRowSelect || this.s.select.preRowSelect.call(this, b, d, !1)) {
                    e = 0;
                    for (j = c.length; e < j; e++) c[e]._DTTT_selected = !1, c[e].nTr && f(c[e].nTr).removeClass(this.classes.select.row);
                    null !== this.s.select.postDeselected && this.s.select.postDeselected.call(this, d);
                    TableTools._fnEventDispatch(this, "select", d, !1)
                }
            }, _fnSelectData: function (a) {
                var b = [], c, d, e;
                if (a.nodeName) c =
                    this.s.dt.oInstance.fnGetPosition(a), b.push(this.s.dt.aoData[c]); else if ("undefined" !== typeof a.length) {
                    d = 0;
                    for (e = a.length; d < e; d++) a[d].nodeName ? (c = this.s.dt.oInstance.fnGetPosition(a[d]), b.push(this.s.dt.aoData[c])) : "number" === typeof a[d] ? b.push(this.s.dt.aoData[a[d]]) : b.push(a[d])
                } else b.push(a);
                return b
            }, _fnTextConfig: function (a, b) {
                var c = this;
                null !== b.fnInit && b.fnInit.call(this, a, b);
                "" !== b.sToolTip && (a.title = b.sToolTip);
                f(a).hover(function () {
                        b.fnMouseover !== null && b.fnMouseover.call(this, a, b, null)
                    },
                    function () {
                        b.fnMouseout !== null && b.fnMouseout.call(this, a, b, null)
                    });
                null !== b.fnSelect && TableTools._fnEventListen(this, "select", function (d) {
                    b.fnSelect.call(c, a, b, d)
                });
                f(a).click(function (d) {
                    b.fnClick !== null && b.fnClick.call(c, a, b, null, d);
                    b.fnComplete !== null && b.fnComplete.call(c, a, b, null, null);
                    c._fnCollectionHide(a, b)
                })
            }, _fnHasFlash: function () {
                try {
                    if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) return !0
                } catch (a) {
                    if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] !== p && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) return !0
                }
                return !1
            },
            _fnFlashConfig: function (a, b) {
                var c = this, d = new g.Client;
                null !== b.fnInit && b.fnInit.call(this, a, b);
                d.setHandCursor(!0);
                "flash_save" == b.sAction ? (d.setAction("save"), d.setCharSet("utf16le" == b.sCharSet ? "UTF16LE" : "UTF8"), d.setBomInc(b.bBomInc), d.setFileName(b.sFileName.replace("*", this.fnGetTitle(b)))) : "flash_pdf" == b.sAction ? (d.setAction("pdf"), d.setFileName(b.sFileName.replace("*", this.fnGetTitle(b)))) : d.setAction("copy");
                d.addEventListener("mouseOver", function () {
                    b.fnMouseover !== null && b.fnMouseover.call(c,
                        a, b, d)
                });
                d.addEventListener("mouseOut", function () {
                    b.fnMouseout !== null && b.fnMouseout.call(c, a, b, d)
                });
                d.addEventListener("mouseDown", function () {
                    b.fnClick !== null && b.fnClick.call(c, a, b, d)
                });
                d.addEventListener("complete", function (e, f) {
                    b.fnComplete !== null && b.fnComplete.call(c, a, b, d, f);
                    c._fnCollectionHide(a, b)
                });
                this._fnFlashGlue(d, a, b.sToolTip)
            }, _fnFlashGlue: function (a, b, c) {
                var d = this, e = b.getAttribute("id");
                k.getElementById(e) ? a.glue(b, c) : setTimeout(function () {
                    d._fnFlashGlue(a, b, c)
                }, 100)
            }, _fnFlashSetText: function (a,
                                          b) {
                var c = this._fnChunkData(b, 8192);
                a.clearText();
                for (var d = 0, e = c.length; d < e; d++) a.appendText(c[d])
            }, _fnColumnTargets: function (a) {
                var b = [], c = this.s.dt, d, e;
                if ("object" == typeof a) {
                    d = 0;
                    for (e = c.aoColumns.length; d < e; d++) b.push(!1);
                    d = 0;
                    for (e = a.length; d < e; d++) b[a[d]] = !0
                } else if ("visible" == a) {
                    d = 0;
                    for (e = c.aoColumns.length; d < e; d++) b.push(c.aoColumns[d].bVisible ? !0 : !1)
                } else if ("hidden" == a) {
                    d = 0;
                    for (e = c.aoColumns.length; d < e; d++) b.push(c.aoColumns[d].bVisible ? !1 : !0)
                } else if ("sortable" == a) {
                    d = 0;
                    for (e = c.aoColumns.length; d <
                    e; d++) b.push(c.aoColumns[d].bSortable ? !0 : !1)
                } else {
                    d = 0;
                    for (e = c.aoColumns.length; d < e; d++) b.push(!0)
                }
                return b
            }, _fnNewline: function (a) {
                return "auto" == a.sNewLine ? navigator.userAgent.match(/Windows/) ? "\r\n" : "\n" : a.sNewLine
            }, _fnGetDataTablesData: function (a) {
                var b, c, d, e, j, i = [], h = "", g = this.s.dt, k, l = RegExp(a.sFieldBoundary, "g"),
                    m = this._fnColumnTargets(a.mColumns),
                    n = "undefined" != typeof a.bSelectedOnly ? a.bSelectedOnly : !1;
                if (a.bHeader) {
                    j = [];
                    b = 0;
                    for (c = g.aoColumns.length; b < c; b++) m[b] && (h = g.aoColumns[b].sTitle.replace(/\n/g,
                        " ").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, ""), h = this._fnHtmlDecode(h), j.push(this._fnBoundData(h, a.sFieldBoundary, l)));
                    i.push(j.join(a.sFieldSeperator))
                }
                var p = this.fnGetSelected(), n = "none" !== this.s.select.type && n && 0 !== p.length,
                    q = (d = f.fn.dataTable.Api) ? (new d(g)).rows(a.oSelectorOpts).indexes().flatten().toArray() : g.oInstance.$("tr", a.oSelectorOpts).map(function (a, b) {
                        return n && -1 === f.inArray(b, p) ? null : g.oInstance.fnGetPosition(b)
                    }).get();
                d = 0;
                for (e = q.length; d < e; d++) {
                    k = g.aoData[q[d]].nTr;
                    j = [];
                    b =
                        0;
                    for (c = g.aoColumns.length; b < c; b++) m[b] && (h = g.oApi._fnGetCellData(g, q[d], b, "display"), a.fnCellRender ? h = a.fnCellRender(h, b, k, q[d]) + "" : "string" == typeof h ? (h = h.replace(/\n/g, " "), h = h.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi, "$1$2$3"), h = h.replace(/<.*?>/g, "")) : h += "", h = h.replace(/^\s+/, "").replace(/\s+$/, ""), h = this._fnHtmlDecode(h), j.push(this._fnBoundData(h, a.sFieldBoundary, l)));
                    i.push(j.join(a.sFieldSeperator));
                    a.bOpenRows && (b = f.grep(g.aoOpenRows, function (a) {
                        return a.nParent ===
                            k
                    }), 1 === b.length && (h = this._fnBoundData(f("td", b[0].nTr).html(), a.sFieldBoundary, l), i.push(h)))
                }
                if (a.bFooter && null !== g.nTFoot) {
                    j = [];
                    b = 0;
                    for (c = g.aoColumns.length; b < c; b++) m[b] && null !== g.aoColumns[b].nTf && (h = g.aoColumns[b].nTf.innerHTML.replace(/\n/g, " ").replace(/<.*?>/g, ""), h = this._fnHtmlDecode(h), j.push(this._fnBoundData(h, a.sFieldBoundary, l)));
                    i.push(j.join(a.sFieldSeperator))
                }
                return i.join(this._fnNewline(a))
            }, _fnBoundData: function (a, b, c) {
                return "" === b ? a : b + a.replace(c, b + b) + b
            }, _fnChunkData: function (a,
                                       b) {
                for (var c = [], d = a.length, e = 0; e < d; e += b) e + b < d ? c.push(a.substring(e, e + b)) : c.push(a.substring(e, d));
                return c
            }, _fnHtmlDecode: function (a) {
                if (-1 === a.indexOf("&")) return a;
                var b = k.createElement("div");
                return a.replace(/&([^\s]*?);/g, function (a, d) {
                    if ("#" === a.substr(1, 1)) return String.fromCharCode(Number(d.substr(1)));
                    b.innerHTML = a;
                    return b.childNodes[0].nodeValue
                })
            }, _fnPrintStart: function (a) {
                var b = this, c = this.s.dt;
                this._fnPrintHideNodes(c.nTable);
                this.s.print.saveStart = c._iDisplayStart;
                this.s.print.saveLength =
                    c._iDisplayLength;
                a.bShowAll && (c._iDisplayStart = 0, c._iDisplayLength = -1, c.oApi._fnCalculateEnd && c.oApi._fnCalculateEnd(c), c.oApi._fnDraw(c));
                if ("" !== c.oScroll.sX || "" !== c.oScroll.sY) this._fnPrintScrollStart(c), f(this.s.dt.nTable).bind("draw.DTTT_Print", function () {
                    b._fnPrintScrollStart(c)
                });
                var d = c.aanFeatures, e;
                for (e in d) if ("i" != e && "t" != e && 1 == e.length) for (var g = 0, i = d[e].length; g < i; g++) this.dom.print.hidden.push({
                    node: d[e][g],
                    display: "block"
                }), d[e][g].style.display = "none";
                f(k.body).addClass(this.classes.print.body);
                "" !== a.sInfo && this.fnInfo(a.sInfo, 3E3);
                a.sMessage && f("<div/>").addClass(this.classes.print.message).html(a.sMessage).prependTo("body");
                this.s.print.saveScroll = f(m).scrollTop();
                m.scrollTo(0, 0);
                f(k).bind("keydown.DTTT", function (a) {
                    if (a.keyCode == 27) {
                        a.preventDefault();
                        b._fnPrintEnd.call(b, a)
                    }
                })
            }, _fnPrintEnd: function () {
                var a = this.s.dt, b = this.s.print;
                this._fnPrintShowNodes();
                if ("" !== a.oScroll.sX || "" !== a.oScroll.sY) f(this.s.dt.nTable).unbind("draw.DTTT_Print"), this._fnPrintScrollEnd();
                m.scrollTo(0, b.saveScroll);
                f("div." + this.classes.print.message).remove();
                f(k.body).removeClass("DTTT_Print");
                a._iDisplayStart = b.saveStart;
                a._iDisplayLength = b.saveLength;
                a.oApi._fnCalculateEnd && a.oApi._fnCalculateEnd(a);
                a.oApi._fnDraw(a);
                f(k).unbind("keydown.DTTT")
            }, _fnPrintScrollStart: function () {
                var a = this.s.dt;
                a.nScrollHead.getElementsByTagName("div")[0].getElementsByTagName("table");
                var b = a.nTable.parentNode, c;
                c = a.nTable.getElementsByTagName("thead");
                0 < c.length && a.nTable.removeChild(c[0]);
                null !== a.nTFoot && (c = a.nTable.getElementsByTagName("tfoot"),
                0 < c.length && a.nTable.removeChild(c[0]));
                c = a.nTHead.cloneNode(!0);
                a.nTable.insertBefore(c, a.nTable.childNodes[0]);
                null !== a.nTFoot && (c = a.nTFoot.cloneNode(!0), a.nTable.insertBefore(c, a.nTable.childNodes[1]));
                "" !== a.oScroll.sX && (a.nTable.style.width = f(a.nTable).outerWidth() + "px", b.style.width = f(a.nTable).outerWidth() + "px", b.style.overflow = "visible");
                "" !== a.oScroll.sY && (b.style.height = f(a.nTable).outerHeight() + "px", b.style.overflow = "visible")
            }, _fnPrintScrollEnd: function () {
                var a = this.s.dt, b = a.nTable.parentNode;
                "" !== a.oScroll.sX && (b.style.width = a.oApi._fnStringToCss(a.oScroll.sX), b.style.overflow = "auto");
                "" !== a.oScroll.sY && (b.style.height = a.oApi._fnStringToCss(a.oScroll.sY), b.style.overflow = "auto")
            }, _fnPrintShowNodes: function () {
                for (var a = this.dom.print.hidden, b = 0, c = a.length; b < c; b++) a[b].node.style.display = a[b].display;
                a.splice(0, a.length)
            }, _fnPrintHideNodes: function (a) {
                for (var b = this.dom.print.hidden, c = a.parentNode, d = c.childNodes, e = 0, g = d.length; e < g; e++) if (d[e] != a && 1 == d[e].nodeType) {
                    var i = f(d[e]).css("display");
                    "none" != i && (b.push({node: d[e], display: i}), d[e].style.display = "none")
                }
                "BODY" != c.nodeName.toUpperCase() && this._fnPrintHideNodes(c)
            }
        };
        TableTools._aInstances = [];
        TableTools._aListeners = [];
        TableTools.fnGetMasters = function () {
            for (var a = [], b = 0, c = TableTools._aInstances.length; b < c; b++) TableTools._aInstances[b].s.master && a.push(TableTools._aInstances[b]);
            return a
        };
        TableTools.fnGetInstance = function (a) {
            "object" != typeof a && (a = k.getElementById(a));
            for (var b = 0, c = TableTools._aInstances.length; b < c; b++) if (TableTools._aInstances[b].s.master &&
                TableTools._aInstances[b].dom.table == a) return TableTools._aInstances[b];
            return null
        };
        TableTools._fnEventListen = function (a, b, c) {
            TableTools._aListeners.push({that: a, type: b, fn: c})
        };
        TableTools._fnEventDispatch = function (a, b, c, d) {
            for (var e = TableTools._aListeners, f = 0, g = e.length; f < g; f++) a.dom.table == e[f].that.dom.table && e[f].type == b && e[f].fn(c, d)
        };
        TableTools.buttonBase = {
            sAction: "text",
            sTag: "default",
            sLinerTag: "default",
            sButtonClass: "DTTT_button_text",
            sButtonText: "Button text",
            sTitle: "",
            sToolTip: "",
            sCharSet: "utf8",
            bBomInc: !1,
            sFileName: "*.csv",
            sFieldBoundary: "",
            sFieldSeperator: "\t",
            sNewLine: "auto",
            mColumns: "all",
            bHeader: !0,
            bFooter: !0,
            bOpenRows: !1,
            bSelectedOnly: !1,
            oSelectorOpts: p,
            fnMouseover: null,
            fnMouseout: null,
            fnClick: null,
            fnSelect: null,
            fnComplete: null,
            fnInit: null,
            fnCellRender: null
        };
        TableTools.BUTTONS = {
            csv: f.extend({}, TableTools.buttonBase, {
                sAction: "flash_save",
                sButtonClass: "DTTT_button_csv",
                sButtonText: "CSV",
                sFieldBoundary: '"',
                sFieldSeperator: ",",
                fnClick: function (a, b, c) {
                    this.fnSetText(c, this.fnGetTableData(b))
                }
            }),
            xls: f.extend({}, TableTools.buttonBase, {
                sAction: "flash_save",
                sCharSet: "utf16le",
                bBomInc: !0,
                sButtonClass: "DTTT_button_xls",
                sButtonText: "Excel",
                fnClick: function (a, b, c) {
                    this.fnSetText(c, this.fnGetTableData(b))
                }
            }),
            copy: f.extend({}, TableTools.buttonBase, {
                sAction: "flash_copy",
                sButtonClass: "DTTT_button_copy",
                sButtonText: "Copy",
                fnClick: function (a, b, c) {
                    this.fnSetText(c, this.fnGetTableData(b))
                },
                fnComplete: function (a, b, c, d) {
                    a = d.split("\n").length;
                    b.bHeader && a--;
                    null !== this.s.dt.nTFoot && b.bFooter && a--;
                    this.fnInfo("<h6>Table copied</h6><p>Copied " +
                        a + " row" + (1 == a ? "" : "s") + " to the clipboard.</p>", 1500)
                }
            }),
            pdf: f.extend({}, TableTools.buttonBase, {
                sAction: "flash_pdf",
                sNewLine: "\n",
                sFileName: "*.pdf",
                sButtonClass: "DTTT_button_pdf",
                sButtonText: "PDF",
                sPdfOrientation: "portrait",
                sPdfSize: "A4",
                sPdfMessage: "",
                fnClick: function (a, b, c) {
                    this.fnSetText(c, "title:" + this.fnGetTitle(b) + "\nmessage:" + b.sPdfMessage + "\ncolWidth:" + this.fnCalcColRatios(b) + "\norientation:" + b.sPdfOrientation + "\nsize:" + b.sPdfSize + "\n--/TableToolsOpts--\n" + this.fnGetTableData(b))
                }
            }),
            print: f.extend({},
                TableTools.buttonBase, {
                    sInfo: "<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.</p>",
                    sMessage: null,
                    bShowAll: !0,
                    sToolTip: "View print view",
                    sButtonClass: "DTTT_button_print",
                    sButtonText: "Print",
                    fnClick: function (a, b) {
                        this.fnPrint(!0, b)
                    }
                }),
            text: f.extend({}, TableTools.buttonBase),
            select: f.extend({}, TableTools.buttonBase, {
                sButtonText: "Select button", fnSelect: function (a) {
                    0 !== this.fnGetSelected().length ? f(a).removeClass(this.classes.buttons.disabled) :
                        f(a).addClass(this.classes.buttons.disabled)
                }, fnInit: function (a) {
                    f(a).addClass(this.classes.buttons.disabled)
                }
            }),
            select_single: f.extend({}, TableTools.buttonBase, {
                sButtonText: "Select button", fnSelect: function (a) {
                    1 == this.fnGetSelected().length ? f(a).removeClass(this.classes.buttons.disabled) : f(a).addClass(this.classes.buttons.disabled)
                }, fnInit: function (a) {
                    f(a).addClass(this.classes.buttons.disabled)
                }
            }),
            select_all: f.extend({}, TableTools.buttonBase, {
                sButtonText: "Select all", fnClick: function () {
                    this.fnSelectAll()
                },
                fnSelect: function (a) {
                    this.fnGetSelected().length == this.s.dt.fnRecordsDisplay() ? f(a).addClass(this.classes.buttons.disabled) : f(a).removeClass(this.classes.buttons.disabled)
                }
            }),
            select_none: f.extend({}, TableTools.buttonBase, {
                sButtonText: "Deselect all", fnClick: function () {
                    this.fnSelectNone()
                }, fnSelect: function (a) {
                    0 !== this.fnGetSelected().length ? f(a).removeClass(this.classes.buttons.disabled) : f(a).addClass(this.classes.buttons.disabled)
                }, fnInit: function (a) {
                    f(a).addClass(this.classes.buttons.disabled)
                }
            }),
            ajax: f.extend({}, TableTools.buttonBase, {
                sAjaxUrl: "/xhr.php",
                sButtonText: "Ajax button",
                fnClick: function (a, b) {
                    var c = this.fnGetTableData(b);
                    f.ajax({
                        url: b.sAjaxUrl,
                        data: [{name: "tableData", value: c}],
                        success: b.fnAjaxComplete,
                        dataType: "json",
                        type: "POST",
                        cache: !1,
                        error: function () {
                            alert("Error detected when sending table data to server")
                        }
                    })
                },
                fnAjaxComplete: function () {
                    alert("Ajax complete")
                }
            }),
            div: f.extend({}, TableTools.buttonBase, {
                sAction: "div",
                sTag: "div",
                sButtonClass: "DTTT_nonbutton",
                sButtonText: "Text button"
            }),
            collection: f.extend({}, TableTools.buttonBase, {
                sAction: "collection",
                sButtonClass: "DTTT_button_collection",
                sButtonText: "Collection",
                fnClick: function (a, b) {
                    this._fnCollectionShow(a, b)
                }
            })
        };
        TableTools.buttons = TableTools.BUTTONS;
        TableTools.classes = {
            container: "DTTT_container",
            buttons: {normal: "DTTT_button", disabled: "DTTT_disabled"},
            collection: {
                container: "DTTT_collection",
                background: "DTTT_collection_background",
                buttons: {normal: "DTTT_button", disabled: "DTTT_disabled"}
            },
            select: {table: "DTTT_selectable", row: "DTTT_selected selected"},
            print: {body: "DTTT_Print", info: "DTTT_print_info", message: "DTTT_PrintMessage"}
        };
        TableTools.classes_themeroller = {
            container: "DTTT_container ui-buttonset ui-buttonset-multi",
            buttons: {normal: "DTTT_button ui-button ui-state-default"},
            collection: {container: "DTTT_collection ui-buttonset ui-buttonset-multi"}
        };
        TableTools.DEFAULTS = {
            sSwfPath: "../swf/copy_csv_xls_pdf.swf",
            sRowSelect: "none",
            sRowSelector: "tr",
            sSelectedClass: null,
            fnPreRowSelect: null,
            fnRowSelected: null,
            fnRowDeselected: null,
            aButtons: ["copy", "csv", "xls",
                "pdf", "print"],
            oTags: {
                container: "div",
                button: "a",
                liner: "span",
                collection: {container: "div", button: "a", liner: "span"}
            }
        };
        TableTools.defaults = TableTools.DEFAULTS;
        TableTools.prototype.CLASS = "TableTools";
        TableTools.version = "2.2.2";
        f.fn.dataTable.Api && f.fn.dataTable.Api.register("tabletools()", function () {
            var a = null;
            0 < this.context.length && (a = TableTools.fnGetInstance(this.context[0].nTable));
            return a
        });
        "function" == typeof f.fn.dataTable && "function" == typeof f.fn.dataTableExt.fnVersionCheck && f.fn.dataTableExt.fnVersionCheck("1.9.0") ?
            f.fn.dataTableExt.aoFeatures.push({
                fnInit: function (a) {
                    var b = a.oInit;
                    return (new TableTools(a.oInstance, b ? b.tableTools || b.oTableTools || {} : {})).dom.container
                }, cFeature: "T", sFeature: "TableTools"
            }) : alert("Warning: TableTools requires DataTables 1.9.0 or newer - www.datatables.net/download");
        f.fn.DataTable.TableTools = TableTools;
        "function" == typeof n.fn.dataTable && "function" == typeof n.fn.dataTableExt.fnVersionCheck && n.fn.dataTableExt.fnVersionCheck("1.9.0") ? n.fn.dataTableExt.aoFeatures.push({
            fnInit: function (a) {
                a =
                    new TableTools(a.oInstance, "undefined" != typeof a.oInit.oTableTools ? a.oInit.oTableTools : {});
                TableTools._aInstances.push(a);
                return a.dom.container
            }, cFeature: "T", sFeature: "TableTools"
        }) : alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download");
        n.fn.dataTable.TableTools = TableTools;
        return n.fn.DataTable.TableTools = TableTools
    };
    "function" === typeof define && define.amd ? define(["jquery", "datatables"], r) : "object" === typeof exports ? r(require("jquery"), require("datatables")) :
        jQuery && !jQuery.fn.dataTable.TableTools && r(jQuery, jQuery.fn.dataTable)
})(window, document);
