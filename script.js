const form = document.querySelector('form');
const addBookBtn = document.querySelector('.addbook-btn');
const bookShelf = document.querySelector('#book-shelf');

form.addEventListener('submit', (e) => e.preventDefault());
addBookBtn.addEventListener('click', () => addBookToLibrary());

let myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
};

Book.prototype.isRead = function() {
    this.read = true;
};

Book.prototype.notRead = function() {
    this.read = false;
};

function addBookToLibrary() {
    const bookId = generateID(10000, 99999);
    const ftitle = document.getElementById('title').value;
    const fauthor = document.getElementById('author').value;
    const fpages = document.getElementById('pages').value;
    const fread = document.getElementById('is-read').checked;
    if (!ftitle || !fauthor || !fpages) return;
    
    const newBook = new Book(bookId, ftitle, fauthor, fpages, fread);
    myLibrary.push(newBook);
    displayTheBook();
    
    form.reset();
};

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
    myLibrary.forEach((e) => createCard(e.id, e.title, e.author, e.pages, e.read));
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
    const arrIndex = myLibrary.findIndex((e) => matchID(cardId, e.id));
    
    myLibrary.splice(arrIndex, 1);
    card.remove();
};
    
function readToggle(event) {
    const cardId = event.target.parentElement.parentElement.id
    const readButton = event.currentTarget;
    const arrIndex = myLibrary.findIndex((e) => matchID(cardId, e.id));
    
    if (myLibrary[arrIndex].read === false) {
        myLibrary[arrIndex].isRead();
        readButton.innerText = 'READ';
    } else {
        myLibrary[arrIndex].notRead();
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

