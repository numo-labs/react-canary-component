import React from 'react';
import ReactDOM from 'react-dom';
import StarwarsQuote from './components/star-wars-quote';

const rootElement = document.getElementById('container');

ReactDOM.render(
  <StarwarsQuote quote='Hit the road, Jack' />,
  rootElement
);
