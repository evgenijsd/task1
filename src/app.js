import {Note} from './base'
import './css/main.css'
import './css/animate.min.css'
import './css/modal.css'

window.addEventListener('load', Note.getall);
const buttonCreate = document.querySelector('#button-create')
const form = document.querySelector('#form')
const categories = form.querySelector('#categories')
const name = form.querySelector('#name')
const content = form.querySelector('#content')
const dates = form.querySelector('#dates')
let categoriesBase = JSON.parse(localStorage.getItem('categories'))

const close_modal = document.getElementById('close_modal');
const modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];

form.addEventListener('submit', submitFormHandler)
buttonCreate.addEventListener('click', onOpenCreate) 

document.body.querySelectorAll('.btn2').forEach(button => {
    button.addEventListener('click', onHeaderButton)
})

function onHeaderButton(obj) {
    console.log(this.id)
}

function submitFormHandler(event) {    
    event.preventDefault()

    const id =  localStorage.getItem('id')
    const picture = categoriesBase.find(x => x.name == categories.value).picture

    const note = {
            picture: picture,
            name: name.value,
            created: new Date(),
            category: categories.value,
            content: content.value,
            dates: dates.value,
            archive: false    
    }
    Note.create(note)

    closeWindow()
}

close_modal.onclick = function() {
    closeWindow()
}

function closeWindow() {
    modal.classList.add('bounceOutDown')
    window.setTimeout(function() {
        modal.classList.remove('modal_vis')
        body.classList.remove('body_block')
    }, 500)
}

function onOpenCreate() {
    modal.classList.add('modal_vis')
    modal.classList.remove('bounceOutDown')
    body.classList.add('body_block')
}