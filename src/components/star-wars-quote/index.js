import React from 'react';
import starwars from 'starwars';

const StarwarsQuote = React.createClass({
  render: function () {
    return (
      <div>
        "{this.props.quote || starwars()} "
      </div>
    );
  }
});

export default StarwarsQuote;
