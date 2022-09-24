import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../css/Login.css";
import db, { auth, provider } from "../firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const user = useSelector((state) => state.User.user);

  const [modalOpen, setModalOpen] = useState(false);

  const roomNameRef = useRef("");

  const history = useHistory();

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const loginUser = () => {
    if (user) {
      auth.signOut().catch((err) => alert(err.message));
    } else {
      auth
        .signInWithPopup(provider)
        .then(() => alert("Logged In"))
        .catch((err) => alert(err.message));
    }
  };

  const makeARoom = () => {
    db.collection("rooms")
      .doc(user.uid)
      .set({
        roomName: roomNameRef.current.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        roomOwner: user.email,
        roomUniqueId: user.uid
      })
      .then(() => {
        handleClose();
        history.push(`/main/${user.uid}`);
      })
      .catch((err) => alert(err.message));
  };

  const RoomModal = () => {
    return (
      <div className="roomModal">
        <div onClick={handleClose} className="roomModal__outer"></div>
        <div className="roomModal__inner">
          <input ref={roomNameRef} type="text" placeholder="Enter Room Name" />
          <button onClick={makeARoom}>Create Room</button>
        </div>
      </div>
    );
  };
  return (
    <div className="login">
      {modalOpen && <RoomModal />}
      <div className="login__middle">
        <div className="login__title">
          <h1>Anonymous Chat Application</h1>
        </div>

        <div className="login__roomBox">
          <button
            onClick={handleOpen}
            disabled={!user}
            className="login__createButton"
          >
            Create a Room
          </button>
          <button disabled={!user} className="login__joinButton">
            Join a Room
          </button>
        </div>

        <div className="login__gmailBox">
          <button onClick={loginUser} className="login__gmailButton">
            <img className="login__googleIcon" src="/google-icon.png" alt="G" />
            {user ? "Logout" : "Login using Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
