/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */
/* global describe, it */

import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { ThemeContextTypes, getThemeContext } from '../ThemeContextTypes';
import ApplyTheme from '../ApplyTheme';

function shallowRender(element, context) {
  const renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('<ApplyTheme />', () => {
  it('injects theme via context', () => {
    const Component = (props, context) => {
      const theme = getThemeContext(context);
      return <div className={theme.className} />;
    };
    Component.contextTypes = ThemeContextTypes;

    const theme = { className: 'className' };
    const context = new ApplyTheme({ theme }).getChildContext();
    let themedElem = shallowRender(
      <ApplyTheme theme={theme}>
        <Component />
      </ApplyTheme>
    );
    themedElem = shallowRender(themedElem, context);
    expect(themedElem.props.className).toBe('className');
  });

  it('preserves theme passed via outer components', () => {
    const Component = (props, context) => {
      const theme = getThemeContext(context);
      return (
        <div
          className1={theme.className1}
          className2={theme.className2}
        />
      );
    };
    Component.contextTypes = ThemeContextTypes;

    const theme1 = { className1: 'className1' };
    const theme2 = { className2: 'className2' };
    const themed1 = new ApplyTheme({ theme: theme1 });
    const context0 = {};
    themed1.context = context0;
    const themed2 = new ApplyTheme({ theme: theme2 });
    const context1 = themed1.getChildContext();
    themed2.context = context1;
    const context2 = themed2.getChildContext();

    let themedElem;
    themedElem = shallowRender(
      <ApplyTheme theme={theme1}>
        <ApplyTheme theme={theme2}>
          <Component />
        </ApplyTheme>
      </ApplyTheme>
    );
    themedElem = shallowRender(themedElem, context1);
    themedElem = shallowRender(themedElem, context2);

    expect(themedElem.props.className1).toBe('className1');
    expect(themedElem.props.className2).toBe('className2');
  });
});
