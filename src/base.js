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
        .then(Note.renderTable)
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

            const n = JSON.stringify(result)
            console.log('n')
            console.log(result)
            
        localStorage.setItem('notes', JSON.stringify(result))    

        Note.renderTable()
    }

    static renderTable() {
        const notes = getNotesFromLocalStorage() 
        console.log('notes')
        const n = Object.keys(notes).length;
        console.log(n)

        const html = Object.keys(notes).length
            ? notes.map(toRow).join(' ')
            : `<div>Not Found</div>`;

            
        console.log('html')
        console.log(html)

        const table = document.getElementById('table-notes')

        table.innerHTML = html
    }
}

function addToLocalStorage(note) { 
    const all = getNotesFromLocalStorage()
    all.push(note)
    localStorage.setItem('notes', JSON.stringify(all))
}

function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('notes') || '[]')
}

function toRow(note) {  
    return `
        <tr>
            <td><img height="45" width="45" src="${note.picture}"></td>
            <td>${note.name}</td>
            <td>${new Date(note.created).toLocaleDateString()}</td>
            <td>${note.category}</td>
            <td>${note.content}</td>
            <td>${note.dates}</td>
            <td>
                <img height="25" width="25" src="https://img.icons8.com/material-rounded/344/edit--v1.png">
                <img height="25" width="25" src="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/344/external-_36-user-interface-jumpicon-(glyph)-jumpicon-glyph-ayub-irawan.png">
                <img height="25" width="25" src="https://img.icons8.com/material-sharp/344/trash.png">
            </td>
        </tr>
    `
  
}