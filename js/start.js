document.body.onselectstart = "return false;"
var HTML = document.getElementsByTagName('html')[0];
var finished = false;
document.addEventListener('mousedown', function () {
    this.body.style = "cursor: url('./pointer/click.cur'), default;";
})
document.addEventListener('mouseup', function () {
    this.body.style = "cursor: url('./pointer/pointer.cur'), default;";
})
function nowTime() {//获取当前时间
    let now = new Date();
    let _month = (10 > (now.getMonth() + 1)) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    let _day = (10 > now.getDate()) ? '0' + now.getDate() : now.getDate();
    let _hour = (10 > now.getHours()) ? '0' + now.getHours() : now.getHours();
    let _minute = (10 > now.getMinutes()) ? '0' + now.getMinutes() : now.getMinutes();
    let _second = (10 > now.getSeconds()) ? '0' + now.getSeconds() : now.getSeconds();
    return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
}

function save(pro) {
    var player = localStorage.getItem("currentUser");
    var Player = JSON.parse(localStorage.getItem(player));
    var cnt = parseInt(Player.num);
    var update = {
        username: Player.username,
        password: Player.password,
        num: Player.num,
        achievement: Player.achievement
    }
    for (i = 1; i <= cnt; i++) {
        update["process" + i] = Player["process" + i];
        update["timestamp" + i] = Player["timestamp" + i];
    }
    var index = localStorage.getItem("currentNum");
    update["process" + index] = pro;
    update["timestamp" + index] = nowTime();
    localStorage.setItem(update.username, JSON.stringify(update));
}

function achieve(achievement) {
    var player = localStorage.getItem("currentUser");
    var Player = JSON.parse(localStorage.getItem(player));
    var cnt = parseInt(Player.num);
    var update = {
        username: Player.username,
        password: Player.password,
        num: Player.num,
        achievement: Player.achievement
    }
    for (i = 1; i <= cnt; i++) {
        update["process" + i] = Player["process" + i];
        update["timestamp" + i] = Player["timestamp" + i];
    }
    if (update["achievement"].indexOf(achievement) == -1) {
        update['achievement'].push(achievement);
        var div = document.createElement('div')
        div.style = "position: absolute; right: 20px; top: 20px; width: 240px; height: 100px; background-image: url(uploads/成就背景.jpg); color: #000; box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.6); border-radius: 10px; display: none;"
        div.id = "ach"

        var span = document.createElement('span')
        span.style = "display: inline-block; width: 140px; text-align: center; line-height: 100px; font-size: 24px;"
        span.innerText = achievement;

        var img = document.createElement('img')
        img.src = "uploads/达成.png"
        img.style = "float: right; margin-top: 8px; margin-right: 14px;";

        div.appendChild(span)
        div.appendChild(img)

        HTML.appendChild(div);

        $("#ach").fadeIn();

        setTimeout(function () {
            $("#ach").fadeOut();
        }, 2500);

        setTimeout(function () {
            div.remove();
        }, 5000);
    }
    localStorage.setItem(update.username, JSON.stringify(update));
}

function switch_place(place) {
    var html = document.getElementsByTagName('html')[0]
    HTML.style.opacity = 0;
    html.style.backgroundImage = "url('uploads/" + place + "')";
    HTML.style.opacity = 1;
}

function show_people(people) {
    var person = document.getElementById("person");
    if (person != null) {
        $("#person").fadeOut();
        person.remove();
    }
    person = document.createElement('img');
    person.id = "person";
    person.src = "uploads/" + people
    person.style = "position: absolute; bottom: 0; left: 0; display: none; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;";
    document.body.appendChild(person);
    $("#person").fadeIn();
}


class Speaker {
    constructor() {
        this.bubble;
        this.index;
        this.p;
        this.h3;
        this.nick;
        this.people;
        this.txt;
        this.length;
        this.t;
    }

    show_scene(place) {

        var people = document.getElementById('person');
        if (people != null) {
            people.remove();
        }

        this.index = 0;
        this.txt = place;
        this.length = place.length;
        this.bubble = document.getElementById("bubble");
        if (this.bubble != null) {
            $("#bubble").slideUp();
            this.bubble.remove();
        }
        this.bubble = document.createElement('div');
        this.bubble.id = "bubble";
        this.bubble.style = "position: absolute; bottom: 0; width: 100%; height: 265px; color: #fff; cursor: url('./pointer/hover.cur'), default; display: none;  background: url('uploads/边框.png') no-repeat;  background-size:100% 100%;"

        this.p = document.createElement('p');
        this.p.style = "font-size: 30px; padding: 120px; font-weight: normal; font-family: XinHuaKaiTi-1; width: 1200px;"


        this.bubble.appendChild(this.p);

        document.body.appendChild(this.bubble);

        $('#bubble').slideDown();

        this.start();
    }

    show_txt(people, txt) {
        this.length = txt.length;
        this.people = people;
        this.txt = txt;
        this.index = 0;
        this.bubble = document.getElementById("bubble");
        if (this.bubble != null) {
            $("#bubble").slideUp();
            this.bubble.remove();
        }
        this.bubble = document.createElement('div');
        this.bubble.id = "bubble";
        this.bubble.style = "position: absolute; bottom: 0; width: 100%; height: 265px; color: #fff; background: url('uploads/边框.png') no-repeat; display: none; background-size:100% 100%;"

        this.h3 = document.createElement('h3');
        this.nick = document.createTextNode(people + ":");
        this.h3.appendChild(this.nick);
        this.h3.style = "font-size: 45px; padding: 50px; padding-bottom: 20px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"

        this.p = document.createElement('p')
        this.p.style = "font-size: 26px; padding-left: 150px; font-family: XinHuaKaiTi-1; width: 1200px;"

        this.bubble.appendChild(this.h3);
        this.bubble.appendChild(this.p);

        document.body.appendChild(this.bubble);

        $("#bubble").slideDown();

        this.start();
    }

    start() {
        this.t = setInterval(function () {
            this.speaker.next()
        }, 50)
    }

    next() {
        if (this.index < this.length) {
            this.p.innerText += this.txt[this.index];
            this.index++;
            return true;
        }
        else {
            clearInterval(this.t);
            return false;
        }
    }

    skip() {
        clearInterval(this.t);
        this.p.innerText = this.txt;
        this.index = this.length;
    }
}

var speaker = new Speaker();

function show_video(name) {
    var videos = document.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++) {
        videos[i].remove();
    }
    var body = document.body;
    body.innerHTML = "";
    var video = document.createElement('video');
    video.src = "video/" + name;
    video.autoplay = "autoplay";
    video.style = "width:100%; height:100%; object-fit:fill;"

    var banner = document.createElement('div');
    banner.className = "banner";
    banner.style = "width: 100%; height: 100vh;";

    var skip = document.createElement('input');
    skip.type = "button";
    skip.style = "width: 120px; height: 60px; position: absolute; top: 20px; right: 30px; font-size: 24px; z-index: 100; background-image: url('uploads/跳过动画.png'); background-color: transparent; color: #666; border-color: transparent;  font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2; text-shadow:  0px 0px 0px #fff; cursor: url('./pointer/hover.cur'), default; padding-left: 20px; transition: all 0.5s; text-shadow: 0px 10px 15px #000;"
    skip.value = "跳过动画";

    skip.onclick = function () {
        video.currentTime = 99999;
    }

    skip.onmouseover = function () {
        skip.style.transform = "scale(1.25)";
    }

    skip.onmouseleave = function () {
        skip.style.transform = "scale(1)";
    }

    banner.appendChild(skip);

    banner.appendChild(video);

    body.appendChild(banner);
    // video.pause()
}

function play_music(music) {
    var index = window.location.href.lastIndexOf('/')
    var src = window.location.href.slice(0, index + 1) + "music/" + music;

    videos = document.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++) {
        if (videos[i].src == src) {
            return;
        }
        else {
            videos[i].pause()
            videos[i].remove()
        }
    }

    var video = document.createElement('video');
    video.autoplay = "autoplay";
    video.src = "music/" + music;
    video.loop = "loop";
    video.style.display = "none";
    HTML.appendChild(video);
}

function play_once(music) {
    var video = document.createElement('video');
    video.autoplay = "autoplay";
    video.src = "music/" + music;
    video.style.display = "none";

    document.body.appendChild(video);

}

function stop_music() {
    var videos = document.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++) {
        videos[i].remove();
    }
}

function show_options(...options_txt) {
    var num = options_txt.length;
    for (i = 0; i < num; i++) {
        var option = document.createElement('div');
        var txt = document.createTextNode(options_txt[i]);
        option.appendChild(txt);
        option.style = "position: absolute; bottom: " + (276 + 55 * i) + "px; right: 20px; width: 250px; height: 50px; color: #fff; cursor: url('./pointer/hover.cur'), default; text-align: center; line-height: 50px; font-size: 24px; display: none; background-image: url('uploads/选项.png'); font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
        option.id = "option" + (i + 1);
        document.body.appendChild(option);
        $("#option" + (i + 1)).slideDown();
    }
}

function clear_options() {
    var option = document.getElementById("option1")
    var index = 1;
    while (option != null) {
        $("#option" + index).slideUp();
        option.remove();
        index++;
        option = document.getElementById("option" + index);
    }
}

function sleep(n) {
    var start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }
}

function create_card() {
    var div = document.createElement('div');
    var p1 = document.createElement('p')
    var p2 = document.createElement('p')

    p1.className = "top"
    p2.className = "bottom"
    div.style = "box-shadow: 5px 5px 10px #000; transition: 1s; position: relative; text-align: center; line-height: 60px; height: 150px; width: 150px; border-radius: 30px; margin: 10px 10px; box-shadow: 0 0 50px 15px #000;"
    p1.style = "border-radius: 30px; background-color: blueviolet; transition: all 1s; backface-visibility: hidden; display: block; height: 150px; width: 150px; position: absolute; background-image: url('uploads/牌面.png');"
    p2.style = "border-radius: 30px; background-color: blueviolet; transition: all 1s; backface-visibility: hidden; display: block; height: 150px; width: 150px; position: absolute; transform: rotateY(180deg);"

    div.appendChild(p1)
    div.appendChild(p2)

    return div;

}

function music_game() {
    var t;
    var MAX_HEIGHT = 602;      //超过这个高度的方块不显示
    var blocks = new Array();  //放置每个下落的方块
    var speed = 10;	  //每次下落速度
    var timeMin = 0;  //最快0秒产生一个方块
    var timeMax = 0.5;  //最慢0.2秒产生一个方块
    var numMax = 20;  //最多同时有20个方块

    var lastGenTime = 0;  //上次产生方块的时间
    var timeGrid = 500; //产生方块的时间间隔不能比这个短

    var clearRand = 30; //距离MAX_HEIGHT上下多少像素就能消去方块而且加分
    var score = 0;

    var keyB = new Array("url('uploads/W.png') no-repeat", "url('uploads/S.png') no-repeat", "url('uploads/A.png') no-repeat", "url('uploads/D.png') no-repeat");
    var KEY_W = 0;	//对应数组的位置
    var KEY_S = 1;
    var KEY_A = 2;
    var KEY_D = 3;
    var pageX = new Array("220px", "300px", "380px", "460px", "550px", "620px", "700px", "780px", "860px", "940px");

    var TIP_WIDTH = 140;
    var TIP_HEIGHT = 43;
    var TIP_IMAGES = new Array(
        new Array("/l10001.png", "/l10002.png", "/l10003.png", "/l10004.png", "/l10005.png", "/l10006.png"),
        new Array("/l20001.png", "/l20002.png", "/l20003.png", "/l20004.png", "/l20005.png", "/l20006.png"),
        new Array("/l30001.png", "/l30002.png", "/l30003.png", "/l30004.png", "/l30005.png", "/l30006.png")
    );

    /*
     * 每隔一个时间就调用一个函数
     */
    function doOnTime(func, time) {
        return setInterval(func, time);
    }
    /*
     * 产生方块
     */
    function generateBlock() {
        setTimeout(function () {
            var nowTime = new Date().getTime();
            if ((blocks.length < numMax) && (nowTime - lastGenTime > timeGrid)) {
                lastGenTime = nowTime;
                var randPos = Math.floor(pageX.length * Math.random());
                var randPic = Math.floor(keyB.length * Math.random());
                var touMing = document.getElementById("touMing");
                var thing = document.createElement("div");
                touMing.appendChild(thing);
                thing.style.width = "40px";
                thing.style.height = "40px";
                thing.style.overflow = "hidden";
                thing.style.position = "absolute";
                thing.style.background = keyB[randPic];
                thing.style.left = pageX[randPos];
                thing.keyNum = randPic;				//为IE准备的
                thing.setAttribute("keyNum", randPic);	//为FF准备的
                thing.style.top = "-40px";
                blocks.push(thing);  //将方块加入数组中
            }
        }, Math.random() * (timeMax - timeMin + 1) * 1000 + timeMin * 1000);
    }

    /*
     * 游戏入口，每隔一定时间被调用
     */
    function game() {
        generateBlock();
        update();
        showScore("score", score);
    }

    /*
     * 更新游戏数据，比如方块位置
     */
    function update() {
        for (var i = 0; i < blocks.length; i++) {
            var top = parseInt(blocks[i].style.top);
            if (parseInt(blocks[i].style.top) > MAX_HEIGHT) {
                animate(parseInt(blocks[i].style.left) + TIP_WIDTH, top - TIP_HEIGHT, TIP_WIDTH, TIP_HEIGHT, TIP_IMAGES[0], 0, 90, "rid" + Math.random() + Math.random());
                blocks[i].style.display = "none";
                blocks.remove(i);
                if (score > 0) {
                    score--;
                }
                i--;
            } else {
                blocks[i].style.top = parseInt(blocks[i].style.top) + speed + "px";
            }
        }
    }

    /*
     * 显示分数
     */
    function showScore(showId, score) {
        document.getElementById(showId).innerHTML = parseInt(score);
    }

    /*
     * 给Array添加移除的方法
     */
    Array.prototype.remove = function (dx) {
        if (isNaN(dx) || dx > this.length) { return false; }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i];
            }
        }
        this.length -= 1;
    }

    /*
    * 动画函数
    * x -- 图片left
    * y -- 图片top
    * width -- 图片宽度
    * height -- 图片高度
    * imageArray -- 图片数组
    * index -- 当前播放到哪个图片
    * time -- 每个图片切换的时间
    * id -- 产生的div的id
    */
    function animate(x, y, width, height, imageArray, index, time, id) {
        // console.log(imageArray)
        if (index < imageArray.length) {
            var d = document.getElementById(id);
            if (d == null) {
                d = document.createElement("div");
                d.style.width = width + "px";
                d.style.height = height + "px";
                d.style.position = "absolute";
                d.style.top = y + "px";
                d.id = id;
                d.setAttribute("id", id);
                d.style.left = x + "px";
                document.getElementsByTagName("body")[0].appendChild(d);
            }
            d.style.background = "url('uploads" + "/" + imageArray[index] + "')";

            setTimeout(function () { return animate(x, y, width, height, imageArray, ++index, time, id) }, time);
        } else {
            var d = document.getElementById(id);
            if (d != null) {
                document.getElementsByTagName("body")[0].removeChild(d);
            }
        }
    }

    function start_trigger() {
        t = doOnTime(game, 25);
        stop = setInterval(function () {
            if (score >= 200) {
                achieve("节奏大师")
                play_once("win.ogg");
                clearInterval(t);
                center = document.getElementById('center')
                touMing = document.getElementById('touMing')
                div = document.createElement('div')
                div.id = "div"
                div.style = "margin: 200px auto 0; color: white; text-align: center; background-color: rgba(0, 0, 0, 0.3); height: 400px; width: 630px; line-height: 300px; font-size: 24px; font-family: XinHuaKaiTi-1;  background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px;"

                h4 = document.createElement('h4');
                h4.style = "height: 300px; line-height: 365px; text-align: center; font-size: 32px; color: #000;"
                content = document.createTextNode("恭喜你, 完成习武训练");

                var comfirm = document.createElement('a')
                comfirm.className = "bon"
                for (var i = 0; i < 4; i++) {
                    var span = document.createElement('span')
                    comfirm.appendChild(span);
                }
                var temp_txt = document.createTextNode("确认")
                comfirm.appendChild(temp_txt);
                comfirm.style = "border-radius: 10px; position: absolute; top: 263px; left:560px; font-size: 30px; cursor: url('./pointer/hover.cur'), default; line-height: 25px;"

                comfirm.addEventListener("click", function () {
                    save("学武");
                    start_game('学武');
                })

                h4.appendChild(content);

                touMing.style.display = 'none';
                div.appendChild(h4);
                div.appendChild(comfirm);
                div.style.display = "none";
                center.appendChild(div);
                $("#div").fadeIn();
                clearInterval(stop);
            }
        }, 25)
    }

    function start() {
        start_trigger();
    }

    start();

    document.addEventListener('keydown', function (evt) {
        var evt = evt || window.event;
        var evtKey = evt.keyCode || evt.which || evt.charCode;

        for (var u = 0; u < blocks.length; u++) {
            var blockKeyNum = blocks[u].keyNum || blocks[u].getAttribute("keyNum");
            if ((evtKey == 87 && blockKeyNum == KEY_W) ||
                (evtKey == 83 && blockKeyNum == KEY_S) ||
                (evtKey == 65 && blockKeyNum == KEY_A) ||
                (evtKey == 68 && blockKeyNum == KEY_D)
            ) {
                var top = parseInt(blocks[u].style.top);
                var height = parseInt(blocks[u].style.height);
                if (top > MAX_HEIGHT - clearRand - height && top < MAX_HEIGHT + clearRand) {	//在消失高度范围内

                    var mid = top + height / 2;
                    var temp = Math.abs(MAX_HEIGHT - mid);	//和目标线的距离

                    var level = 0;
                    if (temp > 0 && temp <= clearRand / 3) {
                        level = 2;
                    } else {
                        level = 1;
                    }

                    score += level;
                    if (level > 0) {
                        play_once("hit.wav");
                        animate(parseInt(blocks[u].style.left) + TIP_WIDTH, top - TIP_HEIGHT, TIP_WIDTH, TIP_HEIGHT, TIP_IMAGES[level], 0, 90, "rid" + Math.random() + Math.random());
                    }
                    blocks[u].style.display = "none";
                    blocks.remove(u);
                    u--;
                }
            }
        }
    }
    )

}

function xuewu() {
    var body = document.body;
    body.innerHTML = "";
    play_music('yinyou.mp3');
    document.getElementsByTagName('html')[0].style.backgroundImage = "url('uploads/学武.jpg')";
    var center = document.createElement('div')
    center.id = "center"
    center.style = "width: 1200px; height: 602px; margin: 0 auto; position: relative;"

    var touMing = document.createElement('div')
    touMing.id = "touMing";
    touMing.style = "width: 1000px; height: 602px; margin: 5px auto; color: white; text-align: center; font-size: 42px; border-bottom: 2px solid #fff; visibility: hidden; line-height: 100px; font-family: Roboto-Regular-D0-2;"

    var txt = document.createTextNode("当前分数: ")
    var span = document.createElement('span');
    span.id = "score";

    touMing.appendChild(txt);
    touMing.appendChild(span);

    var rule = document.createElement('div')
    rule.id = 'rule';
    rule.style = "width: 1120px; height: 540px; margin: 120px auto 0; color: #000; text-align: center; background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px;"

    var h3 = document.createElement('h3')
    h3.style = "font-size: 30px; padding-top: 55px; font-family: Roboto-Regular-D0-2;"
    var t0 = document.createTextNode("游戏规则")
    h3.appendChild(t0)

    var p1 = document.createElement('p');
    var t1 = document.createTextNode('年幼的云缨为了能帮助父亲打败坏人, 因此下定决定要习武');
    var p2 = document.createElement('p');
    var t2 = document.createTextNode('从上方会掉下来WASD等字母, 当字母达到下方白线时, 请按下键盘上对应按键');
    var p3 = document.createElement('p');
    var t3 = document.createTextNode('A代表处左拳, D代表右拳, W代表上跳, S代表下铲');
    var p4 = document.createElement('p');
    var t4 = document.createTextNode('累积两百分完成对应动作即可完成习武, 快来帮助云缨克服习武路上的困难吧');

    p1.appendChild(t1);
    p2.appendChild(t2);
    p3.appendChild(t3);
    p4.appendChild(t4);

    p1.style = "font-size: 24px; padding-top: 20px; margin: 20px auto; font-family: XinHuaKaiTi-1;"
    p2.style = "font-size: 24px; padding-top: 20px; margin: 20px auto; font-family: XinHuaKaiTi-1;"
    p3.style = "font-size: 24px; padding-top: 20px; margin: 20px auto; font-family: XinHuaKaiTi-1;"
    p4.style = "font-size: 24px; padding-top: 20px; margin: 20px auto; font-family: XinHuaKaiTi-1;"

    var comfirm = document.createElement('a')
    comfirm.className = "bon"
    for (var i = 0; i < 4; i++) {
        var span = document.createElement('span')
        comfirm.appendChild(span);
    }
    var temp_txt = document.createTextNode("接受挑战")
    comfirm.appendChild(temp_txt);
    comfirm.style = "border-radius: 10px; position: relative; top: 20px; font-size: 30px; cursor: url('./pointer/hover.cur'), default;"

    rule.appendChild(h3)
    rule.appendChild(p1)
    rule.appendChild(p2)
    rule.appendChild(p3)
    rule.appendChild(p4)
    rule.appendChild(comfirm)

    rule.style.display = 'none';

    center.appendChild(rule);
    center.appendChild(touMing);

    body.appendChild(center);

    $("#rule").fadeIn();

    comfirm.addEventListener("click", function () {
        rule.style.display = "none";
        touMing.style.visibility = "visible";
        music_game();
    })

}

function daguai() {
    var body = document.body;
    body.innerHTML = ""

    play_music('defalut2.mp3');

    switch_place("beijing1.jpg");
    var center = document.createElement('div')
    center.id = "center"
    center.style = "width: 1200px; height: 602px; margin: 0 auto; position: absolute; z-index: 100; top: 40px; left: 150px;"

    var rule = document.createElement('div')
    rule.id = 'rule';
    rule.style = "width: 1120px; height: 540px; margin: 120px auto 0; color: #000; text-align: center; background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px;"

    var h3 = document.createElement('h3')
    h3.style = "font-size: 35px; padding-top: 30px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
    var t0 = document.createTextNode("游戏规则")
    h3.appendChild(t0)

    var p1 = document.createElement('p');
    var t1 = document.createTextNode('长安城里出现了几只来历不明的魔物,在城中神出鬼没威胁百姓安危');
    var p2 = document.createElement('p');
    var t2 = document.createTextNode('终于在她成年之日，她的父亲告诉她:');
    var p3 = document.createElement('p');
    var t3 = document.createTextNode('清除长安城出现的怪物,我便向皇上引荐你');
    var p4 = document.createElement('p');
    var t4 = document.createTextNode('帮助云缨, 在仅有的二十次机会中, 找到藏在人群中的怪物吧!(注:只能两个两个找)');

    p1.appendChild(t1);
    p2.appendChild(t2);
    p3.appendChild(t3);
    p4.appendChild(t4);

    p1.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
    p2.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
    p3.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
    p4.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"


    var comfirm = document.createElement('a')
    comfirm.className = "bon"
    for (var i = 0; i < 4; i++) {
        var span = document.createElement('span')
        comfirm.appendChild(span);
    }
    var temp_txt = document.createTextNode("接受挑战")
    comfirm.appendChild(temp_txt);
    comfirm.style = "border-radius: 10px; position: relative; top: 20px; font-size: 30px; cursor: url('./pointer/hover.cur'), default;"


    rule.appendChild(h3)
    rule.appendChild(p1)
    rule.appendChild(p2)
    rule.appendChild(p3)
    rule.appendChild(p4)
    rule.appendChild(comfirm)

    rule.style.display = "none";

    center.appendChild(rule);

    body.appendChild(center);

    $("#rule").fadeIn()

    comfirm.addEventListener("click", function () {
        rule.remove()
        center.remove()

        var h3 = document.createElement('h3');
        var step_txt = document.createTextNode("剩余步数: 20");
        h3.appendChild(step_txt);
        h3.style = "position: absolute; left: 15%; top: 50%; transform: translate(-15%, -50%); text-align: center; width: 200px; height: 30px; font-size: 30px; color: #fff";

        var wrap = document.createElement('div');
        wrap.className = "wrap";
        wrap.style = "perspective: 1000px; width: 680px; height: 680px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; display: flex; justify-content: center; text-align: center; flex-wrap: wrap;"

        let divs = []
        for (i = 0; i < 16; i++) {
            temp = create_card();
            divs.push(temp)
            wrap.appendChild(temp);
        }


        body.appendChild(h3);
        body.appendChild(wrap);

        class Game {
            constructor(selector) {
                this.init(selector);
            }
            init(selector) {
                var pics = ["placeholder", '怪物.png', '怪物.png', '平民1.png', '平民4.png', '平民2.png', '平民3.png', '平民5.png', '平民6.png']
                let arr = this.randomArr();
                this.nodes = divs;//获取每一个卡片
                this.pairs = false;
                this.step = 20;//定义可以被点击的次数
                this.tit = document.querySelector("h3");
                this.nodes.forEach((item, index) => {//初始化卡片的值，并保存在num属性中
                    item.children[1].style.backgroundImage = "url('uploads/" + pics[arr[index]] + "')";
                    item.num = pics[arr[index]];
                    var that = this;
                    item.onclick = function () {//给每一个卡片绑定事件
                        that.handle(this);
                    }
                })
            }
            handle(ele) {
                if (this.step === 0) {
                    var center = document.createElement('div')
                    center.id = "center"
                    center.style = "width: 1200px; height: 602px; margin: 0 auto; position: absolute; z-index: 100; top: 40px; left: 150px;"

                    var rule = document.createElement('div')
                    rule.id = 'rule';
                    rule.style = "width: 1120px; height: 540px; margin: 120px auto 0; color: #000; text-align: center; background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px;"

                    var h3 = document.createElement('h3')
                    h3.style = "font-size: 35px; padding-top: 30px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
                    var t0 = document.createTextNode("游戏失败")
                    h3.appendChild(t0)

                    var p1 = document.createElement('p');
                    var t1 = document.createTextNode('很遗憾, 你失败了');
                    var p2 = document.createElement('p');
                    var t2 = document.createTextNode('你没有及时找到隐藏在人群中的怪物');
                    var p3 = document.createElement('p');
                    var t3 = document.createTextNode('因此,有大量平民伤亡');
                    var p4 = document.createElement('p');
                    var t4 = document.createTextNode('你没有获得父亲和皇上的信任, 你可以选择:');

                    p1.appendChild(t1);
                    p2.appendChild(t2);
                    p3.appendChild(t3);
                    p4.appendChild(t4);

                    p1.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                    p2.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                    p3.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                    p4.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"

                    var again = document.createElement('a')
                    again.className = "bon"
                    for (var i = 0; i < 4; i++) {
                        var span = document.createElement('span')
                        again.appendChild(span);
                    }
                    var temp_txt = document.createTextNode("再玩一次")
                    again.appendChild(temp_txt);
                    again.style = "border-radius: 10px; position: relative; top: 30px; font-size: 30px; cursor: url('./pointer/hover.cur'), default; margin-left: 190px;"

                    again.onclick = function () {
                        daguai();
                    }

                    var comfirm = document.createElement('a')
                    comfirm.className = "bon"
                    for (var i = 0; i < 4; i++) {
                        var span = document.createElement('span')
                        comfirm.appendChild(span);
                    }
                    var temp_txt = document.createTextNode("返回主页")
                    comfirm.appendChild(temp_txt);
                    comfirm.style = "border-radius: 10px; position: relative; top: 30px; font-size: 30px; cursor: url('./pointer/hover.cur'), default;"

                    comfirm.onclick = function () {
                        window.location.reload();
                    }

                    rule.appendChild(h3)
                    rule.appendChild(p1)
                    rule.appendChild(p2)
                    rule.appendChild(p3)
                    rule.appendChild(p4)
                    rule.appendChild(comfirm)
                    rule.appendChild(again);
                    rule.style.display = "none";

                    center.appendChild(rule);

                    body.appendChild(center);
                    $("#rule").fadeIn()

                    return
                }
                if (ele.active !== true) {
                    this.step--;
                    this.tit.innerText = `剩余步数：${this.step}`
                }
                ele.children[0].classList.add('active1');//卡片翻转
                ele.children[1].classList.add('active2');
                let res = this.nodes.filter(item => item.children[0].classList.contains('active1') && item.active !== true); //获取翻过来的且没有配对成功的卡片
                if (res.length === 2 && res[0].num !== res[1].num) {//如果有两张并且数值不相等，恢复原状  
                    setTimeout(() => {
                        res[0].children[0].classList.remove('active1');
                        res[0].children[1].classList.remove('active2');
                        res[1].children[0].classList.remove('active1');
                        res[1].children[1].classList.remove('active2');
                    }, 1000)//延迟一秒形成动画    
                } else if (res.length === 2 && res[0].num === res[1].num) {//如果数值相等则配对成功
                    res[0].active = true;//锁定卡片
                    res[1].active = true;

                    if (res[0].num == '怪物.png' && !this.pairs) {
                        this.pairs = true;
                    }
                    else if (res[0].num == '怪物.png' && this.pairs) {
                        achieve("火眼金睛")
                        play_once("win.ogg");
                        var h4 = document.createElement('h4');

                        h4.style = "height: 300px; line-height: 365px; text-align: center; font-size: 32px; color: #000; z-index:999;"
                        var content = document.createTextNode("恭喜你, 成功保护平民");

                        var next = document.createElement('a')
                        next.className = "bon"
                        for (var i = 0; i < 4; i++) {
                            var span = document.createElement('span')
                            next.appendChild(span);
                        }
                        var temp_txt = document.createTextNode("确认")
                        next.appendChild(temp_txt);
                        next.style = "border-radius: 10px; position: absolute; top: 490px; left: 725px; font-size: 30px; cursor: url('./pointer/hover.cur'), default; line-height: 25px; z-index:999;"



                        var center = document.createElement('div')
                        center.id = "center"
                        center.style = "margin: 200px auto 0; color: white; text-align: center; background-color: rgba(0, 0, 0, 0.3); height: 400px; width: 630px; line-height: 300px; font-size: 24px; font-family: XinHuaKaiTi-1;  background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px; z-index:999;"


                        center.appendChild(h4);
                        center.appendChild(next);

                        center.style.display = "none";

                        body.appendChild(center);

                        $("#center").fadeIn();
                        wrap.remove()

                        next.addEventListener("click", function () {
                            save("打怪");
                            start_game('打怪');
                        })

                        h4.appendChild(content);
                    }
                }
            }
            randomArr() {
                let arr1 = [], arr2 = [], arr = [];
                for (let i = 0, n = 8; i < n; i++) {
                    do {
                        var item = randomInt(1, 8);
                    } while (arr1.indexOf(item) !== -1)
                    arr1.push(item);
                }
                for (let i = 0, n = 8; i < n; i++) {
                    do {
                        var item = randomInt(1, 8);
                    } while (arr2.indexOf(item) !== -1)
                    arr2.push(item);
                }
                arr1.forEach(function (element) {
                    arr.push(element);
                })
                arr2.forEach(function (element) {
                    arr.push(element);
                })
                return arr;
            }
        }
        new Game('.wrap div')
        function randomInt(min, max) {//产生[min,max]范围内的整数
            return Math.round(Math.random() * (max - min)) + min
        }
    })
}

function chasing() {
    var body = document.body;
    body.innerHTML = "";
    play_music("paoku.mp3");
    document.getElementsByTagName('html')[0].style.backgroundImage = "";
    document.getElementsByTagName('html')[0].style.background = "";

    var game = document.createElement('div');

    game.id = "game";

    body.appendChild(game);

    (function () {
        var width = window.screen.width;
        var height = window.screen.height - 1;
        var gameScore = 0;
        var SantaGame = {
            init: function () {
                this.game = new Phaser.Game(width, height, Phaser.CANVAS, 'game');
                this.game.state.add('load', this.load);
                this.game.state.add('play', this.play);
                this.game.state.add('title', this.title);
                this.game.state.add('gameOver', this.gameOver);
                this.game.state.start('load');
            },
            load: {
                preload: function () {
                    var preloadSprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'loading'); //创建显示loading进度的sprite
                    this.game.load.setPreloadSprite(preloadSprite);
                    this.game.load.image('platform', 'assets/1.png');
                    this.game.load.spritesheet('santa-running', 'assets/runman.png', 198, 330, 34);
                    this.game.load.image('snow-bg', 'assets/beijing1.png');
                    this.game.load.image('logo', 'assets/name.png');
                    this.game.load.image('startbtn', 'assets/bangzhujiantou.png');
                    this.game.win = false;
                },
                create: function () {
                    this.game.state.start('title');
                }
            },
            title: {
                create: function () {
                    this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
                    this.logo = this.game.add.sprite(this.game.world.width / 2 - 300, 150, 'logo');
                    this.logo.alpha = 0;
                    this.game.add.tween(this.logo).to({
                        alpha: 1
                    }, 1000, Phaser.Easing.Linear.None, true, 0);
                    this.startBtn = this.game.add.button(this.game.world.width / 2 - 89, this.game.world.height - 350, 'startbtn', this.startClicked);
                    this.startBtn.alpha = 0;
                    this.game.add.tween(this.startBtn).to({
                        alpha: 1
                    }, 1000, Phaser.Easing.Linear.None, true, 1000);


                },
                startClicked: function () {
                    this.game.state.start('play');
                }
            },

            play: {
                create: function () {
                    gameScore = 0;
                    this.currentFrame = 0;
                    this.particleInterval = 2 * 60;
                    this.gameSpeed = 580;
                    this.isGameOver = false;
                    this.win = false;
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
                    this.bg.fixedToCamera = true;
                    this.emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
                    this.platforms = this.game.add.group();
                    this.platforms.enableBody = true;
                    this.platforms.createMultiple(5, 'platform', 0, false);
                    this.platforms.setAll('anchor.x', 0.5);
                    this.platforms.setAll('anchor.y', 0.5);
                    var plat;
                    for (var i = 0; i < 5; i++) {
                        plat = this.platforms.getFirstExists(false);
                        plat.reset(i * 192, this.game.world.height - 300);
                        plat.width = 300 * 0.6;
                        plat.height = 88 * 0.6;
                        this.game.physics.arcade.enable(plat);
                        plat.body.immovable = true;
                        plat.body.bounce.set(0);
                    }
                    this.lastPlatform = plat;
                    this.santa = this.game.add.sprite(100, this.game.world.height - 650, 'santa-running');
                    this.santa.animations.add('run');
                    this.santa.animations.play('run', 30, true);
                    this.santa.width = 198 * 0.5;
                    this.santa.height = 330 * 0.5;
                    this.game.physics.arcade.enable(this.santa);
                    this.santa.body.gravity.y = 2500;
                    this.santa.body.collideWorldBounds = true;
                    this.game.camera.follow(this.santa);
                    this.cursors = this.game.input.keyboard.createCursorKeys();
                    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                    this.score = this.game.add.text(80, 50, '', {
                        font: '30px Arial',
                        fill: 'white'
                    });
                },
                update: function () {
                    var that = this;
                    if (!this.isGameOver) {
                        gameScore += 0.5;
                        this.gameSpeed += 0.02;
                        this.score.text = 'Score: ' + Math.floor(gameScore);
                        this.currentFrame++;
                        var moveAmount = this.gameSpeed / 60;
                        this.game.physics.arcade.collide(this.santa, this.platforms);
                        if (this.santa.body.bottom >= this.game.world.bounds.bottom) {
                            this.isGameOver = true;
                            this.endGame(false);
                        }
                        if (this.cursors.up.isDown && this.santa.body.touching.down || this.spacebar.isDown && this.santa.body.touching.down || this.game.input.mousePointer.isDown && this.santa.body.touching.down || this.game.input.pointer1.isDown && this.santa.body.touching.down) {
                            this.santa.body.velocity.y = -900;
                        }
                        if (this.particleInterval === this.currentFrame) {
                            this.currentFrame = 0;
                        }
                        this.platforms.children.forEach(function (platform) {
                            platform.body.position.x -= moveAmount;
                            if (platform.body.right <= 0) {
                                platform.kill();
                                var plat = that.platforms.getFirstExists(false);
                                plat.reset(that.lastPlatform.body.right + 400, that.game.world.height - Math.floor(Math.random() * 150) - 250);
                                plat.body.immovable = true;
                                that.lastPlatform = plat;
                            }
                        });
                        if (gameScore >= 1500) {
                            this.game.win = true;
                            this.isGameOver = true;
                            this.endGame();
                        }
                    }
                },
                endGame: function () {
                    this.game.state.start('gameOver');
                }
            },
            gameOver: {
                create: function () {
                    this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
                    this.score = this.game.add.text(this.game.world.width / 2 - 100, 300, 'Score: ' + Math.floor(gameScore), {
                        font: '42px Arial',
                        fill: 'white'
                    });
                    this.score.alpha = 0;
                    this.game.add.tween(this.score).to({
                        alpha: 1
                    }, 600, Phaser.Easing.Linear.None, true, 600);
                    this.restartBtn = this.game.add.button(this.game.world.width / 2 - 73.5, 480, 'startbtn', this.restartClicked);
                    this.restartBtn.alpha = 0;
                    this.game.add.tween(this.restartBtn).to({
                        alpha: 1
                    }, 600, Phaser.Easing.Linear.None, true, 1000);
                },
                restartClicked: function () {
                    if (this.game.win) {
                        var body = document.body
                        body.innerHTML = "";
                        achieve("兵贵神速")
                        play_once("win.ogg");
                        switch_place('beijing1.png')

                        var h4 = document.createElement('h4');
                        h4.style = "height: 300px; line-height: 365px; text-align: center; font-size: 32px; color: #000; z-index:999;"
                        content = document.createTextNode("恭喜你, 成功抓到小偷");

                        var next = document.createElement('a')
                        next.className = "bon"
                        for (var i = 0; i < 4; i++) {
                            var span = document.createElement('span')
                            next.appendChild(span);
                        }
                        var temp_txt = document.createTextNode("确认")
                        next.appendChild(temp_txt);
                        next.style = "border-radius: 10px; position: absolute; top: 490px; left: 725px; font-size: 30px; cursor: url('./pointer/hover.cur'), default; line-height: 25px; z-index:999;"


                        var center = document.createElement('div')
                        center.id = "center"
                        center.style = "margin: 200px auto 0; color: white; text-align: center; background-color: rgba(0, 0, 0, 0.3); height: 400px; width: 630px; line-height: 300px; font-size: 24px; font-family: XinHuaKaiTi-1;  background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px; z-index:999;"

                        h4.appendChild(content);
                        center.appendChild(h4);
                        center.appendChild(next);

                        center.style.display = "none";

                        body.appendChild(center);

                        $("#center").fadeIn();

                        next.addEventListener("click", function () {
                            save("小偷");
                            start_game('小偷');
                        })

                    }
                    else {
                        var body = document.body
                        body.innerHTML = "";
                        switch_place('beijing1.png')


                        var center = document.createElement('div')
                        center.id = "center"
                        center.style = "width: 1200px; height: 602px; margin: 0 auto; position: absolute; z-index: 100; top: 40px; left: 150px;"

                        var rule = document.createElement('div')
                        rule.id = 'rule';
                        rule.style = "width: 1120px; height: 540px; margin: 120px auto 0; color: #000; text-align: center; background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px;"

                        var h3 = document.createElement('h3')
                        h3.style = "font-size: 35px; padding-top: 30px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
                        var t0 = document.createTextNode("游戏失败")
                        h3.appendChild(t0)

                        var p1 = document.createElement('p');
                        var t1 = document.createTextNode('很遗憾, 你失败了');
                        var p2 = document.createElement('p');
                        var t2 = document.createTextNode('你没有及时抓到小偷,因此小偷把护身的法宝偷走了');
                        var p3 = document.createElement('p');
                        var t3 = document.createTextNode('你也因此在后面与太子的斗争中败亡');
                        var p4 = document.createElement('p');
                        var t4 = document.createTextNode('你可以选择:');

                        p1.appendChild(t1);
                        p2.appendChild(t2);
                        p3.appendChild(t3);
                        p4.appendChild(t4);

                        p1.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                        p2.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                        p3.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                        p4.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"

                        // var again = document.createElement("input");
                        // again.type = "button"
                        // again.value = "返回存档点"
                        // again.id = "comfirm";
                        // again.style = "position: relative; top: 30px; height: 60px; text-align: center; width: 180px; line-height: 30px; font-size: 30px; color: #fff; background-color: #000; border-radius: 10px; left: -200px; cursor: url('./pointer/hover.cur'), default;"
                        // again.onclick = function () {
                        //     chasing();
                        // }

                        // var comfirm = document.createElement("input");
                        // comfirm.type = "button"
                        // comfirm.value = "返回主页"
                        // comfirm.id = "comfirm";
                        // comfirm.style = "position: relative; top: 30px; height: 60px; text-align: center; width: 150px; line-height: 30px; font-size: 30px; color: #fff; background-color: #000; border-radius: 10px; left: 220px; cursor: url('./pointer/hover.cur'), default;"
                        // comfirm.onclick = function () {
                        //     window.location.reload();
                        // }
                        var again = document.createElement('a')
                        again.className = "bon"
                        for (var i = 0; i < 4; i++) {
                            var span = document.createElement('span')
                            again.appendChild(span);
                        }
                        var temp_txt = document.createTextNode("再玩一次")
                        again.appendChild(temp_txt);
                        again.style = "border-radius: 10px; position: relative; top: 30px; font-size: 30px; cursor: url('./pointer/hover.cur'), default; margin-left: 190px;"

                        again.onclick = function () {
                            chasing();
                        }

                        var comfirm = document.createElement('a')
                        comfirm.className = "bon"
                        for (var i = 0; i < 4; i++) {
                            var span = document.createElement('span')
                            comfirm.appendChild(span);
                        }
                        var temp_txt = document.createTextNode("返回主页")
                        comfirm.appendChild(temp_txt);
                        comfirm.style = "border-radius: 10px; position: relative; top: 30px; font-size: 30px; cursor: url('./pointer/hover.cur'), default;"

                        comfirm.onclick = function () {
                            window.location.reload();
                        }

                        rule.appendChild(h3)
                        rule.appendChild(p1)
                        rule.appendChild(p2)
                        rule.appendChild(p3)
                        rule.appendChild(p4)
                        rule.appendChild(comfirm)
                        rule.appendChild(again);

                        center.appendChild(rule);

                        body.appendChild(center);
                    }
                }
            }
        };
        SantaGame.init();
    }());
}

function falling() {
    var body = document.body;
    body.innerHTML = "";
    play_music("duobi.mp3")

    var stage = document.createElement('div')
    stage.className = "Stage";
    var midcont = document.createElement('div');
    midcont.id = "midcont";
    midcont.className = "mid_cont cursor";
    var gamestage = document.createElement('div');
    gamestage.className = "gamestage";
    for (var i = 1; i <= 12; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        star.id = "star" + i;
        gamestage.appendChild(star);
    }
    var score = document.createElement('div');
    score.className = "Score";
    var Score = document.createElement('div');
    Score.id = "Score";

    var reward = document.createElement('div');
    reward.className = "reward";
    reward.id = "reward1";

    var Spacecraft = document.createElement('div');
    Spacecraft.className = "Spacecraft";
    Spacecraft.id = "Spacecraft";

    score.appendChild(Score);

    gamestage.appendChild(score);
    gamestage.appendChild(reward);

    midcont.appendChild(gamestage);
    midcont.appendChild(Spacecraft);

    stage.appendChild(midcont);

    body.appendChild(stage);

    game()
    function game() {
        var stars = Array()
        for (var i = 1; i <= 12; i++) {
            star = document.getElementById('star' + i);
            stars.push(star);
        }

        var reward1 = document.getElementById('reward1');

        var Spacecraft = document.getElementById('Spacecraft');
        var Scorediv = document.getElementById('Score');
        var basespeed = 1.25;
        var speed = 2;

        var score = 0;

        var midcont = document.getElementById('midcont');

        //宇宙飞船坐标
        var spx1 = null;
        var spx2 = null;
        var spy1 = null;
        var spy2 = null;

        var starsx1 = Array();
        var starsx2 = Array();
        var starsy1 = Array();
        var starsy2 = Array();

        for (var i = 1; i <= 12; i++) {
            starx1 = null;
            starx2 = null;
            stary1 = null;
            stary2 = null;
            starsx1.push(starx1);
            starsx2.push(starx2);
            starsy1.push(stary1);
            starsy2.push(stary2);
        }

        var reward1x1 = null;
        var reward1x2 = null;
        var reward1y1 = null;
        var reward1y2 = null;

        document.onmousemove = function (ev) {

            var oEvent = ev || event;
            var scrollLeft = oEvent.clientX;
            var scrollTop = oEvent.clientX;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            marginlr = (document.body.offsetWidth - midcont.clientWidth) / 2;

            Spacecraft.style.left = oEvent.clientX + scrollLeft - marginlr - 25 + 'px';
            Spacecraft.style.top = oEvent.clientY + scrollTop - 25 + 'px';

            marginlr = (document.body.offsetWidth - midcont.clientWidth) / 2;
            if (marginlr < 0) {
                marginlr = 0;
            }
            spx1 = Spacecraft.offsetLeft;
            spx2 = Spacecraft.offsetLeft + 50;
            spy1 = Spacecraft.offsetTop;
            spy2 = Spacecraft.offsetTop + 50;
        };


        function ckstarTop() {
            for (var i = 0; i < 12; i++) {
                starsx1[i] = stars[i].offsetLeft;
                starsx2[i] = stars[i].offsetLeft + 100;
                starsy1[i] = stars[i].offsetTop;
                starsy2[i] = stars[i].offsetTop + 100;
                if (spx1 > starsx1[i] && spx1 < starsx2[i] && spy1 > starsy1[i] && spy1 < starsy2[i] || spx2 > starsx1[i] && spx2 < starsx2[i] && spy1 > starsy1[i] && spy1 < starsy2[i] || spx1 > starsx1[i] && spx1 < starsx2[i] && spy2 > starsy1[i] && spy2 < starsy2[i] || spx2 > starsx1[i] && spx2 < starsx2[i] && spy2 > starsy1[i] && spy2 < starsy2[i]) {
                    score = 0;
                }
            }

        }

        var ckstar = setInterval(ckstarTop, 1);
        function fallen() {
            var randomNum = Math.floor(Math.random() * 12);

            stars[randomNum].style.transition = "all linear " + speed + "s";
            stars[randomNum].style.top = window.screen.height + 100 + 'px';
        }
        var randomfall = setInterval(fallen, 300);
        var randomfall = setInterval(fallen, 500);
        var randomfall = setInterval(fallen, 700);
        var randomfall = setInterval(fallen, 900);
        var randomfall = setInterval(fallen, 1100);

        function ckfallenH() {

            var tws = Array();

            for (var i = 0; i < 12; i++) {
                tws.push(stars[i].offsetTop);
                if (tws[i] > midcont.clientHeight) {
                    stars[i].style.transition = "left ease 1s";
                    stars[i].style.top = "-100px";
                    score++;
                }
            }

        }
        var ckfallenHloop = setInterval(ckfallenH, 1);


        function ckgetScore() {
            reward1x1 = reward1.offsetLeft;
            reward1x2 = reward1.offsetLeft + 60;
            reward1y1 = reward1.offsetTop;
            reward1y2 = reward1.offsetTop + 60;


            if (spx1 > reward1x1 && spx1 < reward1x2 && spy1 > reward1y1 && spy1 < reward1y2 || spx2 > reward1x1 && spx2 < reward1x2 && spy1 > reward1y1 && spy1 < reward1y2 || spx1 > reward1x1 && spx1 < reward1x2 && spy2 > reward1y1 && spy2 < reward1y2 || spx2 > reward1x1 && spx2 < reward1x2 && spy2 > reward1y1 && spy2 < reward1y2) {
                reward1.style.transition = 'background ease 0.1s';
                reward1.style.left = '-60px';
                score = score + 10;
            }


        }
        var ckgetScore = setInterval(ckgetScore, 1)

        function reward() {
            var rewardNum = Math.random() * 100;
            if (rewardNum <= 30) {
                reward1.style.transition = 'all linear 2s';
                reward1.style.left = '100%';
            } else {

            }

        }
        var rewardSlide = setInterval(reward, 2000);
        function ckreward() {
            if (reward1.offsetLeft >= midcont.clientWidth) {
                reward1.style.transition = 'background ease 0.1s';
                reward1.style.left = '-60px';
            }
        }
        var ckreward = setInterval(ckreward, 1);

        function setrewardTop() {
            reward1.style.top = Math.random() * 580 + 'px';
        }
        var setrewardTop = setInterval(setrewardTop, 500);


        function setBaseSpeed(i) {
            basespeed = i;
        }

        var speedset = setInterval(function () {
            if (score == 0) {
                setBaseSpeed(1.5);
            } else if (score >= 1 && score < 50) {
                setBaseSpeed(1.25);

            } else if (score >= 50 && score < 100) {
                setBaseSpeed(1);
            } else if (score <= 100 && score < 150) {
                setBaseSpeed(0.75);
            } else if (score >= 150 && score < 200) {
                setBaseSpeed(0.5);
            } else if (score >= 200) {
                setBaseSpeed(0.25);
            }
            speed = Math.random() * 1.5 + basespeed;
        }, 1);

        function setScore() {
            Scorediv.innerHTML = score;
            if (score >= 200) {
                for (let i = 1; i < 100000; i++) {
                    clearInterval(i);
                }
                achieve("身手矫健")
                play_once("win.ogg");
                var h4 = document.createElement('h4');
                h4.style = "height: 300px; line-height: 400px; text-align: center; color: #000; font-size: 50px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
                content = document.createTextNode("恭喜你, 通关成功");

                var next = document.createElement('a')
                next.className = "bon"
                for (var i = 0; i < 4; i++) {
                    var span = document.createElement('span')
                    next.appendChild(span);
                }
                var temp_txt = document.createTextNode("确认")
                next.appendChild(temp_txt);
                next.style = "border-radius: 10px; position: absolute; top: 300px; left: 300px; font-size: 40px; cursor: url('./pointer/hover.cur'), default; line-height: 25px; z-index:999;"


                var center = document.createElement('div')
                center.id = "center"
                center.style = "width: 730px; height: 460px; margin: 0 auto; position: absolute; top: 136px; left: 50%; transform: translate(-50%);background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px; z-index: 10000;"

                h4.appendChild(content);
                center.appendChild(h4);
                center.appendChild(next);
                center.style.display = "none";

                body.appendChild(center);
                $("#center").fadeIn();

                next.addEventListener("click", function () {
                    save("陷阱");
                    start_game('陷阱');
                })
            }
        }
        var setScore = setInterval(setScore, 1);

    }

}

function duobi() {
    var body = document.body;
    body.innerHTML = "";

    switch_place("躲避.jpeg")
    play_music("duobi.mp3")

    var stage = document.createElement('div')
    stage.className = "Stage"
    stage.style = "width: 100%; min-width: 1200px; height: 100%;";
    var mid_cont = document.createElement('div')
    mid_cont.style = "width: 100%; height: 100%; position: absolute; z-index: 4; font-size: 120px; text-align: center; font-weight: bold; font-family: Bernard MT Condensed; overflow: hidden;";
    mid_cont.className = "mid_cont";

    var img = document.createElement('img');
    img.src = "uploads/logo1.png"
    img.style = "position: absolute; top: 10%; left: 55%; transform: translate(-50%); width: 704px; height: 278px;";
    var span = document.createElement('span');
    span.innerText = "Start";

    mid_cont.appendChild(img);
    mid_cont.appendChild(span);

    stage.appendChild(mid_cont);
    body.appendChild(stage);

    span.onclick = function () {
        falling();
    }
}

function plane_game() {
    var body = document.body;
    body.innerHTML = "";

    play_music("飞机.mp3")
    var battleground = document.createElement("div");
    battleground.id = "battleground";
    battleground.className = "cursor"
    battleground.style = "width: 100%; height: 100%; background: url(img/NJJC2.png) repeat-y; background-size: cover; margin: auto; background-position: 0 0; position: absolute; top: 0vw; left: 0; right: 0; bottom: 0; z-index: 1; overflow: hidden; cursor: none;"

    var data = document.createElement("div");
    data.id = "data";
    data.className = "cursor"
    data.style = "width: 100%; height: 100%; margin: auto; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;"

    var data_top = document.createElement('div');
    data_top.id = "data_top";
    data_top.style = "width: 100%;overflow: hidden;"

    var scores = document.createElement("div");
    scores.id = "scores";
    scores.style = "position: absolute; top: 3.3333vw; right: 13.3333vw;"

    var fScores = document.createElement('div');
    fScores.id = "fScores"
    fScores.style = "padding-left: 1.6vw; overflow: hidden; float: left; width: 26.6667vw;"

    var hpBox = document.createElement("div");
    hpBox.id = "hpBox"
    hpBox.style = "position: absolute; left: 3.6667vw; top: 2.3333vw;"

    var myHP = document.createElement("img")
    myHP.id = "myHP"
    myHP.src = "img/hp_0.png"
    myHP.style = "width: 5.3333vw; float: left; margin: 1.3333vw 1.3333vw 0 0;"

    var myHpView = document.createElement('div');
    myHpView.id = "myHpView"
    myHpView.style = "height: 1.3333vw; width: 13.3333vw; border: 0.2667vw solid #964a2c; float: left; margin-top: 1.6vw;"

    var nowHp = document.createElement('div')
    nowHp.id = "nowHp"
    nowHp.style = "height: 1.3333vw; width: 13.3333vw; background: #ec4f00;"

    var data_middle = document.createElement('div')
    data_middle.id = "data_middle"
    data_middle.style = "width: 100%; position: absolute; top: 8vw; right: 13.3333vw; overflow: hidden;"

    var boss = document.createElement('div')
    boss.id = "boss"
    boss.style = "position: absolute; top: 0.9333vw; left: 22.6667vw; display: none;"

    var bossTit = document.createElement('div')
    bossTit.id = "bossTit"
    bossTit.innerText = "BOSS"
    bossTit.style = "float: left; color: #fff; font-size: 2.6667vw; font-weight: bold; font-family: '宋体';"

    var bossHp = document.createElement('div')
    bossHp.id = "bossHp"
    bossHp.style = "height: 1.3333vw; width: 16vw; border: 0.2667vw solid #964a2c; float: left; margin-top: 0.6667vw; margin-left: 0.6667vw;"

    var bossNowHp = document.createElement('div')
    bossNowHp.id = "bossNowHp"
    bossNowHp.style = "height: 1.3333vw; width: 16vw; background: red;"

    var bgRed = document.createElement('img')
    bgRed.id = "bgRed"
    bgRed.src = "img/boooo.png"
    bgRed.style = "width: 100%; height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 5; display: none;"

    var gameOver = document.createElement("div")
    gameOver.id = "gameOver"
    gameOver.style = "width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 2; display: none; overflow: hidden;"

    var overTit = document.createElement("div")
    overTit.id = "overTit"
    overTit.style = "text-align: center; width: 100%; margin: 20vw 0;"

    var overTitImg_0 = document.createElement('img')
    overTitImg_0.id = "overTitImg_0"
    overTitImg_0.src = "img/over_0.png"
    overTitImg_0.style = "width: 40vw; margin: 14.1333vw; display: none;"


    var overTitImg_1 = document.createElement('img')
    overTitImg_1.id = "overTitImg_1"
    overTitImg_1.src = "img/over_1.png"
    overTitImg_1.style = "width: 40vw; margin: 14.1333vw; display: none;"

    var overImg = document.createElement('div')
    overImg.id = "overImg"
    overImg.style = "width: 100%; text-align: center; margin: 6.6667vw auto 0;"

    var restart = document.createElement('div')
    restart.id = "restart"
    restart.style = "width: 23.0667vw; margin: 10.6667vw auto;"

    var img = document.createElement('img')
    img.src = "img/restart.png"
    img.style = "position: absolute; left: 50%; transform: translate(-50%);"

    restart.appendChild(img)
    overTit.appendChild(overTitImg_0)
    overTit.appendChild(overTitImg_1)
    gameOver.appendChild(overTit)
    gameOver.appendChild(overImg)
    gameOver.appendChild(restart)

    bossHp.appendChild(bossNowHp)
    boss.appendChild(bossTit)
    boss.appendChild(bossHp)

    myHpView.appendChild(nowHp)
    hpBox.appendChild(myHP)
    hpBox.appendChild(myHpView)
    fScores.appendChild(hpBox)
    data_top.appendChild(scores)
    data_top.appendChild(fScores)

    data.appendChild(data_top)
    data.appendChild(data_middle)
    data.appendChild(boss)

    body.appendChild(battleground)
    body.appendChild(data)
    body.appendChild(bgRed)
    body.appendChild(gameOver)










    var btg = $("battleground");

    var scoresBox = $("scores");
    var gameOver = $("gameOver");
    var overImg = $("overImg");
    var fPath = $("data_middle");
    var overTit = $("overTit");
    var maxScores = $("maxScores");
    var restart = $("restart");
    var nowHp = $("nowHp");
    var bossView = $("boss");
    var bossHp = $("bossNowHp");
    var flightPath = 0; //飞行路程
    var scores = 0; //分数
    var bulletSpeed = 10; //子弹速度
    var probability = 40; //掉落物概率   总掉落率 = 掉落物种类/probability
    var bulletLevel = 0; //子弹等级
    var planeLevel = 0; //飞机等级
    var bulletRows = 1; //子弹排数
    var isDie = false; //飞机是否死亡
    var userHP = 100;  //用户血量
    var times;
    var myPlane;
    var userName;
    var plane = [{
        width: 116,
        height: 92,
        positionX: -393,
        positionY: -102,
        background: "url(img/img_plane_main.png)"
    }, {
        width: 116,
        height: 94,
        positionX: -127,
        positionY: -107,
        background: "url(img/img_plane_main.png)"
    }, {
        width: 118,
        height: 100,
        positionX: -393,
        positionY: 0,
        background: "url(img/img_plane_main.png)"
    }, {
        width: 130,
        height: 106,
        positionX: -137,
        positionY: 0,
        background: "url(img/img_plane_main.png)"
    }];
    var bullet = [{
        width: 14,
        height: 32,
        speed: 10,
        positionX: -335,
        positionY: -171,
        background: "url(img/img_bullet.png)"
    }, {
        width: 14,
        height: 32,
        speed: 4,
        positionX: -335,
        positionY: -171,
        background: "url(img/img_bullet.png)"
    }];
    var hPlanes = [{
        width: 98,
        height: 76,
        speed: 5,
        score: 100,
        positionX: -267,
        positionY: -474,
        background: "url(img/img_plane_enemy.png)",
        HP: 1
    }, {
        width: 104,
        height: 76,
        speed: 5,
        score: 100,
        positionX: -162,
        positionY: -474,
        background: "url(img/img_plane_enemy.png)",
        HP: 1
    }, {
        width: 114,
        height: 82,
        speed: 20,
        score: 1000,
        positionX: -367,
        positionY: -440,
        background: "url(img/img_plane_enemy.png)",
        HP: 2
    }, {
        width: 104,
        height: 76,
        speed: 5,
        score: 200,
        positionX: -162,
        positionY: -474,
        background: "url(img/img_plane_enemy.png)",
        HP: 2
    }, {
        width: 175,
        height: 133,
        speed: 4,
        score: 500,
        positionX: -190,
        positionY: -340,
        background: "url(img/img_plane_enemy.png)",
        HP: 5
    }, {
        width: 260,
        height: 196,
        speed: 3,
        score: 2000,
        positionX: 0,
        positionY: -2,
        background: "url(img/img_plane_enemy.png)",
        HP: 20
    }];
    var bosses = [
        {
            width: 306,
            height: 236,
            score: 20000,
            speedX: 1,
            speedY: 1,
            src: "img/img_plane_boss_0.png",
            HP: 50
        }, {
            width: 350,
            height: 234,
            score: 20000,
            speedX: 1,
            speedY: 1,
            src: "img/img_plane_boss_1.png",
            HP: 100
        }, {
            width: 442,
            height: 258,
            score: 20000,
            speedX: 1,
            speedY: 1,
            src: "img/img_plane_boss_2.png",
            HP: 200
        }];
    var bombImg = ["wsparticle_06.png", "wsparticle_07.png", "wsparticle_04.png"];
    var bulletDrops = [{
        index: 1,
        width: 50,
        height: 30,
        src: "img/drop_0.png"
    }, {
        index: 2,
        width: 48,
        height: 30,
        src: "img/drop_1.png"
    }, {
        index: 3,
        width: 28,
        height: 24,
        src: "img/add_hp.png"
    }
    ];
    var hostileBullets = [
        [{
            ATK: 20,
            width: 30,
            height: 30
        },
        ["img/h_bullet_10.png", "img/h_bullet_11.png", "img/h_bullet_12.png", "img/h_bullet_13.png"]
        ],
        [{
            ATK: 10,
            width: 30,
            height: 30
        },
        ["img/h_bullet_20.png", "img/h_bullet_21.png", "img/h_bullet_22.png", "img/h_bullet_23.png"]
        ]
    ];
    function $(id) {
        return document.getElementById(id);
    }

    startGame();
    restart.onclick = startGame;

    //初始化
    function reset() {
        btg.innerHTML = "";
        flightPath = 0;
        scores = 0;
        userHP = 100;
        isPause = false;
        isDie = false;
        bulletRows = 1;
        bulletLevel = 0;
        bulletSpeed = bullet[bulletLevel].speed;
        gameOver.style.display = "none";
        bossView.style.display = "none";
        overTit.getElementsByTagName("img")[0].style.display = "none";
        overTit.getElementsByTagName("img")[1].style.display = "none";
        nowHp.style.width = "13.3333vw";
    }
    function resetMyPlane() {
        var startTop = 600;
        var startLeft = 256 - plane[planeLevel].width / 2;
        createPlane(planeLevel, plane, startTop, startLeft);
        document.onmousemove = function (e) {
            e = e || window.event;
            if (!isPause) {
                movePlane(e);
            }
        }
    }
    var cPlane = btg.getElementsByClassName("hostilePlane");
    var cBoss = btg.getElementsByClassName("boss");
    function startGame() {
        reset();//初始化
        resetMyPlane();
        clearInterval(times);
        times = setInterval(function () {
            if (!isPause) {
                // btg.style.backgroundPosition = "0vw " + flightPath + "px";
                flightPath++; //飞行路程
                scores += 1;
                createScores(scores, scoresBox);
                if (flightPath % bulletSpeed == 0) {
                    createBulletRows(bulletRows, bulletLevel) //创建子弹
                }
                moveBullet(); //移动子弹
                chooseHostilePlane(); //随机生成敌机
                moveHostilePlane(); //移动敌机
                collideBullte(cPlane); //打中敌机检测
                collideBullte(cBoss);//打中boss
                chooseBoss();//生成boss
                moveBoss(); //boss移动
                myPlaneCollide(cPlane, struckMyPlane); //己方飞机碰撞敌机检测
                myPlaneCollide(cBoss, struckMyPlane); //己方飞机碰撞敌机检测
                var bDrop = btg.getElementsByClassName("bulletDrop");
                myPlaneCollide(bDrop, collideBulletDrop); //掉落 弹药加强 检测
                var hBullet = btg.getElementsByClassName("hBullet");
                myPlaneCollide(hBullet, collideMyPlane) //己方飞机中弹检测
                createFlightPath(flightPath); //生成公里数
            }
        }, 20);
    }

    //myPlane受伤
    function beInjured() {
        bgRed.style.display = "block";
        setTimeout(function () {
            bgRed.style.display = "none";
        }, 150);
    }
    //己方飞机碰撞敌机处理
    function struckMyPlane(hElement) {
        if (userHP > 50) {
            userHP -= 50;
            beInjured();
            nowHp.style.width = userHP + "px";
            if (hElement.className == "hostilePlane") {
                bomb(hElement);
            }
        } else {
            beInjured();
            bomb(hElement);
            myPlaneBomb();
        }
    }
    //生成公里数
    function createFlightPath(flightPath) {
        flightPath = flightPath.toString();
        fPath.innerHTML = "";
        if (flightPath.length < 4) {
            var fPathImg = document.createElement("img");
            fPathImg.src = "img/path_f_1.png";
            fPathImg.style.width = "2.6667vw";
            fPath.appendChild(fPathImg);
            for (var i = flightPath.length - 1; i >= 0; i--) {
                fPathImg = document.createElement("img");
                fPathImg.src = "img/path_" + flightPath[i] + ".png";
                fPath.appendChild(fPathImg);
            }
        } else {
            var fPathImg = document.createElement("img");
            fPathImg.src = "img/path_f_1.png";
            fPathImg.style.width = "2.6667vw";
            fPath.appendChild(fPathImg);
            fPathImg = document.createElement("img");
            fPathImg.src = "img/path_f_2.png";
            fPathImg.style.width = "2.6667vw";
            fPath.appendChild(fPathImg);
            for (var i = flightPath.length - 2; i >= 0; i--) {
                if (i == flightPath.length - 4) {
                    fPathImg = document.createElement("img");
                    fPathImg.src = "img/dian.png";
                    fPathImg.style.width = "1.6vw";
                    fPathImg.style.marginTop = "0.6667vw";
                    fPath.appendChild(fPathImg);
                }
                fPathImg = document.createElement("img");
                fPathImg.src = "img/path_" + flightPath[i] + ".png";
                fPath.appendChild(fPathImg);
            }
        }
    }
    //打中敌机检测

    function collideBullte(cPlane) {
        var bullets = btg.getElementsByClassName("myBullet");
        //子弹碰撞检测
        for (var i = 0; i < bullets.length; i++) {
            for (var j = 0; j < cPlane.length; j++) {
                if (!bullets[i]) {
                    continue;
                }
                var bLeft = parseInt(bullets[i].style.left);
                var bTop = parseInt(bullets[i].style.top);
                var hLeft = parseInt(cPlane[j].style.left);
                var hTop = parseInt(cPlane[j].style.top);
                var bHeight = parseInt(bullets[i].offsetHeight);
                var bWidth = parseInt(bullets[i].offsetWidth);
                var hHeight = parseInt(cPlane[j].offsetHeight);
                var hWidth = parseInt(cPlane[j].offsetWidth);
                if (cPlane[j].HP > 0 && bLeft > hLeft - bWidth && bLeft < hLeft + hWidth && bTop < hTop + hHeight - bHeight && bTop > hTop - bHeight) {
                    btg.removeChild(bullets[i]);
                    cPlane[j].HP--;
                    if (cPlane[j].className == "boss") {
                        bossHp.style.width = Math.ceil(cPlane[j].HP / cPlane[j].maxHP * 120) + "px";
                    }
                    if (cPlane[j].HP <= 0) {
                        scores = scores + cPlane[j].score;
                        createScores(scores, scoresBox); //生成分数
                        if (cPlane[j].className == "boss") {
                            bossView.style.display = "none";
                        }
                        bomb(cPlane[j]);
                    }
                }
            }
        }
    }
    //己方飞机爆炸处理
    function myPlaneBomb() {
        bomb(myPlane);
        var max = 0;

        createScores(scores, overImg);
        gameOver.style.display = "block";
        isDie = true;
        clearInterval(times);
    }
    //生成分数
    function createScores(scores, sElement) {
        scores = scores.toString();
        sElement.innerHTML = "";
        for (var i = 0; i < scores.length; i++) {
            var scoresImg = document.createElement("img");
            scoresImg.src = "img/number_" + scores[i] + ".png";
            sElement.appendChild(scoresImg);
        }
    }
    //吃到弹药处理
    function collideBulletDrop(dElement) {
        switch (dElement.index) {
            case 1:
                {
                    bulletSpeed -= 2;
                    if (bulletSpeed < 2) {
                        bulletSpeed = 2;
                    }
                    break;
                }
            case 2:
                {
                    if (bulletRows < 4) {
                        bulletRows++;
                        var oLeft = myPlane.offsetLeft;
                        var oTop = myPlane.offsetTop;
                        btg.removeChild(myPlane);
                        createPlane(bulletRows - 1, plane, oTop, oLeft);
                    }
                    break;
                }
            case 3:
                {
                    if (userHP < 100) {
                        userHP += 20;
                        userHP = Math.min(userHP, 100);
                        nowHp.style.width = userHP + "px";
                    }
                    break;
                }
        }
        btg.removeChild(dElement);
    }
    //my飞机碰撞检测
    function myPlaneCollide(sth, fn) {
        //飞机碰撞检测
        for (var j = 0; j < sth.length; j++) {
            var hLeft = parseInt(sth[j].style.left);
            var hTop = parseInt(sth[j].style.top);
            var hHeight = parseInt(sth[j].offsetHeight);
            var hWidth = parseInt(sth[j].offsetWidth);
            var mLeft = parseInt(myPlane.style.left);
            var mTop = parseInt(myPlane.style.top);
            var mHeight = parseInt(myPlane.offsetHeight);
            var mWidth = parseInt(myPlane.offsetWidth);
            if (mLeft + Math.floor(mWidth / 3 * 2) > hLeft && ((mLeft + mWidth / 3 * 1) < hLeft + hWidth) && mTop < hTop + hHeight / 2 && (mTop > hTop - mHeight / 2)) {
                fn(sth[j]);
            }
        }
    }
    //myPlane中弹处理
    function collideMyPlane(hBelement) {
        nowHp.style.width = parseInt(nowHp.style.width) - hBelement.ATK + "px";
        userHP -= hBelement.ATK;
        beInjured();
        if (userHP <= 0) {
            myPlaneBomb();
        }
        if (bulletSpeed < 10) {
            bulletSpeed += 2;
        }
        if (bulletRows > 1) {
            bulletRows--;
            var oLeft = myPlane.offsetLeft;
            var oTop = myPlane.offsetTop;
            btg.removeChild(myPlane);
            createPlane(bulletRows - 1, plane, oTop, oLeft);
        }
        bomb(hBelement);
        //btg.removeChild(hBelement);
    }
    //飞机爆炸
    function bomb(bombPlane) {
        play_once("爆炸.mp3")
        bombPlane.className = "bombPlane";
        bombPlane.style.backgroundImage = "url(img/" + bombImg[0] + ")";
        bombPlane.style.backgroundPosition = "center";
        bombPlane.style.backgroundRepeat = "no-repeat";
        var index = 1;
        clearInterval(bombPlane.times);
        bombPlane.times = setInterval(function () {
            bombPlane.style.backgroundImage = "url(img/" + bombImg[index] + ")";
            index++;
            if (index == 3) {
                chooseCreateDrop(bombPlane, probability) //生成掉落物 probability可能性
                clearInterval(bombPlane.times);
                try {
                    btg.removeChild(bombPlane);
                } catch (e) {
                    // handle the exception
                }
            }
        }, 50);
    }
    //移动敌机
    function moveHostilePlane() {
        var hPlanes = btg.getElementsByClassName("hostilePlane");
        for (var i = 0; i < hPlanes.length; i++) {
            hPlanes[i].style.top = parseInt(hPlanes[i].style.top) + hPlanes[i].speed + "px";
            if (parseInt(hPlanes[i].style.top) > window.screen.height) {
                btg.removeChild(hPlanes[i]);
            }
        }
    }
    //随机生产掉落物
    function chooseCreateDrop(bombPlane, probability) {
        var hTop = parseInt(bombPlane.style.top) + parseInt(bombPlane.offsetHeight) / 2;
        var hLeft = parseInt(bombPlane.style.left) + parseInt(bombPlane.offsetWidth) / 2;
        var level = Math.floor(Math.random() * (probability + 1));
        createDrop(hTop, hLeft, bulletDrops, level);
    }
    //创建掉落物
    function createDrop(dTop, dLeft, arrDrop, level) {
        if (level > arrDrop.length - 1) {
            return;
        }
        var drop = document.createElement("img");
        drop.style.width = arrDrop[level].width + "px";
        drop.style.height = arrDrop[level].height + "px";
        drop.src = arrDrop[level].src;
        drop.index = arrDrop[level].index;
        drop.className = "bulletDrop";
        drop.style.position = "absolute";
        drop.style.top = dTop - arrDrop[level].height / 2 + "px";
        drop.style.left = dLeft - arrDrop[level].width / 2 + "px";
        btg.appendChild(drop);
        moveDrop(drop);
    }
    //移动掉落物
    function moveDrop(dElement) {
        var xSpeed = Math.floor(Math.random() * 9) - 4;
        var ySpeed = -Math.floor(Math.random() * 10);
        var aSpeedY = 1;
        clearInterval(dElement.times);
        dElement.times = setInterval(function () {
            if (!isPause) {
                dElement.style.top = parseInt(dElement.style.top) + ySpeed + "px";
                dElement.style.left = parseInt(dElement.style.left) + xSpeed + "px";
                //aSpeedY++;
                if (ySpeed < 5) {
                    ySpeed += aSpeedY;
                }
                if (parseInt(dElement.style.left) <= 0 || parseInt(dElement.style.left) >= window.screen.width - dElement.offsetWidth) {
                    xSpeed = xSpeed * -1;
                }
                if (parseInt(dElement.style.top) > window.screen.height) {
                    clearInterval(dElement.times);
                }
            }
        }, 20)
    }
    //选择生成敌机
    function chooseHostilePlane() {
        var pLeft = 0;
        var hp;
        if (flightPath % 700 == 0) {
            pLeft = Math.floor(Math.random() * (window.screen.width - hPlanes[5].width));
            hp = createHostilePlane(pLeft, hPlanes, 5);
            var rows = 0;
            clearInterval(hp.times);
            hp.times = setInterval(function () {
                if (!isPause) {
                    rows++;
                    createSectorBullet(hp, 1);
                    if (rows > 1 || isDie || (hp.HP == 0)) {
                        clearInterval(hp.times);
                    }
                }
            }, 500);
        } else if (flightPath % 300 == 0) {
            pLeft = Math.floor(Math.random() * (window.screen.width - hPlanes[4].width));
            createHostilePlane(pLeft, hPlanes, 4)
        } else if (flightPath % 150 == 0) {
            pLeft = Math.floor(Math.random() * (window.screen.width - hPlanes[2].width));
            createHostilePlane(pLeft, hPlanes, 2)
        } else if (flightPath % 75 == 0) {
            pLeft = Math.floor(Math.random() * (window.screen.width - hPlanes[1].width));
            createHostilePlane(pLeft, hPlanes, 1)
        } else if (flightPath % 30 == 0) {
            pLeft = Math.floor(Math.random() * (window.screen.width - hPlanes[0].width));
            createHostilePlane(pLeft, hPlanes, 0);
        }
    }
    //移动boss
    function moveBoss() {
        var boss = btg.getElementsByClassName("boss");
        for (var i = 0; i < boss.length; i++) {
            boss[i].style.top = parseInt(boss[i].style.top) + boss[i].speedY + "px";
            boss[i].style.left = parseInt(boss[i].style.left) + boss[i].speedX + "px";
            if (parseInt(boss[i].style.top) >= 100 || parseInt(boss[i].style.top) <= -100) {
                boss[i].speedY = boss[i].speedY * -1;
            }
            if (parseInt(boss[i].style.left) >= (512 - boss[i].offsetWidth) || parseInt(boss[i].style.left) <= 0) {
                boss[i].speedX = boss[i].speedX * -1;
            }
        }
    }
    //生成boss的位置
    function chooseBoss() {
        var pLeft = 0;
        var hp;
        if (flightPath % 10000 == 0) {
            pLeft = Math.floor((window.screen.width - bosses[2].width) / 2);
            hp = createBoss(pLeft, bosses, 2);
            clearInterval(hp.times);
            hp.times = setInterval(function () {
                if (!isPause) {
                    createSectorBullet(hp, 1);
                    if (isDie || (hp.HP == 0)) {
                        clearInterval(hp.times);
                    }
                }
            }, 1000);
        } else if (flightPath == 6000) {
            pLeft = Math.floor((window.screen.width - bosses[1].width) / 2);
            hp = createBoss(pLeft, bosses, 1);
            clearInterval(hp.times);
            hp.times = setInterval(function () {
                if (!isPause) {
                    createSectorBullet(hp, 1);
                    if (isDie || (hp.HP == 0)) {
                        clearInterval(hp.times);
                    }
                }
            }, 1000);
        } else if (flightPath == 3000) {
            pLeft = Math.floor((window.screen.width - bosses[0].width) / 2);
            hp = createBoss(pLeft, bosses, 0);
            clearInterval(hp.times);
            hp.times = setInterval(function () {
                if (!isPause) {
                    createSectorBullet(hp, 1);
                    if (isDie || (hp.HP == 0)) {
                        clearInterval(hp.times);
                    }
                }
            }, 1000);
        }
    }
    //创建boss
    function createBoss(pLeft, bosses, level) {
        var boss = document.createElement("img");
        bossView.style.display = "block";
        boss.style.width = bosses[level].width + "px";
        boss.style.height = bosses[level].height + "px";
        boss.src = bosses[level].src;
        boss.HP = bosses[level].HP * Math.ceil(flightPath / 1000);
        boss.maxHP = boss.HP;
        boss.score = bosses[level].score;
        boss.className = "boss";
        boss.speedX = bosses[level].speedX;
        boss.speedY = bosses[level].speedY;
        boss.style.position = "absolute";
        boss.style.top = "1.3333vw";
        boss.style.left = pLeft + "px";
        btg.appendChild(boss);
        return boss;
    }
    //创建一颗敌方子弹
    function createHostileBullet(bLeft, bTop, hostileBullet) { //坐标 和 子弹对象
        var hBullet = document.createElement("img");
        hBullet.className = "hBullet";
        hBullet.style.width = hostileBullet[0].width + "px";
        hBullet.style.height = hostileBullet[0].height + "px";
        hBullet.ATK = hostileBullet[0].ATK;
        hBullet.style.position = "absolute";
        hBullet.style.top = bTop + "px";
        hBullet.style.left = bLeft + "px";
        hBullet.index = 0;
        hBullet.src = hostileBullet[1][0];
        clearInterval(hBullet.times);
        hBullet.times = setInterval(function () {
            if (!isPause) {
                hBullet.index++;
                if (hBullet.index > 3) {
                    hBullet.index = 0;
                }
                hBullet.src = hostileBullet[1][hBullet.index];
                if (parseInt(hBullet.style.top) >= window.screen.height || parseInt(hBullet.style.left) <= -parseInt(hBullet.style.width) || parseInt(hBullet.style.left) >= window.screen.width) {
                    clearInterval(hBullet.times);
                }
            }
        }, 200);
        btg.appendChild(hBullet);
        return hBullet;
    }
    //移动敌方子弹
    function moveHostileBullet(xV, yV, hElement) { //x轴速度 y轴速度  定时器+自清除
        clearInterval(hElement.times2);
        hElement.times2 = setInterval(function () {
            if (!isPause) {
                hElement.style.top = parseInt(hElement.style.top) + yV + "px";
                hElement.style.left = parseInt(hElement.style.left) + xV + "px";
                if (isDie || parseInt(hElement.style.top) >= window.screen.height || parseInt(hElement.style.left) <= -parseInt(hElement.style.width) || parseInt(hElement.style.left) >= window.screen.width) {
                    clearInterval(hElement.times2);
                    try {
                        btg.removeChild(hElement);
                    } catch (e) {
                        // handle the exception
                    }
                }
            }
        }, 30);
    }
    //生产扇形子弹
    function createSectorBullet(HostilePlane, bLevel) { //敌方飞机对象  根据敌方飞机生成扇形子弹
        var hLeft = HostilePlane.offsetLeft;
        var hTop = HostilePlane.offsetTop;
        var hWidth = HostilePlane.offsetWidth;
        var hHeight = HostilePlane.offsetHeight;
        var bSpace = Math.floor(hWidth / 5);
        var hb = createHostileBullet(hLeft, hTop + hHeight / 2, hostileBullets[bLevel]);
        moveHostileBullet(-2, 8, hb);
        hb = createHostileBullet(hLeft + bSpace, hTop + hHeight / 2 + 30, hostileBullets[bLevel]);
        moveHostileBullet(-1, 8, hb);
        hb = createHostileBullet(hLeft + bSpace * 2, hTop + hHeight / 2 + 45, hostileBullets[bLevel]);
        moveHostileBullet(0, 8, hb);
        hb = createHostileBullet(hLeft + bSpace * 3, hTop + hHeight / 2 + 30, hostileBullets[bLevel]);
        moveHostileBullet(1, 8, hb);
        hb = createHostileBullet(hLeft + bSpace * 4, hTop + hHeight / 2, hostileBullets[bLevel]);
        moveHostileBullet(2, 8, hb);
    }
    //生产三排队列子弹
    function createTriplexBullet(HostilePlane) { //敌方飞机对象  根据敌方飞机生成三排队列子弹

    }
    //创建敌机
    function createHostilePlane(pLeft, hPlanes, level) {
        var hPlane = document.createElement("div");
        hPlane.style.width = hPlanes[level].width + "px";
        hPlane.style.height = hPlanes[level].height + "px";
        hPlane.style.background = hPlanes[level].background;
        hPlane.style.backgroundPosition = hPlanes[level].positionX + "px " + hPlanes[level].positionY + "px";
        hPlane.HP = hPlanes[level].HP * Math.ceil(flightPath / 1000);
        hPlane.score = hPlanes[level].score;
        hPlane.speed = hPlanes[level].speed;
        hPlane.className = "hostilePlane";
        hPlane.style.position = "absolute";
        hPlane.style.top = -hPlanes[level].height + "px";
        hPlane.style.left = pLeft + "px";
        btg.appendChild(hPlane);
        return hPlane;
    }

    //创建n排子弹
    function createBulletRows(rows, level) {
        switch (rows) {
            case 1:
                {
                    var createTop = parseInt(myPlane.style.top);
                    var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2);
                    createBullet(createTop, createLeft, level);
                    break;
                }
            case 2:
                {
                    var createTop = parseInt(myPlane.style.top);
                    var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 32;
                    createBullet(createTop, createLeft, level);
                    createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 32;
                    createBullet(createTop, createLeft, level);
                    break;
                }
            case 3:
                {
                    var createTop = parseInt(myPlane.style.top);
                    var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2);
                    createBullet(createTop, createLeft, level);
                    createTop = parseInt(myPlane.style.top) + 20;
                    createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 32;
                    createBullet(createTop, createLeft, level);
                    createTop = parseInt(myPlane.style.top) + 20;
                    createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 32;
                    createBullet(createTop, createLeft, level);
                    break;
                }
            case 4:
                {
                    var createTop = parseInt(myPlane.style.top);
                    var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 8;
                    createBullet(createTop, createLeft, level);
                    createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 22;
                    createBullet(createTop, createLeft, level);
                    var createTop = parseInt(myPlane.style.top) + 20;
                    var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 38;
                    createBullet(createTop, createLeft, level);
                    createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 52;
                    createBullet(createTop, createLeft, level);
                    break;
                }
        }

    }
    //创建1个子弹
    function createBullet(bTop, bLeft, level) {
        var myBullet = document.createElement("div");
        myBullet.className = "myBullet";
        myBullet.style.width = bullet[level].width + "px";
        myBullet.style.height = bullet[level].height + "px";
        myBullet.style.background = bullet[level].background;
        myBullet.style.backgroundPosition = bullet[level].positionX + "px " + bullet[level].positionY + "px";
        myBullet.style.position = "absolute";
        myBullet.style.top = bTop + "px";
        myBullet.style.left = bLeft + "px";
        btg.appendChild(myBullet);
    }
    //移动子弹
    function moveBullet() {
        var bullets = btg.getElementsByClassName("myBullet");
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].style.top = parseInt(bullets[i].style.top) - parseInt(bullets[0].style.height) + "px";
            //删除多余子弹
            if (parseInt(bullets[i].style.top) < -parseInt(bullets[0].style.height)) {
                btg.removeChild(bullets[i]);
            }
        }
    }
    //飞机移动
    function movePlane(e) {
        var planeX = e.clientX - btg.offsetLeft - myPlane.offsetWidth / 2;
        var planeY = e.clientY - btg.offsetTop - myPlane.offsetHeight / 2;
        var btgWidth = btg.offsetWidth;
        var btgHeight = btg.offsetHeight;
        planeX = Math.min(Math.max(planeX, -myPlane.offsetWidth / 2), btgWidth - myPlane.offsetWidth / 2);
        planeY = Math.min(Math.max(planeY, -myPlane.offsetHeight / 2), btgHeight - myPlane.offsetHeight / 2);
        myPlane.style.top = planeY + "px";
        myPlane.style.left = planeX + "px";
    }
    //创建飞机
    function createPlane(level, plane, oTop, oLeft) {
        myPlane = document.createElement("div");
        myPlane.style.width = plane[level].width + "px";
        myPlane.style.height = plane[level].height + "px";
        myPlane.style.background = plane[level].background;
        myPlane.style.backgroundPosition = plane[level].positionX + "px " + plane[level].positionY + "px";
        myPlane.style.position = "absolute";
        myPlane.style.zIndex = 99;
        myPlane.style.top = oTop + "px";
        myPlane.style.left = oLeft + "px";
        btg.appendChild(myPlane);
    }

    setInterval(function () {
        if (flightPath >= 10000) {
            for (var i = 0; i < 100000; i++) {
                clearInterval(i);
            }
            body.innerHTML = "";

            switch_place("NJJC2.png")
            achieve("星际争霸")
            play_once("win.ogg");

            var h4 = document.createElement('h4');
            h4.style = "height: 300px; line-height: 400px; text-align: center; color: #000; font-size: 50px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
            content = document.createTextNode("恭喜你, 通关成功");
            h4.appendChild(content);

            var next = document.createElement('a')
            next.className = "bon"
            for (var i = 0; i < 4; i++) {
                var span = document.createElement('span')
                next.appendChild(span);
            }
            var temp_txt = document.createTextNode("确认")
            next.appendChild(temp_txt);
            next.style = "border-radius: 10px; position: absolute; top: 300px; left: 300px; font-size: 40px; cursor: url('./pointer/hover.cur'), default; line-height: 25px; z-index:999;"


            var center = document.createElement('div')
            center.id = "center"
            center.style = "width: 730px; height: 460px; margin: 0 auto; position: absolute; top: 136px; left: 50%; transform: translate(-50%);background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px; z-index: 10000; opacity: 0; transition: all 1s;"


            center.appendChild(h4);
            center.appendChild(next);

            body.appendChild(center);

            center.style.opacity = 1;


            next.addEventListener("click", function () {
                save("遗物");
                start_game('遗物');
            })

        }
    }, 1)

}

function first_part() {

    var body = document.body;
    body.innerHTML = "";

    play_music('defalut2.mp3');

    switch_place("温室殿.png");
    show_people('皇帝.png');
    speaker.show_txt("皇上", "朝中之事朕来负责，西北近来不安宁，这可都交给你们了。");

    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people('二皇子.png');
            speaker.show_txt("二皇子", "定然不会让父皇失望。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people('云大将军.png');
                    speaker.show_txt("云大将军", "臣以为……");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people('小云缨.png');
                            speaker.show_txt("云缨（冲进宫殿内）", "爹爹！你们在说什么呀？");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people('云大将军.png');
                                    speaker.show_txt("云大将军（一把抱住小云缨）", "你来这干什么，爹爹在说正事呢。");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people('二皇子.png');
                                            speaker.show_txt("二皇子", "缨儿都这么大了？");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people('小云缨.png');
                                                    speaker.show_txt("云缨", "我以后也要像爹爹你们一样打坏人！");
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            show_people('云大将军.png');
                                                            speaker.show_txt("云大将军（笑，宠溺）", "好呀。");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    show_people('小云缨.png');
                                                                    speaker.show_txt("云缨（瞪眼）", "等着！");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            HTML.onclick = function () { };
                                                                            stop_music();
                                                                            show_video('小云缨.mp4');
                                                                            video = document.getElementsByTagName('video')[0]
                                                                            video.addEventListener('ended', function () {
                                                                                xuewu();
                                                                            })
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }

}

function second_part() {
    var body = document.body;
    body.innerHTML = "";

    play_music('defalut2.mp3');
    switch_place("长安街.png");
    show_people('云缨.png');
    speaker.show_txt("云缨（托腮）", "爹，我都快成年了，什么时候才能跟你一起出长安城呀？");

    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people('云大将军.png');
            speaker.show_txt("云大将军", "你才多大？爹不同意。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people('云缨.png');
                    speaker.show_txt("云缨", "爹你说了这么多年‘我才多大’，我不是小孩了！");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people('云大将军.png');
                            speaker.show_txt("云大将军", "欸……你别生气。");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people('云缨.png');
                                    speaker.show_txt("云缨", "哼。");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people('云大将军.png');
                                            speaker.show_txt("云大将军", "……最近长安城不安宁，那魔物甚至连幼童也不放过。前日把一个女娃咬成重伤。");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people('云大将军.png');
                                                    speaker.show_txt("云大将军", "若你能除掉危险，我就同意你的要求，向皇上引荐。");
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            show_people('云缨.png');
                                                            speaker.show_txt("云缨", "包在我身上！");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    HTML.onclick = function () { };
                                                                    daguai();
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function thrid_part() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("闺房.png");
    show_people('云大将军.png');
    speaker.show_txt("云大将军", "缨儿，这法宝从此予你，它可以保你平安。你可得好好留着。");

    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people('云缨.png');
            speaker.show_txt("云缨", "老头你还信这些？我们军人信的是实力，直面外敌，为国征战！");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people('云大将军.png');
                    speaker.show_txt("云大将军", "唉……总之好好留着。你一个女孩子家，为父实在是放心不下。");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            speaker.show_scene("夜晚，云缨一人在房间中.....")
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    speaker.show_txt("小偷（小声）", "拿到这个交给太子殿下就能拿到一大笔银子了！");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            HTML.onclick = function () { };
                                            stop_music();
                                            show_video("抓贼1.mp4");

                                            var video = document.getElementsByTagName('video')[0]


                                            video.addEventListener('ended', function () {
                                                var center = document.createElement('div')
                                                center.id = "center"
                                                center.style = "width: 1200px; height: 602px; margin: 0 auto; position: absolute; z-index: 100; top: 40px; left: 150px;"

                                                var rule = document.createElement('div')
                                                rule.id = 'rule';
                                                rule.style = "width: 1000px; height: 500px; margin: 120px auto 0; color: #000; text-align: center; background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px;"

                                                var h3 = document.createElement('h3')
                                                h3.style = "font-size: 35px; padding-top: 30px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
                                                var t0 = document.createTextNode("游戏规则")
                                                h3.appendChild(t0)

                                                var p1 = document.createElement('p');
                                                var t1 = document.createTextNode('父亲赠送宝物，此宝物可护自己周全');
                                                var p2 = document.createElement('p');
                                                var t2 = document.createTextNode('但宝物在某天夜里被偷，需要抓到小偷夺回宝物');
                                                var p3 = document.createElement('p');
                                                var t3 = document.createTextNode('使用键盘上的方向键操作云缨');
                                                var p4 = document.createElement('p');
                                                var t4 = document.createTextNode('夺回被夺走的宝物吧');

                                                p1.appendChild(t1);
                                                p2.appendChild(t2);
                                                p3.appendChild(t3);
                                                p4.appendChild(t4);

                                                p1.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                                                p2.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                                                p3.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
                                                p4.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"

                                                // var comfirm = document.createElement("input");
                                                // comfirm.type = "button"
                                                // comfirm.value = "接受挑战"
                                                // comfirm.id = "comfirm";
                                                // comfirm.style = "position: relative; top: 50px; height: 60px; text-align: center; width: 150px; line-height: 30px; font-size: 30px; color: #fff; background-color: #000; border-radius: 10px;  cursor: url('./pointer/hover.cur'), default;"

                                                var comfirm = document.createElement('a')
                                                comfirm.className = "bon"
                                                for (var i = 0; i < 4; i++) {
                                                    var span = document.createElement('span')
                                                    comfirm.appendChild(span);
                                                }
                                                var temp_txt = document.createTextNode("接受挑战")
                                                comfirm.appendChild(temp_txt);
                                                comfirm.style = "border-radius: 10px; position: relative; top: 20px; font-size: 30px; cursor: url('./pointer/hover.cur'), default;"

                                                rule.appendChild(h3)
                                                rule.appendChild(p1)
                                                rule.appendChild(p2)
                                                rule.appendChild(p3)
                                                rule.appendChild(p4)
                                                rule.appendChild(comfirm)
                                                rule.style.display = "none";

                                                center.appendChild(rule);

                                                body.appendChild(center);
                                                $("#rule").fadeIn()

                                                comfirm.addEventListener("click", function () {
                                                    rule.style.display = "none";
                                                    chasing();
                                                })
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function forth_part() {
    var body = document.body;
    body.innerHTML = "";

    show_video("抓贼2.mp4");

    var video = document.getElementsByTagName('video')[0]
    video.addEventListener('ended', function () {
        var center = document.createElement('div')
        center.id = "center"
        center.style = "width: 1200px; height: 602px; margin: 0 auto; position: absolute; z-index: 100; top: 40px; left: 150px;"

        var rule = document.createElement('div')
        rule.id = 'rule';
        rule.style = "width: 1000px; height: 500px; margin: 120px auto 0; color: #000; text-align: center; background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px;"

        var h3 = document.createElement('h3')
        h3.style = "font-size: 35px; padding-top: 30px;  font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
        var t0 = document.createTextNode("游戏规则")
        h3.appendChild(t0)

        var p1 = document.createElement('p');
        var t1 = document.createTextNode('虽然追捕到小偷,但因为你一时大意又放跑了他');
        var p2 = document.createElement('p');
        var t2 = document.createTextNode('现在狡猾的小偷又跑到一个遍布障碍物的地方');
        var p3 = document.createElement('p');
        var t3 = document.createTextNode('现在,请你控制鼠标,尽可能地躲避下落的铁球,每成功躲掉一个铁球得一分');
        var p4 = document.createElement('p');
        var t4 = document.createTextNode('抓到侧面飞来的飞行物得十分,坚持到200分,将快要逃走的小偷抓捕归案吧');

        p1.appendChild(t1);
        p2.appendChild(t2);
        p3.appendChild(t3);
        p4.appendChild(t4);

        p1.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
        p2.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
        p3.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"
        p4.style = "font-size: 24px; padding-top: 20px; margin: 20px auto"

        // var comfirm = document.createElement("input");
        // comfirm.type = "button"
        // comfirm.value = "接受挑战"
        // comfirm.id = "comfirm";
        // comfirm.style = "position: relative; top: 50px; height: 60px; text-align: center; width: 150px; line-height: 30px; font-size: 30px; color: #fff; background-color: #000; border-radius: 10px;  cursor: url('./pointer/hover.cur'), default;"

        var comfirm = document.createElement('a')
        comfirm.className = "bon"
        for (var i = 0; i < 4; i++) {
            var span = document.createElement('span')
            comfirm.appendChild(span);
        }
        var temp_txt = document.createTextNode("接受挑战")
        comfirm.appendChild(temp_txt);
        comfirm.style = "border-radius: 10px; position: relative; top: 20px; font-size: 30px; cursor: url('./pointer/hover.cur'), default;"

        rule.appendChild(h3)
        rule.appendChild(p1)
        rule.appendChild(p2)
        rule.appendChild(p3)
        rule.appendChild(p4)
        rule.appendChild(comfirm)
        rule.style.display = "none";

        center.appendChild(rule);

        body.appendChild(center);
        $("#rule").fadeIn()

        comfirm.addEventListener("click", function () {
            rule.style.display = "none";
            duobi();
        })
    })
}

function fifth_part() {
    var body = document.body;
    body.innerHTML = "";
    show_video('抓贼3.mp4');

    var video = document.getElementsByTagName('video')[0]

    video.addEventListener('ended', function () {
        speaker.show_scene("恭喜你,成功抓捕到小偷,你可以选择:")
        show_options("将小偷衙门", "私了")
        var option1 = document.getElementById('option1');
        var option2 = document.getElementById('option2');

        option1.onclick = function () {
            clear_options();
            start_game("衙门")
        }

        option2.onclick = function () {
            clear_options();
            start_game("私了");
        }
    })
}

function sixth_part() {
    var body = document.body;
    body.innerHTML = "";

    play_music('defalut2.mp3');
    switch_place("现实.png");
    speaker.show_scene("现实中.....");
    HTML.onclick = function () {
        speaker.skip()
        HTML.onclick = function () {
            show_people("孙膑.png")
            speaker.show_txt("孙宾", "一点线索也没有。")
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    speaker.show_scene("然而,宛儿并没有犹豫,继续回到梦境当中");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            switch_place("爱戴.png")
                            speaker.show_scene("云缨从军后战无不胜，所到之处百姓能安居乐业，因此被尊称为将军");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    speaker.show_scene("此时正是朝廷内有皇位相争、外有敌族入侵之时，其父只能派遣最为信赖的女儿攻下苇泽关——兵家必争之地，身处大山之中，易守难攻");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            speaker.show_scene("云缨为人正直，行侠仗义，大气豁达，浑身散发着少年的英气。她驻扎苇泽关时需要扩充军队，百姓争相回应。");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    switch_place("曹召与云缨.png")
                                                    speaker.show_scene("也因为常年征战，云缨认识了父亲手下的将军曹召。曹召骁勇善战心思缜密，两人情投意合，成家");
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            speaker.show_scene("但由于战事需要，两人很快分隔两地，柴召跟随云缨父亲拓疆阔土，云缨则留守苇泽关。");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    show_people("曹召.png")
                                                                    speaker.show_txt("曹召", "最近总觉得不安宁。而且皇宫那边安静得可怕");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            show_people("云大将军.png")
                                                                            speaker.show_txt("云大将军（沉默）", "……嗯。总之速战速决。");
                                                                            HTML.onclick = function () {
                                                                                speaker.skip();
                                                                                HTML.onclick = function () {
                                                                                    show_people("曹召.png")
                                                                                    speaker.show_txt("曹召", "今当远离，夫人一定要好好照顾自己。");
                                                                                    HTML.onclick = function () {
                                                                                        speaker.skip();
                                                                                        HTML.onclick = function () {
                                                                                            show_people("云大将军.png")
                                                                                            speaker.show_txt("云大将军", "这苇泽关就交给你了，这是前线唯一的退路，付出什么代价也不能丢掉这片地方！");
                                                                                            HTML.onclick = function () {
                                                                                                speaker.skip();
                                                                                                HTML.onclick = function () {
                                                                                                    show_people("曹召.png")
                                                                                                    speaker.show_txt("曹召", "最近总觉得不安宁。而且皇宫那边安静得可怕");
                                                                                                    HTML.onclick = function () {
                                                                                                        speaker.skip();
                                                                                                        HTML.onclick = function () {
                                                                                                            show_people("云缨.png")
                                                                                                            speaker.show_txt("云缨", "放心吧。你们一定加倍小心。");
                                                                                                            HTML.onclick = function () {
                                                                                                                speaker.skip();
                                                                                                                HTML.onclick = function () {
                                                                                                                    switch_place("军营.png");
                                                                                                                    speaker.show_scene("但那一天，突发变故。");
                                                                                                                    HTML.onclick = function () {
                                                                                                                        speaker.skip();
                                                                                                                        HTML.onclick = function () {
                                                                                                                            show_people("小兵.png")
                                                                                                                            speaker.show_txt("甲小兵（慌张）", "报——！将军。”“前线战事吃紧，很多士兵因不明原因导致衰竭而亡，敌军首领说要求单独见您，不然后果更加严重。");
                                                                                                                            HTML.onclick = function () {
                                                                                                                                speaker.skip();
                                                                                                                                HTML.onclick = function () {
                                                                                                                                    show_people("云缨.png")
                                                                                                                                    speaker.show_txt("云缨", "我马上带兵前去支援！");
                                                                                                                                    HTML.onclick = function () {
                                                                                                                                        speaker.skip();
                                                                                                                                        HTML.onclick = function () {
                                                                                                                                            show_people("小兵.png")
                                                                                                                                            speaker.show_txt("乙小兵", "不可啊将军！前方线报，有一大支军队正在靠近苇泽关，苇泽关不能没有将军！");
                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                speaker.skip();
                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                    show_people("云缨.png")
                                                                                                                                                    speaker.show_txt("云缨（皱眉）", "突然发生这么多事，就像是约定好的....");
                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                        speaker.skip();
                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                            show_people("小兵.png")
                                                                                                                                                            speaker.show_txt("丙小兵", "将军...皇上下旨，让您立刻回京。");
                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                speaker.skip();
                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                    show_people("云缨.png")
                                                                                                                                                                    speaker.show_txt("云缨", "你说什么？战事如此紧张之时，皇上怎么会召我回京？？");
                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                        speaker.skip();
                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                            show_people("小兵.png")
                                                                                                                                                                            speaker.show_txt("丙小兵", "千真万确。听说长安城出大事了。");
                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                speaker.skip();
                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                    show_people("云缨.png")
                                                                                                                                                                                    speaker.show_txt("云缨", "什么？");
                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                        speaker.skip();
                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                            show_people("小兵.png")
                                                                                                                                                                                            speaker.show_txt("丙小兵", "皇上也没说，只让将军马上赶回去。");
                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                speaker.skip();
                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                    speaker.show_scene("云缨咬牙。前线有父亲和丈夫，有自己向往的江山；苇泽关是“故乡”；长安城是使命，是自己的国家。");
                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                        speaker.skip();
                                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                                            show_options("前线支援", "返回长安", "留守苇泽关")

                                                                                                                                                                                                            var option1 = document.getElementById("option1");
                                                                                                                                                                                                            var option2 = document.getElementById("option2");
                                                                                                                                                                                                            var option3 = document.getElementById("option3");

                                                                                                                                                                                                            option1.onclick = function () {
                                                                                                                                                                                                                clear_options();
                                                                                                                                                                                                                switch_place("胡人领地.jpg");
                                                                                                                                                                                                                speaker.show_scene("赶到前线时伤亡惨重，云缨为救军队，应敌军要求独自深入敌营。");
                                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                                    speaker.skip()
                                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                                        save("炼药");
                                                                                                                                                                                                                        start_game("炼药");
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                }
                                                                                                                                                                                                            }

                                                                                                                                                                                                            option2.onclick = function () {
                                                                                                                                                                                                                save("返回")
                                                                                                                                                                                                                start_game("返回")
                                                                                                                                                                                                            }

                                                                                                                                                                                                            option3.onclick = function () {
                                                                                                                                                                                                                save("留守")
                                                                                                                                                                                                                start_game("留守");
                                                                                                                                                                                                            }
                                                                                                                                                                                                        }
                                                                                                                                                                                                    }
                                                                                                                                                                                                }
                                                                                                                                                                                            }
                                                                                                                                                                                        }
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}

function secret1() {
    var body = document.body;
    body.innerHTML = "";
    play_music("defalut2.mp3");
    switch_place("私了.png");
    show_people("云缨.png")
    speaker.show_txt("云缨", "你刚刚说交给太子殿下是什么意思？");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("小偷.png")
            speaker.show_txt("小偷", "我没有说……");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("云缨.png")
                    speaker.show_txt("云缨", "放屁。不说我杀了你！");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("小偷.png")
                            speaker.show_txt("小偷（笑，口吐白沫）", "呃呃……");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    speaker.show_scene("小偷咬碎了藏在嘴里的毒丸,抽搐着死去了");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("云缨.png")
                                            speaker.show_txt("云缨", "太子要这个东西干什么呢……");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    HTML.onclick = function () { };
                                                    sixth_part();
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    }
}

function lianyao() {
    var body = document.body;
    body.innerHTML = "";
    play_music("defalut2.mp3");
    switch_place("寡不敌众.png")
    show_people("首领.png")
    speaker.show_txt("首领", "云缨将军，久仰大名！");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云缨.png")
            speaker.show_txt("云缨（瞪眼）", "你有什么要求，快说！");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("首领.png")
                    speaker.show_txt("首领", "将军，您的血可是炼制我族珍宝的最后一剂药剂。这宝物能延续我族族脉，之前试过无数种药材都没用。这次我们一定能成功。");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            speaker.show_scene("（云缨晕倒）");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("首领.png")
                                    speaker.show_txt("首领", "来人！把她带下去！");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            speaker.show_scene("敌军是一个邪教，需要刚烈的女性血炼制一种药，云缨寡不敌众，去世。");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    achieve("炼药大师")
                                                    save("失败");
                                                    start_game("失败");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function fanhui() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("赶路.png");
    show_people("云缨.png");
    speaker.show_txt("云缨", "我觉得事情没那么简单。一切都同时发生了……就像是预谋已久的一样。");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("随从.png")
            speaker.show_txt("随从", "大人！前面有一群不明人马挡在路口了！");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    switch_place("不明人马2.png");
                    show_options("迎击", "避开逃跑")
                    var option1 = document.getElementById("option1");
                    var option2 = document.getElementById("option2");

                    option1.onclick = function () {
                        clear_options()
                        show_people("神秘人.png")
                        speaker.show_txt("神秘人", "你今天逃不了了！拿命来！")
                        HTML.onclick = function () {
                            speaker.skip();
                            HTML.onclick = function () {
                                show_people("云缨.png");
                                speaker.show_txt("云缨", "你是谁派来的！");
                                HTML.onclick = function () {
                                    speaker.skip();
                                    HTML.onclick = function () {
                                        show_people("神秘人.png");
                                        speaker.show_txt("神秘人", "哼，大难临头还有心情想这些。告诉你也无妨，我们奉太子之命将你等正法。");
                                        HTML.onclick = function () {
                                            speaker.skip();
                                            HTML.onclick = function () {
                                                show_people("云缨.png");
                                                speaker.show_txt("云缨", "太子？他一直忌惮二皇子，所以想除掉我们？");
                                                HTML.onclick = function () {
                                                    speaker.skip();
                                                    HTML.onclick = function () {
                                                        speaker.show_scene("大队人马把将军和随从们团团围住。");
                                                        HTML.onclick = function () {
                                                            speaker.skip();
                                                            HTML.onclick = function () {
                                                                show_people("神秘人.png");
                                                                speaker.show_txt("神秘人", "顺便再告诉你，前线为何那么快被击溃。因为这一切都是被计划好的。太子殿下早已将底细透露给敌军，你们不堪一击。");
                                                                HTML.onclick = function () {
                                                                    speaker.skip();
                                                                    HTML.onclick = function () {
                                                                        HTML.onclick = function () { }
                                                                        speaker.show_scene("最后云缨及随从寡不敌众，战死。");
                                                                        achieve("自相残杀")
                                                                        save("失败");
                                                                        start_game("失败");
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    option2.onclick = function () {
                        clear_options()
                        switch_place("赶路2.png");
                        show_people("云缨.png");
                        speaker.show_txt("云缨", "这是什么东西？几年前我不是把这些魔物都杀死了吗？");
                        HTML.onclick = function () {
                            speaker.skip()
                            HTML.onclick = function () {
                                show_people("侍从.png");
                                speaker.show_txt("随从", "他们身上的穿着...好像胡人的服饰。");
                                HTML.onclick = function () {
                                    speaker.skip()
                                    HTML.onclick = function () {
                                        show_people("云缨.png");
                                        speaker.show_txt("云缨（皱眉）", "他们之前一定要我去前线，莫不是有什么阴谋......");
                                        HTML.onclick = function () {
                                            speaker.skip()
                                            HTML.onclick = function () {
                                                switch_place("魔物.jpg");
                                                speaker.show_scene("魔物听到草丛边悉悉索索的声音，开始攻击云缨一行人。");
                                                HTML.onclick = function () {
                                                    speaker.skip()
                                                    HTML.onclick = function () {
                                                        show_people("云缨.png");
                                                        speaker.show_txt("云缨", "不好……呃……");
                                                        HTML.onclick = function () {
                                                            speaker.skip()
                                                            HTML.onclick = function () {
                                                                HTML.onclick = function () { };
                                                                speaker.show_scene("由于连夜奔波导致战斗力下降，云缨寡不敌众，战死。")
                                                                achieve("魑魅魍魉")
                                                                save("失败");
                                                                start_game("失败");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function liushou() {
    var body = document.body;
    body.innerHTML = "";
    play_music("defalut2.mp3");

    switch_place("军营.png")
    show_people("随从甲.png");
    speaker.show_txt("随从甲", "将军近日操劳，还是以身体为重。");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云缨.png");
            speaker.show_txt("云缨", "我为国而生，乃大唐将军。今前线尽失，父、夫战死……我实在是无法安心。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("随从甲.png");
                    speaker.show_txt("随从甲（端茶）", "如今木已成舟……将军当顾大局。");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("云缨.png");
                            speaker.show_txt("云缨", "我为国而生，乃大唐将军。今前线尽失，父、夫战死……我实在是无法安心。");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("云缨.png");
                                    speaker.show_txt("云缨（喝茶）", "唉……嗯？这茶？");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("云缨.png");
                                            speaker.show_txt("云缨（不可置信地望向亲信乙）", "你…?");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people("随从甲.png");
                                                    speaker.show_txt("随从甲", "前线兵败，大将折损，将军抗旨回京。这是皇上的旨意，属下也不过以大局为重。");

                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            show_people("云缨.png");
                                                            speaker.show_txt("云缨（吐血）", "我堂堂将军，最后居然死在自己人手上，真是可笑！");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    switch_place("被手下救.png")
                                                                    speaker.show_scene("不知过了多久，云缨惊醒。发现自己并未死去，反而躺在马车中。");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            show_people("云缨.png");
                                                                            speaker.show_txt("云缨（环顾四周）", "怎么回事？");
                                                                            HTML.onclick = function () {
                                                                                speaker.skip();
                                                                                HTML.onclick = function () {
                                                                                    show_people("亲信甲.png");
                                                                                    speaker.show_txt("亲信甲（端着药汤进马车）", "将军您醒了。我们现在在回长安的路上。");
                                                                                    HTML.onclick = function () {
                                                                                        speaker.skip();
                                                                                        HTML.onclick = function () {
                                                                                            show_people("亲信甲.png");
                                                                                            speaker.show_txt("亲信甲", "那日属下发现您倒在地上，落在一旁的酒杯中检测出剧毒。您却还有微弱的鼻息，便擅自把您偷运出来，换了具假尸埋葬。");
                                                                                            HTML.onclick = function () {
                                                                                                speaker.skip();
                                                                                                HTML.onclick = function () {
                                                                                                    show_people("云缨.png");
                                                                                                    speaker.show_txt("云缨", "为什么会这样？");
                                                                                                    HTML.onclick = function () {
                                                                                                        speaker.skip();
                                                                                                        HTML.onclick = function () {
                                                                                                            show_people("亲信甲.png");
                                                                                                            speaker.show_txt("亲信甲", "这属下也不知道……将军功德无量，也许上天都不愿意将军蒙冤而死。");
                                                                                                            HTML.onclick = function () {
                                                                                                                speaker.skip();
                                                                                                                HTML.onclick = function () {
                                                                                                                    show_people("云缨.png");
                                                                                                                    speaker.show_txt("云缨", "到底是谁……");
                                                                                                                    HTML.onclick = function () {
                                                                                                                        speaker.skip();
                                                                                                                        HTML.onclick = function () {
                                                                                                                            HTML.onclick = function () { };
                                                                                                                            achieve("大难不死")
                                                                                                                            show_options("寻找真相", "不寻找真相")

                                                                                                                            var option1 = document.getElementById("option1");
                                                                                                                            var option2 = document.getElementById("option2");

                                                                                                                            option1.onclick = function () {
                                                                                                                                clear_options()
                                                                                                                                switch_place("现实.png");
                                                                                                                                show_people("上官婉儿.png");
                                                                                                                                speaker.show_txt("宛儿", "云缨将军没有死？这是不是和解药有关？");
                                                                                                                                HTML.onclick = function () {
                                                                                                                                    speaker.skip();
                                                                                                                                    HTML.onclick = function () {
                                                                                                                                        save("真相");
                                                                                                                                        start_game("真相");
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                            option2.onclick = function () {
                                                                                                                                clear_options()
                                                                                                                                show_scene("因为你放弃寻找真相，因此小队任务失败，最终导致人类灭亡")
                                                                                                                                HTML.onclick = function () {
                                                                                                                                    speaker.skip();
                                                                                                                                    HTML.onclick = function () {
                                                                                                                                        achieve("复活秒躺")
                                                                                                                                        save("失败");
                                                                                                                                        start_game("失败");
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function zhenxiang() {
    var body = document.body;
    body.innerHTML = "";
    play_music("defalut2.mp3");

    switch_place("密谋.png");
    speaker.show_scene("云缨便装回到长安城，想当面质问太子。却偷听到他们的密谋。");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("太子.png");
            speaker.show_txt("太子", "二皇子羽翼已除，不成气候，那些胡人倒没让我失望，不枉我费尽心思。他们胡人的阴谋也未得逞，元气大伤；这皇位非我莫属！")
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("大臣甲.png");
                    speaker.show_txt("大臣甲（作揖）", "殿下英明……只不过……有件小事。")
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("太子.png");
                            speaker.show_txt("太子", "哦？")
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("大臣甲.png");
                                    speaker.show_txt("大臣甲", "相传云大将军有件宝贝可以御百毒，只不过至今未发现那宝物何在……")
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("太子.png");
                                            speaker.show_txt("太子", "无妨。还能翻天不成？")
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people("大臣甲.png");
                                                    speaker.show_txt("大臣甲", "殿下所言极是。")
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            show_people("云缨.png");
                                                            speaker.show_txt("云缨", "受死吧逆贼！")
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    speaker.show_scene("太子身边高手如云，但云缨将军武艺高超，杀他们如砍瓜切菜，现在就请你操作云缨，分数达到两百分即可通关");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            HTML.onclick = function () { };
                                                                            fruit();
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function fruit() {
    play_music('yinyou.mp3')
    HTML.style = "";
    var body = document.body;
    body.innerHTML = "";


    var extra = document.createElement('div')
    extra.id = "extra"

    var view = document.createElement('canvas')
    view.id = "view"

    var desc = document.createElement('div')
    desc.id = "desc"

    var div = document.createElement('div')
    div.style = "text-align:center;clear:both;"

    var browser = document.createElement('div')
    browser.id = "browser"

    desc.appendChild(div)
    desc.appendChild(browser)

    body.appendChild(extra)
    body.appendChild(view)
    body.appendChild(desc)

    var width = window.innerWidth;
    var height = window.innerHeight;

    var canvas = document.getElementById("view")
    canvas.style.width = width;
    canvas.style.height = height;

    window.addEventListener('resize', function () {
        var width = window.innerWidth;
        var height = window.innerHeight;

        var canvas = document.getElementById("view")
        canvas.style.width = width;
        canvas.style.height = height;
    })

    void function (global) {
        var mapping = {}
            , cache = {};
        global.startModule = function (m) {
            require(m).start();
        }
            ;
        global.define = function (id, func) {
            mapping[id] = func;
        }
            ;
        global.require = function (id) {
            if (!/\.js$/.test(id))
                id += '.js';
            if (cache[id])
                return cache[id];
            else
                return cache[id] = mapping[id]({});
        }
            ;
    }(this);

    define("scripts/collide.js", function (exports) {
        var fruit = require("scripts/factory/fruit");
        var Ucren = require("scripts/lib/ucren");

        var fruits = fruit.getFruitInView();

        /**
         * 碰撞检测
         */

        exports.check = function (knife) {
            var ret = []
                , index = 0;

            fruits.forEach(function (fruit) {
                var ck = lineInEllipse(knife.slice(0, 2), knife.slice(2, 4), [fruit.originX, fruit.originY], fruit.radius);
                if (ck)
                    ret[index++] = fruit;
            });
            return ret;
        }
            ;

        function sqr(x) {
            return x * x;
        }

        function sign(n) {
            return n < 0 ? -1 : (n > 0 ? 1 : 0);
        }

        function equation12(a, b, c) {
            if (a == 0)
                return;

            var delta = b * b - 4 * a * c;
            if (delta == 0)
                return [-1 * b / (2 * a), -1 * b / (2 * a)];
            else if (delta > 0)
                return [(-1 * b + Math.sqrt(delta)) / (2 * a), (-1 * b - Math.sqrt(delta)) / (2 * a)];
        }

        // 返回线段和椭圆的两个交点，如果不相交，返回 null
        function lineXEllipse(p1, p2, c, r, e) {
            // 线段：p1, p2    圆心：c    半径：r    离心率：e
            if (r <= 0)
                return;
            e = e === undefined ? 1 : e;
            var t1 = r, t2 = r * e, k;

            a = sqr(t2) * sqr(p1[0] - p2[0]) + sqr(t1) * sqr(p1[1] - p2[1]);

            if (a <= 0)
                return;

            b = 2 * sqr(t2) * (p2[0] - p1[0]) * (p1[0] - c[0]) + 2 * sqr(t1) * (p2[1] - p1[1]) * (p1[1] - c[1]);
            c = sqr(t2) * sqr(p1[0] - c[0]) + sqr(t1) * sqr(p1[1] - c[1]) - sqr(t1) * sqr(t2);

            if (!(k = equation12(a, b, c, t1, t2)))
                return;

            var result = [[p1[0] + k[0] * (p2[0] - p1[0]), p1[1] + k[0] * (p2[1] - p1[1])], [p1[0] + k[1] * (p2[0] - p1[0]), p1[1] + k[1] * (p2[1] - p1[1])]];

            if (!((sign(result[0][0] - p1[0]) * sign(result[0][0] - p2[0]) <= 0) && (sign(result[0][1] - p1[1]) * sign(result[0][1] - p2[1]) <= 0)))
                result[0] = null;

            if (!((sign(result[1][0] - p1[0]) * sign(result[1][0] - p2[0]) <= 0) && (sign(result[1][1] - p1[1]) * sign(result[1][1] - p2[1]) <= 0)))
                result[1] = null;

            return result;
        }

        // 判断计算线段和椭圆是否相交
        function lineInEllipse(p1, p2, c, r, e) {
            var t = lineXEllipse(p1, p2, c, r, e);
            return t && (t[0] || t[1]);
        }
        ;
        return exports;
    });

    define("scripts/control.js", function (exports) {
        var Ucren = require("scripts/lib/ucren");
        var knife = require("scripts/object/knife");
        var message = require("scripts/message");
        var state = require("scripts/state");

        var canvasLeft, canvasTop;

        canvasLeft = canvasTop = 0;

        exports.init = function () {
            this.fixCanvasPos();
            this.installDragger();
            this.installClicker();
        }
            ;

        exports.installDragger = function () {
            var dragger = new Ucren.BasicDrag({
                type: "calc"
            });

            dragger.on("returnValue", function (dx, dy, x, y, kf) {
                if (kf = knife.through(x - canvasLeft, y - canvasTop))
                    message.postMessage(kf, "slice");
            });

            dragger.on("startDrag", function () {
                knife.newKnife();
            });

            dragger.bind(document.documentElement);
        }
            ;

        exports.installClicker = function () {
            Ucren.addEvent(document, "click", function () {
                if (state("click-enable").ison())
                    message.postMessage("click");
            });
        }
            ;

        exports.fixCanvasPos = function () {
            var de = document.documentElement;

            var fix = function (e) {
                canvasLeft = (de.clientWidth - window.innerWidth) / 2;
                canvasTop = (de.clientHeight - window.innerHeight) / 2;
            };

            fix();

            Ucren.addEvent(window, "resize", fix);
        }
            ;
        ;
        return exports;
    });

    define("scripts/game.js", function (exports) {
        /**
         * game logic
         */
        var timeline = require("scripts/timeline");
        var Ucren = require("scripts/lib/ucren");
        var sound = require("scripts/lib/sound");
        var fruit = require("scripts/factory/fruit");
        var score = require("scripts/object/score");
        var message = require("scripts/message");
        var state = require("scripts/state");
        var lose = require("scripts/object/lose");
        var gameOver = require("scripts/object/game-over");
        var knife = require("scripts/object/knife");
        // var sence = require("scripts/sence");
        var background = require("scripts/object/background");
        var light = require("scripts/object/light");

        var scoreNumber = 0;

        var random = Ucren.randomNumber;

        var volleyNum = 2
            , volleyMultipleNumber = 5;
        var fruits = [];
        var gameInterval;

        var snd;
        var boomSnd;

        // fruit barbette
        var barbette = function () {
            if (fruits.length >= volleyNum)
                return;

            var startX = random(window.innerWidth)
                , endX = random(window.innerWidth)
                , startY = window.innerHeight;
            var f = fruit.create(startX, startY).shotOut(0, endX);

            fruits.push(f);
            snd.play();

            barbette();
        };

        // start game
        exports.start = function () {
            snd = sound.create("sound/throw");
            boomSnd = sound.create("sound/boom");
            timeline.setTimeout(function () {
                state("game-state").set("playing");
                gameInterval = timeline.setInterval(barbette, 1e3);
            }, 500);
        }
            ;

        exports.gameOver = function () {
            state("game-state").set("over");
            gameInterval.stop();

            gameOver.show();

            // timeline.setTimeout(function(){
            //     // sence.switchSence( "home-menu" );
            //     // TODO: require 出现互相引用时，造成死循环，这个问题需要跟进，这里暂时用 postMessage 代替
            //     message.postMessage( "home-menu", "sence.switchSence" );
            // }, 2000);

            scoreNumber = 0;
            volleyNum = 2;
            fruits.length = 0;
        }
            ;

        exports.applyScore = function (score) {
            if (score > volleyNum * volleyMultipleNumber)
                volleyNum++,
                    volleyMultipleNumber += 50;
        }
            ;

        exports.sliceAt = function (fruit, angle) {
            var index;

            if (state("game-state").isnot("playing"))
                return;

            if (fruit.type != "boom") {
                fruit.broken(angle);
                if (index = fruits.indexOf(fruit))
                    fruits.splice(index, 1);
                score.number(++scoreNumber);
                this.applyScore(scoreNumber);
                if (scoreNumber >= 200) {
                    state("game-state").set("over");
                    gameInterval.stop();
                    var body = document.body;
                    body.innerHTML = "";

                    switch_place("密谋.png")
                    achieve("复仇者")
                    play_once("win.ogg");


                    // var h4 = document.createElement('h4');
                    // h4.style = "height: 300px; line-height: 300px; text-align: center; color: #fff; font-size: 35px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
                    // var content = document.createTextNode("恭喜你,成功手刃逆贼");
                    // var next = document.createElement('input')
                    // next.type = "button";
                    // next.value = "确定"
                    // next.style = "position: absolute; top: 290px; left: 50%;transform: translate(-50%); height: 60px; width: 150px; background-color: #000; color: #fff; font-size: 24px; border-radius: 10px;  cursor: url('./pointer/hover.cur'), default;"

                    // var center = document.createElement('div')
                    // center.id = "center"
                    // center.style = "width: 730px; height: 460px; margin: 0 auto; position: absolute; top: 136px; left: 50%; transform: translate(-50%); background-color: rgba(0, 0, 0, 0.6);"

                    var h4 = document.createElement('h4');
                    h4.style = "height: 300px; line-height: 400px; text-align: center; color: #000; font-size: 50px; font-family: YunShuFaJiaYangYongZhiShouJinZhengKaiJian-2;"
                    content = document.createTextNode("恭喜你,成功手刃逆贼");

                    var next = document.createElement('a')
                    next.className = "bon"
                    for (var i = 0; i < 4; i++) {
                        var span = document.createElement('span')
                        next.appendChild(span);
                    }
                    var temp_txt = document.createTextNode("确认")
                    next.appendChild(temp_txt);
                    next.style = "border-radius: 10px; position: absolute; top: 300px; left: 300px; font-size: 40px; cursor: url('./pointer/hover.cur'), default; line-height: 25px; z-index:999;"


                    var center = document.createElement('div')
                    center.id = "center"
                    center.style = "width: 730px; height: 460px; margin: 0 auto; position: absolute; top: 136px; left: 50%; transform: translate(-50%);background: url('uploads/提示.jpg') no-repeat; background-size: cover; box-shadow: 0 0 90px 40px #000; border-radius: 20px; z-index: 10000;"

                    center.style.display = "none";

                    center.appendChild(h4);
                    center.appendChild(next);

                    body.appendChild(center);

                    h4.appendChild(content);

                    next.addEventListener("click", function () {
                        save("报仇");
                        start_game('报仇');
                    })
                    $("#center").fadeIn();

                }
            } else {
                boomSnd.play();
                this.pauseAllFruit();
                background.wobble();
                light.start(fruit);
            }
        }
            ;

        exports.pauseAllFruit = function () {
            gameInterval.stop();
            knife.pause();
            fruits.invoke("pause");
        }
            ;


        message.addEventListener("fruit.remove", function (fruit) {
            var index;
            if ((index = fruits.indexOf(fruit)) > -1)
                fruits.splice(index, 1);
        });

        var eventFruitFallOutOfViewer = function (fruit) {
            if (fruit.type != "boom")
                lose.showLoseAt(fruit.originX);
        };

        state("game-state").hook(function (value) {
            if (value == "playing")
                message.addEventListener("fruit.fallOutOfViewer", eventFruitFallOutOfViewer);
            else
                message.removeEventListener("fruit.fallOutOfViewer", eventFruitFallOutOfViewer);
        });

        message.addEventListener("game.over", function () {
            exports.gameOver();
            knife.switchOn();
        });

        message.addEventListener("overWhiteLight.show", function () {
            knife.endAll();
            for (var i = fruits.length - 1; i >= 0; i--)
                fruits[i].remove();
            background.stop();
        });

        message.addEventListener("click", function () {
            state("click-enable").off();
            gameOver.hide();
            message.postMessage("home-menu", "sence.switchSence");
        });
        ;
        return exports;
    });

    define("scripts/layer.js", function (exports) {
        /**
         * layer manager
         */

        var Raphael = require("scripts/lib/raphael");
        var Ucren = require("scripts/lib/ucren");

        var layers = {};
        var zindexs = {
            "default": zi(),
            "light": zi(),
            "knife": zi(),
            "fruit": zi(),
            "juice": zi(),
            "flash": zi(),
            "mask": zi()
        };

        exports.createImage = function (layer, src, x, y, w, h) {
            layer = this.getLayer(layer);
            return layer.image(src, x, y, w, h);
        }
            ;

        exports.createText = function (layer, text, x, y, fill, size) {
            layer = this.getLayer(layer);

            if (Ucren.isIe)
                y += 2;

            return layer.text(x, y, text).attr({
                fill: fill || "#fff",
                "font-size": size || "14px",
                "font-family": "黑体",
                "text-anchor": "start"
            });
        }
            ;

        exports.getLayer = function (name) {
            var p, layer;
            name = name || "default";

            if (p = layers[name]) {
                return p;
            } else {
                layer = Ucren.makeElement("div", {
                    "class": "layer",
                    "style": "z-index: " + (zindexs[name] || 0) + ";"
                });
                Ucren.Element("extra").add(layer);
                p = layers[name] = Raphael(layer, window.innerWidth, window.innerHeight);
                // if( Ucren.isSafari )
                //     p.safari();
                return p;
            }
        }
            ;

        function zi() {
            return zi.num = ++zi.num || 2;
        }
        ;
        return exports;
    });

    define("scripts/main.js", function (exports) {
        var timeline = require("scripts/timeline");
        var tools = require("scripts/tools");
        var sence = require("scripts/sence");
        var Ucren = require("scripts/lib/ucren");
        var buzz = require("scripts/lib/buzz");
        var control = require("scripts/control");
        var csl = require("scripts/object/console");
        var message = require("scripts/message");
        var state = require("scripts/state");

        var game = require("scripts/game");

        var collide = require("scripts/collide");

        var setTimeout = timeline.setTimeout.bind(timeline);

        var log = function () {
            var time = 1e3, add = 300, fn;
            fn = function (text) {
                setTimeout(function () {
                    csl.log(text);
                }, time);
                time += add;
            }
                ;
            fn.clear = function () {
                setTimeout(csl.clear.bind(csl), time);
                time += add;
            }
                ;
            return fn;
        }();

        exports.start = function () {

            [timeline, sence, control].invoke("init");

            // log("正在加载鼠标控制脚本");
            // log("正在加载图像资源");
            // log("正在加载游戏脚本");
            // log("正在加载剧情");
            // log("正在初始化");
            // log("正在启动游戏...");
            // log.clear();

            setTimeout(sence.switchSence.saturate(sence, "home-menu"), 0);
        }
            ;

        message.addEventListener("slice", function (knife) {
            var fruits = collide.check(knife), angle;
            if (fruits.length)
                angle = tools.getAngleByRadian(tools.pointToRadian(knife.slice(0, 2), knife.slice(2, 4))),
                    fruits.forEach(function (fruit) {
                        message.postMessage(fruit, angle, "slice.at");
                    });
        });

        message.addEventListener("slice.at", function (fruit, angle) {

            if (state("sence-state").isnot("ready"))
                return;

            if (state("sence-name").is("game-body")) {
                game.sliceAt(fruit, angle);
                return;
            }

            if (state("sence-name").is("home-menu")) {
                fruit.broken(angle);
                if (fruit.isHomeMenu)
                    switch (1) {
                        case fruit.isDojoIcon:
                            sence.switchSence("dojo-body");
                            break;
                        case fruit.isNewGameIcon:
                            sence.switchSence("game-body");
                            break;
                        case fruit.isQuitIcon:
                            sence.switchSence("quit-body");
                            break;
                    }
                return;
            }
        });

        var tip = "";

        if (!Ucren.isChrome)
            tip = "$为了获得最佳流畅度，推荐您使用 <span class='b'>Google Chrome</span> 体验本游戏";

        if (!buzz.isSupported())
            tip = tip.replace("$", "您的浏览器不支持 &lt;audio&gt 播放声效，且");

        tip = tip.replace("$", "");

        Ucren.Element("browser").html(tip);
        ;
        return exports;
    });

    define("scripts/message.js", function (exports) {

        var Ucren = require("scripts/lib/ucren");

        exports.postMessage = function (message /*, message, message... */
            , to) {
            var messages = [].slice.call(arguments, 0)
                , splitIndex = messages.length - 1;

            to = messages[splitIndex];
            messages.slice(0, splitIndex);

            Ucren.dispatch(to, messages);
        }
            ;

        /**
         * bind an message handler
         * @param {String}   from 	message address
         * @param {Function} fn 	message handler
         */
        exports.addEventListener = function (from, fn) {
            Ucren.dispatch(from, fn);
        }
            ;

        /**
         * remove an message handler
         * @param {String}   from 	message address
         * @param {Function} fn 	message handler
         */
        exports.removeEventListener = function (from, fn) {
            Ucren.dispatch.remove(from, fn);
        }
            ;
        ;
        return exports;
    });

    define("scripts/sence.js", function (exports) {
        var Ucren = require("scripts/lib/ucren");
        var sound = require("scripts/lib/sound");
        var fruit = require("scripts/factory/fruit");
        var flash = require("scripts/object/flash");

        var state = require("scripts/state");
        var message = require("scripts/message");

        // the fixed elements
        var background = require("scripts/object/background");
        var fps = require("scripts/object/fps");

        // the home page elements
        var homeMask = require("scripts/object/home-mask");
        var logo = require("scripts/object/logo");
        var ninja = require("scripts/object/ninja")
        var homeDesc = require("scripts/object/home-desc");

        var dojo = require("scripts/object/dojo");
        var newGame = require("scripts/object/new-game");
        var quit = require("scripts/object/quit");
        var newSign = require("scripts/object/new");
        var peach, sandia, boom;

        // the elements in game body
        var score = require("scripts/object/score");
        var lose = require("scripts/object/lose");

        // the game logic
        var game = require("scripts/game");

        // the elements in 'developing' module
        var developing = require("scripts/object/developing");
        var gameOver = require("scripts/object/game-over");

        // commons
        var message = require("scripts/message");
        var timeline = require("scripts/timeline");
        var setTimeout = timeline.setTimeout.bind(timeline);
        var setInterval = timeline.setInterval.bind(timeline);

        // var menuSnd;
        var gameStartSnd;

        // initialize sence
        exports.init = function () {
            // menuSnd = sound.create("sound/menu");
            gameStartSnd = sound.create("sound/start");
            [background, homeMask, logo, ninja, homeDesc, dojo, newSign, newGame, quit, score, lose, developing, gameOver, flash /*, fps */
            ].invoke("set");
            // setInterval( fps.update.bind( fps ), 500 );
        }
            ;

        // switch sence
        exports.switchSence = function (name) {
            var curSence = state("sence-name");
            var senceState = state("sence-state");

            if (curSence.is(name))
                return;

            var onHide = function () {
                curSence.set(name);
                senceState.set("entering");
                switch (name) {
                    case "home-menu":
                        this.showMenu(onShow);
                        break;
                    case "dojo-body":
                        this.showDojo(onShow);
                        break;
                    case "game-body":
                        this.showNewGame(onShow);
                        break;
                    case "quit-body":
                        this.showQuit(onShow);
                        break;
                }
            }
                .bind(this);

            var onShow = function () {
                senceState.set("ready");

                if (name == "dojo-body" || name == "quit-body") {
                    exports.switchSence("home-menu");
                }
            };

            senceState.set("exiting");

            if (curSence.isunset())
                onHide();
            else if (curSence.is("home-menu"))
                this.hideMenu(onHide);
            else if (curSence.is("dojo-body"))
                this.hideDojo(onHide);
            else if (curSence.is("game-body"))
                this.hideNewGame(onHide);
            else if (curSence.is("quit-body"))
                this.hideQuit(onHide);
        }
            ;

        // to enter home page menu
        exports.showMenu = function (callback) {
            var callee = arguments.callee;
            var times = callee.times = ++callee.times || 1;

            var width = window.innerWidth;
            var height = window.innerHeight;
            // peach = fruit.create("peach", 137, 333, true);
            // sandia = fruit.create("sandia", 330, 322, true);
            // boom = fruit.create("boom", 552, 367, true, 2500);

            peach = fruit.create("peach", width * 0.21, 0.5 * height, true);
            sandia = fruit.create("sandia", width * 0.5, 0.5 * height, true);
            boom = fruit.create("boom", width * 0.8, 0.5 * height, true, 2500);

            [peach, sandia, boom].forEach(function (f) {
                f.isHomeMenu = 1;
            });
            peach.isDojoIcon = sandia.isNewGameIcon = boom.isQuitIcon = 1;

            var group = [[homeMask, 0], [logo, 0],
            [ninja, 500], [homeDesc, 1500],
            [dojo, 2000], [newGame, 2000], [quit, 2000],
            [newSign, 2000],
            [peach, 2000], [sandia, 2000], [boom, 2000]];

            group.invoke("show");
            [peach, sandia].invoke("rotate", 2500);

            // menuSnd.play();
            setTimeout(callback, 2500);
        }
            ;

        // to exit home page menu
        exports.hideMenu = function (callback) {
            [newSign, dojo, newGame, quit].invoke("hide");
            [homeMask, logo, ninja, homeDesc].invoke("hide");
            [peach, sandia, boom].invoke("fallOff", 150);

            // menuSnd.stop();
            setTimeout(callback, fruit.getDropTimeSetting());
        }
            ;

        // to enter game body
        exports.showNewGame = function (callback) {
            score.show();
            lose.show();
            game.start();

            gameStartSnd.play();
            setTimeout(callback, 1000);
        }
            ;

        // to exit game body
        exports.hideNewGame = function (callback) {
            score.hide();
            lose.hide();

            gameStartSnd.stop();
            setTimeout(callback, 1000);
        }
            ;

        // to enter dojo mode
        exports.showDojo = function (callback) {
            developing.show(250);
            setTimeout(callback, 1500);
        }
            ;

        // to exit dojo mode
        exports.hideDojo = function (callback) {
            // TODO: 
            setTimeout(callback, 1000);
        }
            ;

        // to enter quit page
        exports.showQuit = function (callback) {
            developing.show(250);
            setTimeout(callback, 1500);
        }
            ;

        // to exit quit page
        exports.hideQuit = function (callback) {
            // TODO: 
            setTimeout(callback, 1000);
        }
            ;

        message.addEventListener("sence.switchSence", function (name) {
            exports.switchSence(name);
        });
        ;
        return exports;
    });

    define("scripts/state.js", function (exports) {

        var Ucren = require("scripts/lib/ucren");
        var timeline = require("scripts/timeline");

        /**
         * usage:
         * state( key ).is( value )		->	determine if the value of key is the given value
         * state( key ).isnot( value )	->	determine if the value of key is not given value
         * state( key ).ison()			->	determine if the value of key is the boolean value 'true'
         * state( key ).isoff()			->	determine if the value of key is the boolean value 'false'
         * state( key ).isunset()		->	determine if the value of key is undefined
         * state( key ).set( value )	->	set the value of key to a given value
         * state( key ).get()			->	get the value of key
         * state( key ).on()			->	set the value of key to boolean value 'true'
         * state( key ).off()			->	set the value of key to boolean value 'false'
         */

        var stack = {};
        var cache = {};
        var callbacks = {};

        exports = function (key) {

            if (cache[key])
                return cache[key];

            return cache[key] = {
                is: function (value) {
                    return stack[key] === value;
                },

                isnot: function (value) {
                    return stack[key] !== value;
                },

                ison: function () {
                    return this.is(true);
                },

                isoff: function () {
                    return this.isnot(true);
                },

                isunset: function () {
                    return this.is(undefined);
                },

                set: function () {
                    var lastValue = NaN;
                    return function (value) {
                        var c;
                        stack[key] = value;
                        if (lastValue !== value && (c = callbacks[key]))
                            for (var i = 0, l = c.length; i < l; i++)
                                c[i].call(this, value);
                        lastValue = value;
                    }
                }(),

                get: function () {
                    return stack[key];
                },

                on: function () {
                    var me = this;
                    me.set(true);
                    return {
                        keep: function (time) {
                            timeline.setTimeout(me.set.saturate(me, false), time);
                        }
                    }
                },

                off: function () {
                    var me = this;
                    me.set(false);
                    return {
                        keep: function (time) {
                            timeline.setTimeout(me.set.saturate(me, true), time);
                        }
                    }
                },

                hook: function (fn) {
                    var c;
                    if (!(c = callbacks[key]))
                        callbacks[key] = [fn];
                    else
                        c.push(fn);
                },

                unhook: function () {// TODO: 
                }
            }
        }
            ;
        ;
        return exports;
    });

    define("scripts/timeline.js", function (exports) {

        var Ucren = require("scripts/lib/ucren");
        var timerCache = {};
        var timeline = {};

        // var timer = timeline;
        // <or>
        // var timer = timeline.use( name ).init( 10 ); // to use a new timeline instance
        // 
        // var t = timer.createTask(...);
        // t.stop();
        // 
        // timer.setTimeout(...);
        // timer.setInterval(...);
        // timer.getFPS();

        function ClassTimer() {
            this.tasks = [];
            this.addingTasks = [];
            this.adding = 0;
        }

        /**
         * initialize timeline
         */
        ClassTimer.prototype.init = function (ms) {
            var me = this;

            if (me.inited)
                return;
            else
                me.inited = 1;

            me.startTime = now();
            me.intervalTime = ms || 5;
            me.count = 0;

            me.intervalFn = function () {
                me.count++;
                me.update(now());
            }
                ;

            me.start();

            return me;
        }
            ;

        ClassTimer.prototype.createTask = function (conf) {
            /* e.g. timer.createTask({
                start: 500, duration: 2000, data: [a, b, c,..], object: module, 
                onTimeUpdate: fn(time, a, b, c,..), onTimeStart: fn(a, b, c,..), onTimeEnd: fn(a, b, c,..),
                recycle: []
            }); */
            var task = createTask(conf);
            this.addingTasks.unshift(task);
            this.adding = 1;

            if (conf.recycle)
                this.taskList(conf.recycle, task);

            this.start();

            return task;
        }
            ;

        ClassTimer.prototype.taskList = function (queue, task) {
            if (!queue.clear)
                queue.clear = function () {
                    var i = this.length;
                    while (i--)
                        task = this[i],
                            task.stop(),
                            this.splice(i, 1);
                    return this;
                }
                    ;

            if (task)
                queue.unshift(task);

            return queue;
        }
            ;

        ClassTimer.prototype.setTimeout = function (fn, time) {
            // e.g. setTimeout(fn, time);
            return this.createTask({
                start: time,
                duration: 0,
                onTimeStart: fn
            });
        }
            ;

        ClassTimer.prototype.setInterval = function (fn, time) {
            // e.g. setInterval(fn, time);
            var timer = setInterval(fn, time);
            return {
                stop: function () {
                    clearInterval(timer);
                }
            };
        }
            ;

        /**
         * get the current fps
         * @return {Number} fps number
         */
        ClassTimer.prototype.getFPS = function () {
            var t = now()
                , c = this.count
                , fps = c / (t - this.startTime) * 1e3;
            if (c > 1e3)
                this.count = 0,
                    this.startTime = t;
            return fps;
        }
            ;

        // privates

        ClassTimer.prototype.start = function () {
            clearInterval(this.interval);
            this.interval = setInterval(this.intervalFn, this.intervalTime);
        }
            ;

        ClassTimer.prototype.stop = function () {
            clearInterval(this.interval);
        }
            ;

        ClassTimer.prototype.update = function (time) {
            var tasks = this.tasks
                , addingTasks = this.addingTasks
                , adding = this.adding;
            var i = tasks.length, t, task, start, duration, data;

            while (i--) {
                task = tasks[i];
                start = task.start;
                duration = task.duration;

                if (time >= start) {

                    if (task.stopped) {
                        tasks.splice(i, 1);
                        continue;
                    }

                    checkStartTask(task);
                    if ((t = time - start) < duration)
                        updateTask(task, t);
                    else
                        updateTask(task, duration),
                            task.onTimeEnd.apply(task.object, task.data.slice(1)),
                            tasks.splice(i, 1);
                }
            }

            if (adding)
                tasks.unshift.apply(tasks, addingTasks),
                    addingTasks.length = adding = 0;

            if (!tasks.length)
                this.stop();
        }
            ;

        timeline.use = function (name) {
            var module;

            if (module = timerCache[name])
                return module;
            else
                module = timerCache[name] = new ClassTimer;

            return module;
        }
            ;

        /**
         * @functions
         */

        var now = function () {
            return new Date().getTime();
        };

        var createTask = function (conf) {
            var object = conf.object || {};
            conf.start = conf.start || 0;
            return {
                start: conf.start + now(),
                duration: conf.duration == -1 ? 86400000 : conf.duration,
                data: conf.data ? [0].concat(conf.data) : [0],
                started: 0,
                object: object,
                onTimeStart: conf.onTimeStart || object.onTimeStart || Ucren.nul,
                onTimeUpdate: conf.onTimeUpdate || object.onTimeUpdate || Ucren.nul,
                onTimeEnd: conf.onTimeEnd || object.onTimeEnd || Ucren.nul,
                stop: function () {
                    this.stopped = 1;
                }
            }
        };

        var updateTask = function (task, time) {
            var data = task.data;
            data[0] = time;
            task.onTimeUpdate.apply(task.object, data);
        };

        var checkStartTask = function (task) {
            if (!task.started)
                task.started = 1,
                    task.onTimeStart.apply(task.object, task.data.slice(1)),
                    updateTask(task, 0);
        };

        /**
         * for compatible the old version
         */
        exports = timeline.use("default").init(10);
        exports.use = function (name) {
            if (Ucren.isIe)
                exports;
            return timeline.use(name);
        }
            ;
        ;
        return exports;
    });

    define("scripts/tools.js", function (exports) {
        exports.unsetObject = function (object) {
            for (var i in object)
                if (object.hasOwnProperty(i) && typeof object[i] == "function")
                    object[i] = function () { }
                        ;
        }
            ;

        exports.getAngleByRadian = function (radian) {
            return radian * 180 / Math.PI;
        }

        exports.pointToRadian = function (origin, point) {
            var PI = Math.PI;

            if (point[0] === origin[0]) {
                if (point[1] > origin[1])
                    return PI * 0.5;
                return PI * 1.5
            } else if (point[1] === origin[1]) {
                if (point[0] > origin[0])
                    return 0;
                return PI;
            }

            var t = Math.atan((origin[1] - point[1]) / (origin[0] - point[0]));

            if (point[0] > origin[0] && point[1] < origin[1])
                return t + 2 * PI;

            if (point[0] > origin[0] && point[1] > origin[1])
                return t;

            return t + PI;
        }
            ;

        return exports;
    });

    define("scripts/factory/displacement.js", function (exports) {
        var layer = require("scripts/layer");
        var timeline = require("scripts/timeline");
        var tween = require("scripts/lib/tween");

        /**
         * 位移类模块模型
         */

        exports.create = function (imageSrc, width, height, origX, origY, targetX, targetY, animMap, animDur) {
            var module = {};
            var image;

            var anim = {};

            if (typeof animMap === "function")
                anim.show = anim.hide = animMap;
            else
                anim = animMap;

            var createTask = function (start, duration, sx, sy, ex, ey, anim, mode) {
                timeline.createTask({
                    start: start,
                    duration: duration,
                    object: module,
                    data: [sx, sy, ex, ey, anim, mode],
                    onTimeUpdate: module.onTimeUpdate,
                    onTimeStart: module.onTimeStart,
                    onTimeEnd: module.onTimeEnd,
                    recycle: module.anims
                });
            };

            module.anims = [];

            module.set = function () {
                image = layer.createImage("default", imageSrc, origX, origY, width, height);
            }
                ;

            module.show = function (start) {
                createTask(start, animDur, origX, origY, targetX, targetY, anim.show, "show");
            }
                ;

            module.hide = function () {
                this.anims.clear();
                createTask(0, animDur, targetX, targetY, origX, origY, anim.hide, "hide");
            }
                ;

            module.onTimeUpdate = function (time, sx, sy, ex, ey, anim) {
                image.attr({
                    x: anim(time, sx, ex - sx, animDur),
                    y: anim(time, sy, ey - sy, animDur)
                });
            }
                ;

            module.onTimeStart = function () {
            }
                ;

            module.onTimeEnd = function (sx, sy, ex, ey, anim) {
                if (anim === "hide")
                    image.hide();
            }
                ;

            return module;
        }
            ;
        ;
        return exports;
    });

    define("scripts/factory/fruit.js", function (exports) {
        var layer = require("scripts/layer");
        var Ucren = require("scripts/lib/ucren");
        var timeline = require("scripts/timeline").use("fruit").init(1);
        var timeline2 = require("scripts/timeline").use("fruit-apart").init(1);
        var tween = require("scripts/lib/tween");
        var message = require("scripts/message");
        var flame = require("scripts/object/flame");
        var flash = require("scripts/object/flash");
        var juice = require("scripts/factory/juice");

        var ie = Ucren.isIe;
        var safari = Ucren.isSafari;

        /**
         * 水果模块模型
         */

        var zoomAnim = tween.exponential.co;
        var rotateAnim = tween.circular;
        var linearAnim = tween.linear;
        var dropAnim = tween.quadratic.ci;
        var fallOffAnim = tween.quadratic.co;

        var random = Ucren.randomNumber;
        var min = Math.min;
        var average = function (a, b) {
            return ((a + b) / 2) >> 0;
        };

        var dropTime = 1200
            , dropXScope = 200
            , shadowPos = 50;

        var infos = {
            // type: [ imageSrc, width, height, radius, fixAngle, isReverse, juiceColor ]
            boom: ["images/fruit/boom.png", 66, 68, 26, 0, 0, null],
            peach: ["images/fruit/peach.png", 62, 59, 37, -50, 0, "#e6c731"],
            sandia: ["images/fruit/sandia.png", 98, 85, 38, -100, 0, "#c00"],
            apple: ["images/fruit/apple.png", 66, 66, 31, -54, 0, "#c8e925"],
            banana: ["images/fruit/banana.png", 126, 50, 43, 90, 0, null],
            basaha: ["images/fruit/basaha.png", 68, 72, 32, -135, 0, "#c00"]
        };

        // TODO: 是否水果全开？
        var types = ["peach", "sandia", "apple", "banana", "basaha"];
        // var types = [ "sandia", "boom" ];
        var rotateSpeed = [60, 50, 40, -40, -50, -60];

        var fruitCache = [];

        function ClassFruit(conf) {
            var info = infos[conf.type]
                , radius = info[3];

            this.type = conf.type;
            this.originX = conf.originX;
            this.originY = conf.originY;
            this.radius = radius;
            this.startX = conf.originX;
            this.startY = conf.originY;
            this.radius = radius;

            this.anims = [];

            if (this.type === "boom")
                this.flame = flame.create(this.startX - radius + 4, this.startY - radius + 5, conf.flameStart || 0);
        }

        ClassFruit.prototype.set = function (hide) {
            var inf = infos[this.type]
                , radius = this.radius;

            this.shadow = layer.createImage("fruit", "images/shadow.png", this.startX - radius, this.startY - radius + shadowPos, 106, 77);
            this.image = layer.createImage("fruit", inf[0], this.startX - radius, this.startY - radius, inf[1], inf[2]);

            if (hide)
                this.image.hide(),
                    this.shadow.hide();

            return this;
        }
            ;

        ClassFruit.prototype.pos = function (x, y) {
            if (x == this.originX && y == this.originY)
                return;

            var r = this.radius;

            this.originX = x;
            this.originY = y;

            this.image.attr({
                x: x -= r,
                y: y -= r
            });
            this.shadow.attr({
                x: x,
                y: y + shadowPos
            });

            if (this.type === "boom")
                this.flame.pos(x + 4, y + 5);
        }
            ;

        ClassFruit.prototype.show = function (start) {
            timeline.createTask({
                start: start,
                duration: 500,
                data: [1e-5, 1, "show"],
                object: this,
                onTimeUpdate: this.onScaling,
                onTimeStart: this.onShowStart,
                recycle: this.anims
            });
        }
            ;

        ClassFruit.prototype.hide = function (start) {
            if (this.type !== "boom")
                // if it is not a boom, it can't to be hide.
                return;

            this.anims.clear();
            this.flame.remove();
            timeline.createTask({
                start: start,
                duration: 500,
                data: [1, 1e-5, "hide"],
                object: this,
                onTimeUpdate: this.onScaling,
                onTimeEnd: this.onHideEnd,
                recycle: this.anims
            });
        }
            ;

        ClassFruit.prototype.rotate = function (start, speed) {
            this.rotateSpeed = speed || rotateSpeed[random(6)];
            this.rotateAnim = timeline.createTask({
                start: start,
                duration: -1,
                object: this,
                onTimeUpdate: this.onRotating,
                recycle: this.anims
            });
        }
            ;

        ClassFruit.prototype.broken = function (angle) {
            if (this.brokend)
                return;
            this.brokend = true;

            var index;
            if ((index = fruitCache.indexOf(this)) > -1)
                fruitCache.splice(index, 1);

            if (this.type !== "boom")
                flash.showAt(this.originX, this.originY, angle),
                    juice.create(this.originX, this.originY, infos[this.type][6]),
                    this.apart(angle);
            else
                this.hide();
        }
            ;

        ClassFruit.prototype.pause = function () {
            if (this.brokend)
                return;
            this.anims.clear();
            if (this.type == "boom")
                this.flame.remove();
        }
            ;

        // 分开
        ClassFruit.prototype.apart = function (angle) {
            this.anims.clear();
            this.image.hide();
            this.shadow.hide();
            this.aparted = true;

            var inf = infos[this.type]
                , preSrc = inf[0].replace(".png", "")
                , radius = this.radius;
            var create = layer.createImage.saturate(layer, this.startX - radius, this.startY - radius, inf[1], inf[2]);

            angle = ((angle % 180) + 360 + inf[4]) % 360;

            this.bImage1 = create("fruit", preSrc + "-1.png");
            this.bImage2 = create("fruit", preSrc + "-2.png");

            [this.bImage1, this.bImage2].invoke("rotate", angle);

            this.apartAngle = angle;
            timeline2.createTask({
                start: 0,
                duration: dropTime,
                object: this,
                onTimeUpdate: this.onBrokenDropUpdate,
                onTimeStart: this.onBrokenDropStart,
                onTimeEnd: this.onBrokenDropEnd,
                recycle: this.anims
            });
        }
            ;

        // 抛出
        ClassFruit.prototype.shotOut = function () {
            var sign = [-1, 1];
            return function (start, endX) {

                this.shotOutStartX = this.originX;
                this.shotOutStartY = this.originY;
                this.shotOutEndX = average(this.originX, endX);
                this.shotOutEndY = min(this.startY - random(this.startY - 100), 200);
                this.fallOffToX = endX;

                timeline.createTask({
                    start: start,
                    duration: dropTime,
                    object: this,
                    onTimeUpdate: this.onShotOuting,
                    onTimeStart: this.onShotOutStart,
                    onTimeEnd: this.onShotOutEnd,
                    recycle: this.anims
                });

                if (this.type != "boom")
                    this.rotate(0, (random(180) + 90) * sign[random(2)]);

                return this;
            }
                ;
        }();

        // 掉落
        ClassFruit.prototype.fallOff = function () {
            var sign = [-1, 1];
            var signIndex = 0;
            return function (start, x) {

                if (this.aparted || this.brokend)
                    return;

                var y = window.innerHeight;

                if (typeof x !== "number")
                    x = this.originX + random(dropXScope) * sign[(signIndex++) % 2];

                this.fallTargetX = x;
                this.fallTargetY = y;

                timeline.createTask({
                    start: start,
                    duration: dropTime,
                    object: this,
                    onTimeUpdate: this.onFalling,
                    onTimeStart: this.onFallStart,
                    onTimeEnd: this.onFallEnd,
                    recycle: this.anims
                });
            }
        }();

        ClassFruit.prototype.remove = function () {
            var index;

            this.anims.clear();

            if (this.image)
                this.image.remove(),
                    this.shadow.remove();

            if (this.bImage1)
                this.bImage1.remove(),
                    this.bImage2.remove();

            if (this.type === "boom")
                this.flame.remove();

            if ((index = fruitCache.indexOf(this)) > -1)
                fruitCache.splice(index, 1);

            for (var name in this)
                if (typeof this[name] === "function")
                    this[name] = function (name) {
                        return function () {
                            throw new Error("method " + name + " has been removed");
                        }
                            ;
                    }(name);
                else
                    delete this[name];

            message.postMessage(this, "fruit.remove");
        }
            ;

        // 显示/隐藏 相关

        ClassFruit.prototype.onShowStart = function () {
            this.image.show();
            // this.shadow.show();
        }
            ;

        ClassFruit.prototype.onScaling = function (time, a, b, z) {
            this.image.scale(z = zoomAnim(time, a, b - a, 500), z);
            this.shadow.scale(z, z);
        }
            ;

        ClassFruit.prototype.onHideEnd = function () {
            this.remove();
        }
            ;

        // 旋转相关

        ClassFruit.prototype.onRotateStart = function () {
        }
            ;

        ClassFruit.prototype.onRotating = function (time) {
            this.image.rotate((this.rotateSpeed * time / 1e3) % 360, true);
        }
            ;

        // 裂开相关

        ClassFruit.prototype.onBrokenDropUpdate = function (time) {
            var radius = this.radius;
            this.bImage1.attr({
                x: linearAnim(time, this.brokenPosX - radius, this.brokenTargetX1, dropTime),
                y: dropAnim(time, this.brokenPosY - radius, this.brokenTargetY1 - this.brokenPosY + radius, dropTime)
            }).rotate(linearAnim(time, this.apartAngle, this.bImage1RotateAngle, dropTime), true);
            this.bImage2.attr({
                x: linearAnim(time, this.brokenPosX - radius, this.brokenTargetX2, dropTime),
                y: dropAnim(time, this.brokenPosY - radius, this.brokenTargetY2 - this.brokenPosY + radius, dropTime)
            }).rotate(linearAnim(time, this.apartAngle, this.bImage2RotateAngle, dropTime), true);
        }
            ;

        ClassFruit.prototype.onBrokenDropStart = function () {
            this.brokenTargetX1 = -(random(dropXScope) + 75);
            this.brokenTargetX2 = random(dropXScope + 75);
            this.brokenTargetY1 = window.innerHeight;
            this.brokenTargetY2 = window.innerHeight;
            this.brokenPosX = this.originX;
            this.brokenPosY = this.originY;
            this.bImage1RotateAngle = -random(150) - 50;
            this.bImage2RotateAngle = random(150) + 50;

            for (var f, i = fruitCache.length - 1; i >= 0; i--)
                if (fruitCache[i] === this)
                    fruitCache.splice(i, 1);
        }
            ;

        ClassFruit.prototype.onBrokenDropEnd = function () {
            this.remove();
        }
            ;

        // 抛出相关

        ClassFruit.prototype.onShotOuting = function (time) {
            this.pos(linearAnim(time, this.shotOutStartX, this.shotOutEndX - this.shotOutStartX, dropTime), fallOffAnim(time, this.shotOutStartY, this.shotOutEndY - this.shotOutStartY, dropTime));
        }
            ;

        ClassFruit.prototype.onShotOutStart = function () {// body...
        }
            ;

        ClassFruit.prototype.onShotOutEnd = function () {
            this.fallOff(0, this.fallOffToX);
        }
            ;

        // 掉落相关

        ClassFruit.prototype.onFalling = function (time) {
            var y;
            this.pos(linearAnim(time, this.brokenPosX, this.fallTargetX - this.brokenPosX, dropTime), y = dropAnim(time, this.brokenPosY, this.fallTargetY - this.brokenPosY, dropTime));
            this.checkForFallOutOfViewer(y);
        }
            ;

        ClassFruit.prototype.onFallStart = function () {
            this.brokenPosX = this.originX;
            this.brokenPosY = this.originY;
        }
            ;

        ClassFruit.prototype.onFallEnd = function () {
            message.postMessage(this, "fruit.fallOff");
            this.remove();
        }
            ;

        // privates

        ClassFruit.prototype.checkForFallOutOfViewer = function (y) {
            if (y > window.innerHeight + this.radius)
                this.checkForFallOutOfViewer = Ucren.nul,
                    this.rotateAnim && this.rotateAnim.stop(),
                    message.postMessage(this, "fruit.fallOutOfViewer");
        }
            ;

        exports.create = function (type, originX, originY, isHide, flameStart) {
            if (typeof type == "number")
                // 缺省 type
                isHide = originY,
                    originY = originX,
                    originX = type,
                    type = getType();

            var fruit = new ClassFruit({
                type: type,
                originX: originX,
                originY: originY,
                flameStart: flameStart
            }).set(isHide);
            fruitCache.unshift(fruit);

            return fruit;
        }
            ;

        exports.getFruitInView = function () {
            return fruitCache;
        }
            ;

        exports.getDropTimeSetting = function () {
            return dropTime;
        }
            ;

        function getType() {
            if (random(8) == 4)
                return "boom";
            else
                return types[random(5)];
        }
        ;
        return exports;
    });

    define("scripts/factory/juice.js", function (exports) {
        /**
         * 果汁
         */
        var Ucren = require("scripts/lib/ucren");
        var layer = require("scripts/layer").getLayer("juice");
        var timeline = require("scripts/timeline").use("juice").init(10);
        var tween = require("scripts/lib/tween");
        var tools = require("scripts/tools");

        var random = Ucren.randomNumber;
        var dur = 1500;
        var anim = tween.exponential.co;
        var dropAnim = tween.quadratic.co;
        var sin = Math.sin;
        var cos = Math.cos;

        var num = 10;
        var radius = 10;

        // if( Ucren.isIe6 || Ucren.isSafari )
        //     switchOn = false;

        // if( Ucren.isIe || Ucren.isSafari )
        // 	num = 6;

        function ClassJuice(x, y, color) {
            this.originX = x;
            this.originY = y;
            this.color = color;

            this.distance = random(200) + 100;
            this.radius = radius;
            this.dir = random(360) * Math.PI / 180;
        }

        ClassJuice.prototype.render = function () {
            this.circle = layer.circle(this.originX, this.originY, this.radius).attr({
                fill: this.color,
                stroke: "none"
            });
        }
            ;

        ClassJuice.prototype.sputter = function () {
            timeline.createTask({
                start: 0,
                duration: dur,
                object: this,
                onTimeUpdate: this.onTimeUpdate,
                onTimeEnd: this.onTimeEnd
            });
        }
            ;

        ClassJuice.prototype.onTimeUpdate = function (time) {
            var distance, x, y, z;

            distance = anim(time, 0, this.distance, dur);
            x = this.originX + distance * cos(this.dir);
            y = this.originY + distance * sin(this.dir) + dropAnim(time, 0, 200, dur);
            z = anim(time, 1, -1, dur);

            this.circle.attr({
                cx: x,
                cy: y
            }).scale(z, z);
        }
            ;

        ClassJuice.prototype.onTimeEnd = function () {
            this.circle.remove();
            tools.unsetObject(this);
        }
            ;

        exports.create = function (x, y, color) {
            for (var i = 0; i < num; i++)
                this.createOne(x, y, color);
        }
            ;

        exports.createOne = function (x, y, color) {
            if (!color)
                return;

            var juice = new ClassJuice(x, y, color);
            juice.render();
            juice.sputter();
        }
            ;
        ;
        return exports;
    });

    define("scripts/factory/rotate.js", function (exports) {
        var layer = require("scripts/layer");
        var timeline = require("scripts/timeline");
        var Ucren = require("scripts/lib/ucren");

        /**
         * 旋转类模块模型
         */

        exports.create = function (imageSrc, x, y, w, h, z, anim, animDur) {
            var module = {}, image;
            var rotateDire = [12, -12][Ucren.randomNumber(2)];
            var defaultAngle = Ucren.randomNumber(360);

            module.anims = [];

            module.set = function () {
                image = layer.createImage("default", imageSrc, x, y, w, h).scale(z, z).rotate(defaultAngle, true);
            }
                ;

            module.show = function (start) {
                timeline.createTask({
                    start: start,
                    duration: animDur,
                    object: this,
                    data: [z, 1],
                    onTimeUpdate: this.onZooming,
                    onTimeEnd: this.onShowEnd,
                    recycle: this.anims
                });
            }
                ;

            module.hide = function (start) {
                this.anims.clear();
                timeline.createTask({
                    start: start,
                    duration: animDur,
                    object: this,
                    data: [1, z],
                    onTimeUpdate: this.onZooming,
                    recycle: this.anims
                });
            }
                ;

            module.onShowEnd = function (name) {
                this.anims.clear();
                timeline.createTask({
                    start: 0,
                    duration: -1,
                    object: this,
                    onTimeUpdate: module.onRotating,
                    recycle: this.anims
                });
            }
                ;

            module.onZooming = function () {
                var z;
                return function (time, a, b) {
                    image.scale(z = anim(time, a, b - a, animDur), z);
                }
            }();

            module.onRotating = function () {
                var lastTime = 0
                    , an = defaultAngle;
                return function (time, name, a, b) {
                    an = (an + (time - lastTime) / 1e3 * rotateDire) % 360;
                    image.rotate(an, true);
                    lastTime = time;
                }
            }();

            return module;
        }
            ;

        return exports;
    });

    define("scripts/lib/buzz.js", function (exports) {
        // ----------------------------------------------------------------------------
        // Buzz, a Javascript HTML5 Audio library
        // v 1.0.x beta
        // Licensed under the MIT license.
        // http://buzz.jaysalvat.com/
        // ----------------------------------------------------------------------------
        // Copyright (C) 2011 Jay Salvat
        // http://jaysalvat.com/
        // ----------------------------------------------------------------------------
        // Permission is hereby granted, free of charge, to any person obtaining a copy
        // of this software and associated documentation files ( the "Software" ), to deal
        // in the Software without restriction, including without limitation the rights
        // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        // copies of the Software, and to permit persons to whom the Software is
        // furnished to do so, subject to the following conditions:
        //
        // The above copyright notice and this permission notice shall be included in
        // all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        // THE SOFTWARE.
        // ----------------------------------------------------------------------------

        var buzz = {
            defaults: {
                autoplay: false,
                duration: 5000,
                formats: [],
                loop: false,
                placeholder: '--',
                preload: 'metadata',
                volume: 80
            },
            types: {
                'mp3': 'audio/mpeg',
                'ogg': 'audio/ogg',
                'wav': 'audio/wav',
                'aac': 'audio/aac',
                'm4a': 'audio/x-m4a'
            },
            sounds: [],
            el: document.createElement('audio'),

            sound: function (src, options) {
                options = options || {};

                var pid = 0
                    , events = []
                    , eventsOnce = {}
                    , supported = buzz.isSupported();

                // publics
                this.load = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.load();
                    return this;
                }
                    ;

                this.play = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.play();
                    return this;
                }
                    ;

                this.togglePlay = function () {
                    if (!supported) {
                        return this;
                    }

                    if (this.sound.paused) {
                        this.sound.play();
                    } else {
                        this.sound.pause();
                    }
                    return this;
                }
                    ;

                this.pause = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.pause();
                    return this;
                }
                    ;

                this.isPaused = function () {
                    if (!supported) {
                        return null;
                    }

                    return this.sound.paused;
                }
                    ;

                this.stop = function () {
                    if (!supported) {
                        return this;
                    }

                    this.setTime(this.getDuration());
                    this.sound.pause();
                    return this;
                }
                    ;

                this.isEnded = function () {
                    if (!supported) {
                        return null;
                    }

                    return this.sound.ended;
                }
                    ;

                this.loop = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.loop = 'loop';
                    this.bind('ended.buzzloop', function () {
                        this.currentTime = 0;
                        this.play();
                    });
                    return this;
                }
                    ;

                this.unloop = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.removeAttribute('loop');
                    this.unbind('ended.buzzloop');
                    return this;
                }
                    ;

                this.mute = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.muted = true;
                    return this;
                }
                    ;

                this.unmute = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.muted = false;
                    return this;
                }
                    ;

                this.toggleMute = function () {
                    if (!supported) {
                        return this;
                    }

                    this.sound.muted = !this.sound.muted;
                    return this;
                }
                    ;

                this.isMuted = function () {
                    if (!supported) {
                        return null;
                    }

                    return this.sound.muted;
                }
                    ;

                this.setVolume = function (volume) {
                    if (!supported) {
                        return this;
                    }

                    if (volume < 0) {
                        volume = 0;
                    }
                    if (volume > 100) {
                        volume = 100;
                    }

                    this.volume = volume;
                    this.sound.volume = volume / 100;
                    return this;
                }
                    ;

                this.getVolume = function () {
                    if (!supported) {
                        return this;
                    }

                    return this.volume;
                }
                    ;

                this.increaseVolume = function (value) {
                    return this.setVolume(this.volume + (value || 1));
                }
                    ;

                this.decreaseVolume = function (value) {
                    return this.setVolume(this.volume - (value || 1));
                }
                    ;

                this.setTime = function (time) {
                    if (!supported) {
                        return this;
                    }

                    this.whenReady(function () {
                        this.sound.currentTime = time;
                    });
                    return this;
                }
                    ;

                this.getTime = function () {
                    if (!supported) {
                        return null;
                    }

                    var time = Math.round(this.sound.currentTime * 100) / 100;
                    return isNaN(time) ? buzz.defaults.placeholder : time;
                }
                    ;

                this.setPercent = function (percent) {
                    if (!supported) {
                        return this;
                    }

                    return this.setTime(buzz.fromPercent(percent, this.sound.duration));
                }
                    ;

                this.getPercent = function () {
                    if (!supported) {
                        return null;
                    }

                    var percent = Math.round(buzz.toPercent(this.sound.currentTime, this.sound.duration));
                    return isNaN(percent) ? buzz.defaults.placeholder : percent;
                }
                    ;

                this.setSpeed = function (duration) {
                    if (!supported) {
                        return this;
                    }

                    this.sound.playbackRate = duration;
                }
                    ;

                this.getSpeed = function () {
                    if (!supported) {
                        return null;
                    }

                    return this.sound.playbackRate;
                }
                    ;

                this.getDuration = function () {
                    if (!supported) {
                        return null;
                    }

                    var duration = Math.round(this.sound.duration * 100) / 100;
                    return isNaN(duration) ? buzz.defaults.placeholder : duration;
                }
                    ;

                this.getPlayed = function () {
                    if (!supported) {
                        return null;
                    }

                    return timerangeToArray(this.sound.played);
                }
                    ;

                this.getBuffered = function () {
                    if (!supported) {
                        return null;
                    }

                    return timerangeToArray(this.sound.buffered);
                }
                    ;

                this.getSeekable = function () {
                    if (!supported) {
                        return null;
                    }

                    return timerangeToArray(this.sound.seekable);
                }
                    ;

                this.getErrorCode = function () {
                    if (supported && this.sound.error) {
                        return this.sound.error.code;
                    }
                    return 0;
                }
                    ;

                this.getErrorMessage = function () {
                    if (!supported) {
                        return null;
                    }

                    switch (this.getErrorCode()) {
                        case 1:
                            return 'MEDIA_ERR_ABORTED';
                        case 2:
                            return 'MEDIA_ERR_NETWORK';
                        case 3:
                            return 'MEDIA_ERR_DECODE';
                        case 4:
                            return 'MEDIA_ERR_SRC_NOT_SUPPORTED';
                        default:
                            return null;
                    }
                }
                    ;

                this.getStateCode = function () {
                    if (!supported) {
                        return null;
                    }

                    return this.sound.readyState;
                }
                    ;

                this.getStateMessage = function () {
                    if (!supported) {
                        return null;
                    }

                    switch (this.getStateCode()) {
                        case 0:
                            return 'HAVE_NOTHING';
                        case 1:
                            return 'HAVE_METADATA';
                        case 2:
                            return 'HAVE_CURRENT_DATA';
                        case 3:
                            return 'HAVE_FUTURE_DATA';
                        case 4:
                            return 'HAVE_ENOUGH_DATA';
                        default:
                            return null;
                    }
                }
                    ;

                this.getNetworkStateCode = function () {
                    if (!supported) {
                        return null;
                    }

                    return this.sound.networkState;
                }
                    ;

                this.getNetworkStateMessage = function () {
                    if (!supported) {
                        return null;
                    }

                    switch (this.getNetworkStateCode()) {
                        case 0:
                            return 'NETWORK_EMPTY';
                        case 1:
                            return 'NETWORK_IDLE';
                        case 2:
                            return 'NETWORK_LOADING';
                        case 3:
                            return 'NETWORK_NO_SOURCE';
                        default:
                            return null;
                    }
                }
                    ;

                this.set = function (key, value) {
                    if (!supported) {
                        return this;
                    }

                    this.sound[key] = value;
                    return this;
                }
                    ;

                this.get = function (key) {
                    if (!supported) {
                        return null;
                    }

                    return key ? this.sound[key] : this.sound;
                }
                    ;

                this.bind = function (types, func) {
                    if (!supported) {
                        return this;
                    }

                    types = types.split(' ');

                    var that = this
                        , efunc = function (e) {
                            func.call(that, e);
                        };

                    for (var t = 0; t < types.length; t++) {
                        var type = types[t]
                            , idx = type;
                        type = idx.split('.')[0];

                        events.push({
                            idx: idx,
                            func: efunc
                        });
                        this.sound.addEventListener(type, efunc, true);
                    }
                    return this;
                }
                    ;

                this.unbind = function (types) {
                    if (!supported) {
                        return this;
                    }

                    types = types.split(' ');

                    for (var t = 0; t < types.length; t++) {
                        var idx = types[t]
                            , type = idx.split('.')[0];

                        for (var i = 0; i < events.length; i++) {
                            var namespace = events[i].idx.split('.');
                            if (events[i].idx == idx || (namespace[1] && namespace[1] == idx.replace('.', ''))) {
                                this.sound.removeEventListener(type, events[i].func, true);
                                // remove event
                                events.splice(i, 1);
                            }
                        }
                    }
                    return this;
                }
                    ;

                this.bindOnce = function (type, func) {
                    if (!supported) {
                        return this;
                    }

                    var that = this;

                    eventsOnce[pid++] = false;
                    this.bind(pid + type, function () {
                        if (!eventsOnce[pid]) {
                            eventsOnce[pid] = true;
                            func.call(that);
                        }
                        that.unbind(pid + type);
                    });
                }
                    ;

                this.trigger = function (types) {
                    if (!supported) {
                        return this;
                    }

                    types = types.split(' ');

                    for (var t = 0; t < types.length; t++) {
                        var idx = types[t];

                        for (var i = 0; i < events.length; i++) {
                            var eventType = events[i].idx.split('.');
                            if (events[i].idx == idx || (eventType[0] && eventType[0] == idx.replace('.', ''))) {
                                var evt = document.createEvent('HTMLEvents');
                                evt.initEvent(eventType[0], false, true);
                                this.sound.dispatchEvent(evt);
                            }
                        }
                    }
                    return this;
                }
                    ;

                this.fadeTo = function (to, duration, callback) {
                    if (!supported) {
                        return this;
                    }

                    if (duration instanceof Function) {
                        callback = duration;
                        duration = buzz.defaults.duration;
                    } else {
                        duration = duration || buzz.defaults.duration;
                    }

                    var from = this.volume
                        , delay = duration / Math.abs(from - to)
                        , that = this;
                    this.play();

                    function doFade() {
                        setTimeout(function () {
                            if (from < to && that.volume < to) {
                                that.setVolume(that.volume += 1);
                                doFade();
                            } else if (from > to && that.volume > to) {
                                that.setVolume(that.volume -= 1);
                                doFade();
                            } else if (callback instanceof Function) {
                                callback.apply(that);
                            }
                        }, delay);
                    }
                    this.whenReady(function () {
                        doFade();
                    });

                    return this;
                }
                    ;

                this.fadeIn = function (duration, callback) {
                    if (!supported) {
                        return this;
                    }

                    return this.setVolume(0).fadeTo(100, duration, callback);
                }
                    ;

                this.fadeOut = function (duration, callback) {
                    if (!supported) {
                        return this;
                    }

                    return this.fadeTo(0, duration, callback);
                }
                    ;

                this.fadeWith = function (sound, duration) {
                    if (!supported) {
                        return this;
                    }

                    this.fadeOut(duration, function () {
                        this.stop();
                    });

                    sound.play().fadeIn(duration);

                    return this;
                }
                    ;

                this.whenReady = function (func) {
                    if (!supported) {
                        return null;
                    }

                    var that = this;
                    if (this.sound.readyState === 0) {
                        this.bind('canplay.buzzwhenready', function () {
                            func.call(that);
                        });
                    } else {
                        func.call(that);
                    }
                }
                    ;

                // privates
                function timerangeToArray(timeRange) {
                    var array = []
                        , length = timeRange.length - 1;

                    for (var i = 0; i <= length; i++) {
                        array.push({
                            start: timeRange.start(length),
                            end: timeRange.end(length)
                        });
                    }
                    return array;
                }

                function getExt(filename) {
                    return filename.split('.').pop();
                }

                function addSource(sound, src) {
                    var source = document.createElement('source');
                    source.src = src;
                    if (buzz.types[getExt(src)]) {
                        source.type = buzz.types[getExt(src)];
                    }
                    sound.appendChild(source);
                }

                // init
                if (supported && src) {

                    for (var i in buzz.defaults) {
                        if (buzz.defaults.hasOwnProperty(i)) {
                            options[i] = options[i] || buzz.defaults[i];
                        }
                    }

                    this.sound = document.createElement('audio');

                    if (src instanceof Array) {
                        for (var j in src) {
                            if (src.hasOwnProperty(j)) {
                                addSource(this.sound, src[j]);
                            }
                        }
                    } else if (options.formats.length) {
                        for (var k in options.formats) {
                            if (options.formats.hasOwnProperty(k)) {
                                addSource(this.sound, src + '.' + options.formats[k]);
                            }
                        }
                    } else {
                        addSource(this.sound, src);
                    }

                    if (options.loop) {
                        this.loop();
                    }

                    if (options.autoplay) {
                        this.sound.autoplay = 'autoplay';
                    }

                    if (options.preload === true) {
                        this.sound.preload = 'auto';
                    } else if (options.preload === false) {
                        this.sound.preload = 'none';
                    } else {
                        this.sound.preload = options.preload;
                    }

                    this.setVolume(options.volume);

                    buzz.sounds.push(this);
                }
            },

            group: function (sounds) {
                sounds = argsToArray(sounds, arguments);

                // publics
                this.getSounds = function () {
                    return sounds;
                }
                    ;

                this.add = function (soundArray) {
                    soundArray = argsToArray(soundArray, arguments);
                    for (var a = 0; a < soundArray.length; a++) {
                        sounds.push(soundArray[a]);
                    }
                }
                    ;

                this.remove = function (soundArray) {
                    soundArray = argsToArray(soundArray, arguments);
                    for (var a = 0; a < soundArray.length; a++) {
                        for (var i = 0; i < sounds.length; i++) {
                            if (sounds[i] == soundArray[a]) {
                                delete sounds[i];
                                break;
                            }
                        }
                    }
                }
                    ;

                this.load = function () {
                    fn('load');
                    return this;
                }
                    ;

                this.play = function () {
                    fn('play');
                    return this;
                }
                    ;

                this.togglePlay = function () {
                    fn('togglePlay');
                    return this;
                }
                    ;

                this.pause = function (time) {
                    fn('pause', time);
                    return this;
                }
                    ;

                this.stop = function () {
                    fn('stop');
                    return this;
                }
                    ;

                this.mute = function () {
                    fn('mute');
                    return this;
                }
                    ;

                this.unmute = function () {
                    fn('unmute');
                    return this;
                }
                    ;

                this.toggleMute = function () {
                    fn('toggleMute');
                    return this;
                }
                    ;

                this.setVolume = function (volume) {
                    fn('setVolume', volume);
                    return this;
                }
                    ;

                this.increaseVolume = function (value) {
                    fn('increaseVolume', value);
                    return this;
                }
                    ;

                this.decreaseVolume = function (value) {
                    fn('decreaseVolume', value);
                    return this;
                }
                    ;

                this.loop = function () {
                    fn('loop');
                    return this;
                }
                    ;

                this.unloop = function () {
                    fn('unloop');
                    return this;
                }
                    ;

                this.setTime = function (time) {
                    fn('setTime', time);
                    return this;
                }
                    ;

                this.setduration = function (duration) {
                    fn('setduration', duration);
                    return this;
                }
                    ;

                this.set = function (key, value) {
                    fn('set', key, value);
                    return this;
                }
                    ;

                this.bind = function (type, func) {
                    fn('bind', type, func);
                    return this;
                }
                    ;

                this.unbind = function (type) {
                    fn('unbind', type);
                    return this;
                }
                    ;

                this.bindOnce = function (type, func) {
                    fn('bindOnce', type, func);
                    return this;
                }
                    ;

                this.trigger = function (type) {
                    fn('trigger', type);
                    return this;
                }
                    ;

                this.fade = function (from, to, duration, callback) {
                    fn('fade', from, to, duration, callback);
                    return this;
                }
                    ;

                this.fadeIn = function (duration, callback) {
                    fn('fadeIn', duration, callback);
                    return this;
                }
                    ;

                this.fadeOut = function (duration, callback) {
                    fn('fadeOut', duration, callback);
                    return this;
                }
                    ;

                // privates
                function fn() {
                    var args = argsToArray(null, arguments)
                        , func = args.shift();

                    for (var i = 0; i < sounds.length; i++) {
                        sounds[i][func].apply(sounds[i], args);
                    }
                }

                function argsToArray(array, args) {
                    return (array instanceof Array) ? array : Array.prototype.slice.call(args);
                }
            },

            all: function () {
                return new buzz.group(buzz.sounds);
            },

            isSupported: function () {
                return !!buzz.el.canPlayType;
            },

            isOGGSupported: function () {
                return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/ogg; codecs="vorbis"');
            },

            isWAVSupported: function () {
                return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/wav; codecs="1"');
            },

            isMP3Supported: function () {
                return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/mpeg;');
            },

            isAACSupported: function () {
                return !!buzz.el.canPlayType && (buzz.el.canPlayType('audio/x-m4a;') || buzz.el.canPlayType('audio/aac;'));
            },

            toTimer: function (time, withHours) {
                var h, m, s;
                h = Math.floor(time / 3600);
                h = isNaN(h) ? '--' : (h >= 10) ? h : '0' + h;
                m = withHours ? Math.floor(time / 60 % 60) : Math.floor(time / 60);
                m = isNaN(m) ? '--' : (m >= 10) ? m : '0' + m;
                s = Math.floor(time % 60);
                s = isNaN(s) ? '--' : (s >= 10) ? s : '0' + s;
                return withHours ? h + ':' + m + ':' + s : m + ':' + s;
            },

            fromTimer: function (time) {
                var splits = time.toString().split(':');
                if (splits && splits.length == 3) {
                    time = (parseInt(splits[0], 10) * 3600) + (parseInt(splits[1], 10) * 60) + parseInt(splits[2], 10);
                }
                if (splits && splits.length == 2) {
                    time = (parseInt(splits[0], 10) * 60) + parseInt(splits[1], 10);
                }
                return time;
            },

            toPercent: function (value, total, decimal) {
                var r = Math.pow(10, decimal || 0);

                return Math.round(((value * 100) / total) * r) / r;
            },

            fromPercent: function (percent, total, decimal) {
                var r = Math.pow(10, decimal || 0);

                return Math.round(((total / 100) * percent) * r) / r;
            }
        };

        exports = buzz;
        ;
        return exports;
    });

    define("scripts/lib/raphael.js", function (exports) {
        /*
         * Raphael 1.5.2 - JavaScript Vector Library
         *
         * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
         * Licensed under the MIT (http://raphaeljs.com/license.html) license.
         */

        var Raphael;
        var window = {};
        (function () {
            function a() {
                if (a.is(arguments[0], G)) {
                    var b = arguments[0]
                        , d = bV[m](a, b.splice(0, 3 + a.is(b[0], E)))
                        , e = d.set();
                    for (var g = 0, h = b[w]; g < h; g++) {
                        var i = b[g] || {};
                        c[f](i.type) && e[L](d[i.type]().attr(i))
                    }
                    return e
                }
                return bV[m](a, arguments)
            }
            a.version = "1.5.2";
            var b = /[, ]+/, c = {
                circle: 1,
                rect: 1,
                path: 1,
                ellipse: 1,
                text: 1,
                image: 1
            }, d = /\{(\d+)\}/g, e = "prototype", f = "hasOwnProperty", g = document, h = window, i = {
                was: Object[e][f].call(h, "Raphael"),
                is: h.Raphael
            }, j = function () {
                this.customAttributes = {}
            }, k, l = "appendChild", m = "apply", n = "concat", o = "createTouch" in g, p = "", q = " ", r = String, s = "split", t = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[s](q), u = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend"
            }, v = "join", w = "length", x = r[e].toLowerCase, y = Math, z = y.max, A = y.min, B = y.abs, C = y.pow, D = y.PI, E = "number", F = "string", G = "array", H = "toString", I = "fill", J = Object[e][H], K = {}, L = "push", M = /^url\(['"]?([^\)]+?)['"]?\)$/i, N = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, O = {
                "NaN": 1,
                Infinity: 1,
                "-Infinity": 1
            }, P = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, Q = y.round, R = "setAttribute", S = parseFloat, T = parseInt, U = " progid:DXImageTransform.Microsoft", V = r[e].toUpperCase, W = {
                blur: 0,
                "clip-rect": "0 0 1e9 1e9",
                cursor: "default",
                cx: 0,
                cy: 0,
                fill: "#fff",
                "fill-opacity": 1,
                font: "10px \"Arial\"",
                "font-family": "\"Arial\"",
                "font-size": "10",
                "font-style": "normal",
                "font-weight": 400,
                gradient: 0,
                height: 0,
                href: "http://raphaeljs.com/",
                opacity: 1,
                path: "M0,0",
                r: 0,
                rotation: 0,
                rx: 0,
                ry: 0,
                scale: "1 1",
                src: "",
                stroke: "#000",
                "stroke-dasharray": "",
                "stroke-linecap": "butt",
                "stroke-linejoin": "butt",
                "stroke-miterlimit": 0,
                "stroke-opacity": 1,
                "stroke-width": 1,
                target: "_blank",
                "text-anchor": "middle",
                title: "Raphael",
                translation: "0 0",
                width: 0,
                x: 0,
                y: 0
            }, X = {
                along: "along",
                blur: E,
                "clip-rect": "csv",
                cx: E,
                cy: E,
                fill: "colour",
                "fill-opacity": E,
                "font-size": E,
                height: E,
                opacity: E,
                path: "path",
                r: E,
                rotation: "csv",
                rx: E,
                ry: E,
                scale: "csv",
                stroke: "colour",
                "stroke-opacity": E,
                "stroke-width": E,
                translation: "csv",
                width: E,
                x: E,
                y: E
            }, Y = "replace", Z = /^(from|to|\d+%?)$/, $ = /\s*,\s*/, _ = {
                hs: 1,
                rg: 1
            }, ba = /,?([achlmqrstvxz]),?/gi, bb = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig, bc = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig, bd = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/, be = function (a, b) {
                return a.key - b.key
            };
            a.type = h.SVGAngle || g.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
            if (a.type == "VML") {
                var bf = g.createElement("div"), bg;
                bf.innerHTML = "<v:shape adj=\"1\"/>";
                bg = bf.firstChild;
                bg.style.behavior = "url(#default#VML)";
                if (!(bg && typeof bg.adj == "object"))
                    return a.type = null;
                bf = null
            }
            a.svg = !(a.vml = a.type == "VML");
            j[e] = a[e];
            k = j[e];
            a._id = 0;
            a._oid = 0;
            a.fn = {};
            a.is = function (a, b) {
                b = x.call(b);
                if (b == "finite")
                    return !O[f](+a);
                return b == "null" && a === null || b == typeof a || b == "object" && a === Object(a) || b == "array" && Array.isArray && Array.isArray(a) || J.call(a).slice(8, -1).toLowerCase() == b
            }
                ;
            a.angle = function (b, c, d, e, f, g) {
                {
                    if (f == null) {
                        var h = b - d
                            , i = c - e;
                        if (!h && !i)
                            return 0;
                        return ((h < 0) * 180 + y.atan(-i / -h) * 180 / D + 360) % 360
                    }
                    return a.angle(b, c, f, g) - a.angle(d, e, f, g)
                }
            }
                ;
            a.rad = function (a) {
                return a % 360 * D / 180
            }
                ;
            a.deg = function (a) {
                return a * 180 / D % 360
            }
                ;
            a.snapTo = function (b, c, d) {
                d = a.is(d, "finite") ? d : 10;
                if (a.is(b, G)) {
                    var e = b.length;
                    while (e--)
                        if (B(b[e] - c) <= d)
                            return b[e]
                } else {
                    b = +b;
                    var f = c % b;
                    if (f < d)
                        return c - f;
                    if (f > b - d)
                        return c - f + b
                }
                return c
            }
                ;
            function bh() {
                var a = []
                    , b = 0;
                for (; b < 32; b++)
                    a[b] = (~(~(y.random() * 16)))[H](16);
                a[12] = 4;
                a[16] = (a[16] & 3 | 8)[H](16);
                return "r-" + a[v]("")
            }
            a.setWindow = function (a) {
                h = a;
                g = h.document
            }
                ;
            var bi = function (b) {
                if (a.vml) {
                    var c = /^\s+|\s+$/g, d;
                    try {
                        var e = new ActiveXObject("htmlfile");
                        e.write("<body>");
                        e.close();
                        d = e.body
                    } catch (a) {
                        d = createPopup().document.body
                    }
                    var f = d.createTextRange();
                    bi = bm(function (a) {
                        try {
                            d.style.color = r(a)[Y](c, p);
                            var b = f.queryCommandValue("ForeColor");
                            b = (b & 255) << 16 | b & 65280 | (b & 16711680) >>> 16;
                            return "#" + ("000000" + b[H](16)).slice(-6)
                        } catch (a) {
                            return "none"
                        }
                    })
                } else {
                    var h = g.createElement("i");
                    h.title = "Raphaël Colour Picker";
                    h.style.display = "none";
                    g.body[l](h);
                    bi = bm(function (a) {
                        h.style.color = a;
                        return g.defaultView.getComputedStyle(h, p).getPropertyValue("color")
                    })
                }
                return bi(b)
            }
                , bj = function () {
                    return "hsb(" + [this.h, this.s, this.b] + ")"
                }
                , bk = function () {
                    return "hsl(" + [this.h, this.s, this.l] + ")"
                }
                , bl = function () {
                    return this.hex
                };
            a.hsb2rgb = function (b, c, d, e) {
                if (a.is(b, "object") && "h" in b && "s" in b && "b" in b) {
                    d = b.b;
                    c = b.s;
                    b = b.h;
                    e = b.o
                }
                return a.hsl2rgb(b, c, d / 2, e)
            }
                ;
            a.hsl2rgb = function (b, c, d, e) {
                if (a.is(b, "object") && "h" in b && "s" in b && "l" in b) {
                    d = b.l;
                    c = b.s;
                    b = b.h
                }
                if (b > 1 || c > 1 || d > 1) {
                    b /= 360;
                    c /= 100;
                    d /= 100
                }
                var f = {}, g = ["r", "g", "b"], h, i, j, k, l, m;
                if (c) {
                    d < 0.5 ? h = d * (1 + c) : h = d + c - d * c;
                    i = 2 * d - h;
                    for (var n = 0; n < 3; n++) {
                        j = b + 1 / 3 * -(n - 1);
                        j < 0 && j++;
                        j > 1 && j--;
                        j * 6 < 1 ? f[g[n]] = i + (h - i) * 6 * j : j * 2 < 1 ? f[g[n]] = h : j * 3 < 2 ? f[g[n]] = i + (h - i) * (2 / 3 - j) * 6 : f[g[n]] = i
                    }
                } else
                    f = {
                        r: d,
                        g: d,
                        b: d
                    };
                f.r *= 255;
                f.g *= 255;
                f.b *= 255;
                f.hex = "#" + (16777216 | f.b | f.g << 8 | f.r << 16).toString(16).slice(1);
                a.is(e, "finite") && (f.opacity = e);
                f.toString = bl;
                return f
            }
                ;
            a.rgb2hsb = function (b, c, d) {
                if (c == null && a.is(b, "object") && "r" in b && "g" in b && "b" in b) {
                    d = b.b;
                    c = b.g;
                    b = b.r
                }
                if (c == null && a.is(b, F)) {
                    var e = a.getRGB(b);
                    b = e.r;
                    c = e.g;
                    d = e.b
                }
                if (b > 1 || c > 1 || d > 1) {
                    b /= 255;
                    c /= 255;
                    d /= 255
                }
                var f = z(b, c, d), g = A(b, c, d), h, i, j = f;
                {
                    if (g == f)
                        return {
                            h: 0,
                            s: 0,
                            b: f,
                            toString: bj
                        };
                    var k = f - g;
                    i = k / f;
                    b == f ? h = (c - d) / k : c == f ? h = 2 + (d - b) / k : h = 4 + (b - c) / k;
                    h /= 6;
                    h < 0 && h++;
                    h > 1 && h--
                }
                return {
                    h: h,
                    s: i,
                    b: j,
                    toString: bj
                }
            }
                ;
            a.rgb2hsl = function (b, c, d) {
                if (c == null && a.is(b, "object") && "r" in b && "g" in b && "b" in b) {
                    d = b.b;
                    c = b.g;
                    b = b.r
                }
                if (c == null && a.is(b, F)) {
                    var e = a.getRGB(b);
                    b = e.r;
                    c = e.g;
                    d = e.b
                }
                if (b > 1 || c > 1 || d > 1) {
                    b /= 255;
                    c /= 255;
                    d /= 255
                }
                var f = z(b, c, d), g = A(b, c, d), h, i, j = (f + g) / 2, k;
                if (g == f)
                    k = {
                        h: 0,
                        s: 0,
                        l: j
                    };
                else {
                    var l = f - g;
                    i = j < 0.5 ? l / (f + g) : l / (2 - f - g);
                    b == f ? h = (c - d) / l : c == f ? h = 2 + (d - b) / l : h = 4 + (b - c) / l;
                    h /= 6;
                    h < 0 && h++;
                    h > 1 && h--;
                    k = {
                        h: h,
                        s: i,
                        l: j
                    }
                }
                k.toString = bk;
                return k
            }
                ;
            a._path2string = function () {
                return this.join(",")[Y](ba, "$1")
            }
                ;
            function bm(a, b, c) {
                function d() {
                    var g = Array[e].slice.call(arguments, 0)
                        , h = g[v]("►")
                        , i = d.cache = d.cache || {}
                        , j = d.count = d.count || [];
                    if (i[f](h))
                        return c ? c(i[h]) : i[h];
                    j[w] >= 1000 && delete i[j.shift()];
                    j[L](h);
                    i[h] = a[m](b, g);
                    return c ? c(i[h]) : i[h]
                }
                return d
            }
            a.getRGB = bm(function (b) {
                if (!b || !(!((b = r(b)).indexOf("-") + 1)))
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1
                    };
                if (b == "none")
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none"
                    };
                !(_[f](b.toLowerCase().substring(0, 2)) || b.charAt() == "#") && (b = bi(b));
                var c, d, e, g, h, i, j, k = b.match(N);
                if (k) {
                    if (k[2]) {
                        g = T(k[2].substring(5), 16);
                        e = T(k[2].substring(3, 5), 16);
                        d = T(k[2].substring(1, 3), 16)
                    }
                    if (k[3]) {
                        g = T((i = k[3].charAt(3)) + i, 16);
                        e = T((i = k[3].charAt(2)) + i, 16);
                        d = T((i = k[3].charAt(1)) + i, 16)
                    }
                    if (k[4]) {
                        j = k[4][s]($);
                        d = S(j[0]);
                        j[0].slice(-1) == "%" && (d *= 2.55);
                        e = S(j[1]);
                        j[1].slice(-1) == "%" && (e *= 2.55);
                        g = S(j[2]);
                        j[2].slice(-1) == "%" && (g *= 2.55);
                        k[1].toLowerCase().slice(0, 4) == "rgba" && (h = S(j[3]));
                        j[3] && j[3].slice(-1) == "%" && (h /= 100)
                    }
                    if (k[5]) {
                        j = k[5][s]($);
                        d = S(j[0]);
                        j[0].slice(-1) == "%" && (d *= 2.55);
                        e = S(j[1]);
                        j[1].slice(-1) == "%" && (e *= 2.55);
                        g = S(j[2]);
                        j[2].slice(-1) == "%" && (g *= 2.55);
                        (j[0].slice(-3) == "deg" || j[0].slice(-1) == "°") && (d /= 360);
                        k[1].toLowerCase().slice(0, 4) == "hsba" && (h = S(j[3]));
                        j[3] && j[3].slice(-1) == "%" && (h /= 100);
                        return a.hsb2rgb(d, e, g, h)
                    }
                    if (k[6]) {
                        j = k[6][s]($);
                        d = S(j[0]);
                        j[0].slice(-1) == "%" && (d *= 2.55);
                        e = S(j[1]);
                        j[1].slice(-1) == "%" && (e *= 2.55);
                        g = S(j[2]);
                        j[2].slice(-1) == "%" && (g *= 2.55);
                        (j[0].slice(-3) == "deg" || j[0].slice(-1) == "°") && (d /= 360);
                        k[1].toLowerCase().slice(0, 4) == "hsla" && (h = S(j[3]));
                        j[3] && j[3].slice(-1) == "%" && (h /= 100);
                        return a.hsl2rgb(d, e, g, h)
                    }
                    k = {
                        r: d,
                        g: e,
                        b: g
                    };
                    k.hex = "#" + (16777216 | g | e << 8 | d << 16).toString(16).slice(1);
                    a.is(h, "finite") && (k.opacity = h);
                    return k
                }
                return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1
                }
            }, a);
            a.getColor = function (a) {
                var b = this.getColor.start = this.getColor.start || {
                    h: 0,
                    s: 1,
                    b: a || 0.75
                }
                    , c = this.hsb2rgb(b.h, b.s, b.b);
                b.h += 0.075;
                if (b.h > 1) {
                    b.h = 0;
                    b.s -= 0.2;
                    b.s <= 0 && (this.getColor.start = {
                        h: 0,
                        s: 1,
                        b: b.b
                    })
                }
                return c.hex
            }
                ;
            a.getColor.reset = function () {
                delete this.start
            }
                ;
            a.parsePathString = bm(function (b) {
                if (!b)
                    return null;
                var c = {
                    a: 7,
                    c: 6,
                    h: 1,
                    l: 2,
                    m: 2,
                    q: 4,
                    s: 4,
                    t: 2,
                    v: 1,
                    z: 0
                }
                    , d = [];
                a.is(b, G) && a.is(b[0], G) && (d = bo(b));
                d[w] || r(b)[Y](bb, function (a, b, e) {
                    var f = []
                        , g = x.call(b);
                    e[Y](bc, function (a, b) {
                        b && f[L](+b)
                    });
                    if (g == "m" && f[w] > 2) {
                        d[L]([b][n](f.splice(0, 2)));
                        g = "l";
                        b = b == "m" ? "l" : "L"
                    }
                    while (f[w] >= c[g]) {
                        d[L]([b][n](f.splice(0, c[g])));
                        if (!c[g])
                            break
                    }
                });
                d[H] = a._path2string;
                return d
            });
            a.findDotsAtSegment = function (a, b, c, d, e, f, g, h, i) {
                var j = 1 - i
                    , k = C(j, 3) * a + C(j, 2) * 3 * i * c + j * 3 * i * i * e + C(i, 3) * g
                    , l = C(j, 3) * b + C(j, 2) * 3 * i * d + j * 3 * i * i * f + C(i, 3) * h
                    , m = a + 2 * i * (c - a) + i * i * (e - 2 * c + a)
                    , n = b + 2 * i * (d - b) + i * i * (f - 2 * d + b)
                    , o = c + 2 * i * (e - c) + i * i * (g - 2 * e + c)
                    , p = d + 2 * i * (f - d) + i * i * (h - 2 * f + d)
                    , q = (1 - i) * a + i * c
                    , r = (1 - i) * b + i * d
                    , s = (1 - i) * e + i * g
                    , t = (1 - i) * f + i * h
                    , u = 90 - y.atan((m - o) / (n - p)) * 180 / D;
                (m > o || n < p) && (u += 180);
                return {
                    x: k,
                    y: l,
                    m: {
                        x: m,
                        y: n
                    },
                    n: {
                        x: o,
                        y: p
                    },
                    start: {
                        x: q,
                        y: r
                    },
                    end: {
                        x: s,
                        y: t
                    },
                    alpha: u
                }
            }
                ;
            var bn = bm(function (a) {
                if (!a)
                    return {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                a = bw(a);
                var b = 0, c = 0, d = [], e = [], f;
                for (var g = 0, h = a[w]; g < h; g++) {
                    f = a[g];
                    if (f[0] == "M") {
                        b = f[1];
                        c = f[2];
                        d[L](b);
                        e[L](c)
                    } else {
                        var i = bv(b, c, f[1], f[2], f[3], f[4], f[5], f[6]);
                        d = d[n](i.min.x, i.max.x);
                        e = e[n](i.min.y, i.max.y);
                        b = f[5];
                        c = f[6]
                    }
                }
                var j = A[m](0, d)
                    , k = A[m](0, e);
                return {
                    x: j,
                    y: k,
                    width: z[m](0, d) - j,
                    height: z[m](0, e) - k
                }
            })
                , bo = function (b) {
                    var c = [];
                    if (!a.is(b, G) || !a.is(b && b[0], G))
                        b = a.parsePathString(b);
                    for (var d = 0, e = b[w]; d < e; d++) {
                        c[d] = [];
                        for (var f = 0, g = b[d][w]; f < g; f++)
                            c[d][f] = b[d][f]
                    }
                    c[H] = a._path2string;
                    return c
                }
                , bp = bm(function (b) {
                    if (!a.is(b, G) || !a.is(b && b[0], G))
                        b = a.parsePathString(b);
                    var c = []
                        , d = 0
                        , e = 0
                        , f = 0
                        , g = 0
                        , h = 0;
                    if (b[0][0] == "M") {
                        d = b[0][1];
                        e = b[0][2];
                        f = d;
                        g = e;
                        h++;
                        c[L](["M", d, e])
                    }
                    for (var i = h, j = b[w]; i < j; i++) {
                        var k = c[i] = []
                            , l = b[i];
                        if (l[0] != x.call(l[0])) {
                            k[0] = x.call(l[0]);
                            switch (k[0]) {
                                case "a":
                                    k[1] = l[1];
                                    k[2] = l[2];
                                    k[3] = l[3];
                                    k[4] = l[4];
                                    k[5] = l[5];
                                    k[6] = +(l[6] - d).toFixed(3);
                                    k[7] = +(l[7] - e).toFixed(3);
                                    break;
                                case "v":
                                    k[1] = +(l[1] - e).toFixed(3);
                                    break;
                                case "m":
                                    f = l[1];
                                    g = l[2];
                                default:
                                    for (var m = 1, n = l[w]; m < n; m++)
                                        k[m] = +(l[m] - (m % 2 ? d : e)).toFixed(3)
                            }
                        } else {
                            k = c[i] = [];
                            if (l[0] == "m") {
                                f = l[1] + d;
                                g = l[2] + e
                            }
                            for (var o = 0, p = l[w]; o < p; o++)
                                c[i][o] = l[o]
                        }
                        var q = c[i][w];
                        switch (c[i][0]) {
                            case "z":
                                d = f;
                                e = g;
                                break;
                            case "h":
                                d += +c[i][q - 1];
                                break;
                            case "v":
                                e += +c[i][q - 1];
                                break;
                            default:
                                d += +c[i][q - 2];
                                e += +c[i][q - 1]
                        }
                    }
                    c[H] = a._path2string;
                    return c
                }, 0, bo)
                , bq = bm(function (b) {
                    if (!a.is(b, G) || !a.is(b && b[0], G))
                        b = a.parsePathString(b);
                    var c = []
                        , d = 0
                        , e = 0
                        , f = 0
                        , g = 0
                        , h = 0;
                    if (b[0][0] == "M") {
                        d = +b[0][1];
                        e = +b[0][2];
                        f = d;
                        g = e;
                        h++;
                        c[0] = ["M", d, e]
                    }
                    for (var i = h, j = b[w]; i < j; i++) {
                        var k = c[i] = []
                            , l = b[i];
                        if (l[0] != V.call(l[0])) {
                            k[0] = V.call(l[0]);
                            switch (k[0]) {
                                case "A":
                                    k[1] = l[1];
                                    k[2] = l[2];
                                    k[3] = l[3];
                                    k[4] = l[4];
                                    k[5] = l[5];
                                    k[6] = +(l[6] + d);
                                    k[7] = +(l[7] + e);
                                    break;
                                case "V":
                                    k[1] = +l[1] + e;
                                    break;
                                case "H":
                                    k[1] = +l[1] + d;
                                    break;
                                case "M":
                                    f = +l[1] + d;
                                    g = +l[2] + e;
                                default:
                                    for (var m = 1, n = l[w]; m < n; m++)
                                        k[m] = +l[m] + (m % 2 ? d : e)
                            }
                        } else
                            for (var o = 0, p = l[w]; o < p; o++)
                                c[i][o] = l[o];
                        switch (k[0]) {
                            case "Z":
                                d = f;
                                e = g;
                                break;
                            case "H":
                                d = k[1];
                                break;
                            case "V":
                                e = k[1];
                                break;
                            case "M":
                                f = c[i][c[i][w] - 2];
                                g = c[i][c[i][w] - 1];
                            default:
                                d = c[i][c[i][w] - 2];
                                e = c[i][c[i][w] - 1]
                        }
                    }
                    c[H] = a._path2string;
                    return c
                }, null, bo)
                , br = function (a, b, c, d) {
                    return [a, b, c, d, c, d]
                }
                , bs = function (a, b, c, d, e, f) {
                    var g = 1 / 3
                        , h = 2 / 3;
                    return [g * a + h * c, g * b + h * d, g * e + h * c, g * f + h * d, e, f]
                }
                , bt = function (a, b, c, d, e, f, g, h, i, j) {
                    var k = D * 120 / 180, l = D / 180 * (+e || 0), m = [], o, p = bm(function (a, b, c) {
                        var d = a * y.cos(c) - b * y.sin(c)
                            , e = a * y.sin(c) + b * y.cos(c);
                        return {
                            x: d,
                            y: e
                        }
                    });
                    if (j) {
                        G = j[0];
                        H = j[1];
                        E = j[2];
                        F = j[3]
                    } else {
                        o = p(a, b, -l);
                        a = o.x;
                        b = o.y;
                        o = p(h, i, -l);
                        h = o.x;
                        i = o.y;
                        var q = y.cos(D / 180 * e)
                            , r = y.sin(D / 180 * e)
                            , t = (a - h) / 2
                            , u = (b - i) / 2
                            , x = t * t / (c * c) + u * u / (d * d);
                        if (x > 1) {
                            x = y.sqrt(x);
                            c = x * c;
                            d = x * d
                        }
                        var z = c * c
                            , A = d * d
                            , C = (f == g ? -1 : 1) * y.sqrt(B((z * A - z * u * u - A * t * t) / (z * u * u + A * t * t)))
                            , E = C * c * u / d + (a + h) / 2
                            , F = C * -d * t / c + (b + i) / 2
                            , G = y.asin(((b - F) / d).toFixed(9))
                            , H = y.asin(((i - F) / d).toFixed(9));
                        G = a < E ? D - G : G;
                        H = h < E ? D - H : H;
                        G < 0 && (G = D * 2 + G);
                        H < 0 && (H = D * 2 + H);
                        g && G > H && (G = G - D * 2);
                        !g && H > G && (H = H - D * 2)
                    }
                    var I = H - G;
                    if (B(I) > k) {
                        var J = H
                            , K = h
                            , L = i;
                        H = G + k * (g && H > G ? 1 : -1);
                        h = E + c * y.cos(H);
                        i = F + d * y.sin(H);
                        m = bt(h, i, c, d, e, 0, g, K, L, [H, J, E, F])
                    }
                    I = H - G;
                    var M = y.cos(G)
                        , N = y.sin(G)
                        , O = y.cos(H)
                        , P = y.sin(H)
                        , Q = y.tan(I / 4)
                        , R = 4 / 3 * c * Q
                        , S = 4 / 3 * d * Q
                        , T = [a, b]
                        , U = [a + R * N, b - S * M]
                        , V = [h + R * P, i - S * O]
                        , W = [h, i];
                    U[0] = 2 * T[0] - U[0];
                    U[1] = 2 * T[1] - U[1];
                    {
                        if (j)
                            return [U, V, W][n](m);
                        m = [U, V, W][n](m)[v]()[s](",");
                        var X = [];
                        for (var Y = 0, Z = m[w]; Y < Z; Y++)
                            X[Y] = Y % 2 ? p(m[Y - 1], m[Y], l).y : p(m[Y], m[Y + 1], l).x;
                        return X
                    }
                }
                , bu = function (a, b, c, d, e, f, g, h, i) {
                    var j = 1 - i;
                    return {
                        x: C(j, 3) * a + C(j, 2) * 3 * i * c + j * 3 * i * i * e + C(i, 3) * g,
                        y: C(j, 3) * b + C(j, 2) * 3 * i * d + j * 3 * i * i * f + C(i, 3) * h
                    }
                }
                , bv = bm(function (a, b, c, d, e, f, g, h) {
                    var i = e - 2 * c + a - (g - 2 * e + c), j = 2 * (c - a) - 2 * (e - c), k = a - c, l = (-j + y.sqrt(j * j - 4 * i * k)) / 2 / i, n = (-j - y.sqrt(j * j - 4 * i * k)) / 2 / i, o = [b, h], p = [a, g], q;
                    B(l) > "1e12" && (l = 0.5);
                    B(n) > "1e12" && (n = 0.5);
                    if (l > 0 && l < 1) {
                        q = bu(a, b, c, d, e, f, g, h, l);
                        p[L](q.x);
                        o[L](q.y)
                    }
                    if (n > 0 && n < 1) {
                        q = bu(a, b, c, d, e, f, g, h, n);
                        p[L](q.x);
                        o[L](q.y)
                    }
                    i = f - 2 * d + b - (h - 2 * f + d);
                    j = 2 * (d - b) - 2 * (f - d);
                    k = b - d;
                    l = (-j + y.sqrt(j * j - 4 * i * k)) / 2 / i;
                    n = (-j - y.sqrt(j * j - 4 * i * k)) / 2 / i;
                    B(l) > "1e12" && (l = 0.5);
                    B(n) > "1e12" && (n = 0.5);
                    if (l > 0 && l < 1) {
                        q = bu(a, b, c, d, e, f, g, h, l);
                        p[L](q.x);
                        o[L](q.y)
                    }
                    if (n > 0 && n < 1) {
                        q = bu(a, b, c, d, e, f, g, h, n);
                        p[L](q.x);
                        o[L](q.y)
                    }
                    return {
                        min: {
                            x: A[m](0, p),
                            y: A[m](0, o)
                        },
                        max: {
                            x: z[m](0, p),
                            y: z[m](0, o)
                        }
                    }
                })
                , bw = bm(function (a, b) {
                    var c = bq(a)
                        , d = b && bq(b)
                        , e = {
                            x: 0,
                            y: 0,
                            bx: 0,
                            by: 0,
                            X: 0,
                            Y: 0,
                            qx: null,
                            qy: null
                        }
                        , f = {
                            x: 0,
                            y: 0,
                            bx: 0,
                            by: 0,
                            X: 0,
                            Y: 0,
                            qx: null,
                            qy: null
                        }
                        , g = function (a, b) {
                            var c, d;
                            if (!a)
                                return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
                            !(a[0] in {
                                T: 1,
                                Q: 1
                            }) && (b.qx = b.qy = null);
                            switch (a[0]) {
                                case "M":
                                    b.X = a[1];
                                    b.Y = a[2];
                                    break;
                                case "A":
                                    a = ["C"][n](bt[m](0, [b.x, b.y][n](a.slice(1))));
                                    break;
                                case "S":
                                    c = b.x + (b.x - (b.bx || b.x));
                                    d = b.y + (b.y - (b.by || b.y));
                                    a = ["C", c, d][n](a.slice(1));
                                    break;
                                case "T":
                                    b.qx = b.x + (b.x - (b.qx || b.x));
                                    b.qy = b.y + (b.y - (b.qy || b.y));
                                    a = ["C"][n](bs(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                                    break;
                                case "Q":
                                    b.qx = a[1];
                                    b.qy = a[2];
                                    a = ["C"][n](bs(b.x, b.y, a[1], a[2], a[3], a[4]));
                                    break;
                                case "L":
                                    a = ["C"][n](br(b.x, b.y, a[1], a[2]));
                                    break;
                                case "H":
                                    a = ["C"][n](br(b.x, b.y, a[1], b.y));
                                    break;
                                case "V":
                                    a = ["C"][n](br(b.x, b.y, b.x, a[1]));
                                    break;
                                case "Z":
                                    a = ["C"][n](br(b.x, b.y, b.X, b.Y));
                                    break
                            }
                            return a
                        }
                        , h = function (a, b) {
                            if (a[b][w] > 7) {
                                a[b].shift();
                                var e = a[b];
                                while (e[w])
                                    a.splice(b++, 0, ["C"][n](e.splice(0, 6)));
                                a.splice(b, 1);
                                k = z(c[w], d && d[w] || 0)
                            }
                        }
                        , i = function (a, b, e, f, g) {
                            if (a && b && a[g][0] == "M" && b[g][0] != "M") {
                                b.splice(g, 0, ["M", f.x, f.y]);
                                e.bx = 0;
                                e.by = 0;
                                e.x = a[g][1];
                                e.y = a[g][2];
                                k = z(c[w], d && d[w] || 0)
                            }
                        };
                    for (var j = 0, k = z(c[w], d && d[w] || 0); j < k; j++) {
                        c[j] = g(c[j], e);
                        h(c, j);
                        d && (d[j] = g(d[j], f));
                        d && h(d, j);
                        i(c, d, e, f, j);
                        i(d, c, f, e, j);
                        var l = c[j]
                            , o = d && d[j]
                            , p = l[w]
                            , q = d && o[w];
                        e.x = l[p - 2];
                        e.y = l[p - 1];
                        e.bx = S(l[p - 4]) || e.x;
                        e.by = S(l[p - 3]) || e.y;
                        f.bx = d && (S(o[q - 4]) || f.x);
                        f.by = d && (S(o[q - 3]) || f.y);
                        f.x = d && o[q - 2];
                        f.y = d && o[q - 1]
                    }
                    return d ? [c, d] : c
                }, null, bo)
                , bx = bm(function (b) {
                    var c = [];
                    for (var d = 0, e = b[w]; d < e; d++) {
                        var f = {}
                            , g = b[d].match(/^([^:]*):?([\d\.]*)/);
                        f.color = a.getRGB(g[1]);
                        if (f.color.error)
                            return null;
                        f.color = f.color.hex;
                        g[2] && (f.offset = g[2] + "%");
                        c[L](f)
                    }
                    for (d = 1,
                        e = c[w] - 1; d < e; d++) {
                        if (!c[d].offset) {
                            var h = S(c[d - 1].offset || 0)
                                , i = 0;
                            for (var j = d + 1; j < e; j++) {
                                if (c[j].offset) {
                                    i = c[j].offset;
                                    break
                                }
                            }
                            if (!i) {
                                i = 100;
                                j = e
                            }
                            i = S(i);
                            var k = (i - h) / (j - d + 1);
                            for (; d < j; d++) {
                                h += k;
                                c[d].offset = h + "%"
                            }
                        }
                    }
                    return c
                })
                , by = function (b, c, d, e) {
                    var f;
                    if (a.is(b, F) || a.is(b, "object")) {
                        f = a.is(b, F) ? g.getElementById(b) : b;
                        if (f.tagName)
                            return c == null ? {
                                container: f,
                                width: f.style.pixelWidth || f.offsetWidth,
                                height: f.style.pixelHeight || f.offsetHeight
                            } : {
                                container: f,
                                width: c,
                                height: d
                            }
                    } else
                        return {
                            container: 1,
                            x: b,
                            y: c,
                            width: d,
                            height: e
                        }
                }
                , bz = function (a, b) {
                    var c = this;
                    for (var d in b) {
                        if (b[f](d) && !(d in a))
                            switch (typeof b[d]) {
                                case "function":
                                    (function (b) {
                                        a[d] = a === c ? b : function () {
                                            return b[m](c, arguments)
                                        }
                                    }
                                    )(b[d]);
                                    break;
                                case "object":
                                    a[d] = a[d] || {};
                                    bz.call(this, a[d], b[d]);
                                    break;
                                default:
                                    a[d] = b[d];
                                    break
                            }
                    }
                }
                , bA = function (a, b) {
                    a == b.top && (b.top = a.prev);
                    a == b.bottom && (b.bottom = a.next);
                    a.next && (a.next.prev = a.prev);
                    a.prev && (a.prev.next = a.next)
                }
                , bB = function (a, b) {
                    if (b.top === a)
                        return;
                    bA(a, b);
                    a.next = null;
                    a.prev = b.top;
                    b.top.next = a;
                    b.top = a
                }
                , bC = function (a, b) {
                    if (b.bottom === a)
                        return;
                    bA(a, b);
                    a.next = b.bottom;
                    a.prev = null;
                    b.bottom.prev = a;
                    b.bottom = a
                }
                , bD = function (a, b, c) {
                    bA(a, c);
                    b == c.top && (c.top = a);
                    b.next && (b.next.prev = a);
                    a.next = b.next;
                    a.prev = b;
                    b.next = a
                }
                , bE = function (a, b, c) {
                    bA(a, c);
                    b == c.bottom && (c.bottom = a);
                    b.prev && (b.prev.next = a);
                    a.prev = b.prev;
                    b.prev = a;
                    a.next = b
                }
                , bF = function (a) {
                    return function () {
                        throw new Error("Raphaël: you are calling to method “" + a + "” of removed object")
                    }
                };
            a.pathToRelative = bp;
            if (a.svg) {
                k.svgns = "http://www.w3.org/2000/svg";
                k.xlink = "http://www.w3.org/1999/xlink";
                Q = function (a) {
                    return +a + (~(~a) === a) * 0.5
                }
                    ;
                var bG = function (a, b) {
                    if (b)
                        for (var c in b)
                            b[f](c) && a[R](c, r(b[c]));
                    else {
                        a = g.createElementNS(k.svgns, a);
                        a.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
                        return a
                    }
                };
                a[H] = function () {
                    return "Your browser supports SVG.\nYou are running Raphaël " + this.version
                }
                    ;
                var bH = function (a, b) {
                    var c = bG("path");
                    b.canvas && b.canvas[l](c);
                    var d = new bN(c, b);
                    d.type = "path";
                    bK(d, {
                        fill: "none",
                        stroke: "#000",
                        path: a
                    });
                    return d
                }
                    , bI = function (a, b, c) {
                        var d = "linear"
                            , e = 0.5
                            , f = 0.5
                            , h = a.style;
                        b = r(b)[Y](bd, function (a, b, c) {
                            d = "radial";
                            if (b && c) {
                                e = S(b);
                                f = S(c);
                                var g = (f > 0.5) * 2 - 1;
                                C(e - 0.5, 2) + C(f - 0.5, 2) > 0.25 && (f = y.sqrt(0.25 - C(e - 0.5, 2)) * g + 0.5) && f != 0.5 && (f = f.toFixed(5) - 0.00001 * g)
                            }
                            return p
                        });
                        b = b[s](/\s*\-\s*/);
                        if (d == "linear") {
                            var i = b.shift();
                            i = -S(i);
                            if (isNaN(i))
                                return null;
                            var j = [0, 0, y.cos(i * D / 180), y.sin(i * D / 180)]
                                , k = 1 / (z(B(j[2]), B(j[3])) || 1);
                            j[2] *= k;
                            j[3] *= k;
                            if (j[2] < 0) {
                                j[0] = -j[2];
                                j[2] = 0
                            }
                            if (j[3] < 0) {
                                j[1] = -j[3];
                                j[3] = 0
                            }
                        }
                        var m = bx(b);
                        if (!m)
                            return null;
                        var n = a.getAttribute(I);
                        n = n.match(/^url\(#(.*)\)$/);
                        n && c.defs.removeChild(g.getElementById(n[1]));
                        var o = bG(d + "Gradient");
                        o.id = bh();
                        bG(o, d == "radial" ? {
                            fx: e,
                            fy: f
                        } : {
                            x1: j[0],
                            y1: j[1],
                            x2: j[2],
                            y2: j[3]
                        });
                        c.defs[l](o);
                        for (var q = 0, t = m[w]; q < t; q++) {
                            var u = bG("stop");
                            bG(u, {
                                offset: m[q].offset ? m[q].offset : q ? "100%" : "0%",
                                "stop-color": m[q].color || "#fff"
                            });
                            o[l](u)
                        }
                        bG(a, {
                            fill: "url(#" + o.id + ")",
                            opacity: 1,
                            "fill-opacity": 1
                        });
                        h.fill = p;
                        h.opacity = 1;
                        h.fillOpacity = 1;
                        return 1
                    }
                    , bJ = function (b) {
                        var c = b.getBBox();
                        bG(b.pattern, {
                            patternTransform: a.format("translate({0},{1})", c.x, c.y)
                        })
                    }
                    , bK = function (c, d) {
                        var e = {
                            "": [0],
                            none: [0],
                            "-": [3, 1],
                            ".": [1, 1],
                            "-.": [3, 1, 1, 1],
                            "-..": [3, 1, 1, 1, 1, 1],
                            ". ": [1, 3],
                            "- ": [4, 3],
                            "--": [8, 3],
                            "- .": [4, 3, 1, 3],
                            "--.": [8, 3, 1, 3],
                            "--..": [8, 3, 1, 3, 1, 3]
                        }
                            , h = c.node
                            , i = c.attrs
                            , j = c.rotate()
                            , k = function (a, b) {
                                b = e[x.call(b)];
                                if (b) {
                                    var c = a.attrs["stroke-width"] || "1"
                                        , f = ({
                                            round: c,
                                            square: c,
                                            butt: 0
                                        })[a.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0
                                        , g = []
                                        , i = b[w];
                                    while (i--)
                                        g[i] = b[i] * c + (i % 2 ? 1 : -1) * f;
                                    bG(h, {
                                        "stroke-dasharray": g[v](",")
                                    })
                                }
                            };
                        d[f]("rotation") && (j = d.rotation);
                        var m = r(j)[s](b);
                        if (m.length - 1) {
                            m[1] = +m[1];
                            m[2] = +m[2]
                        } else
                            m = null;
                        S(j) && c.rotate(0, true);
                        for (var n in d) {
                            if (d[f](n)) {
                                if (!W[f](n))
                                    continue;
                                var o = d[n];
                                i[n] = o;
                                switch (n) {
                                    case "blur":
                                        c.blur(o);
                                        break;
                                    case "rotation":
                                        c.rotate(o, true);
                                        break;
                                    case "href":
                                    case "title":
                                    case "target":
                                        var t = h.parentNode;
                                        if (x.call(t.tagName) != "a") {
                                            var u = bG("a");
                                            t.insertBefore(u, h);
                                            u[l](h);
                                            t = u
                                        }
                                        n == "target" && o == "blank" ? t.setAttributeNS(c.paper.xlink, "show", "new") : t.setAttributeNS(c.paper.xlink, n, o);
                                        break;
                                    case "cursor":
                                        h.style.cursor = o;
                                        break;
                                    case "clip-rect":
                                        var y = r(o)[s](b);
                                        if (y[w] == 4) {
                                            c.clip && c.clip.parentNode.parentNode.removeChild(c.clip.parentNode);
                                            var z = bG("clipPath")
                                                , A = bG("rect");
                                            z.id = bh();
                                            bG(A, {
                                                x: y[0],
                                                y: y[1],
                                                width: y[2],
                                                height: y[3]
                                            });
                                            z[l](A);
                                            c.paper.defs[l](z);
                                            bG(h, {
                                                "clip-path": "url(#" + z.id + ")"
                                            });
                                            c.clip = A
                                        }
                                        if (!o) {
                                            var B = g.getElementById(h.getAttribute("clip-path")[Y](/(^url\(#|\)$)/g, p));
                                            B && B.parentNode.removeChild(B);
                                            bG(h, {
                                                "clip-path": p
                                            });
                                            delete c.clip
                                        }
                                        break;
                                    case "path":
                                        c.type == "path" && bG(h, {
                                            d: o ? i.path = bq(o) : "M0,0"
                                        });
                                        break;
                                    case "width":
                                        h[R](n, o);
                                        if (i.fx) {
                                            n = "x";
                                            o = i.x
                                        } else
                                            break;
                                    case "x":
                                        i.fx && (o = -i.x - (i.width || 0));
                                    case "rx":
                                        if (n == "rx" && c.type == "rect")
                                            break;
                                    case "cx":
                                        m && (n == "x" || n == "cx") && (m[1] += o - i[n]);
                                        h[R](n, o);
                                        c.pattern && bJ(c);
                                        break;
                                    case "height":
                                        h[R](n, o);
                                        if (i.fy) {
                                            n = "y";
                                            o = i.y
                                        } else
                                            break;
                                    case "y":
                                        i.fy && (o = -i.y - (i.height || 0));
                                    case "ry":
                                        if (n == "ry" && c.type == "rect")
                                            break;
                                    case "cy":
                                        m && (n == "y" || n == "cy") && (m[2] += o - i[n]);
                                        h[R](n, o);
                                        c.pattern && bJ(c);
                                        break;
                                    case "r":
                                        c.type == "rect" ? bG(h, {
                                            rx: o,
                                            ry: o
                                        }) : h[R](n, o);
                                        break;
                                    case "src":
                                        c.type == "image" && h.setAttributeNS(c.paper.xlink, "href", o);
                                        break;
                                    case "stroke-width":
                                        h.style.strokeWidth = o;
                                        h[R](n, o);
                                        i["stroke-dasharray"] && k(c, i["stroke-dasharray"]);
                                        break;
                                    case "stroke-dasharray":
                                        k(c, o);
                                        break;
                                    case "translation":
                                        var C = r(o)[s](b);
                                        C[0] = +C[0] || 0;
                                        C[1] = +C[1] || 0;
                                        if (m) {
                                            m[1] += C[0];
                                            m[2] += C[1]
                                        }
                                        cz.call(c, C[0], C[1]);
                                        break;
                                    case "scale":
                                        C = r(o)[s](b);
                                        c.scale(+C[0] || 1, +C[1] || +C[0] || 1, isNaN(S(C[2])) ? null : +C[2], isNaN(S(C[3])) ? null : +C[3]);
                                        break;
                                    case I:
                                        var D = r(o).match(M);
                                        if (D) {
                                            z = bG("pattern");
                                            var E = bG("image");
                                            z.id = bh();
                                            bG(z, {
                                                x: 0,
                                                y: 0,
                                                patternUnits: "userSpaceOnUse",
                                                height: 1,
                                                width: 1
                                            });
                                            bG(E, {
                                                x: 0,
                                                y: 0
                                            });
                                            E.setAttributeNS(c.paper.xlink, "href", D[1]);
                                            z[l](E);
                                            var F = g.createElement("img");
                                            F.style.cssText = "position:absolute;left:-9999em;top-9999em";
                                            F.onload = function () {
                                                bG(z, {
                                                    width: this.offsetWidth,
                                                    height: this.offsetHeight
                                                });
                                                bG(E, {
                                                    width: this.offsetWidth,
                                                    height: this.offsetHeight
                                                });
                                                g.body.removeChild(this);
                                                c.paper.safari()
                                            }
                                                ;
                                            g.body[l](F);
                                            F.src = D[1];
                                            c.paper.defs[l](z);
                                            h.style.fill = "url(#" + z.id + ")";
                                            bG(h, {
                                                fill: "url(#" + z.id + ")"
                                            });
                                            c.pattern = z;
                                            c.pattern && bJ(c);
                                            break
                                        }
                                        var G = a.getRGB(o);
                                        if (G.error)
                                            if ((({
                                                circle: 1,
                                                ellipse: 1
                                            })[f](c.type) || r(o).charAt() != "r") && bI(h, o, c.paper)) {
                                                i.gradient = o;
                                                i.fill = "none";
                                                break
                                            } else {
                                                delete d.gradient;
                                                delete i.gradient;
                                                !a.is(i.opacity, "undefined") && a.is(d.opacity, "undefined") && bG(h, {
                                                    opacity: i.opacity
                                                });
                                                !a.is(i["fill-opacity"], "undefined") && a.is(d["fill-opacity"], "undefined") && bG(h, {
                                                    "fill-opacity": i["fill-opacity"]
                                                })
                                            }
                                        G[f]("opacity") && bG(h, {
                                            "fill-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
                                        });
                                    case "stroke":
                                        G = a.getRGB(o);
                                        h[R](n, G.hex);
                                        n == "stroke" && G[f]("opacity") && bG(h, {
                                            "stroke-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
                                        });
                                        break;
                                    case "gradient":
                                        (({
                                            circle: 1,
                                            ellipse: 1
                                        })[f](c.type) || r(o).charAt() != "r") && bI(h, o, c.paper);
                                        break;
                                    case "opacity":
                                        i.gradient && !i[f]("stroke-opacity") && bG(h, {
                                            "stroke-opacity": o > 1 ? o / 100 : o
                                        });
                                    case "fill-opacity":
                                        if (i.gradient) {
                                            var H = g.getElementById(h.getAttribute(I)[Y](/^url\(#|\)$/g, p));
                                            if (H) {
                                                var J = H.getElementsByTagName("stop");
                                                J[J[w] - 1][R]("stop-opacity", o)
                                            }
                                            break
                                        }
                                    default:
                                        n == "font-size" && (o = T(o, 10) + "px");
                                        var K = n[Y](/(\-.)/g, function (a) {
                                            return V.call(a.substring(1))
                                        });
                                        h.style[K] = o;
                                        h[R](n, o);
                                        break
                                }
                            }
                        }
                        bM(c, d);
                        m ? c.rotate(m.join(q)) : S(j) && c.rotate(j, true)
                    }
                    , bL = 1.2
                    , bM = function (b, c) {
                        if (b.type != "text" || !(c[f]("text") || c[f]("font") || c[f]("font-size") || c[f]("x") || c[f]("y")))
                            return;
                        var d = b.attrs
                            , e = b.node
                            , h = e.firstChild ? T(g.defaultView.getComputedStyle(e.firstChild, p).getPropertyValue("font-size"), 10) : 10;
                        if (c[f]("text")) {
                            d.text = c.text;
                            while (e.firstChild)
                                e.removeChild(e.firstChild);
                            var i = r(c.text)[s]("\n");
                            for (var j = 0, k = i[w]; j < k; j++)
                                if (i[j]) {
                                    var m = bG("tspan");
                                    j && bG(m, {
                                        dy: h * bL,
                                        x: d.x
                                    });
                                    m[l](g.createTextNode(i[j]));
                                    e[l](m)
                                }
                        } else {
                            i = e.getElementsByTagName("tspan");
                            for (j = 0,
                                k = i[w]; j < k; j++)
                                j && bG(i[j], {
                                    dy: h * bL,
                                    x: d.x
                                })
                        }
                        bG(e, {
                            y: d.y
                        });
                        var n = b.getBBox()
                            , o = d.y - (n.y + n.height / 2);
                        o && a.is(o, "finite") && bG(e, {
                            y: d.y + o
                        })
                    }
                    , bN = function (b, c) {
                        var d = 0
                            , e = 0;
                        this[0] = b;
                        this.id = a._oid++;
                        this.node = b;
                        b.raphael = this;
                        this.paper = c;
                        this.attrs = this.attrs || {};
                        this.transformations = [];
                        this._ = {
                            tx: 0,
                            ty: 0,
                            rt: {
                                deg: 0,
                                cx: 0,
                                cy: 0
                            },
                            sx: 1,
                            sy: 1
                        };
                        !c.bottom && (c.bottom = this);
                        this.prev = c.top;
                        c.top && (c.top.next = this);
                        c.top = this;
                        this.next = null
                    }
                    , bO = bN[e];
                bN[e].rotate = function (c, d, e) {
                    if (this.removed)
                        return this;
                    if (c == null) {
                        if (this._.rt.cx)
                            return [this._.rt.deg, this._.rt.cx, this._.rt.cy][v](q);
                        return this._.rt.deg
                    }
                    var f = this.getBBox();
                    c = r(c)[s](b);
                    if (c[w] - 1) {
                        d = S(c[1]);
                        e = S(c[2])
                    }
                    c = S(c[0]);
                    d != null && d !== false ? this._.rt.deg = c : this._.rt.deg += c;
                    e == null && (d = null);
                    this._.rt.cx = d;
                    this._.rt.cy = e;
                    d = d == null ? f.x + f.width / 2 : d;
                    e = e == null ? f.y + f.height / 2 : e;
                    if (this._.rt.deg) {
                        this.transformations[0] = a.format("rotate({0} {1} {2})", this._.rt.deg, d, e);
                        this.clip && bG(this.clip, {
                            transform: a.format("rotate({0} {1} {2})", -this._.rt.deg, d, e)
                        })
                    } else {
                        this.transformations[0] = p;
                        this.clip && bG(this.clip, {
                            transform: p
                        })
                    }
                    bG(this.node, {
                        transform: this.transformations[v](q)
                    });
                    return this
                }
                    ;
                bN[e].hide = function () {
                    !this.removed && (this.node.style.display = "none");
                    return this
                }
                    ;
                bN[e].show = function () {
                    !this.removed && (this.node.style.display = "");
                    return this
                }
                    ;
                bN[e].remove = function () {
                    if (this.removed)
                        return;
                    bA(this, this.paper);
                    this.node.parentNode.removeChild(this.node);
                    for (var a in this)
                        delete this[a];
                    this.removed = true
                }
                    ;
                bN[e].getBBox = function () {
                    if (this.removed)
                        return this;
                    if (this.type == "path")
                        return bn(this.attrs.path);
                    if (this.node.style.display == "none") {
                        this.show();
                        var a = true
                    }
                    var b = {};
                    try {
                        b = this.node.getBBox()
                    } catch (a) { } finally {
                        b = b || {}
                    }
                    if (this.type == "text") {
                        b = {
                            x: b.x,
                            y: Infinity,
                            width: 0,
                            height: 0
                        };
                        for (var c = 0, d = this.node.getNumberOfChars(); c < d; c++) {
                            var e = this.node.getExtentOfChar(c);
                            e.y < b.y && (b.y = e.y);
                            e.y + e.height - b.y > b.height && (b.height = e.y + e.height - b.y);
                            e.x + e.width - b.x > b.width && (b.width = e.x + e.width - b.x)
                        }
                    }
                    a && this.hide();
                    return b
                }
                    ;
                bN[e].attr = function (b, c) {
                    if (this.removed)
                        return this;
                    if (b == null) {
                        var d = {};
                        for (var e in this.attrs)
                            this.attrs[f](e) && (d[e] = this.attrs[e]);
                        this._.rt.deg && (d.rotation = this.rotate());
                        (this._.sx != 1 || this._.sy != 1) && (d.scale = this.scale());
                        d.gradient && d.fill == "none" && (d.fill = d.gradient) && delete d.gradient;
                        return d
                    }
                    if (c == null && a.is(b, F)) {
                        if (b == "translation")
                            return cz.call(this);
                        if (b == "rotation")
                            return this.rotate();
                        if (b == "scale")
                            return this.scale();
                        if (b == I && this.attrs.fill == "none" && this.attrs.gradient)
                            return this.attrs.gradient;
                        return this.attrs[b]
                    }
                    if (c == null && a.is(b, G)) {
                        var g = {};
                        for (var h = 0, i = b.length; h < i; h++)
                            g[b[h]] = this.attr(b[h]);
                        return g
                    }
                    if (c != null) {
                        var j = {};
                        j[b] = c
                    } else
                        b != null && a.is(b, "object") && (j = b);
                    for (var k in this.paper.customAttributes)
                        if (this.paper.customAttributes[f](k) && j[f](k) && a.is(this.paper.customAttributes[k], "function")) {
                            var l = this.paper.customAttributes[k].apply(this, [][n](j[k]));
                            this.attrs[k] = j[k];
                            for (var m in l)
                                l[f](m) && (j[m] = l[m])
                        }
                    bK(this, j);
                    return this
                }
                    ;
                bN[e].toFront = function () {
                    if (this.removed)
                        return this;
                    this.node.parentNode[l](this.node);
                    var a = this.paper;
                    a.top != this && bB(this, a);
                    return this
                }
                    ;
                bN[e].toBack = function () {
                    if (this.removed)
                        return this;
                    if (this.node.parentNode.firstChild != this.node) {
                        this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                        bC(this, this.paper);
                        var a = this.paper
                    }
                    return this
                }
                    ;
                bN[e].insertAfter = function (a) {
                    if (this.removed)
                        return this;
                    var b = a.node || a[a.length - 1].node;
                    b.nextSibling ? b.parentNode.insertBefore(this.node, b.nextSibling) : b.parentNode[l](this.node);
                    bD(this, a, this.paper);
                    return this
                }
                    ;
                bN[e].insertBefore = function (a) {
                    if (this.removed)
                        return this;
                    var b = a.node || a[0].node;
                    b.parentNode.insertBefore(this.node, b);
                    bE(this, a, this.paper);
                    return this
                }
                    ;
                bN[e].blur = function (a) {
                    var b = this;
                    if (+a !== 0) {
                        var c = bG("filter")
                            , d = bG("feGaussianBlur");
                        b.attrs.blur = a;
                        c.id = bh();
                        bG(d, {
                            stdDeviation: +a || 1.5
                        });
                        c.appendChild(d);
                        b.paper.defs.appendChild(c);
                        b._blur = c;
                        bG(b.node, {
                            filter: "url(#" + c.id + ")"
                        })
                    } else {
                        if (b._blur) {
                            b._blur.parentNode.removeChild(b._blur);
                            delete b._blur;
                            delete b.attrs.blur
                        }
                        b.node.removeAttribute("filter")
                    }
                }
                    ;
                var bP = function (a, b, c, d) {
                    var e = bG("circle");
                    a.canvas && a.canvas[l](e);
                    var f = new bN(e, a);
                    f.attrs = {
                        cx: b,
                        cy: c,
                        r: d,
                        fill: "none",
                        stroke: "#000"
                    };
                    f.type = "circle";
                    bG(e, f.attrs);
                    return f
                }
                    , bQ = function (a, b, c, d, e, f) {
                        var g = bG("rect");
                        a.canvas && a.canvas[l](g);
                        var h = new bN(g, a);
                        h.attrs = {
                            x: b,
                            y: c,
                            width: d,
                            height: e,
                            r: f || 0,
                            rx: f || 0,
                            ry: f || 0,
                            fill: "none",
                            stroke: "#000"
                        };
                        h.type = "rect";
                        bG(g, h.attrs);
                        return h
                    }
                    , bR = function (a, b, c, d, e) {
                        var f = bG("ellipse");
                        a.canvas && a.canvas[l](f);
                        var g = new bN(f, a);
                        g.attrs = {
                            cx: b,
                            cy: c,
                            rx: d,
                            ry: e,
                            fill: "none",
                            stroke: "#000"
                        };
                        g.type = "ellipse";
                        bG(f, g.attrs);
                        return g
                    }
                    , bS = function (a, b, c, d, e, f) {
                        var g = bG("image");
                        bG(g, {
                            x: c,
                            y: d,
                            width: e,
                            height: f,
                            preserveAspectRatio: "none"
                        });
                        g.setAttributeNS(a.xlink, "href", b);
                        a.canvas && a.canvas[l](g);
                        var h = new bN(g, a);
                        h.attrs = {
                            x: c,
                            y: d,
                            width: e,
                            height: f,
                            src: b
                        };
                        h.type = "image";
                        return h
                    }
                    , bT = function (a, b, c, d) {
                        var e = bG("text");
                        bG(e, {
                            x: b,
                            y: c,
                            "text-anchor": "middle"
                        });
                        a.canvas && a.canvas[l](e);
                        var f = new bN(e, a);
                        f.attrs = {
                            x: b,
                            y: c,
                            "text-anchor": "middle",
                            text: d,
                            font: W.font,
                            stroke: "none",
                            fill: "#000"
                        };
                        f.type = "text";
                        bK(f, f.attrs);
                        return f
                    }
                    , bU = function (a, b) {
                        this.width = a || this.width;
                        this.height = b || this.height;
                        this.canvas[R]("width", this.width);
                        this.canvas[R]("height", this.height);
                        return this
                    }
                    , bV = function () {
                        var b = by[m](0, arguments)
                            , c = b && b.container
                            , d = b.x
                            , e = b.y
                            , f = b.width
                            , h = b.height;
                        if (!c)
                            throw new Error("SVG container not found.");
                        var i = bG("svg");
                        d = d || 0;
                        e = e || 0;
                        f = f || 512;
                        h = h || 342;
                        bG(i, {
                            xmlns: "http://www.w3.org/2000/svg",
                            version: 1.1,
                            width: f,
                            height: h
                        });
                        if (c == 1) {
                            i.style.cssText = "position:absolute;left:" + d + "px;top:" + e + "px";
                            g.body[l](i)
                        } else
                            c.firstChild ? c.insertBefore(i, c.firstChild) : c[l](i);
                        c = new j;
                        c.width = f;
                        c.height = h;
                        c.canvas = i;
                        bz.call(c, c, a.fn);
                        c.clear();
                        return c
                    };
                k.clear = function () {
                    var a = this.canvas;
                    while (a.firstChild)
                        a.removeChild(a.firstChild);
                    this.bottom = this.top = null;
                    (this.desc = bG("desc"))[l](g.createTextNode("Created with Raphaël"));
                    a[l](this.desc);
                    a[l](this.defs = bG("defs"))
                }
                    ;
                k.remove = function () {
                    this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                    for (var a in this)
                        this[a] = bF(a)
                }
            }
            if (a.vml) {
                var bW = {
                    M: "m",
                    L: "l",
                    C: "c",
                    Z: "x",
                    m: "t",
                    l: "r",
                    c: "v",
                    z: "x"
                }
                    , bX = /([clmz]),?([^clmz]*)/gi
                    , bY = / progid:\S+Blur\([^\)]+\)/g
                    , bZ = /-?[^,\s-]+/g
                    , b$ = 1000 + q + 1000
                    , b_ = 10
                    , ca = {
                        path: 1,
                        rect: 1
                    }
                    , cb = function (a) {
                        var b = /[ahqstv]/ig
                            , c = bq;
                        r(a).match(b) && (c = bw);
                        b = /[clmz]/g;
                        if (c == bq && !r(a).match(b)) {
                            var d = r(a)[Y](bX, function (a, b, c) {
                                var d = []
                                    , e = x.call(b) == "m"
                                    , f = bW[b];
                                c[Y](bZ, function (a) {
                                    if (e && d[w] == 2) {
                                        f += d + bW[b == "m" ? "l" : "L"];
                                        d = []
                                    }
                                    d[L](Q(a * b_))
                                });
                                return f + d
                            });
                            return d
                        }
                        var e = c(a), f, g;
                        d = [];
                        for (var h = 0, i = e[w]; h < i; h++) {
                            f = e[h];
                            g = x.call(e[h][0]);
                            g == "z" && (g = "x");
                            for (var j = 1, k = f[w]; j < k; j++)
                                g += Q(f[j] * b_) + (j != k - 1 ? "," : p);
                            d[L](g)
                        }
                        return d[v](q)
                    };
                a[H] = function () {
                    return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
                }
                    ;
                bH = function (a, b) {
                    var c = cd("group");
                    c.style.cssText = "position:absolute;left:0;top:0;width:" + b.width + "px;height:" + b.height + "px";
                    c.coordsize = b.coordsize;
                    c.coordorigin = b.coordorigin;
                    var d = cd("shape")
                        , e = d.style;
                    e.width = b.width + "px";
                    e.height = b.height + "px";
                    d.coordsize = b$;
                    d.coordorigin = b.coordorigin;
                    c[l](d);
                    var f = new bN(d, c, b)
                        , g = {
                            fill: "none",
                            stroke: "#000"
                        };
                    a && (g.path = a);
                    f.type = "path";
                    f.path = [];
                    f.Path = p;
                    bK(f, g);
                    b.canvas[l](c);
                    return f
                }
                    ;
                bK = function (c, d) {
                    c.attrs = c.attrs || {};
                    var e = c.node, h = c.attrs, i = e.style, j, k = (d.x != h.x || d.y != h.y || d.width != h.width || d.height != h.height || d.r != h.r) && c.type == "rect", m = c;
                    for (var n in d)
                        d[f](n) && (h[n] = d[n]);
                    if (k) {
                        h.path = cc(h.x, h.y, h.width, h.height, h.r);
                        c.X = h.x;
                        c.Y = h.y;
                        c.W = h.width;
                        c.H = h.height
                    }
                    d.href && (e.href = d.href);
                    d.title && (e.title = d.title);
                    d.target && (e.target = d.target);
                    d.cursor && (i.cursor = d.cursor);
                    "blur" in d && c.blur(d.blur);
                    if (d.path && c.type == "path" || k)
                        e.path = cb(h.path);
                    d.rotation != null && c.rotate(d.rotation, true);
                    if (d.translation) {
                        j = r(d.translation)[s](b);
                        cz.call(c, j[0], j[1]);
                        if (c._.rt.cx != null) {
                            c._.rt.cx += +j[0];
                            c._.rt.cy += +j[1];
                            c.setBox(c.attrs, j[0], j[1])
                        }
                    }
                    if (d.scale) {
                        j = r(d.scale)[s](b);
                        c.scale(+j[0] || 1, +j[1] || +j[0] || 1, +j[2] || null, +j[3] || null)
                    }
                    if ("clip-rect" in d) {
                        var o = r(d["clip-rect"])[s](b);
                        if (o[w] == 4) {
                            o[2] = +o[2] + +o[0];
                            o[3] = +o[3] + +o[1];
                            var q = e.clipRect || g.createElement("div")
                                , t = q.style
                                , u = e.parentNode;
                            t.clip = a.format("rect({1}px {2}px {3}px {0}px)", o);
                            if (!e.clipRect) {
                                t.position = "absolute";
                                t.top = 0;
                                t.left = 0;
                                t.width = c.paper.width + "px";
                                t.height = c.paper.height + "px";
                                u.parentNode.insertBefore(q, u);
                                q[l](u);
                                e.clipRect = q
                            }
                        }
                        d["clip-rect"] || e.clipRect && (e.clipRect.style.clip = p)
                    }
                    c.type == "image" && d.src && (e.src = d.src);
                    if (c.type == "image" && d.opacity) {
                        e.filterOpacity = U + ".Alpha(opacity=" + d.opacity * 100 + ")";
                        i.filter = (e.filterMatrix || p) + (e.filterOpacity || p)
                    }
                    d.font && (i.font = d.font);
                    d["font-family"] && (i.fontFamily = "\"" + d["font-family"][s](",")[0][Y](/^['"]+|['"]+$/g, p) + "\"");
                    d["font-size"] && (i.fontSize = d["font-size"]);
                    d["font-weight"] && (i.fontWeight = d["font-weight"]);
                    d["font-style"] && (i.fontStyle = d["font-style"]);
                    if (d.opacity != null || d["stroke-width"] != null || d.fill != null || d.stroke != null || d["stroke-width"] != null || d["stroke-opacity"] != null || d["fill-opacity"] != null || d["stroke-dasharray"] != null || d["stroke-miterlimit"] != null || d["stroke-linejoin"] != null || d["stroke-linecap"] != null) {
                        e = c.shape || e;
                        var v = e.getElementsByTagName(I) && e.getElementsByTagName(I)[0]
                            , x = false;
                        !v && (x = v = cd(I));
                        if ("fill-opacity" in d || "opacity" in d) {
                            var y = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+a.getRGB(d.fill).o + 1 || 2) - 1);
                            y = A(z(y, 0), 1);
                            v.opacity = y
                        }
                        d.fill && (v.on = true);
                        if (v.on == null || d.fill == "none")
                            v.on = false;
                        if (v.on && d.fill) {
                            var B = d.fill.match(M);
                            if (B) {
                                v.src = B[1];
                                v.type = "tile"
                            } else {
                                v.color = a.getRGB(d.fill).hex;
                                v.src = p;
                                v.type = "solid";
                                if (a.getRGB(d.fill).error && (m.type in {
                                    circle: 1,
                                    ellipse: 1
                                } || r(d.fill).charAt() != "r") && bI(m, d.fill)) {
                                    h.fill = "none";
                                    h.gradient = d.fill
                                }
                            }
                        }
                        x && e[l](v);
                        var C = e.getElementsByTagName("stroke") && e.getElementsByTagName("stroke")[0]
                            , D = false;
                        !C && (D = C = cd("stroke"));
                        if (d.stroke && d.stroke != "none" || d["stroke-width"] || d["stroke-opacity"] != null || d["stroke-dasharray"] || d["stroke-miterlimit"] || d["stroke-linejoin"] || d["stroke-linecap"])
                            C.on = true;
                        (d.stroke == "none" || C.on == null || d.stroke == 0 || d["stroke-width"] == 0) && (C.on = false);
                        var E = a.getRGB(d.stroke);
                        C.on && d.stroke && (C.color = E.hex);
                        y = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+E.o + 1 || 2) - 1);
                        var F = (S(d["stroke-width"]) || 1) * 0.75;
                        y = A(z(y, 0), 1);
                        d["stroke-width"] == null && (F = h["stroke-width"]);
                        d["stroke-width"] && (C.weight = F);
                        F && F < 1 && (y *= F) && (C.weight = 1);
                        C.opacity = y;
                        d["stroke-linejoin"] && (C.joinstyle = d["stroke-linejoin"] || "miter");
                        C.miterlimit = d["stroke-miterlimit"] || 8;
                        d["stroke-linecap"] && (C.endcap = d["stroke-linecap"] == "butt" ? "flat" : d["stroke-linecap"] == "square" ? "square" : "round");
                        if (d["stroke-dasharray"]) {
                            var G = {
                                "-": "shortdash",
                                ".": "shortdot",
                                "-.": "shortdashdot",
                                "-..": "shortdashdotdot",
                                ". ": "dot",
                                "- ": "dash",
                                "--": "longdash",
                                "- .": "dashdot",
                                "--.": "longdashdot",
                                "--..": "longdashdotdot"
                            };
                            C.dashstyle = G[f](d["stroke-dasharray"]) ? G[d["stroke-dasharray"]] : p
                        }
                        D && e[l](C)
                    }
                    if (m.type == "text") {
                        i = m.paper.span.style;
                        h.font && (i.font = h.font);
                        h["font-family"] && (i.fontFamily = h["font-family"]);
                        h["font-size"] && (i.fontSize = h["font-size"]);
                        h["font-weight"] && (i.fontWeight = h["font-weight"]);
                        h["font-style"] && (i.fontStyle = h["font-style"]);
                        m.node.string && (m.paper.span.innerHTML = r(m.node.string)[Y](/</g, "&#60;")[Y](/&/g, "&#38;")[Y](/\n/g, "<br>"));
                        m.W = h.w = m.paper.span.offsetWidth;
                        m.H = h.h = m.paper.span.offsetHeight;
                        m.X = h.x;
                        m.Y = h.y + Q(m.H / 2);
                        switch (h["text-anchor"]) {
                            case "start":
                                m.node.style["v-text-align"] = "left";
                                m.bbx = Q(m.W / 2);
                                break;
                            case "end":
                                m.node.style["v-text-align"] = "right";
                                m.bbx = -Q(m.W / 2);
                                break;
                            default:
                                m.node.style["v-text-align"] = "center";
                                break
                        }
                    }
                }
                    ;
                bI = function (a, b) {
                    a.attrs = a.attrs || {};
                    var c = a.attrs, d, e = "linear", f = ".5 .5";
                    a.attrs.gradient = b;
                    b = r(b)[Y](bd, function (a, b, c) {
                        e = "radial";
                        if (b && c) {
                            b = S(b);
                            c = S(c);
                            C(b - 0.5, 2) + C(c - 0.5, 2) > 0.25 && (c = y.sqrt(0.25 - C(b - 0.5, 2)) * ((c > 0.5) * 2 - 1) + 0.5);
                            f = b + q + c
                        }
                        return p
                    });
                    b = b[s](/\s*\-\s*/);
                    if (e == "linear") {
                        var g = b.shift();
                        g = -S(g);
                        if (isNaN(g))
                            return null
                    }
                    var h = bx(b);
                    if (!h)
                        return null;
                    a = a.shape || a.node;
                    d = a.getElementsByTagName(I)[0] || cd(I);
                    !d.parentNode && a.appendChild(d);
                    if (h[w]) {
                        d.on = true;
                        d.method = "none";
                        d.color = h[0].color;
                        d.color2 = h[h[w] - 1].color;
                        var i = [];
                        for (var j = 0, k = h[w]; j < k; j++)
                            h[j].offset && i[L](h[j].offset + q + h[j].color);
                        d.colors && (d.colors.value = i[w] ? i[v]() : "0% " + d.color);
                        if (e == "radial") {
                            d.type = "gradientradial";
                            d.focus = "100%";
                            d.focussize = f;
                            d.focusposition = f
                        } else {
                            d.type = "gradient";
                            d.angle = (270 - g) % 360
                        }
                    }
                    return 1
                }
                    ;
                bN = function (b, c, d) {
                    var e = 0
                        , f = 0
                        , g = 0
                        , h = 1;
                    this[0] = b;
                    this.id = a._oid++;
                    this.node = b;
                    b.raphael = this;
                    this.X = 0;
                    this.Y = 0;
                    this.attrs = {};
                    this.Group = c;
                    this.paper = d;
                    this._ = {
                        tx: 0,
                        ty: 0,
                        rt: {
                            deg: 0
                        },
                        sx: 1,
                        sy: 1
                    };
                    !d.bottom && (d.bottom = this);
                    this.prev = d.top;
                    d.top && (d.top.next = this);
                    d.top = this;
                    this.next = null
                }
                    ;
                bO = bN[e];
                bO.rotate = function (a, c, d) {
                    if (this.removed)
                        return this;
                    if (a == null) {
                        if (this._.rt.cx)
                            return [this._.rt.deg, this._.rt.cx, this._.rt.cy][v](q);
                        return this._.rt.deg
                    }
                    a = r(a)[s](b);
                    if (a[w] - 1) {
                        c = S(a[1]);
                        d = S(a[2])
                    }
                    a = S(a[0]);
                    c != null ? this._.rt.deg = a : this._.rt.deg += a;
                    d == null && (c = null);
                    this._.rt.cx = c;
                    this._.rt.cy = d;
                    this.setBox(this.attrs, c, d);
                    this.Group.style.rotation = this._.rt.deg;
                    return this
                }
                    ;
                bO.setBox = function (a, b, c) {
                    if (this.removed)
                        return this;
                    var d = this.Group.style
                        , e = this.shape && this.shape.style || this.node.style;
                    a = a || {};
                    for (var g in a)
                        a[f](g) && (this.attrs[g] = a[g]);
                    b = b || this._.rt.cx;
                    c = c || this._.rt.cy;
                    var h = this.attrs, i, j, k, l;
                    switch (this.type) {
                        case "circle":
                            i = h.cx - h.r;
                            j = h.cy - h.r;
                            k = l = h.r * 2;
                            break;
                        case "ellipse":
                            i = h.cx - h.rx;
                            j = h.cy - h.ry;
                            k = h.rx * 2;
                            l = h.ry * 2;
                            break;
                        case "image":
                            i = +h.x;
                            j = +h.y;
                            k = h.width || 0;
                            l = h.height || 0;
                            break;
                        case "text":
                            this.textpath.v = ["m", Q(h.x), ", ", Q(h.y - 2), "l", Q(h.x) + 1, ", ", Q(h.y - 2)][v](p);
                            i = h.x - Q(this.W / 2);
                            j = h.y - this.H / 2;
                            k = this.W;
                            l = this.H;
                            break;
                        case "rect":
                        case "path":
                            if (this.attrs.path) {
                                var m = bn(this.attrs.path);
                                i = m.x;
                                j = m.y;
                                k = m.width;
                                l = m.height
                            } else {
                                i = 0;
                                j = 0;
                                k = this.paper.width;
                                l = this.paper.height
                            }
                            break;
                        default:
                            i = 0;
                            j = 0;
                            k = this.paper.width;
                            l = this.paper.height;
                            break
                    }
                    b = b == null ? i + k / 2 : b;
                    c = c == null ? j + l / 2 : c;
                    var n = b - this.paper.width / 2, o = c - this.paper.height / 2, q;
                    d.left != (q = n + "px") && (d.left = q);
                    d.top != (q = o + "px") && (d.top = q);
                    this.X = ca[f](this.type) ? -n : i;
                    this.Y = ca[f](this.type) ? -o : j;
                    this.W = k;
                    this.H = l;
                    if (ca[f](this.type)) {
                        e.left != (q = -n * b_ + "px") && (e.left = q);
                        e.top != (q = -o * b_ + "px") && (e.top = q)
                    } else if (this.type == "text") {
                        e.left != (q = -n + "px") && (e.left = q);
                        e.top != (q = -o + "px") && (e.top = q)
                    } else {
                        d.width != (q = this.paper.width + "px") && (d.width = q);
                        d.height != (q = this.paper.height + "px") && (d.height = q);
                        e.left != (q = i - n + "px") && (e.left = q);
                        e.top != (q = j - o + "px") && (e.top = q);
                        e.width != (q = k + "px") && (e.width = q);
                        e.height != (q = l + "px") && (e.height = q)
                    }
                }
                    ;
                bO.hide = function () {
                    !this.removed && (this.Group.style.display = "none");
                    return this
                }
                    ;
                bO.show = function () {
                    !this.removed && (this.Group.style.display = "block");
                    return this
                }
                    ;
                bO.getBBox = function () {
                    if (this.removed)
                        return this;
                    if (ca[f](this.type))
                        return bn(this.attrs.path);
                    return {
                        x: this.X + (this.bbx || 0),
                        y: this.Y,
                        width: this.W,
                        height: this.H
                    }
                }
                    ;
                bO.remove = function () {
                    if (this.removed)
                        return;
                    bA(this, this.paper);
                    this.node.parentNode.removeChild(this.node);
                    this.Group.parentNode.removeChild(this.Group);
                    this.shape && this.shape.parentNode.removeChild(this.shape);
                    for (var a in this)
                        delete this[a];
                    this.removed = true
                }
                    ;
                bO.attr = function (b, c) {
                    if (this.removed)
                        return this;
                    if (b == null) {
                        var d = {};
                        for (var e in this.attrs)
                            this.attrs[f](e) && (d[e] = this.attrs[e]);
                        this._.rt.deg && (d.rotation = this.rotate());
                        (this._.sx != 1 || this._.sy != 1) && (d.scale = this.scale());
                        d.gradient && d.fill == "none" && (d.fill = d.gradient) && delete d.gradient;
                        return d
                    }
                    if (c == null && a.is(b, "string")) {
                        if (b == "translation")
                            return cz.call(this);
                        if (b == "rotation")
                            return this.rotate();
                        if (b == "scale")
                            return this.scale();
                        if (b == I && this.attrs.fill == "none" && this.attrs.gradient)
                            return this.attrs.gradient;
                        return this.attrs[b]
                    }
                    if (this.attrs && c == null && a.is(b, G)) {
                        var g, h = {};
                        for (e = 0,
                            g = b[w]; e < g; e++)
                            h[b[e]] = this.attr(b[e]);
                        return h
                    }
                    var i;
                    if (c != null) {
                        i = {};
                        i[b] = c
                    }
                    c == null && a.is(b, "object") && (i = b);
                    if (i) {
                        for (var j in this.paper.customAttributes)
                            if (this.paper.customAttributes[f](j) && i[f](j) && a.is(this.paper.customAttributes[j], "function")) {
                                var k = this.paper.customAttributes[j].apply(this, [][n](i[j]));
                                this.attrs[j] = i[j];
                                for (var l in k)
                                    k[f](l) && (i[l] = k[l])
                            }
                        i.text && this.type == "text" && (this.node.string = i.text);
                        bK(this, i);
                        i.gradient && (({
                            circle: 1,
                            ellipse: 1
                        })[f](this.type) || r(i.gradient).charAt() != "r") && bI(this, i.gradient);
                        (!ca[f](this.type) || this._.rt.deg) && this.setBox(this.attrs)
                    }
                    return this
                }
                    ;
                bO.toFront = function () {
                    !this.removed && this.Group.parentNode[l](this.Group);
                    this.paper.top != this && bB(this, this.paper);
                    return this
                }
                    ;
                bO.toBack = function () {
                    if (this.removed)
                        return this;
                    if (this.Group.parentNode.firstChild != this.Group) {
                        this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
                        bC(this, this.paper)
                    }
                    return this
                }
                    ;
                bO.insertAfter = function (a) {
                    if (this.removed)
                        return this;
                    a.constructor == cC && (a = a[a.length - 1]);
                    a.Group.nextSibling ? a.Group.parentNode.insertBefore(this.Group, a.Group.nextSibling) : a.Group.parentNode[l](this.Group);
                    bD(this, a, this.paper);
                    return this
                }
                    ;
                bO.insertBefore = function (a) {
                    if (this.removed)
                        return this;
                    a.constructor == cC && (a = a[0]);
                    a.Group.parentNode.insertBefore(this.Group, a.Group);
                    bE(this, a, this.paper);
                    return this
                }
                    ;
                bO.blur = function (b) {
                    var c = this.node.runtimeStyle
                        , d = c.filter;
                    d = d.replace(bY, p);
                    if (+b !== 0) {
                        this.attrs.blur = b;
                        c.filter = d + q + U + ".Blur(pixelradius=" + (+b || 1.5) + ")";
                        c.margin = a.format("-{0}px 0 0 -{0}px", Q(+b || 1.5))
                    } else {
                        c.filter = d;
                        c.margin = 0;
                        delete this.attrs.blur
                    }
                }
                    ;
                bP = function (a, b, c, d) {
                    var e = cd("group")
                        , f = cd("oval")
                        , g = f.style;
                    e.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
                    e.coordsize = b$;
                    e.coordorigin = a.coordorigin;
                    e[l](f);
                    var h = new bN(f, e, a);
                    h.type = "circle";
                    bK(h, {
                        stroke: "#000",
                        fill: "none"
                    });
                    h.attrs.cx = b;
                    h.attrs.cy = c;
                    h.attrs.r = d;
                    h.setBox({
                        x: b - d,
                        y: c - d,
                        width: d * 2,
                        height: d * 2
                    });
                    a.canvas[l](e);
                    return h
                }
                    ;
                function cc(b, c, d, e, f) {
                    return f ? a.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", b + f, c, d - f * 2, f, -f, e - f * 2, f * 2 - d, f * 2 - e) : a.format("M{0},{1}l{2},0,0,{3},{4},0z", b, c, d, e, -d)
                }
                bQ = function (a, b, c, d, e, f) {
                    var g = cc(b, c, d, e, f)
                        , h = a.path(g)
                        , i = h.attrs;
                    h.X = i.x = b;
                    h.Y = i.y = c;
                    h.W = i.width = d;
                    h.H = i.height = e;
                    i.r = f;
                    i.path = g;
                    h.type = "rect";
                    return h
                }
                    ;
                bR = function (a, b, c, d, e) {
                    var f = cd("group")
                        , g = cd("oval")
                        , h = g.style;
                    f.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
                    f.coordsize = b$;
                    f.coordorigin = a.coordorigin;
                    f[l](g);
                    var i = new bN(g, f, a);
                    i.type = "ellipse";
                    bK(i, {
                        stroke: "#000"
                    });
                    i.attrs.cx = b;
                    i.attrs.cy = c;
                    i.attrs.rx = d;
                    i.attrs.ry = e;
                    i.setBox({
                        x: b - d,
                        y: c - e,
                        width: d * 2,
                        height: e * 2
                    });
                    a.canvas[l](f);
                    return i
                }
                    ;
                bS = function (a, b, c, d, e, f) {
                    var g = cd("group")
                        , h = cd("image");
                    g.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
                    g.coordsize = b$;
                    g.coordorigin = a.coordorigin;
                    h.src = b;
                    g[l](h);
                    var i = new bN(h, g, a);
                    i.type = "image";
                    i.attrs.src = b;
                    i.attrs.x = c;
                    i.attrs.y = d;
                    i.attrs.w = e;
                    i.attrs.h = f;
                    i.setBox({
                        x: c,
                        y: d,
                        width: e,
                        height: f
                    });
                    a.canvas[l](g);
                    return i
                }
                    ;
                bT = function (b, c, d, e) {
                    var f = cd("group")
                        , g = cd("shape")
                        , h = g.style
                        , i = cd("path")
                        , j = i.style
                        , k = cd("textpath");
                    f.style.cssText = "position:absolute;left:0;top:0;width:" + b.width + "px;height:" + b.height + "px";
                    f.coordsize = b$;
                    f.coordorigin = b.coordorigin;
                    i.v = a.format("m{0},{1}l{2},{1}", Q(c * 10), Q(d * 10), Q(c * 10) + 1);
                    i.textpathok = true;
                    h.width = b.width;
                    h.height = b.height;
                    k.string = r(e);
                    k.on = true;
                    g[l](k);
                    g[l](i);
                    f[l](g);
                    var m = new bN(k, f, b);
                    m.shape = g;
                    m.textpath = i;
                    m.type = "text";
                    m.attrs.text = e;
                    m.attrs.x = c;
                    m.attrs.y = d;
                    m.attrs.w = 1;
                    m.attrs.h = 1;
                    bK(m, {
                        font: W.font,
                        stroke: "none",
                        fill: "#000"
                    });
                    m.setBox();
                    b.canvas[l](f);
                    return m
                }
                    ;
                bU = function (a, b) {
                    var c = this.canvas.style;
                    a == +a && (a += "px");
                    b == +b && (b += "px");
                    c.width = a;
                    c.height = b;
                    c.clip = "rect(0 " + a + " " + b + " 0)";
                    return this
                }
                    ;
                var cd;
                g.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !g.namespaces.rvml && g.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                    cd = function (a) {
                        return g.createElement("<rvml:" + a + " class=\"rvml\">")
                    }
                } catch (a) {
                    cd = function (a) {
                        return g.createElement("<" + a + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"rvml\">")
                    }
                }
                bV = function () {
                    var b = by[m](0, arguments), c = b.container, d = b.height, e, f = b.width, h = b.x, i = b.y;
                    if (!c)
                        throw new Error("VML container not found.");
                    var k = new j
                        , n = k.canvas = g.createElement("div")
                        , o = n.style;
                    h = h || 0;
                    i = i || 0;
                    f = f || 512;
                    d = d || 342;
                    f == +f && (f += "px");
                    d == +d && (d += "px");
                    k.width = 1000;
                    k.height = 1000;
                    k.coordsize = b_ * 1000 + q + b_ * 1000;
                    k.coordorigin = "0 0";
                    k.span = g.createElement("span");
                    k.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                    n[l](k.span);
                    o.cssText = a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", f, d);
                    if (c == 1) {
                        g.body[l](n);
                        o.left = h + "px";
                        o.top = i + "px";
                        o.position = "absolute"
                    } else
                        c.firstChild ? c.insertBefore(n, c.firstChild) : c[l](n);
                    bz.call(k, k, a.fn);
                    return k
                }
                    ;
                k.clear = function () {
                    this.canvas.innerHTML = p;
                    this.span = g.createElement("span");
                    this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                    this.canvas[l](this.span);
                    this.bottom = this.top = null
                }
                    ;
                k.remove = function () {
                    this.canvas.parentNode.removeChild(this.canvas);
                    for (var a in this)
                        this[a] = bF(a);
                    return true
                }
            }
            var ce = navigator.userAgent.match(/Version\\x2f(.*?)\s/);
            navigator.vendor == "Apple Computer, Inc." && (ce && ce[1] < 4 || navigator.platform.slice(0, 2) == "iP") ? k.safari = function () {
                var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
                    stroke: "none"
                });
                h.setTimeout(function () {
                    a.remove()
                })
            }
                : k.safari = function () { }
                ;
            var cf = function () {
                this.returnValue = false
            }
                , cg = function () {
                    return this.originalEvent.preventDefault()
                }
                , ch = function () {
                    this.cancelBubble = true
                }
                , ci = function () {
                    return this.originalEvent.stopPropagation()
                }
                , cj = (function () {
                    {
                        if (g.addEventListener)
                            return function (a, b, c, d) {
                                var e = o && u[b] ? u[b] : b
                                    , g = function (e) {
                                        if (o && u[f](b))
                                            for (var g = 0, h = e.targetTouches && e.targetTouches.length; g < h; g++) {
                                                if (e.targetTouches[g].target == a) {
                                                    var i = e;
                                                    e = e.targetTouches[g];
                                                    e.originalEvent = i;
                                                    e.preventDefault = cg;
                                                    e.stopPropagation = ci;
                                                    break
                                                }
                                            }
                                        return c.call(d, e)
                                    };
                                a.addEventListener(e, g, false);
                                return function () {
                                    a.removeEventListener(e, g, false);
                                    return true
                                }
                            }
                                ;
                        if (g.attachEvent)
                            return function (a, b, c, d) {
                                var e = function (a) {
                                    a = a || h.event;
                                    a.preventDefault = a.preventDefault || cf;
                                    a.stopPropagation = a.stopPropagation || ch;
                                    return c.call(d, a)
                                };
                                a.attachEvent("on" + b, e);
                                var f = function () {
                                    a.detachEvent("on" + b, e);
                                    return true
                                };
                                return f
                            }
                    }
                }
                )()
                , ck = []
                , cl = function (a) {
                    var b = a.clientX, c = a.clientY, d = g.documentElement.scrollTop || g.body.scrollTop, e = g.documentElement.scrollLeft || g.body.scrollLeft, f, h = ck.length;
                    while (h--) {
                        f = ck[h];
                        if (o) {
                            var i = a.touches.length, j;
                            while (i--) {
                                j = a.touches[i];
                                if (j.identifier == f.el._drag.id) {
                                    b = j.clientX;
                                    c = j.clientY;
                                    (a.originalEvent ? a.originalEvent : a).preventDefault();
                                    break
                                }
                            }
                        } else
                            a.preventDefault();
                        b += e;
                        c += d;
                        f.move && f.move.call(f.move_scope || f.el, b - f.el._drag.x, c - f.el._drag.y, b, c, a)
                    }
                }
                , cm = function (b) {
                    a.unmousemove(cl).unmouseup(cm);
                    var c = ck.length, d;
                    while (c--) {
                        d = ck[c];
                        d.el._drag = {};
                        d.end && d.end.call(d.end_scope || d.start_scope || d.move_scope || d.el, b)
                    }
                    ck = []
                };
            for (var cn = t[w]; cn--;)
                (function (b) {
                    a[b] = bN[e][b] = function (c, d) {
                        if (a.is(c, "function")) {
                            this.events = this.events || [];
                            this.events.push({
                                name: b,
                                f: c,
                                unbind: cj(this.shape || this.node || g, b, c, d || this)
                            })
                        }
                        return this
                    }
                        ;
                    a["un" + b] = bN[e]["un" + b] = function (a) {
                        var c = this.events
                            , d = c[w];
                        while (d--)
                            if (c[d].name == b && c[d].f == a) {
                                c[d].unbind();
                                c.splice(d, 1);
                                !c.length && delete this.events;
                                return this
                            }
                        return this
                    }
                }
                )(t[cn]);
            bO.hover = function (a, b, c, d) {
                return this.mouseover(a, c).mouseout(b, d || c)
            }
                ;
            bO.unhover = function (a, b) {
                return this.unmouseover(a).unmouseout(b)
            }
                ;
            bO.drag = function (b, c, d, e, f, h) {
                this._drag = {};
                this.mousedown(function (i) {
                    (i.originalEvent || i).preventDefault();
                    var j = g.documentElement.scrollTop || g.body.scrollTop
                        , k = g.documentElement.scrollLeft || g.body.scrollLeft;
                    this._drag.x = i.clientX + k;
                    this._drag.y = i.clientY + j;
                    this._drag.id = i.identifier;
                    c && c.call(f || e || this, i.clientX + k, i.clientY + j, i);
                    !ck.length && a.mousemove(cl).mouseup(cm);
                    ck.push({
                        el: this,
                        move: b,
                        end: d,
                        move_scope: e,
                        start_scope: f,
                        end_scope: h
                    })
                });
                return this
            }
                ;
            bO.undrag = function (b, c, d) {
                var e = ck.length;
                while (e--)
                    ck[e].el == this && (ck[e].move == b && ck[e].end == d) && ck.splice(e++, 1);
                !ck.length && a.unmousemove(cl).unmouseup(cm)
            }
                ;
            k.circle = function (a, b, c) {
                return bP(this, a || 0, b || 0, c || 0)
            }
                ;
            k.rect = function (a, b, c, d, e) {
                return bQ(this, a || 0, b || 0, c || 0, d || 0, e || 0)
            }
                ;
            k.ellipse = function (a, b, c, d) {
                return bR(this, a || 0, b || 0, c || 0, d || 0)
            }
                ;
            k.path = function (b) {
                b && !a.is(b, F) && !a.is(b[0], G) && (b += p);
                return bH(a.format[m](a, arguments), this)
            }
                ;
            k.image = function (a, b, c, d, e) {
                return bS(this, a || "about:blank", b || 0, c || 0, d || 0, e || 0)
            }
                ;
            k.text = function (a, b, c) {
                return bT(this, a || 0, b || 0, r(c))
            }
                ;
            k.set = function (a) {
                arguments[w] > 1 && (a = Array[e].splice.call(arguments, 0, arguments[w]));
                return new cC(a)
            }
                ;
            k.setSize = bU;
            k.top = k.bottom = null;
            k.raphael = a;
            function co() {
                return this.x + q + this.y
            }
            bO.resetScale = function () {
                if (this.removed)
                    return this;
                this._.sx = 1;
                this._.sy = 1;
                this.attrs.scale = "1 1"
            }
                ;
            bO.scale = function (a, b, c, d) {
                if (this.removed)
                    return this;
                if (a == null && b == null)
                    return {
                        x: this._.sx,
                        y: this._.sy,
                        toString: co
                    };
                b = b || a;
                !(+b) && (b = a);
                var e, f, g, h, i = this.attrs;
                if (a != 0) {
                    var j = this.getBBox()
                        , k = j.x + j.width / 2
                        , l = j.y + j.height / 2
                        , m = B(a / this._.sx)
                        , o = B(b / this._.sy);
                    c = +c || c == 0 ? c : k;
                    d = +d || d == 0 ? d : l;
                    var r = this._.sx > 0
                        , s = this._.sy > 0
                        , t = ~(~(a / B(a)))
                        , u = ~(~(b / B(b)))
                        , x = m * t
                        , y = o * u
                        , z = this.node.style
                        , A = c + B(k - c) * x * (k > c == r ? 1 : -1)
                        , C = d + B(l - d) * y * (l > d == s ? 1 : -1)
                        , D = a * t > b * u ? o : m;
                    switch (this.type) {
                        case "rect":
                        case "image":
                            var E = i.width * m
                                , F = i.height * o;
                            this.attr({
                                height: F,
                                r: i.r * D,
                                width: E,
                                x: A - E / 2,
                                y: C - F / 2
                            });
                            break;
                        case "circle":
                        case "ellipse":
                            this.attr({
                                rx: i.rx * m,
                                ry: i.ry * o,
                                r: i.r * D,
                                cx: A,
                                cy: C
                            });
                            break;
                        case "text":
                            this.attr({
                                x: A,
                                y: C
                            });
                            break;
                        case "path":
                            var G = bp(i.path)
                                , H = true
                                , I = r ? x : m
                                , J = s ? y : o;
                            for (var K = 0, L = G[w]; K < L; K++) {
                                var M = G[K]
                                    , N = V.call(M[0]);
                                {
                                    if (N == "M" && H)
                                        continue;
                                    H = false
                                }
                                if (N == "A") {
                                    M[G[K][w] - 2] *= I;
                                    M[G[K][w] - 1] *= J;
                                    M[1] *= m;
                                    M[2] *= o;
                                    M[5] = +(t + u ? !(!(+M[5])) : !(+M[5]))
                                } else if (N == "H")
                                    for (var O = 1, P = M[w]; O < P; O++)
                                        M[O] *= I;
                                else if (N == "V")
                                    for (O = 1,
                                        P = M[w]; O < P; O++)
                                        M[O] *= J;
                                else
                                    for (O = 1,
                                        P = M[w]; O < P; O++)
                                        M[O] *= O % 2 ? I : J
                            }
                            var Q = bn(G);
                            e = A - Q.x - Q.width / 2;
                            f = C - Q.y - Q.height / 2;
                            G[0][1] += e;
                            G[0][2] += f;
                            this.attr({
                                path: G
                            });
                            break
                    }
                    if (this.type in {
                        text: 1,
                        image: 1
                    } && (t != 1 || u != 1))
                        if (this.transformations) {
                            this.transformations[2] = "scale("[n](t, ",", u, ")");
                            this.node[R]("transform", this.transformations[v](q));
                            e = t == -1 ? -i.x - (E || 0) : i.x;
                            f = u == -1 ? -i.y - (F || 0) : i.y;
                            this.attr({
                                x: e,
                                y: f
                            });
                            i.fx = t - 1;
                            i.fy = u - 1
                        } else {
                            this.node.filterMatrix = U + ".Matrix(M11="[n](t, ", M12=0, M21=0, M22=", u, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
                            z.filter = (this.node.filterMatrix || p) + (this.node.filterOpacity || p)
                        }
                    else if (this.transformations) {
                        this.transformations[2] = p;
                        this.node[R]("transform", this.transformations[v](q));
                        i.fx = 0;
                        i.fy = 0
                    } else {
                        this.node.filterMatrix = p;
                        z.filter = (this.node.filterMatrix || p) + (this.node.filterOpacity || p)
                    }
                    i.scale = [a, b, c, d][v](q);
                    this._.sx = a;
                    this._.sy = b
                }
                return this
            }
                ;
            bO.clone = function () {
                if (this.removed)
                    return null;
                var a = this.attr();
                delete a.scale;
                delete a.translation;
                return this.paper[this.type]().attr(a)
            }
                ;
            var cp = {}
                , cq = function (b, c, d, e, f, g, h, i, j) {
                    var k = 0, l = 100, m = [b, c, d, e, f, g, h, i].join(), n = cp[m], o, p;
                    !n && (cp[m] = n = {
                        data: []
                    });
                    n.timer && clearTimeout(n.timer);
                    n.timer = setTimeout(function () {
                        delete cp[m]
                    }, 2000);
                    if (j != null) {
                        var q = cq(b, c, d, e, f, g, h, i);
                        l = ~(~q) * 10
                    }
                    for (var r = 0; r < l + 1; r++) {
                        if (n.data[j] > r)
                            p = n.data[r * l];
                        else {
                            p = a.findDotsAtSegment(b, c, d, e, f, g, h, i, r / l);
                            n.data[r] = p
                        }
                        r && (k += C(C(o.x - p.x, 2) + C(o.y - p.y, 2), 0.5));
                        if (j != null && k >= j)
                            return p;
                        o = p
                    }
                    if (j == null)
                        return k
                }
                , cr = function (b, c) {
                    return function (d, e, f) {
                        d = bw(d);
                        var g, h, i, j, k = "", l = {}, m, n = 0;
                        for (var o = 0, p = d.length; o < p; o++) {
                            i = d[o];
                            if (i[0] == "M") {
                                g = +i[1];
                                h = +i[2]
                            } else {
                                j = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6]);
                                if (n + j > e) {
                                    if (c && !l.start) {
                                        m = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n);
                                        k += ["C", m.start.x, m.start.y, m.m.x, m.m.y, m.x, m.y];
                                        if (f)
                                            return k;
                                        l.start = k;
                                        k = ["M", m.x, m.y + "C", m.n.x, m.n.y, m.end.x, m.end.y, i[5], i[6]][v]();
                                        n += j;
                                        g = +i[5];
                                        h = +i[6];
                                        continue
                                    }
                                    if (!b && !c) {
                                        m = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n);
                                        return {
                                            x: m.x,
                                            y: m.y,
                                            alpha: m.alpha
                                        }
                                    }
                                }
                                n += j;
                                g = +i[5];
                                h = +i[6]
                            }
                            k += i
                        }
                        l.end = k;
                        m = b ? n : c ? l : a.findDotsAtSegment(g, h, i[1], i[2], i[3], i[4], i[5], i[6], 1);
                        m.alpha && (m = {
                            x: m.x,
                            y: m.y,
                            alpha: m.alpha
                        });
                        return m
                    }
                }
                , cs = cr(1)
                , ct = cr()
                , cu = cr(0, 1);
            bO.getTotalLength = function () {
                if (this.type != "path")
                    return;
                if (this.node.getTotalLength)
                    return this.node.getTotalLength();
                return cs(this.attrs.path)
            }
                ;
            bO.getPointAtLength = function (a) {
                if (this.type != "path")
                    return;
                return ct(this.attrs.path, a)
            }
                ;
            bO.getSubpath = function (a, b) {
                if (this.type != "path")
                    return;
                if (B(this.getTotalLength() - b) < "1e-6")
                    return cu(this.attrs.path, a).end;
                var c = cu(this.attrs.path, b, 1);
                return a ? cu(c, a).end : c
            }
                ;
            a.easing_formulas = {
                linear: function (a) {
                    return a
                },
                "<": function (a) {
                    return C(a, 3)
                },
                ">": function (a) {
                    return C(a - 1, 3) + 1
                },
                "<>": function (a) {
                    a = a * 2;
                    if (a < 1)
                        return C(a, 3) / 2;
                    a -= 2;
                    return (C(a, 3) + 2) / 2
                },
                backIn: function (a) {
                    var b = 1.70158;
                    return a * a * ((b + 1) * a - b)
                },
                backOut: function (a) {
                    a = a - 1;
                    var b = 1.70158;
                    return a * a * ((b + 1) * a + b) + 1
                },
                elastic: function (a) {
                    if (a == 0 || a == 1)
                        return a;
                    var b = 0.3
                        , c = b / 4;
                    return C(2, -10 * a) * y.sin((a - c) * (2 * D) / b) + 1
                },
                bounce: function (a) {
                    var b = 7.5625, c = 2.75, d;
                    if (a < 1 / c)
                        d = b * a * a;
                    else if (a < 2 / c) {
                        a -= 1.5 / c;
                        d = b * a * a + 0.75
                    } else if (a < 2.5 / c) {
                        a -= 2.25 / c;
                        d = b * a * a + 0.9375
                    } else {
                        a -= 2.625 / c;
                        d = b * a * a + 0.984375
                    }
                    return d
                }
            };
            var cv = []
                , cw = function () {
                    var b = +(new Date);
                    for (var c = 0; c < cv[w]; c++) {
                        var d = cv[c];
                        if (d.stop || d.el.removed)
                            continue;
                        var e = b - d.start, g = d.ms, h = d.easing, i = d.from, j = d.diff, k = d.to, l = d.t, m = d.el, n = {}, o;
                        if (e < g) {
                            var r = h(e / g);
                            for (var s in i)
                                if (i[f](s)) {
                                    switch (X[s]) {
                                        case "along":
                                            o = r * g * j[s];
                                            k.back && (o = k.len - o);
                                            var t = ct(k[s], o);
                                            m.translate(j.sx - j.x || 0, j.sy - j.y || 0);
                                            j.x = t.x;
                                            j.y = t.y;
                                            m.translate(t.x - j.sx, t.y - j.sy);
                                            k.rot && m.rotate(j.r + t.alpha, t.x, t.y);
                                            break;
                                        case E:
                                            o = +i[s] + r * g * j[s];
                                            break;
                                        case "colour":
                                            o = "rgb(" + [cy(Q(i[s].r + r * g * j[s].r)), cy(Q(i[s].g + r * g * j[s].g)), cy(Q(i[s].b + r * g * j[s].b))][v](",") + ")";
                                            break;
                                        case "path":
                                            o = [];
                                            for (var u = 0, x = i[s][w]; u < x; u++) {
                                                o[u] = [i[s][u][0]];
                                                for (var y = 1, z = i[s][u][w]; y < z; y++)
                                                    o[u][y] = +i[s][u][y] + r * g * j[s][u][y];
                                                o[u] = o[u][v](q)
                                            }
                                            o = o[v](q);
                                            break;
                                        case "csv":
                                            switch (s) {
                                                case "translation":
                                                    var A = r * g * j[s][0] - l.x
                                                        , B = r * g * j[s][1] - l.y;
                                                    l.x += A;
                                                    l.y += B;
                                                    o = A + q + B;
                                                    break;
                                                case "rotation":
                                                    o = +i[s][0] + r * g * j[s][0];
                                                    i[s][1] && (o += "," + i[s][1] + "," + i[s][2]);
                                                    break;
                                                case "scale":
                                                    o = [+i[s][0] + r * g * j[s][0], +i[s][1] + r * g * j[s][1], 2 in k[s] ? k[s][2] : p, 3 in k[s] ? k[s][3] : p][v](q);
                                                    break;
                                                case "clip-rect":
                                                    o = [];
                                                    u = 4;
                                                    while (u--)
                                                        o[u] = +i[s][u] + r * g * j[s][u];
                                                    break
                                            }
                                            break;
                                        default:
                                            var C = [].concat(i[s]);
                                            o = [];
                                            u = m.paper.customAttributes[s].length;
                                            while (u--)
                                                o[u] = +C[u] + r * g * j[s][u];
                                            break
                                    }
                                    n[s] = o
                                }
                            m.attr(n);
                            m._run && m._run.call(m)
                        } else {
                            if (k.along) {
                                t = ct(k.along, k.len * !k.back);
                                m.translate(j.sx - (j.x || 0) + t.x - j.sx, j.sy - (j.y || 0) + t.y - j.sy);
                                k.rot && m.rotate(j.r + t.alpha, t.x, t.y)
                            }
                            (l.x || l.y) && m.translate(-l.x, -l.y);
                            k.scale && (k.scale += p);
                            m.attr(k);
                            cv.splice(c--, 1)
                        }
                    }
                    a.svg && m && m.paper && m.paper.safari();
                    cv[w] && setTimeout(cw)
                }
                , cx = function (b, c, d, e, f) {
                    var g = d - e;
                    c.timeouts.push(setTimeout(function () {
                        a.is(f, "function") && f.call(c);
                        c.animate(b, g, b.easing)
                    }, e))
                }
                , cy = function (a) {
                    return z(A(a, 255), 0)
                }
                , cz = function (a, b) {
                    if (a == null)
                        return {
                            x: this._.tx,
                            y: this._.ty,
                            toString: co
                        };
                    this._.tx += +a;
                    this._.ty += +b;
                    switch (this.type) {
                        case "circle":
                        case "ellipse":
                            this.attr({
                                cx: +a + this.attrs.cx,
                                cy: +b + this.attrs.cy
                            });
                            break;
                        case "rect":
                        case "image":
                        case "text":
                            this.attr({
                                x: +a + this.attrs.x,
                                y: +b + this.attrs.y
                            });
                            break;
                        case "path":
                            var c = bp(this.attrs.path);
                            c[0][1] += +a;
                            c[0][2] += +b;
                            this.attr({
                                path: c
                            });
                            break
                    }
                    return this
                };
            bO.animateWith = function (a, b, c, d, e) {
                for (var f = 0, g = cv.length; f < g; f++)
                    cv[f].el.id == a.id && (b.start = cv[f].start);
                return this.animate(b, c, d, e)
            }
                ;
            bO.animateAlong = cA();
            bO.animateAlongBack = cA(1);
            function cA(b) {
                return function (c, d, e, f) {
                    var g = {
                        back: b
                    };
                    a.is(e, "function") ? f = e : g.rot = e;
                    c && c.constructor == bN && (c = c.attrs.path);
                    c && (g.along = c);
                    return this.animate(g, d, f)
                }
            }
            function cB(a, b, c, d, e, f) {
                var g = 3 * b
                    , h = 3 * (d - b) - g
                    , i = 1 - g - h
                    , j = 3 * c
                    , k = 3 * (e - c) - j
                    , l = 1 - j - k;
                function m(a) {
                    return ((i * a + h) * a + g) * a
                }
                function n(a, b) {
                    var c = o(a, b);
                    return ((l * c + k) * c + j) * c
                }
                function o(a, b) {
                    var c, d, e, f, j, k;
                    for (e = a,
                        k = 0; k < 8; k++) {
                        f = m(e) - a;
                        if (B(f) < b)
                            return e;
                        j = (3 * i * e + 2 * h) * e + g;
                        if (B(j) < 0.000001)
                            break;
                        e = e - f / j
                    }
                    c = 0;
                    d = 1;
                    e = a;
                    if (e < c)
                        return c;
                    if (e > d)
                        return d;
                    while (c < d) {
                        f = m(e);
                        if (B(f - a) < b)
                            return e;
                        a > f ? c = e : d = e;
                        e = (d - c) / 2 + c
                    }
                    return e
                }
                return n(a, 1 / (200 * f))
            }
            bO.onAnimation = function (a) {
                this._run = a || 0;
                return this
            }
                ;
            bO.animate = function (c, d, e, g) {
                var h = this;
                h.timeouts = h.timeouts || [];
                if (a.is(e, "function") || !e)
                    g = e || null;
                if (h.removed) {
                    g && g.call(h);
                    return h
                }
                var i = {}
                    , j = {}
                    , k = false
                    , l = {};
                for (var m in c)
                    if (c[f](m)) {
                        if (X[f](m) || h.paper.customAttributes[f](m)) {
                            k = true;
                            i[m] = h.attr(m);
                            i[m] == null && (i[m] = W[m]);
                            j[m] = c[m];
                            switch (X[m]) {
                                case "along":
                                    var n = cs(c[m])
                                        , o = ct(c[m], n * !(!c.back))
                                        , p = h.getBBox();
                                    l[m] = n / d;
                                    l.tx = p.x;
                                    l.ty = p.y;
                                    l.sx = o.x;
                                    l.sy = o.y;
                                    j.rot = c.rot;
                                    j.back = c.back;
                                    j.len = n;
                                    c.rot && (l.r = S(h.rotate()) || 0);
                                    break;
                                case E:
                                    l[m] = (j[m] - i[m]) / d;
                                    break;
                                case "colour":
                                    i[m] = a.getRGB(i[m]);
                                    var q = a.getRGB(j[m]);
                                    l[m] = {
                                        r: (q.r - i[m].r) / d,
                                        g: (q.g - i[m].g) / d,
                                        b: (q.b - i[m].b) / d
                                    };
                                    break;
                                case "path":
                                    var t = bw(i[m], j[m]);
                                    i[m] = t[0];
                                    var u = t[1];
                                    l[m] = [];
                                    for (var v = 0, x = i[m][w]; v < x; v++) {
                                        l[m][v] = [0];
                                        for (var y = 1, z = i[m][v][w]; y < z; y++)
                                            l[m][v][y] = (u[v][y] - i[m][v][y]) / d
                                    }
                                    break;
                                case "csv":
                                    var A = r(c[m])[s](b)
                                        , B = r(i[m])[s](b);
                                    switch (m) {
                                        case "translation":
                                            i[m] = [0, 0];
                                            l[m] = [A[0] / d, A[1] / d];
                                            break;
                                        case "rotation":
                                            i[m] = B[1] == A[1] && B[2] == A[2] ? B : [0, A[1], A[2]];
                                            l[m] = [(A[0] - i[m][0]) / d, 0, 0];
                                            break;
                                        case "scale":
                                            c[m] = A;
                                            i[m] = r(i[m])[s](b);
                                            l[m] = [(A[0] - i[m][0]) / d, (A[1] - i[m][1]) / d, 0, 0];
                                            break;
                                        case "clip-rect":
                                            i[m] = r(i[m])[s](b);
                                            l[m] = [];
                                            v = 4;
                                            while (v--)
                                                l[m][v] = (A[v] - i[m][v]) / d;
                                            break
                                    }
                                    j[m] = A;
                                    break;
                                default:
                                    A = [].concat(c[m]);
                                    B = [].concat(i[m]);
                                    l[m] = [];
                                    v = h.paper.customAttributes[m][w];
                                    while (v--)
                                        l[m][v] = ((A[v] || 0) - (B[v] || 0)) / d;
                                    break
                            }
                        }
                    }
                if (k) {
                    var G = a.easing_formulas[e];
                    if (!G) {
                        G = r(e).match(P);
                        if (G && G[w] == 5) {
                            var H = G;
                            G = function (a) {
                                return cB(a, +H[1], +H[2], +H[3], +H[4], d)
                            }
                        } else
                            G = function (a) {
                                return a
                            }
                    }
                    cv.push({
                        start: c.start || +(new Date),
                        ms: d,
                        easing: G,
                        from: i,
                        diff: l,
                        to: j,
                        el: h,
                        t: {
                            x: 0,
                            y: 0
                        }
                    });
                    a.is(g, "function") && (h._ac = setTimeout(function () {
                        g.call(h)
                    }, d));
                    cv[w] == 1 && setTimeout(cw)
                } else {
                    var C = [], D;
                    for (var F in c)
                        if (c[f](F) && Z.test(F)) {
                            m = {
                                value: c[F]
                            };
                            F == "from" && (F = 0);
                            F == "to" && (F = 100);
                            m.key = T(F, 10);
                            C.push(m)
                        }
                    C.sort(be);
                    C[0].key && C.unshift({
                        key: 0,
                        value: h.attrs
                    });
                    for (v = 0,
                        x = C[w]; v < x; v++)
                        cx(C[v].value, h, d / 100 * C[v].key, d / 100 * (C[v - 1] && C[v - 1].key || 0), C[v - 1] && C[v - 1].value.callback);
                    D = C[C[w] - 1].value.callback;
                    D && h.timeouts.push(setTimeout(function () {
                        D.call(h)
                    }, d))
                }
                return this
            }
                ;
            bO.stop = function () {
                for (var a = 0; a < cv.length; a++)
                    cv[a].el.id == this.id && cv.splice(a--, 1);
                for (a = 0,
                    ii = this.timeouts && this.timeouts.length; a < ii; a++)
                    clearTimeout(this.timeouts[a]);
                this.timeouts = [];
                clearTimeout(this._ac);
                delete this._ac;
                return this
            }
                ;
            bO.translate = function (a, b) {
                return this.attr({
                    translation: a + " " + b
                })
            }
                ;
            bO[H] = function () {
                return "Raphaël’s object"
            }
                ;
            a.ae = cv;
            var cC = function (a) {
                this.items = [];
                this[w] = 0;
                this.type = "set";
                if (a)
                    for (var b = 0, c = a[w]; b < c; b++) {
                        if (a[b] && (a[b].constructor == bN || a[b].constructor == cC)) {
                            this[this.items[w]] = this.items[this.items[w]] = a[b];
                            this[w]++
                        }
                    }
            };
            cC[e][L] = function () {
                var a, b;
                for (var c = 0, d = arguments[w]; c < d; c++) {
                    a = arguments[c];
                    if (a && (a.constructor == bN || a.constructor == cC)) {
                        b = this.items[w];
                        this[b] = this.items[b] = a;
                        this[w]++
                    }
                }
                return this
            }
                ;
            cC[e].pop = function () {
                delete this[this[w]--];
                return this.items.pop()
            }
                ;
            for (var cD in bO)
                bO[f](cD) && (cC[e][cD] = (function (a) {
                    return function () {
                        for (var b = 0, c = this.items[w]; b < c; b++)
                            this.items[b][a][m](this.items[b], arguments);
                        return this
                    }
                }
                )(cD));
            cC[e].attr = function (b, c) {
                if (b && a.is(b, G) && a.is(b[0], "object"))
                    for (var d = 0, e = b[w]; d < e; d++)
                        this.items[d].attr(b[d]);
                else
                    for (var f = 0, g = this.items[w]; f < g; f++)
                        this.items[f].attr(b, c);
                return this
            }
                ;
            cC[e].animate = function (b, c, d, e) {
                (a.is(d, "function") || !d) && (e = d || null);
                var f = this.items[w], g = f, h, i = this, j;
                e && (j = function () {
                    !(--f) && e.call(i)
                }
                );
                d = a.is(d, F) ? d : j;
                h = this.items[--g].animate(b, c, d, j);
                while (g--)
                    this.items[g] && !this.items[g].removed && this.items[g].animateWith(h, b, c, d, j);
                return this
            }
                ;
            cC[e].insertAfter = function (a) {
                var b = this.items[w];
                while (b--)
                    this.items[b].insertAfter(a);
                return this
            }
                ;
            cC[e].getBBox = function () {
                var a = []
                    , b = []
                    , c = []
                    , d = [];
                for (var e = this.items[w]; e--;) {
                    var f = this.items[e].getBBox();
                    a[L](f.x);
                    b[L](f.y);
                    c[L](f.x + f.width);
                    d[L](f.y + f.height)
                }
                a = A[m](0, a);
                b = A[m](0, b);
                return {
                    x: a,
                    y: b,
                    width: z[m](0, c) - a,
                    height: z[m](0, d) - b
                }
            }
                ;
            cC[e].clone = function (a) {
                a = new cC;
                for (var b = 0, c = this.items[w]; b < c; b++)
                    a[L](this.items[b].clone());
                return a
            }
                ;
            a.registerFont = function (a) {
                if (!a.face)
                    return a;
                this.fonts = this.fonts || {};
                var b = {
                    w: a.w,
                    face: {},
                    glyphs: {}
                }
                    , c = a.face["font-family"];
                for (var d in a.face)
                    a.face[f](d) && (b.face[d] = a.face[d]);
                this.fonts[c] ? this.fonts[c][L](b) : this.fonts[c] = [b];
                if (!a.svg) {
                    b.face["units-per-em"] = T(a.face["units-per-em"], 10);
                    for (var e in a.glyphs)
                        if (a.glyphs[f](e)) {
                            var g = a.glyphs[e];
                            b.glyphs[e] = {
                                w: g.w,
                                k: {},
                                d: g.d && "M" + g.d[Y](/[mlcxtrv]/g, function (a) {
                                    return ({
                                        l: "L",
                                        c: "C",
                                        x: "z",
                                        t: "m",
                                        r: "l",
                                        v: "c"
                                    })[a] || "M"
                                }) + "z"
                            };
                            if (g.k)
                                for (var h in g.k)
                                    g[f](h) && (b.glyphs[e].k[h] = g.k[h])
                        }
                }
                return a
            }
                ;
            k.getFont = function (b, c, d, e) {
                e = e || "normal";
                d = d || "normal";
                c = +c || ({
                    normal: 400,
                    bold: 700,
                    lighter: 300,
                    bolder: 800
                })[c] || 400;
                if (!a.fonts)
                    return;
                var g = a.fonts[b];
                if (!g) {
                    var h = new RegExp("(^|\\s)" + b[Y](/[^\w\d\s+!~.:_-]/g, p) + "(\\s|$)", "i");
                    for (var i in a.fonts)
                        if (a.fonts[f](i)) {
                            if (h.test(i)) {
                                g = a.fonts[i];
                                break
                            }
                        }
                }
                var j;
                if (g)
                    for (var k = 0, l = g[w]; k < l; k++) {
                        j = g[k];
                        if (j.face["font-weight"] == c && (j.face["font-style"] == d || !j.face["font-style"]) && j.face["font-stretch"] == e)
                            break
                    }
                return j
            }
                ;
            k.print = function (c, d, e, f, g, h, i) {
                h = h || "middle";
                i = z(A(i || 0, 1), -1);
                var j = this.set(), k = r(e)[s](p), l = 0, m = p, n;
                a.is(f, e) && (f = this.getFont(f));
                if (f) {
                    n = (g || 16) / f.face["units-per-em"];
                    var o = f.face.bbox.split(b)
                        , q = +o[0]
                        , t = +o[1] + (h == "baseline" ? o[3] - o[1] + +f.face.descent : (o[3] - o[1]) / 2);
                    for (var u = 0, v = k[w]; u < v; u++) {
                        var x = u && f.glyphs[k[u - 1]] || {}
                            , y = f.glyphs[k[u]];
                        l += u ? (x.w || f.w) + (x.k && x.k[k[u]] || 0) + f.w * i : 0;
                        y && y.d && j[L](this.path(y.d).attr({
                            fill: "#000",
                            stroke: "none",
                            translation: [l, 0]
                        }))
                    }
                    j.scale(n, n, q, t).translate(c - q, d - t)
                }
                return j
            }
                ;
            a.format = function (b, c) {
                var e = a.is(c, G) ? [0][n](c) : arguments;
                b && a.is(b, F) && e[w] - 1 && (b = b[Y](d, function (a, b) {
                    return e[++b] == null ? p : e[b]
                }));
                return b || p
            }
                ;
            a.ninja = function () {
                i.was ? h.Raphael = i.is : delete Raphael;
                return a
            }
                ;
            a.el = bO;
            a.st = cC[e];
            i.was ? h.Raphael = a : Raphael = a
        }
        )();
        exports = Raphael;
        ;
        return exports;
    });

    define("scripts/lib/sound.js", function (exports) {
        /**
         * 简易声效控制
         */

        /**
         * 使用方法：
         * 
         * var sound = require("scripts/lib/sound/main");
         * 
         * var snd = sound.create("sounds/myfile");
         * snd.play();
         */

        var buzz = require("scripts/lib/buzz");
        var supported = buzz.isSupported();

        var config = {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true,
            loop: false
        };

        function ClassBuzz(src) {
            this.sound = new buzz.sound(src, config);
        }

        ClassBuzz.prototype.play = function (s) {
            s = this.sound;
            s.setPercent(0);
            s.setVolume(100);
            s.play();
        }
            ;

        ClassBuzz.prototype.stop = function () {
            this.sound.fadeOut(1e3, function () {
                this.pause();
            });
        }
            ;

        exports.create = function (src) {
            if (!supported)
                return unSupported;
            else
                return new ClassBuzz(src);
        }

        function unSupported() {// TODO: 
        }

        unSupported.play = unSupported.stop = function () {// TODO: 
        }
            ;
        ;
        return exports;
    });

    define("scripts/lib/tween.js", function (exports) {
        exports.exponential = function () { }
            ;
        exports.exponential.co = function (index, offset, target, framesNum) {
            return (index == framesNum) ? offset + target : target * (-Math.pow(2, -10 * index / framesNum) + 1) + offset;
        }
            ;
        // exports.exponential.ci = function(index, offset, target, framesNum){ return (index == 0) ? offset : target * Math.pow(2, 10 * (index / framesNum - 1)) + offset; }

        exports.bounce = function () { }
            ;
        exports.bounce.co = function (index, offset, target, framesNum) {
            if ((index /= framesNum) < (1 / 2.75))
                return target * (7.5625 * index * index) + offset;
            else if (index < (2 / 2.75))
                return target * (7.5625 * (index -= (1.5 / 2.75)) * index + .75) + offset;
            else if (index < (2.5 / 2.75))
                return target * (7.5625 * (index -= (2.25 / 2.75)) * index + .9375) + offset;
            else
                return target * (7.5625 * (index -= (2.625 / 2.75)) * index + .984375) + offset;
        }
            ;

        exports.quadratic = function () { }
            ;
        exports.quadratic.ci = function (index, offset, target, framesNum) {
            return target * (index /= framesNum) * index + offset;
        }
            ;
        exports.quadratic.co = function (index, offset, target, framesNum) {
            return -target * (index /= framesNum) * (index - 2) + offset;
        }
        exports.quadratic.cio = function (index, offset, target, framesNum) {
            if ((index /= framesNum / 2) < 1)
                return target / 2 * index * index + offset;
            else
                return -target / 2 * ((--index) * (index - 2) - 1) + offset;
        }
            ;

        exports.circular = function (index, offset, target, framesNum) {
            if ((index /= framesNum / 2) < 1)
                return -target / 2 * (Math.sqrt(1 - index * index) - 1) + offset;
            else
                return target / 2 * (Math.sqrt(1 - (index -= 2) * index) + 1) + offset;
        }

        exports.linear = function (index, offset, target, framesNum) {
            return target * index / framesNum + offset;
        }
            ;

        exports.back = function () { }
            ;
        exports.back.ci = function (index, offset, target, framesNum, s) {
            s = 1.70158;
            return target * (index /= framesNum) * index * ((s + 1) * index - s) + offset;
        }
            ;
        exports.back.co = function (index, offset, target, framesNum, s) {
            s = 1.70158;
            return target * ((index = index / framesNum - 1) * index * ((s + 1) * index + s) + 1) + offset;
        }
            ;
        ;
        return exports;
    });

    define("scripts/lib/ucren.js", function (exports) {
        /**
         * ucren-lite
         * filename: boot.js
         * author: dron
         * version: 5.0.2.20120628
         * date: 2009-03-15
         * contact: ucren.com
         */

        var Ucren;

        var blankArray = [];
        var slice = blankArray.slice;
        var join = blankArray.join;

        //
        // [基本数据类型扩展]
        //

        // String.prototype.trim
        if (!String.prototype.trim)
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/, "");
            }
                ;

        // String.prototype.format
        String.prototype.format = function (conf) {
            var rtn = this
                , blank = {};
            Ucren.each(conf, function (item, key) {
                item = item.toString().replace(/\$/g, "$$$$");
                rtn = rtn.replace(RegExp("@{" + key + "}", "g"), item);
            });
            return rtn.toString();
        }
            ;

        // String.prototype.htmlEncode
        String.prototype.htmlEncode = function () {
            var div = document.createElement("div");
            return function () {
                var text;
                div.appendChild(document.createTextNode(this));
                text = div.innerHTML;
                div.innerHTML = "";
                return text;
            }
                ;
        }();

        // String.prototype.byteLength
        String.prototype.byteLength = function () {
            return this.replace(/[^\x00-\xff]/g, "  ").length;
        }
            ;

        // String.prototype.subByte
        String.prototype.subByte = function (len, tail) {
            var s = this;
            if (s.byteLength() <= len)
                return s;
            tail = tail || "";
            len -= tail.byteLength();
            return s = s.slice(0, len).replace(/( [^\x00-\xff] )/g, "$1 ").slice(0, len).replace(/[^\x00-\xff]$/, "").replace(/( [^\x00-\xff] ) /g, "$1") + tail;
        }

        // Function.prototype.defer
        Function.prototype.defer = function (scope, timeout) {
            var me = this;
            var fn = function () {
                me.apply(scope, arguments);
            };
            return setTimeout(fn, timeout);
        }
            ;

        // Function.prototype.bind
        if (!Function.prototype.bind)
            Function.prototype.bind = function (scope) {
                var me = this;
                return function () {
                    return me.apply(scope, arguments);
                }
            }
                ;

        // Function.prototype.saturate
        Function.prototype.saturate = function (scope /*, args */
        ) {
            var fn = this
                , afters = slice.call(arguments, 1);
            return function () {
                return fn.apply(scope, slice.call(arguments, 0).concat(afters));
            }
        }
            ;

        // Array.prototype.indexOf
        // if( !Array.prototype.indexOf )
        Array.prototype.indexOf = function (item, i) {
            var length = this.length;

            if (!i)
                i = 0;

            if (i < 0)
                i = length + i;
            for (; i < length; i++)
                if (this[i] === item)
                    return i;
            return -1;
        }
            ;

        // Array.prototype.every
        // if( !Array.prototype.every )
        Array.prototype.every = function (fn, context) {
            for (var i = 0, len = this.length; i < len; i++)
                if (!fn.call(context, this[i], i, this))
                    return false;
            return true;
        }
            ;

        // Array.prototype.filter
        // if( !Array.prototype.filter )
        Array.prototype.filter = function (fn, context) {
            var result = [], val;
            for (var i = 0, len = this.length; i < len; i++)
                if (val = this[i],
                    fn.call(context, val, i, this))
                    result.push(val);
            return result;
        }
            ;

        // Array.prototype.forEach
        // if( !Array.prototype.forEach )
        Array.prototype.forEach = function (fn, context) {
            for (var i = 0, len = this.length; i < len; i++)
                fn.call(context, this[i], i, this);
        }
            ;

        // Array.prototype.map
        // if( !Array.prototype.map )
        Array.prototype.map = function (fn, context) {
            var result = [];
            for (var i = 0, len = this.length; i < len; i++)
                result[i] = fn.call(context, this[i], i, this);
            return result;
        }
            ;

        // Array.prototype.some
        // if( !Array.prototype.some )
        Array.prototype.some = function (fn, context) {
            for (var i = 0, len = this.length; i < len; i++)
                if (fn.call(context, this[i], i, this))
                    return true;
            return false;
        }
            ;

        Array.prototype.invoke = function (method /*, args */
        ) {
            var args = slice.call(arguments, 1);
            this.forEach(function (item) {
                if (item instanceof Array)
                    item[0][method].apply(item[0], item.slice(1));
                else
                    item[method].apply(item, args);
            });
            return this;
        }
            ;

        Array.prototype.random = function () {
            var arr = this.slice(0)
                , ret = []
                , i = arr.length;
            while (i--)
                ret.push(arr.splice(Ucren.randomNumber(i + 1), 1)[0]);
            return ret;
        }
            ;

        Ucren = {

            //
            // [全局属性]
            //

            // Ucren.isIe
            isIe: /msie/i.test(navigator.userAgent),

            // Ucren.isIe6
            isIe6: /msie 6/i.test(navigator.userAgent),

            // Ucren.isFirefox
            isFirefox: /firefox/i.test(navigator.userAgent),

            // Ucren.isSafari
            isSafari: /version\/[\d\.]+\s+safari/i.test(navigator.userAgent),

            // Ucren.isOpera
            isOpera: /opera/i.test(navigator.userAgent),

            // Ucren.isChrome
            isChrome: /chrome/i.test(navigator.userAgent),
            //todo isChrome = true, isSafari = true

            // Ucren.isStrict
            isStrict: document.compatMode == "CSS1Compat",

            // Ucren.tempDom
            tempDom: document.createElement("div"),

            //
            // [全局方法]
            //

            // Ucren.apply
            apply: function (form, to, except) {
                if (!to)
                    to = {};
                if (except) {
                    Ucren.each(form, function (item, key) {
                        if (key in except)
                            return;
                        to[key] = item;
                    });
                } else {
                    Ucren.each(form, function (item, key) {
                        to[key] = item;
                    });
                }
                return to;
            },

            // Ucren.appendStyle
            appendStyle: function (text) {
                var style;

                if (arguments.length > 1)
                    text = join.call(arguments, "");

                if (document.createStyleSheet) {
                    style = document.createStyleSheet();
                    style.cssText = text;
                } else {
                    style = document.createElement("style");
                    style.type = "text/css";
                    //style.innerHTML = text; fix Chrome bug
                    style.appendChild(document.createTextNode(text));
                    document.getElementsByTagName("head")[0].appendChild(style);
                }
            },

            // for copy : )
            //
            // var addEvent = function( target, name, fn ){
            // 	var call = function(){
            // 		fn.apply( target, arguments );
            // 	};
            // 	if( window.attachEvent )
            // 		target.attachEvent( "on" + name, call );
            // 	else if( window.addEventListener )
            // 		target.addEventListener( name, call, false );
            // 	else
            // 		target["on" + name] = call;
            // 	return call;
            // }

            // Ucren.addEvent
            addEvent: function (target, name, fn) {
                var call = function () {
                    fn.apply(target, arguments);
                };
                if (target.dom) {
                    target = target.dom;
                }
                if (window.attachEvent) {
                    target.attachEvent("on" + name, call);
                } else if (window.addEventListener) {
                    target.addEventListener(name, call, false);
                } else {
                    target["on" + name] = call;
                }
                return call;
            },

            // Ucren.delEvent
            delEvent: function (target, name, fn) {
                if (window.detachEvent) {
                    target.detachEvent("on" + name, fn);
                } else if (window.removeEventListener) {
                    target.removeEventListener(name, fn, false);
                } else if (target["on" + name] == fn) {
                    target["on" + name] = null;
                }
            },

            // Ucren.Class
            Class: function (initialize, methods, befores, afters) {
                var fn, prototype, blank;
                initialize = initialize || function () { }
                    ;
                methods = methods || {};
                blank = {};
                fn = function () {
                    this.instanceId = Ucren.id();
                    initialize.apply(this, arguments);
                }
                    ;
                prototype = fn.prototype;
                Ucren.registerClassEvent.call(prototype);
                Ucren.each(methods, function (item, key) {
                    prototype[key] = function (method, name) {
                        if (typeof (method) == "function") {
                            return function () {
                                var args, rtn;
                                args = slice.call(arguments, 0);
                                if (befores && befores.apply(this, [name].concat(args)) === false) {
                                    return;
                                }
                                this.fireEvent("before" + name, args);
                                rtn = method.apply(this, args);
                                if (afters)
                                    afters.apply(this, [name].concat(args));
                                this.fireEvent(name, args);
                                return rtn;
                            }
                                ;
                        } else {
                            return method;
                        }
                    }(item, key);
                });
                prototype.getOriginMethod = function (name) {
                    return methods[name];
                }
                    ;
                return fn;
            },

            //private
            registerClassEvent: function () {
                this.on = function (name, fn) {
                    var instanceId = this.instanceId;
                    Ucren.dispatch(instanceId + name, fn.bind(this));
                }
                    ;
                this.onbefore = function (name, fn) {
                    var instanceId = this.instanceId;
                    Ucren.dispatch(instanceId + "before" + name, fn.bind(this));
                }
                    ;
                this.un = function (name, fn) {//todo
                }
                    ;
                this.fireEvent = function (name, args) {
                    var instanceId = this.instanceId;
                    Ucren.dispatch(instanceId + name, args);
                }
                    ;
            },

            // Ucren.createFuze
            createFuze: function () {
                var queue, fn, infire;
                queue = [];
                fn = function (process) {
                    if (infire) {
                        process();
                    } else {
                        queue.push(process);
                    }
                }
                    ;
                fn.fire = function () {
                    while (queue.length) {
                        queue.shift()();
                    }
                    infire = true;
                }
                    ;
                fn.extinguish = function () {
                    infire = false;
                }
                    ;
                fn.wettish = function () {
                    if (queue.length) {
                        queue.shift()();
                    }
                }
                    ;
                return fn;
            },

            // Ucren.createIf
            // createIf: function( expressionFunction ){
            // 	return function( callback ){
            // 		var expression = expressionFunction();
            // 		var returnValue = {
            // 			Else: function( callback ){
            // 				callback = callback || nul;
            // 				expression || callback();
            // 			}
            // 		};
            // 		callback = callback || nul;
            // 		expression && callback();
            // 		return returnValue;
            // 	};
            // },

            // Ucren.dispatch
            dispatch: function () {
                var map = {}, send, incept, ret;

                send = function (processId, args, scope) {
                    var processItems;
                    if (processItems = map[processId])
                        Ucren.each(processItems, function (item) {
                            item.apply(scope, args);
                        });
                }
                    ;

                incept = function (processId, fn) {
                    var m;
                    if (!(m = map[processId]))
                        map[processId] = [fn];
                    else
                        m.push(fn);
                }
                    ;

                ret = function (arg1, arg2, arg3) {
                    if (typeof (arg2) === "undefined")
                        arg2 = [];

                    if (arg2 instanceof Array)
                        send.apply(this, arguments);
                    else if (typeof (arg2) === "function")
                        incept.apply(this, arguments);
                }
                    ;

                ret.remove = function (processId, fn) {
                    var m, i;
                    if ((m = map[processId]) && ~(i = m.indexOf(fn)))
                        m.splice(i, 1);
                }
                    ;

                return ret;
            }(),

            // Ucren.each ( not recommended )
            each: function (unknown, fn) {
                /// unknown 是 array 的，会慢慢退化，建议用 Array.prototype.forEach 替代
                /// unknown 为其它类似的，短期内将暂时支持
                if (unknown instanceof Array || (typeof unknown == "object" && typeof unknown[0] != "undefined" && unknown.length)) {
                    if (typeof unknown == "object" && Ucren.isSafari)
                        unknown = slice.call(unknown);
                    //				for( var i = 0, l = unknown.length; i < l; i ++ ){
                    //					if( fn( unknown[i], i ) === false ){
                    //						break;
                    //					}
                    //				}
                    unknown.forEach(fn);
                } else if (typeof (unknown) == "object") {
                    var blank = {};
                    for (var i in unknown) {
                        if (blank[i]) {
                            continue;
                        }
                        if (fn(unknown[i], i) === false) {
                            break;
                        }
                    }
                } else if (typeof (unknown) == "number") {
                    for (var i = 0; i < unknown; i++) {
                        if (fn(i, i) === false) {
                            break;
                        }
                    }
                } else if (typeof (unknown) == "string") {
                    for (var i = 0, l = unknown.length; i < l; i++) {
                        if (fn(unknown.charAt(i), i) === false) {
                            break;
                        }
                    }
                }
            },

            // Ucren.Element
            Element: function (el, returnDom) {
                var rtn, handleId;
                if (el && el.isUcrenElement) {
                    return returnDom ? el.dom : el;
                }
                el = typeof (el) == "string" ? document.getElementById(el) : el;

                if (!el)
                    return null;

                if (returnDom)
                    return el;

                handleId = el.getAttribute("handleId");
                if (typeof handleId == "string") {
                    return Ucren.handle(handleId - 0);
                } else {
                    rtn = new Ucren.BasicElement(el);
                    handleId = Ucren.handle(rtn);
                    el.setAttribute("handleId", handleId + "");
                    return rtn;
                }
            },

            // Ucren.Event
            Event: function (e) {
                e = e || window.event;

                if (!e) {
                    var c = arguments.callee.caller;
                    while (c) {
                        e = c.arguments[0];
                        if (e && typeof (e.altKey) == "boolean") {
                            // duck typing
                            break;
                        }
                        c = c.caller;
                        e = null;
                    }
                }

                return e;
            },

            // Ucren.fixNumber
            fixNumber: function (unknown, defaultValue) {
                return typeof (unknown) == "number" ? unknown : defaultValue;
            },

            // Ucren.fixString
            fixString: function (unknown, defaultValue) {
                return typeof (unknown) == "string" ? unknown : defaultValue;
            },

            // Ucren.fixConfig
            fixConfig: function (conf) {
                var defaultConf;
                defaultConf = {};
                if (typeof conf == "undefined") {
                    return defaultConf;
                } else if (typeof conf == "function") {
                    return new conf;
                } else {
                    return conf;
                }
            },

            // Ucren.handle
            handle: function (unknown) {
                var fn, type, number;
                fn = arguments.callee;
                if (!fn.cache) {
                    fn.cache = {};
                }
                if (typeof (fn.number) == "undefined") {
                    fn.number = 0;
                }
                type = typeof (unknown);
                if (type == "number") {
                    return fn.cache[unknown.toString()];
                } else if (type == "object" || type == "function") {
                    number = fn.number++;
                    fn.cache[number.toString()] = unknown;
                    return number;
                }
            },

            // Ucren.id
            id: function () {
                var id = arguments.callee;
                id.number = ++id.number || 0;
                return "_" + id.number;
            },

            // Ucren.loadImage
            loadImage: function (urls, onLoadComplete) {
                var length = urls.length;
                var loaded = 0;
                var check = function () {
                    if (loaded == length)
                        onLoadComplete && onLoadComplete();
                };
                Ucren.each(urls, function (url) {
                    var img = document.createElement("img");
                    img.onload = img.onerror = function () {
                        this.onload = this.onerror = null;
                        loaded++;
                        check();
                    }
                        ;
                    Ucren.tempDom.appendChild(img);
                    img.src = url;
                });
            },

            // Ucren.loadScript
            loadScript: function (src, callback) {
                Ucren.request(src, function (text) {
                    eval(text);
                    callback && callback(text);
                });
            },

            // Ucren.makeElement
            makeElement: function (tagName, attributes) {
                var el = document.createElement(tagName);
                var setStyle = function (unknown) {
                    if (typeof unknown == "string")
                        el.style.cssText = unknown;
                    else
                        Ucren.apply(unknown, el.style);
                };

                for (var prop in attributes) {
                    if (prop === "class")
                        el.className = attributes[prop];
                    else if (prop === "for")
                        el.htmlFor = attributes[prop];
                    else if (prop === "style")
                        setStyle(attributes[prop]);
                    else
                        el.setAttribute(prop, attributes[prop]);
                }

                return el;
            },

            // Ucren.nul
            nul: function () {
                return false;
            },

            // Ucren.queryString
            // queryString: function( name, sourceString ){
            // 	var source, pattern, result;
            // 	source = sourceString || location.href;
            // 	pattern = new RegExp( "( \\?|& )" + name + "=( [^&#]* )( #|&|$ )", "i" );
            // 	result = source.match( pattern );
            // 	return result ? result[2] : "";
            // },

            // Ucren.randomNumber
            randomNumber: function (num) {
                return Math.floor(Math.random() * num);
            },

            // Ucren.randomWord
            randomWord: function () {
                var cw = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                return function (length, sourceString) {
                    var words, re = [];
                    words = sourceString || cw;
                    Ucren.each(length, function (index) {
                        re[index] = words.charAt(this.randomNumber(words.length));
                    }
                        .bind(this));
                    return re.join("");
                }
            }(),

            // Ucren.request
            request: function (url, callback) {
                request = Ucren.request;
                var xhr = request.xhr;
                if (!request.xhr) {
                    if (window.XMLHttpRequest) {
                        xhr = request.xhr = new XMLHttpRequest();
                    } else {
                        xhr = request.xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                }
                xhr.open("GET", url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        callback(xhr.responseText);
                    }
                }
                    ;
                xhr.send(null);
            }
            // // Ucren.decodeColor
            // decodeColor: function(){
            // 	var r = /^\#?( \w{2})( \w{2})( \w{2})$/;
            // 	var x = function( x ){
            // 		return parseInt( x, 16 );
            // 	};
            // 	return function( color ){
            // 		r.test( color );
            // 		return {
            // 			red: x( RegExp.$1 ),
            // 			green: x( RegExp.$2 ),
            // 			blue: x( RegExp.$3 )
            // 		};
            // 	}
            // }(),

            // // Ucren.encodeColor
            // encodeColor: function(){
            // 	var x = function( x ){
            // 		return x.toString( 16 ).split( "." )[0];
            // 	};
            // 	x = x.improve( function( origin, x ){
            // 		x = origin( x );
            // 		return x.length == 1 ? "0" + x : x;
            // 	});
            // 	return function( data ){
            // 		return ["#", x( data.red ), x( data.green ), x( data.blue )].join( "" );
            // 	}
            // }()
        };

        //
        // [底层操作类]
        //

        // Ucren.BasicDrag
        Ucren.BasicDrag = Ucren.Class(/* constructor */
            function (conf) {
                conf = Ucren.fixConfig(conf);
                this.type = Ucren.fixString(conf.type, "normal");

                var isTouch = this.isTouch = "ontouchstart" in window;

                this.TOUCH_START = isTouch ? "touchstart" : "mousedown",
                    this.TOUCH_MOVE = isTouch ? "touchmove" : "mousemove",
                    this.TOUCH_END = isTouch ? "touchend" : "mouseup";
            },
            /* methods */
            {
                bind: function (el, handle) {
                    el = Ucren.Element(el);
                    handle = Ucren.Element(handle) || el;

                    var evt = {};

                    evt[this.TOUCH_START] = function (e) {
                        e = Ucren.Event(e);
                        this.startDrag();
                        e.cancelBubble = true;
                        e.stopPropagation && e.stopPropagation();
                        return e.returnValue = false;
                    }
                        .bind(this);

                    handle.addEvents(evt);
                    this.target = el;
                },

                //private
                getCoors: function (e) {
                    var coors = [];
                    if (e.targetTouches && e.targetTouches.length) {
                        // iPhone
                        var thisTouch = e.targetTouches[0];
                        coors[0] = thisTouch.clientX;
                        coors[1] = thisTouch.clientY;
                    } else {
                        // all others
                        coors[0] = e.clientX;
                        coors[1] = e.clientY;
                    }
                    return coors;
                },

                //private
                startDrag: function () {
                    var target, draging, e;
                    target = this.target;
                    draging = target.draging = {};

                    this.isDraging = true;

                    draging.x = parseInt(target.style("left"), 10) || 0;
                    draging.y = parseInt(target.style("top"), 10) || 0;

                    e = Ucren.Event();
                    var coors = this.getCoors(e);
                    draging.mouseX = coors[0];
                    draging.mouseY = coors[1];

                    this.registerDocumentEvent();
                },

                //private
                endDrag: function () {
                    this.isDraging = false;
                    this.unRegisterDocumentEvent();
                },

                //private
                registerDocumentEvent: function () {
                    var target, draging;
                    target = this.target;
                    draging = target.draging;

                    draging.documentSelectStart = Ucren.addEvent(document, "selectstart", function (e) {
                        e = e || event;
                        e.stopPropagation && e.stopPropagation();
                        e.cancelBubble = true;
                        return e.returnValue = false;
                    });

                    draging.documentMouseMove = Ucren.addEvent(document, this.TOUCH_MOVE, function (e) {
                        var ie, nie;
                        e = e || event;
                        ie = Ucren.isIe && e.button != 1;
                        nie = !Ucren.isIe && e.button != 0;
                        if ((ie || nie) && !this.isTouch)
                            this.endDrag();
                        var coors = this.getCoors(e);
                        draging.newMouseX = coors[0];
                        draging.newMouseY = coors[1];
                        e.stopPropagation && e.stopPropagation();
                        return e.returnValue = false;
                    }
                        .bind(this));

                    draging.documentMouseUp = Ucren.addEvent(document, this.TOUCH_END, function () {
                        this.endDrag();
                    }
                        .bind(this));

                    var lx, ly;

                    clearInterval(draging.timer);
                    draging.timer = setInterval(function () {
                        var x, y, dx, dy;
                        if (draging.newMouseX != lx && draging.newMouseY != ly) {
                            lx = draging.newMouseX;
                            ly = draging.newMouseY;
                            dx = draging.newMouseX - draging.mouseX;
                            dy = draging.newMouseY - draging.mouseY;
                            x = draging.x + dx;
                            y = draging.y + dy;
                            if (this.type == "calc") {
                                this.returnValue(dx, dy, draging.newMouseX, draging.newMouseY);
                            } else {
                                target.left(x).top(y);
                            }
                        }
                    }
                        .bind(this), 10);
                },

                //private
                unRegisterDocumentEvent: function () {
                    var draging = this.target.draging;
                    Ucren.delEvent(document, this.TOUCH_MOVE, draging.documentMouseMove);
                    Ucren.delEvent(document, this.TOUCH_END, draging.documentMouseUp);
                    Ucren.delEvent(document, "selectstart", draging.documentSelectStart);
                    clearInterval(draging.timer);
                },

                //private
                returnValue: function (dx, dy, x, y) {//todo something
                }
            });

        // Ucren.Template
        Ucren.Template = Ucren.Class(/* constructor */
            function () {
                this.string = join.call(arguments, "");
            },
            /* methods */
            {
                apply: function (conf) {
                    return this.string.format(conf);
                }
            });

        // Ucren.BasicElement
        Ucren.BasicElement = Ucren.Class(/* constructor */
            function (el) {
                this.dom = el;
                this.countMapping = {};
            },
            /* methods */
            {
                isUcrenElement: true,

                attr: function (name, value) {
                    if (typeof value == "string") {
                        this.dom.setAttribute(name, value);
                    } else {
                        return this.dom.getAttribute(name);
                    }
                    return this;
                },

                style: function (/* unknown1, unknown2 */
                ) {
                    var getStyle = Ucren.isIe ? function (name) {
                        return this.dom.currentStyle[name];
                    }
                        :
                        function (name) {
                            var style;
                            style = document.defaultView.getComputedStyle(this.dom, null);
                            return style.getPropertyValue(name);
                        }
                        ;

                    return function (unknown1, unknown2) {
                        if (typeof unknown1 == "object") {
                            Ucren.each(unknown1, function (value, key) {
                                this[key] = value;
                            }
                                .bind(this.dom.style));
                        } else if (typeof unknown1 == "string" && typeof unknown2 == "undefined") {
                            return getStyle.call(this, unknown1);
                        } else if (typeof unknown1 == "string" && typeof unknown2 != "undefined") {
                            this.dom.style[unknown1] = unknown2;
                        }
                        return this;
                    }
                        ;
                }(),

                hasClass: function (name) {
                    var className = " " + this.dom.className + " ";
                    return className.indexOf(" " + name + " ") > -1;
                },

                setClass: function (name) {
                    if (typeof (name) == "string")
                        this.dom.className = name.trim();
                    return this;
                },

                addClass: function (name) {
                    var el, className;
                    el = this.dom;
                    className = " " + el.className + " ";
                    if (className.indexOf(" " + name + " ") == -1) {
                        className += name;
                        className = className.trim();
                        className = className.replace(/ +/g, " ");
                        el.className = className;
                    }
                    return this;
                },

                delClass: function (name) {
                    var el, className;
                    el = this.dom;
                    className = " " + el.className + " ";
                    if (className.indexOf(" " + name + " ") > -1) {
                        className = className.replace(" " + name + " ", " ");
                        className = className.trim();
                        className = className.replace(/ +/g, " ");
                        el.className = className;
                    }
                    return this;
                },

                html: function (html) {
                    var el = this.dom;

                    if (typeof html == "string") {
                        el.innerHTML = html;
                    } else if (html instanceof Array) {
                        el.innerHTML = html.join("");
                    } else {
                        return el.innerHTML;
                    }
                    return this;
                },

                left: function (number) {
                    var el = this.dom;
                    if (typeof (number) == "number") {
                        el.style.left = number + "px";
                        this.fireEvent("infect", [{
                            left: number
                        }]);
                    } else {
                        return this.getPos().x;
                    }
                    return this;
                },

                top: function (number) {
                    var el = this.dom;
                    if (typeof (number) == "number") {
                        el.style.top = number + "px";
                        this.fireEvent("infect", [{
                            top: number
                        }]);
                    } else {
                        return this.getPos().y;
                    }
                    return this;
                },

                width: function (unknown) {
                    var el = this.dom;
                    if (typeof unknown == "number") {
                        el.style.width = unknown + "px";
                        this.fireEvent("infect", [{
                            width: unknown
                        }]);
                    } else if (typeof unknown == "string") {
                        el.style.width = unknown;
                        this.fireEvent("infect", [{
                            width: unknown
                        }]);
                    } else {
                        return this.getSize().width;
                    }
                    return this;
                },

                height: function (unknown) {
                    var el = this.dom;
                    if (typeof unknown == "number") {
                        el.style.height = unknown + "px";
                        this.fireEvent("infect", [{
                            height: unknown
                        }]);
                    } else if (typeof unknown == "string") {
                        el.style.height = unknown;
                        this.fireEvent("infect", [{
                            height: unknown
                        }]);
                    } else {
                        return this.getSize().height;
                    }
                    return this;
                },

                count: function (name) {
                    return this.countMapping[name] = ++this.countMapping[name] || 1;
                },

                display: function (bool) {
                    var dom = this.dom;
                    if (typeof (bool) == "boolean") {
                        dom.style.display = bool ? "block" : "none";
                        this.fireEvent("infect", [{
                            display: bool
                        }]);
                    } else {
                        return this.style("display") != "none";
                    }
                    return this;
                },

                first: function () {
                    var c = this.dom.firstChild;
                    while (c && !c.tagName && c.nextSibling) {
                        c = c.nextSibling;
                    }
                    return c;
                },

                add: function (dom) {
                    var el;
                    el = Ucren.Element(dom);
                    this.dom.appendChild(el.dom);
                    return this;
                },

                remove: function (dom) {
                    var el;
                    if (dom) {
                        el = Ucren.Element(dom);
                        el.html("");
                        this.dom.removeChild(el.dom);
                    } else {
                        el = Ucren.Element(this.dom.parentNode);
                        el.remove(this);
                    }
                    return this;
                },

                insert: function (dom) {
                    var tdom;
                    tdom = this.dom;
                    if (tdom.firstChild) {
                        tdom.insertBefore(dom, tdom.firstChild);
                    } else {
                        this.add(dom);
                    }
                    return this;
                },

                addEvents: function (conf) {
                    var blank, el, rtn;
                    blank = {};
                    rtn = {};
                    el = this.dom;
                    Ucren.each(conf, function (item, key) {
                        rtn[key] = Ucren.addEvent(el, key, item);
                    });
                    return rtn;
                },

                removeEvents: function (conf) {
                    var blank, el;
                    blank = {};
                    el = this.dom;
                    Ucren.each(conf, function (item, key) {
                        Ucren.delEvent(el, key, item);
                    });
                    return this;
                },

                getPos: function () {
                    var el, parentNode, pos, box, offset;
                    el = this.dom;
                    pos = {};

                    if (el.getBoundingClientRect) {
                        box = el.getBoundingClientRect();
                        offset = Ucren.isIe ? 2 : 0;
                        var doc = document;
                        var scrollTop = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
                        var scrollLeft = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
                        return {
                            x: box.left + scrollLeft - offset,
                            y: box.top + scrollTop - offset
                        };
                    } else {
                        pos = {
                            x: el.offsetLeft,
                            y: el.offsetTop
                        };
                        parentNode = el.offsetParent;
                        if (parentNode != el) {
                            while (parentNode) {
                                pos.x += parentNode.offsetLeft;
                                pos.y += parentNode.offsetTop;
                                parentNode = parentNode.offsetParent;
                            }
                        }
                        if (Ucren.isSafari && this.style("position") == "absolute") {
                            // safari doubles in some cases
                            pos.x -= document.body.offsetLeft;
                            pos.y -= document.body.offsetTop;
                        }
                    }

                    if (el.parentNode) {
                        parentNode = el.parentNode;
                    } else {
                        parentNode = null;
                    }

                    while (parentNode && parentNode.tagName.toUpperCase() != "BODY" && parentNode.tagName.toUpperCase() != "HTML") {
                        // account for any scrolled ancestors
                        pos.x -= parentNode.scrollLeft;
                        pos.y -= parentNode.scrollTop;
                        if (parentNode.parentNode) {
                            parentNode = parentNode.parentNode;
                        } else {
                            parentNode = null;
                        }
                    }

                    return pos;
                },

                getSize: function () {
                    var dom = this.dom;
                    var display = this.style("display");

                    if (display && display !== "none") {
                        return {
                            width: dom.offsetWidth,
                            height: dom.offsetHeight
                        };
                    }

                    var style = dom.style;
                    var originalStyles = {
                        visibility: style.visibility,
                        position: style.position,
                        display: style.display
                    };

                    var newStyles = {
                        visibility: "hidden",
                        display: "block"
                    };

                    if (originalStyles.position !== "fixed")
                        newStyles.position = "absolute";

                    this.style(newStyles);

                    var dimensions = {
                        width: dom.offsetWidth,
                        height: dom.offsetHeight
                    };

                    this.style(originalStyles);

                    return dimensions;
                },

                observe: function (el, fn) {
                    el = Ucren.Element(el);
                    el.on("infect", fn.bind(this));
                    return this;
                },

                usePNGbackground: function (image) {
                    var dom;
                    dom = this.dom;
                    if (/\.png$/i.test(image) && Ucren.isIe6) {
                        dom.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader( src='" + image + "',sizingMethod='scale' );";
                        /// 	_background: none;
                        ///  _filter: progid:DXImageTransform.Microsoft.AlphaImageLoader( src='images/pic.png',sizingMethod='scale' );
                    } else {
                        dom.style.backgroundImage = "url( " + image + " )";
                    }
                    return this;
                },

                setAlpha: function () {
                    var reOpacity = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/;
                    return function (value) {
                        var element = this.dom
                            , es = element.style;
                        if (!Ucren.isIe) {
                            es.opacity = value / 100;
                            /* }else if( es.filter === "string" ){ */
                        } else {
                            if (element.currentStyle && !element.currentStyle.hasLayout)
                                es.zoom = 1;

                            if (reOpacity.test(es.filter)) {
                                value = value >= 99.99 ? "" : ("alpha( opacity=" + value + " )");
                                es.filter = es.filter.replace(reOpacity, value);
                            } else {
                                es.filter += " alpha( opacity=" + value + " )";
                            }
                        }
                        return this;
                    }
                        ;
                }(),

                fadeIn: function (callback) {
                    if (typeof this.fadingNumber == "undefined")
                        this.fadingNumber = 0;
                    this.setAlpha(this.fadingNumber);

                    var fading = function () {
                        this.setAlpha(this.fadingNumber);
                        if (this.fadingNumber == 100) {
                            clearInterval(this.fadingInterval);
                            callback && callback();
                        } else
                            this.fadingNumber += 10;
                    }
                        .bind(this);

                    this.display(true);
                    clearInterval(this.fadingInterval);
                    this.fadingInterval = setInterval(fading, Ucren.isIe ? 20 : 30);

                    return this;
                },

                fadeOut: function (callback) {
                    if (typeof this.fadingNumber == "undefined")
                        this.fadingNumber = 100;
                    this.setAlpha(this.fadingNumber);

                    var fading = function () {
                        this.setAlpha(this.fadingNumber);
                        if (this.fadingNumber == 0) {
                            clearInterval(this.fadingInterval);
                            this.display(false);
                            callback && callback();
                        } else
                            this.fadingNumber -= 10;
                    }
                        .bind(this);

                    clearInterval(this.fadingInterval);
                    this.fadingInterval = setInterval(fading, Ucren.isIe ? 20 : 30);

                    return this;
                },

                useMouseAction: function (className, actions) {
                    /**
                         *  调用示例:  el.useMouseAction( "xbutton", "over,out,down,up" );
                         *  使用效果:  el 会在 "xbutton xbutton-over","xbutton xbutton-out","xbutton xbutton-down","xbutton xbutton-up"
                         *             等四个 className 中根据相应的鼠标事件来进行切换。
                         *  特别提示:  useMouseAction 可使用不同参数多次调用。
                         */
                    if (!this.MouseAction)
                        this.MouseAction = new Ucren.MouseAction({
                            element: this
                        });
                    this.MouseAction.use(className, actions);
                    return this;
                }
            });

        if (Ucren.isIe)
            document.execCommand("BackgroundImageCache", false, true);

        for (var i in Ucren) {
            exports[i] = Ucren[i];
        }
        ;
        return exports;
    });

    define("scripts/object/background.js", function (exports) {
        var Ucren = require("scripts/lib/ucren");
        var layer = require("scripts/layer");
        var timeline = require("scripts/timeline");
        var image, time;

        var random = Ucren.randomNumber;

        exports.set = function () {
            image = layer.createImage("default", "images/background.jpg", 0, 0, window.innerWidth, window.innerHeight);
        }
            ;

        exports.wobble = function () {
            time = timeline.setInterval(wobble, 50);
        }
            ;

        exports.stop = function () {
            time.stop();
            image.attr({
                x: 0,
                y: 0
            });
        }
            ;

        function wobble() {
            var x, y;
            x = random(12) - 6;
            y = random(12) - 6;
            image.attr({
                x: x,
                y: y
            });
        }
        ;;
        return exports;
    });

    define("scripts/object/console.js", function (exports) {
        var layer = require("scripts/layer");

        var x = 16
            , y = 0;
        var texts = [];

        exports.set = function () {
        }
            ;

        exports.clear = function () {
            for (var i = 0, l = texts.length; i < l; i++)
                texts[i].remove();
            texts.length = y = 0;
        }
            ;

        exports.log = function (text) {
            y += 20;
            texts.push(layer.createText("default", text, x, y));
        }
            ;
        ;
        return exports;
    });

    define("scripts/object/developing.js", function (exports) {
        var layer = require("scripts/layer");
        var tween = require("scripts/lib/tween");
        var timeline = require("scripts/timeline");
        var message = require("scripts/message");

        var exponential = tween.exponential.co;

        /**
         * "coming soon" 模块
         */

        exports.anims = [];

        exports.set = function () {
            this.image = layer.createImage("default", "images/developing.png", window.innerWidth / 2 - 250, window.innerHeight / 2 - 35, 500, 70).hide().scale(1e-5, 1e-5);
        }
            ;

        exports.show = function (start) {
            timeline.createTask({
                start: start,
                duration: 500,
                data: [1e-5, 1, "show"],
                object: this,
                onTimeUpdate: this.onZooming,
                onTimeStart: this.onZoomStart,
                onTimeEnd: this.onZoomEnd,
                recycle: this.anims
            });

            this.hide(2000);
        }
            ;

        exports.hide = function (start) {
            timeline.createTask({
                start: start,
                duration: 500,
                data: [1, 1e-5, "hide"],
                object: this,
                onTimeUpdate: this.onZooming,
                onTimeStart: this.onZoomStart,
                onTimeEnd: this.onZoomEnd,
                recycle: this.anims
            });
        }
            ;

        // 显示/隐藏 相关

        exports.onZoomStart = function () {
            this.image.show();
        }
            ;

        exports.onZooming = function (time, sz, ez, z) {
            this.image.scale(z = exponential(time, sz, ez - sz, 500), z);
        }
            ;

        exports.onZoomEnd = function (sz, ez, mode) {
            if (mode === "hide")
                this.image.hide();
        }
            ;
        ;
        return exports;
    });

    define("scripts/object/dojo.js", function (exports) {
        var rotate = require("scripts/factory/rotate");
        var tween = require("scripts/lib/tween");

        exports = rotate.create("images/dojo.png", width * 0.2 - 80, height * 0.5 - 93, 175, 175, 1e-5, tween.exponential.co, 500);
        ;
        return exports;
    });

    define("scripts/object/flame.js", function (exports) {

        /**
         * 火焰模块
         * @author zswang, dron
         */

        var layer = require("scripts/layer").getLayer("fruit");
        var timeline = require("scripts/timeline");
        var Ucren = require("scripts/lib/ucren");

        /*
        raphael.path('M 27,122 Q 9,42 27,21 45,42 27,122')
            .attr({
                stroke: 'none',
                fill: '180-#D8D380-#EDED7A-#D8D380'
            });
        */

        // 缩写
        var math = Math
            , cos = math.cos
            , sin = math.sin
            , trunc = parseInt
            , random = math.random
            , PI = math.PI;

        var guid = 0;

        /**
         * 添加一个火苗
         * @param{Array} center 中心位置 单位像素
         * @param{Number} angle 运动方向 单位幅度
         * @param{Number} length 运动长度 单位像素
         * @param{Number} life 存活时间 单位毫秒
         */
        function appendFlame(center, angle, length, life, flames) {
            return flames[guid] = {
                id: guid++,
                birthday: new Date,
                center: center,
                angle: angle,
                length: length,
                life: life,
                path: layer.path().attr({
                    stroke: 'none',
                    fill: trunc(angle * 180 / PI) + '-#fafad9-#f0ef9c'
                })
            };
        }

        var radius = 15;

        function updateFlame(flames, n) {
            var item = flames[n];

            if (!item)
                return;

            var age, center, p1, p2, p3, p4;

            age = 1 - (new Date - item.birthday) / item.life;

            if (age <= 0) {
                item.path.remove();
                delete flames[item.id];
                return;
            }

            var ia, ic, il;

            ia = item.angle;
            ic = item.center;
            il = item.length;

            center = [trunc(ic[0] + cos(ia) * il * (1 - age)), trunc(ic[1] + sin(ia) * il * (1 - age))];
            p1 = [trunc(center[0] - cos(ia) * radius * age), trunc(center[1] - sin(ia) * radius * age)];
            p2 = [trunc(center[0] + cos(ia) * radius * age), trunc(center[1] + sin(ia) * radius * age)];
            p3 = [trunc(center[0] - cos(ia + .5 * PI) * radius * .4 * age), trunc(center[1] - sin(ia + .5 * PI) * radius * .4 * age)];
            p4 = [trunc(center[0] - cos(ia - .5 * PI) * radius * .4 * age), trunc(center[1] - sin(ia - .5 * PI) * radius * .4 * age)];

            item.path.attr({
                path: 'M' + p1 + ' Q' + [p3, p2, p4, p1].join(' ')
            });
        }
        ;
        function removeFlame(flames, n) {
            var item = flames[n];

            if (!item)
                return;

            item.path.remove();
            delete flames[n];
        }
        ;
        exports.create = function (ox, oy, start) {
            var timer1, timer2;

            var object = {
                pos: function (x, y) {
                    nx = x;
                    ny = y;
                    image.attr("x", nx - 21).attr("y", ny - 21);
                },

                remove: function () {
                    [timer1, timer2].invoke("stop");
                    image.remove();

                    for (var p in flames)
                        removeFlame(flames, p);
                }
            };

            var nx = ox
                , ny = oy;
            var image = layer.image("images/smoke.png", nx - 21, ny - 21, 43, 43).hide();
            var flames = {};

            timer1 = timeline.setTimeout(function () {
                image.show();
                timer2 = timeline.setInterval(function () {
                    if (random() < 0.9)
                        appendFlame([nx, ny], PI * 2 * random(), 60, 200 + 500 * random(), flames);

                    for (var p in flames)
                        updateFlame(flames, p);

                }, Ucren.isIe ? 20 : 40);

            }, start || 0);

            return object;
        }
            ;
        ;
        return exports;
    });

    define("scripts/object/flash.js", function (exports) {
        /**
         *
         */

        var layer = require("scripts/layer");
        var timeline = require("scripts/timeline").use("flash").init(10);
        var tween = require("scripts/lib/tween");
        var sound = require("scripts/lib/sound");

        var image, snd, xDiff = 0, yDiff = 0;

        var anim = tween.quadratic.cio;
        var anims = [];
        var dur = 100;

        exports.set = function () {
            image = layer.createImage("flash", "images/flash.png", 0, 0, 358, 20).hide();
            snd = sound.create("sound/splatter");
        }
            ;

        exports.showAt = function (x, y, an) {
            image.rotate(an, true).scale(1e-5, 1e-5).attr({
                x: x + xDiff,
                y: y + yDiff
            }).show();

            anims.clear && anims.clear();

            snd.play();

            timeline.createTask({
                start: 0,
                duration: dur,
                data: [1e-5, 1],
                object: this,
                onTimeUpdate: this.onTimeUpdate,
                recycle: anims
            });

            timeline.createTask({
                start: dur,
                duration: dur,
                data: [1, 1e-5],
                object: this,
                onTimeUpdate: this.onTimeUpdate,
                recycle: anims
            });
        }
            ;

        exports.onTimeUpdate = function (time, a, b, z) {
            image.scale(z = anim(time, a, b - a, dur), z);
        }
            ;
        ;
        return exports;
    });

    define("scripts/object/fps.js", function (exports) {
        // var layer = require("scripts/layer");
        // var timeline =require("scripts/timeline");

        // var text, fps = "fps: ";

        // exports.set = function(){
        // 	text = layer.createText( "default", fps + "0", 4, 470 ).attr( "fill", "#ccc" );
        // };

        // exports.update = function(){
        // 	text.attr( "text", fps + ( timeline.getFPS() >> 0 ) );
        // };;

        return exports;
    });

    define("scripts/object/game-over.js", function (exports) {
        var layer = require("scripts/layer");
        var tween = require("scripts/lib/tween");
        var timeline = require("scripts/timeline");
        var message = require("scripts/message");
        var state = require("scripts/state");

        var exponential = tween.exponential.co;

        /**
         * "game-over"模块
         */

        exports.anims = [];

        exports.set = function () {
            // this.image = layer.createImage("default", "images/game-over.png", 75, 198, 490, 85).hide().scale(1e-5, 1e-5);
            this.image = layer.createImage("default", "images/game-over.png", window.innerWidth * 0.3, window.innerHeight * 0.4, window.innerWidth * 0.4, window.innerHeight * 0.2).hide().scale(1e-5, 1e-5);
        }
            ;

        exports.show = function (start) {
            timeline.createTask({
                start: start,
                duration: 500,
                data: [1e-5, 1, "show"],
                object: this,
                onTimeUpdate: this.onZooming,
                onTimeStart: this.onZoomStart,
                onTimeEnd: this.onZoomEnd,
                recycle: this.anims
            });
        }
            ;

        exports.hide = function (start) {
            timeline.createTask({
                start: start,
                duration: 500,
                data: [1, 1e-5, "hide"],
                object: this,
                onTimeUpdate: this.onZooming,
                onTimeStart: this.onZoomStart,
                onTimeEnd: this.onZoomEnd,
                recycle: this.anims
            });
        }
            ;

        // 显示/隐藏 相关

        exports.onZoomStart = function (sz, ez, mode) {
            if (mode == "show")
                this.image.show();
        }
            ;

        exports.onZooming = function (time, sz, ez, z) {
            this.image.scale(z = exponential(time, sz, ez - sz, 500), z);
        }
            ;

        exports.onZoomEnd = function (sz, ez, mode) {
            if (mode == "show")
                state("click-enable").on();
            else if (mode === "hide")
                this.image.hide();
        }
            ;
        ;
        return exports;
    });

    define("scripts/object/home-desc.js", function (exports) {
        var displacement = require("scripts/factory/displacement");
        var tween = require("scripts/lib/tween");

        exports = displacement.create("images/home-desc.png", 161, 91, -161, 140, 7, 127, tween.exponential.co, 500);
        ;
        return exports;
    });

    define("scripts/object/home-mask.js", function (exports) {
        var displacement = require("scripts/factory/displacement");
        var tween = require("scripts/lib/tween");

        exports = displacement.create("images/home-mask.png", window.innerWidth, 183, 0, -183, 0, 0, tween.exponential.co, 1e3);
        ;
        return exports;
    });

    define("scripts/object/knife.js", function (exports) {
        var timeline = require("scripts/timeline");
        var layer = require("scripts/layer").getLayer("knife");
        var Ucren = require("scripts/lib/ucren");

        /**
         * 刀光模块
         */

        var lastX = null
            , lastY = null;
        var abs = Math.abs;

        var life = 200;
        var stroke = 10;
        var color = "#cbd3db";
        var anims = [];
        var switchState = true;
        var knifes = [];

        function ClassKnifePart(conf) {
            this.sx = conf.sx;
            this.sy = conf.sy;
            this.ex = conf.ex;
            this.ey = conf.ey;

            knifes.push(this);
        }

        ClassKnifePart.prototype.set = function () {
            var sx, sy, ex, ey, dx, dy, ax, ay;

            sx = this.sx;
            sy = this.sy;
            ex = this.ex;
            ey = this.ey;

            dx = sx - ex;
            dy = sy - ey;
            ax = abs(dx);
            ay = abs(dy);

            if (ax > ay)
                sx += dx < 0 ? -1 : 1,
                    sy += dy < 0 ? -(1 * ay / ax) : 1 * ay / ax;
            else
                sx += dx < 0 ? -(1 * ax / ay) : 1 * ax / ay,
                    sy += dy < 0 ? -1 : 1;

            this.line = layer.path("M" + sx + "," + sy + "L" + ex + "," + ey).attr({
                "stroke": color,
                "stroke-width": stroke + "px"
            });

            timeline.createTask({
                start: 0,
                duration: life,
                object: this,
                onTimeUpdate: this.update,
                onTimeEnd: this.end,
                recycle: anims
            });
            return this;
        }
            ;

        ClassKnifePart.prototype.update = function (time) {
            this.line.attr("stroke-width", stroke * (1 - time / life) + "px");
        }
            ;

        ClassKnifePart.prototype.end = function () {
            this.line.remove();

            var index;
            if (index = knifes.indexOf(this))
                knifes.splice(index, 1);
        }
            ;

        exports.newKnife = function () {
            lastX = lastY = null;
        }
            ;

        exports.through = function (x, y) {
            if (!switchState)
                return;
            var ret = null;
            if (lastX !== null && (lastX != x || lastY != y))
                new ClassKnifePart({
                    sx: lastX,
                    sy: lastY,
                    ex: x,
                    ey: y
                }).set(),
                    ret = [lastX, lastY, x, y];

            lastX = x;
            lastY = y;
            return ret;
        }
            ;

        exports.pause = function () {
            anims.clear();
            this.switchOff();
        }
            ;

        exports.switchOff = function () {
            switchState = false;
        }
            ;

        exports.switchOn = function () {
            switchState = true;
            this.endAll();
        }
            ;

        exports.endAll = function () {
            for (var i = knifes.length - 1; i >= 0; i--)
                knifes[i].end();
        }
            ;
        ;
        return exports;
    });

    define("scripts/object/light.js", function (exports) {
        /**
         * 炸弹爆炸时的光线
         */

        var layer = require("scripts/layer");

        var maskLayer = layer.getLayer("mask");
        layer = layer.getLayer("light");

        var Ucren = require("scripts/lib/ucren");
        var timeline = require("scripts/timeline");
        var message = require("scripts/message");

        var random = Ucren.randomNumber;
        var pi = Math.PI;
        var sin = Math.sin;
        var cos = Math.cos;

        var lights = [];
        var indexs = [];
        var lightsNum = 10;

        for (var i = 0; i < lightsNum; i++)
            indexs[i] = i;

        exports.start = function (boom) {
            var x = boom.originX
                , y = boom.originY
                , time = 0
                , idx = indexs.random();

            var i = lightsNum
                , b = function () {
                    build(x, y, idx[this]);
                };

            while (i--)
                timeline.setTimeout(b.bind(i), time += 100);

            timeline.setTimeout(function () {
                this.overWhiteLight();
            }
                .bind(this), time + 100);
        }
            ;

        exports.overWhiteLight = function () {
            message.postMessage("overWhiteLight.show");
            this.removeLights();

            var dur = 4e3;
            var mask = maskLayer.rect(0, 0, window.innerWidth, window.innerHeight).attr({
                fill: "#fff",
                stroke: "none"
            });
            var control = {
                onTimeUpdate: function (time) {
                    mask.attr("opacity", 1 - time / dur);
                },

                onTimeEnd: function () {
                    mask.remove();
                    message.postMessage("game.over");
                }
            };

            timeline.createTask({
                start: 0,
                duration: dur,
                object: control,
                onTimeUpdate: control.onTimeUpdate,
                onTimeEnd: control.onTimeEnd
            });

        }
            ;

        exports.removeLights = function () {
            for (var i = 0, l = lights.length; i < l; i++)
                lights[i].remove();
            lights.length = 0;
        }
            ;

        function build(x, y, r) {
            var a1, a2, x1, y1, x2, y2;

            a1 = r * 36 + random(10);
            a2 = a1 + 5;

            a1 = pi * a1 / 180;
            a2 = pi * a2 / 180;

            x1 = x + window.innerWidth * cos(a1);
            y1 = y + window.innerWidth * sin(a1);

            x2 = x + window.innerWidth * cos(a2);
            y2 = y + window.innerWidth * sin(a2);

            var light = layer.path(["M", x, y, "L", x1, y1, "L", x2, y2, "Z"]).attr({
                stroke: "none",
                fill: "#fff"
            });

            lights.push(light);
        }
        ;
        return exports;
    });

    define("scripts/object/logo.js", function (exports) {
        var displacement = require("scripts/factory/displacement");
        var tween = require("scripts/lib/tween");

        exports = displacement.create("uploads/logo1.png", 338, 135, 17, -182, 17, 1, tween.exponential.co, 1e3);
        ;
        return exports;
    });

    define("scripts/object/lose.js", function (exports) {
        var layer = require("scripts/layer");
        var tween = require("scripts/lib/tween");
        var timeline = require("scripts/timeline");
        var Ucren = require("scripts/lib/ucren");
        var message = require("scripts/message");

        var anim = tween.exponential.co;
        var back = tween.back.co;

        /**
         * 
         */

        var o1, o2, o3, animLength = 500;

        var conf1 = {
            src: "",
            // sx: 650,
            // ex: 561,
            sx: window.innerWidth - 190,
            ex: window.innerWidth - 278,
            y: 5,
            // w: 22,
            // h: 19
            w: 50,
            h: 47
        };
        var conf2 = {
            src: "",
            // sx: 671,
            // ex: 582,
            sx: window.innerWidth - 120,
            ex: window.innerWidth - 209,
            y: 5,
            // w: 27,
            // h: 26
            w: 55,
            h: 54
        };
        var conf3 = {
            src: "",
            // sx: 697,
            // ex: 608,
            sx: window.innerWidth - 50,
            ex: window.innerWidth - 139,
            y: 6,
            // w: 31,
            // h: 32
            w: 60,
            h: 59
        };

        var number = 0;

        exports.anims = [];

        exports.set = function () {
            o1 = layer.createImage("default", conf1.src, conf1.sx, conf1.y, conf1.w, conf1.h).hide();
            o2 = layer.createImage("default", conf2.src, conf2.sx, conf2.y, conf2.w, conf2.h).hide();
            o3 = layer.createImage("default", conf3.src, conf3.sx, conf3.y, conf3.w, conf3.h).hide();
        }
            ;

        exports.reset = function () {
            number = 0;
            [[o1, conf1], [o2, conf2], [o3, conf3]].forEach(function (infx) {
                infx[0].attr("src", infx[1].src.replace("xf.png", "x.png"));
            })
        }
            ;

        exports.show = function (start) {
            timeline.createTask({
                start: start,
                duration: animLength,
                data: ["show", conf1.sx, conf1.ex, conf2.sx, conf2.ex, conf3.sx, conf3.ex],
                object: this,
                onTimeUpdate: this.onTimeUpdate,
                onTimeStart: this.onTimeStart,
                onTimeEnd: this.onTimeEnd,
                recycle: this.anims
            });
        }
            ;

        exports.hide = function (start) {
            timeline.createTask({
                start: start,
                duration: animLength,
                data: ["hide", conf1.ex, conf1.sx, conf2.ex, conf2.sx, conf3.ex, conf3.sx],
                object: this,
                onTimeUpdate: this.onTimeUpdate,
                onTimeStart: this.onTimeStart,
                onTimeEnd: this.onTimeEnd,
                recycle: this.anims
            });
        }
            ;

        exports.showLoseAt = function (x) {

            var infx, inf = [[o1, conf1], [o2, conf2], [o3, conf3]];

            createPosShow(x);

            infx = inf[(++number) - 1];
            infx[0].attr("src", infx[1].src.replace("x.png", "xf.png")).scale(1e-5, 1e-5);
            this.scaleImage(infx[0]);

            if (number == 3)
                message.postMessage("game.over");
        }
            ;

        exports.scaleImage = function (image) {
            var dur = 500;

            image.myOnScaling = image.myOnScaling || function (time, z) {
                this.scale(z = back(time, 1e-5, 1 - 1e-5, dur), z);
            }
                ;

            image.myOnScaleEnd = image.myOnScaleEnd || function () {
                this.scale(1, 1);
            }
                ;

            timeline.createTask({
                start: 0,
                duration: dur,
                object: image,
                onTimeUpdate: image.myOnScaling,
                onTimeEnd: image.myOnScaleEnd,
                recycle: this.anims
            });
        }
            ;

        // 显示/隐藏 相关

        exports.onTimeUpdate = function (time, mode, x1s, x1e, x2s, x2e, x3s, x3e) {
            o1.attr("x", anim(time, x1s, x1e - x1s, animLength));
            o2.attr("x", anim(time, x2s, x2e - x2s, animLength));
            o3.attr("x", anim(time, x3s, x3e - x3s, animLength));
        }
            ;

        exports.onTimeStart = function (mode) {
            if (mode == "show")
                [o1, o2, o3].invoke("show");
        }
            ;

        exports.onTimeEnd = function (mode) {
            if (mode == "hide")
                [o1, o2, o3].invoke("hide"),
                    this.reset();
        }
            ;

        function createPosShow(x) {
            var image = layer.createImage("default", "images/lose.png", x - 27, 406, 54, 50).scale(1e-5, 1e-5);
            var duration = 500;

            var control = {
                show: function (start) {
                    timeline.createTask({
                        start: start,
                        duration: duration,
                        data: [tween.back.co, 1e-5, 1],
                        object: this,
                        onTimeUpdate: this.onScaling,
                        onTimeEnd: this.onShowEnd // recycle: anims
                    });
                },

                hide: function (start) {
                    timeline.createTask({
                        start: start,
                        duration: duration,
                        data: [tween.back.ci, 1, 1e-5],
                        object: this,
                        onTimeUpdate: this.onScaling,
                        onTimeEnd: this.onHideEnd // recycle: anims
                    });
                },

                onScaling: function (time, anim, a, b, z) {
                    image.scale(z = anim(time, a, b - a, duration), z);
                },

                onShowEnd: function () {
                    this.hide(1500);
                },

                onHideEnd: function () {
                    image.remove();
                }
            };

            control.show(200);
        }
        ;
        return exports;
    });

    define("scripts/object/new-game.js", function (exports) {
        var rotate = require("scripts/factory/rotate");
        var tween = require("scripts/lib/tween");


        // exports = rotate.create("images/new-game.png", 244, 231, 195, 195, 1e-5, tween.exponential.co, 500);
        exports = rotate.create("images/new-game.png", width * 0.5 - 86, height * 0.5 - 91, 195, 195, 1e-5, tween.exponential.co, 500);
        ;
        return exports;
    });

    define("scripts/object/new.js", function (exports) {
        var layer = require("scripts/layer");
        var tween = require("scripts/lib/tween");
        var timeline = require("scripts/timeline");
        var Ucren = require("scripts/lib/ucren");

        var image;
        var cycleTime = 300;

        var sx = 129
            , sy = 328
            , ex = 170
            , ey = 221
            , sw = 0
            , sh = 0
            , ew = 70
            , eh = 42
            , dy = 8;

        var showAnim = tween.exponential.co;
        var jumpAnim = tween.quadratic.ci;

        exports.anims = [];

        exports.set = function () {
            image = layer.createImage("default", "images/new.png", sx, sy, sw, sh);
        }
            ;

        exports.unset = function () {
        }
            ;

        exports.show = function (start) {
            timeline.createTask({
                start: start,
                duration: 500,
                data: [sx, ex, sy, ey, sw, ew, sh, eh],
                object: this,
                onTimeUpdate: this.onShowing,
                onTimeStart: this.onShowStart,
                onTimeEnd: this.onShowEnd,
                recycle: this.anims
            });
        }
            ;

        exports.hide = function (start) {
            this.anims.clear();
            timeline.createTask({
                start: start,
                duration: 500,
                data: [ex, sx, ey, sy, ew, sw, eh, sh],
                object: this,
                onTimeUpdate: this.onShowing,
                recycle: this.anims
            });
        }
            ;

        exports.jump = function () {
            this.anims.clear();
            timeline.createTask({
                start: 0,
                duration: -1,
                object: this,
                onTimeUpdate: this.onJumping,
                recycle: this.anims
            });
        }
            ;

        // 显示相关

        exports.onShowStart = function () { }
            ;

        exports.onShowing = function (time, sx, ex, sy, ey, sw, ew, sh, eh) {
            image.attr({
                x: showAnim(time, sx, ex - sx, 500),
                y: showAnim(time, sy, ey - sy, 500),
                width: showAnim(time, sw, ew - sw, 500),
                height: showAnim(time, sh, eh - sh, 500)
            });
        }
            ;

        exports.onShowEnd = function () {
            this.jump();
        }
            ;

        // 跳跃相关

        exports.onJumping = function (time) {
            var t = parseInt(time / cycleTime);

            time = time % cycleTime;
            if (t % 2)
                time = cycleTime - time;

            image.attr("y", jumpAnim(time, ey, dy, cycleTime));
        }
            ;
        ;
        return exports;
    });

    define("scripts/object/ninja.js", function (exports) {
        var displacement = require("scripts/factory/displacement");
        var tween = require("scripts/lib/tween");

        exports = displacement.create("images/ninja.png", 244, 81, 315, -140, 315, 43, {
            show: tween.bounce.co,
            hide: tween.exponential.co
        }, 1e3);
        ;
        return exports;
    });

    define("scripts/object/quit.js", function (exports) {
        var rotate = require("scripts/factory/rotate");
        var tween = require("scripts/lib/tween");

        exports = rotate.create("images/quit.png", width * 0.8 - 59, height * 0.5 - 56, 141, 141, 1e-5, tween.exponential.co, 500);
        ;
        return exports;
    });

    define("scripts/object/score.js", function (exports) {
        var layer = require("scripts/layer");
        var tween = require("scripts/lib/tween");
        var timeline = require("scripts/timeline");
        var Ucren = require("scripts/lib/ucren");

        var setTimeout = timeline.setTimeout.bind(timeline);
        var anim = tween.exponential.co;

        var message = require("scripts/message");

        /**
         * 分数模块
         */

        var image, text1, text2, animLength = 500;
        ;
        // var imageSx = -94
        // 	, imageEx = 6;
        // var text1Sx = -59
        // 	, text1Ex = 41;
        var imageSx = 0
            , imageEx = 100;
        var text1Sx = 70
            , text1Ex = 170;
        var text2Sx = -93
            , text2Ex = 7;

        exports.anims = [];

        exports.set = function () {
            image = layer.createImage("default", "images/score.png", imageSx, 20, 64, 64).hide();
            text1 = layer.createText("default", "0", text1Sx, 56, "90-#fc7f0c-#ffec53", "64px").hide();
            text2 = layer.createText("default", "", text2Sx, 48, "#af7c05", "14px").hide();
        }
            ;

        exports.show = function (start) {
            timeline.createTask({
                start: start,
                duration: animLength,
                data: ["show", imageSx, imageEx, text1Sx, text1Ex, text2Sx, text2Ex],
                object: this,
                onTimeUpdate: this.onTimeUpdate,
                onTimeStart: this.onTimeStart,
                onTimeEnd: this.onTimeEnd,
                recycle: this.anims
            });
        }
            ;

        exports.hide = function (start) {
            timeline.createTask({
                start: start,
                duration: animLength,
                data: ["hide", imageEx, imageSx, text1Ex, text1Sx, text2Ex, text2Sx],
                object: this,
                onTimeUpdate: this.onTimeUpdate,
                onTimeStart: this.onTimeStart,
                onTimeEnd: this.onTimeEnd,
                recycle: this.anims
            });
        }
            ;

        exports.number = function (number) {
            text1.attr("text", number || 0);
            image.scale(1.2, 1.2);
            setTimeout(function () {
                image.scale(1, 1);
            }, 60);
            // message.postMessage( number, "score.change" );
        }
            ;

        // 显示/隐藏 相关

        exports.onTimeUpdate = function (time, mode, isx, iex, t1sx, t1ex, t2sx, t2ex) {
            image.attr("x", anim(time, isx, iex - isx, animLength));
            text1.attr("x", anim(time, t1sx, t1ex - t1sx, animLength));
            text2.attr("x", anim(time, t2sx, t2ex - t2sx, animLength));
        }
            ;

        exports.onTimeStart = function (mode) {
            if (mode === "show")
                [image, text1, text2].invoke("show");
        }
            ;

        exports.onTimeEnd = function (mode) {
            if (mode === "hide")
                [image, text1, text2].invoke("hide"),
                    text1.attr("text", 0);
        }
            ;
        ;
        return exports;
    });


    startModule("scripts/main");
}

function seventh_part() {
    var body = document.body;
    body.innerHTML = ""
    play_music("defalut2.mp3");

    switch_place("现实.png");
    show_people("伽罗.png");
    speaker.show_txt("加罗", "若非那宝物就是解药？");
    HTML.onclick = function () {
        speaker.skip()
        HTML.onclick = function () {
            show_people("孙膑.png");
            speaker.show_txt("孙宾", "也许是的。可它在哪?")
            HTML.onclick = function () {
                speaker.skip()
                HTML.onclick = function () {
                    switch_place("军营2.png")
                    speaker.show_scene("云缨留下血书说明一切缘由呈给皇上。收拾了东西，把珍贵的留给了一直跟随的亲信甲。自己只带些盘缠准备离开。")
                    HTML.onclick = function () {
                        speaker.skip()
                        HTML.onclick = function () {
                            show_people("亲信甲.png");
                            speaker.show_txt("亲信甲", "将军……您要去哪？")
                            HTML.onclick = function () {
                                speaker.skip()
                                HTML.onclick = function () {
                                    show_people("云缨.png");
                                    speaker.show_txt("云缨", "仇已报，只想寻一处地方自己清净。")
                                    HTML.onclick = function () {
                                        speaker.skip()
                                        HTML.onclick = function () {
                                            show_people("云缨.png");
                                            speaker.show_txt("云缨", "这个也给你吧。这是我成年时父亲给我的，他让我好好收着。也许是它救了我，也一定对你有用的。你跟着我这么多年，辛苦你了。?")
                                            HTML.onclick = function () {
                                                speaker.skip()
                                                HTML.onclick = function () {
                                                    show_people("亲信甲.png");
                                                    speaker.show_txt("亲信甲（双手接过，眼中有泪，哽咽）", "……属下一生跟随将军，此生无悔！")
                                                    HTML.onclick = function () {
                                                        speaker.skip()
                                                        HTML.onclick = function () {
                                                            switch_place("现实.png")
                                                            show_people("孙膑.png");
                                                            speaker.show_txt("孙宾", "就是这个！")
                                                            HTML.onclick = function () {
                                                                speaker.skip()
                                                                HTML.onclick = function () {
                                                                    show_people("裴擒虎.png");
                                                                    speaker.show_txt("裴禽虎", "可我们去哪找这个人……")
                                                                    HTML.onclick = function () {
                                                                        speaker.skip()
                                                                        HTML.onclick = function () {
                                                                            show_people("上官婉儿.png");
                                                                            speaker.show_txt("宛儿", "我好像…见过他。")
                                                                            HTML.onclick = function () {
                                                                                speaker.skip()
                                                                                HTML.onclick = function () {
                                                                                    show_people("伽罗.png");
                                                                                    speaker.show_txt("加罗", "你见过？在书上吗？居然有我没读过的史书。")
                                                                                    HTML.onclick = function () {
                                                                                        speaker.skip()
                                                                                        HTML.onclick = function () {
                                                                                            show_people("上官婉儿.png");
                                                                                            speaker.show_txt("宛儿", "不，我是说，我见过他本人。")
                                                                                            HTML.onclick = function () {
                                                                                                speaker.skip()
                                                                                                HTML.onclick = function () {
                                                                                                    speaker.show_scene("宛儿走近目送将军离去的亲信，他们都专注于云缨将军，却未仔细观察过将军身边的人。直到他看见那人腰间一块不起眼的令牌，上面勉强能辨认出“纯”字。")
                                                                                                    HTML.onclick = function () {
                                                                                                        speaker.skip()
                                                                                                        HTML.onclick = function () {
                                                                                                            show_people("上官婉儿.png");
                                                                                                            speaker.show_txt("宛儿", "这人，是我的父亲，上官纯。")
                                                                                                            HTML.onclick = function () {
                                                                                                                speaker.skip()
                                                                                                                HTML.onclick = function () {
                                                                                                                    show_people("伽罗.png");
                                                                                                                    speaker.show_txt("加罗", "你在说什么？这是两千年前的人！")
                                                                                                                    HTML.onclick = function () {
                                                                                                                        speaker.skip()
                                                                                                                        HTML.onclick = function () {
                                                                                                                            show_people("上官婉儿.png");
                                                                                                                            speaker.show_txt("宛儿", "小时候我被一种魔物咬伤，卧病在床多年。母亲日夜照顾，求医问药，最后是一副不知名的药剂把我医好了。")
                                                                                                                            HTML.onclick = function () {
                                                                                                                                speaker.skip()
                                                                                                                                HTML.onclick = function () {
                                                                                                                                    show_people("上官婉儿.png");
                                                                                                                                    speaker.show_txt("宛儿", "但从那以后，我好像不会衰老了。父亲一直在外，我自小没见过几面，只有一小箱遗物留在家里，我也没有打开看过。")
                                                                                                                                    HTML.onclick = function () {
                                                                                                                                        speaker.skip()
                                                                                                                                        HTML.onclick = function () {
                                                                                                                                            show_people("曹操.png");
                                                                                                                                            speaker.show_txt("曹襙", "……所以，东西也许在你家里？")
                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                speaker.skip()
                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                    show_people("上官婉儿.png");
                                                                                                                                                    speaker.show_txt("宛儿", "可能吧。")
                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                        speaker.skip()
                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                            show_people("孙膑.png");
                                                                                                                                                            speaker.show_txt("孙宾", "那我们还不赶快出发!")
                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                speaker.skip()
                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                    show_people("裴擒虎.png");
                                                                                                                                                                    speaker.show_txt("裴禽虎", "嗯，事不宜迟。")
                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                        speaker.skip()
                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                            speaker.show_scene("然而，事与愿违，小队一行人刚出发不久就遇上了NJJC的人，好在宛儿有着一架战机，现在请你驾驶战机突围，达到10000米即可成功突围。")
                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                speaker.skip()
                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                    var bubble = document.getElementById("bubble")

                                                                                                                                                                                    if (bubble) {
                                                                                                                                                                                        bubble.remove()
                                                                                                                                                                                    }

                                                                                                                                                                                    switch_place("NJJC2.png");

                                                                                                                                                                                    var stage = document.createElement('div')
                                                                                                                                                                                    stage.className = "Stage"
                                                                                                                                                                                    stage.style = "width: 100%; min-width: 1200px; height: 100%;";
                                                                                                                                                                                    var mid_cont = document.createElement('div')
                                                                                                                                                                                    mid_cont.style = "width: 100%; height: 100%; position: absolute; z-index: 4; font-size: 120px; text-align: center; font-weight: bold; font-family: Bernard MT Condensed; overflow: hidden;";
                                                                                                                                                                                    mid_cont.className = "mid_cont";

                                                                                                                                                                                    var img = document.createElement('img');
                                                                                                                                                                                    img.src = "uploads/logo1.png"
                                                                                                                                                                                    img.style = "position: absolute; top: 10%; left: 55%; transform: translate(-50%); width: 704px; height: 278px;";
                                                                                                                                                                                    var span = document.createElement('span');
                                                                                                                                                                                    span.innerText = "Start";

                                                                                                                                                                                    mid_cont.appendChild(img);
                                                                                                                                                                                    mid_cont.appendChild(span);

                                                                                                                                                                                    stage.appendChild(mid_cont);
                                                                                                                                                                                    body.appendChild(stage);

                                                                                                                                                                                    span.onclick = function () {
                                                                                                                                                                                        HTML.onclick = function () { };
                                                                                                                                                                                        plane_game();
                                                                                                                                                                                    }

                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function yiwu() {
    var body = document.body;
    body.innerHTML = "";
    play_music("defalut2.mp3");
    switch_place("家2.png")
    speaker.show_scene("在度过了苇泽关的重重困难后, 小队成功拿到了宛儿家中的遗物")
    HTML.onclick = function () {
        speaker.skip()
        HTML.onclick = function () {
            speaker.show_scene("众人拿到遗物，却发现没有云缨将军交出的物品。一切陷入僵局。突然传来诡异的撞门声。")
            HTML.onclick = function () {
                speaker.skip()
                HTML.onclick = function () {
                    show_options("不开门，开始战斗", "冒着危险开门");
                    var option1 = document.getElementById("option1");
                    var option2 = document.getElementById("option2");

                    option1.onclick = function () {
                        clear_options()
                        speaker.show_scene("重重尸海循着人肉味、枪声、叫喊声寻来。")
                        HTML.onclick = function () {
                            speaker.skip();
                            HTML.onclick = function () {
                                show_people("头罩云缨.png")
                                speaker.show_scene("混战后一神秘人出现，用奇怪的东西带所有人回到本次选择。");
                                HTML.onclick = function () {
                                    speaker.skip();
                                    HTML.onclick = function () {
                                        start_game("遗物");
                                    }
                                }
                            }
                        }
                    }

                    option2.onclick = function () {
                        clear_options()
                        show_people("头罩云缨.png")
                        speaker.show_scene("门外是一个带着头罩的神秘人，迅速解决了跟来的几个丧尸。来者露出面容，竟然和云缨将军长得一模一样。")
                        HTML.onclick = function () {
                            speaker.skip();
                            HTML.onclick = function () {
                                show_people("裴擒虎.png")
                                speaker.show_txt("裴禽虎", "你是谁？你要干什么？");
                                HTML.onclick = function () {
                                    speaker.skip();
                                    HTML.onclick = function () {
                                        show_people("云缨.png")
                                        speaker.show_txt("来者", "我是…云缨。");
                                        HTML.onclick = function () {
                                            speaker.skip();
                                            HTML.onclick = function () {
                                                show_people("伽罗.png")
                                                speaker.show_txt("加罗", "怎么可能……");
                                                HTML.onclick = function () {
                                                    speaker.skip();
                                                    HTML.onclick = function () {
                                                        show_people("云缨.png")
                                                        speaker.show_txt("云缨", "当年我报仇之后，回到了苇泽关。太子的阴谋被我搅碎，二皇子如愿登基。他不知我还活着，于是用最高规模的葬礼安葬了我、我丈夫、我父亲还有很多将领。");
                                                        HTML.onclick = function () {
                                                            speaker.skip();
                                                            HTML.onclick = function () {
                                                                show_people("云缨.png")
                                                                speaker.show_txt("云缨", "可我父亲他们的遗体并未找到，我放不下，便又转身去了战场。");
                                                                HTML.onclick = function () {
                                                                    speaker.skip();
                                                                    HTML.onclick = function () {
                                                                        show_people("上官婉儿.png")
                                                                        speaker.show_txt("宛儿", "然后呢？");
                                                                        HTML.onclick = function () {
                                                                            speaker.skip();
                                                                            HTML.onclick = function () {
                                                                                show_people("云缨.png")
                                                                                speaker.show_txt("云缨", "我摸到了敌人的老巢，可没有活人。所有人都被不明武器杀死了。我还在现场发现了这个。");
                                                                                HTML.onclick = function () {
                                                                                    speaker.skip();
                                                                                    HTML.onclick = function () {
                                                                                        show_people("孙膑.png")
                                                                                        speaker.show_txt("孙宾（一把拿过）", "好眼熟啊……这好像是NJJC的东西。");
                                                                                        HTML.onclick = function () {
                                                                                            speaker.skip();
                                                                                            HTML.onclick = function () {
                                                                                                show_people("云缨.png")
                                                                                                speaker.show_txt("云缨", "我不知道……我当时倒腾了一下，这东西一闪就到了这里。这是什么地方?");
                                                                                                HTML.onclick = function () {
                                                                                                    speaker.skip();
                                                                                                    HTML.onclick = function () {
                                                                                                        show_people("伽罗.png")
                                                                                                        speaker.show_txt("加罗", "这里是未来…也是末日。");
                                                                                                        HTML.onclick = function () {
                                                                                                            speaker.skip();
                                                                                                            HTML.onclick = function () {
                                                                                                                show_people("上官婉儿.png")
                                                                                                                speaker.show_txt("宛儿", "既然将军来了，将军当年给我父亲的东西到底是什么呢？");
                                                                                                                HTML.onclick = function () {
                                                                                                                    speaker.skip();
                                                                                                                    HTML.onclick = function () {
                                                                                                                        show_people("云缨.png")
                                                                                                                        speaker.show_txt("云缨", "你父亲？我看你眼熟，好像是上官纯的女儿。那老头总和我提起，说你得了绝症，为你四处求药……我最后把我父亲送的玉佩也给了他。");
                                                                                                                        HTML.onclick = function () {
                                                                                                                            speaker.skip();
                                                                                                                            HTML.onclick = function () {
                                                                                                                                show_people("上官婉儿.png")
                                                                                                                                speaker.show_txt("宛儿", "可我们没有找到玉佩。");
                                                                                                                                HTML.onclick = function () {
                                                                                                                                    speaker.skip();
                                                                                                                                    HTML.onclick = function () {
                                                                                                                                        show_people("云缨.png")
                                                                                                                                        speaker.show_txt("云缨", "没找到？你觉得你的伤病治愈甚至过了两千年还能好好站在这里，是为什么？");
                                                                                                                                        HTML.onclick = function () {
                                                                                                                                            speaker.skip();
                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                show_people("上官婉儿.png")
                                                                                                                                                speaker.show_txt("宛儿", "难道…那一剂药材，就是玉佩磨成的粉？所以玉佩……在我身体里？那现在怎么办…");
                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                    speaker.skip();
                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                        show_people("曹操.png")
                                                                                                                                                        speaker.show_txt("曹襙", "我记得NJJC总部有个发射塔，也许可以把你的血液加到药剂里，做一场人工雨。");
                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                            speaker.skip();
                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                show_people("孙膑.png")
                                                                                                                                                                speaker.show_txt("孙宾（把玩云缨带来的神秘）", "正好，让我去看看这东西是怎么来的?");
                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                    speaker.skip();
                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                        switch_place("NJJC.png")
                                                                                                                                                                        show_people("伽罗.png")
                                                                                                                                                                        speaker.show_txt("加罗", "你们看这个。");
                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                            speaker.skip();
                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                speaker.show_scene("一向非常热爱研究的加罗找到了NJJC的绝密策划案，里面记载了COVI-bola的研究历程。");
                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                    speaker.skip();
                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                        show_people("伽罗.png")
                                                                                                                                                                                        speaker.show_txt("加罗", "计划迫在眉睫，但此病毒尚不稳定，缺少大量实验对象，不能确定人类能否产生抗体。");
                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                            speaker.skip();
                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                show_people("伽罗.png")
                                                                                                                                                                                                speaker.show_txt("加罗", "我组提议，利用虫洞技术回到过去在相对独立的地区传播目前可控制的低毒性病毒，定时查看此区域，即可获得大量实验对象");
                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                    speaker.skip();
                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                        show_people("伽罗.png")
                                                                                                                                                                                                        speaker.show_txt("加罗", "……只是当前虫洞技术并不完善，危险性较高，谨慎选择......");
                                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                                            speaker.skip();
                                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                                show_people("孙膑.png")
                                                                                                                                                                                                                speaker.show_txt("孙宾", "这……是疯子吧。");
                                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                                    speaker.skip();
                                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                                        show_people("云缨.png")
                                                                                                                                                                                                                        speaker.show_txt("云缨", "所以他们去的是西北...长安出现的异象也是因为这个......");
                                                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                                                            speaker.skip();
                                                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                                                show_people("伽罗.png")
                                                                                                                                                                                                                                speaker.show_txt("加罗", "但是终于结束了。让这一切都消失吧，不能再伤害任何人了。");
                                                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                                                    speaker.skip();
                                                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                                                        show_people("云缨.png")
                                                                                                                                                                                                                                        speaker.show_txt("云缨", "先让我回去。");
                                                                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                                                                            speaker.skip();
                                                                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                                                                show_people("上官婉儿.png")
                                                                                                                                                                                                                                                speaker.show_txt("宛儿", "将军可以回到事发前，一切或许还有转机。");
                                                                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                                                                    speaker.skip();
                                                                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                                                                        show_people("云缨.png")
                                                                                                                                                                                                                                                        speaker.show_txt("云缨（笑）", "......历史无法改变，上一个强行插入的已经毁灭了不是吗。你的父亲是我最信任的手下。他很爱你，只是因为战事无法返乡。希望你不要记恨。");
                                                                                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                                                                                            speaker.skip();
                                                                                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                                                                                show_people("上官婉儿.png")
                                                                                                                                                                                                                                                                speaker.show_txt("宛儿", "......嗯。");
                                                                                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                                                                                    speaker.skip();
                                                                                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                                                                                        show_people("云缨.png")
                                                                                                                                                                                                                                                                        speaker.show_txt("云缨", "那再见了。");
                                                                                                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                                                                                                            speaker.skip();
                                                                                                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                                                                                                speaker.show_scene("云缨离开。");
                                                                                                                                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                                                                                                                                    speaker.skip();
                                                                                                                                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                                                                                                                                        speaker.show_scene("云缨将军一生戎马，最后隐居于对她一生影响最大的地方——苇泽关，直至去逝。");
                                                                                                                                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                                                                                                                                            speaker.skip();
                                                                                                                                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                                                                                                                                save("终了")
                                                                                                                                                                                                                                                                                                start_game("终了");
                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                }
                                                                                                                                                                                                            }
                                                                                                                                                                                                        }
                                                                                                                                                                                                    }
                                                                                                                                                                                                }
                                                                                                                                                                                            }
                                                                                                                                                                                        }
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


}

function zhongliao() {
    var body = document.body;
    body.innerHTML = "";
    achieve("救世主")
    switch_place("结局.png")
    speaker.show_scene("恭喜你，成功解救人类并且通关本游戏，相信你在通关的路上有着许多磕磕绊绊，但是最终还是恭喜你来到了这里")
    HTML.onclick = function () {
        speaker.skip()
        HTML.onclick = function () {
            HTML.onclick = function () { };
            show_video("报幕.mp4");
            var video = document.getElementsByTagName('video')[0];
            video.addEventListener("ended", function () {
                window.location.reload();
            })
        }
    }
}

function failed() {
    var body = document.body;
    body.innerHTML = "";
    switch_place("结局.png")
    speaker.show_scene("很遗憾，因为你选择的道路错误，人类没有躲过这次危机，导致最终人类灭亡，世界毁灭")
    HTML.onclick = function () {
        speaker.skip()
        HTML.onclick = function () {
            HTML.onclick = function () { };
            show_video("末日.mp4");
            var video = document.getElementsByTagName('video')[0];
            video.addEventListener("ended", function () {
                window.location.reload();
            })
        }
    }
}

function add() {

    show_video("引入.mp4");

    var video = document.getElementsByTagName('video')[0]


    video.addEventListener('ended', function () {

        var body = document.body;
        body.innerHTML = "";
        play_music("defalut2.mp3");
        switch_place("聚会2.png");
        show_people("云大将军.png")
        speaker.show_txt("云大将军", "今日是我家缨儿周岁生日，特意邀请各位相聚于此。");
        HTML.onclick = function () {
            speaker.skip();
            HTML.onclick = function () {
                show_people("大臣a.png");
                speaker.show_txt("大臣a", "将军客气!")
                HTML.onclick = function () {
                    speaker.skip();
                    HTML.onclick = function () {
                        show_people("二皇子.png");
                        speaker.show_txt("二皇子", "快让缨儿抓周，我要看看我们尊贵大将军的闺女以后能成为什么人才！")
                        HTML.onclick = function () {
                            speaker.skip();
                            HTML.onclick = function () {
                                show_people("婴儿云缨.png");
                                speaker.show_txt("小云缨", "……爹爹~")
                                HTML.onclick = function () {
                                    speaker.skip();
                                    HTML.onclick = function () {
                                        show_people("云大将军.png");
                                        speaker.show_txt("云大将军", "既然殿下发话了，那就开始吧。缨儿，你选一个。")
                                        HTML.onclick = function () { };
                                        show_options("毛笔", "乐器", "长枪");
                                        var option1 = document.getElementById("option1");
                                        var option2 = document.getElementById("option2");
                                        var option3 = document.getElementById("option3");

                                        option1.onclick = function () {
                                            achieve("书法大家")
                                            clear_options();
                                            save("毛笔");
                                            start_game("毛笔");
                                        }
                                        option2.onclick = function () {
                                            achieve("精通乐理");
                                            clear_options();
                                            save("乐器");
                                            start_game("乐器");
                                        }
                                        option3.onclick = function () {
                                            clear_options();
                                            speaker.show_scene("虽为大家闺秀，云缨的志向却是像自己的父亲那样报效国家，为皇上效力。她时常羡慕父亲和皇上皇子畅谈天下。她苦练武功，研究枪法，只为得到父亲的认可。但一直未能成功。");
                                            HTML.onclick = function () {
                                                speaker.skip()
                                                HTML.onclick = function () {
                                                    HTML.onclick = function () { };
                                                    achieve("巾帼须眉")
                                                    save("长枪");
                                                    start_game("长枪");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

function maobi() {
    var body = document.body;
    body.innerHTML = "";


    play_music("defalut2.mp3");
    switch_place("聚会2.png");
    show_people("二皇子.png");
    speaker.show_txt("二皇子", "看来，日后缨儿必然是雅客才女，未来可期啊！");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云大将军.png");
            speaker.show_txt("云大将军", "殿下过誉了。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    speaker.show_scene("十七年后.....")
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            switch_place("闺房.png");
                            show_people("云大将军.png");
                            speaker.show_txt("云大将军", "缨儿，此次爹爹离家须有数月，你在京城一定好好照顾自己。");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("侍从.png");
                                    speaker.show_txt("侍从", "大人您放心，小姐现在可是皇上手下最器重的谋士，人人敬重。");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("云大将军.png");
                                            speaker.show_txt("云大将军", "正因为如此……我才更加担心她。朝廷表面平静，实则风起云涌。没在身边我怕没人能护得周全。");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people("云缨.png");
                                                    speaker.show_txt("云缨（笑，为父亲整理衣襟）", "我不是孩子了，懂得怎么权衡利弊。况且有皇上和殿下在朝中，就算有人图谋不轨又能怎么样呢。");
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            show_people("云缨.png");
                                                            speaker.show_txt("云缨", "爹就放心去吧。");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    show_people("云大将军.png");
                                                                    speaker.show_txt("云大将军（悄声）", "最近朝中不安宁，你一定注意安全。特别是皇位之事，无论是哪一边，能不参与就不参与。");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            show_people("云缨.png");
                                                                            speaker.show_txt("云缨", "我知道。一切我自己看着办。您一定注意安全，千万要平安回来。");
                                                                            HTML.onclick = function () {
                                                                                speaker.skip();
                                                                                HTML.onclick = function () {
                                                                                    show_people("云大将军.png");
                                                                                    speaker.show_txt("云大将军", "是啊，这次不知道又要什么时候才能结束了。");
                                                                                    HTML.onclick = function () {
                                                                                        speaker.skip();
                                                                                        HTML.onclick = function () {
                                                                                            speaker.show_scene("（三周后）.....");
                                                                                            HTML.onclick = function () {
                                                                                                speaker.skip();
                                                                                                HTML.onclick = function () {
                                                                                                    switch_place("温室殿.png")
                                                                                                    show_people("二皇子.png");
                                                                                                    speaker.show_txt("二皇子", "这前线是怎么回事？");
                                                                                                    HTML.onclick = function () {
                                                                                                        speaker.skip();
                                                                                                        HTML.onclick = function () {
                                                                                                            show_people("云缨.png");
                                                                                                            speaker.show_txt("云缨（皱眉）", "不知是哪个叛将泄露了军机，前线士兵中了奸计，都因为不明原因卧床不起。");
                                                                                                            HTML.onclick = function () {
                                                                                                                speaker.skip();
                                                                                                                HTML.onclick = function () {
                                                                                                                    show_people("云缨.png");
                                                                                                                    speaker.show_txt("云缨", "殿下，臣以为应该派将士火速前往前线支援！战情紧急，刻不容缓！");
                                                                                                                    HTML.onclick = function () {
                                                                                                                        speaker.skip();
                                                                                                                        HTML.onclick = function () {
                                                                                                                            show_people("太子.png");
                                                                                                                            speaker.show_txt("太子", "但现在京城中危机四伏，你们可不能顾此失彼！");
                                                                                                                            HTML.onclick = function () {
                                                                                                                                speaker.skip();
                                                                                                                                HTML.onclick = function () {
                                                                                                                                    show_people("云缨.png");
                                                                                                                                    speaker.show_txt("云缨", "长安出了什么事？");
                                                                                                                                    HTML.onclick = function () {
                                                                                                                                        speaker.skip();
                                                                                                                                        HTML.onclick = function () {
                                                                                                                                            show_people("太子.png");
                                                                                                                                            speaker.show_txt("太子", "哼。");
                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                speaker.skip();
                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                    show_people("皇上.png");
                                                                                                                                                    speaker.show_txt("皇上", "京城中近日不安宁，还是得留住兵力守好长安。但不能透露太多以免引起百姓慌乱。");
                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                        speaker.skip();
                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                            show_people("云缨.png");
                                                                                                                                                            speaker.show_txt("云缨", "这该如何是好？");
                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                HTML.onclick = function () { };
                                                                                                                                                                switch_place("普通背景.png");
                                                                                                                                                                speaker.show_scene("请做出你的选择");
                                                                                                                                                                show_options("支援前线，先拿下战局", "放弃前线，先稳住京城");
                                                                                                                                                                HTML.onclick = function () { };
                                                                                                                                                                var option1 = document.getElementById("option1")
                                                                                                                                                                var option2 = document.getElementById("option2")

                                                                                                                                                                option1.onclick = function () {
                                                                                                                                                                    save("支援");
                                                                                                                                                                    clear_options();
                                                                                                                                                                    speaker.show_scene("一段时间过后");
                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                        speaker.skip();
                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                            start_game("支援")
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }

                                                                                                                                                                option2.onclick = function () {
                                                                                                                                                                    save("放弃");
                                                                                                                                                                    start_game("放弃");
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function zhiyuan() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("温室殿.png");
    show_people("太子.png")
    speaker.show_txt("太子", "云缨你居然敢私自调动军队支援前线！你知道京城此刻有多么危险吗？");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云缨.png");
            speaker.show_txt("云缨", "臣不知。臣的确未接到任何关于危险的情报，只能以自己的判断做出最好的选择。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("太子.png");
                    speaker.show_txt("太子", "你以为你就一定是对的？你……");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("云缨.png");
                            speaker.show_txt("云缨", "臣不知。臣的确未接到任何关于危险的情报，只能以自己的判断做出最好的选择。");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("皇上.png");
                                    speaker.show_txt("皇上", "好了！");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("太子.png");
                                            speaker.show_txt("太子", "云缨一日敢私用军队，明日就敢造反！请父皇定夺！");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people("皇上.png");
                                                    speaker.show_txt("皇上", "……好了");
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            show_people("皇上.png");
                                                            speaker.show_txt("皇上", "事已发生，再说什么也没用了。云缨你这件事确实不该。");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    show_people("皇上.png");
                                                                    speaker.show_txt("皇上", "明日起你前往苇泽关。那里是前线的保障，是边疆要害之地，我需要你去帮我治理。");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            show_people("二皇子.png");
                                                                            speaker.show_txt("二皇子", "父皇？云缨罪不至此！");
                                                                            HTML.onclick = function () {
                                                                                speaker.skip();
                                                                                HTML.onclick = function () {
                                                                                    HTML.onclick = function () { };
                                                                                    speaker.show_scene("请做出你的选择");
                                                                                    show_options("听从命令", "拒绝命令");

                                                                                    var option1 = document.getElementById("option1");
                                                                                    var option2 = document.getElementById("option2");

                                                                                    option1.onclick = function () {
                                                                                        save("听从");
                                                                                        start_game("听从");
                                                                                    }

                                                                                    option2.onclick = function () {
                                                                                        save("拒绝");
                                                                                        start_game("拒绝");
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function tingcong() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("温室殿.png");
    show_people("云缨.png")
    speaker.show_txt("云缨", "陛下既然下令，属下不敢不从。")
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("皇上.png");
            speaker.show_txt("皇上", "苇泽关常年有胡人骚扰，太子你也随着去，平定骚乱，回来必定重赏。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("太子.png");
                    speaker.show_txt("太子（得意）", "必定不会让父皇失望！");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("太子.png");
                            speaker.show_txt("太子", "我这就与云缨商量对策。");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    speaker.show_scene("请做出你的选择")
                                    show_options("将计划告知二皇子", "一同奔赴边疆");
                                    HTML.onclick = function () { };

                                    var option1 = document.getElementById("option1");
                                    var option2 = document.getElementById("option2");

                                    option1.onclick = function () {
                                        save("告知");
                                        start_game("告知");
                                    }

                                    option2.onclick = function () {
                                        save("失败");
                                        clear_options();
                                        switch_place("普通背景.png");
                                        speaker.show_scene("太子顺利完成任务，得到皇上的更多信任。而后太子继位。世界毁灭。");
                                        HTML.onclick = function () {
                                            speaker.skip();
                                            HTML.onclick = function () { };
                                            start_game("失败");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function gaozhi() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("普通背景.png");
    show_people("云缨.png")
    speaker.show_txt("云缨", "太子殿下会在三日后午夜先行从光华门出长安城，部队在清晨出发。")
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("二皇子.png");
            speaker.show_txt("二皇子", "哼。敢摆我一道。我必定让你吃不了兜着走。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    save("失败");
                    speaker.show_scene("三日后午夜，太子于光华门出发，被不明人士射杀身亡。二皇子晋升太子，顺利继位。世界毁灭。")
                    HTML.onclick = function () {
                        start_game("失败");
                    }
                }
            }
        }
    }
}

function jujue() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("温室殿.png");
    show_people("云缨.png")
    speaker.show_txt("云缨", "属下不知有何过错。前线危急，可陛下也未曾告知京城之危。属下的决定已是当时最好的选择。不知陛下为何如此下令！");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("太子.png")
            speaker.show_txt("太子", "连父皇的命令你也敢违抗！");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("太子.png")
                    speaker.show_txt("太子", "来人！拿下！");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("二皇子.png")
                            speaker.show_txt("二皇子（拔剑）", "你敢？");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("皇上.png")
                                    speaker.show_txt("皇上", "我的命令都可以不听了？全给我拿下！");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("皇上.png")
                                            speaker.show_txt("皇上", "这苇泽关你不得不去！");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    switch_place("苇泽关.png");
                                                    speaker.show_scene("苇泽关.....")
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            show_people("首领.png")
                                                            speaker.show_txt("（胡人）首领", "听说那长安才女被发配到了苇泽关？");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    show_people("手下.png")
                                                                    speaker.show_txt("手下", "是。");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            show_people("首领.png")
                                                                            speaker.show_txt("首领", "到可以用她的试一试我们的宝物……你去把她抓来。");
                                                                            HTML.onclick = function () {
                                                                                speaker.skip();
                                                                                HTML.onclick = function () {
                                                                                    show_people("手下.png")
                                                                                    speaker.show_txt("手下", "是。这一片土地我们再熟悉不过了……要拿下她简直轻而易举。");
                                                                                    HTML.onclick = function () {
                                                                                        speaker.skip()
                                                                                        HTML.onclick = function () {
                                                                                            speaker.show_scene("云缨到了苇泽关不久后便被胡人给抓住...")
                                                                                            HTML.onclick = function () {
                                                                                                speaker.skip()
                                                                                                HTML.onclick = function () {
                                                                                                    save("炼药")
                                                                                                    start_game("炼药");
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function fangqi() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("长安街.png")
    speaker.show_scene("云缨一人在路上....");
    HTML.onclick = function () {
        speaker.skip()
        HTML.onclick = function () {
            show_people("云缨.png")
            speaker.show_txt("云缨", "长安究竟有什么问题让陛下不肯调兵支援前线？为何我感受不到一点风吹草动。按理说长安的一切都不可能绕过我。");
            HTML.onclick = function () {
                speaker.skip()
                HTML.onclick = function () {
                    show_people("云缨.png")
                    speaker.show_txt("云缨", "父亲还在前线，不知道现在怎么样了……");
                    HTML.onclick = function () {
                        speaker.skip()
                        HTML.onclick = function () {
                            show_people("云缨.png")
                            speaker.show_txt("云缨（踢走路上一块石子）", "烦死了！");
                            HTML.onclick = function () {
                                speaker.skip()
                                HTML.onclick = function () {
                                    show_people("神秘人a.png")
                                    speaker.show_txt("神秘人a（服装奇特）", "这是什么地方？你设置目的地是对的吗？");
                                    HTML.onclick = function () {
                                        speaker.skip()
                                        HTML.onclick = function () {
                                            show_people("神秘人b.png")
                                            speaker.show_txt("神秘人b（服装也奇特）", "应该没错……可这不像是上次的西北啊，怎么这么繁华？");
                                            HTML.onclick = function () {
                                                speaker.skip()
                                                HTML.onclick = function () {
                                                    show_people("云缨.png")
                                                    speaker.show_txt("云缨", "前面什么人？宵禁已到，你们为什么还在外面！");
                                                    HTML.onclick = function () {
                                                        speaker.skip()
                                                        HTML.onclick = function () {
                                                            show_people("神秘人a.png")
                                                            speaker.show_txt("神秘人a", "快跑！我们一定走错地方了，快调回去！");
                                                            HTML.onclick = function () {
                                                                speaker.skip()
                                                                HTML.onclick = function () {
                                                                    show_people("云缨.png")
                                                                    speaker.show_txt("云缨（跑过去拉扯）", "站住！");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip()
                                                                        HTML.onclick = function () {
                                                                            show_people("神秘人a.png")
                                                                            speaker.show_txt("神秘人a", "快点！");
                                                                            HTML.onclick = function () {
                                                                                speaker.skip()
                                                                                HTML.onclick = function () {
                                                                                    show_people("神秘人b.png")
                                                                                    speaker.show_txt("神秘人b", "好了！");
                                                                                    HTML.onclick = function () {
                                                                                        speaker.skip()
                                                                                        HTML.onclick = function () {
                                                                                            speaker.show_scene("一道蓝光闪过，三人消失在了街道上。")
                                                                                            HTML.onclick = function () {
                                                                                                speaker.skip()
                                                                                                HTML.onclick = function () {
                                                                                                    speaker.show_scene("在未来.....")
                                                                                                    switch_place("魔物.jpg")
                                                                                                    HTML.onclick = function () {
                                                                                                        speaker.skip()
                                                                                                        HTML.onclick = function () {
                                                                                                            show_people("云缨.png")
                                                                                                            speaker.show_txt("云缨（捂头）", "这是什么地方？");
                                                                                                            HTML.onclick = function () {
                                                                                                                speaker.skip()
                                                                                                                HTML.onclick = function () {
                                                                                                                    show_people("神秘人a.png")
                                                                                                                    speaker.show_txt("神秘人a", "终于回来了……等等！她怎么也回来了？");
                                                                                                                    HTML.onclick = function () {
                                                                                                                        speaker.skip()
                                                                                                                        HTML.onclick = function () {
                                                                                                                            show_people("神秘人a.png")
                                                                                                                            speaker.show_txt("神秘人a", "喂，你怎么不说话？");
                                                                                                                            HTML.onclick = function () {
                                                                                                                                speaker.skip()
                                                                                                                                HTML.onclick = function () {
                                                                                                                                    show_people("神秘人b.png")
                                                                                                                                    speaker.show_txt("神秘人b", "我觉得……我们走错地方了……");
                                                                                                                                    HTML.onclick = function () {
                                                                                                                                        speaker.skip()
                                                                                                                                        HTML.onclick = function () {
                                                                                                                                            show_people("神秘人a.png")
                                                                                                                                            speaker.show_txt("神秘人a", "什么意思？");
                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                speaker.skip()
                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                    speaker.show_scene("一群丧尸出现，一口咬掉a的脑袋。")
                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                        speaker.skip()
                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                            show_people("神秘人b.png")
                                                                                                                                                            speaker.show_txt("神秘人b", "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊！！！！！");
                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                speaker.skip()
                                                                                                                                                                HTML.onclick = function () {
                                                                                                                                                                    show_people("云缨.png")
                                                                                                                                                                    speaker.show_txt("云缨", "！！！！！这是什么东西！？");
                                                                                                                                                                    HTML.onclick = function () {
                                                                                                                                                                        speaker.skip()
                                                                                                                                                                        HTML.onclick = function () {
                                                                                                                                                                            speaker.show_scene("三人在未来全部死亡，世界毁灭，游戏结束。")
                                                                                                                                                                            HTML.onclick = function () {
                                                                                                                                                                                save("失败");
                                                                                                                                                                                start_game("失败");
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function yueqi() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("闺房.png");
    speaker.show_scene("十四年后......")
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云缨.png");
            speaker.show_txt("云缨", "爹！我来给你弹一曲吧！这是今天老师新教的曲子。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("云大将军.png");
                    speaker.show_txt("云大将军（有些愁容）", "好啊。");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("云缨.png");
                            speaker.show_txt("云缨", "爹，你怎么看起来有心事。");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("云大将军.png");
                                    speaker.show_txt("云大将军", "没什么……缨儿你弹吧。");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("云缨.png");
                                            speaker.show_txt("云缨", "有心事！爹瞒不过我的！");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people("云大将军.png");
                                                    speaker.show_txt("云大将军", "皇宫看上你了……想召你入宫。");
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            HTML.onclick = function () { };
                                                            speaker.show_scene("请做出你的选择");
                                                            show_options("不入宫", "入宫");

                                                            var option1 = document.getElementById("option1");
                                                            var option2 = document.getElementById("option2");

                                                            option1.onclick = function () {
                                                                save("不入");
                                                                start_game("不入");
                                                            }

                                                            option2.onclick = function () {
                                                                save("入宫");
                                                                start_game("入宫");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function buru() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("闺房.png");
    show_people("云缨.png");
    speaker.show_txt("云缨", "我不要入宫！我想一直陪着爹爹！");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云大将军.png");
            speaker.show_txt("云大将军", '但……这是……');
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("云缨.png");
                    speaker.show_txt("云缨", '我不管！就要和你在一起!');
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("云大将军.png");
                            speaker.show_txt("云大将军", '好！既然缨儿开口了，我就算抗旨也让你呆在家中。');
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    speaker.show_scene("（一声嘶吼，伴随着女孩凄惨的哭声）");
                                    show_options("营救", "害怕离开");
                                    HTML.onclick = function () { };

                                    var option1 = document.getElementById("option1");
                                    var option2 = document.getElementById("option2");

                                    option1.onclick = function () {
                                        save("营救");
                                        start_game("营救");
                                    }

                                    option2.onclick = function () {
                                        save("离开");
                                        start_game("离开");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function yingjiu() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("小女孩遇袭.jpg");
    show_people("云大将军.png");
    speaker.show_txt("云大将军", "什么人？（拔剑走出家门）为何如此重的血腥味？");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云缨.png");
            speaker.show_txt("云缨", "爹，发生什么了？");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("云大将军.png");
                    speaker.show_txt("云大将军", "你不要出来！呆在屋里，我去去就回。");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("云缨.png");
                            speaker.show_txt("云缨", "注意安全！");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    show_people("云大将军.png");
                                    speaker.show_txt("云大将军", "这是什么东西？放下那个女孩！受死吧！");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            show_people("魔物1.png");
                                            speaker.show_txt("魔物（好像听懂了在说什么，像是嘲讽一般）", "咕噜咕噜咕噜死死死死死死死哈哈哈哈哈哈");
                                            HTML.onclick = function () {
                                                speaker.skip();
                                                HTML.onclick = function () {
                                                    show_people("云大将军.png");
                                                    speaker.show_txt("云大将军", "受死！");
                                                    HTML.onclick = function () {
                                                        speaker.skip();
                                                        HTML.onclick = function () {
                                                            speaker.show_scene("（救下女孩，女孩全身是血，气息微弱）");
                                                            HTML.onclick = function () {
                                                                speaker.skip();
                                                                HTML.onclick = function () {
                                                                    show_people("云大将军.png");
                                                                    speaker.show_txt("云大将军", "这孩子的父母一定很着急……先把她包扎一下，再送回家中。");
                                                                    HTML.onclick = function () {
                                                                        speaker.skip();
                                                                        HTML.onclick = function () {
                                                                            show_people("云缨.png");
                                                                            speaker.show_txt("云缨", "这是谁？怎么伤成这样？");
                                                                            HTML.onclick = function () {
                                                                                speaker.skip();
                                                                                HTML.onclick = function () {
                                                                                    show_people("云大将军.png");
                                                                                    speaker.show_txt("云大将军", "快叫大夫来！");
                                                                                    HTML.onclick = function () {
                                                                                        speaker.skip();
                                                                                        HTML.onclick = function () {
                                                                                            show_people("云缨.png");
                                                                                            speaker.show_txt("云缨", "好。");
                                                                                            HTML.onclick = function () {
                                                                                                speaker.skip();
                                                                                                HTML.onclick = function () {
                                                                                                    show_people("大夫.png");
                                                                                                    speaker.show_txt("大夫", "我已经封住了她的经络，她的伤口和体内的毒素在十年内无法要她性命，但若十年后无法找到解药，这孩子到时会毒发身亡。");
                                                                                                    HTML.onclick = function () {
                                                                                                        speaker.skip();
                                                                                                        HTML.onclick = function () {
                                                                                                            show_people("云大将军.png");
                                                                                                            speaker.show_txt("云大将军", "好……我会告知的。");
                                                                                                            HTML.onclick = function () {
                                                                                                                speaker.skip();
                                                                                                                HTML.onclick = function () {
                                                                                                                    speaker.show_scene("你的选择并不是正确道路,天狼小队并未成功找到解药线索,最终导致世界毁灭");
                                                                                                                    HTML.onclick = function () {
                                                                                                                        speaker.skip();
                                                                                                                        HTML.onclick = function () {
                                                                                                                            save("失败");
                                                                                                                            start_game("失败");
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function likai() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("普通背景.png");
    speaker.show_scene("云缨幸福快乐的度过了她的一生,但天狼小队并未找到线索,最终导致世界毁灭");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            save("失败");
            start_game("失败");
        }
    }
}

function rugong() {
    var body = document.body;
    body.innerHTML = "";

    play_music("defalut2.mp3");
    switch_place("温室殿.png");
    show_people("皇上.png");
    speaker.show_txt("皇上", "缨儿长这么大了，倒是落出个美人模样。");
    HTML.onclick = function () {
        speaker.skip();
        HTML.onclick = function () {
            show_people("云缨.png");
            speaker.show_txt("云缨", "皇上过誉了。");
            HTML.onclick = function () {
                speaker.skip();
                HTML.onclick = function () {
                    show_people("皇上.png");
                    speaker.show_txt("皇上", "现在前线战事频繁，我朝需要你。");
                    HTML.onclick = function () {
                        speaker.skip();
                        HTML.onclick = function () {
                            show_people("云缨.png");
                            speaker.show_txt("云缨", "皇上有什么事？云缨必定赴汤蹈火在所不辞。");
                            HTML.onclick = function () {
                                speaker.skip();
                                HTML.onclick = function () {
                                    switch_place("普通背景.png");
                                    speaker.show_scene("云缨远嫁西北和亲，即敌军，其血用于炼药，被放血而死。最终导致世界毁灭");
                                    HTML.onclick = function () {
                                        speaker.skip();
                                        HTML.onclick = function () {
                                            save("失败");
                                            start_game("失败");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function start_game(process) {
    switch (process) {
        case "start":
            add();
            break;
        case "毛笔":
            maobi();
            break;
        case "支援":
            zhiyuan();
            break;
        case "听从":
            tingcong();
            break;
        case "告知":
            gaozhi();
            break;
        case "拒绝":
            jujue();
            break;
        case "放弃":
            fangqi();
            break;
        case "乐器":
            yueqi();
            break;
        case "不入":
            buru();
            break;
        case "营救":
            yingjiu();
            break;
        case "离开":
            likai();
            break;
        case "入宫":
            rugong();
            break;
        case "长枪":
            first_part();
            break;
        case "学武":
            second_part();
            break;
        case "打怪":
            thrid_part();
            break;
        case "小偷":
            forth_part();
            break;
        case "陷阱":
            fifth_part();
            break;
        case "衙门":
            sixth_part();
            break;
        case "私了":
            secret1();
            break;
        case "炼药":
            lianyao();
            break;
        case "返回":
            fanhui();
            break;
        case "留守":
            liushou();
            break;
        case "真相":
            zhenxiang();
            break;
        case "报仇":
            seventh_part();
            break;
        case "遗物":
            yiwu();
            break;
        case "终了":
            zhongliao();
            break;
        case "失败":
            failed();
            break;
    }
}

function new_game() {
    var player = localStorage.getItem("currentUser");
    var Player = JSON.parse(localStorage.getItem(player));
    var cnt = parseInt(Player.num);
    if (player == null) {
        alert("玩家尚未登录!");
    }
    else if (cnt >= 8) {
        alert("一位玩家最多有八个存档,请重新注册账号");
    }
    else {
        var Player = JSON.parse(localStorage.getItem(player));
        var cnt = parseInt(Player.num);
        var update = {
            username: Player.username,
            password: Player.password,
            num: parseInt(Player.num) + 1,
            achievement: Player.achievement
        }
        for (i = 1; i <= cnt; i++) {
            update["process" + i] = Player["process" + i];
            update["timestamp" + i] = Player["timestamp" + i];
        }
        update["process" + (cnt + 1)] = "start";
        update["timestamp" + (cnt + 1)] = nowTime();
        localStorage.setItem(update.username, JSON.stringify(update));
        localStorage.setItem("currentNum", cnt + 1);
        start_game("start");
    }
}

var create = document.querySelector('.new');
create.onclick = new_game;

function con() {
    var player = localStorage.getItem("currentUser");
    if (player == null) {
        alert("玩家尚未登录");
        return;
    }
    var info = JSON.parse(localStorage.getItem(player));
    var num = parseInt(info.num);

    var store_win = document.querySelector(".store");
    var h5s = store_win.getElementsByTagName('h5')
    var spans = store_win.getElementsByClassName("time")
    for (i = 0; i < h5s.length; i++) {
        if (i < num) {
            var process = info["process" + (i + 1)];
            var timestamp = info["timestamp" + (i + 1)];
            if (process == null) {
                process = "无存档记录";
                timestamp = ""
            }
            h5s[i].innerText = process;
            spans[i].innerText = timestamp;
        }
        else {
            process = "无存档记录";
            timestamp = ""
            h5s[i].innerText = process;
            spans[i].innerText = timestamp;
        }
    }
    $(".store").fadeIn();
}

function read_game(choice) {
    localStorage.setItem("currentNum", choice.index);
    var player = localStorage.getItem("currentUser");
    var info = JSON.parse(localStorage.getItem(player));
    var process = info["process" + choice.index];
    start_game(process);
}

var con_btn = document.querySelector('.continue');
con_btn.onclick = con;

function clo() {
    $('.store').fadeOut();
}

var close = document.querySelector(".close");
close.onclick = clo;

var choices = document.getElementsByClassName('choice')
for (i = 0; i < choices.length; i++) {
    choices[i].index = i + 1;
    choices[i].onclick = function () {
        read_game(this);
    }
}

var btns = document.getElementsByClassName('btn');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseover', function () {
        this.style.width = "700px";
    })
    btns[i].addEventListener('mouseleave', function () {
        this.style.width = "300px";
    })
}
