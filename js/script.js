const API_BASE = 'http://localhost:8080/noted/entries';
let notedData = [];
const addEntryText = 'Add entry';
const hideNewEntryText = 'Clear new entry';


const form = document.getElementById('entry-input');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');
const url = document.getElementById('url');
const description = document.getElementById('description');
const body = document.getElementById('body');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnToggleForm').addEventListener('click', toggleForm);
    document.getElementById('btnSave').addEventListener('click', saveCard);
    loadAll();
})

function toggleForm() {
    const form = document.getElementById('entry-input');
    form.classList.toggle('d-none');
    const btnToggleForm = document.getElementById('btnToggleForm');
    if (btnToggleForm.innerText === addEntryText) {
        btnToggleForm.innerText = hideNewEntryText;
    } else if (btnToggleForm.innerText === hideNewEntryText) {
        btnToggleForm.innerText = addEntryText;
        clearForm();
    } 
}

function saveCard() {
    const notedCard = {};
    notedCard['title'] = title.value;
    notedCard['artist'] = artist.value;
    notedCard['album'] = album.value;
    notedCard['url'] = url.value;
    notedCard['description'] = description.value;
    notedCard['body'] = body.value;
    let areFieldsComplete = true;
    for (key in notedCard) {
        if (notedCard[key] === '') {
            areFieldsComplete = false;
        }
    }

    if (areFieldsComplete) {
        fetch(API_BASE, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notedCard)
        })
            .then((response) => {
                if (response.ok) {
                    loadAll();
                    clearForm();
                    form.classList.add('d-none');
                    btnToggleForm.innerText = addEntryText;
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Could not save entry.');
            });
    } else {
        alert('Please fill out all fields.');
    }
}

function clearForm() {
    title.value = '';
    artist.value = '';
    album.value = '';
    url.value = '';
    description.value = '';
    body.value = '';
}

function editCard(event, id) {
    const section = event.currentTarget.parentElement.parentElement.parentElement;
    const inputs = section.querySelectorAll('input');
    inputs[0].value = section.querySelector('h2').innerText;
    inputs[1].value = section.querySelector('h3').firstChild.innerText;
    inputs[2].value = section.querySelector('h3').lastChild.innerText;
    inputs[3].value = section.querySelector('img').src;
    const textAreas = section.querySelectorAll('textarea');
    textAreas[0].value = section.querySelector('h4').innerText;
    textAreas[1].value = section.querySelector('p').innerText;
    toggleEdit(event);
}

function toggleEdit(event) {
    const section = event.currentTarget.parentElement.parentElement.parentElement;
    const inputs = section.querySelectorAll('input');
    inputs[0].classList.toggle('d-none');
    inputs[1].classList.toggle('d-none');
    inputs[2].classList.toggle('d-none');
    inputs[3].classList.toggle('d-none');
    const textAreas = section.querySelectorAll('textarea');
    textAreas[0].classList.toggle('d-none');
    textAreas[1].classList.toggle('d-none');
    section.querySelector('h3').classList.toggle('d-none');
    section.querySelector('h2').classList.toggle('d-none');
    section.querySelector('h4').classList.toggle('d-none');
    section.querySelector('p').classList.toggle('d-none');
    section.querySelector('.btnUpdate').classList.toggle('d-none');
    section.querySelector('.btnDelete').classList.toggle('d-none');
    section.querySelector('.btnCancel').classList.toggle('d-none');
    section.querySelector('.btnSave').classList.toggle('d-none');
}

function saveEdit(event, id) {
    const notedCard = {};
    const section = event.currentTarget.parentElement.parentElement.parentElement;
    const inputs = section.querySelectorAll('input');
    notedCard['title'] = inputs[0].value;
    notedCard['artist'] = inputs[1].value;
    notedCard['album'] = inputs[2].value;
    notedCard['url'] = inputs[3].value;
    const textAreas = section.querySelectorAll('textarea');
    notedCard['description'] = textAreas[0].value;
    notedCard['body'] = textAreas[1].value;
    notedCard['id'] = id;
    fetch(API_BASE, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notedCard)
    })
        .then((response) => {
            console.log(notedCard);
            if (response.ok) {
                loadAll();
            }
        })
        .catch((err) => {
            console.error(err);
            alert('Could not update entry.');
        });
}

function deleteCard(id) {
    fetch(API_BASE + '/' + id, {
        method: 'DELETE'
    })
        .then((response) => {
            if (response.status === 204) {
                return;
            } else {
              throw 'Failed!';  
            }
        })
        .then(() => {
            loadAll();
        })
        .catch((err) => {
            console.error(err);
            alert('Could not delete entry.');
        });   
}

function loadAll() {
    fetch(API_BASE)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            clearCards();
            displayCards(data);
        })
        .catch((err) => {
            console.error(err);
            alert('Failed to load entries. Please try again later.');
        });   
}

function displayCards(cards) {
    if ('content' in document.createElement('template')) {
        for (let i = cards.length - 1; i >= 0; i--) {
            notedData.push(cards[i]);
            displayCard(cards[i]);
        }
    } else {
        console.error('Your browser does not support this content.');
    }
}

function displayCard(card) {
    const main = document.getElementById('main');
    const tmpl = document.getElementById('noted-template').content.cloneNode(true);
    tmpl.querySelector('h2').innerText = card.title;
    tmpl.querySelector('h3').firstChild.innerText = card.artist;
    tmpl.querySelector('h3').lastChild.innerText = card.album;
    tmpl.querySelector('img').setAttribute("src", card.url);
    tmpl.querySelector('img').setAttribute("class", "entry-img");
    tmpl.querySelector('h4').innerText = card.description;
    tmpl.querySelector('p').innerText = card.body;
    tmpl.querySelector('.btnUpdate').setAttribute("id", card.id);
    tmpl.querySelector('.btnDelete').setAttribute("id", card.id);
    tmpl.querySelector('.btnSave').setAttribute("id", card.id);
    main.appendChild(tmpl);
}

function clearCards() {
    document.querySelectorAll('.noted-section').forEach(element => {
        element.remove();
    });
    notedData = [];
}