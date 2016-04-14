# Sunrise with Angular + ES6 + webpack

Side project inspired by Sunrise, the calendar application.

This project uses npm, angular, lodash, bulma, babel, webpack, karma and jasmine.

[Screenshot](https://raw.githubusercontent.com/ggregoire/sunrise-angular-es6-webpack/master/screenshot.png)

## Technical notes
* ES6 with babel (services & controllers with classes, imports/exports, destructuring, arrow functions...)
* Unit tests for each component (controller and directive)
* Code coverage when tests are run
* Design using flexbox

## Getting started

Tested with `node 5.5.0` and `npm 3.5.3`.

```
# clone the repo
❯ git clone https://github.com/ggregoire/sunrise-angular-es6-webpack.git

# change directory to your app
❯ cd sunrise-angular-es6-webpack

# install the dependencies with npm
❯ npm install

# start the server
❯ npm start
```

Go to [http://localhost:8080](http://localhost:8080) in your browser.

## Testing

```
❯ npm test
```

After the tests, karma will generate a code coverage summary directly in your terminal.

For further details, you can find a full report inside the `coverage` folder.

## License

MIT
