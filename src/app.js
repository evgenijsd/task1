import {Note} from './base'
import './css/main.css'
import './css/animate.min.css'
import './css/modal.css'

window.addEventListener('load', Note.getall);
const buttonCreate = document.querySelector('#button-create')
buttonCreate.addEventListener('click', onOpenCreate) 

const close_modal = document.getElementById('close_modal');
const modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];

close_modal.onclick = function() {
    modal.classList.add('bounceOutDown')
    window.setTimeout(function() {
        modal.classList.remove('modal_vis')
        body.classList.remove('body_block')
    }, 500)
};

function onOpenCreate() {
    modal.classList.add('modal_vis')
    modal.classList.remove('bounceOutDown')
    body.classList.add('body_block')
}