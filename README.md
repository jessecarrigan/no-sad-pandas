# No Sad Panda Initiative Meeting API

This API allows scheduling of meetings for No Sad Panda Initiative webinars.

## Components

- [Node.js](http://nodejs.org/en/)
- [npm](http://www.npmjs.com/)
- [MongoDB](http://www.mongodb.com/)

## Getting Started

- You can edit `config.js` to set the port for the server and the location of your MongoDB instance. These are defaulted to 3000 and localhost:27017, respectively.
- Run `npm start` from the main folder containing the `package.json` file.

# API Documentation

## Create meetings
- URL
    - meeting
- Method
    - `POST`
- Body example
    ```
    {
        "contact": "Jesse Carrigan",
        "email": "jesse.m.carrigan@gmail.com",
        "address": "1006 East 58th Street, Tacoma, 98404, WA, US",
        "datetime": "2016-11-08T10:00:00+08:00"
    }
    ```
- 

