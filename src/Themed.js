import React, {PropTypes}   from 'react';
import {ContextTypes, make} from './ContextTypes';

/**
 * Inject theme into a component tree.
 */
export default class Themed extends React.Component {

  static propTypes = {
    theme: PropTypes.object
  };

  static childContextTypes = ContextTypes;

  render() {
    return React.Children.only(this.props.children);
  }

  getChildContext() {
    return make(this.props.theme);
  }
}
