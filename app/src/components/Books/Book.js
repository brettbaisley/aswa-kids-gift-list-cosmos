import React from "react";

const Book = (props) => {
    return(
        <li onClick={() => props.onSelect(props.book)} className={props.book === props.selectedBook ? 'selected':''}>
            <button className="delete-button">Delete</button>
            <div className="book-element">
                <p className="title">{props.book.title}</p>
                <p className="genre">Genre: {props.book.genre}</p>
            </div>
        </li>
    )
}

export default Book;