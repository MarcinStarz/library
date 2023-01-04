const form = document.querySelector('form');
const addBookBtn = document.querySelector('.addbook-btn');
const bookShelf = document.querySelector('#book-shelf');

form.addEventListener('submit', (e) => e.preventDefault());
addBookBtn.addEventListener('click', () => myLibrary.addBookToLibrary());

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    isRead() {
        this.read = true;
    }

    notRead() {
        this.read = false;
    }
}

class Library {
    bookId;
    ftitle;
    fauthor;
    fpages;
    fread;
    newBook

    constructor() {
        this.library = []
    }

    addBookToLibrary() {
        this.bookId = generateID(10000, 99999);
        this.ftitle = document.getElementById('title').value;
        this.fauthor = document.getElementById('author').value;
        this.fpages = document.getElementById('pages').value;
        this.fread = document.getElementById('is-read').checked;

        if (!this.ftitle || !this.fauthor || !this.fpages) return;
        this.newBook = new Book(this.bookId, this.ftitle, this.fauthor, this.fpages, this.fread);
        this.library.push(this.newBook);
        displayTheBook();
        
        form.reset();
    }
}
const myLibrary = new Library;

function createCard(id, title, author, pages, read) {
    const card = document.createElement('div');
    const ptitle = document.createElement('p');
    const pauthor = document.createElement('p');
    const ppages = document.createElement('p');
    const buttonGroup = document.createElement('div');
    const readButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    
    card.setAttribute('id', id);
    card.classList.add('card');
    ptitle.classList.add('title');
    pauthor.classList.add('author');
    ppages.classList.add('pages');
    buttonGroup.classList.add('button-group');
    readButton.classList.add('read-button');
    deleteButton.classList.add('delete-book');

    ptitle.innerText = title;
    pauthor.innerText = author;
    ppages.innerText = pages + ' pages';
    readButton.innerText = read === true ? "READ" : "NOT READ YET";
    readButton.style.backgroundColor = readButton.innerText === "READ" ? '#059669' : 'rgb(225, 110, 110)';
    deleteButton.innerText = 'DELETE BOOK';

    bookShelf.appendChild(card);
    card.appendChild(ptitle);
    card.appendChild(pauthor);
    card.appendChild(ppages);
    card.appendChild(buttonGroup);
    buttonGroup.appendChild(readButton);
    buttonGroup.appendChild(deleteButton);
    
    readButton.addEventListener('click', () => toggleColor(event));
    readButton.addEventListener('click', () => readToggle(event));
    deleteButton.addEventListener('click', () => deleteBook(event));
};

function displayTheBook() {
    clearBookShelf();
    myLibrary.library.forEach((e) => createCard(e.id, e.title, e.author, e.pages, e.read));
};

function clearBookShelf() {
    const visibleBooks = document.querySelectorAll('.card');
    if (visibleBooks.length > 0) {
        visibleBooks.forEach(function (e) {
            return e.remove();
        });
    };
};

function generateID(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function matchID(cardId, element) {
    if (cardId.toString() === element.toString()) {
      return true;
    } return false;
};

function deleteBook(event) {
    const cardId = event.target.parentElement.parentElement.id;
    const card = event.target.parentElement.parentElement;
    const arrIndex = myLibrary.library.findIndex((e) => matchID(cardId, e.id));
    
    myLibrary.library.splice(arrIndex, 1);
    card.remove();
};
    
function readToggle(event) {
    const cardId = event.target.parentElement.parentElement.id
    const readButton = event.currentTarget;
    const arrIndex = myLibrary.library.findIndex((e) => matchID(cardId, e.id));
    
    if (myLibrary.library[arrIndex].read === false) {
        myLibrary.library[arrIndex].isRead();
        readButton.innerText = 'READ';
    } else {
        myLibrary.library[arrIndex].notRead();
        readButton.innerText = 'NOT READ YET';
    };
};

function toggleColor(event) {
    const readValue = event.currentTarget.innerText;
    const readButton = event.currentTarget;

    if (readValue === 'READ') {
        readButton.style.backgroundColor = 'rgb(225, 110, 110)';
    } else readButton.style.backgroundColor = '#059669';
};

//Form open and close
function openForm() {
    document.querySelector('.form-pop-up').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
};

function closeForm() {
    const ftitle = document.getElementById('title').value;
    const fauthor = document.getElementById('author').value;
    const fpages = document.getElementById('pages').value;
    if (!ftitle || !fauthor || !fpages) return; // if form input is null don't close the form.

    document.querySelector('.form-pop-up').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
};

function exitForm() {
    document.querySelector('.form-pop-up').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
};

