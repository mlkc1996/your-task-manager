// const { v4: uuidv4 } = require('uuid');
const notes = getNotes()
const searchFilters = {
    text: "",
    sort: "byCreated",
    hideCompleted: ""
}

renderNotes(notes, searchFilters)

const addNote = document.querySelector("#addNote")
const newNote = document.querySelector("#newNote")
const due = document.getElementById("datepicker")
newNote.addEventListener("submit", (e) => {
    e.preventDefault()
    const timestamp = moment().valueOf()
    const id = uuidv4()
    const newNote = {
        id: id,
        title: addNote.value,
        description: "",
        complete: false,
        editedAt: timestamp,
        createdAt: timestamp,
        due: moment(due.value).valueOf()
    }

    notes.push(newNote)
    addNote.value = ""
    saveNotes(notes)
    location.assign(`./edit.html#${newNote.id}`)
})



const sortTasks = document.querySelector("#sortTasks")
sortTasks.addEventListener("change", (e) => {
    searchFilters.sort = e.target.value
    sortTodo(notes, searchFilters)
    renderNotes(notes, searchFilters)
})

const hideCompleted = document.querySelector("#filterUncompleted")
hideCompleted.addEventListener("change", (e) => {
    if (e.target.checked) {
        searchFilters.hideCompleted = "false"
        renderNotes(notes, searchFilters)
    } else {
        searchFilters.hideCompleted = ""
        renderNotes(notes, searchFilters)
    }
})

const serachBar = document.querySelector("#searchBar")
serachBar.addEventListener("input", (e) => {
    searchFilters.text = e.target.value.toLowerCase()
    renderNotes(notes, searchFilters)
})

window.addEventListener("storage", (e) => {
    const newNotes = JSON.parse(e.newValue)
    renderNotes(newNotes, searchFilters)
})