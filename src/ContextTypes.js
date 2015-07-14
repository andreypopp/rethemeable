import {PropTypes} from 'react';

const CONTEXTKEY = '@@themeable';

export let ContextTypes = {
  [CONTEXTKEY]: PropTypes.object
};

export function make(theme) {
  return {[CONTEXTKEY]: theme};
}

export function get(component) {
  return component.context[CONTEXTKEY];
}
