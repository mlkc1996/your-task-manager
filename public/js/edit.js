const noteId = location.hash.substring(1)
const notes = JSON.parse(localStorage.getItem("notes"))
const note = notes.find(note => note.id === noteId)

const pageTitle = document.querySelector("#pageTitle")
pageTitle.innerHTML = `${note.title} | Your Task Manager`

const taskTitle = document.getElementById("taskTitle")
taskTitle.innerHTML = note.title

const input = document.querySelector("#taskTitleInput")
input.value = note.title

const createdAt = document.querySelector("#createdAt")
createdAt.innerHTML = `Created At: ${moment(note.createdAt).format("lll")}`

const editedAt = document.querySelector("#lastEdited")
editedAt.innerHTML = `Last Edited: ${moment(note.editedAt).format("lll")}`

const due = document.querySelector("#due")
const now = moment()
due.innerHTML = `DUE: ${now.to(moment(note.due))}`

const changeDue = document.querySelector("#changeDue")
changeDue.value = moment(note.due).format("L")

backHome.addEventListener("click", () => {
    const index = notes.findIndex((note) => note.id === noteId)
    notes[index].due = changeDue.value
    changeEdit(notes, index)
    saveNotes(notes)
})

input.addEventListener("input", (e) => {
    pageTitle.innerHTML = `${e.target.value} | Your Task Manager`
    taskTitle.innerHTML = e.target.value
    const index = notes.findIndex((note) => note.id === noteId)
    notes[index].title = e.target.value
    changeEdit(notes, index)
    if (e.target.value === "") {
        notes[index].title = "Unnamed Todo"
    }
    saveNotes(notes)
})

const noteBody = document.querySelector("textarea")
noteBody.innerHTML = note.description

noteBody.addEventListener("input", (e) => {
    const index = notes.findIndex((note) => note.id === noteId)
    notes[index].description = e.target.value
    changeEdit(notes, index)
    saveNotes(notes)
})

const completed = document.getElementById("completed")
if (note.complete) {
    completed.setAttribute("checked", "checked")
}

completed.addEventListener("click", () => {
    const index = notes.findIndex((note) => note.id === noteId)
    notes[index].complete = !notes[index].complete
    changeEdit(notes, index)
    saveNotes(notes)
})

const removeBtn = document.getElementById("removeBtn")
removeBtn.addEventListener("click", () => {
    const index = notes.findIndex((note) => note.id === noteId)
    notes.splice(index, 1)
    saveNotes(notes)
    location.assign("./")
})

window.addEventListener("storage", (e) => {
    const newNotes = JSON.parse(e.newValue)
    const editedNote = newNotes.find(note => note.id === noteId)
    const index = newNotes.findIndex(note => note.id === noteId)
    const pageTitle = document.querySelector("#pageTitle")

    pageTitle.innerHTML = editedNote.title
    taskTitle.innerHTML = editedNote.title
    input.value = editedNote.title
    createdAt.innerHTML = moment(editedNote.createdAt).format("lll")
    changeEdit(newNotes, index)
    due.innerHTML = now.to(moment(editedNote.due))
    changeDue.value = moment(editedNote.due).format("L")
})

const changeEdit = (notes, index) => {
    const edit = moment().valueOf()
    notes[index].editedAt = edit
    editedAt.innerHTML = moment(edit).fromNow()
}