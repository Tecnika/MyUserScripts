// ==UserScript==
// @name        MangaCleanInList
// @description	Скрипт для автоматического поиска непрочитанного
// @include     https://mangalib.me/user/1704907
// @grant       none
// @version     1.0
// @author      Tecnika
// ==/UserScript==
var needclass = ".bookmark-actions";
window.addEventListener('load', function () {
  addButton();

})
//Добавление кнопочки "Сделать красиво", для не автоматического срабатывания скрипта ниже
const addButton = () => {

    let div = document.querySelector(needclass);
    let block = div.querySelector('.bookmark__edit');
      block.insertAdjacentHTML(
        'afterend',
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
            let itemsArr = document.querySelectorAll(".bookmark-item")
    let items = []
    itemsArr.forEach(item => {
        let elem = {}
        elem.name = item.querySelectorAll("span")[1].innerHTML;
        let last = item.querySelector(".link-default").innerHTML;
        elem.last = last.slice(last.lastIndexOf(" ") + 1)
        if (item.querySelector(".bookmark-item__continue")) {
            let contin = item.querySelector(".bookmark-item__continue").innerText;
            elem.continue = contin.slice(contin.lastIndexOf("-") + 1, -1)
        }

        items.push(elem)
    });
    let whisOutPart=items.filter(obj => !("continue" in obj));
    console.log("Без частей:", whisOutPart)
    let notRead = [];
    items.forEach(item => {
        if ((item.last != item.continue)||(item.last < item.continue)) {
            notRead.push(item.name)
        }
    });  
    console.log("Не дочитано: ", notRead.length)
    notRead.forEach((item, index) => {
        console.log(index,item)
    });}, 5000);

			'><img width="16" height="16" src="https://img.icons8.com/plumpy/16/rabbit-in-hat.png" alt="rabbit-in-hat" /></div>
        `,
    );
}
