import React from "react";

const Book = (props) => {
    return(
        <li>
            <button className="delete-button">Delete</button>
            <div className="book-element">
                <p className="title">{props.book.title}</p>
                <p className="genre">Genre: {props.book.genre}</p>
            </div>
        </li>
    )
}

export default Book;