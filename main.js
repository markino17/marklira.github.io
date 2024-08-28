const add_button = document.getElementById("add-note");
const add_note_div = document.getElementById("add-note-popup");
const add_form = document.getElementById("add");
const view_note_div = document.getElementById('view-note-popup');
const form_title = document.getElementsByClassName("form-title");
const form_content = document.getElementsByClassName("form-content");
const all_notes = document.getElementById("all-notes");
const go_back = document.getElementsByClassName("back");
const view_title = document.getElementById("view-title");
const view_text = document.getElementById("view-text");

//pulls up form for adding a note upon clicking add in nav bar
add_button.addEventListener('click', function () {
    add_note_div.style.display = "block";
})

//upon submit, collects info and adds to list
add_form.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = form_title[0].value;
    let new_item = document.createElement('li');
    let new_item_formatted = `<p class="expand">${title}</p><button class="delete">Delete</button>`;
    new_item.innerHTML = new_item_formatted;
    all_notes.appendChild(new_item);

    let pairs = JSON.parse(localStorage.getItem('titleTextPairs')) || {};
    pairs[form_title[0].value] = form_content[0].value;
    localStorage.setItem('titleTextPairs', JSON.stringify(pairs));

    add_note_div.style.display = "none";
    form_title[0].value = "";
    form_content[0].value = "";
})

all_notes.addEventListener('click', (event) => {
    let target = event.target
    if (target.className == 'delete') {
        let pairs = JSON.parse(localStorage.getItem('titleTextPairs')) || {};
        for (title in pairs) {
            if (title == target.previousSibling.innerText) {
                delete pairs[title];
                localStorage.setItem('titleTextPairs', JSON.stringify(pairs));
            }
        }
        target.parentElement.remove();
    }
    if (target.className == 'expand') {
        view_note_insert(target);
    }

})
function view_note_insert(target) {
    view_note_div.style.display = "block";
    let pairs = JSON.parse(localStorage.getItem('titleTextPairs')) || {};
    for (title in pairs) {
        if (title == target.innerText) {
            view_title.innerText = title;
            view_text.innerText = pairs[title];
        }
    }
}
view_note_div.addEventListener('click', event => {
    target = event.target;
    if (target.className == 'back') {
        view_note_div.style.display = 'none';
    }
})

window.onload = function () {
    let pairs = JSON.parse(localStorage.getItem('titleTextPairs')) || {};
    for (let title in pairs) {
        if (pairs.hasOwnProperty(title)) {
            let new_item = document.createElement("li");
            let new_item_formatted = `<p class="expand">${title}</p><button class="delete">Delete</button>`;
            new_item.innerHTML = new_item_formatted;
            all_notes.appendChild(new_item);
        }
    }
}
