/* eslint-disable linebreak-style, max-classes-per-file */

const list = document.getElementById('list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addButton = document.querySelector('.buttonClass');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UtilizeBook {
  static createBook() {
    return new Book(bookTitle.value, bookAuthor.value);
  }

  static saveBook(newBook) {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books === null) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books)); //
    }
  }

  static findBooks() {
    return JSON.parse(localStorage.getItem('books'));
  }

  static displayBooks() {
    const reloadBooks = UtilizeBook.findBooks() || [];
    list.innerHTML = '';
    reloadBooks.forEach((abook) => {
      const book = document.createElement('tr');
      const btnContainer = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Remove';
      book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
      book.appendChild(btnContainer);
      deleteBtn.id = abook.title;
      deleteBtn.className = 'btn btn-dark';
      btnContainer.className = 'd-flex justify-content-end';
      list.appendChild(book);
      btnContainer.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', () => {
        if (deleteBtn.id === abook.title) {
          const index = reloadBooks.findIndex(
            (rBook) => rBook.title === deleteBtn.id,
          );
          reloadBooks.splice(index, 1);
          list.removeChild(book);
          localStorage.setItem('books', JSON.stringify(reloadBooks));
        }
      });
    });
  }
}

addButton.addEventListener('click', () => {
  const newBook = UtilizeBook.createBook();
  UtilizeBook.saveBook(newBook);
  UtilizeBook.displayBooks();
  const books = UtilizeBook.findBooks();
  if (books.length === 0) {
    const abook = UtilizeBook.createBook();
    const book = document.createElement('tr');
    const btnContainer = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Remove';
    book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
    book.appendChild(btnContainer);
    deleteBtn.id = abook.title;
    deleteBtn.className = 'btn btn-dark';
    btnContainer.className = 'd-flex justify-content-end';
    list.appendChild(book);
    btnContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      if (deleteBtn.id === abook.title) {
        const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
        books.splice(index, 1);
        list.removeChild(book);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
    UtilizeBook.saveBook(abook);
  }
});

window.onload = () => {
  UtilizeBook.displayBooks();
};