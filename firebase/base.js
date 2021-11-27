import  firebase from 'firebase'
import "firebase/auth"



  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
    }

const app = firebase.initializeApp(firebaseConfig)
export default  app
