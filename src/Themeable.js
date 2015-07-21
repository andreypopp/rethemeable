import React               from 'react';
import {ContextTypes, get} from './ContextTypes';

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
