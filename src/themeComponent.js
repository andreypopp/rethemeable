/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */
/* eslint react/require-render-return: "off" */ // Can remove once issue is resolved: https://github.com/yannickcr/eslint-plugin-react/issues/552

import invariant from 'invariant';
import { isThemeable } from './themeable';

/**
 * Apply theme to a component.
 *
 * Produce a new component which has theme applied by default.
 */
export default function themeComponent(Component, theme) {
  invariant(
    isThemeable(Component),
    'Only themeable components can be themed',
  );
  const displayName = Component.displayName || Component.name;

  class ThemedComponent extends Component {
    static displayName = displayName;
    static concreteTheme = { ...Component.defaultTheme, ...theme };
  }
  return ThemedComponent;
}

