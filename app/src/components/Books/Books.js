import React, {useEffect, useState} from "react";
import Book from './Book';
import EditBook from './EditBook';

const Books = () => {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [addingBook] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function getBooks() {
            const response = await fetch(`/api/books`);
            const json = await response.json();
            if (!ignore) {
                setBooks(json);
            }
        }

        getBooks();

        return () => ignore = true;
    },[]);

    const handleSelect = (book) => {
        setSelectedBook(book);
    }

    const handleSave = (book) => {

    }

    const handleCancel = () => {
        setSelectedBook(null);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        let tmpSelectedBook = selectedBook;
        tmpSelectedBook[name] = value;
        setSelectedBook({...tmpSelectedBook});
        console.log("I just updated selectedBook state!")
    }

    if (!books) return <div>Loading...</div>;

    return(
        <>
            <h1>Counter is: {selectedBook && selectedBook.title}</h1>

            <ul className="books">
                { 
                    books && books.map(book => {
                        return (
                            <Book 
                                key={book._id} 
                                book={book} 
                                onSelect={handleSelect} 
                                selectedBook={selectedBook}/>
                        )
                    })  
                }
            </ul>
            <div className="editarea">
                {
                    <EditBook 
                        addingBook={addingBook}
                        selectedBook={selectedBook}
                        onChange={handleChange}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                }
            </div>
        </>
    )
}

export default Books;
