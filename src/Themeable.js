/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import {ThemeContextTypes, getThemeContext} from './ThemeContextTypes';
import themeComponent                       from './themeComponent';

/**
 * Mark component as themeable.
 *
 * Themeable components has `theme` attribute which can be confired explicitly
 * via props or passed via context.
 *
 * Also themeable components have `theme` class attribute which is used to
 * distinguish component styles.
 */
export default function Themeable(Component, defaultTheme = Component.defaultTheme) {
  let displayName = Component.displayName || Component.name;
  let themeKey = Symbol(displayName);

  let ThemeableComponent = class extends Component {

    static displayName = displayName;

    static contextTypes = {
      ...Component.contextTypes,
      ...ThemeContextTypes
    };

    static theme = themeKey;
    static concreteTheme = null;

    static __isThemeable = true;

    constructor(props) {
      super(props);
      this._themeCache = null;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
      if (nextProps.theme !== this.props.theme ||
          getThemeContext(nextContext) !== getThemeContext(this.context)) {
        this._themeCache = null;
      }
      if (super.componentWillUpdate) {
        super.componentWillUpdate(nextProps, nextState, nextContext);
      }
    }

    get theme() {
      if (this._themeCache !== null) {
        return this._themeCache;
      }

      let {theme} = this.props;
      if (!theme) {
        theme = this.constructor.concreteTheme;
      }
      if (!theme) {
        let themeUniverse = getThemeContext(this.context);
        theme = themeUniverse && themeUniverse[themeKey];
      }
      if (defaultTheme) {
        theme = {...defaultTheme, ...theme};
      }
      if (!theme) {
        theme = {};
      }
      this._themeCache = theme;
      return theme;
    }
  };

  if (ThemeableComponent.style === undefined) {
    ThemeableComponent.style = function(theme) {
      return themeComponent(this, theme);
    };
  }

  return ThemeableComponent;
}

export function isThemeable(Component) {
  return Component.__isThemeable;
}
