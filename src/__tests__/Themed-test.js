import expect                                from 'expect';
import React                                 from 'react';
import TestUtils                             from 'react/lib/ReactTestUtils';
import {ThemeContextTypes, getThemeContext}  from '../ThemeContextTypes';
import Themed                                from '../Themed';

function shallowRender(element, context) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('<Themed />', function() {

  it('injects theme via context', function() {
    class Component extends React.Component {
      static contextTypes = ThemeContextTypes;
      render() {
        let theme = getThemeContext(this);
        return <div className={theme.className} />;
      }
    }

    let theme = {className: 'className'};
    let context = new Themed({theme}).getChildContext();
    let themedElem;
    themedElem = shallowRender(
      <Themed theme={theme}>
        <Component />
      </Themed>
    );
    themedElem = shallowRender(themedElem, context);
    expect(themedElem.props.className).toBe(theme.className);
  });

  it('preserves theme passed via outer components', function() {
    class Component extends React.Component {
      static contextTypes = ThemeContextTypes;
      render() {
        let theme = getThemeContext(this);
        return (
          <div
            className1={theme.className1}
            className2={theme.className2}
            />
        );
      }
    }

    let theme1 = {className1: 'className1'};
    let theme2 = {className2: 'className2'};
    let themed1 = new Themed({theme: theme1});
    let context0 = {};
    themed1.context = context0;
    let themed2 = new Themed({theme: theme2});
    let context1 = themed1.getChildContext();
    themed2.context = context1;
    let context2 = themed2.getChildContext();

    let themedElem;
    themedElem = shallowRender(
      <Themed theme={theme1}>
        <Themed theme={theme2}>
          <Component />
        </Themed>
      </Themed>
    );
    themedElem = shallowRender(themedElem, context1);
    themedElem = shallowRender(themedElem, context2);

    expect(themedElem.props.className1).toBe(theme1.className1);
    expect(themedElem.props.className2).toBe(theme2.className2);
  });

});
