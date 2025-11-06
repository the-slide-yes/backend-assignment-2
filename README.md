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

[Here!](https://the-slide-yes.github.io/backend-assignment-2/)

## Do I have the time to do anything more tonight??

No