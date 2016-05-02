/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import React, { PropTypes } from 'react';
import {
  ThemeContextTypes,
  makeThemeContext,
  getThemeContext,
} from './ThemeContextTypes';

/**
 * Inject theme into a component tree.
 */
export default class ApplyTheme extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    theme: PropTypes.object,
  };

  static childContextTypes = ThemeContextTypes;
  static contextTypes = ThemeContextTypes;

  getChildContext() {
    let { theme } = this.props;
    const prevTheme = getThemeContext(this.context);

    if (prevTheme) {
      theme = { ...prevTheme, ...theme };
    }

    return makeThemeContext(theme);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
