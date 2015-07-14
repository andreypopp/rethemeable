import React        from 'react';

export default function ApplyTheme(theme, Component) {
  if (Component === undefined) {
    return function ApplyThemeDecorator(DecoratedComponent) {
      return ApplyThemeImpl(theme, DecoratedComponent);
    };
  } else {
    return ApplyThemeImpl(theme, Component);
  }
}

function ApplyThemeImpl(theme, Component) {
  return class extends React.Component {
    render() {
      return <Component {...this.props} theme={theme} />;
    }
  };
}
