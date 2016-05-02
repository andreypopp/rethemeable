/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */
/* global describe, it */

import expect from 'expect';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import themeable from '../themeable';
import themeComponent from '../themeComponent';

function shallowRender(element, context) {
  const renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('themeComponent', () => {
  it('works as factory', () => {
    const themeOverride = { className: 'className' };

    class Component extends React.Component {
      render() {
        const theme = this.theme;
        return <div className={theme.className} />;
      }
    }

    const ThemeableComponent = themeable(Component);
    const ThemedComponent = themeComponent(ThemeableComponent, themeOverride);

    const themedElem = shallowRender(<ThemedComponent />);
    expect(themedElem.props.className).toBe('className');
  });

  it('still allow theme override via props', () => {
    const themeOverride = { className: 'className' };

    class Component extends React.Component {
      render() {
        const theme = this.theme;
        return <div className={theme.className} />;
      }
    }

    const ThemeableComponent = themeable(Component);
    const ThemedComponent = themeComponent(ThemeableComponent, themeOverride);

    const themedElem = shallowRender(<ThemedComponent theme={{ className: 'overriden!' }} />);
    expect(themedElem.props.className).toBe('overriden!');
  });

  it('merges with the previous theme', () => {
    class Component extends React.Component {
      render() {
        const theme = this.theme;
        return <div className={theme.className} />;
      }
    }
    Component.defaultTheme = { className: 'className' };

    const ThemeableComponent = themeable(Component);
    const ThemedComponent = themeComponent(ThemeableComponent, {});

    const themedElem = shallowRender(<ThemedComponent />);
    expect(themedElem.props.className).toBe('className');
  });
});
