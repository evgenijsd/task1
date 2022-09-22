import {Note} from './base'
import './css/main.css'
import './css/animate.min.css'
import './css/modal.css'
import json_notes from './notes.json'

window.addEventListener('load', Note.getall);
const buttonCreate = document.querySelector('#button-create')
buttonCreate.addEventListener('click', onOpenCreate) 

//let open_modal = document.querySelectorAll('.open_modal');
const close_modal = document.getElementById('close_modal');
const modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];
// for (let i = 0; i < open_modal.length; i++) {
//     open_modal[i].onclick = function() { // клик на открытие
//         modal.classList.add('modal_vis'); // добавляем видимость окна
//         modal.classList.remove('bounceOutDown'); // удаляем эффект закрытия
//         body.classList.add('body_block'); // убираем прокрутку
//     };
// }
close_modal.onclick = function() { // клик на закрытие
    modal.classList.add('bounceOutDown'); // добавляем эффект закрытия
    window.setTimeout(function() { // удаляем окно через полсекунды (чтобы увидеть эффект закрытия).
        modal.classList.remove('modal_vis');
        body.classList.remove('body_block'); // возвращаем прокрутку
    }, 500);
};

function onOpenCreate() {
            modal.classList.add('modal_vis'); // добавляем видимость окна
        modal.classList.remove('bounceOutDown'); // удаляем эффект закрытия
        body.classList.add('body_block'); // убираем прокрутку
    //json_notes[0].created = new Date().toJSON()
    //Note.create(json_notes[0])
    //console.log('1111111111')
    //console.log(json_notes[0])
   //Note.renderTable()
}