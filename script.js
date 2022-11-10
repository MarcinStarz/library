const form = document.querySelector('form');
const addBookBtn = document.querySelector('.addbook-btn');

form.addEventListener('submit', (e) => 
    e.preventDefault());

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
};