// ==UserScript==
// @name        CoddyAutoEmail
// @description	Скрипт для шаблонизатора email
// @include     https://coddy.t8s.ru/Profile/*
// @include     https://coddy.t8s.ru/Profile/5743
// @include     https://coddy.t8s.ru/Profile/31513
// @grant       none
// @version     1.3
// @author      Tecnika
// @downloadURL https://github.com/Tecnika/MyUserScripts/raw/main/CoddySchool/CoddyAutoEmail.user.js
// ==/UserScript==
window.addEventListener('load', function () {
    if (ProfileStatus() === 'Ученик') {
    let j = setInterval(function () {
        if (!document.querySelector('.modal.HHFade.show')) {
            SearchModal();
        }
    }, 1000);
      }

})

const ProfileStatus = () => {
    let status = document.querySelector('x-very-small-font-block');
    let str1 = status.textContent.split('Ученик')[1];
    let str2 = status.textContent.split('Ученик')[0];
    let status_name = status.textContent.split(str1)[0];
    status_name = status.textContent.split(str2)[1];
    return status_name
}
const SearchModal = () => {
    // Выбираем целевой элемент
    let i = setInterval(function () {
        if (document.querySelector('.modal.HHFade.show')) {
            if (document.querySelector('#MailingSmsingBackUrl')) {
                console.log('i have need modal');
                clearInterval(i);
                if (!document.querySelector('#btnDrop')) {
                    if (document.querySelector('.modal.HHFade.show').querySelector('.modal-title').innerText.includes(' email'))
                        addButton();
                }
            } else {
                // если нашли останавливаем таймер и вызываем алерт
                console.log('i have modal');
                clearInterval(i);
                // AutoGrade();

            }
        }
    }, 1000);
}
//Добавление кнопочки "Сделать красиво", для не автоматического срабатывания скрипта ниже
const addButton = () => {
    console.log('addButton')
    let dropmefiles = 'https://dropmefiles.com/';
    let date = addDate();
  //let date = new Date();
    let name_student = addName();
    let txt_g = txt('a', name_student, date);
    let txt_b = txt('', name_student, date);
    let div = document.querySelector('.modal.HHFade.show');
    div.querySelector('.modal-footer').insertAdjacentHTML(
        'afterbegin',
        `
          <div id='btnDrop' class="col-auto px-0">
          <a href="`+ dropmefiles + `"class="btn btn-success" target="_blank">DropMeFiles</a>
          </div>
          <div class="col-auto px-0">
              <button type='button' id='btnEmail' class="btn btn-info" onclick="
                  console.log('im a boy');
                  let input = document.querySelector('#Subject');
                  input.value = 'Запись с урока';
                    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
                    input.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true }));
                   input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
                   input.dispatchEvent(new Event('input', { bubbles: true }));
                   input.dispatchEvent(new Event('change', { bubbles: true }));
                  let field = document.querySelector('#Body_ifr').contentDocument.querySelector('#tinymce');
                  field.innerHTML='`+ txt_b + `';
              ">ПропустиЛ</button>
          </div>
          <div class="col-auto px-0">
              <button type='button' id='btnEmail' class="btn btn-danger" onclick="
                  console.log('im a girl');
                  let input = document.querySelector('#Subject');
                  input.value = 'Запись с урока';
                    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
                    input.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true }));
                   input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
                   input.dispatchEvent(new Event('input', { bubbles: true }));
                   input.dispatchEvent(new Event('change', { bubbles: true }));
                  let field = document.querySelector('#Body_ifr').contentDocument.querySelector('#tinymce');
                  field.innerHTML='`+ txt_g + `';
              ">ПропустиЛA</button>
          </div>
          `,
    );
}
const txt = (a, name, date) => {
    return ('<p>Здравствуйте, ' + name + ' отсутствовал' + a + ' на последнем занятии ' + date + '. Высылаю запись урока с теорией(ссылка для скачивания).</p><p>ССЫЛКА</p><p>Урок для скачивания доступен в течении 14 дней с отправки сообщения. Если будут вопросы или не получится скачать, то пожалуйста, сразу напишите мне в любой мессенджер (номер телефона 891917774188)</p>')
}

const addName = () => {
  console.log('addName');
    let name = document.querySelector('x-caption').innerText;
   console.log('name');
   console.log(name.split('\n')[0]);
    return name.split('\n')[0]
}
const addDate = () => {
    let past = document.querySelectorAll('[class^="Past"]');
    let last_day = past[past.length - 1];
    let year = new Date().getFullYear();
    let date = last_day.innerText + '.' + year;
    return date
}
