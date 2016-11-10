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
- Body example:
```
{
    "contact": "Jesse Carrigan",
    "email": "jesse@nosadpandas.com",
    "address": "5500 Phinney Ave. N., Seattle, WA 98103",
    "datetime": "2016-11-08T10:00:00+08:00"
}
```
- Success response
    - Status Code: 200
    - Content: 
    ```
    { "_id": "012345678910" }
    ```
- Error response
    - Status Code: 400
        - Content (example): 
        ```
        { "error": "Missing meeting information" }
        ```     
    - Status Code: 500
        - General error information.

## Get scheduled meetings

- URL
    - meetings
- Method
    - `GET`
- Success response
    - Status Code: 200
    - Content: 
    ```
    {
        "meetings": [
            {
                "contact": "Jesse Carrigan",
                "email": "jesse.m.carrigan@gmail.com",
                "address": "1006 East 58th Street, Tacoma, 98404, WA, US",
                "datetime": "2016-11-08T10:00:00+08:00"
                "timezone": 480
            }
        ] 
    }
    ```
- Error response
    - Status Code: 500
      - General error information.

## Update a meeting

- URL
    - meeting/:id
- Method
    - `PUT`
- Parameters example
    - :id = 012345678910
- Body example
```
{
    "contact": "Paul Carrigan",
    "email": "paul@nosadpandas.com",
    "address": "5500 Phinney Ave. N., Seattle, WA 98103",
    "datetime": "2016-11-08T10:00:00+08:00"
}
```
- Success response
    - Status Code: 200
    - Content:
    ``` 
    { "updated": 1 }
    ```
- Error response
    - Status Code: 400
      - Returns information about missing/invalid parameters.
    - Status Code: 500
      - Returns general error information.

## Delete a meeting

- URL
    - meeting/:id
- Method
    - `DELETE`
- Parameters example
    - :id = 012345678910
- Success response
    - Status Code: 200
    - Content:
    ``` 
    { "deleted": 1 }
    ```
- Error response
    - Status Code: 400
        - Content (example): 
        ```
        { "error": "Missing meeting information" }
        ```
    - Status Code: 500
        - Returns general error information.

# Notes

## Technical assumptions

- The API saves a local time value in the datetime field on a meeting object, and the timezone as +/- the minutes from GMT to allow conversion on viewing the meeting.
- The datetime is assumed to be a date string in the format above.
- No particular validation is performed on the name or address field, but email is validated. The date string is also checked to ensure it is a valid date that can be stored.

## Potential improvements

- It would be great if this abstracted the database better. Right now, the use of MongoDB is baked into the API due to good support in Node, but if we wanted to change the database it would involve some refactoring.
- Validating email is included and is a pretty basic operation that seems reasonable. Having validation on the location would be good as well, perhaps through the Google Maps API (requires setting up developer/API keys, so was not done here).
- Error handling could be improved.

