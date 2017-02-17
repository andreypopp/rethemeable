/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */
/* global describe, it, beforeEach, afterEach */

import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { makeThemeContext } from '../ThemeContextTypes';
import themeable from '../themeable';

function shallowRender(element, context) {
  const renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('themeable()', () => {
  class Component extends React.Component {
    static contextTypes = {
      ctx: React.PropTypes.string,
    };

    static defaultTheme = {
      className: 'defaultClassName',
      className2: 'defaultClassName2',
    };

    render() {
      const theme = this.theme;
      const context = this.context;

      return (
        <div
          className={theme.className}
          className2={theme.className2}
          ctx={context.ctx}
        />
      );
    }
  }

  const ThemeableComponent = themeable(Component);

  it('allows configuration through context', () => {
    const theme = {
      [ThemeableComponent.theme]: {
        className: 'className',
      },
    };
    const themedElem = shallowRender(<ThemeableComponent />, makeThemeContext(theme));
    expect(themedElem.props.className).toBe('className');
    expect(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('allows configuration through context with a passed themeKey', () => {
    const themeKey = Symbol('test-theme-key');
    const PassedThemeKeyComponent = themeable(Component, {themeKey});
    const theme = {
      [PassedThemeKeyComponent.theme]: {
        className: 'className',
      },
    };
    const themedElem = shallowRender(<PassedThemeKeyComponent />, makeThemeContext(theme));
    expect(PassedThemeKeyComponent.theme).toBe(themeKey);
    expect(themedElem.props.className).toBe('className');
    expect(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('allows configuration through props', () => {
    const buttonTheme = {
      className: 'className',
    };
    const themedElem = shallowRender(<ThemeableComponent theme={buttonTheme} />);
    expect(themedElem.props.className).toBe('className');
    expect(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('passes context and props to constructor', () => {
    const themedElem = shallowRender(<ThemeableComponent />, { ctx: 'ctx' });

    expect(themedElem.props.ctx).toBe('ctx');
  });

  it('falls back to default theme', () => {
    const themedElem = shallowRender(<ThemeableComponent />);
    expect(themedElem.props.className).toBe('defaultClassName');
    expect(themedElem.props.className2).toBe('defaultClassName2');
  });

  class PlainComponent extends React.Component {
    render() {
      const theme = this.theme;
      return (
        <div
          className={theme.className}
          className2={theme.className2}
        />
      );
    }
  }

  const ThemeablePlainComponent = themeable(PlainComponent);

  it('can render without a theme', () => {
    const themedElem = shallowRender(<ThemeablePlainComponent />);
    expect(themedElem.props.className).toEqual(undefined);
    expect(themedElem.props.className2).toEqual(undefined);
  });
});
