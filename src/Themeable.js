import React               from 'react';
import {ContextTypes, get} from './ContextTypes';

export default function Themeable(Component) {
  let name = Component.displayName || Component.name;
  let themeKey = Symbol(name);
  return class extends React.Component {
    static displayName = `Themeable(${name})`;
    static contextTypes = ContextTypes;
    static theme = themeKey;

    render() {
      let {theme, ...props} = this.props;
      if (!theme) {
        let universeTheme = get(this);
        theme = universeTheme && universeTheme[themeKey] || {};
      }
      return <Component {...props} theme={theme} />;
    }
  };
}
