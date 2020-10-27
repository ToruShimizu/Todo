import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAunXIfFBNjeUSfAPTsJjkFNa2UMALtfpk',
  authDomain: 'todolist-d8a7b.firebaseapp.com',
  databaseURL: 'https://todolist-d8a7b.firebaseio.com',
  projectId: 'todolist-d8a7b',
  storageBucket: 'todolist-d8a7b.appspot.com',
  messagingSenderId: '952270568313'
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const db = firebase.firestore()

export default firebase
