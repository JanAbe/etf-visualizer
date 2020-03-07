import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import data from './data.js';

const dataSource = './data.json';
ReactDOM.render(<App data={data} dataSource={dataSource} />, document.querySelector('#root'));