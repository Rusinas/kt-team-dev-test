import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyDwYNpxbRO4y1ipT9OyH8TJ7nQWJFt0FCA",
    authDomain: "kt-tododos-bda5f.firebaseapp.com",
    databaseURL: "https://kt-tododos-bda5f.firebaseio.com",
    projectId: "kt-tododos-bda5f",
    storageBucket: "kt-tododos-bda5f.appspot.com",
    messagingSenderId: "407341281510",
    appId: "1:407341281510:web:05ac157f980e57ab5e0b27"
})

export const db = firebase.firestore()