document.getElementsByClassName("chengjiu")[0].onclick = function () {
    //获取元素
    var num = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 'ten', "eleven", "twelve", "thirteen", "fourteen", "fifthteen", "sixthteen", "seventeen"]
    var leftb = document.querySelector('.left');
    var rightb = document.querySelector('.right');
    var box = document.querySelector('.box');
    var imgs = box.querySelector('.imgs');

    var player = localStorage.getItem("currentUser");
    var Player = JSON.parse(localStorage.getItem(player));

    if (player == null) {
        alert("无成就信息,请先登录!")
        return;
    }

    var achievements = Player.achievement;
    var img_length = achievements.length;

    num = num.slice(0, img_length);


    if (img_length == 0) {
        alert("当前暂无成就!")
        return;
    }
    else {
        for (var i = 0; i < img_length; i++) {
            var li = document.createElement('li')

            switch (achievements[i]) {
                case "巾帼须眉":
                    li.style.backgroundImage = "url(uploads/长枪.png)";
                    li.innerText = "巾帼须眉"
                    break;
                case "书法大家":
                    li.style.backgroundImage = "url(uploads/书法.png)"
                    li.innerText = "书法大家"
                    break;
                case "精通乐理":
                    li.style.backgroundImage = "url(uploads/乐器.png)"
                    li.innerText = "精通乐理"
                    break;
                case "炼药大师":
                    li.style.backgroundImage = "url(uploads/炼药.png)"
                    li.innerText = "炼药大师"
                    break;
                case "大难不死":
                    li.style.backgroundImage = "url(uploads/大难不死.png)"
                    li.innerText = "大难不死"
                    break;
                case "魑魅魍魉":
                    li.style.backgroundImage = "url(uploads/丧尸.png)"
                    li.innerText = "魑魅魍魉"
                    break;
                case "自相残杀":
                    li.style.backgroundImage = "url(uploads/不明人马1.png)"
                    li.innerText = "自相残杀"
                    break;
                case "复活秒躺":
                    li.style.backgroundImage = "url(uploads/复活秒躺.png)"
                    li.innerText = "复活秒躺"
                    break;
                case "节奏大师":
                    li.style.backgroundImage = "url(uploads/节奏大师.png)"
                    li.innerText = "节奏大师"
                    break;
                case "火眼金睛":
                    li.style.backgroundImage = "url(uploads/火眼金睛.png)"
                    li.innerText = "火眼金睛"
                    break;
                case "兵贵神速":
                    li.style.backgroundImage = "url(images/hero2.jpg)"
                    li.innerText = "兵贵神速"
                    break;
                case "身手矫健":
                    li.style.backgroundImage = "url(uploads/身手矫健.png)"
                    li.innerText = "身手矫健"
                    break;
                case "星际争霸":
                    li.style.backgroundImage = "url(uploads/星际争霸.png)"
                    li.innerText = "星际争霸"
                    break;
                case "复仇者":
                    li.style.backgroundImage = "url(uploads/复仇者.png)"
                    li.innerText = "复仇者"
                    break;
                case "救世主":
                    li.style.backgroundImage = "url(uploads/救世主.png)"
                    li.innerText = "救世主"
                    break;
            }
            li.setAttribute('class', num[i])
            imgs.appendChild(li);
        }
    }

    var imgt = imgs.querySelectorAll('li');

    //自动翻页函数
    var timeone = setInterval(function () {
        rightf();
    }, 3000);
    //左右按钮的出现
    box.addEventListener('mouseover', function () {
        leftb.style.display = 'block';
        rightb.style.display = 'block';
        //移入时清除定时器
        clearInterval(timeone);
        timeone = null;
    })

    //左右按钮的消失
    box.addEventListener('mouseout', function () {
        leftb.style.display = 'none';
        rightb.style.display = 'none';
        //恢复定时器
        clearInterval(timeone);
        timeone = setInterval(function () {
            rightf();
        }, 3000)
    })
    //动态生成小圆圈，小圈圈模块
    var list = box.querySelector('.list');
    for (var i = 0; i < imgs.children.length; i++) {
        //创建li，加入ul中
        var li = document.createElement('li');
        list.appendChild(li);
        //给小圈圈添加类名
        li.setAttribute('index', i);
        //排他思想，实现点击小圆圈，变色
        li.addEventListener('click', colors);
        //经过小圆圈，切换图片
        li.addEventListener('mouseenter', jump);
    }
    //一开始第二个亮
    list.children[0].className = 'change';
    //变色函数 
    function colors() {
        //把所有的小圆圈变白
        for (var i = 0; i < list.children.length; i++) {
            list.children[i].className = '';
        }
        //给图片对应的小圆圈上色
        var index = this.getAttribute('index');
        list.children[index].className = 'change';
    }
    //跳转函数
    function jump() {
        var index = this.getAttribute('index');
        var now = num.indexOf('one');
        //计算经过点与当前点的距离
        var dif = Math.max(index, now) - Math.min(index, now);

        if (index > now) {
            while (dif--) {
                rightf();
            }
        } else {
            while (dif--) {
                leftf();
            }
        }
    }
    //小圆圈跟随着图片移动
    var j = 0;
    function colort() {
        for (var i = 0; i < list.children.length; i++) {
            list.children[i].className = '';
        }
        if (j >= img_length) {
            j = 0;
        } else if (j < 0) {
            j = img_length - 1;
        }
        list.children[j].className = 'change';
    }
    //右翻页
    rightb.addEventListener('click', rightf);
    function rightf() {
        //把数组的最后一个添加到第一个
        num.unshift(num[num.length - 1]);
        //删除最后一个
        num.pop();
        //重新给li添加类名
        for (var i = 0; i < num.length; i++) {
            imgt[i].setAttribute('class', num[i]);
        }
        //通过这个全局变量来让小圆圈的颜色一起变化
        j++;
        colort();
    }
    //左翻页
    leftb.addEventListener('click', leftf)
    function leftf() {
        num.push(num[0]);
        num.shift();
        for (var i = 0; i < num.length; i++) {
            imgt[i].setAttribute('class', num[i]);
        }
        j--;
        colort();
    }
    //点击图片实现翻页,这里我是通过在左右两边添加一个盒子来实现的
    var rights = document.querySelector('.rights');
    rights.addEventListener('click', function () {
        rightf();
    })
    var lefts = document.querySelector('.lefts');
    lefts.addEventListener('click', function () {
        leftf();
    })
    $(".box").fadeIn();
}
document.getElementsByClassName("shut")[0].onclick = function () {
    var lis = document.querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].remove();
    }
    $(".box").fadeOut();
}