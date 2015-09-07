/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import 'core-js/modules/es6.symbol';

import expect               from 'expect';
import React                from 'react';
import TestUtils            from 'react/lib/ReactTestUtils';
import {makeThemeContext}   from '../ThemeContextTypes';
import Themeable            from '../Themeable';

function shallowRender(element, context) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('<Themeable />', function() {

  @Themeable
  class Component extends React.Component {

    static defaultTheme = {
      className: 'defaultClassName',
      className2: 'defaultClassName2'
    };

    render() {
      return <div
        className={this.theme.className}
        className2={this.theme.className2}
        />;
    }
  }

  it('allows configuration through context', function() {
    let theme = {
      [Component.theme]: {className: 'className'}
    };
    let themedElem = shallowRender(<Component />, makeThemeContext(theme));
    expect(themedElem.props.className).toBe('className');
    expect(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('allows configuration through props', function() {
    let buttonTheme = {
      className: 'className'
    };
    let themedElem = shallowRender(<Component theme={buttonTheme} />);
    expect(themedElem.props.className).toBe('className');
    expect(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('falls back to default theme', function() {
    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('defaultClassName');
    expect(themedElem.props.className2).toBe('defaultClassName2');
  });

});
