import * as firebase from 'firebase'
import 'firebase/storage'

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
export const storageRef = firebase.storage().ref()

export default firebase
