import {Note} from './base'
import './css/main.css'
import json_notes from './notes.json'

window.addEventListener('load', Note.getall);
const buttonCreate = document.querySelector('#button-create')
buttonCreate.addEventListener('click', onButtonClick) 

function onButtonClick() {
    json_notes[0].created = new Date().toJSON()
    Note.create(json_notes[0])
    //console.log('1111111111')
    //console.log(json_notes[0])
   //Note.renderTable()
}