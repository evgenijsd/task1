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

    static async getall(){
        const result = await fetch('https://task1-32668-default-rtdb.europe-west1.firebasedatabase.app/notes.json')
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
            
        localStorage.setItem('notes_all', JSON.stringify(result))    

        Note.renderTables()
    }

    static renderTables() {
        const notes_all = getNotesFromLocalStorage() 
        const notes = notes_all.filter(note => !note.archive)
        const notes_archive = notes_all.filter(note => note.archive)

        setTable(notes, '#table-notes')

        setTable(notes_archive, '#table-archive')
    }
}

function setTable(notes, table_name) {
    const html = Object.keys(notes).length
            ? notes.map(toRow).join(' ')
            : `<div>Not Found</div>`;

    const table = document.querySelector(table_name)
    table.innerHTML = html
}

function addToLocalStorage(note) { 
    const all = getNotesFromLocalStorage()
    all.push(note)
    localStorage.setItem('notes_all', JSON.stringify(all))
}

function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('notes_all') || '[]')
}

function toRow(note) { 
    let sButtons = `
        <div class="container">            
            <button class="btn"><img height="25" width="25" src="https://img.icons8.com/material-rounded/344/edit--v1.png"></button>          
            <button class="btn"><img height="25" width="25" src="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/344/external-_36-user-interface-jumpicon-(glyph)-jumpicon-glyph-ayub-irawan.png"></button>          
            <button class="btn"><img height="25" width="25" src="https://img.icons8.com/material-sharp/344/trash.png"></button>
        </div> 
        `
    if (note.archive) {
        sButtons = `
        <div class="container">                    
            <button class="btn"><img height="25" width="25" src="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/344/external-_36-user-interface-jumpicon-(glyph)-jumpicon-glyph-ayub-irawan.png"></button>          
            <button class="btn"><img height="25" width="25" src="https://img.icons8.com/material-sharp/344/trash.png"></button>
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