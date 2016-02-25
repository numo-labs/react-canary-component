import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

import StarwarsQuote from '../../../src/components/star-wars-quote';

function setup (propOverrides) {
  const props = Object.assign({}, propOverrides);

  const starwarsQuote = <StarwarsQuote {...props} />;

  const renderer = TestUtils.createRenderer();
  renderer.render(starwarsQuote);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output
  };
}

describe('components', function () {
  jsdom();

  describe('StarwarsQuote', function () {
    it('should render a random quote from Star Wars', function (done) {
      const { output } = setup();
      expect(output.type).toBe('div');
      expect(output.props.children).toBeA('string');
      done();
    });
    it('should render the quote we pass in as a prop', function (done) {
      const { output, props } = setup({quote: 'This is spartaaaa!'});
      expect(output.type).toBe('div');
      expect(output.props.children).toBeA('string');
      expect(output.props.children).toBe(props.quote);
      done();
    });
  });
});
