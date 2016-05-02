Rethemeable
===========

Rethemeable provides utilities for producing and consuming themeable [React][]
components.

It doesn't define the notion of theme. A theme can be a list of CSS class names
or a set of inline style directives.

It doesn't define how components apply themes. It is up to component to decide
what and when to apply CSS class names or inline styles.

Instead Rethemeable define a way to propagate theme through React component
tree.

It's up to component authors to declare the theming contract for each component.

It's up to consumers to fulfil the theming contract for each component.

Installation
------------

Install from [npm][]:

    % npm install rethemeable

Usage
-----

Define a themeable component:

    import { themeable } from 'rethemeable'
    import React from 'react'

    @themeable
    class Button extends React.Component {

      render() {
        let theme = this.theme
        return (
          <button className={theme.self}>
            <i className={theme.icon} />
            {this.props.children}
          </button>
        )
      }
    }

Now define a theme as a collection of styles for a set of React components.
Styles for each component are isolated by an unique key within the theme:

    import Button from 'widgets/Button'

    let BootstrapTheme = {
      [Button.theme]: {
        self: 'btn btn-xs'
      }
    }

And configure it via `<ApplyTheme />` component:

    import { ApplyTheme } from 'rethemeable'
    import React from 'react'

    React.render(
      <ApplyTheme theme={BootstrapTheme}>
        <div>
          <h1>This is an app</h1>
          <Button>See, I don't have theme prop passed explicitly</Button>
        </div>
      </ApplyTheme>
    )

Component `<Button />` will receive `theme` implicitly.

You can also pass theme directly to component via props if you need a more
fine-grained control:

    <Button theme={BootstrapTheme} />

If you don't want to use `<ApplyTheme />` component but just apply some theme on a
themeable component you can use `theme` function:

    import { theme } from 'rethemeable'
    import ThemeableButton from 'third-party-themeable-button'

    let MyButton = theme(ThemeableButton, BootstrapTheme);

    React.render(<MyButton>Hello, I'm themed!</MyButton>)

Rethemeable with CSS modules
----------------------------

Rethemeable approach works well with [CSS modules][], as you can compose your
theme from a set of CSS modules:

    import Button from 'widgets/Button'
    import Modal from 'widgets/Button'

    import ButtonTheme from './Button.css'
    import ModalTheme from './Modal.css'

    let Theme = {
      [Button.theme]: ButtonTheme,
      [ModalTheme.theme]: ModalTheme
    }

[React]: http://reactjs.org
[npm]: http://npmjs.org
[CSS modules]: https://github.com/css-modules/css-modules
