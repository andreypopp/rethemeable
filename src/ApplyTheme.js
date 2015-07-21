import React        from 'react';

/**
 * Apply theme to a component.
 *
 * Produce a new component which has theme applied by default.
 */
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
  return class extends Component {
    get theme() {
      return theme;
    }
  };
}
