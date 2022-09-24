import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../css/Main.css";
import db from "../firebase";

const Main = () => {
  const [room, setRoom] = useState(null);
  const user = useSelector(state => state.User.user)

  const { roomId } = useParams();

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .get()
      .then((room) => {
        setRoom(room.data());
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="main__chatting">
      <div className="main__chatting--left">
        <div className="main__leftTop">
          
        </div>
      </div>
      <div className="main__chatting--right"></div>
    </div>
  );
};

export default Main;
