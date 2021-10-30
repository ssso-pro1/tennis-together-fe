import firebase from 'firebase'

class AuthService {
  // firebase google sign-in
  // return promise
  login() {
    const authProvider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(authProvider)
  }
}

export default AuthService
