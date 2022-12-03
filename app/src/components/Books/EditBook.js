import React from "react";

const EditBook = (props) => {
    if (props.selectedBook) {

        return (
            <div>
                <div className="editfields">
                    <div>
                        <label>Title: </label>
                        <input
                        name="title"
                        value={props.selectedBook.title}
                        placeholder="title"
                        onChange={props.onChange}
                        />
                    </div>
                    <div>
                        <label>Genre: </label>
                        <input
                        name="genre"
                        value={props.selectedBook.genre}
                        placeholder="genre"
                        onChange={props.onChange}
                        />
                    </div>
                </div>
                <button onClick={props.onCancel}>Cancel</button>
                <button onClick={props.onSave}>Save</button>
            </div>
        );
    } else {
        return <div />
    }
};

export default EditBook;