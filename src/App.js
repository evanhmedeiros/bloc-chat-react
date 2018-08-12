import * as firebase from 'firebase';
import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQdTiUsOnrgMxm6RGVGoVxkEUeQTkXc20",
    authDomain: "bloc-chat-react-57b2f.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-57b2f.firebaseio.com",
    projectId: "bloc-chat-react-57b2f",
    storageBucket: "bloc-chat-react-57b2f.appspot.com",
    messagingSenderId: "1037545036712"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
       <RoomList 
       firebase={firebase}/>
      </div>
    );
  }
}

export default App;
