export class Note {
    static create(note){
        return fetch('https://task1-32668-default-rtdb.europe-west1.firebasedatabase.app/notes.json', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            note.id = response.name
            return note
        })
        .then(addToLocalStorage)
        .then(Note.renderTables)
    }

    static archive(id){
        let notes_all = getNotesFromLocalStorage() 
        let note = notes_all.find(note => note.id == id)
        note.archive = !note.archive
        let note_update = JSON.parse(JSON.stringify(note))
        delete note_update.id

        if (updateItemInBase(note.id, note_update)) {
            localStorage.setItem('notes_all', JSON.stringify(notes_all))
            Note.renderTables()
        }   
    }

    static update(note){
        let notes_all = getNotesFromLocalStorage()
        notes_all = notes_all.map(x => (x.id === note.id ? note : x))
        let note_update = JSON.parse(JSON.stringify(note))
        delete note_update.id

        if (updateItemInBase(note.id, note_update)) {
            localStorage.setItem('notes_all', JSON.stringify(notes_all))
            Note.renderTables()
        } 
    }

    static deleteItem(id) {    
        if (deleteItemFromBase(id)) {
            deleteItemFromLocalStorage(id)
            Note.renderTables()
        }
    }

    static getCategories() {
        return getCategoriesFromLocalStorage()
    }

    static getall(){
        loadBase('notes_all', 'notes')
        
        loadBase('categories', 'category')   

        setSelect()
        Note.renderTables()
    }

    static getNoteById(id) {
        return getNotesFromLocalStorage().find(note => note.id == id)       
    } 

    static renderTables() {
        const notes_all = getNotesFromLocalStorage() 
        const notes = notes_all.filter(note => !note.archive)
        const notes_archive = notes_all.filter(note => note.archive)
        const categories = getCategoriesFromLocalStorage()

        setTable(notes, '#table-notes')

        setTable(notes_archive, '#table-archive')

        setTableCategory(categories, '#table-categories')
    }        
}

async function updateItemInBase(id, note) {
    let response = await fetch(`https://task1-32668-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response)
    
    return response.ok
}

async function deleteItemFromBase(id) {
    let response = await fetch(`https://task1-32668-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`, {
         method: 'DELETE'
    })

    return response.ok    
}

function setSelect() {
    const selectCategories = document.querySelector('#categories')

    const categories = getCategoriesFromLocalStorage()

    selectCategories.innerHTML = categories.map(n => `<option value="${n.name}">${n.name}</option>`).join('')
}

async function loadBase(name, base) {
    const result = await fetch(`https://task1-32668-default-rtdb.europe-west1.firebasedatabase.app/${base}.json`)
    .then(response => response.json())
    .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`
        }

        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })) : []
      })
      
    localStorage.setItem(name, JSON.stringify(result))     
}

function deleteItemFromLocalStorage(id) {
    let notes_all = getNotesFromLocalStorage()
    notes_all = notes_all.filter(x => x.id !== id)
    localStorage.setItem('notes_all', JSON.stringify(notes_all))
}

function setTable(notes, table_name) {
    const html = Object.keys(notes).length
            ? notes.map(toRow).join(' ')
            : `<div>Not Found</div>`;

    const table = document.querySelector(table_name)
    table.innerHTML = html
}

function addToLocalStorage(note) { 
    const notes_all = getNotesFromLocalStorage()
    notes_all.push(note)
    localStorage.setItem('notes_all', JSON.stringify(notes_all))
}

function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('notes_all') || '[]')
}

function getCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('categories') || '[]')
}

function toRow(note) { 
    let sButtons = `
        <div class="container" >            
            <button class="btn" name="edit" data-id=${note.id} >
                <img height="25" width="25" src="https://img.icons8.com/material-rounded/344/edit--v1.png">
            </button>          
            <button class="btn" name="archive" data-id=${note.id} >
                <img height="25" width="25" src="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/344/external-_36-user-interface-jumpicon-(glyph)-jumpicon-glyph-ayub-irawan.png">
            </button>          
            <button class="btn" name="delete" data-id=${note.id}>
                <img height="25" width="25" src="https://img.icons8.com/material-sharp/344/trash.png">
            </button>
        </div> 
        `
    if (note.archive) {
        sButtons = `
        <div class="container">                    
            <button class="btn" name="archive" data-id=${note.id}>
                <img height="25" width="25" src="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/344/external-_36-user-interface-jumpicon-(glyph)-jumpicon-glyph-ayub-irawan.png">
            </button>          
            <button class="btn" name="delete" data-id=${note.id}>
                <img height="25" width="25" src="https://img.icons8.com/material-sharp/344/trash.png">
            </button>
        </div>
        `
    }

    return `
        <tr>
            <td><img height="45" width="45" src="${note.picture}"></td>
            <td>${note.name}</td>
            <td>${new Date(note.created).toLocaleDateString()}</td>
            <td>${note.category}</td>
            <td>${note.content}</td>
            <td>${note.dates}</td>
            <td>${sButtons}</td>
        </tr>
    `  
}

function setTableCategory(categories, table_name) {
    const html = Object.keys(categories).length
            ? categories.map(toRowCategory).join(' ')
            : `<div>Not Found</div>`;

    const table = document.querySelector(table_name)
    table.innerHTML = html
}

function toRowCategory(category) { 
    const notes_all = getNotesFromLocalStorage() 
    const count = Object.keys(notes_all.filter(note => !note.archive && category.name == note.category)).length
    const count_archive = Object.keys(notes_all.filter(note => note.archive && category.name == note.category)).length

    return `
        <tr>
            <td><img height="45" width="45" src="${category.picture}"></td>
            <td>${category.name}</td>
            <td>${count}</td>
            <td>${count_archive}</td>
        </tr>
    ` 
}