# API Documentation

This file acts as documentation for the API endpoints and database schema.

## API Endpoints

### Records

- findAll

  - HTTP verb `GET`
  - Endpoint:- `/records`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Array of record objects`

    ```json
    [
      {
        "iso3": "GBR",
        "temperature": 38.5,
        "cases": 1
      },
      {
        "iso3": "EGY",
        "temperature": 39.67,
        "cases": 3
      },
      {
        "iso3": "LBY",
        "temperature": 40.25,
        "cases": 2
      }
    ]
    ```

- Create

  - HTTP verb `POST`
  - Endpoint:- `/records`
  - Request Body

    ```json
    {
      "patientId": "aauth0|121",
      "temperature": 38.5,
      "location": {
        "lng": 23.45,
        "lat": 25.5
      },
      "symptomps": {
        "fatigue": true,
        "cough": true,
        "sore": true,
        "headaches": true,
        "nose": true,
        "breath": true,
        "body": true,
        "smell": true,
        "sneeze": true,
        "itchy": true
      }
    }
    ```

  - Response Body -- `Record Object`

    ```json
    {
      "patientId": "auth0:25",
      "temperature": 38.5,
      "coords": [31.0161621, 30.77632],
      "infected": true,
      "id": "63fa7ee581e36ee8e5c7a217"
    }
    ```
