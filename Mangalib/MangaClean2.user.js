// ==UserScript==
// @name        MangaClean2
// @description	Скрипт для автоматического поиска дублей в колокольчике
// @include     https://test-front.mangalib.me/*
// @include     https://mangalib.me/*
// @grant       none
// @version     2.0
// @author      Tecnika
// @downloadURL -https://github.com/Tecnika/MyUserScripts/raw/main/Mangalib/MangaClean2.user.js
// ==/UserScript==
var needclass = ".dropdown-menu";
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
            console.log('i have');
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
    let block = div.querySelector('a');
      block.insertAdjacentHTML(
        'afterend',
        `
       <div id='btnGrade' class="btn is-plain is-icon size-sm" onclick='
let elem = document.querySelector(".scrollable");

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
            let items = document.querySelectorAll("[data-type=chapter]")
            console.log("Оповещений о новых главах: ", items.length)
            let items_name = []
            items.forEach(item => {
            let a= item.querySelector("span.node-text.mark-bold.mark-underline");
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
			'><img width="16" height="16" src="https://img.icons8.com/ios-glyphs/30/ffffff/rabbit-in-hat.png" alt="rabbit-in-hat"/></div>
        `,
    );
}
