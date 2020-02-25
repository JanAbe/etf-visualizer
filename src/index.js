import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar';
import Map from './map';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sidebar />
            // <Map id='map' />
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));