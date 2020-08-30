import app from 'firebase/app'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyDgTRSn7xAqecg0qkJutsd0X_rE9tMhK1A",
    authDomain: "marvel-quiz-5994f.firebaseapp.com",
    databaseURL: "https://marvel-quiz-5994f.firebaseio.com",
    projectId: "marvel-quiz-5994f",
    storageBucket: "marvel-quiz-5994f.appspot.com",
    messagingSenderId: "881038057637",
    appId: "1:881038057637:web:fc20c8e2f6cb9cc9e9ad4c"
  };

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
    }

    // inscription

    signupUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password)


    // connexion

    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)


    // deconnexion

    signoutUser = () => this.auth.signOut()
}

export default Firebase