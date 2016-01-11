# Basic angularJS app
An angularJS web app build using angularJS, Gulp &amp; Bower

## Requirements
  * nodejs
  * git
  
## Setup
  * $ cd /path/to/repository
  * $ npm install
  * $ bower install
  * $ gulp

## Development
  Running the development version and do live edits is very simple. Just run "$ gulp serve". 
  This will create a virtual webserver which can be used by entering http://localhost:8000. Any changes you do on your application
  willm be automaticly loaded in that web instance
  * $ gulp serve

## Building &amp; Production use
  Building your app is very simple. Your application will be compiled in ./dist/* so all you have to do is copy all the content
  of ./dist to your www root. E.g.: /var/www/example.com/htdocs/
  * $ gulp build
  * $ cp -r ./dist/ /var/www/example.com/htdocs/
  
## Included features
  * [angular](https://github.com/angular): ~1.4.8
  * [angular-route](https://github.com/angular/bower-angular-route): *
  * [angular-animate](https://github.com/angular/bower-angular-animate): ~1.4.8
  * [angular-bootstrap](https://github.com/angular-widgets/angular-bootstrap): ~0.14.3
  * [angular-local-storage](https://github.com/grevory/angular-local-storage): ~0.2.3
  * [font-awesome](https://github.com/FortAwesome/Font-Awesome): ~4.5.0
  * [requirejs](https://github.com/jrburke/requirejs): ~2.1.22
  * [angular-sanitize](https://github.com/angular/bower-angular-sanitize): ~1.4.8
  * [bootstrap](https://github.com/twbs/bootstrap): ~3.3.6
