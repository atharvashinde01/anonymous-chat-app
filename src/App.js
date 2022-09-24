import "./App.css";
import db from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "./redux/users/userActions";
import Main from "./components/Main";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Log In
        dispatch(
          setUser({
            username: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            uid: authUser.uid,
          })
        );

        db.collection("users")
          .doc(authUser.email)
          .set({
            username: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            uid: authUser.uid,
          })
          .catch((err) => alert(err.message));
      } else {
        //Log Out
        dispatch(logoutUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/main/:roomId">
            <Main />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
