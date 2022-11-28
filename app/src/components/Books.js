import React, {Component} from "react";

export default class Books extends Component {
    constructor() {
        super();

        this.state = {
            counter: 1,
            books: []
            }
    }

    componentDidMount() {
        
        fetch('/api/books')
            .then(response => response.json())
            //.then(json => resolve(json))
            .catch(err => {
                console.log(err);
            });
    }



    render() {
        return(
            <div>
                <h1>Counter is: {this.state.counter}</h1>

                {
                     fetch("/api/text")
                }

                <ul className="books">
                    {/* { 
                        this.state.books.map(book => {
                            return (
                                <li key={book._id}>
                                    {book.title}
                                </li>
                            );  
                        })  
                    } */}
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