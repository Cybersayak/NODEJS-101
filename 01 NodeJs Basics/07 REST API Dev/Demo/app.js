const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

let books = [
    { id: "1", title: '1984' },
    { id: "2", title: 'To Kill a Mockingbird' },
    { id: "3", title: 'The Great Gatsby' },
    { id: "4", title: 'The Catcher in the Rye' }
];

let authors = [
    { id: 1, name: 'George Orwell', age: 46 },
    { id: 2, name: 'Harper Lee', age: 89 },
    { id: 3, name: 'F. Scott Fitzgerald', age: 44 },
    { id: 4, name: 'J.D. Salinger', age: 91 }
];

let bookstores = [
    { id: 1, name: 'City Lights Bookstore', location: 'San Francisco' },
    { id: 2, name: 'Strand Bookstore', location: 'New York' },
    { id: 3, name: 'Powell\'s City of Books', location: 'Portland' },
    { id: 4, name: 'Books-A-Million', location: 'Birmingham' }
];


// Home 
app.get('/', (req, res) => {
    res.send('Welcome to the Book Store API');
});

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(buk => buk.id === req.params.id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Add a new book
app.post('/addBook', (req, res) => {
    const newBook = {
        id: (books.length + 1).toString(), // Generate a new ID
        name: req.body.title,
    }

        books.push(newBook);
        res.status(200).json({
            message: 'Book added successfully',
            data: newBook,
        })
    });

     // UPDATE A book by ID
app.put('/updateBook/:id', (req, res) => { 
    const findLatestBook = books.find(buk => buk.id === req.params.id);
    if (findLatestBook) {
        
        findLatestBook.title = req.body.title  || findLatestBook.title; // Update the book title or Keep original title if no new title provided
        res.status(200).json({
            message: `Book with ID ${req.params.id} updated successfully`,
            data: findLatestBook,
        });  
    } else {
        res.status(404).send('Book not found');
    }
});




// Get all authors
app.get('/authors', (req, res) => {
    res.json(authors);
});

// Get an author by ID
                                       // Option 1: Convert req.params.id to number
app.get('/authors/:id', (req, res) => {
    const author= authors.find(author => author.id === parseInt(req.params.id));
    if (author) {
        res.status(200).json(author);
    } else {
       res.status(404).send('Author not found');
    }
});

// Add a new author

app.post('/addAuthor', (req, res) => {
    const newAuthor = {
        id: (authors.length + 1).toString(), // Generate a new ID
        title: req.body.title,
    }

        authors.push(newAuthor);
        res.status(200).json({
            message: 'Book added successfully',
            data: newAuthor,
        })
    });





// Get all bookstores
app.get('/bookstores', (req, res) => {
    res.json(bookstores);
});
   
// Get BookStores  by ID
                                         // Option 2: Convert book.id to string for comparison
app.get('/bookstores/:id', (req, res) => {
    const bookstore = bookstores.find(stores => stores.id.toString() === req.params.id);
    if (bookstore) {
        res.status(200).json(bookstore);
    } else {
        res.status(404).send('bookstores not found');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 