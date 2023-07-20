// ==UserScript==
// @name        MangaClean
// @description	Скрипт для автоматического поиска дублей в колокольчике
// @include     https://mangalib.me/*
// @grant       none
// @version     1.0
// @author      Tecnika
// @downloadURL https://github.com/Tecnika/MyUserScripts/raw/main/Mangalib/MangaClean.user.js
// ==/UserScript==
var needclass = ".header-dropdown";
window.addEventListener('load', function () {
  console.log("script start")
    let j = setInterval(function () {
        if (!document.querySelector(needclass)) {
            //console.log('hello')
            SearchBlock();
        }
    }, 1000);


})
const SearchBlock = () => {
    // Выбираем целевой элемент
  // console.log("i haven't");
    let i = setInterval(function () {
        if (document.querySelector(needclass)) {
            // если нашли останавливаем таймер и вызываем алерт
            //console.log('i have');
            clearInterval(i);
            if (!document.querySelector('#btnGrade')) { addButton(); }
            //    document.getElementById('btnParser').onclick = AutoGrate;
        }
    }, 1000);
}



//Добавление кнопочки "Сделать красиво", для не автоматического срабатывания скрипта ниже
const addButton = () => {
 console.log('btn complete')
    let div = document.querySelector(needclass);
    let block = div.querySelector('.notifications-header');
      block.insertAdjacentHTML(
        'beforeend',
        `
       <div id='btnGrade' class="notifications-header__icon" onclick='
 let elem = document.querySelector(".notifications__body");

function scrollToEnd() {
  let previousScrollTop = elem.scrollTop;
  elem.scrollTo(0, 1000000000000000);
  setTimeout(() => {
    let currentScrollTop = elem.scrollTop;
    if (currentScrollTop > previousScrollTop) {
      scrollToEnd();
    }
  }, 200);
}

scrollToEnd();
       setTimeout(() => {
            let panel = document.querySelector(".menu.notify.header-dropdown")
            panel = panel.querySelector(".notifications__list")
            let items = panel.querySelectorAll(".notification-row")
            console.log("Оповещений о новых главах: ", items.length)
            let items_name = []
            items.forEach(item => {
            let a= item.querySelectorAll("b")[1];
            if (a != undefined) {
                items_name.push(a.innerHTML)}
            });
            let unic_name = [];
            let not_unic_name = [];
            /*unic_elem(items_name, unic_name, not_unic_name)*/
            items_name.forEach(t_name => {
                let i = 1;
                unic_name.forEach(u_name => {
                    if (u_name === t_name) {
                        i = 0;
                    }
                });
                if (i) {
                    unic_name.push(t_name);
                }
                else {
                    not_unic_name.push(t_name);
                }
            });
            /*unic_elem end*/
            /*not_unic_name = onlyUnic(not_unic_name)*/
            let newArr = []
            not_unic_name.forEach(item => {
                let i = 1;

                newArr.forEach(elem => {
                    if (elem == item) {
                        i = 0;
                    }
                });
                if (i) {
                    newArr.push(item);
                }
            });
            not_unic_name = newArr;

            /*not_unic_name end*/
            console.log("Уникальных тайтлов: ", unic_name.length)
            console.log("Повторы: ", not_unic_name)   }, 5000);
			'><img width="16" height="16" src="https://img.icons8.com/plumpy/16/rabbit-in-hat.png" alt="rabbit-in-hat" /></div>
        `,
    );
}
