const form = document.querySelector('form');
const addBookBtn = document.querySelector('.addbook-btn');
const bookShelf = document.querySelector('.book-shelf');

form.addEventListener('submit', (e) => e.preventDefault());
addBookBtn.addEventListener('click', () => addBookToLibrary());

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
};

function addBookToLibrary() {
    const ftitle = document.getElementById('title').value;
    const fauthor = document.getElementById('author').value;
    const fpages = document.getElementById('pages').value;
    const fread = document.getElementById('is-read').checked;
    if (!ftitle || !fauthor || !fpages) return;
    
    const newBook = new Book(ftitle, fauthor, fpages, fread);
    myLibrary.push(newBook);
    console.log(newBook);
    console.log(myLibrary);
    form.reset();
};

function createCard(title, author, pages, read) {
    const card = document.createElement('div');
    const ptitle = document.createElement('p');
    const pauthor = document.createElement('p');
    const ppages = document.createElement('p');
    const readButton = document.createElement('button')

    ptitle.innerText = title;
    pauthor.innerText = author;
    ppages.innerText = pages;
    readButton.innerText = read === true ? "READ" : "NOT READ YET";
    console.log(title, author, pages, read);

    bookShelf.appendChild(card);
    card.appendChild(ptitle);
    card.appendChild(pauthor);
    card.appendChild(ppages);
    card.appendChild(readButton);
};

function displayTheBook() {
    myLibrary.forEach((e) => createCard(e.title, e.author, e.pages, e.read));
};

// WHen button is clicked change the read status in loop and in card.

