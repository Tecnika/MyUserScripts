// ==UserScript==
// @name        CoddyAutoGrate
// @description	Скрипт для автоматической простановки оценок И ВРЕМЕНИ по кнопке.
// @include     https://coddy.t8s.ru/Profile/*
// @grant       none
// @version     4.1
// @author      Tecnika
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
          if (document.querySelector('#MailingSmsingBackUrl')){
            clearInterval(i);
          }else{
            // если нашли останавливаем таймер и вызываем алерт
            console.log('i have modal');
            clearInterval(i);
            // AutoGrade();
            if (!document.querySelector('#btnGrade')) { addButton(); }
            //    document.getElementById('btnParser').onclick = AutoGrate;
        }}
    }, 1000);
}



//Добавление кнопочки "Сделать красиво", для не автоматического срабатывания скрипта ниже
const addButton = () => {

    let div = document.querySelector('.modal.HHFade.show');
    div.querySelector('.modal-footer').insertAdjacentHTML(
        'afterbegin',
        `
        <div class="col-auto px-0">
            <button type='button' id='btnGrade' class="btn btn-outline-danger" onclick="
                console.log('im here')
                let star = document.querySelectorAll('.StarLink');
                if (!!star){
					star.forEach(element => {
    					element.classList.add('Mark');
					});
                }   
                
                let score = [];
                for (let i = 0; i < 3; i++) {
                  	score.push(document.querySelector('#Score' + i));
                }
                score.forEach(input => {
                   	input.value = 5;
                 	input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
                 	input.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true }));
                	input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
                	input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                });
        
                let input = document.querySelector('#DisciplineId')
                if (!!input){
                	input.value = '63';
                	input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
                	input.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true }));
                	input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
                	input.dispatchEvent(new Event('input', { bubbles: true }));
                	input.dispatchEvent(new Event('change', { bubbles: true }));
                }
                
                let teacher = document.querySelector('.d-none.d-lg-inline').innerText
				let time = document.querySelector('#tabActual')
				let allCard = time.querySelectorAll('.card')
                let hours, minuts
				allCard.forEach(a => {
				    time = a.querySelector('.TrNoTopBorders')
                    let arr=time.querySelectorAll('td')[0].innerText.split(' ')
                    arr= arr.filter((element) => element.length >= 2)
				    if ((arr[0]+ ' ' + arr[1]) == teacher) {
				        time = time.querySelectorAll('td')[2].innerHTML.split('с')[1]
				        let shift = 1;
				        hours = time[1] + time[2];
				        if (time[2] === ':') {
			    	        shift = 0
				            hours = '0' + time[1]
				        }
				        minuts = time[3 + shift] + time[4 + shift];
				        console.log(hours, ':', minuts)
				    }
				});
                
                input = document.querySelector('.is-timeEntry')
                input.value = hours + ':' + minuts;
                input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                
            ">Сделать красиво</button>
        </div>
        `,
    );
}


//Проставление
const addContent = (input, value) => {
    input.value = value;
    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
}
//Поиск нужных полей и проставление
const AutoGrade = () => {
    console.log('im here')
    let score = [];
    for (let i = 0; i < 3; i++) {
        score.push(document.querySelector('#Score' + i));
    }
    score.forEach(input => {
        addContent(input, '5')
    });
    let discipline = document.querySelector('#DisciplineId')
    addContent(discipline, '63')
    addTime()
}


//Проставление времени по умолчанию
const addTime = () => {
    let time = document.querySelector('#tabActual')
    time = time.querySelector('.TrNoTopBorders')
    time = time.querySelectorAll('td')[2].innerHTML.split('с')[1]
    let shift = 1;
    let hours = time[1] + time[2];
    if (time[2] === ':') {
        shift = 0
        hours = '0' + time[1]
    }
    let minuts = time[3 + shift] + time[4 + shift];
    console.log(hours)
    console.log(minuts)
    let setTime = document.querySelector('.is-timeEntry')
    addContent(setTime, hours + ':' + minuts)
}