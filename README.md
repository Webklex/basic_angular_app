# Basic angularJS app
An angularJS web app build using angularJS, Gulp &amp; Bower

## Demo / compiled app
Live Demo: http://webklex.github.io/basic_angular_app/dist/
Sourcecode Demo: https://github.com/Webklex/basic_angular_app/tree/gh-pages/dist

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

##Routing example
All your routes are defined in ./src/app/router.js
An example route is already defined.
```
when('/', {
    templateUrl: 'main.html',
    controller: 'mainController'
}).
```
Where the first passed parameter is the URL (in this case "/"), the following object passes the arguments. 
```
otherwise({
    redirectTo: '/'
}).
```
This the the fallback URL. So any url missmatch will be redirected to "/".
Further information about angular-routing ca be fount [here](https://github.com/angular/bower-angular-route).

##View management
Any used view will be stored in ./src/app/views and are automaticaly compiled to a ng-template.
If you need an example take a look at the ./src/app/router.js and the ./src/app/views/ folder content.

##Adding new bower compontents
Adding a new bower components is fairly easy. Just install your component and run either **gulp serve** or **gulp**. The new compontent will be build and added to your application automaticaly.

##Adding custom styles and java scripts
Please add all your custom css and js files which are not a angular controler or what so ever in the ./src/template/* folder. The files will be compiled into your application by gulp. So all you need to do is either run **gulp** or have **gulp serve** running.

#The magic ./scr/index.html
This is your main file. Inside this file you can define your template. Such as navigation, footer and so on.
Please note that the following components should be present at all time:
```
<!-- inject:css -->
<!-- endinject -->

<!-- inject:html -->
<!-- endinject -->

<!-- inject:js -->
<!-- endinject -->
```
So what does it do? Inject:css injects all required CSS files and inject:html includes all the html views converted into ng-templates. inject:js is required fo all javascript components. Besides these tags you can edit everything else inside the index.html file.
