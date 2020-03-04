import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const dataFile = './data.json';
ReactDOM.render(<App data={dataFile} />, document.querySelector('#root'));