const fs = require('fs');
const chalk = require('chalk'); 

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.some(note => note.title === title);
   
    if(!duplicateNotes){
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added"));
    }else{
        console.log(chalk.red.inverse("Note title taken"));
    }
    
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
   
}

const removeNote = (title) => {
    const notes = loadNotes();
    const index = notes.findIndex(note => note.title === title);
    if(index === -1){
        console.log(chalk.red.inverse("Note not found!"));
    }else{
        console.log(notes[index]);
        notes.splice(index, 1);
        saveNotes(notes);
        console.log(chalk.green.inverse("Note removed!"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length === 0){
        chalk.red.inverse("No note found!");
    }else{
        console.log(chalk.green.inverse("Your notes"), notes.map(note => note.title).join(','))
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if(note){
        console.log(chalk.green.inverse(note.title), note.body);
    }else{
        console.log(chalk.red.inverse("No note found!"));
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}