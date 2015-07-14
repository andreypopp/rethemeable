import expect     from 'expect';
import React      from 'react';
import TestUtils  from 'react/lib/ReactTestUtils';
import ApplyTheme from '../ApplyTheme';

function shallowRender(element, context) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

function render(element, context) {
  return shallowRender(shallowRender(element), context);
}

describe('ApplyTheme', function() {

  it('works as decorator', function() {
    let theme = {className: 'className'};

    @ApplyTheme(theme)
    class Component extends React.Component {

      render() {
        let {theme} = this.props;
        return <div className={theme.className} />;
      }
    }

    let themedElem = render(<Component />);
    expect(themedElem.props.className).toBe(theme.className);
  });

  it('works as factory', function() {
    let theme = {className: 'className'};

    class Component extends React.Component {

      render() {
        let {theme} = this.props;
        return <div className={theme.className} />;
      }
    }

    Component = ApplyTheme(theme, Component);

    let themedElem = render(<Component />);
    expect(themedElem.props.className).toBe(theme.className);
  });

});

