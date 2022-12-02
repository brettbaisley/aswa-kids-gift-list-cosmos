import React, {useEffect, useState} from "react";
import Book from './Book';

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        let ignore = false;

        const getBooks = async () => {
            const response = await fetch("/api/books");
            const json = await response.json();
            console.log(`JSON : ${json}`);
            setBooks(json);
            ignore = true;
            
            
        }

        if (!ignore) {
            getBooks();
            console.log('i fire once');
        }

        return () => {
            ignore = true;
        };

        // fetch('/api/books')
        //     .then(response => response.json())
        //     .then(json => {
        //         setBooks( json );
        //         console.log(`JSON : ${json}`);
        //     })
        //     .catch(err => { console.log(err) });
    },[]);

    // if (!books) return <div>Loading...</div>;


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
