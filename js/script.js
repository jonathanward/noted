let notedData = {};
const addEntryText = 'Add entry';
const hideNewEntryText = 'Clear new entry';

document.addEventListener('DOMContentLoaded', () => {
    // TODO: Add event listener to load all entries
    document.getElementById('btnToggleForm').addEventListener('click', toggleForm);
    document.getElementById('btnSave').addEventListener('click', saveCard);
})

function toggleForm() {
    const form = document.getElementById('entry-form');
    form.classList.toggle('d-none');
    const btnToggleForm = document.getElementById('btnToggleForm');
    if (btnToggleForm.innerText === addEntryText) {
        btnToggleForm.innerText = hideNewEntryText;
    } else if (btnToggleForm.innerText === hideNewEntryText) {
        btnToggleForm.innerText = addEntryText;
    }
}

function saveCard() {
    const form = document.getElementById('entry-form');
    form.classList.add('d-none');
    btnToggleForm.innerText = addEntryText;
}

// TODO: Add loadAll() helper method

// TODO: Add saveCard() helper method