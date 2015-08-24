import expect     from 'expect';
import React      from 'react';
import TestUtils  from 'react/lib/ReactTestUtils';
import Themeable  from '../Themeable';
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
    @Themeable
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

    @Themeable
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

    @Themeable
    class Component extends React.Component {

      render() {
        return <div className={this.theme.className} />;
      }
    }

    let theme = {
      [Component.theme]: {
        className: 'className'
      }
    };

    Component = ApplyTheme(theme, Component);

    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('className');
  });

  it('still allow theme override via props', function() {
    let theme = {className: 'className'};

    @ApplyTheme(theme)
    @Themeable
    class Component extends React.Component {

      render() {
        return <div className={this.theme.className} />;
      }
    }

    let themedElem = shallowRender(<Component theme={{className: 'overriden!'}} />);
    expect(themedElem.props.className).toBe('overriden!');
  });


  it('merges with the previous theme', function() {

    @ApplyTheme({})
    @Themeable
    class Component extends React.Component {

      static defaultTheme = {className: 'className'};

      render() {
        return <div className={this.theme.className} />;
      }
    }

    let themedElem = shallowRender(<Component />);
    expect(themedElem.props.className).toBe('className');
  });

});

