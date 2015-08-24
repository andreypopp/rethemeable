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

function ApplyThemeImpl(theme, Component, displayName) {
  if (Component.theme && Component.theme in theme) {
    theme = theme[Component.theme];
  }
  displayName = displayName || Component.displayName || Component.name;
  let ThemedComponent = class extends Component {
    static displayName = displayName;
    static defaultTheme = {...Component.defaultTheme, ...theme};
  };
  return ThemedComponent;
}
