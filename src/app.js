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
const categoriesBase = Note.getCategories()
localStorage.setItem('id', '')

const close_modal = document.getElementById('close_modal');
const modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];

form.addEventListener('submit', submitFormHandler)
buttonCreate.addEventListener('click', onOpenCreate)

document.body.querySelectorAll('.btn2').forEach(button => {
    button.addEventListener('click', onHeaderButton)
})

setButtonsTablesEvents()

function setButtonsTablesEvents() {
    window.setTimeout(function() {    
        var buttons = document.body.getElementsByClassName('btn')
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', onRowButton)
        }
    }, 500)
}

function onHeaderButton() {
    console.log(this.id)
}

function onRowButton() {
    switch (this.name) {
        case 'edit':
            const id = this.getAttribute('data-id')
            const note = Note.getNoteById(id)
            name.value = note.name
            categories.value = note.category
            content.value = note.content
            dates.value = note.dates
            localStorage.setItem('id', id)
            onOpenCreate()
            break
        case 'delete':
            Note.deleteItem(this.getAttribute('data-id'))
            break
        case 'archive': 
            Note.archive(this.getAttribute('data-id'))
            break
        }; 
        
    setButtonsTablesEvents()
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
    if (!id) {
        Note.create(note)
    } else {
        note.id = id
        Note.update(note)
    }

    setButtonsTablesEvents()
    localStorage.setItem('id', '')

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