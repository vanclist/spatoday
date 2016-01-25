# Spatoday

Experiment with Pagekit - modular and lightweight CMS built with Symfony components.

* [Homepage](http://pagekit.com) - Learn more about Pagekit

## Getting started

```
git clone --branch develop git://github.com/vanclist/spatoday.git
```

Navigate to the cloned directory and install PHP dependencies.

```
composer install
```

Install Node dependencies and build the front-end components:

```
npm install
```

To watch for local LESS asset changes, run `gulp watch`.

To watch for JS module changes, run `webpack --watch`.

When the installer has finished, point your browser to the Spatoday URL on your web server and follow the installer.

## Stay up to date

If you've set up Spatoday from source, run these commands to get new commits and to rebuild everything you need.

```
git pull
composer update
npm install
bower update
gulp
webpack
```

## CLI

Spatoday offers a set of commands to run usual tasks on the command line. You can see the available commands with
```
./spatoday --help
```