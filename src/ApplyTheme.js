/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import React, {PropTypes}     from 'react';
import {ThemeContextTypes,
        makeThemeContext,
        getThemeContext}      from './ThemeContextTypes';

/**
 * Inject theme into a component tree.
 */
export default class ApplyTheme extends React.Component {

  static propTypes = {
    theme: PropTypes.object
  };

  static childContextTypes = ThemeContextTypes;
  static contextTypes = ThemeContextTypes;

  render() {
    return React.Children.only(this.props.children);
  }

  getChildContext() {
    let {theme} = this.props;
    let prevTheme = getThemeContext(this.context);
    if (prevTheme) {
      return makeThemeContext({...prevTheme, ...theme});
    } else {
      return makeThemeContext(theme);
    }
  }
}
