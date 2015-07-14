import expect                from 'expect';
import React                 from 'react';
import TestUtils             from 'react/lib/ReactTestUtils';
import {ContextTypes, get}   from '../ContextTypes';
import Themed                from '../Themed';

function shallowRender(element, context) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

function render(element, context) {
  return shallowRender(shallowRender(element), context);
}

describe('<Themed />', function() {

  class Component extends React.Component {
    static contextTypes = ContextTypes;
    render() {
      let theme = get(this);
      return <div className={theme.className} />;
    }
  }

  it('injects theme via context', function() {
    let theme = {className: 'className'};
    let context = new Themed({theme}).getChildContext();
    let themedElem = render(
      <Themed theme={theme}>
        <Component />
      </Themed>,
      context
    );
    expect(themedElem.props.className).toBe(theme.className);
  });

});
