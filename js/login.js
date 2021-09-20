function trip(obj, trip) {
    document.getElementById(obj).innerHTML = "<b>" + trip + "</b>";
}
function login() {
    var userName = document.getElementById("userName");
    var uName = userName.value;
    var password = document.getElementById("password");
    var userPass = password.value;
    var player = JSON.parse(localStorage.getItem(uName));
    if (player != null) {
        if (userPass == player.password) {
            localStorage.setItem("currentUser", uName);
            alert("登录成功");
            window.location.href = "start.html";
        }
        else {
            trip("password_trip", "密码错误, 请重新输入!");
        }
    }
    else {
        trip("name_trip", "用户名不存在!");
    }
    return false;
}

var form = document.getElementById("form");
form.onsubmit = login
var regist = document.getElementById('regist');
console.log(regist);
regist.onclick = function () {
    window.location.href = "register.html";
}