import React, {PropTypes}         from 'react';
import {ContextTypes, make, get}  from './ContextTypes';

/**
 * Inject theme into a component tree.
 */
export default class Themed extends React.Component {

  static propTypes = {
    theme: PropTypes.object
  };

  static childContextTypes = ContextTypes;
  static contextTypes = ContextTypes;

  render() {
    return React.Children.only(this.props.children);
  }

  getChildContext() {
    let {theme} = this.props;
    let prevTheme = get(this);
    if (prevTheme) {
      return make({...prevTheme, ...theme});
    } else {
      return make(theme);
    }
  }
}
