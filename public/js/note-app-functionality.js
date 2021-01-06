const renderNotes = (notes, searchFilters) => {
    document.querySelector("#noteDiv").innerHTML = ""
    const filtered = notes.filter((note) => {
        const searchText = searchFilters.text
        const completed = searchFilters.hideCompleted
        return note.title.toLowerCase().includes(searchText) && note.complete.toString().includes(completed)
    })
    if (notes.length === 0) {
        const noMatch = document.createElement("h3")
        noMatch.textContent = "Please add a Task"
        noMatch.setAttribute("class", "noMatch")
        document.querySelector("#noteDiv").appendChild(noMatch)
    } else if (filtered.length === 0) {
        const noMatch = document.createElement("h3")
        noMatch.textContent = "No Matched Task Found!"
        noMatch.setAttribute("class", "noMatch")
        document.querySelector("#noteDiv").appendChild(noMatch)
    } else {
        filtered.forEach(note => {
            createDom(note)
        })
    }
    const summaryHeading = document.querySelector("#summary")
    summary(notes, summaryHeading)

}

const createDom = (note) => {
    const now = moment()
    const id = note.id
    const noteEl = document.createElement("div")
    const textEL = document.createElement("a")
    const checkbox = document.createElement("input")
    const removeBtn = document.createElement("button")
    const createdAt = document.createElement("p")
    const editedAt = document.createElement("p")
    const daysLeft = document.createElement("p")


    textEL.textContent = note.title
    textEL.setAttribute("href", `./edit.html#${note.id}`)
    checkbox.addEventListener("click", (e) => {
        const note = notes.find(note => note.id === id)
        if (note) {
            note.complete = !note.complete
        }
        saveNotes(notes)
        renderNotes(notes, searchFilters)
    })
    checkbox.setAttribute("type", "checkbox")
    if (note.complete) {
        checkbox.setAttribute("checked", "checked")
    }
    removeBtn.addEventListener("click", () => {
        removeNote(id)
        saveNotes(notes)
        renderNotes(notes, searchFilters)
    })
    removeBtn.setAttribute("class", "button button--close task__button")
    removeBtn.textContent = "x"
    createdAt.textContent = `Created: ${moment(note.createdAt).format("lll")}`
    editedAt.textContent = `Last Edited: ${moment(note.editedAt).format("lll")}`
    daysLeft.textContent = `Time left: ${now.to(moment(note.due))}`

    noteEl.appendChild(checkbox)
    checkbox.setAttribute("class", "task__checkbox")
    noteEl.appendChild(textEL)
    textEL.setAttribute("class", "task__title")
    noteEl.appendChild(removeBtn)
    noteEl.appendChild(createdAt)
    createdAt.setAttribute("class", "task__text task--createdAt")
    noteEl.appendChild(editedAt)
    editedAt.setAttribute("class", "task__text task--editedAt")
    noteEl.appendChild(daysLeft)
    daysLeft.setAttribute("class", "task__text task--daysLeft")
    noteEl.setAttribute("class", "task")
    document.querySelector("#noteDiv").appendChild(noteEl)
}

const getNotes = () => {
    const notes = localStorage.getItem("notes")
    try {
        return notes ? JSON.parse(notes) : []
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}

const removeNote = (id) => {
    const locateIndex = notes.findIndex(note => note.id === id)
    notes.splice(locateIndex, 1)
}

const summary = (notes, summaryHeading) => {
    let count = 0
    notes.forEach(note => {
        if (!note.complete) {
            count++
        }
    })

    if (notes.length === 0) {
        return summaryHeading.innerHTML = "Please add a task"
    } else if (count === 0) {
        return summaryHeading.innerHTML = `You have completed all the tasks!`
    } else if (count === 1) {
        return summaryHeading.innerHTML = `You have ${count} task uncompleted!`
    } else {
        return summaryHeading.innerHTML = `You have ${count} tasks uncompleted!`
    }
}

// sorting byCreated, byEdited, byDeadline: use timestamp
// byAlpha: use console.log() to view which letter comes first
const sortTodo = (notes, searchFilters) => {
    if (searchFilters.sort === "byEdited") {
        return notes.sort((a, b) => {
            if (a.editedAt > b.editedAt) {
                return -1
            } else if (a.editedAt < b.editedAt) {
                return 1
            } else {
                return 0
            }
        })
    }

    if (searchFilters.sort === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1
            } else if (a.createdAt > b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    }

    if (searchFilters.sort === "byDue") {
        return notes.sort((a, b) => {
            if (a.due < b.due) {
                return -1
            } else if (a.due > b.due) {
                return 1
            } else {
                return 0
            }
        })
    }

    if (searchFilters.sort === "byAlpha") {
        return notes.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            } else if (a.title > b.title) {
                return 1
            } else {
                return 0
            }
        })
    }

}