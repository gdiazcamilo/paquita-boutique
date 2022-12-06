# paquita-boutique

This is an e-commerce website built with React, Redux, React Router DOM, Redux-saga, Styled components, Firebase authentication, Firestore for data store and Stripe integration for payments.

## Set up Firestore database

- Go to Firebase.
- Create a new Firebase Project.
- Once the project is ready, create a Firestore database.
- Go to recently created project setting and then to the General tab.
- Add a Web App, then copy the generated configuration, it's an object with the following properties:

```
const firebaseConfig = {
apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: "",
measurementId: ""
};
```

- Create a new file `firebase.conf.dev.mjs` in client/firebase.
- Copy/paste the firebase config into that file (make sure to export the object as default).

Up to this point the application should work except for the authentication.

## Setting up Authentication - SSO with Google

In the firebase console:
- Go to your project
- Go to Build > Authentication
- Click "Get Started" or Go to the "Sign-in method" tab.
- Click "Add new provider" and choose Google.
- Click Enable and Save.
Done.

## Setting Up Authentication - Email and Password

In the firebase console:
- Go to your project
- Go to Build > Authentication
- Click "Get Started" or Go to the "Sign-in method" tab.
- Click "Add new provider" and choose "Email/Password".
- Click Enable and Save.
Done.

## Setting up Stripe

- Go to the `stripe-button.component.jsx` and update the `publishableKey` to the key provided by Stripe.

- Go to the server folder, create a `.env` file with the key `STRIPE_SECRET_KEY` and set it to the secret key provided by Stripe.

## Start the app
The backend is only use for Stripe payments. The client will work independently except for the Stripe payments.

### Run migration
```
cd client
npm run data:import
```
If you don't run migrations you won't see anything except for the Header.

### Start the client
```
cd client
npm start
```

### Start the server
```
cd server
npm start
```

### Start both client and server with single command
In the root project folder run:
`npm run dev`
