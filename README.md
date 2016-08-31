# Sunrise with Angular + ES6 + webpack

Side project inspired by Sunrise, the calendar application.

[Screenshot](https://raw.githubusercontent.com/ggregoire/sunrise-angular-es6-webpack/master/screenshot.png)

## Technical notes
* Lodash :heart_eyes_cat:
* ES6 with Babel (Angular controller with a class, imports/exports, destructuring, arrow functions, etc)
* Unit tests for each Angular component (controller and directive) with Karma and Jasmine
* Code coverage when tests are run
* CSS3 Flexbox

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
