import './Header.css';
import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return(
            <header className="app-header">
                <h1>{this.props.title}</h1>
                <p>This is the header section</p>
            </header>
        )
    }
};