/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */
/* eslint react/require-render-return: "off" */ // Can remove once issue is resolved: https://github.com/yannickcr/eslint-plugin-react/issues/552

import { PropTypes } from 'react';
import { ThemeContextTypes, getThemeContext } from './ThemeContextTypes';
import themeComponent from './themeComponent';

/**
 * Mark component as themeable.
 *
 * Themeable components has `theme` attribute which can be confired explicitly
 * via props or passed via context.
 *
 * Also themeable components have `theme` class attribute which is used to
 * distinguish component styles.
 */
export default function themeable(Component, { defaultTheme, themeKey } = {}) {
  const displayName = Component.displayName || Component.name;
  const themeableKey = themeKey || displayName;

  class ThemeableComponent extends Component {

    static displayName = displayName;

    static propTypes = {
      ...Component.propTypes,
      theme: PropTypes.object,
    };

    static contextTypes = {
      ...Component.contextTypes,
      ...ThemeContextTypes,
    };

    static theme = themeableKey;
    static concreteTheme = null;

    static isThemeable = true;

    constructor(props, context) {
      super(props, context);
      this.themeCache = null;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
      if (nextProps.theme !== this.props.theme ||
        getThemeContext(nextContext) !== getThemeContext(this.context)) {
        this.themeCache = null;
      }
      if (super.componentWillUpdate) {
        super.componentWillUpdate(nextProps, nextState, nextContext);
      }
    }

    get theme() {
      if (this.themeCache !== null) {
        return this.themeCache;
      }

      let { theme } = this.props;
      if (!theme) {
        theme = this.constructor.concreteTheme;
      }
      if (!theme) {
        const themeUniverse = getThemeContext(this.context);
        theme = themeUniverse && themeUniverse[themeableKey];
      }
      if (defaultTheme) {
        theme = { ...defaultTheme, ...theme };
      } else if (Component.defaultTheme) {
        theme = { ...Component.defaultTheme, ...theme };
      }
      if (!theme) {
        theme = {};
      }
      this.themeCache = theme;
      return theme;
    }
  }

  if (ThemeableComponent.style === undefined) {
    ThemeableComponent.style = function style(theme) {
      return themeComponent(this, theme);
    };
  }

  return ThemeableComponent;
}

export function isThemeable(Component) {
  return Component.isThemeable;
}
