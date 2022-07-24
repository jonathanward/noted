const API_BASE = 'http://localhost:8080/noted/entries';
let notedData = [];
const addEntryText = 'Add entry';
const hideNewEntryText = 'Clear new entry';
let calls = 0;

document.addEventListener('DOMContentLoaded', () => {
    // TODO: Add event listener to load all entries
    document.getElementById('btnToggleForm').addEventListener('click', toggleForm);
    document.getElementById('btnSave').addEventListener('click', saveCard);
    loadAll();
    document.querySelectorAll('.btnDelete').forEach(element => {
        element.addEventListener('click', event => { deleteCard(event, id) });
    });
})

function toggleForm() {
    const form = document.getElementById('entry-input');
    form.classList.toggle('d-none');
    const btnToggleForm = document.getElementById('btnToggleForm');
    if (btnToggleForm.innerText === addEntryText) {
        btnToggleForm.innerText = hideNewEntryText;
    } else if (btnToggleForm.innerText === hideNewEntryText) {
        btnToggleForm.innerText = addEntryText;
    }
}

function saveCard() {
    const form = document.getElementById('entry-input');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const album = document.getElementById('album');
    const description = document.getElementById('description');
    const body = document.getElementById('body');
    const notedCard = {};
    notedCard['title'] = title.value;
    notedCard['artist'] = artist.value;
    notedCard['album'] = album.value;
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
                    calls++;
                    loadAll();
                    title.value = '';
                    artist.value = '';
                    album.value = '';
                    description.value = '';
                    body.value = '';
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

function deleteCard(event, id) {
    fetch(API_BASE + '/' + id, {
        method: 'DELETE'
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            clearCards(data);
            displayCards(data);
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
            if (calls > 0) {
                clearCards(data);
            }
            displayCards(data);
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
    tmpl.getElementById('template-title').innerText = card.title;
    tmpl.getElementById('template-artist').innerText = card.artist;
    tmpl.getElementById('template-album').innerText = card.album;
    tmpl.getElementById('template-description').innerText = card.description;
    tmpl.getElementById('template-body').innerText = card.body;
    main.appendChild(tmpl);
}

function clearCards(data) {
    const main = document.getElementById('main');
    document.querySelectorAll('.noted-section').forEach(element => {
        element.remove();
    });
    notedData = [];
}