
const chalk= require('chalk')
const fs = require('fs')

const getNotes = () => {
  return "Your notes..."
}

// Function to add notes
const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)
  const duplicateNote = notes.find((note) => note.title === title)


  if(! duplicateNote){
    notes.push({
      title: title, 
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New Note added!'))
  } else{
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

// Function to remove note
const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  if(notesToKeep.length < notes.length){
    console.log(chalk.green.inverse("Note removed!"))
  }
  else{
    console.log(chalk.red.inverse("No note found!"))
  }

  saveNotes(notesToKeep)
}

// Function to List Notes
const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.blue.underline("Your Notes"))

  notes.forEach((note) => {
    console.log(note.title)
  })
}

// Function to read note
const readNote =(title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title===title)

  if(note){
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  }
  else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON =  JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)

  }catch (e){
    return []
  }
}

module.exports = {
  getNotes: getNotes, 
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
