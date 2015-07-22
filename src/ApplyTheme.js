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
  if (Component.theme && Component.theme in theme) {
    theme = theme[Component.theme];
  }
  let displayName = Component.displayName || Component.name;
  let ThemedComponent = class extends Component { }
  ThemedComponent.displayName = displayName;
  ThemedComponent.prototype.theme = theme;
  return ThemedComponent;
}
