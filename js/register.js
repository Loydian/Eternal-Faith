function trip(obj, trip) {
    document.getElementById(obj).innerHTML = "<b>" + trip + "</b>";
}

function checkSex() {
    var sexNum = document.getElementsByName("sex");
    var sex = "";
    for (let i = 0; i < sexNum.length; ++i) {
        if (sexNum[i].checked) {
            sex = sexNum[i];
        }

    }
    if (sex == "") {
        trip("sex_trip", "请选择性别");
        return false;
    } else {
        trip("sex_trip", "√");
    }
    return true;
}

function checkForm() {
    var bol = checkSex();

    if (!bol) {
        return bol;
    }

    //获取用户名输入项
    var userName = document.getElementById("userName");
    var uName = userName.value;
    if (localStorage.getItem(uName != null)) {
        trip("name_trip", "该用户已注册!");
        return false;
    }
    if (uName.length < 1 || uName.length > 10) {
        trip("name_trip", "账号长度为1-10位!!");
        return false;
    } else {
        trip("name_trip", "OK!!");

    }

    //密码长度大于6 和确认必须一致 
    var password = document.getElementById("password");
    var userPass = password.value;
    if (userPass.length < 6) {
        trip("password_trip", "密码要至少6位");
        return false;
    } else {
        trip("password_trip", "√");
    }

    //获取确认密码框的值 var
    var surePassword = document.getElementById("surePassword");
    var surePass = surePassword.value;
    if (userPass != surePass) {
        trip("surePassword_trip", "两次密码不一致!!");
        return false;
    }
    else {
        trip("surePassword_trip", "√");
    }

    //校验邮箱:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    var inputEmail = document.getElementById("email");
    var uEmail = inputEmail.value;
    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(uEmail)) {
        trip("emil_trip", "邮箱不合法!!");
        return false;
    } else {
        trip("emil_trip", "√");
    }

    return true;
}

function Submit() {
    var bol = checkForm();
    if (bol) {
        var userName = document.getElementById("userName");
        var uName = userName.value;
        var password = document.getElementById("password");
        var userPass = password.value;
        var Player = {
            username: uName,
            password: userPass,
            num: 0,
            achievement: Array(),
        }
        localStorage.setItem(uName, JSON.stringify(Player));
        alert("注册成功!");
        window.location.href = 'start.html';
    }
    return false;
}

var form = document.getElementById("form");
form.onsubmit = Submit;