/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import invariant      from 'invariant';
import {isThemeable}  from './Themeable';

/**
 * Apply theme to a component.
 *
 * Produce a new component which has theme applied by default.
 */
export default function themeComponent(Component, theme) {
  invariant(
    isThemeable(Component),
    'Only themeable components can be themed'
  );
  let displayName = Component.displayName || Component.name;
  let ThemedComponent = class extends Component {
    static displayName = displayName;
    static concreteTheme = {...Component.defaultTheme, ...theme};
  };
  return ThemedComponent;
}

