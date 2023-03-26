const fs = require('fs')

const getNotes = ()=> {
    var allNotes = fs.readFileSync("notes.json")
    allNotes = allNotes.toString()
    if (allNotes !== "") {
        const All = JSON.parse(allNotes)
        console.log("------------------------------------------------")
        All.map(function (note,index){
            console.log("Note :" +(index+1))
            console.log("Title: "+note.title)
            console.log("Content: "+note.body)
            console.log("------------------------------------------------")
        })
    }
    else {
        console.log("------------------------------------------------")
        console.log("No Notes found!")
        console.log("------------------------------------------------")
    }

}

const addNote =  (title, body)=> {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = title =>{
    const notes = loadNotes()
    const filteredNotes = notes.filter( note=>  note.title!== title)
    if (loadNotes().length === filteredNotes.length) {
        console.log("------------------------------------------------")
        console.log("we couldn't find this note!")
        console.log("------------------------------------------------")
    }
    else {
        saveNotes(filteredNotes)
        console.log('Note removed!')
    }

}

const readNote =  title=> {
    var allNotes = fs.readFileSync("notes.json")
    allNotes = allNotes.toString()
    if (allNotes !== "") {
        const All = JSON.parse(allNotes)
        const find = All.filter((note) => {
            return note.title === title
        })
        if (find.length>0) {
            console.log("------------------------------------------------")
            console.log("Title: " + find[0].title)
            console.log("Content: " + find[0].body)
            console.log("------------------------------------------------")
        } else {
            console.log("------------------------------------------------")
            console.log("Note not found!")
            console.log("------------------------------------------------")
        }
    }
    else {
        console.log("------------------------------------------------")
        console.log("No Notes found! You Had to add note first! ")
        console.log("if you don't know how to do it, please type node app.js help")
        console.log("------------------------------------------------")
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}