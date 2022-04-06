import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [users, setUsers] = useState({});
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUsers(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUsers({});
      // Sign-out successful.
    }).catch((error) => {
      console.error('error', error);
      // An error happened.
    });
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google sign in</button>
      <h1>Name: {users.displayName}</h1>
      <p>email: {users.email}</p>
      <img src={users.photoURL} alt="" /> <br />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default App;
