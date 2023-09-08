const addBtn = document.querySelector(".btn");
const main = document.querySelector(".main");
// console.log(addbtn);



addBtn.addEventListener(
    "click", function() {
        addNotes();
    }
)

function saveNotes(){
    const notes = document.querySelectorAll(".note textarea");
    // console.log(notes);
    const data =[];
    notes.forEach((note) => {
        data.push(note.value);
    });
    // console.log(data);
    if(data.length === 0)
    {
        localStorage.removeItem("notes");
    } else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
    
}

const addNotes=(text='') =>
{
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;


    const deleteBtn = note.querySelector(".trash");
    deleteBtn.addEventListener("click", function(){
        note.remove();
        saveNotes();
    });


    const saveBtn = note.querySelector(".save");
    saveBtn.addEventListener("click",function(){
        saveNotes();
    });

    const tA = note.querySelector("textarea");
    tA.addEventListener(
        "focusout",function(){
            saveNotes();
        });
        
    main.appendChild(note);
    saveNotes();
}

(
    function(){
        const localStorageNotes = JSON.parse(localStorage.getItem("notes"));
        if(localStorageNotes === null)
            addNotes("");
        else{
            localStorageNotes.forEach(
            (localStorageNote) => {
                addNotes(localStorageNote);
            });
        }
    }
)() 