---
published: false
title: Reduce load time and compress apps with code splitting
author: David
tags:
  - Code splitting
  - Load time
  - Webpack
excerpt: "Code splitting is a slick way to reduce initial file requests and speed up your load time. We're using it for building a massive single-page app for the World Bank."
preview: http://wiredcraft.com/images/posts/Code-splitting-single-page-app.png
---

![](http://wiredcraft.com/images/posts/Code-splitting-single-page-app.png)

Wiredcraft is currently rebuilding the [data.worldbank.org](http://data.worldbank.org) Open Data portal to be an SPA (single-page application) and to work well on mobile. The dataset has about 1500 different indicator time series for most countries and the portal can display these in graphs and heat maps. Since the site has so many dynamic pieces, we're using code splitting to improve the application's performance. Check out the [rebuilt site's beta mode](http://beta.data.worldbank.org).

## Why we need code splitting

SPA's client-side routing greatly reduces the round trip between the server and client. We also can use server side rendering (checkout reference about SSR implementation of [React](https://github.com/mhart/react-server-example) and [Angular2](https://github.com/angular/universal) to render the initial page in server, which cuts down the initial render time in the client side. 

Still one common problem exists: the file's size request in the initial load becomes bigger when the application becomes larger. We handle this problem by creating on-demand loaded chunks, only requesting the essential files in the initial page. Once we enter different route or need to use some important features, we request those related chunks just once.

With the help of [Webpack](https://github.com/webpack/webpack) and [React router](https://github.com/rackt/react-router) (our application is based on React), we can implement these on-demand chunks very quickly.

We're using some iframes in the World Bank project that source from the original site. Splitting the code saves us more than 50% of the inital file request for the iframes, meaning they load super quickly.

## Webpack

Webpack is a famous module bundler and [here's a great article](http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html) for learning and using their product. 
We can create on demand load chunks by define `split point` in our code.

Use `require.ensure(dependencies, callback)` to load CommonJs modules, Use `require(dependencies, callback)` to load AMD modules. Webpack will detect these split points in the building process.

React router
React router is a popular client side routing library based on React.
We can define routes in plain JavaScript object or declaratively.
Plain JavaScript way:

````js
let myRoute = {
  path: `${some path}`,
  childRoutes: [
    RouteA,
    RouteB,
    RouteC,
  ]
}
````

Declarative way:
````
const routes = (
  <Route component={Component}>
    <Route path="pathA" component={ComponentA}/>
    <Route path="pathB" component={ComponentB}/>
  </Route>
)
````

React router allows us to use lazy load route-related code, also called dynamic routing. We can define our split points in the lazy load code. ([Here's a reference about dynamic routing](https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md))

## Code Splitting Implement

Below is a demo of creating two on demand loaded chunks, chunk A will load once when entering rootUrl/A, chunk B will load once when entering rootUrl/B.

**Routes**

````
/* ---            RootRoute            --- */
...
import RouteA from './RouteA'
import RouteB from './RouteB'

export default {
  path: '/',
  component: App,
  childRoutes: [
    RouteA,
    RouteB,
  ],
  indexRoute: {
    component: Index
  }
}

/* ---              RouteA              --- */
...
export default {
  path: 'A',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require(`${PathOfRelatedComponent}`))
    }, 'chunkA')
  }
}

/* ---              RouteB              --- */
...
export default {
  path: 'B',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require(`${PathOfRelatedComponent}`))
    }, 'chunkB')
  }
}
````

**Client side code for client-side rendering**

````
import { match, Router } from 'react-router'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

//use match to trigger the split code to load before rendering. 
match({ routes, location }, () => {
  render(
    <Router routes={routes} history={createHistory()} />,
      document.getElementById('app')
  )
})
````

**Server code for server-side rendering**

````
app.createServer((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error)
      writeError('ERROR!', res)
    else if (redirectLocation)
      redirect(redirectLocation, res)
    else if (renderProps)
      renderApp(renderProps, res)
    else
      writeNotFound(res)
}).listen(PORT) 

function renderApp(props, res) {
  const markup = renderToString(<RoutingContext {...props}/>)
  const html = createPage(markup)
  write(html, 'text/html', res)
}

export function createPage(html) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>My Universal App</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/__build__/main.js"></script>
    </body>
  </html>
  `
}
````

## Implementation hints

Depends on how you write your module, you may get error: `React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components). Check the render method of RoutingContext.` Add `.default` after your component require to solve this problem.

If you got `require.ensure` is not function promoted, add this polyfill:`if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)` which allow us replace `require.ensure` to `require` in server side.
 
## Putting it all back together

Code chunks improve the performance for apps, especially on mobile, by reducing the initial code size.  We can create chunks in two steps: define split points in routes and use react router's `match` in both client side and server side.

For more info on Webpack's code splitting, check out [their Github page](http://webpack.github.io/docs/code-splitting.html) and their [demo project](https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes).

See our work on the World Bank's [Open Data site](http://beta.data.worldbank.org) and tell us your thoughts via [Twitter](http://twitter.com/wiredcraft) or [email](mailto:info@wiredcraft.com)!
