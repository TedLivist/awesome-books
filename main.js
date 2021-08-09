/* eslint-disable linebreak-style */

const list = document.getElementById('list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const buttonClass = document.querySelector('.buttonClass');
const books = [];

const saveBooks = newBooks => {
  localStorage.setItem('books', JSON.stringify(newBooks));
}

const addItem = (title, author) => {
  const reloadBooks = JSON.parse(localStorage.getItem('books'));
  if (reloadBooks !== null) {
    reloadBooks.push({ title: title.value, author: author.value });
    saveBooks(reloadBooks);
    list.innerHTML = '';
    reloadBooks.forEach((abook) => {
      const book = document.createElement('li');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Remove';
      book.innerHTML = `<p>${abook.title}</p>
    <p>${abook.author} </p>`;
      deleteBtn.id = abook.title;
      deleteBtn.className = 'removeBtn';
      const br = document.createElement('br');
      list.appendChild(book);
      book.appendChild(deleteBtn);
      list.appendChild(br);
      deleteBtn.addEventListener('click', () => {
        if (deleteBtn.id === abook.title) {
          const index = reloadBooks.findIndex((rBook) => rBook.title === deleteBtn.id);
          reloadBooks.splice(index, 1);
          list.removeChild(book);
          saveBooks(reloadBooks);
        }
      });
    });
  } else { saveBooks(books); }
}

buttonClass.addEventListener('click', () => {
  addItem(bookTitle, bookAuthor);
});

// GETTING FORM DATA FROM LOCAL STORAGE
window.addEventListener('load', () => {
  const reloadBooks = JSON.parse(localStorage.getItem('books'));
  if (reloadBooks !== null) {
    reloadBooks.forEach((abook) => {
      const book = document.createElement('li');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Remove';
      book.innerHTML = `<p>${abook.title}</p>
    <p>${abook.author} </p>`;
      deleteBtn.id = abook.title;
      deleteBtn.className = 'removeBtn';
      const br = document.createElement('br');
      list.appendChild(book);
      book.appendChild(deleteBtn);
      list.appendChild(br);
      deleteBtn.addEventListener('click', () => {
        if (deleteBtn.id === abook.title) {
          const index = reloadBooks.findIndex((rBook) => rBook.title === deleteBtn.id);
          reloadBooks.splice(index, 1);
          list.removeChild(book);
          saveBooks(reloadBooks);
        }
      });
    });
  }
});
