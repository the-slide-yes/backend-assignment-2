# Wow! It's the Employee Tracking API!

Have you ever wanted to track your employees? Well now you can!

## What does the Employee Tracking API do?

The Employee Tracking API is an API that tracks your employees. What does that mean? Well I'm not quite sure exactly, but what I can tell you is that the Employee Tracking API can keep track of all your employees and branches for you.

## Why would I ever need that?

That is a great question! I've asked myself that many times while making this, as the only source of knowledge I have on this topic is from watching the office. I really couldn't say for sure what this would be useful for (even more so right now as it is 11:40 pm and I want to sleep), but my best guess is that it might be cool if you wanted to keep a database of employees and branches.

## How do I install this thing?

1. Download the GitHub repository.
2. run `npm install`.
3. create a `.env` in the root directory.
4. Setup environment variables in `.env`.
    You'll need to get a firebase service account json file and replace the firebase environment variable values with the values in the json.
```
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=yourProjectId
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSOME_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-k9r4p@cloud-project-b7c31.iam.gserviceaccount.com
SWAGGER_SERVER_URL=http://localhost:3000/api/v1
```
5. run `npm test` if you're feeling spicy and want to make sure things work as probably intended.
6. run `npm start` to run the API.
7. Yipee you're done I hope!

## Where documentation???

It's right [Here!](https://the-slide-yes.github.io/backend-assignment-2/)

Or, if you're looking for the local documentation, use the url `http://localhost:3000/api-docs` while the app is running.

## Perhaps how do I make requests to this API in code?

Example: Get all employees with JavaScript

```javascript
const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("localhost:3000/api/v1/employees", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

Example: Create a branch with JavaScript

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name": "Placeholder Branch Name",
  "address": "Placeholder Address",
  "phone": "Placeholder phone number"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("localhost:3000/api/v1/branches", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

Example: Update an employee's email

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": "jordan.gerete@hotmail.com"
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("localhost:3000/api/v1/employees/EMPLOYEEID", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

## So what's the security like?

Custom CORS and Helmet.js configurations apply different security headers to responses depending on whether it is in the development environment or not.

If in development:
- Helmet is configured to disable HTTPS enforcement, meaning HTTPS is not required.
- CORS is configured to allow requests from all origins, which makes testing easier.

If not in development:
- Helmet is configured to 
    - ensure any HTTP requests are automatically upgraded to HTTPS 
    - disallow this API being put inside iframes (to prevent clickjacking).
- CORS is configured to 
    - restrict access to the api to only allow origins set in the environment variable `ALLOWED_ORIGINS`, which will ensure the api is not accessed by origins it should not be.
    - only allow GET, POST, PUT, and DELETE method requests, which are the only ones which are used in this API.
    - only allow content type in the request headers, as this is the only header which should be used in this API.

Regardless of node environment, helmet is configured to:
- disable content security policy, as it is unnecessary for JSON APIs.
- hide server information from responses
- prevent MIME sniffing

Some features, such as allowing credentials, were excluded because this API does not have authentication or authorization, and therefore does not need them.

## Environment variables?

As described in the installing guide above, environment variables are set in the `.env` file at the root of the project.

- `NODE_ENV` describes if the API is being run in development or not development.
- `PORT` specifies which port the server will run on.
- `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, and `FIREBASE_CLIENT_EMAIL` are obtained in a firebase service account json, these are not optional as the API will not run without them.
- `SWAGGER_SERVER_URL` is the server url which the documentation generator will indicate as the server url.
- `ALLOWED_ORIGINS`, which decides which origins are allowed to use this API when not in development mode (seperated by commas).