import React, {useEffect, useState} from "react";
import Book from './Book';
import EditBook from './EditBook';

const Books = () => {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState("");
    const [addingBook, setAddingBook] = useState(false);

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
        setSelectedBook("");
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`BEFORE STATE: ${JSON.stringify(selectedBook)}`)
        let tmpSelectedBook = selectedBook;
        console.log(`before: tmpSelectedBook is: ${tmpSelectedBook[name]}`)
        tmpSelectedBook[name] = value;
        console.log(`after: tmpSelectedBook[${name}] is: ${tmpSelectedBook[name]}`)
        console.log(tmpSelectedBook);
        setSelectedBook(tmpSelectedBook);
        console.log(`AFTER STATE: ${JSON.stringify(selectedBook)}`)


        // setSelectedBook( {...selectedBook, name: value })

    }

    if (!books) return <div>Loading...</div>;

    return(
        <>
            <h1>Counter is: </h1>

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
