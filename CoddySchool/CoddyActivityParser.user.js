
// ==UserScript==
// @name        CoddyActivityParser
// @description	Скрипт для автоматического копирования учеников из поиска
// @include		https://coddy.t8s.ru/Learner/*
// @include		https://coddy.t8s.ru/Profile/5743
// @grant       none
// @version     3.1
// @author      Tecnika
// @downloadURL https://github.com/Tecnika/MyUserScripts/blob/main/CoddySchool/CoddyActivityParser.user.js
// ==/UserScript==

//Перед запуском скрипта нужно поменять user и второго include на ссылку на свой профиль, сохранив форматирование
let user = "https://coddy.t8s.ru/Profile/5743"

window.addEventListener('load', function () {
    if (window.location.href === user) {
        addLinks(0)
    } else {
        addLinks(1)
        addButton();
        document.getElementById('btnParser').onclick = startParser;
        document.getElementById('btnParser2').onclick = startParserForExel;

    }
}, false);

//Добавляет кнопки страниц где можно искать группы и индивидуалки
const addLinks = (variant) => {
    let x_rigth = document.querySelector('x-right.col-sm-auto');
    let need_div = x_rigth.querySelector('.col-auto');
    if (variant) {
        need_div = x_rigth;
    }

    need_div.insertAdjacentHTML('afterbegin',
        `
            <a class="btn btn-sm btn-primary" data-content="Ученики" data-placement="bottom" data-toggle="popover" data-trigger="hover" href="/Learner/Individuals" data-original-title="" title="">
            <img width='18px'src="https://img.icons8.com/material-outlined/24/ffffff/raise-a-hand-to-answer.png"/>
            </a>
            <a class="btn btn-sm btn-dark" data-content="Группы" data-placement="bottom" data-toggle="popover" data-trigger="hover" href="/Learner/Groups" data-original-title="" title="">
            <img width='18px'src="https://img.icons8.com/material-outlined/24/ffffff/classroom--v2.png"/>
            </a>
            `,
    );
    // console.log(need_div)
}

//Добавляет кнопку парсинга
const addButton = () => {
    document.querySelector('x-search-table-header-right').insertAdjacentHTML('afterbegin',
        // <div class="col-lg-3">
        // <button id='btnParser' class="btn btn-info" onclick="startParser()">Парсить Группы / Учеников</button>
        // </div>
        // <div class="col-lg-3">
        // <button id='btnParser2' class="btn btn-success " onclick="startParser2()">Парсить Группы / Учеников под Exel</button>
        // </div> 
        `
        <button id='btnParser' class="btn btn-info" onclick="startParser()">Парсить Группы / Учеников</button>
        <button id='btnParser2' class="btn btn-success " onclick="startParserForExel()">Парсить Группы / Учеников под Exel</button>
    `,
    );
} 
   var group = 'https://coddy.t8s.ru/Learner/Group/';
    var individual = 'https://coddy.t8s.ru/Learner/Individual/';
    var minigroup = 'https://coddy.t8s.ru/Learner/MiniGroup/';

//Парсит группы и учеников с форматированием под мою exel
const startParserForExel = () => {
    let table = document.querySelector('.SearchTable');
    let trTab = table.querySelectorAll('tr')

    let arr = []
    trTab.forEach(tr => {
        let act = tr.querySelectorAll('a')
        let a = {
            a: '',
            discipline: '',
            lvl: '',
            day: '',
            time: '',
            date1: '',
            date2: '',
            name: ''
        }
        for (let elem of act) {
            if ((elem.href.indexOf(group) > -1) || (elem.href.indexOf(minigroup) > -1) || (elem.href.indexOf(individual) > -1)) {
                a.a = elem.href;
                let td = tr.querySelectorAll('td')
                if ((elem.href.indexOf(group) > -1)) {
                    a.lvl = td[3].innerHTML.split('-')[1] + ' модуль'
                } else {
                    a.lvl = "Индивидуалка"
                }

                
                if (td[2].innerHTML == "Рисование в стиле Аниме") {
                    a.discipline = "Аниме"
                } else {
                    if (td[2].innerHTML == "Создание комиксов Манга") {
                        a.discipline = "Манга"
                    }
                    else {
                        a.discipline = td[2].innerHTML
                    }
                }
                // a.discipline = td[2].innerHTML

                let str = td[7].innerHTML
                let strArr = str.split(' ')
                a.time = strArr[0]
                a.day = strArr[1].split('<br>')[0]
                let date = strArr[1].split('<br>')[1].split('(')[1].split(')')[0]
                a.date1 = date.split('-')[0]
                a.date2 = date.split('-')[1]
                a.name = td[0].innerText
                arr.push(a)
            }
        }
    });
    // console.log(arr)
    let str = '';
    let t = '\t'
    arr.forEach(element => {
        str = str + element.lvl + t + element.discipline + t + element.name + t + element.day + t + element.time + t + element.date1 + t + element.date2 + t + element.a + '\n';

    })
    // console.log(str)
    ToBuffer(str,arr)
}

//Парсит группы и учеников
const startParser = () => {
    // var group = 'https://coddy.t8s.ru/Learner/Group/';
    // var individual = 'https://coddy.t8s.ru/Learner/Individual/';
    // var minigroup = 'https://coddy.t8s.ru/Learner/MiniGroup/';

    table = document.querySelector('.SearchTable');
    act = table.querySelectorAll('a');

    let arr = [];
    for (let elem of act) {
        if ((elem.href.indexOf(group) > -1) || (elem.href.indexOf(minigroup) > -1) || (elem.href.indexOf(individual) > -1)) {
            arr.push(elem.href);
        }
    }
    let str = '';
    arr.forEach(element => str = str + '\n' + element);
    ToBuffer(str,arr)
}
function ToBuffer(str,arr) {
    navigator.clipboard.writeText(str)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
    alert(str + '\n' + 'Скопировано в буфер обмена ' + arr.length);
}
