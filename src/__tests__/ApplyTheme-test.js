import expect     from 'expect';
import React      from 'react';
import TestUtils  from 'react/lib/ReactTestUtils';
import ApplyTheme from '../ApplyTheme';

function shallowRender(element, context) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('ApplyTheme', function() {

  it('works as decorator', function() {
    let theme = {className: 'className'};

    @ApplyTheme(theme)
    class Component extends React.Component {

      render() {
        return <div className={this.theme.className} />;
      }
    }

    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('className');
  });

  it('works as factory', function() {
    let theme = {className: 'className'};

    class Component extends React.Component {

      render() {
        return <div className={this.theme.className} />;
      }
    }

    Component = ApplyTheme(theme, Component);

    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('className');
  });

  it('can extract component theme from global theme', function() {
    class Component extends React.Component {

      render() {
        return <div className={this.theme.className} />;
      }

      static theme = 'Component';
    }

    let theme = {
      Component: {
        className: 'className'
      }
    };

    Component = ApplyTheme(theme, Component);

    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('className');
  });

});

