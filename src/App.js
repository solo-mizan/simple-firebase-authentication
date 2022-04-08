import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [users, setUsers] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUsers(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      setUsers(user);
      console.log(user);
    })
    .catch(error => {
      console.error(error);
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
      {
        users.uid ? <button onClick={handleSignOut}>Sign out</button>
          :
          <div>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <button onClick={handleGithubSignIn}>Sign in with Github</button>
          </div>
      }
      <h1>Name: {users.displayName}</h1>
      <p>email: {users.email}</p>
      <img src={users.photoURL} alt="" />
    </div>
  );
}

export default App;
