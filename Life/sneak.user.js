// ==UserScript==
// @name Ябеда-Корябе6да
// @namespace OrangeMonkey Scripts
// @match       https://ya.ru/*
// @description	Скрипт для жалоб на тех, кто портит жизнь
// @author Tecnika
// @version     1.0
// @grant none
// @downloadURL https://github.com/Tecnika/MyUserScripts/raw/main/Life/sneak.user.js
// ==/UserScript==


//Данные владельца
const gibddURL = 'https://xn--90adear.ru/request_main'
const RosNadzorURL = 'https://petition.rospotrebnadzor.ru/petition/oper_auth_not/'

const Roslogo = document.createElement("img");
// Roslogo.src = 'https://www.rospotrebnadzor.ru/bitrix/templates/rospotrebnadzor/images/logo2.png';
Roslogo.src='https://avatars.mds.yandex.net/get-ydo/3925651/2a00000182eed443a66a98a021f5c6f6c1c4/diploma'

//определяем локацию
var locationURL = window.location.href;

if (locationURL = 'https://ya.ru/') {
    console.log('ya.ru')
    ForYa()
} else {
    console.log('NOT ya.ru')
}

// Скрипт для страницы яндекс
function ForYa() {
    let location = document.querySelectorAll('.headline__personal')
    console.log(location)
CreateMe(Roslogo,'',RosNadzorURL)

}

function CreateMe(logo, name, url) {
    let l = document.createElement('img')
    l.src = logo
    l.style.height = '12px'
    let a = document.createElement('a')
    a.href = url
    
}