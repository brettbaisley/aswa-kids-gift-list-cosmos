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
        fetch('localhost:7071/api/books')
            .then(result => {
                console.log(`Result: ${result}`)
                result.json()
            })
            .then(json => {
                console.log(`Data: ${json}`)
                this.setState( {books: json });
            })
            .catch(err => {
                console.log(`ERROR fetching API data: ${err}`)
            });
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