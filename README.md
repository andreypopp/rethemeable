Rethemeable
===========

**UNRELEASED EXPERIMENT**

Rethemeable provides utilities for producing and consuming themeable [React][]
components.

It doesn't define the notion of theme, the theme can be a list of CSS class
names or a set of inline style directives.

Instead Rethemeable define a way to propagate theme through React component
tree.

Installation
------------

Install with [npm][]:

    % npm install rethemeable

Usage
-----

Define a themeable component:

    import {Themeable} from 'rethemeable'
    import React from 'react'

    @Themeable
    class Button extends React.Component {

      render() {
        let {theme, children} = this.props
        return (
          <button className={theme.self}>
            {children}
          </button>
        )
      }
    }

Now we can define a theme separately:

    let BootstrapTheme = {
      [Button.theme]: {
        self: 'btn btn-xs'
      }
    }

And configure theme via `<Themed />` component:

    import {Themed} from 'rethemeable'
    import React from 'react'

    React.render(
      <Themed theme={BootstrapTheme}>
        <div>
          <h1>This is an app</h1>
          <Button>See, I don't have theme prop passed explicitly</Button>
        </div>
      </Themed>
    )

Component `<Button />` will receive `theme` prop implicitly.

But you can also pass it directly if you need fine-grained control:

    <Button theme={...} />

Also, if you don't want to use `<Themed />` component but just want to apply
some theme on a themeable component you can use `ApplyTheme` function:

    import {ApplyTheme} from 'rethemeable'
    import ThemeableButton from 'third-party-themeable-button'

    let MyButtonTheme = {...}

    let MyButton = ApplyTheme(theme, ThemeableButton)

    React.render(<MyButton>Hello, I'm themed!</MyButton>)

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
