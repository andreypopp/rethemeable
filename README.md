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

[React]: http://reactjs.org
[npm]: http://npmjs.org
