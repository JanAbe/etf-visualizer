import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import './index.css';

const dataURL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';
export function renderToDOM(container) {
    ReactDOM.render(<App />, container)

    require('d3-request').csv(dataURL, (error, response) => {
        if (!error) {
            const data = response.map(d => [Number(d.lng), Number(d.lat)]);
            console.log(data);
            ReactDOM.render(<App data={data} />, container)
        }
    });
}  

renderToDOM(document.querySelector('#root'));