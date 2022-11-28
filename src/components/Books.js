import React, {Component} from "react";

export default class Books extends Component {
    constructor() {
        super();

        this.state = {
            counter: 1,
            books: [
                {
                  "_id": "63820f418b1cf13e201e58a8",
                  "title": "War and Peace",
                  "genre": "Historical",
                  "created": "2022-11-26T13:06:09.604Z",
                  "__v": 0
                },
                {
                  "_id": "63820f718b1cf13e201e58aa",
                  "title": "The Great Gatsby, Volume 1",
                  "genre": "Fiction",
                  "created": "2022-11-26T13:06:57.105Z",
                  "__v": 0
                },
                {
                  "_id": "63820f748b1cf13e201e58ac",
                  "title": "The Great Gatsby, Volume 2",
                  "genre": "Fiction",
                  "created": "2022-11-26T13:07:00.751Z",
                  "__v": 0
                },
                {
                  "_id": "63820f8f8b1cf13e201e58ae",
                  "title": "Thomas the Train.",
                  "genre": "Children",
                  "created": "2022-11-26T13:07:27.490Z",
                  "__v": 0
                }
              ]
            }
    }





    render() {
        return(
            <div>
                <h1>Counter is: {this.state.counter}</h1>

                <ul className="books">
                    { 
                        this.state.books.map(book => {
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
            </div>
        )
    }
};