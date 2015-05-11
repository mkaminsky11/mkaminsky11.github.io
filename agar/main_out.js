(function(window_, jQuery) {

    var minMass = 100000;

    function init() {
        render();
        setInterval(render, 18E4);
        canvas = canvas2 = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        canvas.onmousedown = function(e) {
            if (options) {
                var z0 = e.clientX - (5 + width / 5 / 2);
                var z1 = e.clientY - (5 + width / 5 / 2);
                if (Math.sqrt(z0 * z0 + z1 * z1) <= width / 5 / 2) {
                    f();
                    emit(17);
                    return;
                }
            }
            reset();
            f();
        };
        canvas.onmousemove = function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            reset();
        };
        canvas.onmouseup = function(evt) {
        };
        var keySpace = false;
        var keyQ = false;
        var keyW = false;
        window_.onkeydown = function(e) {
            if (!(32 != e.keyCode)) { // space
                if (!keySpace) {
                    f();
                    emit(17);
                    keySpace = true;
                }
            }
            if (!(81 != e.keyCode)) { // q
                if (!keyQ) {
                    emit(18);
                    keyQ = true;
                }
            }
            if (!(87 != e.keyCode)) { // w
                if (!keyW) {
                    f();
                    emit(21);
                    keyW = true;
                }
            }

            if (!(27 != e.keyCode)) { // esc
                jQuery("#overlays").toggle(200);
            }
        };
        window_.onkeyup = function(event) {
            if (32 == event.keyCode) { // space
                keySpace = false;
            }
            if (87 == event.keyCode) { // w
                keyW = false;
            }
            if (81 == event.keyCode) {// q
                if (keyQ) {
                    emit(19);
                    keyQ = false;
                }
            }
        };
        window_.onblur = function() {
            emit(19);
            keyW = keyQ = keySpace = false;
        };
        window_.onresize = onResize;
        onResize();
        if (window_.requestAnimationFrame) {
            window_.requestAnimationFrame(anim);
        } else {
            setInterval(draw, 1E3 / 60);
        }
        setInterval(f, 100);
        setRegion(jQuery("#region").val());
    }
    function processData() {
        var minX = Number.POSITIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        var newDuration = 0;
        var i = 0;
        for (;i < items.length;i++) {
            newDuration = Math.max(items[i].size, newDuration);
            minX = Math.min(items[i].x, minX);
            minY = Math.min(items[i].y, minY);
            maxX = Math.max(items[i].x, maxX);
            maxY = Math.max(items[i].y, maxY);
        }
        context = QUAD.init({
            minX : minX - (newDuration + 100),
            minY : minY - (newDuration + 100),
            maxX : maxX + (newDuration + 100),
            maxY : maxY + (newDuration + 100)
        });

        for (i = 0;i < items.length;i++) {
            if (minX = items[i], minX.shouldRender()) {
                minY = 0;
                for (;minY < minX.points.length;++minY) {
                    context.insert(minX.points[minY]);
                }
            }
        }
    }

    function getProxyUrl()
    {
        return document.location.href.replace(/\/(index\.html|)$/, "")+"/proxy.php";
    }

    function render() {
        if (null == old) {
            old = {};
            jQuery("#region").children().each(function() {
                var option = jQuery(this);
                var name = option.val();
                if (name) {
                    old[name] = option.text();
                }
            });
        }
        var url;
        if(document.location.host == 'localhost' || document.location.host=='agar.io'){
            url = 'http://m.agar.io/info';
        }else{
            url = document.location.href
            url = getProxyUrl()+'?info=1';
        }
        jQuery.get(url, function(b) {
            var name;
            for (name in b.regions) {
                jQuery('#region option[value="' + name + '"]').text(old[name] + " (" + b.regions[name].numPlayers + " players)");
            }
        }, "json");
    }
    function setRegion(mat) {
        if (mat) {
            if (mat != dest) {
                dest = mat;
                after();
            }
        }
    }
    function next() {
        var url;
        if(document.location.host == 'localhost' || document.location.host=='agar.io'){
            url = 'http://m.agar.io/';
        }else{
            url = getProxyUrl();
        }
        jQuery.ajax(url, {
            error : function() {
                setTimeout(next, 1E3);
            },
            success : function(status) {
                status = status.split("\n");
                open("ws://" + status[0]);
            },
            dataType : "text",
            method : "POST",
            cache : false,
            crossDomain : true,
            data : dest || "?"
        });
    }
    function after() {
        jQuery("#connecting").show();
        next();
    }
    function open(url) {
        if (ws) {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onclose = null;
            ws.close();
            ws = null;
        }
        bucket = [];
        myPoints = [];
        nodes = {};
        items = [];
        sprites = [];
        elements = [];
        console.log("Connecting to " + url);
        ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        ws.onopen = listener;
        ws.onmessage = parse;
        ws.onclose = report;
        ws.onerror = function() {
            console.log("socket error");
        };
    }
    function listener(data) {
        jQuery("#connecting").hide();
        console.log("socket open");
        data = new ArrayBuffer(5);
        var view = new DataView(data);
        view.setUint8(0, 255);
        view.setUint32(1, 1, true);
        ws.send(data);
        close();
    }
    function report(failing_message) {
        console.log("socket close");
        setTimeout(after, 500);
    }
    function parse(target) {
        function encode() {
            var utftext = "";
            while(true) {
                var c = d.getUint16(i, true);
                i += 2;
                if (0 == c) {
                    break;
                }
                utftext += String.fromCharCode(c);
            }
            return utftext;
        }
        var i = 1;
        var d = new DataView(target.data);
        switch(d.getUint8(0)) {
            case 16:
                run(d);
                break;
            case 17:
                px = d.getFloat64(1, true);
                py = d.getFloat64(9, true);
                ratio = d.getFloat64(17, true);
                break;
            case 20:
                myPoints = [];
                bucket = [];
                break;
            case 32:
                bucket.push(d.getUint32(1, true));
                break;
            case 48:
                elements = [];
                while(i < d.byteLength) {
                    elements.push({
                        id : 0,
                        name : encode()
                    });
                }
                redraw();
                break;
            case 49:
                target = d.getUint32(i, true);
                i += 4;
                elements = [];
                var seek = 0;
                for (;seek < target;++seek) {
                    var r = d.getUint32(i, true);
                    i = i + 4;
                    elements.push({
                        id : r,
                        name : encode()
                    });
                }
                redraw();
                break;
            case 64:
                left = d.getFloat64(1, true);
                bottom = d.getFloat64(9, true);
                right = d.getFloat64(17, true);
                top = d.getFloat64(25, true);
                if (myPoints.length == 0) {
                    px = (right + left) / 2;
                    py = (top + bottom) / 2;
                }
        }
    }
    function run(d) {
        timestamp = +new Date;
        var key = Math.random();
        var offset = 1;
        aa = false;
        var id = d.getUint16(offset, true);
        offset = offset + 2;
        var pointX = 0;
        for (;pointX < id;++pointX) {
            var pointY = nodes[d.getUint32(offset, true)];
            var pointSize = nodes[d.getUint32(offset + 4, true)];
            offset = offset + 8;
            if (pointY) {
                if (pointSize) {
                    pointSize.destroy();
                    pointSize.ox = pointSize.x;
                    pointSize.oy = pointSize.y;
                    pointSize.oSize = pointSize.size;
                    pointSize.nx = pointY.x;
                    pointSize.ny = pointY.y;
                    pointSize.nSize = pointSize.size;
                    pointSize.updateTime = timestamp;
                }
            }
        }
        while(true) {
            id = d.getUint32(offset, true);
            offset += 4;
            if (0 == id) {
                break;
            }
            pointX = d.getFloat64(offset, true);
            offset = offset + 8;
            pointY = d.getFloat64(offset, true);
            offset = offset + 8;
            pointSize = d.getFloat64(offset, true);
            offset = offset + 8;
            var pointColor = d.getUint8(offset);
            offset++;
            var pointIsVirus = false;
            if (0 == pointColor) {
                pointIsVirus = true;
                pointColor = "#33FF33";
            } else {
                if (255 == pointColor) {
                    pointIsVirus = d.getUint8(offset);
                    offset++;
                    pointColor = d.getUint8(offset);
                    offset++;
                    var pointName = d.getUint8(offset);
                    offset++;
                    pointColor = isArray(pointIsVirus << 16 | pointColor << 8 | pointName);
                    pointName = d.getUint8(offset++);
                    pointIsVirus = !!(pointName & 1);
                    if (pointName & 2) {
                        offset += 4;
                    }
                    if (pointName & 4) {
                        offset += 8;
                    }
                    if (pointName & 8) {
                        offset += 16;
                    }
                } else {
                    pointColor = 63487 | pointColor << 16;
                    var data = (pointColor >> 16 & 255) / 255 * 360;
                    var params = (pointColor >> 8 & 255) / 255;
                    pointColor = (pointColor >> 0 & 255) / 255;
                    if (0 == params) {
                        pointColor = pointColor << 16 | pointColor << 8 | pointColor << 0;
                    } else {
                        data = data / 60;
                        pointName = ~~data;
                        var callback = data - pointName;
                        data = pointColor * (1 - params);
                        var tmp = pointColor * (1 - params * callback);
                        params = pointColor * (1 - params * (1 - callback));
                        var fn = callback = 0;
                        var result = 0;
                        switch(pointName % 6) {
                            case 0:
                                callback = pointColor;
                                fn = params;
                                result = data;
                                break;
                            case 1:
                                callback = tmp;
                                fn = pointColor;
                                result = data;
                                break;
                            case 2:
                                callback = data;
                                fn = pointColor;
                                result = params;
                                break;
                            case 3:
                                callback = data;
                                fn = tmp;
                                result = pointColor;
                                break;
                            case 4:
                                callback = params;
                                fn = data;
                                result = pointColor;
                                break;
                            case 5:
                                callback = pointColor;
                                fn = data;
                                result = tmp;
                        }
                        callback = ~~(255 * callback) & 255;
                        fn = ~~(255 * fn) & 255;
                        result = ~~(255 * result) & 255;
                        pointColor = callback << 16 | fn << 8 | result;
                    }
                    pointColor = isArray(pointColor);
                }
            }
            pointName = "";
            while(true) {
                data = d.getUint16(offset, true);
                offset += 2;
                if (0 == data) {
                    break;
                }
                pointName += String.fromCharCode(data);
            }
            data = null;
            if (nodes.hasOwnProperty(id)) {
                data = nodes[id];
                data.updatePos();
                data.ox = data.x;
                data.oy = data.y;
                data.oSize = data.size;
                data.color = pointColor;
            } else {
                data = new Points(id, pointX, pointY, pointSize, pointColor, pointIsVirus, pointName);
                data.pX = pointX;
                data.pY = pointY;
            }
            data.nx = pointX;
            data.ny = pointY;
            data.nSize = pointSize;
            data.updateCode = key;
            data.updateTime = timestamp;
            if (-1 != bucket.indexOf(id)) {
                if (myPoints.indexOf(data) == -1) {
                    document.getElementById("overlays").style.display = "none";
                    myPoints.push(data);
                    if (1 == myPoints.length) {
                        px = data.x;
                        py = data.y;
                    }
                }
            }
        }
        d.getUint16(offset, true);
        offset += 2;
        pointY = d.getUint32(offset, true);
        offset += 4;
        pointX = 0;
        for (;pointX < pointY;pointX++) {
            id = d.getUint32(offset, true);
            offset += 4;
            if (nodes[id]) {
                nodes[id].updateCode = key;
            }
        }
        pointX = 0;
        for (;pointX < items.length;pointX++) {
            if (items[pointX].updateCode != key) {
                items[pointX--].destroy();
            }
        }
        if (aa) {
            if (0 == myPoints.length) {
                jQuery("#overlays").fadeIn(3E3);
            }
        }
    }
    function reset() {
        mouseX2 = (mouseX - width / 2) / ratio + px;
        mouseY2 = (mouseY - height / 2) / ratio + py;
    }
    function f() {
        if (ws != null && ws.readyState == ws.OPEN) {
            var z0 = mouseX - width / 2;
            var z1 = mouseY - height / 2;

            //mouseX2 = z0 / ratio + px;
            //mouseY2 = z1 / ratio + px;

            if (!(64 > z0 * z0 + z1 * z1)) {
                if (!(val == mouseX2 && min == mouseY2)) {
                    val = mouseX2;
                    min = mouseY2;
                    z0 = new ArrayBuffer(21);
                    z1 = new DataView(z0);
                    z1.setUint8(0, 16);
                    z1.setFloat64(1, mouseX2, true);
                    z1.setFloat64(9, mouseY2, true);
                    z1.setUint32(17, 0, true);
                    ws.send(z0);
                }
            }
        }
    }
    function close() {
        if (ws != null && (ws.readyState == ws.OPEN && result != null)) {
            var buf = new ArrayBuffer(1 + 2 * result.length);
            var view = new DataView(buf);
            view.setUint8(0, 0);
            var i = 0;
            for (;i < result.length;++i) {
                view.setUint16(1 + 2 * i, result.charCodeAt(i), true);
            }
            ws.send(buf);
        }
    }
    function emit(opt_attributes) {
        if (ws != null && ws.readyState == ws.OPEN) {
            var buf = new ArrayBuffer(1);
            (new DataView(buf)).setUint8(0, opt_attributes);
            ws.send(buf);
        }
    }
    function anim() {
        draw();
        window_.requestAnimationFrame(anim);
    }
    function onResize() {
        width = window_.innerWidth;
        height = window_.innerHeight;
        canvas2.width = canvas.width = width;
        canvas2.height = canvas.height = height;
        draw();
    }

    function build() {
        if (myPoints.length != 0) {
            var score = 0;
            minMass = 10000000;
            for (var i = 0 ;i < myPoints.length;i++) {
                score += myPoints[i].size;
                if(minMass > myPoints[i].size){
                    minMass = myPoints[i].size;
                }
            }
            score = Math.pow(Math.min(64 / score, 1), 0.4) * Math.max(height / 965, width / 1920);
            ratio = (9 * ratio + score) / screenRenderSize ;
        }
    }
    function draw() {
        var tick = +new Date;
        Ba++;
        build();
        timestamp = +new Date;
        if (0 < myPoints.length) {
            var w = 0;
            var d = 0;
            var i = 0;
            for (;i < myPoints.length;i++) {
                myPoints[i].updatePos();
                w += myPoints[i].x / myPoints.length;
                d += myPoints[i].y / myPoints.length;
            }
            px = (px + w) / 2;
            py = (py + d) / 2;
        }
        processData();
        reset();
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = darkTheme ? "#111111" : "#F2FBFF";
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        ctx.strokeStyle = darkTheme ? "#AAAAAA" : "#000000";
        ctx.globalAlpha = 0.2;
        ctx.scale(ratio, ratio);
        w = width / ratio;
        d = height / ratio;
        i = -0.5 + ( w / 2 -px) % 50;
        for (;i < w;i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, d);
            ctx.stroke();
        }
        i = -0.5 + (-py + d / 2) % 50;
        for (;i < d;i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(w, i);
            ctx.stroke();
        }
        ctx.restore();

        items.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size;
        });
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(ratio, ratio);
        ctx.translate(-px, -py);
        i = 0;
        for (;i < sprites.length;i++) {
            sprites[i].draw();
        }
        i = 0;
        for (;i < items.length;i++) {
            items[i].draw();
        }

        ctx.restore();
        if (img) {
            if (0 != elements.length) {
                ctx.drawImage(img, width - img.width - 10, 10);
            }
        }
        closingAnimationTime = Math.max(closingAnimationTime, getHeight());
        if (0 != closingAnimationTime) {
            if (null == button) {
                button = new SVGPlotFunction(24, "#FFFFFF");
            }
            button.setValue("Score: " + ~~(closingAnimationTime / 100));
            d = button.render();
            w = d.width;
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000";
            ctx.fillRect(10, height - 10 - 24 - 10, w + 10, 34);
            ctx.globalAlpha = 1;
            ctx.drawImage(d, 15, height - 10 - 24 - 5);
        }
        clear();
        tick = +new Date - tick;
        if (tick > 1E3 / 60) {
            n_players -= 0.01;
        } else {
            if (tick < 1E3 / 65) {
                n_players += 0.01;
            }
        }
        if (0.4 > n_players) {
            n_players = 0.4;
        }
        if (1 < n_players) {
            n_players = 1;
        }
    }
    function clear() {
        if (options && copy.width) {
            var dim = width / 5;
            ctx.drawImage(copy, 5, 5, dim, dim);
        }
    }
    function getHeight() {
        var value = 0;
        var second = 0;
        for (;second < myPoints.length;second++) {
            value += myPoints[second].nSize * myPoints[second].nSize;
        }
        return value;
    }
    function redraw() {
        if (0 != elements.length) {
            if (nickName) {
                img = document.createElement("canvas");

                var ctx = img.getContext("2d");
                var s = 60 + 24 * elements.length;
                var n = Math.min(200, 0.3 * width) / 200;

                img.width = 200 * n;
                img.height = s * n;
                ctx.scale(n, n);
                ctx.globalAlpha = 0.4;
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 200, s);
                ctx.globalAlpha = 1;
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "20px Ubuntu";
                n = "Ratio: "+Math.round(ratio*10000)/10000;
                ctx.fillText(n, 100 - ctx.measureText(n).width / 2, 40);

                for (var i = 0;i < elements.length;++i) {
                    n = elements[i].name || "An unnamed cell";
                    if (-1 != myPoints.indexOf(elements[i].id)) {
                        n = myPoints[0].name;
                    }
                    if (!nickName) {
                        if (!(0 != myPoints.length && myPoints[0].name == n)) {
                            n = "An unnamed cell";
                        }
                    }
                    n = i + 1 + ". " + n;
                    ctx.fillText(n, 100 - ctx.measureText(n).width / 2, 70 + 24 * i);
                }
            } else {
                img = null;
            }
        }
    }
    function Points(id, x, y, size, color, isVirus, name) {
        items.push(this);
        nodes[id] = this;
        this.id = id;
        this.ox = this.x = x;
        this.oy = this.y = y;
        this.oSize = this.size = size;
        this.color = color;
        this.isVirus = isVirus;
        this.points = [];
        this.pointsAcc = [];
        this.createPoints();
        this.setName(name);
    }
    function isArray(val) {
        val = val.toString(16);
        while(val.length < 6) {
            val = "0" + val;
        }
        return "#" + val;
    }
    function SVGPlotFunction(n, Var, stroke, plot) {
        if (n) {
            this._size = n;
        }
        if (Var) {
            this._color = Var;
        }
        this._stroke = !!stroke;
        if (plot) {
            this._strokeColor = plot;
        }
    }
    //if ("agar.io" != window_.location.hostname && ("localhost" != window_.location.hostname && "10.10.2.13" != window_.location.hostname)) {
    //    window_.location = "http://agar.io/";
    //} else
    {
        var canvas2;
        var ctx;
        var canvas;
        var width;
        var height;
        var context = null;
        var ws = null;
        var px = 0;
        var py = 0;
        var bucket = [];
        var myPoints = [];
        var nodes = {};
        var items = [];
        var sprites = [];
        var elements = [];
        var mouseX = 0;
        var mouseY = 0;
        var mouseX2 = -1;
        var mouseY2 = -1;
        var Ba = 0;
        var timestamp = 0;
        var result = null;
        var left = 0;
        var bottom = 0;
        var right = 1E4;
        var top = 1E4;
        var ratio = 1;
        var screenRenderSize = 10;
        var dest = null;
        var showSkins = true;
        var nickName = true;
        var isColors = false;
        var isRadar = true;
        var isTypesHack = true;
        var aa = false;
        var closingAnimationTime = 0;
        var darkTheme = false;
        var isShowMass = true;
        var options = "ontouchstart" in window_ && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var copy = new Image;
        copy.src = "img/split.png";
        var old = null;
        window_.setNick = function(subKey) {
            jQuery("#adsBottom").hide();
            result = subKey;
            close();
            jQuery("#overlays").hide();
            closingAnimationTime = 0;
        };
        window_.setRegion = setRegion;
        window_.setSkins = function(val) {
            showSkins = val;
        };
        window_.setNames = function(o2) {
            nickName = o2;
        };
        window_.setDarkTheme = function(newColor) {
            darkTheme = newColor;
        };
        window_.setColors = function(data) {
            isColors = data;
        };
        window_.setRadar = function(data) {
            isRadar = data;
        };
        window_.setTypesHack = function(data) {
            isTypesHack = data;
        };
        window_.setScreenHack = function(data) {
            if ( data ) {
                screenRenderSize = 10.35;
            } else {
                screenRenderSize = 10;
            }
        };
        window_.setShowMass = function(val) {
            isShowMass = val;
        };
        window_.spectate = function () {
            emit(1);
            jQuery("#adsBottom").hide();
            jQuery("#overlays").hide();
        };
        window_.connect = open;
        var val = -1;
        var min = -1;
        var img = null;
        var n_players = 1;
        var button = null;
        var sources = {};
        var excludes = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;ussr;pewdiepie;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;nazi;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;isis;doge".split(";");
        var names = ["m'blob"];
        Points.prototype = {
            id : 0,
            points : null,
            pointsAcc : null,
            name : null,
            nameCache : null,
            sizeCache : null,
            x : 0,
            y : 0,
            size : 0,
            ox : 0,
            oy : 0,
            oSize : 0,
            nx : 0,
            ny : 0,
            nSize : 0,
            updateTime : 0,
            updateCode : 0,
            drawTime : 0,
            destroyed : false,
            isVirus : false,
            destroy : function() {
                var i;
                i = 0;
                for (;i < items.length;i++) {
                    if (items[i] == this) {
                        items.splice(i, 1);
                        break;
                    }
                }
                delete nodes[this.id];
                i = myPoints.indexOf(this);
                if (i != -1) {
                    aa = true;
                    myPoints.splice(i, 1);
                }
                i = bucket.indexOf(this.id);
                if (-1 != i) {
                    bucket.splice(i, 1);
                }
                this.destroyed = true;
                sprites.push(this);
            },
            getNameSize : function() {
                return Math.max(~~(0.3 * this.size), 24);
            },
            setName : function(name) {
                if (this.name = name) {
                    if (null == this.nameCache) {
                        this.nameCache = new SVGPlotFunction(this.getNameSize(), "#FFFFFF", true, "#000000");
                    } else {
                        this.nameCache.setSize(this.getNameSize());
                    }
                    this.nameCache.setValue(this.name);
                }
            },
            createPoints : function() {
                var max = this.getNumPoints();
                while(this.points.length > max) {
                    var i = ~~(Math.random() * this.points.length);
                    this.points.splice(i, 1);
                    this.pointsAcc.splice(i, 1);
                }
                if (0 == this.points.length) {
                    if (0 < max) {
                        this.points.push({
                            c : this,
                            v : this.size,
                            x : this.x,
                            y : this.y
                        });
                        this.pointsAcc.push(Math.random() - 0.5);
                    }
                }
                while(this.points.length < max) {
                    i = ~~(Math.random() * this.points.length);
                    var pt = this.points[i];
                    this.points.splice(i, 0, {
                        c : this,
                        v : pt.v,
                        x : pt.x,
                        y : pt.y
                    });
                    this.pointsAcc.splice(i, 0, this.pointsAcc[i]);
                }
            },
            getNumPoints : function() {
                return~~Math.max(this.size * ratio * (this.isVirus ? Math.min(2 * n_players, 1) : n_players), this.isVirus ? 10 : 5);
            },
            movePoints : function() {
                this.createPoints();
                var points = this.points;
                var chars = this.pointsAcc;
                var value = chars.concat();
                var rows = points.concat();
                var l = rows.length;
                var i = 0;
                for (;i < l;++i) {
                    var y = value[(i - 1 + l) % l];
                    var v = value[(i + 1) % l];
                    chars[i] += Math.random() - 0.5;
                    chars[i] *= 0.7;
                    if (10 < chars[i]) {
                        chars[i] = 10;
                    }
                    if (-10 > chars[i]) {
                        chars[i] = -10;
                    }
                    chars[i] = (y + v + 8 * chars[i]) / 10;
                }
                var flipped = this;
                for (i = 0;i < l;++i) {
                    value = rows[i].v;
                    y = rows[(i - 1 + l) % l].v;
                    v = rows[(i + 1) % l].v;
                    if (15 < this.size) {
                        var m = false;
                        var startX = points[i].x;
                        var startY = points[i].y;
                        context.retrieve2(startX - 5, startY - 5, 10, 10, function(vars) {
                            if (vars.c != flipped) {
                                if (25 > (startX - vars.x) * (startX - vars.x) + (startY - vars.y) * (startY - vars.y)) {
                                    m = true;
                                }
                            }
                        });
                        if (!m) {
                            if (points[i].x < left || (points[i].y < bottom || (points[i].x > right || points[i].y > top))) {
                                m = true;
                            }
                        }
                        if (m) {
                            if (0 < chars[i]) {
                                chars[i] = 0;
                            }
                            chars[i] -= 1;
                        }
                    }
                    value += chars[i];
                    if (value < 0) {
                        value = 0;
                    }
                    value = (12 * value + this.size) / 13;
                    points[i].v = (y + v + 8 * value) / 10;
                    y = 2 * Math.PI / l;
                    v = this.points[i].v;
                    if (this.isVirus) {
                        if (0 == i % 2) {
                            v += 5;
                        }
                    }
                    points[i].x = this.x + Math.cos(y * i) * v;
                    points[i].y = this.y + Math.sin(y * i) * v;
                }
            },
            updatePos : function() {
                var A;
                A = (timestamp - this.updateTime) / 120;
                A = 0 > A ? 0 : 1 < A ? 1 : A;
                A = A * A * (3 - 2 * A);
                var getNameSize = this.getNameSize();
                if (this.destroyed && 1 <= A) {
                    var idx = sprites.indexOf(this);
                    if (-1 != idx) {
                        sprites.splice(idx, 1);
                    }
                }
                this.x = A * (this.nx - this.ox) + this.ox;
                this.y = A * (this.ny - this.oy) + this.oy;
                this.size = A * (this.nSize - this.oSize) + this.oSize;
                if (!this.destroyed) {
                    if (!(getNameSize == this.getNameSize())) {
                        this.setName(this.name);
                    }
                }
                return A;
            },
            shouldRender : function() {
                return true;
                if(this.x + this.size + 40 < px - width / 2 / ratio ||
                    (
                        this.y + this.size + 40 < py - height / 2 / ratio ||
                        (this.x - this.size - 40 > px + width / 2 / ratio || this.y - this.size - 40 > py + height / 2 / ratio))){
                    return false;
                }
                return true;
            },
            draw : function() {
                if (this.shouldRender()) {
                    ctx.save();
                    this.drawTime = timestamp;
                    var key = this.updatePos();
                    if (this.destroyed) {
                        ctx.globalAlpha *= 1 - key;
                    }
                    this.movePoints();
                    if (isColors) {
                        ctx.fillStyle = "#FFFFFF";
                        ctx.strokeStyle = "#AAAAAA";
                    } else {
                        if(myPoints.indexOf(this) != -1){
                            this.color = '#E2FF07';
                        }else if(isTypesHack && !this.isVirus){
                            if (this.size < minMass * 0.9 / 2) {
                                this.color = '#57FF07';
                            } else if (this.size < minMass * 0.9) {
                                this.color = '#07FFB0';
                            } else if (this.size * 0.9 > minMass) {
                                this.color = '#FF3107';
                            } else {
                                this.color = '#4106FF';
                            }
                        }

                        ctx.fillStyle = this.color;
                        ctx.strokeStyle = this.color;

                    }
                    ctx.beginPath();
                    ctx.lineWidth = 10;
                    ctx.lineCap = "round";
                    ctx.lineJoin = this.isVirus ? "mitter" : "round";
                    key = this.getNumPoints();
                    ctx.moveTo(this.points[0].x, this.points[0].y);
                    var a = false;
                    for (var src = 1;src <= key;src++) {
                        var i = src % key;
                        ctx.lineTo(this.points[i].x, this.points[i].y);
                    }

                    ctx.closePath();
                    key = this.name.toLowerCase();
                    if (showSkins) {
                        if (-1 != excludes.indexOf(key)) {
                            if (!sources.hasOwnProperty(key)) {
                                sources[key] = new Image;
                                sources[key].src = "http://agar.io/skins/" + key + ".png";
                            }
                            src = sources[key];
                        } else {
                            src = null;
                        }
                    } else {
                        src = null;
                    }
                    key = src ? -1 != names.indexOf(key) : false;
                    ctx.stroke();
                    ctx.fill();


                    if (src != null) {
                        if (src.width > 0) {
                            if (!key) {
                                ctx.save();
                                ctx.clip();
                                ctx.drawImage(src, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size);
                                ctx.restore();
                            }
                        }
                    }
                    if (isColors || 15 < this.size) {
                        ctx.strokeStyle = "#000000";
                        ctx.globalAlpha *= 0.1;
                        ctx.stroke();
                    }
                    ctx.globalAlpha = 1;
                    if (src != null) {
                        if (0 < src.width) {
                            if (key) {
                                ctx.drawImage(src, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
                            }
                        }
                    }
                    var player = myPoints.indexOf(this) != -1;
                    src = ~~this.y;
                    if (nickName || player) {
                        if (this.name) {
                            if (this.nameCache) {
                                i = this.nameCache.render();
                                ctx.drawImage(i, ~~this.x - ~~(i.width / 2), src - ~~(i.height / 2));
                                src += i.height / 2 + 4;
                            }
                        }
                    }


                    if (this.size > 11 && isShowMass /*&& player*/) {
                        if (this.sizeCache == null) {
                            this.sizeCache = new SVGPlotFunction(this.getNameSize() / 2, "#FFFFFF", true, "#000000");
                        }
                        this.sizeCache.setSize(this.getNameSize() / 2);
                        this.sizeCache.setValue(~~(this.size * this.size / 100));
                        i = this.sizeCache.render();
                        ctx.drawImage(i, ~~this.x - ~~(i.width / 2), src - ~~(i.height / 2));
                    }

                    // aura
                    if( isRadar && !this.isVirus && this.size > minMass*2 && this.size < minMass*4 ) {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size*3.5, 0, 2 * Math.PI);
                        ctx.strokeStyle = 'rgba(0, 0, 255, 0.1)';
                        ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
                        ctx.fill();
                        ctx.stroke();
                    }
                    ctx.restore();

                }
            }
        };
        SVGPlotFunction.prototype = {
            _value : "",
            _color : "#000000",
            _stroke : false,
            _strokeColor : "#000000",
            _size : 16,
            _canvas : null,
            _ctx : null,
            _dirty : false,
            setSize : function(size) {
                if (this._size != size) {
                    this._size = size;
                    this._dirty = true;
                }
            },
            setColor : function(color) {
                if (this._color != color) {
                    this._color = color;
                    this._dirty = true;
                }
            },
            setStroke : function(stroke) {
                if (this._stroke != stroke) {
                    this._stroke = stroke;
                    this._dirty = true;
                }
            },
            setStrokeColor : function(b) {
                if (this._strokeColor != b) {
                    this._strokeColor = b;
                    this._dirty = true;
                }
            },
            setValue : function(value) {
                if (value != this._value) {
                    this._value = value;
                    this._dirty = true;
                }
            },
            render : function() {
                if (null == this._canvas) {
                    this._canvas = document.createElement("canvas");
                    this._ctx = this._canvas.getContext("2d");
                }
                if (this._dirty) {
                    var style = this._canvas;
                    var ctx = this._ctx;
                    var mass = this._value;

                    var fontSize = this._size;
                    var font = fontSize + "px Ubuntu";
                    ctx.font = font;
                    var parentWidth = ctx.measureText(mass).width;
                    var PX = ~~(0.2 * fontSize);
                    style.width = parentWidth + 6;
                    style.height = fontSize + PX;
                    ctx.font = font;
                    ctx.globalAlpha = 1;
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = this._strokeColor;
                    ctx.fillStyle = this._color;
                    if (this._stroke) {
                        ctx.strokeText(mass, 3, fontSize - PX / 2);
                    }
                    ctx.fillText(mass, 3, fontSize - PX / 2);
                }
                return this._canvas;
            }
        };
        window_.onload = init;
    }
})(window, jQuery);
