import 'core-js/modules/es6.symbol';

import expect    from 'expect';
import React     from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {make}    from '../ContextTypes';
import Themeable from '../Themeable';

function shallowRender(element, context) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

function render(element, context) {
  return shallowRender(shallowRender(element), context);
}

describe('<Themeable />', function() {

  @Themeable
  class Component extends React.Component {
    render() {
      let {theme} = this.props;
      return <div className={theme.className} />;
    }
  }

  it('allows configuration through context', function() {
    let theme = {
      [Component.theme]: {className: 'className'}
    };
    let themedElem = render(<Component />, make(theme));
    expect(themedElem.props.className).toBe(theme.className);
  });

  it('allows configuration through props', function() {
    let theme = {className: 'className'};
    let themedElem = render(<Component theme={theme} />);
    expect(themedElem.props.className).toBe(theme.className);
  });

});
