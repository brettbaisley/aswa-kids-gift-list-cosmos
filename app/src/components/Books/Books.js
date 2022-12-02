import React, {useEffect, useState} from "react";
import Book from './Book';

const Books = () => {

    const [books, setBooks] = useState([]);

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

    if (!books) return <div>Loading...</div>;

    return(
        <>
            <h1>Counter is: </h1>

            <ul className="books">
                { 
                    books && books.map(book => {
                        return <Book key={book._id} book={book} />;
                    })  
                }
            </ul>
            <div className="editarea">
                {
                    // Edit form
                }
            </div>
        </>
    )
}

export default Books;
