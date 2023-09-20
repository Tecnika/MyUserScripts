// ==UserScript==
// @name SberParsing
// @namespace OrangeMonkey Scripts
// @match       https://web2-new.online.sberbank.ru/*
// @description	Скрипт для парсинга зп в Сбере
// @author Tecnika
// @version     1.1
// @grant none
// @downloadURL https://github.com/Tecnika/MyUserScripts/raw/main/Life/SberZpParser.user.js
// ==/UserScript==

let mon = {
    ' января, ': '.01.',
    ' февраля, ': '.02.',
    ' марта, ': '.03.',
    ' апреля, ': '.04.',
    ' мая, ': '.05.',
    ' июня, ': '.06.',
    ' июля, ': '.07.',
    ' августа, ': '.08.',
    ' сентября, ': '.09.',
    ' ноября, ': '.10.',
    ' октября, ': '.11.',
    ' декабря, ': '.12.',
}
let year = new Date().getFullYear()
let day = {
    'понедельник': year,
    'вторник': year,
    'среда': year,
    'четверг': year,
    'пятница': year,
    'суббота': year,
    'воскресенье': year
}
function ToBuffer(str, arr) {
    navigator.clipboard.writeText(str)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
    alert(str + '\n' + 'Скопировано в буфер обмена ' + arr.length);
}

function SberZP(Who) {
    //1-Зп 2-Кодди

    let all_sections = document.querySelectorAll('section')
    let arr = []
    all_sections.forEach(section => {
        let li = section.querySelectorAll('li')
        // a = a.concat(li)
        arr = [...arr, ...li]
        // console.log=li
    })


    let strArr = []
    arr.forEach(point => {
        let date = point.parentNode.previousElementSibling.innerText
        let date2
        for (let month in mon) {
            // alert(date + ' | ' + month)

            if (date.includes(month)) {
                date2 = date.replace(month, mon[month]);
            }
        }
        for (let d in day) {
            // alert(date + ' | ' + month)

            if (date2.includes(d)) {
                date2 = date2.replace(d, day[d]);
            }
        }

        let now = point.querySelectorAll('div')[1].querySelectorAll('div')[0]
        let type = now.querySelector('div').innerText;
        let coins = now.querySelector("p[color='green']");
        let boolean
        if (Who) {
            boolean = (type.includes("Зачисление") || type.includes("Аванс"))
        } else {
            boolean = type.includes("Оксана Николаевна С.")
        }
        if ((coins) && boolean) {
            let money = {
                date: date2,
                type: type,
                coin: coins.innerText.replace(/[^\d,]/g, "")
            }
            strArr.push(money)
        }

    })
    console.table = strArr
    let str = '';
    let t = '\t'
    strArr.forEach(element => {
        str = str + element.date + t + element.type + t + element.coin + '\n';

    })
    ToBuffer(str, strArr)
}
window.addEventListener('load', function () {
    let node = document.querySelector('#operations-wrapper')
    node.insertAdjacentHTML('beforeBegin', '<p font-weight="medium">Парсинг:</p> <button font-weight="medium" onclick="SberZP(1)">ЗП</button><button font-weight="medium" onclick="SberZP(0)">Coddy</button>')
}, false);

// SberZP(1)
