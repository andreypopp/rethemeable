import React               from 'react';
import {ContextTypes, get} from './ContextTypes';

/**
 * Mark component as themeable.
 *
 * Themeable components has `theme` attribute which can be confired explicitly
 * via props or passed via context.
 *
 * Also themeable components have `theme` class attribute which is used to
 * distinguish component styles.
 */
export default function Themeable(Component) {
  let displayName = Component.displayName || Component.name;
  let themeKey = Symbol(displayName);

  return class extends Component {

    static displayName = displayName;

    static contextTypes = {
      ...Component.contextTypes,
      ...ContextTypes
    };

    static theme = themeKey;

    get theme() {
      let {theme} = this.props;
      if (!theme) {
        let themeUniverse = get(this);
        theme = themeUniverse && themeUniverse[themeKey] || {};
      }
      return theme;
    }
  };
}
