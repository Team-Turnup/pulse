# Pulse

Pulse is a mobile app that sends haptic feedback to help users and trainers to maintain cadence for all sorts of exercises from running to rowing, cycling and even breathing

## Install and Run Locally
### Dependencies
* [Node](https://nodejs.org/en/) v12.0.0+
* [Expo-CLI](https://docs.expo.io/versions/latest/get-started/installation/)
* [ngrok](https://dashboard.ngrok.com/get-started)
### Clone
Clone our repository at ```git@github.com:Team-Turnup/pulse.git``` or ```https://github.com/Team-Turnup/pulse.git```
### Setup
```bash
npm install 
expo start && node server
```

To ensure that the app can connect to the server, you must also run 
```bash
ngrok http 8080
```
and copy the ngrok tunnel's URL into a file named **ngrok.js** 
#### **`ngrok.js`**
```javascript
export const ngrok = '[your ngrok tunnel URL goes here]'
```

## Core Features
* Create and perform different types of cadence-based routines, such as running, dancing, rowing, and biking.
* View your performance history and see statistics about how well you did.
* Create classes as a trainer and join classes as a user for synchronized workouts across multiple devices.
* View your class' performance in real time, with visual indication of which users are outside of the target cadence, and the ability to see their individual performance.
