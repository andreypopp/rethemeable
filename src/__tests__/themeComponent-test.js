/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import expect         from 'expect';
import React          from 'react';
import TestUtils      from 'react/lib/ReactTestUtils';
import themeable      from '../themeable';
import themeComponent from '../themeComponent';

function shallowRender(element, context) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('themeComponent', function() {

  it('works as factory', function() {
    let theme = {className: 'className'};

    @themeable
    class Component extends React.Component {

      render() {
        return <div className={this.theme.className} />;
      }
    }

    Component = themeComponent(Component, theme);

    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('className');
  });

  it('still allow theme override via props', function() {
    let theme = {className: 'className'};

    @themeable
    class Component extends React.Component {

      render() {
        return <div className={this.theme.className} />;
      }
    }

    Component = themeComponent(Component, theme);

    let themedElem = shallowRender(<Component theme={{className: 'overriden!'}} />);
    expect(themedElem.props.className).toBe('overriden!');
  });


  it('merges with the previous theme', function() {

    @themeable
    class Component extends React.Component {

      static defaultTheme = {className: 'className'};

      render() {
        return <div className={this.theme.className} />;
      }
    }

    Component = themeComponent(Component, {});

    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('className');
  });

});

