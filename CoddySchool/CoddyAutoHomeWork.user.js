// ==UserScript==
// @name        CoddyAutoHomeWork
// @description	Скрипт для автоматической простановки дз
// @include     https://coddy.t8s.ru/Learner/MiniGroup/*
// @include     https://coddy.t8s.ru/Learner/Group/*
// @include     https://coddy.t8s.ru/Learner/Individual/*
// @grant       none
// @version     2.0
// @author      Tecnika
// ==/UserScript==
window.addEventListener('load', function () {
    if (ProfileStatus() > 0) {
        console.log('hello')
        let j = setInterval(function () {
            if (!document.querySelector('.modal.HHFade.show')) {
                SearchModal();
            }
        }, 1000);
    }

})

const ProfileStatus = () => {
    let status = document.querySelector('x-very-small-font-block');
    console.log('status', status);
    let status_name = '';
    if (status) {
        status = status.outerHTML;
        status_name = status.indexOf('руппа');
    }

    else {
        let status = document.querySelector('x-caption.col-sm').outerHTML;
        status_name = status.indexOf('заняти');
    }
    console.log('status_name', status_name)
    return status_name
}

const SearchModal = () => {
    // Выбираем целевой элемент
    let i = setInterval(function () {
        if (document.querySelector('.modal.HHFade.show')) {
            if (document.querySelector('#MailingSmsingBackUrl')) {
                clearInterval(i);
            } else {
                // если нашли останавливаем таймер и вызываем алерт
                console.log('i have modal');
                clearInterval(i);
                // AutoGrade();
                if (!document.querySelector('#btnSHW')) {
                    if (document.querySelector('.modal.HHFade.show').querySelector('.modal-title').innerText.includes(' ДЗ'))
                        addButton();
                }
                //    document.getElementById('btnParser').onclick = AutoGrate;
            }
        }
    }, 1000);
}



//Добавление кнопочки "Сделать красиво", для не автоматического срабатывания скрипта ниже
const addButton = () => {
    let i = '0';
    let groupname = document.querySelector('x-caption').innerText.split(' ')[0];
    if (!!groupname) {
        let name = groupname.split('ANIME')[1];
        if (name === groupname) {
            name = groupname.split('MANGA')[1];
        }
        if (!!name) {
            i = name;
        }
    }
    let shablon = '<p>https://sites.google.com/view/coddyanime/AnimeStyle/Homeworks/Modul' + i + '/hw1</p><p> Так же дз продублировано на сервере дискорд</p><p>Если есть проблемы со входом:</p><p>https://sites.google.com/view/course-coddyanime/index</p>';
    let trivially = '<p>Повторить упражнение с урока с использованием дополнительных средств и шаблонов в качестве референсов</p>';
    let plug = '<p>Провести работу над ошибками по прошлому дз и классной работе. Сделать задание с урока самостоятельно(Референсы из интернета разрешены). Большое внимание обратить на свои типовые ошибки</p>';
    let consultation = '<p>Cделать правки по рекомендациям с урока</p>'
    let freedom = '<p>Рисование на свободную тему. Сделать как можно больше и качественнее. Уклон на качество.</p>'
    let finish = '<p>Продолжить начатую на уроке работу</p>'
    let div = document.querySelector('.modal.HHFade.show');
    div.querySelector('.modal-footer').insertAdjacentHTML(
        'afterbegin',
        `ДЗ:
        <div class="col-auto px-0">
            <button type='button' id='btnSHW' class="btn btn-dark" onclick="
                console.log('im here');
                let field = document.querySelector('#Description_ifr').contentDocument.querySelector('#tinymce');
				field.innerHTML='`+ shablon + `';
            ">Шаблон</button>
        </div>
        <div class="col-auto px-0">
            <button type='button' id='btnTHW' class="btn btn-info" onclick="
                console.log('im here');
                let field = document.querySelector('#Description_ifr').contentDocument.querySelector('#tinymce');
				field.innerHTML='`+ trivially + `';
            ">Тривиально</button>
        </div>
         <div class="col-auto px-0">
            <button type='button' id='btnFinHW' class="btn btn-primary" onclick="
                console.log('im here');
                let field = document.querySelector('#Description_ifr').contentDocument.querySelector('#tinymce');
				field.innerHTML='`+ finish + `';
            ">Продолжить</button>
        </div>
        <div class="col-auto px-0">
            <button type='button' id='btnСHW' class="btn btn-warning" onclick="
                console.log('im here');
                let field = document.querySelector('#Description_ifr').contentDocument.querySelector('#tinymce');
				field.innerHTML='`+ consultation + `';
            ">Консультации</button>
        </div>        
        <div class="col-auto px-0">
            <button type='button' id='btnPHW' class="btn btn-danger" onclick="
                console.log('im here');
                let field = document.querySelector('#Description_ifr').contentDocument.querySelector('#tinymce');
				field.innerHTML='`+ plug + `';
            ">Заглушка</button>
        </div>
        <div class="col-auto px-0">
            <button type='button' id='btnFHW' class="btn btn-success" onclick="
                console.log('im here');
                let field = document.querySelector('#Description_ifr').contentDocument.querySelector('#tinymce');
				field.innerHTML='`+ freedom + `';
            ">Свобода</button>
        </div>
       
        `,
    );
}



