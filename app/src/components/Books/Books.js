import React, {useEffect, useState} from "react";
import Book from './Book';

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log('i fire once');

        fetch('/api/books')
            .then(response => response.json())
            .then(json => {
                setBooks( json );
                console.log(`JSON : ${json}`);
            })
            .catch(err => { console.log(err) });
    },[]);

    // if (!books) return <div>Loading...</div>;


    return(
        <>
            <h1>Counter is: </h1>

            <ul className="books">
                { 
                    books && books.map(book => {
                        return <Book book={book} />;
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
