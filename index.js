// Book Store in books array:
let books = [
  { id: 'CSE-2417', name: 'Data Structures', quantity: 5 },
  { id: 'CSE-2419', name: 'Digital Logic Design', quantity: 3 },
  { id: 'CSE-2312', name: 'Object Oriented Programming', quantity: 4 }
];

// Initialize issued and returned books as arrays:
let issuedBooksArray = [];
let returnedBooksArray = [];

// Display Book Function:
function displayBooks() {
  const bookTableBody = document.getElementById('bookTableBody');
  bookTableBody.innerHTML = '';
  books.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border px-4 py-2">${book.id}</td>
      <td class="border px-4 py-2">${book.name}</td>
      <td class="border px-4 py-2">${book.quantity}</td>
    `;
    bookTableBody.appendChild(row);
  });
}

// Search book function:
function searchBook() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const searchResult = document.getElementById('searchResult');
  const foundBook = books.find(book =>
    book.id.toLowerCase() === searchInput || book.name.toLowerCase().includes(searchInput)
  );
  searchResult.textContent = foundBook ?
    `Found: ${foundBook.name} (ID: ${foundBook.id}), Quantity: ${foundBook.quantity}` :
    'Book Not Found!';
}

// Add books in array:
function addBook() {
  const newBookId = document.getElementById('newBookId').value.trim();
  const newBookName = document.getElementById('newBookName').value.trim();
  const newBookQuantity = parseInt(document.getElementById('newBookQuantity').value);

  if (newBookId && newBookName && !isNaN(newBookQuantity) && newBookQuantity > 0) {
    const existingBook = books.find(book => book.id === newBookId);
    if (existingBook) {
      existingBook.quantity += newBookQuantity;
    } else {
      books.push({ id: newBookId, name: newBookName, quantity: newBookQuantity });
    }
    displayBooks();
  } else {
    alert('Please provide valid Book ID, Name, and Quantity!');
  }
}

// Issue book function:
function issueBook() {
  const studentName = document.getElementById('studentName').value.trim();
  const bookId = document.getElementById('issueBookId').value.trim();
  const book = books.find(b => b.id === bookId);

  if (studentName && book && book.quantity > 0) {
    issuedBooksArray.push({ student: studentName, bookId, bookName: book.name });
    book.quantity--;
    displayBooks();
    updateIssuedBooksList();
  } else {
    alert('Book not available or invalid input!');
  }
}

// Return book function:
function returnBook() {
  const returnBookId = document.getElementById('returnBookId').value.trim();
  const returnStudentName = document.getElementById('returnStudentName').value.trim();

  const issuedIndex = issuedBooksArray.findIndex(entry =>
    entry.bookId === returnBookId && entry.student === returnStudentName
  );

  if (issuedIndex !== -1) {
    const returnedEntry = issuedBooksArray.splice(issuedIndex, 1)[0];
    returnedBooksArray.push(returnedEntry);
    const book = books.find(b => b.id === returnBookId);
    if (book) book.quantity++;
    displayBooks();
    updateReturnedBooksList();
  } else {
    alert('No matching issued book found!');
  }
}

// Update issued books list function:
function updateIssuedBooksList() {
  const issuedBooksList = document.getElementById('issuedBooks');
  issuedBooksList.innerHTML = '';
  issuedBooksArray.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.bookName} (ID: ${entry.bookId}) issued to ${entry.student}`;
    issuedBooksList.appendChild(listItem);
  });
}

// Update returned books list function:
function updateReturnedBooksList() {
  const returnedBooksList = document.getElementById('returnedBooks');
  returnedBooksList.innerHTML = '';
  returnedBooksArray.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.bookName} (ID: ${entry.bookId}) returned by ${entry.student}`;
    returnedBooksList.appendChild(listItem);
  });
}

// Initial call to display books:
displayBooks();
