import React from "react";

const Book = (props) => {
    return(
        <li key={props.book._id}>
            <button className="delete-button">Delete</button>
            <div className="book-element">
                <p className="title">{props.book.title}</p>
                <p className="genre">{props.book.genre}</p>
            </div>
        </li>
    )
}

export default Book;