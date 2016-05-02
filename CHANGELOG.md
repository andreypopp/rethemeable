4.0.0
=====

* [BREAKING] Updated several dependencies (Notable React@15, Babel@6, and Eslint@2)
* [BREAKING] Renamed `Themeable` to `themeable`

  Since `themeable` is a function that takes and returns a component, and not a class that 
  gets `new`ed up itself, it has been lowercased to indicate such.
  That means that CommonJS code consuming react-textarea-autosize package should
  Before:
    ```javascript
    import { Themeable } from 'rethemeable'
    ```
  Now:
    ```javascript
    import { themeable } from 'rethemeable'
    ```

* [BUGFIX] ApplyTheme is now properly exported in index.js
* [BUGFIX] The default value for `defaultTheme` was moved to fix an error when not defining a theme.
