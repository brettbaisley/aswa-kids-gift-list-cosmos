import React, {useEffect, useState} from "react";

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/api/books')
            .then(response => response.json())
            .then(json => setBooks( json ))
            .catch(err => {
                console.log(err);
            });
    },[]);

    return(
        <>
            <h1>Counter is: </h1>

            <ul className="books">
                { 
                    books && books.map(book => {
                        return (
                            <li key={book._id}>
                                {book.title}
                            </li>
                        );  
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
