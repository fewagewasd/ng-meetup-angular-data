# Angular Data @AngularJS Meetup Vienna

This is the source code for my Angular-Data talk at the AngularJS Meetup in Vienna (Jan 12th, 2015).

## Prerequisites

* Java 8
* Maven

## How to Run

To build and run the project execute the following command:

    mvn spring-boot:run

This will start up the server on [http://localhost:8080/index.html] (where you can choose between the $http and angular-data versions)

## Code Organization

### Java

The Java service is based on [Spring Boot](https://github.com/spring-projects/spring-boot "Spring Boot") and provides a simple REST Endpoint for Todos.

### Web

Web source files are contained in src/main/resources/static. There is a folder for the $http version and a folder for the angular-data version of the Todos app.


## Slides

I uploaded the slides of the talk to my SlideShare account: http://www.slideshare.net/StefanUnterhofer

